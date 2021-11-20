import { toInt, visitUrl } from "kolmafia";
import { have as haveItem } from "../../lib";
import { $item } from "../../template-string";

const pantogram = $item`portable pantogram`;
const pants = $item`pantogram pants`;

export function have(): boolean {
  return haveItem(pantogram);
}

export function havePants(): boolean {
  return haveItem(pants);
}

type PantogramAlignment = "Muscle" | "Moxie" | "Mysticality";
type PantogramElement =
  | "Hot Resistance"
  | "Cold Resistance"
  | "Spooky Resistance"
  | "Sleaze Resistance"
  | "Stench Resistance";
type PantogramSacrificeL =
  | "Maximum HP"
  | "Maximum MP"
  | ["HP Regen Max", 10]
  | ["HP Regen Max", 15]
  | ["HP Regen Max", 20]
  | ["MP Regen Max", 10]
  | ["MP Regen Max", 15]
  | ["MP Regen Max", 20]
  | "Mana Cost";
type PantogramSacrificeM =
  | ["Combat Rate", -5]
  | ["Combat Rate", 5]
  | "Initiative"
  | "Critical Hit Percent"
  | "Familiar Weight"
  | "Candy Drop"
  | "Item Drop Penalty"
  | "Fishing Skill"
  | "Pool Skill"
  | "Drops Items"
  | "Avatar";
type PantogramSacrificeR =
  | "Weapon Damage"
  | "Spell Damage Percent"
  | ["Meat Drop", 30]
  | ["Meat Drop", 60]
  | ["Item Drop", 15]
  | ["Item Drop", 30]
  | "Muscle Experience"
  | "Mysticality Experience"
  | "Moxie Experience"
  | "Muscle Experience Percent"
  | "Mysticality Experience Percent"
  | "Moxie Experience Percent";
type Pants = {
  alignment: PantogramAlignment;
  element: PantogramElement;
  leftSac: PantogramSacrificeL;
  rightSac: PantogramSacrificeR;
  middleSac: PantogramSacrificeM;
};

const Alignment: Record<PantogramAlignment, number> = {
  ["Muscle"]: 1,
  ["Mysticality"]: 2,
  ["Moxie"]: 3,
};

const Element: Record<PantogramElement, number> = {
  ["Hot Resistance"]: 1,
  ["Cold Resistance"]: 2,
  ["Spooky Resistance"]: 3,
  ["Sleaze Resistance"]: 4,
  ["Stench Resistance"]: 5,
};

const LeftSacrifice = new Map<PantogramSacrificeL, [Item | number, number]>([
  ["Maximum HP", [-1, 0]],
  ["Maximum MP", [-2, 0]],
  [
    ["HP Regen Max", 10],
    [$item`red pixel potion`, 1],
  ],
  [
    ["HP Regen Max", 15],
    [$item`royal jelly`, 1],
  ],
  [
    ["HP Regen Max", 20],
    [$item`scented massage oil`, 1],
  ],
  [
    ["MP Regen Max", 10],
    [$item`Cherry Cloaca Cola`, 1],
  ],
  [
    ["MP Regen Max", 15],
    [$item`bubblin' crude`, 1],
  ],
  [
    ["MP Regen Max", 20],
    [$item`glowing New Age crystal`, 1],
  ],
  ["Mana Cost", [$item`baconstone`, 1]],
]);

const MiddleSacrifice = new Map<PantogramSacrificeM, [Item | number, number]>([
  [
    ["Combat Rate", -5],
    [-1, 0],
  ],
  [
    ["Combat Rate", -5],
    [-2, 0],
  ],
  ["Initiative", [$item`bar skin`, 1]],
  ["Familiar Weight", [$item`lead necklace`, 11]],
  ["Candy Drop", [$item`huge bowl of candy`, 1]],
  ["Item Drop Penalty", [$item`sea salt crystal`, 11]],
  ["Fishing Skill", [$item`wriggling worm`, 1]],
  ["Pool Skill", [$item`8-ball`, 15]],
  ["Avatar", [$item`moxie weed`, 99]],
  ["Drops Items", [$item`ten-leaf clover`, 1]],
]);

