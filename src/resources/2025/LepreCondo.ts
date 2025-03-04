import { Effect, Item, visitUrl } from "kolmafia";
import { directlyUse, have as have_ } from "../../lib.js";
import { $effect, $item, $items } from "../../template-string.js";
import { get } from "../../index.js";

/**
 * @returns Whether you `have` the Leprecondo
 */
export function have(): boolean {
  return have_($item`Leprecondo`);
}

/**
 * @returns Current furniture setup, as a string
 */
export function currentFurntiture(): string {
  return installedItems.map((item) => item.name).join(", ");
}

const rearrangeUses = get("_leprecondoRearrangements");

const discovered = get("leprecondoDiscovered");

const installed = get("leprecondoInstalled");

const installedNumbers = installed
  .split(",")
  .map((num) => parseInt(num.trim(), 10));

const installedItems = installedNumbers.map((id) => itemsMap[id]);

/**
 * @returns Sets current furniture to desired furniture state
 */
export function setFurniture(
  f1?: Furniture,
  f2?: Furniture,
  f3?: Furniture,
  f4?: Furniture,
): boolean {
  // Check if rearrangements are too frequent
  if (rearrangeUses >= 3) return false;

  // Check if any of f1, f2, f3, or f4 are not discovered
  const furnitureItems = [f1, f2, f3, f4].filter(Boolean); // Only include non-undefined furniture
  if (
    !furnitureItems.every((furniture) =>
      discovered.includes(furniture?.number ?? 0),
    )
  )
    return false;

  // Use the first piece of furniture as furn1, default to 0 if not provided
  const furn1 = f1 ? f1.number : 0;
  const furn2 = f2 ? f2.number : 0;
  const furn3 = f3 ? f3.number : 0;
  const furn4 = f4 ? f4.number : 0;

  // Use the Leprecondo item and visit the URL with the appropriate query parameters
  directlyUse($item`Leprecondo`);
  visitUrl(
    `choice.php?pwd&option=1&whichchoice=1556&r0=${furn1}&r1=${furn2}&r2=${furn3}&r3=${furn4}`,
  );

  return true;
}

type Need =
  | "exercise"
  | "mental stimulation"
  | "dumb entertainment"
  | "food"
  | "booze"
  | "sleep";

const itemsMap: Record<
  number,
  {
    name: string;
    need: Partial<Record<Need, Item | [Effect, number] | Item[]>>;
  }
