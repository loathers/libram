import {
  indexOf,
  Item,
  Location,
  myAdventures,
  myAscensions,
  runChoice,
  visitUrl,
} from "kolmafia";
import { getRemainingLiver, have as haveItem } from "../../lib";
import { get, set } from "../../property";
import { $item, $location } from "../../template-string";

/**
 * @returns Whether you permanently own Dinseylandfill
 */
export function have(): boolean {
  return get("stenchAirportAlways");
}

/**
 * @returns Whether you have access to Dinseylandfill currently
 */
export function available(): boolean {
  return have() || get("_stenchAirportToday");
}

class QuestData {
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
   *
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

const kioskUrl = "place.php?whichplace=airport_stench&action=airport3_kiosk";
const maintUrl = "place.php?whichplace=airport_stench&action=airport3_tunnels";

export const quests = [
  new QuestData(
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
  new QuestData(
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
  new QuestData(
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
  new QuestData(
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
  new QuestData(
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
  new QuestData(
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
  new QuestData(
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
  new QuestData(
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

/**
 * Disposes of a Bag of park garbage in the Maintenance Tunnels for daily funfunds
 *
 * @returns Whether you successfully deposited a bag for funfunds
 */
export function disposeGarbage(): boolean {
  if (hasDisposedGarbage()) {
    return false;
  }
  if (!hasDisposedGarbage() && haveItem($item`bag of park garbage`)) {
    visitUrl(maintUrl);
    runChoice(6);
  }
  return hasDisposedGarbage();
}

/**
 * @returns Whether you have a current Dinsey quest
 */
export function hasQuest(): boolean {
  return quests.some((q) => q.currentQuest());
}

const BLANK_QUEST = new QuestData(
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

/**
 * @returns The QuestData for your current active quest
 */
export function activeQuest(): QuestData {
  return quests.find((q) => q.currentQuest()) || BLANK_QUEST;
}

/**
 * @returns Whether your quest is ready to hand in
 */
export function questComplete(): boolean {
  const quest = activeQuest();
  return quest !== BLANK_QUEST && get(quest.questStateProperty) === "finished";
}

/**
 * @returns Whether your quest still has actions needing completion
 */
export function hasActiveQuest(): boolean {
  return hasQuest() && !questComplete();
}

/**
 * Determines the probability of getting a robortender drop based on number of drops received
 *
 * @param priority The name or ranked preference of the lowest priority quest you want to accept.
 * @returns Whether you accepted a quest or not
 */
export function acceptQuest(priority: number | string): boolean {
  if (hasQuest()) {
    return false;
  }
  const page: string = visitUrl(kioskUrl);
  let choice = 6;
  const at: number = indexOf(page, "Available Assignments");
  if (at == -1) {
    return false;
  }

  const jobs: string[] = [];
  quests.forEach((quest) => {
    jobs.push(quest.name);
  });

  const priorityNum =
    typeof priority === "string"
      ? quests.find((q) => q.name === priority)?.priority ?? 7
      : priority;

  const availableJobs: QuestData[] = [];
  const jobChoices: [[string, number]] = [["none", 999]];

  for (const quest of quests) {
    const job = quest.name;
    const jobAt: number = indexOf(page, job, at);
    if (jobAt != -1) {
      availableJobs.push(quest);
      jobChoices.push([job, jobAt]);
      break;
    }
  }

  const bestJob = availableJobs.sort((a, b) => a.priority - b.priority)[0];
  const sortedChoices = jobChoices.sort((a, b) => a[1] - b[1]);

  if (bestJob.priority <= priorityNum) {
    for (const index in sortedChoices) {
      const jobName = sortedChoices[index][0];
      if (jobName === bestJob.name) {
        choice = parseInt(index) + 1;
        break;
      }
    }
  }
  runChoice(choice);
  return hasQuest();
}

/**
 * Turns in a completed quest
 */
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

/**
 * @returns Whether you currently have access to fighting Wart Dinsey
 */
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

/**
 * @returns Whether you permanently own Dinseylandfill
 */
export function coasterNextTurn(): boolean {
  return get("dinseyRollercoasterNext");
}

/**
 * @returns Whether you permanently own Dinseylandfill
 */
export function foughtWartDinseyThisLife(): boolean {
  return get("lastWartDinseyDefeated") === myAscensions();
}

/**
 * @returns Whether you have disposed of garbage for funfunds today
 */
export function hasDisposedGarbage(): boolean {
  return get("_dinseyGarbageDisposed");
}
