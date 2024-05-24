import { decode as decodeEntities } from "html-entities";
import {
  availableAmount,
  cliExecute,
  getClanId,
  getClanName,
  getPlayerId,
  Item,
  Monster,
  putStash,
  refreshStash,
  retrieveItem,
  stashAmount,
  takeStash,
  visitUrl,
  xpath,
} from "kolmafia";

import { getFoldGroup } from "./lib.js";
import logger from "./logger.js";
import {
  arrayToCountedMap,
  countedMapToArray,
  countedMapToString,
  notNull,
  parseNumber,
} from "./utils.js";

export interface Rank {
  name: string;
  degree: number;
  id: number;
}

const clanIdCache: { [clanName: string]: number } = {};

const toPlayerId = (player: string | number) =>
  typeof player === "string" ? getPlayerId(player) : player;

const LOG_FAX_PATTERN =
  /(\d{2}\/\d{2}\/\d{2}, \d{2}:\d{2}(?:AM|PM): )<a [^>]+>([^<]+)<\/a>(?: faxed in a (?<monster>.*?))<br>/;
const WHITELIST_DEGREE_PATTERN = /(?<name>.*?) \(°(?<degree>\d+)\)/;

export class Clan {
  readonly id: number;
  readonly name: string;

  private static _join(id: number) {
    const result = visitUrl(
      `showclan.php?recruiter=1&whichclan=${id}&pwd&whichclan=${id}&action=joinclan&apply=Apply+to+this+Clan&confirm=on`,
    );

    if (!result.includes("clanhalltop.gif")) {
      throw new Error("Could not join clan");
    }

    return Clan.get();
  }

  private static _withStash<T>(
    borrowFn: () => Item[],
    returnFn: (items: Item[]) => Item[],
    callback: (borrowedItems: Item[]) => T,
  ): T;
  private static _withStash<T>(
    borrowFn: () => Map<Item, number>,
    returnFn: (items: Map<Item, number>) => Map<Item, number>,
    callback: (borrowedItems: Map<Item, number>) => T,
  ): T;
  private static _withStash<T>(
    borrowFn: () => Item[] | Map<Item, number>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    returnFn: (items: any) => Item[] | Map<Item, number>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callback: (borrowedItems: any) => T,
  ): T {
    const borrowed = borrowFn();
    const map = arrayToCountedMap(borrowed);
    try {
      return callback(borrowed);
    } finally {
      if (map.size > 0) {
        const returned = arrayToCountedMap(returnFn(borrowed));
        map.forEach((quantity, item) => {
          const remaining = quantity - (returned.get(item) || 0);
          if (remaining > 0) {
            map.set(item, remaining);
          } else {
            map.delete(item);
          }
        });

        if (map.size > 0) {
          logger.error(
            `Failed to return <b>${countedMapToString(map)}</b> to <b>${
              this.name
            }</b> stash`,
          );
        }
      }
    }
  }

  /**
   * Join a clan
   *
   * @param clanIdOrName Clan id or name
   * @returns Instance of joined clan
   */
  static join(clanIdOrName: string | number): Clan {
    let clanId;

    if (typeof clanIdOrName === "string") {
      const clanName = clanIdOrName.toLowerCase();
      if (clanName === getClanName().toLowerCase()) {
        return Clan.get();
      }

      if (!(clanName in clanIdCache)) {
        const clan = Clan.getWhitelisted().find(
          (c) => c.name.toLowerCase() === clanName,
        );

        if (!clan) {
          throw new Error("Player is not whitelisted to clan");
        }

        clanIdCache[clanName] = clan.id;
      }

      clanId = clanIdCache[clanName];
    } else {
      clanId = clanIdOrName;
      if (clanId === getClanId()) {
        return Clan.get();
      }
    }

    return Clan._join(clanId);
  }

  /**
   * Execute callback as a member of a clan and then restore prior membership
   *
   * @param clanIdOrName Clan id or name
   * @param callback Actions to carry out while member of specified can
   * @returns Return value from callback
   */
  static with<T>(
    clanIdOrName: string | number,
    callback: (clan: Clan) => T,
  ): T {
    const startingClan = Clan.get();
    const clan = Clan.join(clanIdOrName);
    try {
      return callback(clan);
    } finally {
      startingClan.join();
    }
  }

