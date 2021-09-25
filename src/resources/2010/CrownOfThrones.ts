import { myFamiliar } from "kolmafia";
import { getSaleValue, have } from "../../lib";
import { Modifiers } from "../../modifier";
import { get } from "../../property";
import { $familiar, $item, $items } from "../../template-string";

export type FamiliarRider = {
  familiar: Familiar;
  meatVal: () => number;
  probability: number;
  modifier: Modifiers;
  dropPredicate?: () => boolean;
};

export const ridingFamiliars: FamiliarRider[] = [
  {
    familiar: $familiar`Puck Man`,
    meatVal: () => getSaleValue($item`yellow pixel`),
    probability: 0.25,
    modifier: {
      ["Muscle"]: 10,
      ["Mysticality"]: 10,
      ["Moxie"]: 10,
    },
    dropPredicate: () => get("_yellowPixelDropsCrown") < 25,
  },
  {
    familiar: $familiar`Ms. Puck Man`,
    meatVal: () => getSaleValue($item`yellow pixel`),
    probability: 0.25,
    modifier: {
      ["Muscle"]: 10,
      ["Mysticality"]: 10,
      ["Moxie"]: 10,
    },
    dropPredicate: () => get("_yellowPixelDropsCrown") < 25,
  },
  {
    familiar: $familiar`Grimstone Golem`,
    meatVal: () => getSaleValue($item`grimstone mask`),
    probability: 0.5,
    modifier: {
      ["Combat Rate"]: -5,
    },
    dropPredicate: () => get("_grimstoneMaskDropsCrown") < 1,
  },
  {
    familiar: $familiar`Knob Goblin Organ Grinder`,
    meatVal: () => 30,
    probability: 1,
    modifier: {
      ["Meat Drop"]: 25,
    },
  },
  {
    familiar: $familiar`Happy Medium`,
    meatVal: () => 30,
    probability: 1,
    modifier: {
      ["Meat Drop"]: 25,
    },
  },
  {
    familiar: $familiar`Garbage Fire`,
    meatVal: () => getSaleValue($item`burning newspaper`),
    probability: 0.5,
    modifier: {
      ["Hot Spell Damage"]: 25,
    },
    dropPredicate: () => get("_garbageFireDropsCrown") < 3,
  },
  {
    familiar: $familiar`Machine Elf`,
    meatVal: () =>
      getSaleValue(
        ...$items`abstraction: sensation, abstraction: thought, abstraction: action, abstraction: category, abstraction: perception, abstraction: purpose`
      ),
    probability: 0.2,
    modifier: {
      ["Muscle"]: 7,
      ["Mysticality"]: 7,
      ["Moxie"]: 7,
    },
    dropPredicate: () => get("_abstractionDropsCrown") < 25,
  },
  {
    familiar: $familiar`Trick-or-Treating Tot`,
    meatVal: () => getSaleValue($item`hoarded candy wad`),
    probability: 0.5,
    modifier: {
      ["Muscle"]: 10,
      ["Mysticality"]: 10,
      ["Moxie"]: 10,
    },
    dropPredicate: () => get("_hoardedCandyDropsCrown") < 3,
  },
  {
    familiar: $familiar`Warbear Drone`,
    meatVal: () => getSaleValue($item`warbear whosit`),
    probability: 1 / 4.5,
    modifier: {
      ["Maximum HP"]: 15,
      ["Maximum MP"]: 15,
    },
  },
  {
    familiar: $familiar`Li'l Xenomorph`,
    meatVal: () => getSaleValue($item`lunar isotope`),
    probability: 0.05,
    modifier: {
      ["Item Drop"]: 15,
    },
  },
  {
    familiar: $familiar`Pottery Barn Owl`,
    meatVal: () => getSaleValue($item`volcanic ash`),
    probability: 0.1,
    modifier: { ["Hot Damage"]: 10 },
  },
  {
    familiar: $familiar`Grim Brother`,
    meatVal: () => getSaleValue($item`grim fairy tale`),
    probability: 1,
    modifier: { ["Combat Rate"]: 5 },
    dropPredicate: () => get("_grimFairyTaleDropsCrown") < 2,
  },
  {
    familiar: $familiar`Optimistic Candle`,
    meatVal: () => getSaleValue($item`glob of melted wax`),
    probability: 1,
    dropPredicate: () => get("_optimisticCandleDropsCrown") < 3,
    modifier: {
      ["Item Drop"]: 15,
    },
  },
  {
    familiar: $familiar`Adventurous Spelunker`,
    meatVal: () =>
      getSaleValue(
        ...$items`teflon ore, velcro ore, vinyl ore, cardboard ore, styrofoam ore, bubblewrap ore`
      ),
    probability: 1,
    dropPredicate: () => get("_oreDropsCrown") < 6,
    modifier: {
      ["Item Drop"]: 15,
    },
  },
  {
    familiar: $familiar`Twitching Space Critter`,
    meatVal: () => getSaleValue($item`space beast fur`),
    probability: 1,
    modifier: {
      ["Hot Resistance"]: 2,
      ["Cold Resistance"]: 2,
      ["Spooky Resistance"]: 2,
      ["Sleaze Resistance"]: 2,
      ["Stench Resistance"]: 2,
    },
    dropPredicate: () => get("_spaceFurDropsCrown") < 1,
  },
  {
    familiar: $familiar`Party Mouse`,
    meatVal: () => 50,
    /*
    The below code is more accurate. However, party mouse is virtually never going to be worthwhile and this causes so many useless mall hits it isn't funny.

      getSaleValue(
        ...Item.all().filter(
          (booze) =>
            ["decent", "good"].includes(booze.quality) &&
            booze.inebriety > 0 &&
            booze.tradeable &&
            booze.discardable &&
            !$items`glass of "milk", cup of "tea", thermos of "whiskey", Lucky Lindy, Bee's Knees, Sockdollager, Ish Kabibble, Hot Socks, Phonus Balonus, Flivver, Sloppy Jalopy`.includes(
              booze
            )
        )
      ),
      */
    probability: 0.05,
    modifier: {
      ["Booze Drop"]: 25,
    },
  },
  {
    familiar: $familiar`Yule Hound`,
    meatVal: () => getSaleValue($item`candy cane`),
    probability: 1,
    modifier: { ["Candy Drop"]: 20 },
  },
  {
    familiar: $familiar`Gluttonous Green Ghost`,
    meatVal: () =>
      getSaleValue(
        ...$items`bean burrito, enchanted bean burrito, jumping bean burrito`
      ),
    probability: 1,
    modifier: { ["Food Drop"]: 15 },
  },
  {
    familiar: $familiar`Reassembled Blackbird`,
    meatVal: () => getSaleValue($item`blackberry`),
    probability: 1,
    modifier: {
      ["Item Drop"]: 10,
    },
  },
  {
    familiar: $familiar`Reconstituted Crow`,
    meatVal: () => getSaleValue($item`blackberry`),
    probability: 1,
    modifier: {
      ["Item Drop"]: 10,
    },
  },
  {
    familiar: $familiar`Hunchbacked Minion`,
    meatVal: () =>
      0.02 * getSaleValue($item`disembodied brain`) +
      0.98 * getSaleValue($item`skeleton bone`),
    probability: 1,
    modifier: { ["Muscle Experience"]: 2 },
  },
  {
    familiar: $familiar`Reanimated Reanimator`,
    meatVal: () => getSaleValue(...$items`hot wing, broken skull`),
    probability: 1,
    modifier: { ["Mysticality Experience"]: 2 },
  },
  {
    familiar: $familiar`Attention-Deficit Demon`,
    meatVal: () =>
      getSaleValue(
        ...$items`chorizo brownies, white chocolate and tomato pizza, carob chunk noodles`
      ),
    probability: 1,
    modifier: {
      ["Meat Drop"]: 20,
    },
  },
  {
    familiar: $familiar`Piano Cat`,
    meatVal: () =>
      getSaleValue(
        ...$items`beertini, papaya slung, salty slug, tomato daiquiri`
      ),
    probability: 1,
    modifier: {
      ["Meat Drop"]: 20,
    },
  },
  {
    familiar: $familiar`Golden Monkey`,
    meatVal: () => getSaleValue($item`gold nuggets`),
    probability: 0.5,
    modifier: {
      ["Meat Drop"]: 25,
    },
  },
  {
    familiar: $familiar`Robot Reindeer`,
    meatVal: () =>
      getSaleValue(
        ...$items`candy cane, eggnog, fruitcake, gingerbread bugbear`
      ),
    probability: 0.3,
    modifier: {
      ["Muscle"]: 10,
      ["Mysticality"]: 10,
      ["Moxie"]: 10,
    },
  },
  {
    familiar: $familiar`Stocking Mimic`,
    meatVal: () =>
      getSaleValue(
        ...$items`Angry Farmer candy, Cold Hots candy, Rock Pops, Tasty Fun Good rice candy, Wint-O-Fresh mint`
      ),
    probability: 0.3,
    modifier: {
      ["Muscle"]: 10,
      ["Mysticality"]: 10,
      ["Moxie"]: 10,
    },
  },
  {
    familiar: $familiar`BRICKO chick`,
    meatVal: () => getSaleValue($item`BRICKO brick`),
    probability: 1,
    modifier: {
      ["Muscle Percent"]: 10,
      ["Mysticality Percent"]: 10,
      ["Moxie Percent"]: 10,
    },
  },
  {
    familiar: $familiar`Cotton Candy Carnie`,
    meatVal: () => getSaleValue($item`cotton candy pinch`),
    probability: 1,
    modifier: { ["Initiative"]: 20 },
  },
  {
    familiar: $familiar`Untamed Turtle`,
    meatVal: () =>
      getSaleValue(...$items`snailmail bits, turtlemail bits, turtle wax`),
    probability: 0.35,
    modifier: { ["Initiative"]: 20 },
  },
  {
    familiar: $familiar`Astral Badger`,
    meatVal: () =>
      2 *
      getSaleValue(...$items`spooky mushroom, Knob mushroom, Knoll mushroom`),
    probability: 1,
    modifier: { ["Maximum HP"]: 10, ["Maximum MP"]: 10 },
  },
  {
    familiar: $familiar`Green Pixie`,
    meatVal: () => getSaleValue($item`bottle of tequila`),
    probability: 0.2,
    modifier: { ["Maximum HP"]: 10, ["Maximum MP"]: 10 },
  },
  {
    familiar: $familiar`Angry Goat`,
    meatVal: () => getSaleValue($item`goat cheese pizza`),
    probability: 1,
    modifier: { ["Muscle Percent"]: 15 },
  },
  {
    familiar: $familiar`Adorable Seal Larva`,
    meatVal: () =>
      getSaleValue(
        ...$items`stench nuggets, spooky nuggets, hot nuggets, cold nuggets, sleaze nuggets`
      ),
    probability: 0.35,
    modifier: {
      ["HP Regen Min"]: 2,
      ["MP Regen Min"]: 2,
      ["HP Regen Max"]: 8,
      ["MP Regen Max"]: 8,
    },
  },
  {
    familiar: $familiar`Ancient Yuletide Troll`,
    meatVal: () =>
      getSaleValue(
        ...$items`candy cane, eggnog, fruitcake, gingerbread bugbear`
      ),
    probability: 0.3,
    modifier: {
      ["HP Regen Min"]: 2,
      ["MP Regen Min"]: 2,
      ["HP Regen Max"]: 8,
      ["MP Regen Max"]: 8,
    },
  },
  {
    familiar: $familiar`Sweet Nutcracker`,
    meatVal: () =>
      getSaleValue(
        ...$items`candy cane, eggnog, fruitcake, gingerbread bugbear`
      ),
    probability: 0.3,
    modifier: {
      ["HP Regen Min"]: 2,
      ["MP Regen Min"]: 2,
      ["HP Regen Max"]: 8,
      ["MP Regen Max"]: 8,
    },
  },
  {
    familiar: $familiar`Casagnova Gnome`,
    meatVal: () => 0,
    probability: 0,
    modifier: {
      ["Meat Drop"]: 20,
    },
  },
  {
    familiar: $familiar`Coffee Pixie`,
    meatVal: () => 0,
    probability: 0,
    modifier: {
      ["Meat Drop"]: 20,
    },
  },
  {
    familiar: $familiar`Dancing Frog`,
    meatVal: () => 0,
    probability: 0,
    modifier: {
      ["Meat Drop"]: 20,
    },
  },
  {
    familiar: $familiar`Grouper Groupie`,
    meatVal: () => 0,
    probability: 0,
    modifier: {
      ["Meat Drop"]: 20,
    },
  },
  {
    familiar: $familiar`Hand Turkey`,
    meatVal: () => 30,
    probability: 1,
    modifier: {
      ["Meat Drop"]: 20,
    },
  },
  {
    familiar: $familiar`Hippo Ballerina`,
    meatVal: () => 0,
    probability: 0,
    modifier: {
      ["Meat Drop"]: 20,
    },
  },
  {
    familiar: $familiar`Jitterbug`,
    meatVal: () => 0,
    probability: 0,
    modifier: {
      ["Meat Drop"]: 20,
    },
  },
  {
    familiar: $familiar`Leprechaun`,
    meatVal: () => 30,
    probability: 1,
    modifier: {
      ["Meat Drop"]: 20,
    },
  },
  {
    familiar: $familiar`Obtuse Angel`,
    meatVal: () => 0,
    probability: 0,
    modifier: {
      ["Meat Drop"]: 20,
    },
  },
  {
    familiar: $familiar`Psychedelic Bear`,
    meatVal: () => 0,
    probability: 0,
    modifier: {
      ["Meat Drop"]: 20,
    },
  },
  {
    familiar: $familiar`Robortender`,
    meatVal: () => 0,
    probability: 0,
    modifier: {
      ["Meat Drop"]: 20,
    },
  },
  {
    familiar: $familiar`Ghost of Crimbo Commerce`,
    meatVal: () => 30,
    probability: 1,
    modifier: {
      ["Meat Drop"]: 25,
    },
  },
  {
    familiar: $familiar`Hobo Monkey`,
    meatVal: () => 0,
    probability: 0,
    modifier: {
      ["Meat Drop"]: 25,
    },
  },
  {
    familiar: $familiar`Rockin' Robin`,
    meatVal: () => 60,
    probability: 1,
    modifier: {
      ["Item Drop"]: 15,
    },
  },
  {
    familiar: $familiar`Feral Kobold`,
    meatVal: () => 30,
    probability: 1,
    modifier: {
      ["Item Drop"]: 15,
    },
  },
  {
    familiar: $familiar`Oily Woim`,
    meatVal: () => 30,
    probability: 1,
    modifier: {
      ["Item Drop"]: 10,
    },
  },
  {
    familiar: $familiar`Cat Burglar`,
    meatVal: () => 0,
    probability: 0,
    modifier: {
      ["Item Drop"]: 10,
    },
  },
  {
    familiar: $familiar`Misshapen Animal Skeleton`,
    meatVal: () => 30,
    probability: 1,
    modifier: {
      ["Familiar Weight"]: 5,
    },
  },
  {
    familiar: $familiar`Gelatinous Cubeling`,
    meatVal: () => 0,
    probability: 0,
    modifier: {
      ["Familiar Weight"]: 5,
    },
  },
  {
    familiar: $familiar`Frozen Gravy Fairy`,
    // drops a cold nugget every combat, 5 of which can be used to make a cold wad
    meatVal: () =>
      Math.max(
        0.2 * getSaleValue($item`cold wad`),
        getSaleValue($item`cold nuggets`)
      ),
    probability: 1,
    modifier: { ["Cold Damage"]: 20 },
  },
  {
    familiar: $familiar`Stinky Gravy Fairy`,
    // drops a stench nugget every combat, 5 of which can be used to make a stench wad
    meatVal: () =>
      Math.max(
        0.2 * getSaleValue($item`stench wad`),
        getSaleValue($item`stench nuggets`)
      ),
    probability: 1,
    modifier: { ["Stench Damage"]: 20 },
  },
  {
    familiar: $familiar`Sleazy Gravy Fairy`,
    // drops a sleaze nugget every combat, 5 of which can be used to make a sleaze wad
    meatVal: () =>
      Math.max(
        0.2 * getSaleValue($item`sleaze wad`),
        getSaleValue($item`sleaze nuggets`)
      ),
    probability: 1,
    modifier: { ["Sleaze Damage"]: 20 },
  },
  {
    familiar: $familiar`Spooky Gravy Fairy`,
    // drops a spooky nugget every combat, 5 of which can be used to make a spooky wad
    meatVal: () =>
      Math.max(
        0.2 * getSaleValue($item`spooky wad`),
        getSaleValue($item`spooky nuggets`)
      ),
    probability: 1,
    modifier: { ["Spooky Damage"]: 20 },
  },
  {
    familiar: $familiar`Flaming Gravy Fairy`,
    // drops a hot nugget every combat, 5 of which can be used to make a hot wad
    meatVal: () =>
      Math.max(
        0.2 * getSaleValue($item`hot wad`),
        getSaleValue($item`hot nuggets`)
      ),
    probability: 1,
    modifier: { ["Hot Damage"]: 20 },
  },
];

