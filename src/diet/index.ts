import {
  fullnessLimit,
  getWorkshed,
  inebrietyLimit,
  itemType,
  mallPrice,
  mallPrices,
  myFullness,
  mySpleenUse,
  npcPrice,
  print,
  spleenLimit,
} from "kolmafia";

import { knapsack } from "./knapsack";
import { have } from "../lib";
import { $effect, $item, $items } from "../template-string";
import { sum } from "../utils";

// TODO: Include other consumption modifiers - Salty Mouth?
function expectedAdventures(
  item: Item,
  modifiers: {
    forkMug: boolean;
    seasoning: boolean;
    mayoflex: boolean;
    refinedPalate: boolean;
    pinkyRing: boolean;
  }
): number {
  if (item.adventures === "") return 0;
  const [min, recordedMax] = item.adventures
    .split(/[-–—]/)
    .map((s) => parseInt(s));
  const max = recordedMax ?? min;
  const interpolated = [...new Array(max - min + 1).keys()].map((n) => n + min);
  const forkMugMultiplier =
    (itemType(item) === "food" && item.notes.includes("SALAD")) ||
    (itemType(item) === "booze" && item.notes.includes("BEER"))
      ? 1.5
      : 1.3;
  const refinedPalate = modifiers.refinedPalate && item.notes.includes("WINE");
  const pinkyRing = modifiers.pinkyRing && item.notes.includes("WINE");
  return (
    sum(interpolated, (baseAdventures) => {
      let adventures = baseAdventures;
      if (modifiers.forkMug) {
        adventures = Math.floor(adventures * forkMugMultiplier);
      }
      if (refinedPalate) adventures = Math.floor(adventures * 1.25);
      if (pinkyRing) adventures = Math.round(adventures * 1.125);
      if (itemType(item) === "food" && modifiers.seasoning) adventures++;
      if (itemType(item) === "food" && modifiers.mayoflex) adventures++;
      return adventures;
    }) / interpolated.length
  );
}

// Assuming list is already sorted, count adjacent items.
// Effectively run-length encoding.
function aggregate<T>(
  list: T[],
  isEqual: (x: T, y: T) => boolean
): [T, number][] {
  const aggregatedList = [];
  for (const item of list) {
    if (aggregatedList.length === 0) {
      aggregatedList.push([item, 1] as [T, number]);
    } else {
      const last = aggregatedList[aggregatedList.length - 1];
      const [lastItem] = last;
      if (isEqual(item, lastItem)) {
        last[1]++;
      } else {
        aggregatedList.push([item, 1] as [T, number]);
      }
    }
  }
  return aggregatedList;
}

export class MenuItem {
  item: Item;
  size: number;
  organ?: Organ;
  maximum?: number;
  additionalValue?: number;
  wishEffect?: Effect;

  static defaultProperties = new Map([
    [$item`Mr. Burnsger`, { maximum: 1 }],
    [$item`distention pill`, { organ: "food", maximum: 1, size: -1 }],
    [$item`synthetic dog hair pill`, { organ: "booze", maximum: 1, size: -1 }],
    [$item`cuppa Voraci tea`, { organ: "food", maximum: 1, size: -1 }],
    [$item`cuppa Sobrie tea`, { organ: "booze", maximum: 1, size: -1 }],
    [$item`mojo filter`, { organ: "spleen item", maximum: 3, size: -1 }],
  ] as [
    Item,
    {
      size?: number;
      organ?: Organ;
      maximum?: number;
      additionalValue?: number;
      wishEffect?: Effect;
    }
  ][]);

