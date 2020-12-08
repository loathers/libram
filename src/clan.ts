import {
  getClanId,
  getClanName,
  visitUrl,
  toMonster,
  print,
  getPlayerId,
} from "kolmafia";
import { parse } from "node-html-parser";

import { notNull } from "./utils";

const clanIdCache: { [clanName: string]: number } = {};

export function getWhitelist() {
  const root = parse(visitUrl("clan_signup.php"));

  return root
    .querySelectorAll('select[name="whichclan"] option')
    .map((option) => ({
      id: Number.parseInt(option.getAttribute("value") as string),
      name: option.text,
    }));
}

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

export function get() {
  return { id: getClanId(), name: getClanName() };
}

export function getId() {
  return getClanId();
}

export function getName() {
  return getClanName();
}

const CLAN_LOG_FAX_PATTERN = /(\d{2}\/\d{2}\/\d{2}, \d{2}:\d{2}(?:AM|PM): )<a [^>]+>([^<]+)<\/a>(?: faxed in a (?<monster>.*?))<br>/;

export function getCurrentFax() {
  const logs = visitUrl("clan_log.php");

  const lastFax = logs.match(CLAN_LOG_FAX_PATTERN);

  if (!lastFax) return null;

  const [, , , monsterName] = lastFax;

  if (!monsterName) return null;

  return toMonster(monsterName);
}

const CLAN_WHITELIST_DEGREE_PATTERN = /(?<name>.*?) \(°(?<degree>\d+)\)/;

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

export function removePlayerFromWhitelist(player: string | number) {
  const playerId = toPlayerId(player);

  const result = visitUrl(
    `clan_whitelist.php?action=updatewl&pwd&who=${playerId}&remove=Remove`
  );

  return result.includes("Whitelist updated.");
}
