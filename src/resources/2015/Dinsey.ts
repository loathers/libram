import {
  availableChoiceOptions,
  myAdventures,
  myAscensions,
  runChoice,
  visitUrl,
} from "kolmafia";
import { getRemainingLiver, have } from "../../lib";
import { get, getNumber, getString } from "../../property";
import { $item, $location } from "../../template-string";

const kioskUrl = "place.php?whichplace=airport_stench&action=airport3_kiosk";
const maintUrl = "place.php?whichplace=airport_stench&action=airport3_tunnels";

export const questPreferenceKioskText = new Map<string, string>([
  ["questEStSocialJusticeII", "Racism Reduction"],
  ["questEStSocialJusticeI", "Sexism Reduction"],
  ["questEStFishTrash", "Waterway Debris Removal"],
  ["questEStZippityDooDah", "Compulsory Fun"],
  ["questEStSuperLuber", "Track Maintenance"],
  ["questEStGiveMeFuel", "Electrical Maintenance"],
  ["questEStNastyBears", "Bear Removal"],
  ["questEStWorkWithFood", "Guest Sustenance Assurance"],
]);

export const questPreferenceLocation = new Map<string, Location>([
  [
    "questEStSocialJusticeII",
    $location`Uncle Gator's Country Fun-Time Liquid Waste Sluice`,
  ],
  ["questEStSocialJusticeI", $location`Pirates of the Garbage Barges`],
  ["questEStFishTrash", $location`Pirates of the Garbage Barges`],
  ["questEStZippityDooDah", $location`The Toxic Teacups`],
  ["questEStSuperLuber", $location`Barf Mountain`],
  ["questEStGiveMeFuel", $location`The Toxic Teacups`],
  [
    "questEStNastyBears",
    $location`Uncle Gator's Country Fun-Time Liquid Waste Sluice`,
  ],
  ["questEStWorkWithFood", $location`Barf Mountain`],
]);

interface QuestRequirement {
  item: Item | null;
  quantity: number;
  trackingPref?: string;
  completeValue?: number;
}

export const questRequirements = new Map<string, QuestRequirement>([
  [
    "questEStSocialJusticeII",
    {
      item: null,
      quantity: 0,
      trackingPref: "dinseySocialJusticeIIProgress",
      completeValue: 15,
    },
  ],
  [
    "questEStSocialJusticeI",
    {
      item: null,
      quantity: 0,
      trackingPref: "dinseySocialJusticeIProgress",
      completeValue: 15,
    },
  ],
  [
    "questEStFishTrash",
    {
      item: $item`trash net`,
      quantity: 1,
      trackingPref: "dinseyFilthLevel",
      completeValue: 0,
    },
  ],
  [
    "questEStZippityDooDah",
    {
      item: $item`Dinsey mascot mask`,
      quantity: 1,
      trackingPref: "dinseyFunProgress",
      completeValue: 15,
    },
  ],
  [
    "questEStSuperLuber",
    {
      item: $item`lube-shoes`,
      quantity: 1,
    },
  ],
  [
    "questEStGiveMeFuel",
    {
      item: $item`toxic globule`,
      quantity: 20,
    },
  ],
  [
    "questEStNastyBears",
    {
      item: null,
      quantity: 0,
      trackingPref: "dinseyNastyBearsDefeated",
      completeValue: 8,
    },
  ],
  [
    "questEStWorkWithFood",
    {
      item: $item`complimentary Dinsey refreshments`,
      quantity: 1,
      trackingPref: "dinseyTouristsFed",
      completeValue: 30,
    },
  ],
]);

export const keyCardsLocations = new Map<Item, Location>([
  [$item`keycard α`, $location`Barf Mountain`],
  [$item`keycard β`, $location`Pirates of the Garbage Barges`],
  [$item`keycard γ`, $location`The Toxic Teacups`],
  [
    $item`keycard δ`,
    $location`Uncle Gator's Country Fun-Time Liquid Waste Sluice`,
  ],
]);

export function acceptedQuest(): string | null {
  const result = Array.from(questPreferenceKioskText.values()).find(
    (questPref) => getString(questPref) !== "unstarted"
  );
  if (result) {
    return result;
  } else {
    return null;
  }
}

export function questFinished() {
  const quest = acceptedQuest();
  return quest && getString(quest) === "finished";
}

export function availableQuests(): string[] {
  const kioskText = visitUrl(kioskUrl);
  return Array.from(questPreferenceKioskText)
    .filter((questPair) => kioskText.includes(questPair[1]))
    .map((questPair) => questPair[0]);
}

export function startQuest(questPref: string) {
  const kioskText = visitUrl(kioskUrl);
  const questChoice = Array.from(questPreferenceKioskText)
    .filter((questPair) => kioskText.indexOf(questPair[1]) > -1)
    .sort(
      (questPairA, questPairB) =>
        kioskText.indexOf(questPairA[1]) - kioskText.indexOf(questPairB[1])
    )
    .map((questPair) => questPair[0])
    .indexOf(questPref);
  if (questChoice > -1) {
    runChoice(questChoice + 1);
  }
}

export function finishQuest() {
  const currentQuest = acceptedQuest();
  if (currentQuest) {
    const currentQuestRequirement = questRequirements.get(
      currentQuest
    ) as QuestRequirement;
    if (
      !currentQuestRequirement.trackingPref ||
      getNumber(currentQuestRequirement.trackingPref) ===
        currentQuestRequirement.completeValue
    ) {
      visitUrl(kioskUrl);
      if (3 in availableChoiceOptions()) {
        runChoice(3);
      }
    }
  }
}

export function coasterNextTurn() {
  return get("dinseyRollercoasterNext");
}

export function foughtWartDinseyThisLife() {
  return get("lastWartDinseyDefeated") === myAscensions();
}

export function canFightWartDinsey() {
  return (
    Array.from(keyCardsLocations.keys()).every((keycard) => have(keycard)) &&
    !foughtWartDinseyThisLife() &&
    getRemainingLiver() >= 0 &&
    myAdventures() > 0
  );
}

export function fightWartDinsey() {
  if (canFightWartDinsey()) {
    visitUrl(maintUrl);
    runChoice(5);
  }
}

export function hasDisposedGarbage() {
  return get("_dinseyGarbageDisposed");
}

export function disposeGarbage() {
  if (have($item`bag of park garbage`) && !hasDisposedGarbage()) {
    visitUrl(maintUrl);
    runChoice(6);
  }
}