  constructor(
    item: Item,
    options?: {
      size?: number;
      organ?: Organ;
      maximum?: number;
      additionalValue?: number;
      wishEffect?: Effect;
    }
  ) {
    const { size, organ, maximum, additionalValue, wishEffect } = options ?? {};
    const defaultProperties = MenuItem.defaultProperties.get(item);
    this.item = item;
    this.maximum = maximum ?? defaultProperties?.maximum;
    this.additionalValue =
      additionalValue ?? defaultProperties?.additionalValue;
    this.wishEffect = wishEffect ?? defaultProperties?.wishEffect;

    const typ = itemType(this.item);
    this.organ = organ ?? (isOrgan(typ) ? typ : undefined);
    this.size =
      size ?? defaultProperties?.size ?? this.organ === "food"
        ? this.item.fullness
        : this.organ === "booze"
        ? this.item.inebriety
        : this.organ === "spleen item"
        ? this.item.spleen
        : 0;
  }

  equals(other: MenuItem) {
    return this.item === other.item && this.wishEffect === other.wishEffect;
  }

  toString(): string {
    return this.item.toString();
  }

  price(): number {
    return npcPrice(this.item) > 0 ? npcPrice(this.item) : mallPrice(this.item);
  }
}

const organs = ["food", "booze", "spleen item"] as const;
type Organ = typeof organs[number];
type OrganSize = [Organ, number];

function isOrgan(x: string): x is Organ {
  return (organs as readonly string[]).includes(x);
}

class DietPlanner {
  mpa: number;
  menu: MenuItem[];
  fork?: MenuItem;
  mug?: MenuItem;
  seasoning?: MenuItem;
  mayoflex?: MenuItem;
  refinedPalate?: MenuItem;
  pinkyRing: boolean;
  spleenValue = 0;

  constructor(mpa: number, menu: MenuItem[]) {
    this.mpa = mpa;
    this.fork = menu.find(
      (item) => item.item === $item`Ol' Scratch's salad fork`
    );
    this.mug = menu.find((item) => item.item === $item`Frosty's frosty mug`);
    this.seasoning = menu.find(
      (item) => item.item === $item`Special Seasoning`
    );
    this.mayoflex =
      getWorkshed() === $item`portable Mayo Clinic`
        ? menu.find((item) => item.item === $item`Mayoflex`)
        : undefined;
    this.refinedPalate = menu.find(
      (item) =>
        item.item === $item`pocket wish` &&
        item.wishEffect === $effect`Refined Palate`
    );
    this.pinkyRing = have($item`mafia pinky ring`);
    this.menu = menu.filter((item) => isOrgan(itemType(item.item)));

    if (menu.length > 100) {
      mallPrices("food");
      mallPrices("booze");
    }

    const spleenItems = menu.filter(
      (item) => itemType(item.item) === "spleen item"
    );
    spleenItems.sort(
      (x, y) =>
        -(
          this.consumptionValue(x) / x.item.spleen -
          this.consumptionValue(y) / y.item.spleen
        )
    );
    if (spleenItems.length > 0) {
      this.spleenValue =
        this.consumptionValue(spleenItems[0]) / spleenItems[0].item.spleen;
    }
  }

  consumptionValue(menuItem: MenuItem): number {
    return this.consumptionHelpersAndValue(menuItem)[1];
  }

  consumptionHelpersAndValue(menuItem: MenuItem): [MenuItem[], number] {
    const helpers = [];
    if (
      this.seasoning &&
      itemType(menuItem.item) === "food" &&
      this.mpa > mallPrice($item`Special Seasoning`)
    ) {
      helpers.push(this.seasoning);
    }
    if (
      this.mayoflex &&
      itemType(menuItem.item) === "food" &&
      this.mpa > npcPrice($item`Mayoflex`)
    ) {
      helpers.push(this.mayoflex);
    }

    const defaultModifiers = {
      forkMug: false,
      seasoning: this.seasoning ? helpers.includes(this.seasoning) : false,
      mayoflex: this.mayoflex ? helpers.includes(this.mayoflex) : false,
      refinedPalate: !!this.refinedPalate,
      pinkyRing: !!this.pinkyRing,
    };

    const forkMug =
      itemType(menuItem.item) === "food"
        ? this.fork
        : itemType(menuItem.item) === "booze"
        ? this.mug
        : null;
    const forkMugPrice = forkMug ? forkMug.price() : Infinity;

    const baseCost = menuItem.price() + sum(helpers, (item) => item.price());
    const valueRaw =
      expectedAdventures(menuItem.item, defaultModifiers) * this.mpa -
      baseCost +
      (menuItem.additionalValue ?? 0);
    const valueForkMug =
      expectedAdventures(menuItem.item, {
        ...defaultModifiers,
        forkMug: true,
      }) *
        this.mpa -
      baseCost -
      forkMugPrice +
      (menuItem.additionalValue ?? 0);

    const valueSpleen = $items`jar of fermented pickle juice, extra-greasy slider`.includes(
      menuItem.item
    )
      ? 5 * this.spleenValue
      : 0;

    return forkMug && valueForkMug > valueRaw
      ? [[...helpers, forkMug, menuItem], valueForkMug + valueSpleen]
      : [[...helpers, menuItem], valueRaw + valueSpleen];
  }

