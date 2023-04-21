import { Familiar, Item, myFamiliar, numericModifier } from "kolmafia";
import { getSaleValue, have } from "../../lib";
import { NumericModifier } from "../../modifierTypes";
import { get } from "../../property";
import { $familiar, $item, $items } from "../../template-string";
import { sum } from "../../utils";

export type FamiliarRider = {
  familiar: Familiar;
  drops: number | Item[] | Map<Item, number>;
  probability: number;
  dropPredicate?: () => boolean;
};

export const ridingFamiliars: readonly FamiliarRider[] = [
  {
    familiar: $familiar`Puck Man`,
    drops: $items`yellow pixel`,
    probability: 0.25,
    dropPredicate: () => get("_yellowPixelDropsCrown") < 25,
  },
  {
    familiar: $familiar`Ms. Puck Man`,
    drops: $items`yellow pixel`,
    probability: 0.25,
    dropPredicate: () => get("_yellowPixelDropsCrown") < 25,
  },
  {
    familiar: $familiar`Grimstone Golem`,
    drops: $items`grimstone mask`,
    probability: 0.5,
    dropPredicate: () => get("_grimstoneMaskDropsCrown") < 1,
  },
  {
    familiar: $familiar`Knob Goblin Organ Grinder`,
    drops: 30,
    probability: 1,
  },
  {
    familiar: $familiar`Happy Medium`,
    drops: 30,
    probability: 1,
  },
  {
    familiar: $familiar`Garbage Fire`,
    drops: $items`burning newspaper`,
    probability: 0.5,
    dropPredicate: () => get("_garbageFireDropsCrown") < 3,
  },
  {
    familiar: $familiar`Machine Elf`,
    drops: $items`abstraction: sensation, abstraction: thought, abstraction: action, abstraction: category, abstraction: perception, abstraction: purpose`,
    probability: 0.2,
    dropPredicate: () => get("_abstractionDropsCrown") < 25,
  },
  {
    familiar: $familiar`Trick-or-Treating Tot`,
    drops: $items`hoarded candy wad`,
    probability: 0.5,
    dropPredicate: () => get("_hoardedCandyDropsCrown") < 3,
  },
  {
    familiar: $familiar`Warbear Drone`,
    drops: $items`warbear whosit`,
    probability: 1 / 4.5,
  },
  {
    familiar: $familiar`Li'l Xenomorph`,
    drops: $items`lunar isotope`,
    probability: 0.05,
  },
  {
    familiar: $familiar`Pottery Barn Owl`,
    drops: $items`volcanic ash`,
    probability: 0.1,
  },
  {
    familiar: $familiar`Grim Brother`,
    drops: $items`grim fairy tale`,
    probability: 1,
    dropPredicate: () => get("_grimFairyTaleDropsCrown") < 2,
  },
  {
    familiar: $familiar`Optimistic Candle`,
    drops: $items`glob of melted wax`,
    probability: 1,
    dropPredicate: () => get("_optimisticCandleDropsCrown") < 3,
  },
  {
    familiar: $familiar`Adventurous Spelunker`,
    drops: $items`teflon ore, velcro ore, vinyl ore, cardboard ore, styrofoam ore, bubblewrap ore`,
    probability: 1,
    dropPredicate: () => get("_oreDropsCrown") < 6,
  },
  {
    familiar: $familiar`Twitching Space Critter`,
    drops: $items`space beast fur`,
    probability: 1,
    dropPredicate: () => get("_spaceFurDropsCrown") < 1,
  },
  {
    familiar: $familiar`Party Mouse`,
    drops: 50,
    probability: 0.05,
  },
  {
    familiar: $familiar`Yule Hound`,
    drops: $items`candy cane`,
    probability: 1,
  },
  {
    familiar: $familiar`Gluttonous Green Ghost`,
    drops: $items`bean burrito, enchanted bean burrito, jumping bean burrito`,
    probability: 1,
  },
  {
    familiar: $familiar`Reassembled Blackbird`,
    drops: $items`blackberry`,
    probability: 1,
  },
  {
    familiar: $familiar`Reconstituted Crow`,
    drops: $items`blackberry`,
    probability: 1,
  },
  {
    familiar: $familiar`Hunchbacked Minion`,
    drops: new Map([
      [$item`disembodied brain`, 0.02],
      [$item`skeleton bone`, 0.98],
    ]),
    probability: 1,
  },
  {
    familiar: $familiar`Reanimated Reanimator`,
    drops: $items`hot wing, broken skull`,
    probability: 1,
  },
  {
    familiar: $familiar`Attention-Deficit Demon`,
    drops: $items`chorizo brownies, white chocolate and tomato pizza, carob chunk noodles`,
    probability: 1,
  },
  {
    familiar: $familiar`Piano Cat`,
    drops: $items`beertini, papaya slung, salty slug, tomato daiquiri`,
    probability: 1,
  },
  {
    familiar: $familiar`Golden Monkey`,
    drops: $items`gold nuggets`,
    probability: 0.5,
  },
  {
    familiar: $familiar`Robot Reindeer`,
    drops: $items`candy cane, eggnog, fruitcake, gingerbread bugbear`,
    probability: 0.3,
  },
  {
    familiar: $familiar`Stocking Mimic`,
    drops: getSaleValue(
      ...$items`Angry Farmer candy, Cold Hots candy, Rock Pops, Tasty Fun Good rice candy, Wint-O-Fresh mint`
    ),
    probability: 0.3,
  },
  {
    familiar: $familiar`BRICKO chick`,
    drops: $items`BRICKO brick`,
    probability: 1,
  },
  {
    familiar: $familiar`Cotton Candy Carnie`,
    drops: $items`cotton candy pinch`,
    probability: 1,
  },
  {
    familiar: $familiar`Untamed Turtle`,
    drops: $items`snailmail bits, turtlemail bits, turtle wax`,
    probability: 0.35,
  },
  {
    familiar: $familiar`Astral Badger`,
    drops: $items`spooky mushroom, Knob mushroom, Knoll mushroom`,
    probability: 1,
  },
  {
    familiar: $familiar`Green Pixie`,
    drops: $items`bottle of tequila`,
    probability: 0.2,
  },
  {
    familiar: $familiar`Angry Goat`,
    drops: $items`goat cheese pizza`,
    probability: 1,
  },
  {
    familiar: $familiar`Adorable Seal Larva`,
    drops: $items`stench nuggets, spooky nuggets, hot nuggets, cold nuggets, sleaze nuggets`,
    probability: 0.35,
  },
  {
    familiar: $familiar`Ancient Yuletide Troll`,
    drops: $items`candy cane, eggnog, fruitcake, gingerbread bugbear`,
    probability: 0.3,
  },
  {
    familiar: $familiar`Sweet Nutcracker`,
    drops: $items`candy cane, eggnog, fruitcake, gingerbread bugbear`,
    probability: 0.3,
  },
  {
    familiar: $familiar`Casagnova Gnome`,
    drops: 0,
    probability: 0,
  },
  {
    familiar: $familiar`Coffee Pixie`,
    drops: 0,
    probability: 0,
  },
  {
    familiar: $familiar`Dancing Frog`,
    drops: 0,
    probability: 0,
  },
  {
    familiar: $familiar`Grouper Groupie`,
    drops: 0,
    probability: 0,
  },
  {
    familiar: $familiar`Hand Turkey`,
    drops: 30,
    probability: 1,
  },
  {
    familiar: $familiar`Hippo Ballerina`,
    drops: 0,
    probability: 0,
  },
  {
    familiar: $familiar`Jitterbug`,
    drops: 0,
    probability: 0,
  },
  {
    familiar: $familiar`Leprechaun`,
    drops: 30,
    probability: 1,
  },
  {
    familiar: $familiar`Obtuse Angel`,
    drops: 0,
    probability: 0,
  },
  {
    familiar: $familiar`Psychedelic Bear`,
    drops: 0,
    probability: 0,
  },
  {
    familiar: $familiar`Robortender`,
    drops: 0,
    probability: 0,
  },
  {
    familiar: $familiar`Ghost of Crimbo Commerce`,
    drops: 30,
    probability: 1,
  },
  {
    familiar: $familiar`Hobo Monkey`,
    drops: 0,
    probability: 0,
  },
  {
    familiar: $familiar`Rockin' Robin`,
    drops: 60,
    probability: 1,
  },
  {
    familiar: $familiar`Feral Kobold`,
    drops: 30,
    probability: 1,
  },
  {
    familiar: $familiar`Oily Woim`,
    drops: 30,
    probability: 1,
  },
  {
    familiar: $familiar`Cat Burglar`,
    drops: 0,
    probability: 0,
  },
  {
    familiar: $familiar`Misshapen Animal Skeleton`,
    drops: 30,
    probability: 1,
  },
  {
    familiar: $familiar`Gelatinous Cubeling`,
    drops: 0,
    probability: 0,
  },
  {
    familiar: $familiar`Frozen Gravy Fairy`,
    drops: $items`cold nuggets`,
    probability: 1,
  },
  {
    familiar: $familiar`Stinky Gravy Fairy`,
    drops: $items`stench nuggets`,
    probability: 1,
  },
  {
    familiar: $familiar`Sleazy Gravy Fairy`,
    drops: $items`sleaze nuggets`,
    probability: 1,
  },
  {
    familiar: $familiar`Spooky Gravy Fairy`,
    drops: $items`spooky nuggets`,
    probability: 1,
  },
  {
    familiar: $familiar`Flaming Gravy Fairy`,
    // drops a hot nugget every combat, 5 of which can be used to make a hot wad
    drops: $items`hot nuggets`,
    probability: 1,
  },
] as const;

