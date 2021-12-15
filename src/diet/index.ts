import {
  canEquip,
  fullnessLimit,
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
import { get as getModifier } from "../modifier";
import { get } from "../property";
import { $effect, $item, $items, $skill, $stat } from "../template-string";
import { sum } from "../utils";
import { Mayo, installed as mayoInstalled } from "../resources/2015/MayoClinic";

type ConsumptionModifiers = {
  forkMug: boolean;
  seasoning: boolean;
  mayoflex: boolean;
  refinedPalate: boolean;
  garish: boolean;
  saucemaven: boolean;
  pinkyRing: boolean;
  tuxedoShirt: boolean;
};

function isMonday() {
  // Checking Tuesday's ruby is a hack to see if it's Monday in Arizona.
  return getModifier("Muscle Percent", $item`Tuesday's ruby`) > 0;
}

// TODO: Include Salty Mouth and potentially other modifiers.
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
  const garish =
    modifiers.garish && item.notes?.includes("LASAGNA") && !isMonday();
  const refinedPalate = modifiers.refinedPalate && item.notes?.includes("WINE");
  const pinkyRing = modifiers.pinkyRing && item.notes?.includes("WINE");
  return (
    sum(interpolated, (baseAdventures) => {
      let adventures = baseAdventures;
      if (modifiers.forkMug) {
        adventures = Math.floor(adventures * forkMugMultiplier);
      }
      if (item.notes?.includes("SAUCY") && modifiers.saucemaven) {
        adventures += myPrimestat() === $stat`Mysticality` ? 5 : 3;
      }
      if (garish) adventures += 5;
      if (refinedPalate) adventures = Math.floor(adventures * 1.25);
      if (pinkyRing) adventures = Math.round(adventures * 1.125);
      if (item.notes?.includes("MARTINI") && modifiers.tuxedoShirt) {
        adventures += 2;
      }
      if (itemType(item) === "food" && modifiers.mayoflex) adventures++;
      if (itemType(item) === "food" && modifiers.seasoning) adventures++;
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
  priceOverride?: number;
  mayo?: Item;
};

export class MenuItem {
  item: Item;
  organ?: Organ;
  size: number;
  maximum?: number;
  additionalValue?: number;
  wishEffect?: Effect;
  priceOverride?: number;
  mayo?: Item;

  static defaultOptions = new Map([
    [
      $item`distention pill`,
      {
        organ: "food",
        maximum:
          !have($item`distention pill`) || get("_distentionPillUsed") ? 0 : 1,
        size: -1,
      },
    ],
    [
      $item`synthetic dog hair pill`,
      {
        organ: "booze",
        maximum:
          !have($item`synthetic dog hair pill`) ||
          get("_syntheticDogHairPillUsed")
            ? 0
            : 1,
        size: -1,
      },
    ],
    [
      $item`cuppa Voraci tea`,
      { organ: "food", maximum: get("_voraciTeaUsed") ? 0 : 1, size: -1 },
    ],
    [
      $item`cuppa Sobrie tea`,
      { organ: "booze", maximum: get("_sobrieTeaUsed") ? 0 : 1, size: -1 },
    ],
    [
      $item`mojo filter`,
      {
        organ: "spleen item",
        maximum: 3 - get("currentMojoFilters"),
        size: -1,
      },
    ],
    [$item`spice melange`, { maximum: get("spiceMelangeUsed") ? 0 : 1 }],
    [
      $item`Ultra Mega Sour Ball`,
      { maximum: get("_ultraMegaSourBallUsed") ? 0 : 1 },
    ],
    [
      $item`The Plumber's mushroom stew`,
      { maximum: get("_plumbersMushroomStewEaten") ? 0 : 1 },
    ],
    [$item`The Mad Liquor`, { maximum: get("_madLiquorDrunk") ? 0 : 1 }],
    [
      $item`Doc Clock's thyme cocktail`,
      { maximum: get("_docClocksThymeCocktailDrunk") ? 0 : 1 },
    ],
    [$item`Mr. Burnsger`, { maximum: get("_mrBurnsgerEaten") ? 0 : 1 }],
  ] as [Item, MenuItemOptions][]);

  /**
   * Construct a new menu item, possibly with extra properties. Items in MenuItem.defaultOptions have intelligent defaults.
   * @param item Item to add to menu.
   * @param options.organ Designate item as belonging to a specific organ.
   * @param options.size Override item organ size. Necessary for any non-food/booze/spleen item.
   * @param options.maximum Maximum uses remaining today, or "auto" to check dailyusesleft Mafia property.
   * @param options.additionalValue Additional value (positive) or cost (negative) to consider with item, e.g. from buffs.
   * @param options.wishEffect If item is a pocket wish, effect to wish for.
   */
  constructor(item: Item, options: MenuItemOptions = {}) {
    const {
      size,
      organ,
      maximum,
      additionalValue,
      wishEffect,
      priceOverride,
      mayo,
    } = {
      ...options,
      ...(MenuItem.defaultOptions.get(item) ?? {}),
    };
    this.item = item;
    this.maximum = maximum === "auto" ? item.dailyusesleft : maximum;
    this.additionalValue = additionalValue;
    this.wishEffect = wishEffect;
    this.priceOverride = priceOverride;
    this.mayo = mayo;

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
    if (this.wishEffect) {
      return `${this.item}:${this.wishEffect}`;
    }
    return this.item.toString();
  }

  price(): number {
    return (
      this.priceOverride ??
      (npcPrice(this.item) > 0 ? npcPrice(this.item) : mallPrice(this.item))
    );
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
  mayoLookup: Map<Item, MenuItem>;
  fork?: MenuItem;
  mug?: MenuItem;
  seasoning?: MenuItem;
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
    this.mayoLookup = new Map<Item, MenuItem>();
    if (mayoInstalled()) {
      [Mayo.flex, Mayo.zapine].forEach((mayo) => {
        const menuItem = menu.find((item) => item.item === mayo);
        if (menuItem) this.mayoLookup.set(mayo, menuItem);
      });
    }

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

  /**
   * Determine the value of consuming a menu item with any profitable helpers.
   * @param menuItem Menu item to check.
   * @returns Value for consuming that menu item.
   */
  consumptionValue(menuItem: MenuItem): number {
    return this.consumptionHelpersAndValue(menuItem, {})[1];
  }

  /**
   * Determine which helpers will be used with a menu item and its resulting value.
   * @param menuItem Menu item to check.
   * @param overrideModifiers Overrides for consumption modifiers, if any.
   * @returns Pair [array of helpers and base menu item, value].
   */
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
    if (itemType(menuItem.item) === "food" && this.mayoLookup.size) {
      const mayo = menuItem.mayo
        ? this.mayoLookup.get(menuItem.mayo)
        : this.mayoLookup.get(Mayo.flex);
      if (mayo) helpers.push(mayo);
    }

    const defaultModifiers = {
      forkMug: false,
      seasoning: this.seasoning ? helpers.includes(this.seasoning) : false,
      mayoflex: this.mayoLookup.size
        ? helpers.some((item) => item.item === Mayo.flex)
        : false,
      refinedPalate: have($effect`Refined Palate`),
      garish: have($effect`Gar-ish`),
      saucemaven: have($skill`Saucemaven`),
      pinkyRing:
        have($item`mafia pinky ring`) && canEquip($item`mafia pinky ring`),
      tuxedoShirt: have($item`tuxedo shirt`) && canEquip($item`tuxedo shirt`),
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

  /**
   * Plan an individual organ.
   * @param capacity Organ capacity.
   * @param overrideModifiers Overrides for consumption modifiers, if any.
   * @returns Pair of [value, menu items and quantities].
   */
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

  /**
   * Plan organs.
   * @param organCapacities Organ capacities.
   * @param overrideModifiers Overrides for consumption modifiers, if any.
   * @returns Pair of [value, menu items and quantities].
   */
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

  /**
   * Plan organs, retrying with and without each trial item. Runtime is
   * proportional to 2 ^ trialItems.length.
   * @param organCapacities Organ capacities.
   * @param trialItems Items to rerun solver with and without.
   * @param overrideModifiers Overrides for consumption modifiers, if any.
   * @returns Pair of [value, menu items and quantities].
   */
  planOrgansWithTrials(
    organCapacities: OrganSize[],
    trialItems: [MenuItem, OrganSize[]][],
    overrideModifiers: Partial<ConsumptionModifiers>
  ): [number, [MenuItem[], number][]] {
    if (trialItems.length === 0) {
      return this.planOrgans(organCapacities, overrideModifiers);
    }

    const [trialItem, organSizes] = trialItems[0];
    if (trialItem.maximum !== undefined && trialItem.maximum <= 0) {
      return this.planOrgansWithTrials(
        organCapacities,
        trialItems.slice(1),
        overrideModifiers
      );
    }

    const organCapacitiesWithMap = new Map(organCapacities);
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

    const isGarish =
      (trialItem.item === $item`pocket wish` &&
        trialItem.wishEffect === $effect`Gar-ish`) ||
      trialItem.item === $item`potion of the field gar`;

    const [valueWithout, planWithout] = this.planOrgansWithTrials(
      organCapacities,
      trialItems.slice(1),
      overrideModifiers
    );
    const [valueWith, planWith] = this.planOrgansWithTrials(
      organCapacitiesWith,
      trialItems.slice(1),
      {
        ...overrideModifiers,
        ...(isRefinedPalate ? { refinedPalate: true } : {}),
        ...(isGarish ? { garish: true } : {}),
      }
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
const interactingItems: [Item | Effect, OrganSize[]][] = [
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
  [$effect`Refined Palate`, []],
  [$item`toasted brie`, [["food", 2]]],
  [$effect`Gar-ish`, []],
  [$item`potion of the field gar`, []],
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
  // FIXME: Figure out a better way to handle overfull organs (e.g. coming out of Ed).
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

  /**
   * Per above description, separate out items with cross-organ interaction
   * ("interacting items") for special treatment. These will be checked by
   * running the solver several times.
   */
  const includedInteractingItems = menu
    .map((menuItem) => {
      const interacting = interactingItems.find(
        ([itemOrEffect]) =>
          menuItem.item === itemOrEffect ||
          (menuItem.item === $item`pocket wish` &&
            menuItem.wishEffect === itemOrEffect)
      );
      if (interacting) {
        const [, organSizes] = interacting;
        return [menuItem, organSizes];
      } else {
        return null;
      }
    })
    .filter((value) => value !== null) as [MenuItem, OrganSize[]][];

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

  /**
   * Because our knapsack solver is one-dimensional, we have to consider
   * each organ separately. Since there are no spleen items that affect
   * stomach/liver, we consider those two first, with an approximation of the
   * value of spleen-cleaning. Afterwards, we see how much spleen we have and
   * plan that.
   */
  const [, planFoodBooze] = dietPlanner.planOrgansWithTrials(
    resolvedOrganCapacities.filter(
      ([organ, capacity]) => ["food", "booze"].includes(organ) && capacity >= 0
    ),
    includedInteractingItems,
    {}
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

export function dietEstimatedTurns(diet: [MenuItem[], number][]) {
  const refinedPalate = diet.some((itemCount) =>
    itemCount[0].some(
      (trialItem) =>
        (trialItem.item === $item`pocket wish` &&
          trialItem.wishEffect === $effect`Gar-ish`) ||
        trialItem.item === $item`potion of the field gar`
    )
  );
  const garish = diet.some((itemCount) =>
    itemCount[0].some(
      (trialItem) =>
        (trialItem.item === $item`pocket wish` &&
          trialItem.wishEffect === $effect`Gar-ish`) ||
        trialItem.item === $item`potion of the field gar`
    )
  );

  return diet.reduce((sum, itemCount) => {
    const [menuItems, count] = itemCount;
    if (menuItems.length === 0 || count === 0) {
      return sum;
    } else {
      const items = menuItems.map((m) => m.item);

      return (
        sum +
        count *
          expectedAdventures(menuItems[menuItems.length - 1].item, {
            forkMug:
              items.includes($item`Frosty's frosty mug`) ||
              items.includes($item`Frosty's frosty mug`),

            seasoning: items.includes($item`Special Seasoning`),
            mayoflex: items.includes(Mayo.flex),
            refinedPalate: refinedPalate,
            garish: garish,
            saucemaven: have($skill`Saucemaven`),
            pinkyRing:
              have($item`mafia pinky ring`) &&
              canEquip($item`mafia pinky ring`),
            tuxedoShirt:
              have($item`tuxedo shirt`) && canEquip($item`tuxedo shirt`),
          })
      );
    }
  }, 0);
}
