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
 * @returns How many more times you can rearrange today
 */
export function rearrangeUses(): number {
  return get("_leprecondoRearrangements");
}

function parseFurniture(str: string): Furniture[] {
  return str
    .split(",")
    .map(Number)
    .map((furnitureNumber) => itemsMap[furnitureNumber]);
}

/**
 * @returns the Furniture elements you've discovered
 */
export function furnitureDiscovered(): Furniture[] {
  const discoveredItems = get("leprecondoDiscovered");
  return parseFurniture(discoveredItems); // No need for get() again
}

/**
 * @returns the Furniture elements you've installed
 */
export function installedFurniture(): Furniture[] {
  return parseFurniture(get("leprecondoInstalled"));
}

/**
 * @param f1 is the furniture you want to install in the top-left of the house
 * @param f2 is the furniture you want to install in the top-right of the house
 * @param f3 is the furniture you want to install in the bottom-left of the house
 * @param f4 is the furniture you want to install in the bottom-right of the house
 * @returns Whether or not you successfully installed the desired furniture
 */
export function setFurniture(
  f1?: Furniture,
  f2?: Furniture,
  f3?: Furniture,
  f4?: Furniture,
): boolean {
  if (rearrangeUses() >= 3) return false;

  const furnitureItems = [f1, f2, f3, f4].filter(Boolean); // Filter out any undefined values
  const discoveredFurniture = furnitureDiscovered(); // Get discovered furniture

  // Check if all provided furniture are in discovered list
  if (
    !furnitureItems.every((furniture) =>
      discoveredFurniture.some((d) => d.number === furniture?.number),
    )
  ) {
    return false;
  }

  const furnitureNumbers = [f1, f2, f3, f4].map((f) => f?.number ?? 0); // Default to 0 if undefined
  directlyUse($item`Leprecondo`);
  visitUrl(
    `choice.php?pwd&option=1&whichchoice=1556&r0=${furnitureNumbers[0]}&r1=${furnitureNumbers[1]}&r2=${furnitureNumbers[2]}&r3=${furnitureNumbers[3]}`,
  );

  return true;
}

/**
 * @returns the effects (or items) of furniture currently installed
 */
export function furnitureBonuses(): Record<
  Need,
  Item | [Effect, number] | null
> {
  const installedItems = installedFurniture(); // Get installed furniture using the new function
  const needBonuses: Record<Need, Item | [Effect, number] | null> = {
    exercise: null,
    "mental stimulation": null,
    "dumb entertainment": null,
    food: null,
    booze: null,
    sleep: null,
  };

  installedItems.forEach((furniture) => {
    Object.entries(furniture.need).forEach(([need, benefit]) => {
      if (!needBonuses[need as Need]) {
        needBonuses[need as Need] = benefit;
      } else {
        needBonuses[need as Need] = benefit;
      }
    });
  });

  return needBonuses;
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
