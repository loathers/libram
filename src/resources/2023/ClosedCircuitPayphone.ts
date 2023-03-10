import {
  Monster,
  Item,
  Location,
  getMonsters,
  itemDrops,
  canAdventure,
} from "kolmafia";
import { have as have_ } from "../../lib";
import { get } from "../../property";
import { $item, $location } from "../../template-string";
import { maxBy } from "../../utils";

export const item = $item`closed-circuit pay phone`;

/**
 * @returns Whether we currently have the closed-circuit pay phone
 */
export function have(): boolean {
  return have_(item);
}

/**
 * @returns Rufus's currently expected quest target, if he has one
 */
export function rufusTarget(): Monster | Item | string | null {
  const target = get("rufusQuestTarget");
  switch (get("rufusQuestType")) {
    case "entity":
      return Monster.get(target);
    case "artifact":
    case "items":
      return Item.get(target);
    default:
      return null;
  }
}

const INGRESS_RIFTS: { [x in string]: Location } = {
  desertbeach: $location`Shadow Rift (Desert Beach)`,
  forestvillage: $location`Shadow Rift (Forest Village)`,
  mclargehuge: $location`Shadow Rift (Mt. McLargeHuge)`,
  beanstalk: $location`Shadow Rift (Somewhere Over the Beanstalk)`,
  manor3: $location`Shadow Rift (Spookyraven Manor Third Floor)`,
  "8bit": $location`Shadow Rift (The 8-Bit Realm)`,
  pyramid: $location`Shadow Rift (The Ancient Buried Pyramid)`,
  giantcastle: $location`Shadow Rift (The Castle in the Clouds in the Sky)`,
  woods: $location`Shadow Rift (The Distant Woods)`,
  hiddencity: $location`Shadow Rift (The Hidden City)`,
  cemetery: $location`Shadow Rift (The Misspelled Cemetary)`,
  plains: $location`Shadow Rift (The Nearby Plains)`,
  town_right: $location`Shadow Rift (The Right Side of the Tracks)`,
} as const;

/**
 * @returns The current shadow rift that Mafia thinks KoL thinks you're in.
 */
export function currentRift(): Location | null {
  return INGRESS_RIFTS[get("shadowRiftIngress")] ?? null;
}

const RIFTS: readonly Location[] = Array.from(Object.values(INGRESS_RIFTS));

/**
 * Choose a shadow rift to suit your needs
 * @param options.canAdventure Set to `true` if you want to only select a rift that you can currently access
 * @param options.monsters Set to an array of Shadow Monsters you want to be available in the rift
 * @param options.drops Set to an array of item drops you want to come from monsters in the rift
 * @param options.otherFilter Set an optional additional filtering function not covered by the above logic
 * @param options.sortBy Set a function used to compare valid rifts between eachother; bigger numbers are better
 * @returns A rift that meets the criteria you specify, if one exists
 */
export function chooseRift(options: {
  canAdventure?: boolean;
  monsters?: Monster[];
  drops?: Item[];
  otherFilter?: (l: Location) => boolean;
  sortBy?: (l: Location) => number;
}): Location | null {
  const filterFunction = (l: Location) => {
    const monsters = getMonsters(l);
    if (options.canAdventure && !canAdventure(l)) return false;
    if (options.monsters?.some((m) => !monsters.includes(m))) return false;
    if (
      options.drops?.every((i) => !monsters.some((m) => i.name in itemDrops(m)))
    )
      return false;
    return options.otherFilter?.(l) ?? true;
  };

  const validRifts = [...RIFTS].filter(filterFunction);
  if (!validRifts.length) return null;
  return options.sortBy ? maxBy(validRifts, options.sortBy) : validRifts[0];
}
