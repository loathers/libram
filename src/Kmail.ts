import { extractMeat, isGiftable, Item, visitUrl } from "kolmafia";
import { extractItems } from "./lib";
import { combineQuery, EMPTY_VALUE, fetchUrl, Query } from "./url";
import { arrayToCountedMap, chunk } from "./utils";

type RawKmail = {
  id: string;
  type: string;
  fromid: string;
  azunixtime: string;
  message: string;
  fromname: string;
  localtime: string;
};

export default class Kmail {
  readonly id: number;
  readonly date: Date;
  readonly type: "normal" | "giftshop";
  readonly senderId: number;
  readonly senderName: string;
  readonly rawMessage: string;

  private _parsedMessageParts:
    | {
        outsideNote: string;
        outsideAttachments: string | null;
        insideNote: string | null;
        insideAttachments: string | null;
      }
    | undefined;

  /**
   * Parses a kmail from KoL's native format
   *
   * @param rawKmail Kmail in the format supplies by api.php
   * @returns Parsed kmail
   */
  static parse(rawKmail: RawKmail): Kmail {
    return new Kmail(rawKmail);
  }

  /**
   * Returns all of the player's kmails
   *
   * @param count Number of kmails to fetch
   * @returns Parsed kmails
   */
  static inbox(count = 100): Kmail[] {
    return (
      JSON.parse(
        visitUrl(`api.php?what=kmail&for=libram&count=${count}`)
      ) as RawKmail[]
    ).map(Kmail.parse);
  }

  /**
   * Bulk delete kmails
   *
   * @param kmails Kmails to delete
   * @returns Number of kmails deleted
   */
  static delete(kmails: Kmail[]): number {
    const results = fetchUrl("messages.php", [
      ["the_action", "delete"],
      ["box", "Inbox"],
      ["pwd", EMPTY_VALUE],
      ...kmails.map((k) => [`sel${k.id}`, "on"] as const),
    ]);

    return Number(results.match(/<td>(\d) messages? deleted.<\/td>/)?.[1] ?? 0);
  }

  private static _genericSend(
    to: string | number,
    message: string,
    items: Map<Item, number> | Item[],
    meat: number,
    chunkSize: number,
    constructUrl: (args: { meat: number; chunkSize: number }) => {
      path: string;
      query: Query;
    },
    successString: string
  ) {
    let m = meat;

    const sendableItems = [...arrayToCountedMap(items).entries()].filter(
      ([item]) => isGiftable(item)
    );

    let result = true;

    const chunks = chunk(sendableItems, chunkSize);

    // Split the items to be sent into chunks of max 11 item types
    for (const c of chunks.length > 0 ? chunks : [null]) {
      const itemsQuery: Query = {};
      if (c !== null) {
        c.forEach(([item, quantity], i) => {
          itemsQuery[`whichitem${i + 1}`] = item.id;
          itemsQuery[`howmany${i + 1}`] = quantity;
        });
      }

      const { path, query } = constructUrl({
        meat: m,
        chunkSize: c?.length ?? 0,
      });

      const r = fetchUrl(path, combineQuery(query, itemsQuery));

      if (r.includes("That player cannot receive Meat or items")) {
        return Kmail.gift(to, message, items, meat);
      }

      // Make sure we don't send the same batch of meat with every chunk
      m = 0;

      result &&= r.includes(successString);
    }

    return result;
  }

  /**
   * Sends a kmail to a player
   *
   * Sends multiple kmails if more than 11 unique item types are attached.
   * Ignores any ungiftable items.
   * Sends a gift package to players in run
   *
   * @param to The player name or id to receive the kmail
   * @param message The text contents of the message
   * @param items The items to be attached
   * @param meat The quantity of meat to be attached
   * @returns True if the kmail was successfully sent
   */
  static send(
    to: string | number,
    message = "",
    items: Map<Item, number> | Item[] = [],
    meat = 0
  ): boolean {
    return Kmail._genericSend(
      to,
      message,
      items,
      meat,
      11,
      ({ meat }) => ({
        path: "sendmessage.php",
        query: {
          action: "send",
          pwd: EMPTY_VALUE,
          towho: to,
          message,
          sendmeat: meat,
        },
      }),
      ">Message sent.</"
    );
  }

