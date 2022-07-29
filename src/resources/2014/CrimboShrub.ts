import { toInt, useFamiliar, visitUrl } from "kolmafia";
import { have as have_ } from "../../lib";
import { get } from "../../property";
import { $familiar, $item } from "../../template-string";

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

function isDecoratedWith(
  topper: ShrubTopper,
  lights: ShrubLights,
  garland: ShrubGarland,
  gifts: ShrubGifts
): boolean {
  const decorations = [
    get("shrubTopper"),
    get("shrubLights"),
    get("shrubGarland"),
    get("shrubGifts"),
  ].map((x) => Prefs[x as ShrubPref]);
  return [topper, lights, garland, gifts].every((x, i) => x === decorations[i]);
}

export function decorate(
  topper: ShrubTopper,
  lights: ShrubLights,
  garland: ShrubGarland,
  gifts: ShrubGifts
): boolean {
  if (!have()) return false;
  if (get("_shrubDecorated"))
    return isDecoratedWith(topper, lights, garland, gifts);
  if (!have_($item`box of old Crimbo decorations`))
    useFamiliar($familiar`Crimbo Shrub`);

  visitUrl(
    `inv_use.php?pwd=&which=99&whichitem=${toInt(
      $item`box of old Crimbo decorations`
    )}`
  );
  visitUrl(
    `choice.php?whichchoice=999&pwd=&option=1&topper=${Toppers[topper]}&lights=${Lights[lights]}&garland=${Garland[garland]}&gift=${Gifts[gifts]}`
  );
  return true;
}