/**
 * Value a specified familiar Crown rider
 *
 * @param rider Familiar to value
 * @param modifierValueFunction Value of the extra modifiers the familiar provides,
 * @param dropsValueFunction Value to assign the drops of the familiar gives
 * @param ignoreLimitedDrops Whether to ignore drops that are daily or otherwise limited
 * @returns Rider value (in meat)
 */
export function valueRider(
  rider: FamiliarRider,
  modifierValueFunction: (familiar: Familiar) => number,
  dropsValueFunction: (drops: Item[] | Map<Item, number>) => number,
  ignoreLimitedDrops = false
): number {
  const dropValue =
    !rider.dropPredicate || (rider.dropPredicate() && !ignoreLimitedDrops)
      ? rider.probability *
        (typeof rider.drops === "number"
          ? rider.drops
          : dropsValueFunction(rider.drops))
      : 0;
  const modifierValue = modifierValueFunction(rider.familiar);
  return dropValue + modifierValue;
}

type RiderMode = {
  modifierValueFunction: (familiar: Familiar) => number;
  dropsValueFunction: (drops: Item[] | Map<Item, number>) => number;
  ignoreLimitedDrops: boolean;
  excludeCurrentFamiliar: boolean;
};

const riderModes = new Map<string, RiderMode>();

