import "core-js/features/array/flat-map";
import {
  availableAmount,
  cliExecute,
  getClanId,
  getClanName,
  getPlayerId,
  putStash,
  refreshStash,
  retrieveItem,
  stashAmount,
  takeStash,
  visitUrl,
  xpath,
} from "kolmafia";

import { getFoldGroup } from "./lib";
import logger from "./logger";
import {
  arrayToCountedMap,
  countedMapToArray,
  countedMapToString,
  notNull,
  parseNumber,
} from "./utils";

export interface Rank {
  name: string;
  degree: number;
  id: number;
}

export class ClanError extends Error {
  reason?: Error;
  constructor(message: string, reason?: Error) {
    super(message);
    this.reason = reason;
    Object.setPrototypeOf(this, ClanError.prototype);
  }
}

// It would be fantastic to have this function properly typed
// But until someone can work out how to do it, it gets the
// comment blocks of shame
/* eslint-disable */
function validate<T extends Function>(
  target: any,
  propertyName: string,
  descriptor: TypedPropertyDescriptor<T>
) {
  if (!descriptor?.value) return;

  const method = descriptor.value;

  // @ts-ignore
  descriptor.value = function (...args: any[]) {
    // @ts-ignore
    if (this.id !== getClanId()) {
      throw new Error("You are no longer a member of this clan");
    }

    return method.apply(this, args);
  };
}
/* eslint-enable */

const clanIdCache: { [clanName: string]: number } = {};

const toPlayerId = (player: string | number) =>
  typeof player === "string" ? getPlayerId(player) : player;

const LOG_FAX_PATTERN = /(\d{2}\/\d{2}\/\d{2}, \d{2}:\d{2}(?:AM|PM): )<a [^>]+>([^<]+)<\/a>(?: faxed in a (?<monster>.*?))<br>/;
const WHITELIST_DEGREE_PATTERN = /(?<name>.*?) \(°(?<degree>\d+)\)/;

export class Clan {
  readonly id: number;
  readonly name: string;

  private static _join(id: number) {
    const result = visitUrl(
      `showclan.php?recruiter=1&whichclan=${id}&pwd&whichclan=${id}&action=joinclan&apply=Apply+to+this+Clan&confirm=on`
    );

    if (!result.includes("clanhalltop.gif")) {
      throw new Error("Could not join clan");
    }

    return Clan.get();
  }