  /**
   * Execute callback with items from a clan stash
   * and then restore those items to the stash
   *
   * During the execution of the callback, player will not be in the stash clan
   *
   * @param clanIdOrName Clan id or name
   */
  static withStash<T>(
    clanIdOrName: string | number,
    items: Item[],
    callback: (borrowedItems: Item[]) => T,
  ): T;
  static withStash<T>(
    clanIdOrName: string | number,
    items: Map<Item, number>,
    callback: (borrowedItems: Map<Item, number>) => T,
  ): T;
  static withStash<T>(
    clanIdOrName: string | number,
    items: any, // eslint-disable-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    callback: (borrowedItems: any) => T, // eslint-disable-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  ): T {
    return Clan._withStash(
      () => Clan.with(clanIdOrName, (clan) => clan.take(items)),
      (borrowed) => Clan.with(clanIdOrName, (clan) => clan.put(borrowed)),
      callback,
    );
  }

  /**
   * Get the player's current clan
   *
   * @returns Player's clan
   */
  static get(): Clan {
    return new Clan(getClanId(), getClanName());
  }

  /**
   * Get list of clans to which the player is whitelisted
   *
   * @returns List of clans
   */
  static getWhitelisted(): Clan[] {
    const page = visitUrl("clan_signup.php");

    return xpath(page, '//select[@name="whichclan"]//option').map((option) => {
      const validHtml = `<select>${option}</select>`;
      const id = Number.parseInt(xpath(validHtml, "//@value")[0]);
      const name = decodeEntities(xpath(validHtml, "//text()")[0]);
      return new Clan(id, name);
    });
  }

  private constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  private _check() {
    if (this.id !== getClanId()) {
      throw new Error("You are no longer a member of this clan");
    }
  }

  /**
   * Join clan
   *
   * @returns Joined clan
   */
  join(): Clan {
    return Clan.join(this.id);
  }

  /**
   * Check that this clan is the player's current clan
   *
   * @returns Whether this is the current clan
   */
  check(): boolean {
    return visitUrl("clan_hall.php").includes(`<b>${this.name}</b>`);
  }

  /**
   * Determine the monster that is currently in the current clan's fax machine if any
   *
   * @returns The current fax monster
   */
  getCurrentFax(): Monster | null {
    this._check();

    const logs = visitUrl("clan_log.php");

    const lastFax = logs.match(LOG_FAX_PATTERN);

    if (!lastFax) return null;

    const [, , , monsterName] = lastFax;

    if (!monsterName) return null;

    return Monster.get(monsterName);
  }

  /**
   * List available ranks (name, degree and id) from the current clan
   *
   * @returns List of ranks
   */
  getRanks(): Rank[] {
    this._check();

    const page = visitUrl("clan_whitelist.php");

    return xpath(page, '//select[@name="level"]//option')
      .map((option) => {
        const validHtml = `<select>${option}</select>`;
        const match = xpath(validHtml, "//text()")[0].match(
          WHITELIST_DEGREE_PATTERN,
        );
        const id = xpath(validHtml, "//@value")[0];

        if (!match || !id) return null;

        const [, encodedName, degree] = match;

        return {
          name: decodeEntities(encodedName),
          degree: Number.parseInt(degree),
          id: Number.parseInt(id),
        };
      })
      .filter(notNull);
  }

  /**
   * Add a player to the current clan's whitelist.
   * If the player is already in the whitelist this will change their rank or title.
   *
   * @param player Player id or name
   * @param rankName Rank to give the player. If not provided they will be given the lowest rank
   * @param title Title to give the player. If not provided, will be blank
   * @returns Success
   */
  addPlayerToWhitelist(
    player: string | number,
    rankName?: string,
    title = "",
  ): boolean {
    this._check();

    const playerId = toPlayerId(player);

    const ranks = this.getRanks();
    const rank = rankName
      ? ranks.find((r) => r.name === rankName)
      : ranks.sort((a, b) => a.degree - b.degree)[0];

    if (!rank) return false;

    const result = visitUrl(
      `clan_whitelist.php?action=add&pwd&addwho=${playerId}&level=${rank.id}&title=${title}`,
    );

    return (
      result.includes("added to whitelist.") ||
      result.includes("That player is already on the whitelist")
    );
  }

