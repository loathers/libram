import {
  availableAmount,
  availableChoiceOptions,
  handlingChoice,
  Item,
  Location,
  runChoice,
  toLocation,
  totalTurnsPlayed,
  visitUrl,
  xpath,
} from "kolmafia";
import { directlyUse } from "../../lib";
import { get } from "../../property";
import { $item } from "../../template-string";
import { arrayContains } from "../../utils";

const item = Item.get("autumn-aton");

/**
 * Is the autumn-aton currently in your inventory, available to deploy?
 *
 * @returns The whether the autumn-aton is currently available for deployment
 */
export function available(): boolean {
  return availableAmount(item) > 0;
}

/**
 * Do you own the autumn-aton?
 *
 * @returns Whether you are an autumn-aton `have`r
 */
export function have(): boolean {
  return get("hasAutumnaton") || available();
}

/**
 * Internal function used to parse the fallbot's choice adventure to determine which zones are currently available
 *
 * @param html The pagetext of the fallbot's choice adventure
 * @returns The locations currently available to send the fallbot to
 */
function checkLocations(html: string): Location[] {
  return xpath(
    html,
    '//select[@name="heythereprogrammer"]//option[position()>1]/text()',
  ).map((name) => toLocation(name));
}

/**
 * @returns The current location the autumn-aton is questing in; null if it is not on a quest.
 */
export function currentlyIn(): Location | null {
  return get("autumnatonQuestLocation");
}

/**
 * Deploy the autumn-aton to a location of your choosing.
 *
 * @param target A location to send the autumn-aton to, or a prioritized list of locations to send it to, or a function to pick which location to send it to.
 * @param upgrade Should we apply any upgrades we see available?
 * @returns Where we ended up sending the autumn-aton; null if we didn't send it off.
 */
export function sendTo(
  target: Location | Location[] | ((locations: Location[]) => Location),
  upgrade = true,
): Location | null {
  if (!available()) return null;

  const pageHtml = directlyUse(item);

  if (upgrade && availableChoiceOptions()[1]) runChoice(1);

  const locationsAvailable = checkLocations(pageHtml);
  const location =
    target instanceof Location
      ? target
      : Array.isArray(target)
        ? target.find((l) => locationsAvailable.includes(l))
        : target(locationsAvailable);
  if (!location) return null;
  if (!locationsAvailable.includes(location)) return null;

  if (!handlingChoice()) directlyUse(item);
  runChoice(2, `heythereprogrammer=${location.id}`);
  if (handlingChoice()) visitUrl("main.php");
  return location;
}

/**
 * Install any available upgrades for the autumn-aton.
 *
 * @returns Whether there were any upgrades to install.
 */
export function upgrade(): boolean {
  directlyUse(item);
  const canUpgrade = availableChoiceOptions()[1] !== undefined;
  if (canUpgrade) runChoice(1);
  visitUrl("main.php");
  return canUpgrade;
}

/**
 * @returns A list of all locations you can send your autumn-aton to right now. Empty if you are unable to send it anywhere.
 */
export function availableLocations(): Location[] {
  if (!available()) return [];
  const pageHtml = directlyUse(item);
  visitUrl("main.php");
  return checkLocations(pageHtml);
}

/**
 * The mafia names for the autumn-aton upgrades
 */
export const possibleUpgrades = [
  "leftarm1",
  "leftleg1",
  "rightarm1",
  "rightleg1",
  "base_blackhat",
  "cowcatcher",
  "periscope",
  "radardish",
  "dualexhaust",
] as const;
export type Upgrade = (typeof possibleUpgrades)[number];

/**
 * @returns An array containing the upgrades that you currently have on your autumn-aton.
 */
export function currentUpgrades(): Upgrade[] {
  return get("autumnatonUpgrades").split(",") as Upgrade[];
}

/**
 * @returns The number of turns remaining in your current autumn-aton quest. This number may be negative for any number of reasons.
 */
export function turnsLeft(): number {
  return get("autumnatonQuestTurn") - totalTurnsPlayed();
}

/**
 * @returns The number of leg-upgrades your autumn-aton has installed
 */
export function legs(): number {
  return currentUpgrades().filter((u) => u.includes("leg")).length;
}

/**
 * @returns The number of turns we expect your next autumn-aton quest to take.
 */
export function turnsForQuest(): number {
  return 11 * Math.max(1, get("_autumnatonQuests") - legs());
}

/**
 * @returns The current visual acuity level of your autumn-aton as determined by the current upgrade-state.
 */
export function visualAcuity(): 1 | 2 | 3 {
  const visualUpgrades = ["periscope", "radardish"];
  return (1 +
    currentUpgrades().filter((u) => visualUpgrades.includes(u)).length) as
    | 1
    | 2
    | 3;
}

/**
 * @returns The number of items from a zone we expect the autumn-aton to steal based on the current upgrade-state. It may not succeed in stealing every item it can.
 */
export function zoneItems(): 3 | 4 | 5 {
  return (3 + currentUpgrades().filter((u) => u.includes("arm")).length) as
    | 3
    | 4
    | 5;
}

/**
 * @returns The number of seasonal items we expect the autumn-aton to return with given its current upgrade-state.
 */
export function seasonalItems(): 1 | 2 {
  return currentUpgrades().includes("cowcatcher") ? 2 : 1;
}

const difficulties = ["low", "mid", "high"] as const;
const UNIQUES = {
  outdoor: {
    low: { index: 4, item: $item`autumn leaf` },
    mid: { index: 2, item: $item`autumn debris shield` },
    high: { index: 6, item: $item`autumn leaf pendant` },
  },
  indoor: {
    low: { index: 0, item: $item`AutumnFest ale` },
    mid: { index: 3, item: $item`autumn-spice donut` },
    high: { index: 7, item: $item`autumn breeze` },
  },
  underground: {
    low: { index: 1, item: $item`autumn sweater-weather sweater` },
    mid: { index: 5, item: $item`autumn dollar` },
    high: { index: 8, item: $item`autumn years wisdom` },
  },
};

/**
 * Determines and returns the upgrade and item drop associated with the given location
 *
 * @param location The location to check the expected autumn-aton-unique drops of
 * @returns `null` if the location has no upgrade or drop; otherwise, the upgrade and the autumn-aton item associated with that item
 */
export function getUniques(location: Location): {
  upgrade: Upgrade;
  item: Item;
} | null {
  const env = location.environment;
  const difficulty = location.difficultyLevel;
  if (
    arrayContains(env, ["outdoor", "indoor", "underground"] as const) &&
    arrayContains(difficulty, difficulties)
  ) {
    const { index, item } = UNIQUES[env][difficulty];
    return { upgrade: possibleUpgrades[index], item };
  }
  return null;
}
