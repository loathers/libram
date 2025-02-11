import {
  cliExecute,
  Effect,
  handlingChoice,
  Item,
  lastChoice,
  myMeat,
  retrieveItem,
  runChoice,
  visitUrl,
} from "kolmafia";
import { get } from "../../property.js";
import { ValueOf } from "../../utils.js";

/**
 * @returns Whether you own the Boxing Daycare
 */
export function have(): boolean {
  return get("daycareOpen");
}

/**
 * @returns Whether we can currently have a Boxing Daydream
 */
export function canDaydream(): boolean {
  return have() && !get("_daycareNap");
}

/**
 * Have a Boxing Daydream, retrieving an item from the daycare
 * @returns Whether we succeeded in our endeavor
 */
export function daydream(): boolean {
  if (!canDaydream()) return false;
  return cliExecute("daycare item");
}

/**
 * @returns Whether we can currently visit the Boxing Day Spa
 */
export function canVisitSpa(): boolean {
  return have() && !get("_daycareSpa");
}

const SPA_PACKAGES = {
  "Mud Bath": "Muddled",
  "Mani-pedi": "Ten out of Ten",
  "Cucumber Eye Treatment": "Uncucumbered",
  "Thermal Spring Aromatherapy": "Flagrantly Fragrant",
} as const;
const SPA_PACKAGE_COMMANDS = ["mus", "mys", "mox", "regen"] as const;
type SpaPackage = keyof typeof SPA_PACKAGES | ValueOf<typeof SPA_PACKAGES>;
/**
 * Visit the Boxing Day Spa, getting a buff of your choice
 * @param target What spa package to request
 * @returns Whether we succeeded in our endeavor
 */
export function visitSpa(target: SpaPackage | Effect): boolean {
  if (!canVisitSpa()) return false;
  const targetString = target instanceof Effect ? target.name : target;
  const command =
    SPA_PACKAGE_COMMANDS[
      Object.entries(SPA_PACKAGES).findIndex((entry) =>
        entry.includes(targetString),
      )
    ];
  if (!command) return false;
  return cliExecute(`daycare ${command}`);
}

const visit = () =>
  visitUrl("place.php?whichplace=town_wrong&action=townwrong_boxingdaycare");
const visitDaycare = () => {
  visit();
  runChoice(3);
};

/**
 * Hire an instructor for your boxing daycare
 * @param shouldHire Function to determine if, given a particular item/quantity pair, we should actually attempt to hire an instructor
 * @returns Whether or not we successfully hired a new instructor
 */
export function hireInstructor(
  shouldHire: (item: Item, quantity: number) => boolean = () => true,
): boolean {
  if (!have()) return false;
  try {
    visitDaycare();
    const item = get("daycareInstructorItem");
    const quantity = get("daycareInstructorItemQuantity");
    if (!item || !quantity) return false;
    const initial = get("daycareInstructors");
    if (shouldHire(item, quantity)) {
      retrieveItem(item, quantity);
      if (!handlingChoice() || lastChoice() !== 1336) visitDaycare();
      runChoice(3);
      return initial === get("daycareInstructors");
    }
    return false;
  } finally {
    visitUrl("main.php");
  }
}

/**
 * Attempt to reroll your boxing daycare instructor item cost
 * @returns Whether we successfully rerolled the daycare instructor item
 */
export function rerollInstructor(): boolean {
  if (!have()) return false;
  try {
    visitDaycare();
    const initial = get("daycareInstructorItem");
    if (!get("daycareInstructorItem")) return false;
    runChoice(7);
    return initial === get("daycareInstructorItem");
  } finally {
    visitUrl("main.php");
  }
}

/**
 *
 * @param number Number of recruits; defaults to the current value
 * @returns The amount of meat it costs to recruit more toddlers
 */
export function recruitCost(number = get("_daycareRecruits")) {
  return Math.pow(10, 2 + number);
}

/**
 * Returns the lower and upper bound for the number of toddlers you can expect to recruit from the Boxing Daycare if you recruit
 * @param options Optional object containing equipment and instructors
 * @param options.equipment The amount of equipment you have; defaults to current value
 * @param options.instructors The number of instructors you have; defaults to current value
 * @returns A tuple consisting of the lower and upper bounds of how many toddlers you might get from recruiting toddlers
 */
export function expectedRecruits({
  equipment = get("daycareEquipment"),
  instructors = get("daycareInstructors"),
} = {}): [number, number] {
  return [(equipment * instructors ** 2) / 2, equipment * instructors ** 2];
}

/**
 * Recruit toddlers for your Boxing Daycare
 * @returns Whether we successfully recruited more toddlers
 */
export function recruit(): boolean {
  if (!have()) return false;
  if (myMeat() < recruitCost()) return false;
  const initial = get("daycareToddlers");
  visitDaycare();
  runChoice(1);
  visitUrl("main.php");
  return initial === get("daycareToddlers");
}

/**
 * Scavenge in the boxing daycare
 * @returns Whether we successfully scavenged
 */
export function scavenge(): boolean {
  if (!have()) return false;
  return cliExecute("daycare scavenge");
}