> = {
  1: {
    name: "buckets of concrete",
    need: {
      exercise: [$effect`Gym Bros`, 10],
    },
  },
  2: {
    name: "thrift store oil painting",
    need: {
      "mental stimulation": [$effect`Well Stimulated`, 10],
    },
  },
  3: {
    name: "boxes of old comic books",
    need: {
      "dumb entertainment": [$effect`Wasting Time`, 10],
    },
  },
  4: {
    name: "second-hand hot plate",
    need: {
      food: $items`bean burrito, chorizo taco, plain pizza, spicy mushroom quesadilla, tofu casserole, Trollhouse cookies`,
    },
  },
  5: {
    name: "beer cooler",
    need: {
      booze: $items`beer bomb, bloody beer, ice-cold fotie, ice-cold Sir Schlitz, ice-cold Willer, overpriced "imported" beer, plain old beer`,
    },
  },
  6: {
    name: "free mattress",
    need: {
      sleep: [$effect`Good Night's Sleep`, 10],
    },
  },
  7: {
    name: "gigantic chess set",
    need: {
      exercise: [$effect`Work Out Smarter, Not Harder`, 10],
      "mental stimulation": [$effect`Well Stimulated`, 10],
    },
  },
  8: {
    name: "UltraDance karaoke machine",
    need: {
      exercise: [$effect`Vicarious Sweat`, 10],
      "dumb entertainment": [$effect`Your Days Are Numbed`, 10],
    },
  },
  9: {
    name: "cupcake treadmill",
    need: {
      exercise: [$effect`Your Days Are Numbed`, 10],
      food: $item`standard-issue cupcake`,
    },
  },
  10: {
    name: "beer pong table",
    need: {
      exercise: $item`table tennis ball`,
      booze: $items`beer bomb, bloody beer, ice-cold fotie, ice-cold Sir Schlitz, ice-cold Willer, overpriced "imported" beer, plain old beer`,
    },
  },
  11: {
    name: "padded weight bench",
    need: {
      exercise: [$effect`Gym Bros`, 10],
      sleep: [$effect`Tired Muscles`, 10],
    },
  },
  12: {
    name: "internet-connected laptop",
    need: {
      "mental stimulation": $item`crafting plans`,
      "dumb entertainment": [$effect`Wasting Time`, 10],
    },
  },
  13: {
    name: "sous vide laboratory",
    need: {
      "mental stimulation": [$effect`Counter Intelligence`, 10],
      food: $items`tiny burrito, black forest ham, fishy fish, ham steak, Knoll stir-fry, spooky stir-fry`,
    },
  },
  14: {
    name: "programmable blender",
    need: {
      "mental stimulation": [$effect`Counter Intelligence`, 10],
      booze: $items`eggnog, extra-spicy bloody mary, grog, white lightning`,
    },
  },
  15: {
    name: "sensory deprivation tank",
    need: {
      "mental stimulation": [$effect`Alone with Your Thoughts`, 10],
      sleep: [$effect`Quiet Night's Sleep`, 10],
    },
  },
  16: {
    name: "fruit-smashing robot",
    need: {
      "dumb entertainment": [$effect`You Might Have Gotten Wet`, 10],
      food: $items`cherry, cranberries, grapefruit, grapes, kiwi, kumquat, lemon, lime, orange, papaya, raspberry, strawberry, tangerine`,
    },
  },
  17: {
    name: "ManCave™ sports bar set",
    need: {
      "dumb entertainment": $item`bar dart`,
      booze: $items`melted Jell-o shot, shot of blackberry schnapps, shot of nepenthe schnapps, shot of peach schnapps, shot of pear schnapps, shot of rotgut`,
    },
  },
  18: {
    name: "couch and flatscreen",
    need: {
      "dumb entertainment": [$effect`Your Days Are Numbed`, 10],
      sleep: [$effect`Good Night's Sleep`, 10],
    },
  },
  19: {
    name: "kegerator",
    need: {
      food: $items`bean burrito , plain pizza, spicy mushroom quesadilla, tofu casserole, Trollhouse cookies`,
      booze: $item`pint of Leprechaun Stout`,
    },
  },
  20: {
    name: "fine upholstered dining set",
    need: {
      food: $item`random food from the drop pool`,
      sleep: [$effect`Sur La Table`, 10],
    },
  },
  21: {
    name: "whiskeybed",
    need: {
      booze: $item`random booze from the drop pool`,
      sleep: [$effect`Moist Night's Sleep`, 10],
    },
  },
  22: {
    name: "high-end home workout system",
    need: {
      exercise: $item`scoop of pre-workout powder`,
    },
  },
  23: {
    name: "complete classics library",
    need: {
      "mental stimulation": $item`leprechaun antidepressant pill`,
    },
  },
  24: {
    name: "ultimate retro game console",
    need: {
      "dumb entertainment": $item`phosphor traces`,
    },
  },
  25: {
    name: "Omnipot",
    need: {
      food: $item`Heck ramen, incredible mini-pizza, small beer brat, tiny burrito, tiny peach pie, savoy truffle, white chocolate chip brownies`,
    },
  },
  26: {
    name: "fully-stocked wet bar",
    need: {
      booze: $item`Divine Sidecar, prussian cathouse sidecar, tangarita sidecar`,
    },
  },
  27: {
    name: "four-poster bed",
    need: {
      sleep: [$effect`Spacious Night's Sleep`, 10],
    },
  },
};

export type Furniture = {
  number: keyof typeof itemsMap;
  name: string;
  need: Partial<Record<Need, Item | [Effect, number]>>;
};

// Step 2: You can now reference this type in your code
const furnitureArray: Furniture[] = Object.values(itemsMap).map(
  (item, number) => ({
    number: number as keyof typeof itemsMap,
    name: item.name,
    need: item.need,
  }),
);
