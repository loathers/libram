import {
  fullnessLimit,
  getWorkshed,
  inebrietyLimit,
  itemType,
  mallPrice,
  mallPrices,
  myFullness,
  myInebriety,
  myLevel,
  myPrimestat,
  mySpleenUse,
  npcPrice,
  spleenLimit,
} from "kolmafia";

import { knapsack } from "./knapsack";
import { have } from "../lib";
import { get } from "../property";
import { $effect, $item, $items, $skill, $stat } from "../template-string";
import { sum } from "../utils";

type ConsumptionModifiers = {
  forkMug: boolean;
  seasoning: boolean;
  mayoflex: boolean;
  refinedPalate: boolean;
  pinkyRing: boolean;
  tuxedoShirt: boolean;
};

// TODO: Include other consumption modifiers - Salty Mouth?
// TODO: Include Gar-ish etc.
function expectedAdventures(
  item: Item,
  modifiers: ConsumptionModifiers
): number {
  if (item.adventures === "") return 0;
  const [min, recordedMax] = item.adventures
    .split(/[-–—]/)
    .map((s) => parseInt(s));
  const max = recordedMax ?? min;
  const interpolated = [...new Array(max - min + 1).keys()].map((n) => n + min);
  const forkMugMultiplier =
    (itemType(item) === "food" && item.notes?.includes("SALAD")) ||
    (itemType(item) === "booze" && item.notes?.includes("BEER"))
      ? 1.5
      : 1.3;
  const refinedPalate = modifiers.refinedPalate && item.notes?.includes("WINE");
  const pinkyRing = modifiers.pinkyRing && item.notes?.includes("WINE");
  return (
    sum(interpolated, (baseAdventures) => {
      let adventures = baseAdventures;
      if (modifiers.forkMug) {
        adventures = Math.floor(adventures * forkMugMultiplier);
      }
      if (refinedPalate) adventures = Math.floor(adventures * 1.25);
      if (pinkyRing) adventures = Math.round(adventures * 1.125);
      if (item.notes?.includes("MARTINI") && modifiers.tuxedoShirt) {
        adventures += 2;
      }
      if (have($skill`Saucemaven`) && item.notes?.includes("SAUCY")) {
        adventures += myPrimestat() === $stat`Mysticality` ? 5 : 3;
      }
      if (itemType(item) === "food" && modifiers.seasoning) adventures++;
      if (itemType(item) === "food" && modifiers.mayoflex) adventures++;
      return adventures;
    }) / interpolated.length
  );
}

type MenuItemOptions = {
  organ?: Organ;
  size?: number;
  maximum?: number | "auto";
  additionalValue?: number;
  wishEffect?: Effect;
};

export class MenuItem {
  item: Item;
  organ?: Organ;
  size: number;
  maximum?: number;
  additionalValue?: number;
  wishEffect?: Effect;

  static defaultOptions = new Map([
    [$item`Mr. Burnsger`, { maximum: "auto" }],
    [
      $item`distention pill`,
      {
        organ: "food",
        maximum: "auto",
        size: -1,
      },
    ],
    [
      $item`synthetic dog hair pill`,
      { organ: "booze", maximum: "auto", size: -1 },
    ],
    [$item`cuppa Voraci tea`, { organ: "food", maximum: "auto", size: -1 }],
    [$item`cuppa Sobrie tea`, { organ: "booze", maximum: "auto", size: -1 }],
    [
      $item`mojo filter`,
      {
        organ: "spleen item",
        maximum: 3 - get("currentMojoFilters"),
        size: -1,
      },
    ],
    [$item`spice melange`, { maximum: "auto" }],
    [$item`Ultra Mega Sour Ball`, { maximum: "auto" }],
  ] as [Item, MenuItemOptions][]);

  constructor(item: Item, options: MenuItemOptions = {}) {
    const { size, organ, maximum, additionalValue, wishEffect } = {
      ...options,
      ...(MenuItem.defaultOptions.get(item) ?? {}),
    };
    this.item = item;
    this.maximum = maximum === "auto" ? item.dailyusesleft : maximum;
    this.additionalValue = additionalValue;
    this.wishEffect = wishEffect;

    const typ = itemType(this.item);
    this.organ = organ ?? (isOrgan(typ) ? typ : undefined);
    this.size =
      size ??
      (this.organ === "food"
        ? this.item.fullness
        : this.organ === "booze"
        ? this.item.inebriety
        : this.organ === "spleen item"
        ? this.item.spleen
        : 0);
  }

  equals(other: MenuItem): boolean {
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
  pinkyRing: boolean;
  tuxedoShirt: boolean;
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
    this.pinkyRing = have($item`mafia pinky ring`);
    this.tuxedoShirt = have($item`tuxedo shirt`);
    this.menu = menu.filter((item) => item.organ);

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
    return this.consumptionHelpersAndValue(menuItem, {})[1];
  }

