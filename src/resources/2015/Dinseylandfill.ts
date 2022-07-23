import {
  abort,
  availableAmount,
  containsText,
  indexOf,
  Item,
  Location,
  myAscensions,
  retrieveItem,
  runChoice,
  visitUrl,
} from "kolmafia";
import { get, set } from "../../property";
import { $item, $items, $location } from "../../template-string";

export function have(): boolean {
  return get("stenchAirportAlways");
}

export function available(): boolean {
  return have() || get("_stenchAirportToday");
}

class dinseyQuestData {
  name: string;
  priority: number;
  questNameKiosk: string;
  questNameQuestLog: string;
  questStateProperty: string;
  questProgressProperty: string;
  questProgressLimit: number;
  canUseWanderers: boolean;
  requiredItem: Item;
  questLocation: Location;

  /**
   * Process for determining where to put a wanderer to extract additional value from it
   * @param name easy to refer to name of the quest
   * @param priority ranked preference of quests
   * @param questNameKiosk returns the name of the quest as found at the dinseylandfill Job Kiosk
   * @param questNameQuestLog returns the name of the quest as found in the quest log
   * @param questStateProperty name of the mafia property tracing the current state of the quest (e.g. unstarted, step[x], finished)
   * @param questProgressProperty name of the mafia property that tracks progress of the current quest state
   * @param questProgressLimit Maximum questProgressProperty can reach
   * @param canUseWanderers whether wandering monsters can be used to progress the quest
   * @param requiredItem the required item (if any) needed to be equipped to progress the quest
   * @param questLocation where to adventure to progress the quest
   */
  constructor(
    name: string,
    priority: number,
    questNameKiosk: string,
    questNameQuestLog: string,
    questStateProperty: string,
    questProgressProperty: string,
    questProgressLimit: number,
    canUseWanderers: boolean,
    requiredItem: Item,
    questLocation: Location
  ) {
    this.name = name;
    this.priority = priority;
    this.questNameKiosk = questNameKiosk;
    this.questNameQuestLog = questNameQuestLog;
    this.questStateProperty = questStateProperty;
    this.questProgressProperty = questProgressProperty;
    this.questProgressLimit = questProgressLimit;
    this.canUseWanderers = canUseWanderers;
    this.requiredItem = requiredItem;
    this.questLocation = questLocation;
  }

  currentQuest(): boolean {
    if (get(this.questStateProperty) !== "unstarted") {
      return true;
    } else {
      return false;
    }
  }
}

const questLog = "questlog.php?which=1";
const dinseyKiosk = "place.php?whichplace=airport_stench&action=airport3_kiosk";

const dinseyQuests = [
  new dinseyQuestData(
    "lube",
    0,
    "Track Maintenance",
    "Super Luber",
    "questEStSuperLuber",
    "",
    0,
    false,
    $item`lube-shoes`,
    $location`Barf Mountain`
  ),
  new dinseyQuestData(
    "fuel",
    1,
    "Electrical Maintenance",
    "Give Me Fuel",
    "questEStGiveMeFuel",
    "",
    0,
    false,
    $item`none`,
    $location`The Toxic Teacups`
  ),
  new dinseyQuestData(
    "sexism",
    2,
    "Sexism Reduction",
    "Social Justice Adventurer I",
    "questEStSocialJusticeI",
    "dinseySocialJusticeIProgress",
    15,
    true,
    $item`none`,
    $location`Pirates of the Garbage Barges`
  ),
  new dinseyQuestData(
    "racism",
    3,
    "Racism Reduction",
    "Social Justice Adventurer II",
    "questEStSocialJusticeII",
    "dinseySocialJusticeIIProgress",
    15,
    true,
    $item`none`,
    $location`Uncle Gator's Country Fun-Time Liquid Waste Sluice`
  ),
  new dinseyQuestData(
    "fun",
    4,
    "Compulsory Fun",
    "Whistling Zippity-Doo-Dah",
    "questEStZippityDooDah",
    "dinseyFunProgress",
    15,
    true,
    $item`Dinsey mascot mask`,
    $location`The Toxic Teacups`
  ),
  new dinseyQuestData(
    "trash",
    5,
    "Waterway Debris Removal",
    "Teach a Man to Fish Trash",
    "questEStFishTrash",
    "dinseyFilthLevel",
    0,
    true,
    $item`trash net`,
    $location`Pirates of the Garbage Barges`
  ),
  new dinseyQuestData(
    "bear",
    6,
    "Bear Removal",
    "Nasty, Nasty Bears",
    "questEStNastyBears",
    "dinseyNastyBearsDefeated",
    8,
    false,
    $item`none`,
    $location`Uncle Gator's Country Fun-Time Liquid Waste Sluice`
  ),
  new dinseyQuestData(
    "food",
    7,
    "Guest Sustenance Assurance",
    "Will Work With Food",
    "questEStWorkWithFood",
    "dinseyTouristsFed",
    30,
    false,
    $item`none`,
    $location`Barf Mountain`
  ),
];

