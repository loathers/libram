import {
  abort,
  indexOf,
  Item,
  Location,
  myAdventures,
  myAscensions,
  retrieveItem,
  runChoice,
  visitUrl,
} from "kolmafia";
import { getRemainingLiver, have as haveItem } from "../../lib";
import { get, set } from "../../property";
import { $item, $location } from "../../template-string";

export function have(): boolean {
  return get("stenchAirportAlways");
}

export function available(): boolean {
  return have() || get("_stenchAirportToday");
}

class questData {
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
    return get(this.questStateProperty) !== "unstarted";
  }
}

const questLog = "questlog.php?which=1";
const kioskUrl = "place.php?whichplace=airport_stench&action=airport3_kiosk";
const maintUrl = "place.php?whichplace=airport_stench&action=airport3_tunnels";

export const quests = [
  new questData(
    "lube",
    1,
    "Track Maintenance",
    "Super Luber",
    "questEStSuperLuber",
    "",
    0,
    false,
    $item`lube-shoes`,
    $location`Barf Mountain`
  ),
  new questData(
    "fuel",
    0,
    "Electrical Maintenance",
    "Give Me Fuel",
    "questEStGiveMeFuel",
    "",
    0,
    false,
    $item`none`,
    $location`The Toxic Teacups`
  ),
  new questData(
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
  new questData(
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
  new questData(
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
  new questData(
    "trash",
    6,
    "Waterway Debris Removal",
    "Teach a Man to Fish Trash",
    "questEStFishTrash",
    "dinseyFilthLevel",
    0,
    true,
    $item`trash net`,
    $location`Pirates of the Garbage Barges`
  ),
  new questData(
    "bear",
    5,
    "Bear Removal",
    "Nasty, Nasty Bears",
    "questEStNastyBears",
    "dinseyNastyBearsDefeated",
    8,
    false,
    $item`none`,
    $location`Uncle Gator's Country Fun-Time Liquid Waste Sluice`
  ),
  new questData(
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
  if (!get("_dinseyGarbageDisposed") && haveItem($item`bag of park garbage`)) {
    visitUrl(maintUrl);
    runChoice(6);
  }
}

export function hasQuest(): boolean {
  for (const quest of quests) {
    if (quest.currentQuest()) {
      return true;
    }
  }

  return false;
}

export function activeQuest(): questData {
  for (const quest of quests) {
    if (quest.currentQuest()) {
      return quest;
    }
  }

  return new questData(
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
  const quest = activeQuest();
  return hasQuest() && get(quest.questStateProperty) === "finished";
}

export function hasActiveQuest(): boolean {
  return hasQuest() && !questComplete();
}

export function acceptQuest(priority: number | string): void {
  const page: string = visitUrl(kioskUrl);
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
    `Bear Removal`,
    `Waterway Debris Removal`,
    `Guest Sustenance Assurance`,
  ];
  let prioritynum = 7;
  if (typeof priority === "string") {
    for (const quest of quests) {
      if (quest.name === priority) {
        prioritynum = quest.priority;
        break;
      }
    }
  } else {
    prioritynum = priority;
  }

  for (const job1 of jobs.slice(0, prioritynum)) {
    const job1At: number = indexOf(page, job1, at);
    if (job1At != -1) {
      for (const job2 of jobs) {
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
    visitUrl(kioskUrl);
    runChoice(3);
  }
}

export const keyCardsLocations = new Map<Item, Location>([
  [$item`keycard α`, $location`Barf Mountain`],
  [$item`keycard β`, $location`Pirates of the Garbage Barges`],
  [$item`keycard γ`, $location`The Toxic Teacups`],
  [
    $item`keycard δ`,
    $location`Uncle Gator's Country Fun-Time Liquid Waste Sluice`,
  ],
]);

export function canFightWartDinsey(): boolean {
  return (
    Array.from(keyCardsLocations.keys()).every((keycard) =>
      haveItem(keycard)
    ) &&
    !foughtWartDinseyThisLife() &&
    getRemainingLiver() >= 0 &&
    myAdventures() > 0
  );
}

export function coasterNextTurn(): boolean {
  return get("dinseyRollercoasterNext");
}

export function foughtWartDinseyThisLife(): boolean {
  return get("lastWartDinseyDefeated") === myAscensions();
}

export function hasDisposedGarbage(): boolean {
  return get("_dinseyGarbageDisposed");
}
