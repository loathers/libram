import {
  extractItems,
  extractMeat,
  isGiftable,
  Item,
  visitUrl,
} from "kolmafia";
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
    const results = visitUrl(
      `messages.php?the_action=delete&box=Inbox&pwd&${kmails
        .map((k) => `sel${k.id}=on`)
        .join("&")}`
    );

    return Number(results.match(/<td>(\d) messages? deleted.<\/td>/)?.[1] ?? 0);
  }

  private static _genericSend(
    to: string | number,
    message: string,
    items: Map<Item, number> | Item[],
    meat: number,
    chunkSize: number,
    constructUrl: (
      meat: number,
      itemsQuery: string,
      chunkSize: number
    ) => string,
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
      const itemsQuery =
        c === null
          ? []
          : c.map(
              ([item, quantity], index) =>
                `whichitem${index + 1}=${item.id}&howmany${
                  index + 1
                }=${quantity}`
            );

      const r = visitUrl(
        constructUrl(m, itemsQuery.join("&"), itemsQuery.length)
      );

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
      (meat, itemsQuery) =>
        `sendmessage.php?action=send&pwd&towho=${to}&message=${message}${
          itemsQuery ? `&${itemsQuery}` : ""
        }&sendmeat=${meat}`,
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
    const baseUrl = `town_sendgift.php?action=Yep.&pwd&fromwhere=0&note=${message}&insidenote=${insideNote}&towho=${to}`;
    return Kmail._genericSend(
      to,
      message,
      items,
      meat,
      3,
      (m, itemsQuery, chunkSize) =>
        `${baseUrl}&whichpackage=${chunkSize}${
          itemsQuery ? `&${itemsQuery}` : ""
        }&sendmeat=${m}`,
      ">Package sent.</"
    );
  }

  private constructor(rawKmail: RawKmail) {
    const date = new Date(rawKmail.localtime);
    // Date come from KoL formatted with YY and so will be parsed 19YY, which is wrong.
    // We can safely add 100 because if 19YY was a leap year, 20YY will be too!
    date.setFullYear(date.getFullYear() + 100);

    this.id = Number(rawKmail.id);
    this.date = date;
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

  /**
   * Get message contents without any HTML from items or meat
   *
   * @returns Cleaned message contents
   */
  get message(): string {
    const match = this.rawMessage.match(/^(.*?)</s);
    return match ? match[1] : this.rawMessage;
  }

  /**
   * Get items attached to the kmail
   *
   * @returns Map of items attached to the kmail and their quantities
   */
  items(): Map<Item, number> {
    return new Map(
      Object.entries(extractItems(this.rawMessage)).map(
        ([itemName, quantity]) => [Item.get(itemName), quantity] as const
      )
    );
  }

  /**
   * Get meat attached to the kmail
   *
   * @returns Meat attached to the kmail
   */
  meat(): number {
    return extractMeat(this.rawMessage);
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