  planOrgan(organ: Organ, capacity: number): [number, [MenuItem[], number][]] {
    // print(`Plan ${organ} < ${capacity}`);
    const submenu = this.menu.filter((item) => itemType(item.item) === organ);
    const knapsackValues = submenu.map(
      (menuItem) =>
        [
          ...this.consumptionHelpersAndValue(menuItem),
          menuItem.size,
          menuItem.maximum,
        ] as [MenuItem[], number, number, number?]
    );
    const [value, menuItemList] = knapsack(knapsackValues, capacity);

    const valueWithRefinedPalate =
      value - (this.refinedPalate ? this.refinedPalate.price() : 0);
    if (this.refinedPalate) menuItemList.splice(0, 0, [this.refinedPalate]);

    // print(
    //   `Items: ${itemList.length} ${([] as Item[])
    //     .concat(...itemList)
    //     .map((item) => item.name)
    //     .join(", ")}`
    // );
    return [
      valueWithRefinedPalate,
      aggregate(menuItemList, (x: MenuItem[], y: MenuItem[]) =>
        x.every((elem, index) => elem.equals(y[index]))
      ),
    ];
  }

  planOrgans(organCapacities: OrganSize[]): [number, [MenuItem[], number][]] {
    const valuePlans = organCapacities.map(([organ, capacity]) =>
      this.planOrgan(organ, capacity)
    );
    return [
      sum(valuePlans, ([value]) => value),
      ([] as [MenuItem[], number][]).concat(
        ...valuePlans.map(([, plan]) => plan)
      ),
    ];
  }

  planOrgansWithTrials(
    organCapacities: OrganSize[],
    trialItems: [MenuItem, OrganSize[]][]
  ): [number, [MenuItem[], number][]] {
    if (trialItems.length === 0) {
      return this.planOrgans(organCapacities);
    }

    const organCapacitiesWithMap = new Map(organCapacities);
    const [trialItem, organSizes] = trialItems[0];
    // print(`TRYING ${trialItem.item.name}`);
    for (const [organ, size] of organSizes) {
      const current = organCapacitiesWithMap.get(organ);
      if (current !== undefined) {
        organCapacitiesWithMap.set(organ, current - size);
      }
    }
    const organCapacitiesWith = [...organCapacitiesWithMap];

    const [valueWithout, planWithout] = this.planOrgansWithTrials(
      organCapacities,
      trialItems.slice(1)
    );
    const [valueWith, planWith] = this.planOrgansWithTrials(
      organCapacitiesWith,
      trialItems.slice(1)
    );

    const [helpers, value] = this.consumptionHelpersAndValue(trialItem);

    print(
      `${new Array(5 - trialItems.length).join(">")} ${
        valueWithout > valueWith + value ? "WITHOUT" : "WITH"
      } ${trialItem.item} ${value.toFixed(0)}: ${valueWithout.toFixed(
        0
      )} vs. ${(valueWith + value).toFixed(0)}`
    );
    return valueWithout > valueWith + value
      ? [valueWithout, planWithout]
      : [valueWith, [...planWith, [helpers, 1]]];
  }
}