  /**
   * Sends a gift to a player
   *
   * Sends multiple kmails if more than 3 unique item types are attached.
   * Ignores any ungiftable items.
   *
   * @param to The player name or id to receive the gift
   * @param message Message to send
   * @param items The items to be attached
   * @param meat The quantity of meat to be attached
   * @param insideNote The note on the inside of the gift
   * @returns True if the gift was successfully sent
   */
  static gift(
    to: string | number,
    message = "",
    items: Map<Item, number> | Item[] = [],
    meat = 0,
    insideNote = ""
  ): boolean {
    return Kmail._genericSend(
      to,
      message,
      items,
      meat,
      3,
      ({ meat, chunkSize }) => ({
        path: `town_sendgift.php`,
        query: {
          action: "Yep.",
          pwd: EMPTY_VALUE,
          fromwhere: 0,
          note: message,
          insidenote: insideNote,
          towho: to,
          whichpackage: chunkSize,
          sendmeat: meat,
        },
      }),
      ">Package sent.</"
    );
  }

  private constructor(rawKmail: RawKmail) {
    this.id = Number(rawKmail.id);
    this.date = new Date(Number(rawKmail.azunixtime) * 1000);
    this.type = rawKmail.type as Kmail["type"];
    this.senderId = Number(rawKmail.fromid);
    this.senderName = rawKmail.fromname;
    this.rawMessage = rawKmail.message;
  }

  /**
   * Delete the kmail
   *
   * @returns Whether the kmail was deleted
   */
  delete(): boolean {
    return Kmail.delete([this]) === 1;
  }

  private get _messageParts() {
    return (this._parsedMessageParts ??= this._parseMessageParts());
  }

  private _parseMessageParts() {
    let text = this.rawMessage;
    let insideText: string | undefined;
    if (this.type === "normal") {
      // strip potential valentine
      if (text.startsWith("<center>")) {
        const endIdx = text.indexOf("</center>");
        text = text.slice(endIdx + 9);
      }
    } else if (this.type === "giftshop") {
      [text, insideText] = text.split("<p>Inside Note:<p>");
    }
    const split = (s: string) => {
      const idx = s.indexOf("<");
      if (idx === -1) return [s];
      return [s.slice(0, idx), s.slice(idx)];
    };
    const [outsideNote, outsideAttachments = null] = split(text);
    const [insideNote = null, insideAttachments = null] =
      insideText !== undefined ? split(insideText) : [];

    return {
      outsideNote,
      outsideAttachments,
      insideNote,
      insideAttachments,
    };
  }

  /**
   * Get message contents without any HTML from items or meat
   *
   * @returns Cleaned message contents
   */
  get message(): string {
    const { outsideNote, insideNote } = this._messageParts;
    if (insideNote !== null) {
      return `${outsideNote}\n\nInside Note:\n${insideNote}`;
    }
    return outsideNote;
  }

  /**
   * Get the note on the outside of the gift. If the kmail is not a gift,
   * this will be the entire message.
   *
   * @returns Note on the outside of the gift, or the entire message for non-gifts
   */
  get outsideNote(): string {
    return this._messageParts.outsideNote;
  }

  /**
   * Get the note on the inside of the gift
   *
   * @returns Note on the inside of the gift
   */
  get insideNote(): string | null {
    return this._messageParts.insideNote;
  }

  /**
   * Get items attached to the kmail
   *
   * @returns Map of items attached to the kmail and their quantities
   */
  items(): Map<Item, number> {
    const { outsideAttachments, insideAttachments } = this._messageParts;
    return extractItems(`${outsideAttachments}${insideAttachments}`);
  }

  /**
   * Get items attached to the outside of the gift, which should be
   * just the gift wrapper for giftshop items, and all items for normal kmails
   *
   * @returns Map of items attached to the kmail and their quantities
   */
  outsideItems(): Map<Item, number> {
    const { outsideAttachments } = this._messageParts;
    if (!outsideAttachments) return new Map();
    return extractItems(outsideAttachments);
  }

  /**
   * Get items attached to the inside of the gift
   *
   * @returns Map of items attached to the kmail and their quantities
   */
  insideItems(): Map<Item, number> {
    const { insideAttachments } = this._messageParts;
    if (!insideAttachments) return new Map();
    return extractItems(insideAttachments);
  }

  /**
   * Get meat attached to the kmail
   *
   * @returns Meat attached to the kmail
   */
  meat(): number {
    const { outsideAttachments, insideAttachments } = this._messageParts;
    if (!outsideAttachments && !insideAttachments) return 0;
    return extractMeat(`${outsideAttachments}${insideAttachments}`);
  }

  /**
   * Reply to kmail
   *
   * @param message Message with which to reply
   * @param items Items to send
   * @param meat Meat to send
   * @see Kmail.send
   * @returns True if the kmail was successfully sent
   */
  reply(
    message = "",
    items: Map<Item, number> | Item[] = [],
    meat = 0
  ): boolean {
    return Kmail.send(this.senderId, message, items, meat);
  }
}