function valueRider(
  rider: FamiliarRider,
  modifierValueFunction: (modifiers: Modifiers) => number,
  useLimitedDrops = true
) {
  const dropValue =
    !rider.dropPredicate || (rider.dropPredicate() && !useLimitedDrops)
      ? rider.probability * rider.meatVal()
      : 0;
  const modifierValue = modifierValueFunction(rider.modifier);
  return dropValue + modifierValue;
}

type RiderMode = {
  modifierValueFunction: (modifiers: Modifiers) => number;
  useLimitedDrops: boolean;
  excludeCurrentFamiliar: boolean;
};

const riderModes = new Map<string, RiderMode>();

export function createRiderMode(
  name: string,
  modifierValueFunction: (modifiers: Modifiers) => number,
  useLimitedDrops = true,
  excludeCurrentFamiliar = true
) {
  riderModes.set(name, {
    modifierValueFunction: modifierValueFunction,
    useLimitedDrops: useLimitedDrops,
    excludeCurrentFamiliar: excludeCurrentFamiliar,
  });
}

const riderLists = new Map<string, FamiliarRider[]>();

export function pickRider(mode: string): FamiliarRider | null {
  const modeData = riderModes.get(mode);
  if (!modeData) throw new Error("Unrecognized rider mode!");
  const {
    modifierValueFunction,
    useLimitedDrops,
    excludeCurrentFamiliar,
  } = modeData;
  if (!riderLists.has(mode)) {
    riderLists.set(
      mode,
      ridingFamiliars
        .filter((rider) => have(rider.familiar))
        .sort(
          (a, b) =>
            valueRider(b, modifierValueFunction, useLimitedDrops) -
            valueRider(a, modifierValueFunction, useLimitedDrops)
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
