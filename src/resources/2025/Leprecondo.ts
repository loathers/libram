import { Effect, Item, runChoice } from "kolmafia";
import { directlyUse, have as have_ } from "../../lib.js";
import { $effect, $item, $items } from "../../template-string.js";
import { arrayEquals, clamp, Tuple } from "../../utils.js";
import { get } from "../../property.js";

/**
 * @returns Whether you `have` the Leprecondo
 */
export function have(): boolean {
  return have_($item`Leprecondo`);
}

export const NEEDS = Object.freeze([
  "exercise",
  "mental stimulation",
  "dumb entertainment",
  "food",
  "booze",
  "sleep",
] as const);
export type Need = (typeof NEEDS)[number];

export const FURNITURE_PIECES = Object.freeze([
  "empty",
  "buckets of concrete",
  "thrift store oil painting",
  "boxes of old comic books",
  "second-hand hot plate",
  "beer cooler",
  "free mattress",
  "gigantic chess set",
  "UltraDance karaoke machine",
  "cupcake treadmill",
  "beer pong table",
  "padded weight bench",
  "internet-connected laptop",
  "sous vide laboratory",
  "programmable blender",
  "sensory deprivation tank",
  "fruit-smashing robot",
  "ManCave™ sports bar set",
  "couch and flatscreen",
  "kegerator",
  "fine upholstered dining set",
  "whiskeybed",
  "high-end home workout system",
  "complete classics library",
  "ultimate retro game console",
  "Omnipot",
  "fully-stocked wet bar",
  "four-poster bed",
] as const);
export type FurniturePiece = (typeof FURNITURE_PIECES)[number];

type Result = Item | Item[] | { effect: Effect; duration: number };
type FurnitureStat = Partial<Record<Need, Result>>;

export const Furniture = Object.freeze({
  empty: {},
  "beer cooler": {
    booze: $items`beer bomb, bloody beer, ice-cold fotie, ice-cold Sir Schlitz, ice-cold Willer, overpriced \&quot;imported\&quot; beer, plain old beer`,
  },
  "beer pong table": {
    booze: $items`beer bomb, bloody beer, ice-cold fotie, ice-cold Sir Schlitz, ice-cold Willer, overpriced \&quot;imported\&quot; beer, plain old beer`,
    exercise: $item`table tennis ball`,
  },
  "boxes of old comic books": {
    "dumb entertainment": { effect: $effect`Wasting Time`, duration: 10 },
  },
  "buckets of concrete": {
    exercise: { effect: $effect`Gym Bros`, duration: 10 },
  },
  "complete classics library": {
    "mental stimulation": $item`leprechaun antidepressant pill`,
  },
  "couch and flatscreen": {
    "dumb entertainment": {
      effect: $effect`Your Days Are Numbed`,
      duration: 10,
    },
    sleep: { effect: $effect`Good Night's Sleep`, duration: 10 },
  },
  "cupcake treadmill": {
    exercise: { effect: $effect`Your Days Are Numbed`, duration: 10 },
    food: $item`standard-issue cupcake`,
  },
  "fine upholstered dining set": {
    food: $item`random food from the drop pool`,
    sleep: { effect: $effect`Sur La Table`, duration: 10 },
  },
  "four-poster bed": {
    sleep: { effect: $effect`Spacious Night's Sleep`, duration: 10 },
  },
  "free mattress": {
    sleep: { effect: $effect`Good Night's Sleep`, duration: 10 },
  },
  "fruit-smashing robot": {
    "dumb entertainment": {
      effect: $effect`You Might Have Gotten Wet`,
      duration: 10,
    },
    food: $items`cherry, cranberries, grapefruit, grapes, kiwi, kumquat, lemon, lime, orange, papaya, raspberry, strawberry, tangerine`,
  },
  "fully-stocked wet bar": {
    booze: $item`Divine Sidecar, prussian cathouse sidecar, tangarita sidecar`,
  },
  "gigantic chess set": {
    exercise: { effect: $effect`Work Out Smarter, Not Harder`, duration: 10 },
    "mental stimulation": { effect: $effect`Well Stimulated`, duration: 10 },
  },
  "high-end home workout system": {
    exercise: $item`scoop of pre-workout powder`,
  },
  "internet-connected laptop": {
    "dumb entertainment": { effect: $effect`Wasting Time`, duration: 10 },
    "mental stimulation": $item`crafting plans`,
  },
  kegerator: {
    booze: $item`pint of Leprechaun Stout`,
    food: $items`bean burrito , plain pizza, spicy mushroom quesadilla, tofu casserole, Trollhouse cookies`,
  },
  "ManCave™ sports bar set": {
    booze: $items`melted Jell-o shot, shot of blackberry schnapps, shot of nepenthe schnapps, shot of peach schnapps, shot of pear schnapps, shot of rotgut`,
    "dumb entertainment": $item`bar dart`,
  },
  Omnipot: {
    food: $item`Heck ramen, incredible mini-pizza, small beer brat, tiny burrito, tiny peach pie, savoy truffle, white chocolate chip brownies`,
  },
  "padded weight bench": {
    exercise: { effect: $effect`Gym Bros`, duration: 10 },
    sleep: { effect: $effect`Tired Muscles`, duration: 10 },
  },
  "programmable blender": {
    booze: $items`eggnog, extra-spicy bloody mary, grog, white lightning`,
    "mental stimulation": {
      effect: $effect`Counter Intelligence`,
      duration: 10,
    },
  },
  "second-hand hot plate": {
    food: $items`bean burrito, chorizo taco, plain pizza, spicy mushroom quesadilla, tofu casserole, Trollhouse cookies`,
  },
  "sensory deprivation tank": {
    "mental stimulation": {
      effect: $effect`Alone with Your Thoughts`,
      duration: 10,
    },
    sleep: { effect: $effect`Quiet Night's Sleep`, duration: 10 },
  },
  "sous vide laboratory": {
    food: $items`tiny burrito, black forest ham, fishy fish, ham steak, Knoll stir-fry, spooky stir-fry`,
    "mental stimulation": {
      effect: $effect`Counter Intelligence`,
      duration: 10,
    },
  },
  "thrift store oil painting": {
    "mental stimulation": { effect: $effect`Well Stimulated`, duration: 10 },
  },
  "ultimate retro game console": {
    "dumb entertainment": $item`phosphor traces`,
  },
  "UltraDance karaoke machine": {
    "dumb entertainment": {
      effect: $effect`Your Days Are Numbed`,
      duration: 10,
    },
    exercise: { effect: $effect`Vicarious Sweat`, duration: 10 },
  },
  whiskeybed: {
    booze: $item`random booze from the drop pool`,
    sleep: { effect: $effect`Moist Night's Sleep`, duration: 10 },
  },
} as const satisfies Record<FurniturePiece, FurnitureStat>);