const DEFAULTS = {
  modifierValueFunction: () => 0,
  dropsValueFunction: () => 0,
  ignoreLimitedDrops: false,
  excludeCurrentFamiliar: true,
};
/**
 * Creates a rider mode for this session
 *
 * @param name Rider mode name
 * @param details An object consisting of various settings for the RiderMode:
 * @param details.modifierValueFunction Function to value a familiar itself, often using modifiers,
 * @param details.dropsValueFunction Function to value the drops of a familiar, which are stored as an `Item[]` or `Map<Item, number>`
 * @param details.ignoreLimitedDrops Whether to ignore daily or otherwise limited drops
 * @param details.excludeCurrentFamiliar Whether to exclude the player's current familiar
 * @returns Map of all rider modes created this session, including the one that was just made
 */
export function createRiderMode(
  name: string,
  details: Partial<RiderMode>
): Map<string, RiderMode> {
  return riderModes.set(name, { ...DEFAULTS, ...details });
}

const riderLists = new Map<string, FamiliarRider[]>();

/**
 * Pick a rider
 *
 * @param mode Mode by which to select possible riders
 * @returns Picked faimiliar rider or null if no rider could be selected
 */
export function pickRider(mode: string): FamiliarRider | null {
  const modeData = riderModes.get(mode);
  if (!modeData) return null;
  const {
    modifierValueFunction,
    dropsValueFunction,
    ignoreLimitedDrops,
    excludeCurrentFamiliar,
  } = modeData;
  if (!riderLists.has(mode)) {
    riderLists.set(
      mode,
      ridingFamiliars
        .filter((rider) => have(rider.familiar))
        .sort(
          (a, b) =>
            valueRider(
              b,
              modifierValueFunction,
              dropsValueFunction,
              ignoreLimitedDrops
            ) -
            valueRider(
              a,
              modifierValueFunction,
              dropsValueFunction,
              ignoreLimitedDrops
            )
        )
    );
  }
  const list = riderLists.get(mode);
  if (list) {
    const riderToReturn = list.find(
      (rider) =>
        (!rider.dropPredicate || rider.dropPredicate()) &&
        (!excludeCurrentFamiliar || myFamiliar() !== rider.familiar)
    );
    return riderToReturn ?? null;
  }
  return null;
}

/**
 * Find the associated NumericModifier for a given familiar when enthroned or bjornified
 *
 * @param modifier The NumericModifier in question
 * @param familiar The Familiar in question
 * @returns The value of the given numeric modifier for the Crown of Thrones (or buddy bjorn) when the given familiar is encromulated
 */
export function getModifier(
  modifier: NumericModifier,
  familiar: Familiar
): number {
  return numericModifier(`Throne:${familiar}`, modifier);
}

/**
 * Create a `modifierValueFunction` for a familiar.
 *
 * @param modifiers An array consisting of the `NumericModifier`s relevant to your valuation
 * @param functions An object keyed by `NumericModifier`s whose values are functions that map the the result of a modifier to its corresponding valuation
 * @returns A function that maps a familiar to the value of its modifiers in the crown of thrones or buddy bjorn.
 */
export function createModifierValueFunction<T extends NumericModifier>(
  modifiers: T[],
  functions: { [x in T]: (mod: number) => number }
): (familiar: Familiar) => number {
  return (familiar: Familiar) =>
    sum(modifiers, (modifier) =>
      functions[modifier](getModifier(modifier, familiar))
    );
}
