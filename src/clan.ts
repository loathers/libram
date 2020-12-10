import {
  getClanId,
  getClanName,
  visitUrl,
  toMonster,
  getPlayerId,
} from "kolmafia";
import { parse } from "node-html-parser";

import { notNull, parseNumber } from "./utils";

const clanIdCache: { [clanName: string]: number } = {};

/**
 * Get list of clans to which the player is whitelisted
 */
export function getWhitelist() {
  const root = parse(visitUrl("clan_signup.php"));

  return root
    .querySelectorAll('select[name="whichclan"] option')
    .map((option) => ({
      id: Number.parseInt(option.getAttribute("value") as string),
      name: option.text,
    }));
}

/**
 * Join a clan
 * @param clanIdOrName Clan id or name
 */
export function join(clanIdOrName: string | number) {
  let clanId;

  if (typeof clanIdOrName === "string") {
    const clanName = clanIdOrName.toLowerCase();
    if (clanName === getClanName().toLowerCase()) {
      return true;
    }

    if (!(clanName in clanIdCache)) {
      const clan = getWhitelist().find(
        (c) => c.name.toLowerCase() === clanName
      );

      if (!clan) return false;

      clanIdCache[clanName] = clan.id;
    }

    clanId = clanIdCache[clanName];
  } else {
    clanId = clanIdOrName;
    if (clanId === getClanId()) {
      return true;
    }
  }

  const result = visitUrl(
    `showclan.php?recruiter=1&whichclan=${clanId}&pwd&whichclan=${clanId}&action=joinclan&apply=Apply+to+this+Clan&confirm=on`
  );

  return result.includes("clanhalltop.gif");
}

/**
 * Return the name and id of the current clan
 */
export function get() {
  return { id: getClanId(), name: getClanName() };
}

/**
 * Return the id of the current clan
 */
export function getId() {
  return getClanId();
}

/**
 * Return the name of the current clan
 */
export function getName() {
  return getClanName();
}

const CLAN_LOG_FAX_PATTERN = /(\d{2}\/\d{2}\/\d{2}, \d{2}:\d{2}(?:AM|PM): )<a [^>]+>([^<]+)<\/a>(?: faxed in a (?<monster>.*?))<br>/;

/**
 * Return the monster that is currently in the current clan's fax machine if any
 */
export function getCurrentFax() {
  const logs = visitUrl("clan_log.php");

  const lastFax = logs.match(CLAN_LOG_FAX_PATTERN);

  if (!lastFax) return null;

  const [, , , monsterName] = lastFax;

  if (!monsterName) return null;

  return toMonster(monsterName);
}

const CLAN_WHITELIST_DEGREE_PATTERN = /(?<name>.*?) \(°(?<degree>\d+)\)/;

/**
 * List available ranks (name, degree and id) from the current clan
 */
export function getRanks() {
  const root = parse(visitUrl("clan_whitelist.php"));

  return root
    .querySelectorAll("select[name=level] option")
    .map((option) => {
      const match = option.text.match(CLAN_WHITELIST_DEGREE_PATTERN);
      const id = option.getAttribute("value");

      if (!match || !id) return null;

      const [, name, degree] = match;

      return { name, degree: Number.parseInt(degree), id: Number.parseInt(id) };
    })
    .filter(notNull);
}

const toPlayerId = (player: string | number) =>
  typeof player === "string" ? getPlayerId(player) : player;

/**
 * Add a player to the current clan's whitelist.
 * If the player is already in the whitelist this will change their rank or title.
 * @param player Player id or name
 * @param rankName Rank to give the player. If not provided they will be given the lowest rank
 * @param title Title to give the player. If not provided, will be blank
 */
export function addPlayerToWhitelist(
  player: string | number,
  rankName?: string,
  title: string = ""
) {
  const playerId = toPlayerId(player);

  const ranks = getRanks();
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

export function removePlayerFromWhitelist(player: string | number) {
  const playerId = toPlayerId(player);

  const result = visitUrl(
    `clan_whitelist.php?action=updatewl&pwd&who=${playerId}&remove=Remove`
  );

  return result.includes("Whitelist updated.");
}

/**
 * Return the amount of meat in the current clan's coffer.
 */
export function getMeatInCoffer() {
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
export function putMeatInCoffer(amount: number) {
  const result = visitUrl(
    `clan_stash.php?pwd&action=contribute&howmuch=${amount}`
  );
  return result.includes("You contributed");
}
