import { Item, toInt, visitUrl } from "kolmafia";
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

const Alignment = {
  ["Muscle"]: 1,
  ["Mysticality"]: 2,
  ["Moxie"]: 3,
};

type PantogramAlignment = "Muscle" | "Moxie" | "Mysticality";

const Element = {
  ["Hot Resistance: 2"]: 1,
  ["Cold Resistance: 2"]: 2,
  ["Spooky Resistance: 2"]: 3,
  ["Sleaze Resistance: 2"]: 4,
  ["Stench Resistance: 2"]: 5,
};

type PantogramElement = keyof typeof Element;

const LeftSacrifice = {
  ["Maximum HP: 40"]: [-1, 0],
  ["Maximum MP: 20"]: [-2, 0],
  ["HP Regen Max: 10"]: [$item`red pixel potion`, 1],
  ["HP Regen Max: 15"]: [$item`royal jelly`, 1],
  ["HP Regen Max: 20"]: [$item`scented massage oil`, 1],
  ["MP Regen Max: 10"]: [$item`Cherry Cloaca Cola`, 1],
  ["MP Regen Max: 15"]: [$item`bubblin' crude`, 1],
  ["MP Regen Max: 20"]: [$item`glowing New Age crystal`, 1],
  ["Mana Cost: -3"]: [$item`baconstone`, 1],
};

type PantogramSacrificeL = keyof typeof LeftSacrifice;

function getLeftSacPair(mod: PantogramSacrificeL): [Item | number, number] {
  return LeftSacrifice[mod] as [Item | number, number];
}

const MiddleSacrifice = {
  ["Combat Rate: -5"]: [-1, 0],
  ["Combat Rate: 5"]: [-2, 0],
  ["Critical Hit Percent: 10"]: [$item`hamethyst`, 1],
  ["Initiative: 50"]: [$item`bar skin`, 1],
  ["Familiar Weight: 10"]: [$item`lead necklace`, 11],
  ["Candy Drop: 100"]: [$item`huge bowl of candy`, 1],
  ["Item Drop Penalty: -10"]: [$item`sea salt crystal`, 11],
  ["Fishing Skill: 5"]: [$item`wriggling worm`, 1],
  ["Pool Skill: 5"]: [$item`8-ball`, 15],
  ["Avatar: Purple"]: [$item`moxie weed`, 99],
  ["Drops Items: true"]: [$item`ten-leaf clover`, 1],
};

type PantogramSacrificeM = keyof typeof MiddleSacrifice;

function getMiddleSacPair(mod: PantogramSacrificeM): [Item | number, number] {
  return MiddleSacrifice[mod] as [Item | number, number];
}
const RightSacrifice = {
  ["Weapon Damage: 20"]: [-1, 0],
  ["Spell Damage Percent: 20"]: [-2, 0],
  ["Meat Drop: 30"]: [$item`taco shell`, 1],
  ["Meat Drop: 60"]: [$item`porquoise`, 1],
  ["Item Drop: 15"]: [$item`fairy gravy boat`, 1],
  ["Item Drop: 30"]: [$item`tiny dancer`, 1],
  ["Muscle Experience: 3"]: [$item`Knob Goblin firecracker`, 3],
  ["Mysticality Experience: 3"]: [$item`razor-sharp can lid`, 3],
  ["Moxie Experience: 3"]: [$item`spider web`, 3],
  ["Muscle Experience Percent: 25"]: [$item`synthetic marrow`, 5],
  ["Mysticality Experience Percent: 25"]: [$item`haunted battery`, 5],
  ["Moxie Experience Percent: 25"]: [$item`the funk`, 5],
};

type PantogramSacrificeR = keyof typeof RightSacrifice;

function getRightSacPair(mod: PantogramSacrificeR): [Item | number, number] {
  return RightSacrifice[mod] as [Item | number, number];
}

type Pants = {
  alignment: PantogramAlignment;
  element: PantogramElement;
  leftSac: PantogramSacrificeL;
  rightSac: PantogramSacrificeR;
  middleSac: PantogramSacrificeM;
};

/**
 * Finds the item requirements for a particular pair of pants.
 * @param modifiers An object consisting of the modifiers you want on your pants. For modifiers repeated across a particular sacrifice, use a tuple of that modifier and its value.
 * @returns A map of the items you need to make these pants and the quantities needed.
 */
export function findRequirements(modifiers: Partial<Pants>): Map<Item, number> {
  const { leftSac, rightSac, middleSac } = modifiers;

  const returnValue = new Map<Item, number>();

  if (leftSac) {
    const [sacrifice, quantity] = getLeftSacPair(leftSac);
    if (sacrifice instanceof Item) {
      returnValue.set(sacrifice, quantity);
    }
  }

  if (rightSac) {
    const [sacrifice, quantity] = getRightSacPair(rightSac);
    if (sacrifice instanceof Item) {
      returnValue.set(sacrifice, quantity);
    }
  }

  if (middleSac) {
    const [sacrifice, quantity] = getMiddleSacPair(middleSac);
    if (sacrifice instanceof Item) {
      returnValue.set(sacrifice, quantity);
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

/**
 * Makes a pair of pants with the given modifiers
 * @param alignment The stat you'd like your pants to improve. Moxie, Mysticality, or Muscle
 * @param element The element you'd like your pants to provide resistance for
 * @param leftSac The modifier you'd like to get from your leftmost sacrifice in Pantagramming.
 * @param middleSac The modifier you'd like to get from your middle sacrifice in Pantagramming.
 * @param rightSac The modifier you'd like to get from your rightmost sacrifice in Pantagramming.
 * @returns Whether or not you successfully created a pair of pants. False if you don't own the pantogram or if you already have pantogram pants.
 */
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
  const s1 = sacrificePairToURL(getLeftSacPair(leftSac));
  const s2 = sacrificePairToURL(getRightSacPair(rightSac));
  const s3 = sacrificePairToURL(getMiddleSacPair(middleSac));

  const url = `choice.php?whichchoice=1270&pwd&option=1&m=${Alignment[alignment]}&e=${Element[element]}&s1=${s1}&s2=${s2}&s3=${s3}`;

  visitUrl("inv_use.php?pwd&whichitem=9573");
  visitUrl(url);
  return haveItem(pants);
}

/**
 * Creates a pair of pants from a Pants object.
 * @param pants An object consisting of the modifiers you'd like the pants to give you.
 * @returns Whether or not you successfully created a pair of pants. False if you don't own the pantogram or if you already have pantogram pants.
 */
export function makePantsFromObject(pants: Pants): boolean {
  return makePants(
    pants.alignment,
    pants.element,
    pants.leftSac,
    pants.middleSac,
    pants.rightSac
  );
}
