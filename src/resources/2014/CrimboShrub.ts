import { useFamiliar, visitUrl } from "kolmafia";
import { directlyUse, have as have_ } from "../../lib.js";
import { get } from "../../property.js";
import { $familiar, $item } from "../../template-string.js";

/**
 * @returns Whether we `have` the Crimbo Shrub in our terrarium
 */
export function have(): boolean {
  return have_($familiar`Crimbo Shrub`);
}

const Toppers = {
  Muscle: 1,
  Mysticality: 2,
  Moxie: 3,
} as const;

type ShrubTopper = keyof typeof Toppers;

const Lights = {
  "Prismatic Damage": 1,
  "Hot Damage": 2,
  "Cold Damage": 3,
  "Stench Damage": 4,
  "Spooky Damage": 5,
  "Sleaze Damage": 6,
} as const;

type ShrubLights = keyof typeof Lights;

const Garland = {
  "HP Regen": 1,
  "PvP Fights": 2,
  Blocking: 3,
} as const;

type ShrubGarland = keyof typeof Garland;

const Gifts = {
  "Yellow Ray": 1,
  "Red Ray": 2,
  Gifts: 3,
} as const;

type ShrubGifts = keyof typeof Gifts;

const Prefs = {
  Muscle: "Muscle",
  Mysticality: "Mysticality",
  Moxie: "Moxie",
  Prismatic: "Prismatic Damage",
  Hot: "Hot Damage",
  Cold: "Cold Damage",
  Stench: "Stench Damage",
  Spooky: "Spooky Damage",
  Sleaze: "Sleaze Damage",
  HP: "HP Regen",
  PvP: "PvP Fights",
  blocking: "Blocking",
  yellow: "Yellow Ray",
  meat: "Red Ray",
  gifts: "Gifts",
} as const;

type ShrubPref = keyof typeof Prefs;

/**
 * Internal function used to check whether decour perfectly matches what we want
 *
 * @param topper Topper to check for
 * @param lights Lights to check for
 * @param garland Garland to check for
 * @param gifts Gifts to check for
 * @returns Whether every single decour matches what we expect
 */
function isDecoratedWith(
  topper: ShrubTopper,
  lights: ShrubLights,
  garland: ShrubGarland,
  gifts: ShrubGifts,
): boolean {
  const decorations = [
    get("shrubTopper"),
    get("shrubLights"),
    get("shrubGarland"),
    get("shrubGifts"),
  ].map((x) => Prefs[x as ShrubPref]);
  return [topper, lights, garland, gifts].every((x, i) => x === decorations[i]);
}

/**
 * Decorates our Crimbo Shrub with the chosen decour, if able
 *
 * @param topper The shrub Topper to select
 * @param lights The shrub Lights to select
 * @param garland The shrub Garland to select
 * @param gifts The shrub Gifts to select
 * @returns Whether the shrub's decour perfectly matches the given decour
 */
export function decorate(
  topper: ShrubTopper,
  lights: ShrubLights,
  garland: ShrubGarland,
  gifts: ShrubGifts,
): boolean {
  if (!have()) return false;
  if (get("_shrubDecorated"))
    return isDecoratedWith(topper, lights, garland, gifts);
  if (!have_($item`box of old Crimbo decorations`)) {
    useFamiliar($familiar`Crimbo Shrub`);
  }

  directlyUse($item`box of old Crimbo decorations`);
  visitUrl(
    `choice.php?whichchoice=999&pwd=&option=1&topper=${Toppers[topper]}&lights=${Lights[lights]}&garland=${Garland[garland]}&gift=${Gifts[gifts]}`,
  );

  return isDecoratedWith(topper, lights, garland, gifts);
}
