import { canInteract, Item, Location, runChoice, visitUrl } from "kolmafia";
import { get } from "../../property";
import { $item, $location } from "../../template-string";

const radio = "place.php?whichplace=airport_spooky&action=airport2_radio";
const omegapanel =
  "place.php?whichplace=airport_spooky_bunker&action=si_controlpanel";

export function have(): boolean {
  return get("spookyAirportAlways");
}

class conspiracyQuestData {
  name: string;
  reward: number;
  accept: boolean;
  questStateProperty: string;
  questProgressLimit: number;
  questProgressProperty: string;
  canUseWanderers: boolean;
  canUseRunaways: boolean;
  cleeshsafe: boolean;
  questLocation: Location;
  requiredItem: Item;
  maximise: string;

  /**
   * Process for determining where to put a wanderer to extract additional value from it
   * @param name easy to refer to name of the quest
   * @param reward how many coinspiracy we get for completing the quest
   * @param accept whether to accept the quest
   * @param questStateProperty name of the mafia property tracing the current state of the quest (e.g. unstarted, step[x], finished)
   * @param questProgressLimit Maximum questProgressProperty can reach
   * @param questProgressProperty name of the mafia property that tracks progress of the current quest state
   * @param canUseWanderers whether wandering monsters can be used to progress the quest
   * @param canUseRunaways whether runaways can be used to progress the quest
   * @param cleeshsafe whether cleeshes will advance the quest
   * @param questLocation where to adventure to progress the quest
   * @param requiredItem the required item (if any) needed to be equipped to progress the quest
   */
  constructor(
    name: string,
    reward: number,
    accept: boolean,
    questStateProperty: string,
    questProgressLimit: number,
    questProgressProperty: string,
    canUseWanderers: boolean,
    canUseRunaways: boolean,
    cleeshSafe: boolean,
    questLocation: Location,
    requiredItem: Item,
    maximise: string
  ) {
    this.name = name;
    this.reward = reward;
    this.accept = accept;
    this.questStateProperty = questStateProperty;
    this.questProgressLimit = questProgressLimit;
    this.questProgressProperty = questProgressProperty;
    this.canUseWanderers = canUseWanderers;
    this.canUseRunaways = canUseRunaways;
    this.cleeshsafe = cleeshSafe;
    this.questLocation = questLocation;
    this.requiredItem = requiredItem;
    this.maximise = maximise;
  }

  currentQuest(): boolean {
    if (get(this.questStateProperty) !== "unstarted") {
      return true;
    } else {
      return false;
    }
  }
}

const conspiracyQuests = [
  new conspiracyQuestData(
    "Serum",
    30,
    true,
    "questESpSerum",
    5,
    "",
    false,
    false,
    false,
    $location`The Mansion of Dr. Weirdeaux`,
    $item`none`,
    "10 item, 10 pickpocket chance"
  ),
  new conspiracyQuestData(
    "Clipper",
    20,
    true,
    "questESpClipper",
    23,
    "fingernailsClipped",
    false,
    true,
    false,
    $location`The Mansion of Dr. Weirdeaux`,
    $item`none`,
    ""
  ),
  new conspiracyQuestData(
    "EVE",
    30,
    true,
    "questESpEVE",
    0,
    "",
    true,
    true,
    true,
    $location`The Secret Government Laboratory`,
    $item`none`,
    ""
  ),
  new conspiracyQuestData(
    "FakeMedium",
    30,
    true,
    "questESpFakeMedium",
    0,
    "",
    true,
    true,
    true,
    $location`The Secret Government Laboratory`,
    $item`none`,
    ""
  ),
  new conspiracyQuestData(
    "Gore",
    20,
    true,
    "questESpGore",
    100,
    "goreCollected",
    true,
    false,
    false,
    $location`The Secret Government Laboratory`,
    $item`gore bucket`,
    "10 meat"
  ),
  new conspiracyQuestData(
    "JunglePun",
    20,
    false,
    "questESpJunglePun",
    11,
    "junglePuns",
    true,
    false,
    false,
    $location`The Deep Dark Jungle`,
    $item`encrypted micro-cassette recorder`,
    "mys"
  ),
  new conspiracyQuestData(
    "OutOfOrder",
    30,
    true,
    "questESpOutOfOrder",
    99,
    "",
    true,
    false,
    false,
    $location`The Deep Dark Jungle`,
    $item`GPS-tracking wristwatch`,
    "10 Initiative"
  ),
  new conspiracyQuestData(
    "Smokes",
    30,
    true,
    "questESpSmokes",
    10,
    "",
    false,
    false,
    false,
    $location`The Deep Dark Jungle`,
    $item`none`,
    "10 item, 10 pickpocket chance"
  ),
] as const;

export function available(): boolean {
  return have() || get("_spookyAirportToday");
}

export function completedOneTimeQuests(): boolean {
  for (const i in conspiracyQuests) {
    const quest = conspiracyQuests[i];
    if (quest.reward === 30 && get(quest.questStateProperty) !== "finished") {
      return false;
    }
  }

  return true;
}

export function haveQuest(): boolean {
  for (const i in conspiracyQuests) {
    const quest = conspiracyQuests[i];
    if (get(quest.questStateProperty) !== "") {
      return true;
    }
  }
  return false;
}

export function activeQuest(): string {
  for (const i in conspiracyQuests) {
    const quest = conspiracyQuests[i];
    if (
      get(quest.questStateProperty) !== "unstarted" &&
      get(quest.questStateProperty) !== "finished"
    ) {
      return quest.name;
    }
  }
  return "";
}

export function getQuest(): void {
  if (get(`_questESp`) === "" && !haveQuest() && canInteract() && available()) {
    visitUrl(radio);
    runChoice(1);
  }
}

export function questComplete(): boolean {
  if (!haveQuest()) return false;
  for (const i in conspiracyQuests) {
    const quest = conspiracyQuests[i];
    if (
      quest.questStateProperty ===
      (quest.requiredItem === $item`none` ? "step1" : "step2")
    ) {
      return true;
    }
  }
  return false;
}

export function hasActiveQuest(): boolean {
  return haveQuest() && !questComplete();
}

export function turnInQuest(): void {
  if (questComplete()) {
    visitUrl(radio);
    runChoice(1);
  }
}

export function activateProtocol(protocol: number) {
  visitUrl(omegapanel);
  runChoice(protocol);
}

export function activateOmega(): void {
  if (get("_controlPanelUsed")) {
    return;
  }

  for (let i = 1; i < 10; i++) {
    const active = get(`controlPanel${i}`);

    if (!active) {
      activateProtocol(i);
      break;
    }
  }

  if (get("controlPanelOmega") >= 100 && completedOneTimeQuests()) {
    visitUrl(omegapanel);
    runChoice(10);
  }
}