const RightSacrifice = new Map<PantogramSacrificeR, [Item | number, number]>([
  ["Weapon Damage", [-1, 0]],
  ["Spell Damage Percent", [-2, 0]],
  [
    ["Meat Drop", 30],
    [$item`taco shell`, 1],
  ],
  [
    ["Meat Drop", 60],
    [$item`porquoise`, 1],
  ],
  [
    ["Item Drop", 15],
    [$item`fairy gravy boat`, 1],
  ],
  [
    ["Item Drop", 30],
    [$item`tiny dancer`, 1],
  ],
  ["Muscle Experience", [$item`Knob Goblin firecracker`, 3]],
  ["Mysticality Experience", [$item`razor-sharp can lid`, 3]],
  ["Moxie Experience", [$item`spider web`, 3]],
  ["Muscle Experience Percent", [$item`synthetic marrow`, 5]],
  ["Mysticality Experience Percent", [$item`haunted battery`, 5]],
  ["Moxie Experience Percent", [$item`the funk`, 5]],
]);

export function findRequirements(modifiers: Partial<Pants>): Map<Item, number> {
  const { leftSac, rightSac, middleSac } = modifiers;

  const returnValue = new Map<Item, number>();

  if (leftSac) {
    const pair = LeftSacrifice.get(leftSac);
    if (pair) {
      const [sacrifice, quantity] = pair;
      if (sacrifice instanceof Item) {
        returnValue.set(sacrifice, quantity);
      }
    }
  }

  if (rightSac) {
    const pair = RightSacrifice.get(rightSac);
    if (pair) {
      const [sacrifice, quantity] = pair;
      if (sacrifice instanceof Item) {
        returnValue.set(sacrifice, quantity);
      }
    }
  }

  if (middleSac) {
    const pair = MiddleSacrifice.get(middleSac);
    if (pair) {
      const [sacrifice, quantity] = pair;
      if (sacrifice instanceof Item) {
        returnValue.set(sacrifice, quantity);
      }
    }
  }

  return returnValue;
}

function sacrificePairToURL(pair: [number | Item, number]): string {
  const [rawSacrifice, quantity] = pair;
  const sacrifice =
    rawSacrifice instanceof Item ? toInt(rawSacrifice) : rawSacrifice;
  return `${sacrifice},${quantity}`;
}

export function makePants(
  alignment: PantogramAlignment,
  element: PantogramElement,
  leftSac: PantogramSacrificeL,
  middleSac: PantogramSacrificeM,
  rightSac: PantogramSacrificeR
): boolean {
  if (haveItem(pants) || !haveItem(pantogram)) return false;

  const requirements = findRequirements({
    alignment: alignment,
    element: element,
    leftSac: leftSac,
    rightSac: rightSac,
    middleSac: middleSac,
  });

  if (
    Array.from(requirements.entries()).some(
      ([item, quantity]) => !haveItem(item, quantity)
    )
  ) {
    return false;
  }
  const s1 = LeftSacrifice.get(leftSac);
  const s2 = RightSacrifice.get(rightSac);
  const s3 = MiddleSacrifice.get(middleSac);
  if (!s1 || !s2 || !s3) return false;

  const url = `choice.php?whichchoice=1270&pwd&option=1&m=${
    Alignment[alignment]
  }&e=${Element[element]}&s1=${sacrificePairToURL(s1)}&s2=${sacrificePairToURL(
    s2
  )}&s3=${sacrificePairToURL(s3)}`;

  visitUrl("inv_use.php?pwd&whichitem=9573");
  visitUrl(url);
  return haveItem(pants);
}

export function makePantsFromObject(pants: Pants): boolean {
  return makePants(
    pants["alignment"],
    pants["element"],
    pants["leftSac"],
    pants["middleSac"],
    pants["rightSac"]
  );
}