  private static _withStash<T>(
    borrowFn: () => Item[],
    returnFn: (items: Item[]) => Item[],
    callback: (borrowedItems: Item[]) => T
  ): T;
  private static _withStash<T>(
    borrowFn: () => Map<Item, number>,
    returnFn: (items: Map<Item, number>) => Map<Item, number>,
    callback: (borrowedItems: Map<Item, number>) => T
  ): T;
  private static _withStash<T>(
    borrowFn: () => Item[] | Map<Item, number>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    returnFn: (items: any) => Item[] | Map<Item, number>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callback: (borrowedItems: any) => T
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
            }</b> stash`
          );
        }
      }
    }
  }

  /**
   * Join a clan and return its instance
   * @param clanIdOrName Clan id or name
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
          (c) => c.name.toLowerCase() === clanName
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
   * Execute callback as a member of a clan
   * and then restore prior membership
   * @param clanIdOrName Clan id or name
   */
  static with<T>(
    clanIdOrName: string | number,
    callback: (clan: Clan) => T
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
    callback: (borrowedItems: Item[]) => T
  ): T;
  static withStash<T>(
    clanIdOrName: string | number,
    items: Map<Item, number>,
    callback: (borrowedItems: Map<Item, number>) => T
  ): T;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  static withStash<T>(
    clanIdOrName: string | number,
    items: any,
    callback: (borrowedItems: any) => T
  ): T {
    return Clan._withStash(
      () => Clan.with(clanIdOrName, (clan) => clan.take(items)),
      (borrowed) => Clan.with(clanIdOrName, (clan) => clan.put(borrowed)),
      callback
    );
  }

  /**
   * Return player's current Clan
   */
  static get(): Clan {
    return new Clan(getClanId(), getClanName());
  }

  /**
   * Get list of clans to which the player is whitelisted
   */
  static getWhitelisted(): Clan[] {
    const page = visitUrl("clan_signup.php");

    return xpath(page, '//select[@name="whichclan"]//option').map((option) => {
      const validHtml = `<select>${option}</select>`;
      const id = Number.parseInt(xpath(validHtml, "//@value")[0]);
      const name = xpath(validHtml, "//text()")[0];
      return new Clan(id, name);
    });
  }

  private constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  /**
   * Join clan
   */
  join(): Clan {
    return Clan._join(this.id);
  }

  check(): boolean {
    return visitUrl("clan_hall.php").includes(`<b>${this.name}</b>`);
  }

  /**
   * Return the monster that is currently in the current clan's fax machine if any
   */
  @validate
  getCurrentFax(): Monster | null {
    const logs = visitUrl("clan_log.php");

    const lastFax = logs.match(LOG_FAX_PATTERN);

    if (!lastFax) return null;

    const [, , , monsterName] = lastFax;

    if (!monsterName) return null;

    return Monster.get(monsterName);
  }

  /**
   * List available ranks (name, degree and id) from the current clan
   */
  @validate
  getRanks(): Rank[] {
    const page = visitUrl("clan_whitelist.php");

    return xpath(page, '//select[@name="level"]//option')
      .map((option) => {
        const validHtml = `<select>${option}</select>`;
        const match = xpath(validHtml, "//text()")[0].match(
          WHITELIST_DEGREE_PATTERN
        );
        const id = xpath(validHtml, "//@value")[0];

        if (!match || !id) return null;

        const [, name, degree] = match;

        return {
          name,
          degree: Number.parseInt(degree),
          id: Number.parseInt(id),
        };
      })
      .filter(notNull);
  }

  /**
   * Add a player to the current clan's whitelist.
   * If the player is already in the whitelist this will change their rank or title.
   * @param player Player id or name
   * @param rankName Rank to give the player. If not provided they will be given the lowest rank
   * @param title Title to give the player. If not provided, will be blank
   */
  @validate
  addPlayerToWhitelist(
    player: string | number,
    rankName?: string,
    title = ""
  ): boolean {
    const playerId = toPlayerId(player);

    const ranks = this.getRanks();
    const rank = rankName
      ? ranks.find((r) => r.name === rankName)
      : ranks.sort((a, b) => a.degree - b.degree)[0];

    if (!rank) return false;

    const result = visitUrl(
      `clan_whitelist.php?action=add&pwd&addwho=${playerId}&level=${rank.id}&title=${title}`
    );

    return (
      result.includes("added to whitelist.") ||
      result.includes("That player is already on the whitelist")
    );
  }

  /**
   * Remove a player from the current clan's whitelist
   * @param player Player id or name
   */
  @validate
  removePlayerFromWhitelist(player: string | number): boolean {
    const playerId = toPlayerId(player);

    const result = visitUrl(
      `clan_whitelist.php?action=updatewl&pwd&who=${playerId}&remove=Remove`
    );

    return result.includes("Whitelist updated.");
  }

  /**
   * Return the amount of meat in the current clan's coffer.
   */
  @validate
  public getMeatInCoffer(): number {
    const page = visitUrl("clan_stash.php");
    const [, meat] = page.match(
      /Your <b>Clan Coffer<\/b> contains ([\d,]+) Meat./
    ) || ["0", "0"];
    return parseNumber(meat);
  }

  /**
   * Add the given amount of meat to the current clan's coffer.
   * @param amount Amount of meat to put in coffer
   */
  @validate
  putMeatInCoffer(amount: number): boolean {
    const result = visitUrl(
      `clan_stash.php?pwd&action=contribute&howmuch=${amount}`
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
  @validate
  take(items: Item[] | Map<Item, number>): Item[] | Map<Item, number> {
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
   * @param items Items to put in the stash
   * @returns Items successfully put in the stash
   */
  put(items: Item[]): Item[];
  put(items: Map<Item, number>): Map<Item, number>;
  @validate
  put(items: Item[] | Map<Item, number>): Item[] | Map<Item, number> {
    const map = arrayToCountedMap(items);

    if (!this.check())
      throw new Error(
        `Wanted to return ${countedMapToString(map)} to ${
          this.name
        } but KoLmafia's clan data is out of sync`
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
    callback: (borrowedItems: Map<Item, number>) => T
  ): T;
  @validate
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  withStash<T>(
    items: Item[] | Map<Item, number>,
    callback: (borrowedItems: any) => T
  ): T {
    const map = arrayToCountedMap(items);
    return Clan._withStash(
      () => this.take(map),
      (borrowed) => this.put(borrowed),
      callback
    );
  }
}
