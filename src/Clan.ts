import {
  getClanId,
  getClanName,
  visitUrl,
  toMonster,
  getPlayerId,
} from "kolmafia";
import { parse } from "node-html-parser";

import { notNull, parseNumber } from "./utils";

function validate<T extends Function>(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<T>) {
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

const clanIdCache: { [clanName: string]: number } = {};

const toPlayerId = (player: string | number) =>
  typeof player === "string" ? getPlayerId(player) : player;

export class Clan {
  static LOG_FAX_PATTERN = /(\d{2}\/\d{2}\/\d{2}, \d{2}:\d{2}(?:AM|PM): )<a [^>]+>([^<]+)<\/a>(?: faxed in a (?<monster>.*?))<br>/;
  static WHITELIST_DEGREE_PATTERN = /(?<name>.*?) \(°(?<degree>\d+)\)/;

  readonly id: number;
  readonly name: string;

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
        };

        clanIdCache[clanName] = clan.id;
      }

      clanId = clanIdCache[clanName];
    } else {
      clanId = clanIdOrName;
      if (clanId === getClanId()) {
        return Clan.get();
      }
    }

    const result = visitUrl(
      `showclan.php?recruiter=1&whichclan=${clanId}&pwd&whichclan=${clanId}&action=joinclan&apply=Apply+to+this+Clan&confirm=on`
    );

    if (!result.includes("clanhalltop.gif")) {
      throw new Error("Could not join clan");
    }

    return Clan.get();
  }

  /**
  * Return player's current Clan
  */
  static get() {
    return new Clan(getClanId(), getClanName());
  }

  /**
   * Get list of clans to which the player is whitelisted
   */
  static getWhitelisted() {
    const root = parse(visitUrl("clan_signup.php"));

    return root
      .querySelectorAll('select[name="whichclan"] option')
      .map((option) => {
        const id = Number.parseInt(option.getAttribute("value") as string);
        const name = option.text;
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
  join() {
    const result = visitUrl(
      `showclan.php?recruiter=1&whichclan=${this.id}&pwd&whichclan=${this.id}&action=joinclan&apply=Apply+to+this+Clan&confirm=on`
    );

    if (!result.includes("clanhalltop.gif")) {
      throw new Error("Could not join clan");
    }

    return Clan.get();
  }

  /**
   * Return the monster that is currently in the current clan's fax machine if any
   */
  @validate
  getCurrentFax() {
    const logs = visitUrl("clan_log.php");

    const lastFax = logs.match(Clan.LOG_FAX_PATTERN);

    if (!lastFax) return null;

    const [, , , monsterName] = lastFax;

    if (!monsterName) return null;

    return toMonster(monsterName);
  }

  /**
   * List available ranks (name, degree and id) from the current clan
   */
  @validate
  getRanks() {
    const root = parse(visitUrl("clan_whitelist.php"));

    return root
      .querySelectorAll("select[name=level] option")
      .map((option) => {
        const match = option.text.match(Clan.WHITELIST_DEGREE_PATTERN);
        const id = option.getAttribute("value");

        if (!match || !id) return null;

        const [, name, degree] = match;

        return { name, degree: Number.parseInt(degree), id: Number.parseInt(id) };
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
    title: string = ""
  ) {
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
  removePlayerFromWhitelist(player: string | number) {
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
  public getMeatInCoffer() {
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
  putMeatInCoffer(amount: number) {
    const result = visitUrl(
      `clan_stash.php?pwd&action=contribute&howmuch=${amount}`
    );
    return result.includes("You contributed");
  }
}