/**
 * Because the knapsack solver is one-dimensional only, any items that touch
 * multiple organs have to be treated specially. What we do is run the knapsack
 * solver multiple times, trying with + without each interacting item.
 */
const interactingItems: [Item, OrganSize[]][] = [
  [
    $item`spice melange`,
    [
      ["food", -3],
      ["booze", -3],
    ],
  ],
  [
    $item`Ultra Mega Sour Ball`,
    [
      ["food", -3],
      ["booze", -3],
    ],
  ],
  [
    $item`The Plumber's mushroom stew`,
    [
      ["food", 3],
      ["booze", -1],
    ],
  ],
  [
    $item`The Mad Liquor`,
    [
      ["food", -1],
      ["booze", 3],
    ],
  ],
  [
    $item`Doc Clock's thyme cocktail`,
    [
      ["food", -2],
      ["booze", 4],
    ],
  ],
  [
    $item`Mr. Burnsger`,
    [
      ["food", 4],
      ["booze", -2],
    ],
  ],
];

export function planDiet(
  mpa: number,
  menu: MenuItem[],
  organCapacities: [Organ, number | null][] = [
    ["food", null],
    ["booze", null],
    ["spleen item", null],
  ]
): [MenuItem[], number][] {
  const dietPlanner = new DietPlanner(mpa, menu);

  print("MENU:");
  for (const menuItem of menu) {
    const [helpers, value] = dietPlanner.consumptionHelpersAndValue(menuItem);
    print(`${menuItem.item.name}: ${helpers.join(", ")} ${value}`);
  }

  const resolvedOrganCapacities = organCapacities.map(
    ([organ, size]) =>
      [
        organ,
        size ??
          (organ === "food"
            ? fullnessLimit() -
              myFullness() +
              (have($item`distention pill`) ? 1 : 0)
            : organ === "booze"
            ? inebrietyLimit() + (have($item`synthetic dog hair pill`) ? 1 : 0)
            : organ === "spleen item"
            ? spleenLimit() - mySpleenUse()
            : 0),
      ] as [Organ, number]
  );

  const allItems = new Map(menu.map((menuItem) => [menuItem.item, menuItem]));
  const includedInteractingItems = interactingItems
    .map(
      ([item, sizes]) =>
        [allItems.get(item), sizes] as [MenuItem | undefined, OrganSize[]]
    )
    .filter(([menuItem]) => menuItem) as [MenuItem, OrganSize[]][];
  // print(
  //   `included interacting: ${includedInteractingItems
  //     .map(([menuItem]) => menuItem.item.name)
  //     .join(", ")}`
  // );

  // TODO: support toasted brie.
  // Refined Palate must also be treated as an interacting item, as it's a one-time cost.
  const palateWish = menu.find(
    (menuItem) =>
      menuItem.item === $item`pocket wish` &&
      menuItem.wishEffect === $effect`Refined Palate`
  );
  if (palateWish) {
    includedInteractingItems.push([palateWish, []]);
  }

  const [, planFoodBooze] = dietPlanner.planOrgansWithTrials(
    resolvedOrganCapacities.filter(([organ]) =>
      ["food", "booze"].includes(organ)
    ),
    includedInteractingItems
  );

  // Count sliders and pickle juice, figure out how much extra spleen we got.
  const additionalSpleen = sum(planFoodBooze, ([items, number]) =>
    items.some((menuItem) =>
      $items`jar of fermented pickle juice, extra-greasy slider`.includes(
        menuItem.item
      )
    )
      ? 5 * number
      : 0
  );
  const [, availableSpleen] = resolvedOrganCapacities.find(
    ([organ]) => organ === "spleen item"
  ) ?? ["spleen item", 0];

  const [, planSpleen] = dietPlanner.planOrgan(
    "spleen item",
    availableSpleen + additionalSpleen
  );

  return [...planFoodBooze, ...planSpleen];
}
