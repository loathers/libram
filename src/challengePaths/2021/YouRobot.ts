import {
  myRobotEnergy,
  myRobotScraps,
  round,
  runChoice,
  Slot,
  Stat,
  visitUrl,
} from "kolmafia";
import { have } from "../../lib.js";
import { get } from "../../property.js";
import { $path, $skill, $slot, $stat } from "../../template-string.js";

export const path = $path`You, Robot`;

type Upgrade = "robot_shirt" | "robot_energy" | "robot_potions";

export class YouRobot {
  static scrap(): number {
    return myRobotScraps();
  }

  static doScavenge(): void {
    visitUrl("place.php?whichplace=scrapheap&action=sh_scrounge");
  }

  static energy(): number {
    return myRobotEnergy();
  }

  static doCollectEnergy(): void {
    visitUrl("place.php?whichplace=scrapheap&action=sh_getpower");
  }

  static expectedEnergyNextCollect(): number {
    const raw = (25 + get("youRobotPoints")) * 0.85 ** get("_energyCollected");
    return round(raw);
  }

  static doChronolith(): void {
    visitUrl("place.php?whichplace=scrapheap&action=sh_chronobo");
  }

  static expectedChronolithCost(): number {
    return get("_chronolithNextCost");
  }

  static doStatbot(stat: Stat) {
    visitUrl("place.php?whichplace=scrapheap&action=sh_upgrade");
    if (stat === $stat`Muscle`) runChoice(1);
    else if (stat === $stat`Mysticality`) runChoice(2);
    else if (stat === $stat`Moxie`) runChoice(3);
  }

  static expectedStatbotCost(uses = 1): number {
    return (10 + get("statbotUses")) * uses + ((uses - 1) * uses) / 2;
  }

  static haveUpgrade(upgrade: Upgrade): boolean {
    return get("youRobotCPUUpgrades").includes(upgrade);
  }

  static doUpgrade(upgrade: Upgrade): boolean {
    if (this.haveUpgrade(upgrade)) return true;
    visitUrl("place.php?whichplace=scrapheap&action=sh_configure");
    visitUrl("choice.php?whichchoice=1445&show=cpus");
    visitUrl(
      `choice.php?pwd&whichchoice=1445&part=cpus&show=cpus&option=2&p=${upgrade}`,
    );
    return this.haveUpgrade(upgrade);
  }

  static getPartId(which: "top" | "left" | "right" | "bottom") {
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

  static doSwitchPart(
    which: "top" | "left" | "right" | "bottom",
    id: number,
  ): boolean {
    if (this.getPartId(which) === id) return true;
    visitUrl("place.php?whichplace=scrapheap&action=sh_configure");
    visitUrl(`choice.php?whichchoice=1445&show=${which}`);
    visitUrl(
      `choice.php?whichchoice=1445&part=${which}&show=${which}&option=1&p=${id}`,
    );
    return this.getPartId(which) === id;
  }

  static canUseFamiliar(): boolean {
    return this.getPartId("top") === 2;
  }

  static canUse(slot: Slot): boolean {
    if (slot === $slot`familiar`) return this.getPartId("top") === 2;
    if (slot === $slot`hat`) return this.getPartId("top") === 4;
    if (slot === $slot`weapon`) return this.getPartId("left") === 4;
    if (slot === $slot`off-hand`) return this.getPartId("right") === 4;
    if (slot === $slot`pants`) return this.getPartId("bottom") === 4;
    if (slot === $slot`shirt`)
      return have($skill`Torso Awareness`) || this.haveUpgrade("robot_shirt");
    return true;
  }
}