/**
 * @returns How many more times you can rearrange today
 */
export function rearrangesRemaining(): number {
  return clamp(3 - get("_leprecondoRearrangements"), 0, 3);
}
/**
 * @returns the Furniture elements you've discovered
 */
export function furnitureDiscovered(): FurniturePiece[] {
  return get("leprecondoDiscovered")
    .split(",")
    .map((id) => FURNITURE_PIECES[Number(id)]) as FurniturePiece[];
}

/**
 * @returns the Furniture elements you've installed
 */
export function installedFurniture(): FurniturePiece[] {
  return get("leprecondoInstalled")
    .split(",")
    .map((id) => FURNITURE_PIECES[Number(id)]) as FurniturePiece[];
}

/**
 * @param furniture A spread array of furniture pieces to install, starting from the top left and ending in the bottom right
 * @returns Whether or not you successfully installed the desired furniture
 */
export function setFurniture(...furniture: Tuple<FurniturePiece, 4>): boolean {
  if (rearrangesRemaining() < 0) return false;

  const availableFurniture = ["empty", ...furnitureDiscovered()];
  if (furniture.some((piece) => !availableFurniture.includes(piece)))
    return false;

  directlyUse($item`Leprecondo`);
  runChoice(
    1,
    furniture
      .map((piece, index) => `r${index}=${FURNITURE_PIECES.indexOf(piece)}`)
      .join("&"),
  );
  return arrayEquals(installedFurniture(), furniture);
}

/**
 * @returns The cumulative bonuses of all currently-installed furniture.
 */
export function furnitureBonuses(): FurnitureStat {
  return installedFurniture().reduceRight(
    (acc, piece) => ({
      ...Furniture[piece],
      ...acc,
    }),
    {} as FurnitureStat,
  );
}
