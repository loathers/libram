import { haveFamiliar, visitUrl } from "kolmafia";
import { get } from "../../property";
import { $familiar, $item } from "../../template-string";

const familiar = $familiar`Angry Jung Man`;

/**
 * @returns Whether we `have` the Jung Man
 */
export function have(): boolean {
  return haveFamiliar(familiar);
}

export enum Jar {
  SUSPICIOUS_GUY = "susguy",
  GOURD_CAPTAIN = "gourdcaptain",
  CRACKPOT_MYSTIC = "mystic",
  OLD_MAN = "oldman",
  PRETENTIOUS_ARTIST = "artist",
  MEATSMITH = "meatsmith",
  JICK = "jick",
}

const PLACES = {
  [Jar.PRETENTIOUS_ARTIST]: ["place", "town_wrong"],
  [Jar.GOURD_CAPTAIN]: ["place", "town_right"],
  [Jar.CRACKPOT_MYSTIC]: ["shop", "mystic"],
  [Jar.OLD_MAN]: ["place", "sea_oldman"],
  [Jar.MEATSMITH]: ["shop", "meatsmith"],
  [Jar.JICK]: ["showplayer", "1"],
  [Jar.SUSPICIOUS_GUY]: ["tavern"],
} as const;

export const JAR_ITEMS = {
  [Jar.SUSPICIOUS_GUY]: $item`jar of psychoses (The Suspicious-Looking Guy)`,
  [Jar.GOURD_CAPTAIN]: $item`jar of psychoses (The Captain of the Gourd)`,
  [Jar.CRACKPOT_MYSTIC]: $item`jar of psychoses (The Crackpot Mystic)`,
  [Jar.OLD_MAN]: $item`jar of psychoses (The Old Man)`,
  [Jar.PRETENTIOUS_ARTIST]: $item`jar of psychoses (The Pretentious Artist)`,
  [Jar.MEATSMITH]: $item`jar of psychoses (The Meatsmith)`,
  [Jar.JICK]: $item`jar of psychoses (Jick)`,
};

function getJungUrl(jar: Jar) {
  const [page, answer] = PLACES[jar];
  const question = page === "showplayer" ? "who" : `which${page}`;
  const params = [
    ["action", "jung"],
    ["whichperson", jar],
  ];
  if (answer) params.push([question, answer]);
  return `${page}.php?${params.map((pair) => pair.join("=")).join("&")}`;
}

/**
 * @returns Whether we can currently make a Jick jar
 */
export function canJickJar(): boolean {
  if (get("_jickJarAvailable") === "unknown") visitUrl("showplayer.php?who=1");
  return get("_jickJarAvailable") === "true" && !get("_psychoJarFilled");
}

/**
 * Tries to make a psychoanalytic jar with the chosen target
 *
 * @param jar The character of Loathing to psychoanalyze
 * @returns Whether we successfully crafted the jar
 */
export function makeJar(jar: Jar): boolean {
  if (jar === Jar.JICK && !canJickJar()) return false;
  const result = visitUrl(getJungUrl(jar));
  return result.includes(
    "You open up the jar and look into the patient's eyes.",
  );
}
