import { myClass, cliExecute, equip, visitUrl } from "kolmafia";
import { have as have_, questStep } from "../../lib.js";
import { get } from "../../property.js";
import { $classes, $item, $slot } from "../../template-string.js";

const item = $item`tearaway pants`;
/**
 * @returns Whether you `have` the tearaway pants
 */
export function have(): boolean {
  return have_(item);
}

/**
 * Calculate the chance of getting adventures from a fight against plants
 * @param advs The number of adventures to calculate the probability at; defaults to the current value
 * @returns The likelihood of getting an adventure from ripping off your pants against plants
 */
export function plantsAdventureChance(
  advs = get("_tearawayPantsAdvs"),
): number {
  return 1 / (2 + advs);
}

/**
 * Calculate the expected total number of pant-plant adventures you'll gain over a period
 * @param turnsToSpend The total number of plant-combats you expect to spend
 * @param startingAdvs The number of pant-plants adventures to start with--defaults to the current value
 * @returns The expected total number of adventures to gain over the period
 */
export function expectedTotalAdventures(
  turnsToSpend: number,
  startingAdvs = get("_tearawayPantsAdvs"),
): number {
  return (
    (1 -
      2 * startingAdvs +
      Math.sqrt(
        4 * startingAdvs ** 2 - 4 * startingAdvs + 1 + 8 * turnsToSpend,
      )) /
    2
  );
}

/**
 * Attempt to unlock the moxie guild--for free--using these incredible pants
 * @returns Whether we've successfully unlocked the moxie guild
 */
export function unlockGuild(): boolean {
  if (!$classes`Disco Bandit, Accordion Thief`.includes(myClass()))
    return false;
  if (questStep("questG08Moxie") >= 999) return true;
  if (!have()) return false;
  try {
    cliExecute("checkpoint");
    equip($slot`pants`, item);
    visitUrl("guild.php?place=challenge");
  } finally {
    cliExecute("outfit checkpoint");
  }

  return questStep("questG08Moxie") >= 999;
}
