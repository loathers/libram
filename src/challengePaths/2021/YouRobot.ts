import { round, runChoice, Slot, Stat, visitUrl } from "kolmafia";
import { have } from "../../lib.js";
import { get } from "../../property.js";
import { $path, $skill, $slot, $stat } from "../../template-string.js";

export const path = $path`You, Robot`;

type Upgrade = "robot_shirt" | "robot_energy" | "robot_potions";

/**
 * Runs one turn scavenging in the scrapheap
 */
export function scavenge(): void {
  visitUrl("place.php?whichplace=scrapheap&action=sh_scrounge");
}

/**
 * Spends one turn collecting energy in the scrapheap
 */
export function collectEnergy(): void {
  visitUrl("place.php?whichplace=scrapheap&action=sh_getpower");
}

/**
 * @returns the energy cost for the next use of the chronolith
 */
export function expectedEnergyNextCollect(): number {
  const raw = (25 + get("youRobotPoints")) * 0.85 ** get("_energyCollected");
  return round(raw);
}

/**
 * Spends energy at the chronolith to get 10 adventures
 */
export function visitChronolith(): void {
  visitUrl("place.php?whichplace=scrapheap&action=sh_chronobo");
}

/**
 * @returns how much energy we expect the next chronolith use to take
 */
export function expectedChronolithCost(): number {
  return get("_chronolithNextCost");
}

/**
 *
 * @param stat the stat we want to boost using the statbot
 */
export function visitStatbot(stat: Stat) {
  visitUrl("place.php?whichplace=scrapheap&action=sh_upgrade");
  if (stat === $stat`Muscle`) runChoice(1);
  else if (stat === $stat`Mysticality`) runChoice(2);
  else if (stat === $stat`Moxie`) runChoice(3);
}
/**
 * @param uses defines the number of times we want to visit the statbot
 * @returns the anticipated cost of the total visits
 */
export function expectedStatbotCost(uses = 1): number {
  return (10 + get("statbotUses")) * uses + ((uses - 1) * uses) / 2;
}

/**
 * @param upgrade defines the robot part you want to check for
 * @returns whether that part is currently equipped
 */
export function haveUpgrade(upgrade: Upgrade): boolean {
  return get("youRobotCPUUpgrades").includes(upgrade);
}

/**
 * @param upgrade defines the upgrade you want to complete
 * @returns whether the upgrade was successfully completed
 */
export function doUpgrade(upgrade: Upgrade): boolean {
  if (haveUpgrade(upgrade)) return true;
  visitUrl("place.php?whichplace=scrapheap&action=sh_configure");
  visitUrl("choice.php?whichchoice=1445&show=cpus");
  visitUrl(
    `choice.php?pwd&whichchoice=1445&part=cpus&show=cpus&option=2&p=${upgrade}`,
  );
  return haveUpgrade(upgrade);
}

function getPartId(which: "top" | "left" | "right" | "bottom") {
  switch (which) {
    case "top":
      return get("youRobotTop");
    case "left":
      return get("youRobotLeft");
    case "right":
      return get("youRobotRight");
    case "bottom":
      return get("youRobotBottom");
  }
}

/**
 *
 * @param which defines which section you want to swap from
 * @param id defines the part id you want to swap to
 * @returns whether the swap was successful
 */
export function doSwitchPart(
  which: "top" | "left" | "right" | "bottom",
  id: number,
): boolean {
  if (getPartId(which) === id) return true;
  visitUrl("place.php?whichplace=scrapheap&action=sh_configure");
  visitUrl(`choice.php?whichchoice=1445&show=${which}`);
  visitUrl(
    `choice.php?whichchoice=1445&part=${which}&show=${which}&option=1&p=${id}`,
  );
  return getPartId(which) === id;
}

/**
 * @returns whether current parts allow use of a familiar
 */
export function canUseFamiliar(): boolean {
  return getPartId("top") === 2;
}

/**
 *
 * @param slot defines the slot you want to equip something to
 * @returns whether that slot is available for equipment
 */
export function canUse(slot: Slot): boolean {
  if (slot === $slot`familiar`) return getPartId("top") === 2;
  if (slot === $slot`hat`) return getPartId("top") === 4;
  if (slot === $slot`weapon`) return getPartId("left") === 4;
  if (slot === $slot`off-hand`) return getPartId("right") === 4;
  if (slot === $slot`pants`) return getPartId("bottom") === 4;
  if (slot === $slot`shirt`)
    return have($skill`Torso Awareness`) || haveUpgrade("robot_shirt");
  return true;
}