  /**
   * Remove a player from the current clan's whitelist
   *
   * @param player Player id or name
   * @returns Success
   */
  removePlayerFromWhitelist(player: string | number): boolean {
    this._check();

    const playerId = toPlayerId(player);

    const result = visitUrl(
      `clan_whitelist.php?action=updatewl&pwd&who=${playerId}&remove=Remove`,
    );

    return result.includes("Whitelist updated.");
  }

  /**
   * Return the amount of meat in the current clan's coffer
   *
   * @returns Amount of meat
   */
  public getMeatInCoffer(): number {
    this._check();

    const page = visitUrl("clan_stash.php");
    const [, meat] = page.match(
      /Your <b>Clan Coffer<\/b> contains ([\d,]+) Meat./,
    ) || ["0", "0"];
    return parseNumber(meat);
  }

  /**
   * Add the given amount of meat to the current clan's coffer.
   *
   * @param amount Amount of meat to put in coffer
   * @returns Success
   */
  putMeatInCoffer(amount: number): boolean {
    this._check();

    const result = visitUrl(
      `clan_stash.php?pwd&action=contribute&howmuch=${amount}`,
    );
    return result.includes("You contributed");
  }

  /**
   * Take items from the stash
   *
   * This function will also take equivalent foldables if the original item cannot be found
   *
   * @param items Items to take
   * @returns Items successfully taken
   */
  take(items: Item[]): Item[];
  take(items: Map<Item, number>): Map<Item, number>;
  take(items: Item[] | Map<Item, number>): Item[] | Map<Item, number> {
    this._check();

    const map = arrayToCountedMap(items);

    map.forEach((quantity, item) => {
      let needed = Math.max(0, quantity - availableAmount(item));
      if (needed === 0) {
        return map.set(item, 0);
      }

      const foldGroup = getFoldGroup(item);

      for (const foldable of foldGroup) {
        const quantityToFold = Math.min(needed, availableAmount(foldable));
        for (let i = 0; i < quantityToFold; i++) {
          cliExecute(`fold ${item.name}`);
          needed--;
        }
        return map.set(item, needed);
      }

      refreshStash();

      for (const matchingItem of [item, ...foldGroup]) {
        const quantityToTake = Math.min(needed, stashAmount(matchingItem));
        if (quantityToTake === 0) continue;
        // If we can't take from the stash, there's no sense in iterating through the whole fold group
        if (!takeStash(quantityToTake, matchingItem)) return;
        if (matchingItem === item) {
          needed -= quantityToTake;
        } else {
          for (let i = 0; i < quantityToTake; i++) {
            cliExecute(`fold ${matchingItem.name}`);
            needed--;
          }
        }
      }
    });

    return Array.isArray(items) ? countedMapToArray(map) : map;
  }

  /**
   * Put items in the stash
   *
   * @param items Items to put in the stash
   * @returns Items successfully put in the stash
   */
  put(items: Item[]): Item[];
  put(items: Map<Item, number>): Map<Item, number>;
  put(items: Item[] | Map<Item, number>): Item[] | Map<Item, number> {
    this._check();

    const map = arrayToCountedMap(items);

    if (!this.check())
      throw new Error(
        `Wanted to return ${countedMapToString(map)} to ${
          this.name
        } but KoLmafia's clan data is out of sync`,
      );

    map.forEach((quantity, item) => {
      retrieveItem(quantity, item);
      const returned = Math.min(quantity, availableAmount(item));
      putStash(returned, item);
      map.set(item, quantity - returned);
    });

    return Array.isArray(items) ? countedMapToArray(map) : map;
  }

  /**
   * Return the monster that is currently in the current clan's fax machine if any
   */
  withStash<T>(items: Item[], callback: (borrowedItems: Item[]) => T): T;
  withStash<T>(
    items: Map<Item, number>,
    callback: (borrowedItems: Map<Item, number>) => T,
  ): T;
  withStash<T>(
    items: Item[] | Map<Item, number>,
    callback: (borrowedItems: any) => T, // eslint-disable-line @typescript-eslint/no-explicit-any
  ): T {
    this._check();

    const map = arrayToCountedMap(items);
    return Clan._withStash(
      () => this.take(map),
      (borrowed) => this.put(borrowed),
      callback,
    );
  }
}