export function disposeGarbage(): void {
  if (
    !get("_dinseyGarbageDisposed") &&
    retrieveItem(1, $item`bag of park garbage`)
  ) {
    visitUrl("place.php?whichplace=airport_stench&action=airport3_tunnels");
    runChoice(6);
    if (!get("_dinseyGarbageDisposed"))
      abort("We failed to dispose garbage somehow?");
  }
}

export function hasQuest(): boolean {
  for (let i = 0; i < dinseyQuests.length; i++) {
    const quest = dinseyQuests[i];
    if (get(quest.questStateProperty, "") !== "unstarted") {
      return true;
    }
  }

  return false;
}

export function activeQuest(): dinseyQuestData {
  for (let i = 0; i < dinseyQuests.length; i++) {
    const quest = dinseyQuests[i];
    if (get(quest.questStateProperty) !== "unstarted") {
      return quest;
    }
  }

  return new dinseyQuestData(
    "",
    -1,
    "",
    "",
    "",
    "",
    -1,
    false,
    $item`none`,
    $location`none`
  );
}

export function questComplete(): boolean {
  if (hasQuest()) {
    const quest = activeQuest();
    switch (quest.name) {
      case "fuel":
        return retrieveItem(20, $item`toxic globule`);
      case "lube":
        return containsText(visitUrl(questLog), "<b>Kiosk</b>");
      case "trash":
        return (
          get(quest.questProgressProperty, 100) <= quest.questProgressLimit &&
          containsText(visitUrl(questLog), "<b>Kiosk</b>")
        );
      case "fun":
      case "sexism":
      case "racism":
        return (
          get(quest.questProgressProperty, 0) >= quest.questProgressLimit &&
          containsText(visitUrl(questLog), "<b>Kiosk</b>")
        );
      default:
        return get(quest.questProgressProperty, 0) >= quest.questProgressLimit;
    }
  } else {
    return false;
  }
}

export function hasActiveQuest(): boolean {
  return hasQuest() && !questComplete();
}

export function getQuest(): void {
  const page: string = visitUrl(dinseyKiosk);
  let choice = 6;
  const at: number = indexOf(page, "Available Assignments");
  if (at == -1) {
    return;
  }

  const jobs = [
    `Electrical Maintenance`,
    `Track Maintenance`,
    `Sexism Reduction`,
    `Racism Reduction`,
    `Compulsory Fun`,
    `Waterway Debris Removal`,
    `Bear Removal`,
    `Guest Sustenance Assurance`,
  ];

  for (let i = 0; i < 4; i++) {
    const job1 = jobs[i];
    const job1At: number = indexOf(page, job1, at);
    if (job1At != -1) {
      for (let j = i + 1; j < jobs.length; j++) {
        const job2 = jobs[j];
        const job2At: number = indexOf(page, job2, at);
        if (job2At != -1) {
          if (job1At < job2At) {
            choice = 1;
            break;
          } else {
            choice = 2;
            break;
          }
        }
      }
      break;
    }
  }
  runChoice(choice);
}

export function turnInQuest(): void {
  if (questComplete()) {
    if (activeQuest().name === "racism")
      set("questEStSocialJusticeI", "unstarted");
    visitUrl(dinseyKiosk);
    runChoice(3);
  }
}

export function canFightWart(): boolean {
  const keycards = $items`keycard α, keycard β, keycard γ, keycard δ`;
  for (const card of keycards) {
    if (availableAmount(card) === 0) {
      return false;
    }
  }
  return get("lastWartDinseyDefeated") === myAscensions() ? false : true;
}
