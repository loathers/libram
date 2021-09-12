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
import { $item, $items } from "../template-string";
import { sum } from "../utils";

// TODO: Include other consumption modifiers.
function expectedAdventures(item: Item, forkMug = false): number {
  if (item.adventures === "") return 0;
  const [min, recordedMax] = item.adventures
    .split(/[-–—]/)
    .map((s) => parseInt(s));
  const max = recordedMax ?? min;
  const interpolated = [...new Array(max - min + 1).keys()].map((n) => n + min);
  return (
    sum(interpolated, (n) => Math.floor(n * (forkMug ? 1.3 : 1))) /
    interpolated.length
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
  maximum?: number;
  additionalValue?: number;
  size: number;

  static seasoning = new MenuItem($item`Special Seasoning`);
  static mayoflex = new MenuItem($item`Mayoflex`);
  static fork = new MenuItem($item`Ol' Scratch's salad fork`);
  static mug = new MenuItem($item`Frosty's frosty mug`);

  constructor(
    item: Item,
    maximum?: number,
    additionalValue?: number,
    size?: number
  ) {
    this.item = item;
    this.maximum = maximum;
    this.additionalValue = additionalValue;

    const typ = itemType(this.item);
    this.size =
      size ?? typ === "food"
        ? this.item.fullness
        : typ === "booze"
        ? this.item.inebriety
        : typ === "spleen item"
        ? this.item.spleen
        : 0;
  }

  toString(): string {
    return this.item.toString();
  }

  price(): number {
    return npcPrice(this.item) > 0 ? npcPrice(this.item) : mallPrice(this.item);
  }
}

type Organ = "food" | "booze" | "spleen item";
type OrganSize = [Organ, number];

class DietPlanner {
  mpa: number;
  menu: MenuItem[];
  checkFork: boolean;
  checkMug: boolean;
  useSeasoning: boolean;
  useMayoflex: boolean;
  spleenValue = 0;

  constructor(mpa: number, menu: MenuItem[]) {
    this.mpa = mpa;
    this.checkFork = menu.some((item) => item.item === MenuItem.fork.item);
    this.checkMug = menu.some((item) => item.item === MenuItem.mug.item);
    this.useSeasoning = menu.some(
      (item) => item.item === $item`Special Seasoning`
    );
    this.useMayoflex =
      getWorkshed() === $item`portable Mayo Clinic` &&
      menu.some((item) => item.item === $item`Mayoflex`);
    this.menu = menu.filter((item) =>
      ["food", "booze", "spleen item"].includes(itemType(item.item))
    );

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
    let additionalAdventures = 0;
    const helpers = [];
    if (
      this.useMayoflex &&
      itemType(menuItem.item) === "food" &&
      this.mpa > npcPrice($item`Mayoflex`)
    ) {
      helpers.push(MenuItem.mayoflex);
      additionalAdventures++;
    }
    if (
      this.useSeasoning &&
      itemType(menuItem.item) === "food" &&
      this.mpa > mallPrice($item`Special Seasoning`)
    ) {
      helpers.push(MenuItem.seasoning);
      additionalAdventures++;
    }

    const forkMug =
      itemType(menuItem.item) === "food"
        ? MenuItem.fork
        : itemType(menuItem.item) === "booze"
        ? MenuItem.mug
        : null;
    const forkMugPrice = forkMug ? forkMug.price() : Infinity;

    const valueRaw =
      (expectedAdventures(menuItem.item, false) + additionalAdventures) *
        this.mpa -
      mallPrice(menuItem.item) +
      (menuItem.additionalValue ?? 0);
    const valueForkMug =
      (expectedAdventures(menuItem.item, true) + additionalAdventures) *
        this.mpa -
      mallPrice(menuItem.item) -
      forkMugPrice +
      (menuItem.additionalValue ?? 0);

    const valueSpleen = $items`jar of fermented pickle juice, extra-greasy slider`.includes(
      menuItem.item
    )
      ? 5 * this.spleenValue
      : 0;

    return forkMug && valueForkMug > valueRaw
      ? [
          [...helpers, forkMug as MenuItem, menuItem],
          valueForkMug + valueSpleen,
        ]
      : [[...helpers, menuItem], valueRaw + valueSpleen];
  }

  planOrgan(organ: Organ, capacity: number): [number, [Item[], number][]] {
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
    const itemList = menuItemList.map((menuItems) =>
      menuItems.map((menuItem) => menuItem.item)
    );
    // print(
    //   `Items: ${itemList.length} ${([] as Item[])
    //     .concat(...itemList)
    //     .map((item) => item.name)
    //     .join(", ")}`
    // );
    return [
      value,
      aggregate(itemList, (x: Item[], y: Item[]) =>
        x.every((elem, index) => elem === y[index])
      ),
    ];
  }

  planOrgans(organCapacities: OrganSize[]): [number, [Item[], number][]] {
    const valuePlans = organCapacities.map(([organ, capacity]) =>
      this.planOrgan(organ, capacity)
    );
    return [
      sum(valuePlans, ([value]) => value),
      ([] as [Item[], number][]).concat(...valuePlans.map(([, plan]) => plan)),
    ];
  }

  planOrgansWithTrials(
    organCapacities: OrganSize[],
    trialItems: [MenuItem, OrganSize[]][]
  ): [number, [Item[], number][]] {
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
      : [
          valueWith,
          [...planWith, [helpers.map((menuItem) => menuItem.item), 1]],
        ];
  }
}

// [item, fullness, inebriety]
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
): [Item[], number][] {
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
            ? 11 + // FIXME
              fullnessLimit() -
              myFullness() +
              (have($item`distention pill`) ? 1 : 0)
            : organ === "booze"
            ? 17 + // FIXME
              inebrietyLimit() +
              (have($item`synthetic dog hair pill`) ? 1 : 0)
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

  const [, planFoodBooze] = dietPlanner.planOrgansWithTrials(
    resolvedOrganCapacities.filter(([organ]) =>
      ["food", "booze"].includes(organ)
    ),
    includedInteractingItems
  );

  const additionalSpleen = sum(planFoodBooze, ([items, number]) =>
    items.includes($item`jar of fermented pickle juice`) ||
    items.includes($item`extra-greasy slider`)
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
