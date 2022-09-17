import {
  canInteract,
  Item,
  Location,
  Monster,
  runChoice,
  visitUrl,
} from "kolmafia";
import { get } from "../../property";
import { $item, $location, $monster } from "../../template-string";

const radio = "place.php?whichplace=airport_spooky&action=airport2_radio";
const omegapanel =
  "place.php?whichplace=airport_spooky_bunker&action=si_controlpanel";

export function have(): boolean {
  return get("spookyAirportAlways");
}

class QuestData {
  name: string;
  reward: number;
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
    return get(this.questStateProperty) !== "unstarted";
  }
}

export const quests = [
  new QuestData(
    "Serum",
    30,
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
  new QuestData(
    "Clipper",
    20,
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
  new QuestData(
    "EVE",
    30,
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
  new QuestData(
    "FakeMedium",
    30,
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
  new QuestData(
    "Gore",
    20,
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
  new QuestData(
    "JunglePun",
    20,
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
  new QuestData(
    "OutOfOrder",
    30,
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
  new QuestData(
    "Smokes",
    30,
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

const BLANK_QUEST = new QuestData(
  "",
  0,
  "",
  0,
  "",
  false,
  false,
  false,
  $location`none`,
  $item`none`,
  ""
);

export function completedOneTimeQuests(): boolean {
  return quests
    .filter((q) => q.reward === 30)
    .every((q) => get(q.questStateProperty) === "finished");
}

export function hasQuest(): boolean {
  return quests.some((q) => q.currentQuest());
}

export function activeQuest(): QuestData {
  return quests.find((q) => q.currentQuest()) || BLANK_QUEST;
}

export function acceptQuest(): void {
  if (!hasQuest() && canInteract() && available()) {
    visitUrl(radio);
    runChoice(1);
  }
}

export function questComplete(): boolean {
  const quest = activeQuest();
  return (
    quest !== BLANK_QUEST &&
    get(quest.questStateProperty) ===
      (quest.requiredItem === $item`none` ? "step1" : "step2")
  );
}

export function hasActiveQuest(): boolean {
  return hasQuest() && !questComplete();
}

export function turnInQuest(): void {
  if (questComplete()) {
    visitUrl(radio);
    runChoice(1);
  }
}

export const protocols = new Map<string, [Monster, Item, number]>([
  ["Juan", [$monster`government scientist`, $item`none`, 1]],
  ["3.14", [$monster`government scientist`, $item`battery-powered drill`, 2]],
  ["D-R.00G", [$monster`lab monkey`, $item`none`, 3]],
  ["B.A.R.F.", [$monster`lab monkey`, $item`monkey barf`, 4]],
  ["VO-5", [$monster`creepy little girl`, $item`none`, 5]],
  ["R-XPN", [$monster`creepy little girl`, $item`cuddly teddy bear`, 6]],
  ["1862", [$monster`super-sized Cola Wars soldier`, $item`none`, 7]],
  [
    "1912",
    [$monster`super-sized Cola Wars soldier`, $item`khaki duffel bag`, 8],
  ],
  ["0-0Z-E", [$monster`none`, $item`airborne mutagen`, 9]],
  ["Ω", [$monster`none`, $item`none`, 10]],
]);

export function activateProtocol(protocol: number | string) {
  visitUrl(omegapanel);
  if (typeof protocol === "number") {
    runChoice(protocol);
  } else {
    for (const button of protocols) {
      const name = button[0];
      if (name === protocol) {
        runChoice(button[1][2]);
      }
    }
  }
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

  if (
    get("controlPanelOmega") >= 100 &&
    completedOneTimeQuests() &&
    !hasQuest()
  ) {
    //Omega Button cannot be pushed with an active radio quest
    visitUrl(omegapanel);
    runChoice(10);
  }
}