  consumptionHelpersAndValue(
    menuItem: MenuItem,
    overrideModifiers: Partial<ConsumptionModifiers>
  ): [MenuItem[], number] {
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
      refinedPalate: false,
      pinkyRing: this.pinkyRing,
      tuxedoShirt: this.tuxedoShirt,
      ...overrideModifiers,
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

  planOrgan(
    organ: Organ,
    capacity: number,
    overrideModifiers: Partial<ConsumptionModifiers> = {}
  ): [number, [MenuItem[], number][]] {
    const submenu = this.menu.filter(
      (menuItem) =>
        menuItem.organ === organ && myLevel() >= menuItem.item.levelreq
    );
    const knapsackValues = submenu.map(
      (menuItem) =>
        [
          ...this.consumptionHelpersAndValue(menuItem, overrideModifiers),
          menuItem.size,
          menuItem.maximum,
        ] as [MenuItem[], number, number, number?]
    );
    return knapsack(knapsackValues, capacity);
  }

  planOrgans(
    organCapacities: OrganSize[],
    overrideModifiers: Partial<ConsumptionModifiers> = {}
  ): [number, [MenuItem[], number][]] {
    const valuePlans = organCapacities.map(([organ, capacity]) =>
      this.planOrgan(organ, capacity, overrideModifiers)
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
    trialItems: [MenuItem, OrganSize[]][],
    overrideModifiers: Partial<ConsumptionModifiers> = {}
  ): [number, [MenuItem[], number][]] {
    if (trialItems.length === 0) {
      return this.planOrgans(organCapacities, overrideModifiers);
    }

    const organCapacitiesWithMap = new Map(organCapacities);
    const [trialItem, organSizes] = trialItems[0];
    for (const [organ, size] of organSizes) {
      const current = organCapacitiesWithMap.get(organ);
      if (current !== undefined) {
        organCapacitiesWithMap.set(organ, current - size);
      }
    }
    const organCapacitiesWith = [...organCapacitiesWithMap];

    const isRefinedPalate =
      (trialItem.item === $item`pocket wish` &&
        trialItem.wishEffect === $effect`Refined Palate`) ||
      trialItem.item === $item`toasted brie`;

    const [valueWithout, planWithout] = this.planOrgansWithTrials(
      organCapacities,
      trialItems.slice(1),
      overrideModifiers
    );
    const [valueWith, planWith] = this.planOrgansWithTrials(
      organCapacitiesWith,
      trialItems.slice(1),
      isRefinedPalate
        ? { ...overrideModifiers, refinedPalate: true }
        : overrideModifiers
    );

    const [helpersAndItem, value] = this.consumptionHelpersAndValue(
      trialItem,
      {}
    );

    return valueWithout > valueWith + value
      ? [valueWithout, planWithout]
      : [valueWith, [...planWith, [helpersAndItem, 1]]];
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
  [$item`toasted brie`, [["food", 2]]],
];

/**
 * Plan out an optimal diet using a knapsack algorithm.
 * @param mpa Meat per adventure value.
 * @param menu Array of MenuItems to consider for diet purposes.
 * @param organCapacities Optional override of each organ's capacity.
 * @returns Array of [menu item and helpers, count].
 */
export function planDiet(
  mpa: number,
  menu: MenuItem[],
  organCapacities: [Organ, number | null][] = [
    ["food", null],
    ["booze", null],
    ["spleen item", null],
  ]
): [MenuItem[], number][] {
  // FIXME: Figure out a better way to handle overfull organs (e.g. coming out of Ed)
  const resolvedOrganCapacities = organCapacities.map(
    ([organ, size]) =>
      [
        organ,
        size ??
          (organ === "food"
            ? fullnessLimit() - myFullness()
            : organ === "booze"
            ? inebrietyLimit() - myInebriety()
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
    .filter(
      ([menuItem]) =>
        menuItem && (menuItem.maximum === undefined || menuItem.maximum > 0)
    ) as [MenuItem, OrganSize[]][];

  // Refined Palate must also be treated as an interacting item, as it's a one-time cost.
  const palateWish = menu.find(
    (menuItem) =>
      menuItem.item === $item`pocket wish` &&
      menuItem.wishEffect === $effect`Refined Palate`
  );
  if (palateWish) {
    includedInteractingItems.push([palateWish, []]);
  }

  // Filter out interacting items from natural consideration.
  const dietPlanner = new DietPlanner(
    mpa,
    menu.filter(
      (menuItem) =>
        !includedInteractingItems.some(
          ([interacting]) => interacting === menuItem
        )
    )
  );

  const [, planFoodBooze] = dietPlanner.planOrgansWithTrials(
    resolvedOrganCapacities.filter(
      ([organ, capacity]) => ["food", "booze"].includes(organ) && capacity >= 0
    ),
    includedInteractingItems
  );

  const spleenCapacity = resolvedOrganCapacities.find(
    ([organ]) => organ === "spleen item"
  );
  if (spleenCapacity) {
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
    const [, availableSpleen] = spleenCapacity;
    const [, planSpleen] = dietPlanner.planOrgan(
      "spleen item",
      availableSpleen + additionalSpleen
    );

    return [...planFoodBooze, ...planSpleen];
  } else {
    return planFoodBooze;
  }
}
