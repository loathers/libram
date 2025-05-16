import { visitUrl, runChoice, Location, handlingChoice } from "kolmafia";
import { Requirement } from "../../maximize.js";
import { get } from "../../property.js";
import { $location, $item } from "../../template-string.js";
import { QuestProperty } from "../../propertyTypes.js";
import { QuestState } from "../../propertyTyping.js";

class ConspiracyQuest {
  prop: QuestProperty;
  reward: number;
  complete: number;
  /** Location in which quest is completed */
  location: Location;
  /** Requirements to complete quest */
  requirements: Requirement;

  constructor(
    prop: QuestProperty,
    reward: number,
    complete: number,
    location: Location,
    requirements?: Requirement,
  ) {
    this.prop = prop;
    this.reward = reward;
    this.complete = complete;
    this.location = location;
    this.requirements = requirements ?? new Requirement([], {});
  }

  isOneTime() {
    return this.reward !== 30;
  }

  isStarted() {
    return get(this.prop) >= QuestState.STARTED;
  }

  isFinished() {
    return get(this.prop) === QuestState.FINISHED;
  }

  isActive() {
    return this.isStarted() && !this.isFinished();
  }

  isReadyToTurnIn() {
    return get(this.prop) === this.complete;
  }
}

export const QUESTS = [
  new ConspiracyQuest(
    "questESpClipper",
    20,
    1,
    $location`The Mansion of Dr. Weirdeaux`,
  ),
  new ConspiracyQuest(
    "questESpEVE",
    30,
    1,
    $location`The Secret Government Laboratory`,
  ),
  new ConspiracyQuest(
    "questESpFakeMedium",
    30,
    1,
    $location`The Secret Government Laboratory`,
  ),
  new ConspiracyQuest(
    "questESpGore",
    20,
    2,
    $location`The Secret Government Laboratory`,
    new Requirement(["Meat Drop"], { forceEquip: [$item`gore bucket`] }),
  ),
  new ConspiracyQuest(
    "questESpJunglePun",
    20,
    2,
    $location`The Deep Dark Jungle`,
    new Requirement(["Mysticality"], {
      forceEquip: [$item`encrypted micro-cassette recorder`],
    }),
  ),
  new ConspiracyQuest(
    "questESpOutOfOrder",
    30,
    2,
    $location`The Deep Dark Jungle`,
    new Requirement(["Initiative"], {
      forceEquip: [$item`GPS-tracking wristwatch`],
    }),
  ),
  new ConspiracyQuest(
    "questESpSerum",
    30,
    1,
    $location`The Mansion of Dr. Weirdeaux`,
  ),
  new ConspiracyQuest("questESpSmokes", 30, 1, $location`The Deep Dark Jungle`),
] as const;

/**
 * @returns Whether all one-time quests are completed
 */
export function completedOneTimeQuests() {
  return QUESTS.filter((q) => q.isOneTime()).every((q) => q.isFinished());
}

/**
 * Activate a protocol in the bunker
 * @param protocol Protocol to activate
 */
export function activateProtocol(protocol: number) {
  visitUrl("place.php?whichplace=airport_spooky_bunker&action=si_controlpanel");
  runChoice(protocol);
}

/**
 * @returns Current omega charge level
 */
export function getOmega() {
  return get("controlPanelOmega");
}

/**
 * Activate Omega Protocol
 * @param completeAllQuests Abort if player has not completed all one-time quests
 */
export function activateOmega(completeAllQuests = false) {
  if (get("_controlPanelUsed")) {
    return;
  }

  for (let i = 1; i <= 9; i++) {
    const active = get(`controlPanel${i}`, false);
    if (!active) {
      activateProtocol(i);
      break;
    }
  }

  if (getOmega() < 99 || (!completedOneTimeQuests() && completeAllQuests))
    return;

  activateProtocol(1);
  activateProtocol(10);
}

function visitRadio() {
  return visitUrl("place.php?whichplace=airport_spooky&action=airport2_radio");
}

/**
 * @param accept Whether to accept a quest if one is not currently active
 * @returns Returns the current quest or null if no quest is active
 */
export function getQuest(accept = false): ConspiracyQuest | null {
  const active = QUESTS.find((q) => q.isActive());
  if (active) return active;

  if (!accept) return null;

  // Sometimes we need to hit the radio a few times to successfully parse the quest
  for (let i = 0; i < 11; i++) {
    const page = visitRadio();
    if (!handlingChoice()) return null;
    if (page.includes("try again tomorrow")) return null;

    const quest = get("_questESp");
    if (quest !== "") return QUESTS.find((q) => q.prop === quest) ?? null;
  }

  return null;
}

/**
 * Turn in the current quest
 * @returns Success of turning in the quest
 */
export function turnInQuest() {
  const quest = getQuest();
  if (!quest?.isReadyToTurnIn()) return false;
  visitRadio();
  runChoice(1);
  return quest.isFinished();
}
