import {
  canEquip,
  Effect,
  fullnessLimit,
  historicalAge,
  historicalPrice,
  inebrietyLimit,
  Item,
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

import { have } from "../lib";
import { get as getModifier } from "../modifier";
import { get } from "../property";
import { Mayo, installed as mayoInstalled } from "../resources/2015/MayoClinic";
import { $effect, $item, $items, $skill, $stat } from "../template-string";
import { sum } from "../utils";
import { knapsack } from "./knapsack";

type RawDietEntry<T> = [MenuItem<T>[], number];
type RawDiet<T> = RawDietEntry<T>[];

type ConsumptionModifiers = {
  forkMug: boolean;
  seasoning: boolean;
  whetStone: boolean;
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

/**
 * Expected adventures from an item given a specified state
 *
 * @todo Include Salty Mouth and potentially other modifiers.
 * @param item Item to consider
 * @param modifiers Consumption modifiers to consider
 * @returns Adventures expected
 */
function expectedAdventures(
  item: Item,
  modifiers: ConsumptionModifiers
): number {
  if (item.adventures === "") return 0;
  const [min, recordedMax] = item.adventures
    .split(/[-]/)
    .map((s) => parseInt(s));
  const max = recordedMax ?? min;
  const interpolated = [...new Array(max - min + 1).keys()].map((n) => n + min);
  const forkMugMultiplier =
    (itemType(item) === "food" && item.notes?.includes("SALAD")) ||
    (itemType(item) === "booze" && item.notes?.includes("BEER"))
      ? 1.5
      : 1.3;
  const seasoningAdventures = max - min <= 1 ? 1 : 0.5;
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
      if (itemType(item) === "food" && modifiers.seasoning)
        adventures += seasoningAdventures;
      if (itemType(item) === "food" && modifiers.whetStone) adventures++;
      return adventures;
    }) / interpolated.length
  );
}

type MenuItemOptions<T> = Partial<{
  organ: Organ;
  size: number;
  maximum: number | "auto";
  additionalValue: number;
  effect: Effect;
  priceOverride: number;
  mayo: Item;
  data: T;
  useRetrievePrice: boolean;
}>;

export class MenuItem<T> {
  item: Item;
  organ?: Organ;
  size: number;
  maximum?: number;
  additionalValue?: number;
  effect?: Effect;
  priceOverride?: number;
  mayo?: Item;
  data?: T;

  static defaultPriceFunction: (item: Item) => number = (item: Item) =>
    npcPrice(item) > 0 ? npcPrice(item) : mallPrice(item);

  static defaultOptions<T>(): Map<Item, MenuItemOptions<T>> {
    return new Map([
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
      [
        $item`Calzone of Legend`,
        { maximum: get("calzoneOfLegendEaten") ? 0 : 1 },
      ],
      [
        $item`Deep Dish of Legend`,
        { maximum: get("deepDishOfLegendEaten") ? 0 : 1 },
      ],
      [$item`Pizza of Legend`, { maximum: get("pizzaOfLegendEaten") ? 0 : 1 }],
      [
        $item`jar of fermented pickle juice`,
        { maximum: get("_pickleJuiceDrunk") ? 0 : 1 },
      ],
      [
        $item`extra-greasy slider`,
        { maximum: get("_extraGreasySliderEaten") ? 0 : 1 },
      ],
      [$item`voodoo snuff`, { maximum: get("_voodooSnuffUsed") ? 0 : 1 }],
      [
        $item`Ol' Scratch's salad fork`,
        { maximum: get("_saladForkUsed") ? 0 : 1 },
      ],
      [$item`Frosty's frosty mug`, { maximum: get("_frostyMugUsed") ? 0 : 1 }],
      [
        $item`tin cup of mulligan stew`,
        { maximum: get("_mulliganStewEaten") ? 0 : 1 },
      ],
      [
        $item`Hodgman's blanket`,
        { maximum: get("_hodgmansBlanketDrunk") ? 0 : 1 },
      ],
    ] as [Item, MenuItemOptions<T>][]);
  }

  /**
   * Construct a new menu item, possibly with extra properties. Items in MenuItem.defaultOptions have intelligent defaults.
   *
   * @param item Item to add to menu.
   * @param options Options for this menu item
   * @param options.organ Designate item as belonging to a specific organ.
   * @param options.size Override item organ size. Necessary for any non-food/booze/spleen item.
   * @param options.maximum Maximum uses remaining today, or "auto" to check dailyusesleft Mafia property.
   * @param options.additionalValue Additional value (positive) or cost (negative) to consider with item, e.g. from buffs.
   * @param options.effect Effect associated with this menu item (pocket wish effect, sweet synthesis effect, pill keeper potion extension)
   * @param options.mayo Which mayo to use before item (ignored if mayo clinic is not installed or item is not a food)
   * @param options.note Any note to track information about item, to be used later
   */
  constructor(item: Item, options: MenuItemOptions<T> = {}) {
    const {
      size,
      organ,
      maximum,
      additionalValue,
      effect,
      priceOverride,
      mayo,
      data,
    } = {
      ...options,
      ...(MenuItem.defaultOptions<T>().get(item) ?? {}),
    };
    this.item = item;
    this.maximum = (maximum === "auto" ? item.dailyusesleft : maximum) ?? this.maximum
    if (additionalValue) this.additionalValue = additionalValue;
    if (effect) this.effect = effect;
    if (priceOverride) this.priceOverride = priceOverride;
    if (mayo) this.mayo = mayo;
    if (data) this.data = data;

    const typ = itemType(this.item);
    if (organ) this.organ = organ;
    else if (isOrgan(typ)) this.organ = typ;
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

  equals(other: MenuItem<T>): boolean {
    return this.item === other.item && this.effect === other.effect;
  }

  toString(): string {
    if (this.effect) {
      return `${this.item}:${this.effect}`;
    }
    return this.item.toString();
  }

  price(): number {
    return this.priceOverride ?? MenuItem.defaultPriceFunction?.(this.item);
  }
}

const organs = ["food", "booze", "spleen item"] as const;
type Organ = typeof organs[number];
type OrganSize = [Organ, number];

/**
 * @param x Name of thing that might be an organ
 * @returns Whether the string supplied is the name of an organ
 */
function isOrgan(x: string): x is Organ {
  return (organs as readonly string[]).includes(x);
}

class DietPlanner<T> {
  mpa: number;
  menu: MenuItem<T>[];
  mayoLookup: Map<Item, MenuItem<T>>;
  fork?: MenuItem<T>;
  mug?: MenuItem<T>;
  seasoning?: MenuItem<T>;
  whetStone?: MenuItem<T>;
  spleenValue = 0;

  constructor(mpa: number, menu: MenuItem<T>[]) {
    this.mpa = mpa;
    const fork = menu.find(
      (item) => item.item === $item`Ol' Scratch's salad fork`
    );
    if (fork) this.fork = fork;
    const mug = menu.find((item) => item.item === $item`Frosty's frosty mug`);
    if (mug) this.mug = mug;
    const seasoning = menu.find(
      (item) => item.item === $item`Special Seasoning`
    );
    if (seasoning) this.seasoning = seasoning;
    const whetStone = menu.find((item) => item.item === $item`whet stone`);
    if (whetStone) this.whetStone = whetStone;
    this.mayoLookup = new Map<Item, MenuItem<T>>();
    if (mayoInstalled()) {
      for (const mayo of [Mayo.flex, Mayo.zapine]) {
        const menuItem = menu.find((item) => item.item === mayo);
        if (menuItem) this.mayoLookup.set(mayo, menuItem);
      }
    }

    this.menu = menu.filter((item) => item.organ);

    if (
      menu.filter(
        (item) =>
          historicalPrice(item.item) === 0 || historicalAge(item.item) >= 1
      ).length > 100
    ) {
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
      // Marginal value for sliders and jars depends on our best unlimited spleen item.
      // TODO: spleenLimit() - mySpleenUse() is a poor estimate.
      const bestMarginalSpleenItem = spleenItems.find(
        (spleenItem) =>
          spleenItem.maximum === undefined ||
          spleenItem.maximum * spleenItem.size >= spleenLimit() - mySpleenUse()
      );
      if (bestMarginalSpleenItem) {
        this.spleenValue = Math.max(
          0,
          this.consumptionValue(bestMarginalSpleenItem) /
            bestMarginalSpleenItem.size
        );
      }
    }
  }

  /**
   * Determine the value of consuming a menu item with any profitable helpers.
   *
   * @param menuItem Menu item to check.
   * @returns Value for consuming that menu item.
   */
  consumptionValue(menuItem: MenuItem<T>): number {
    return this.consumptionHelpersAndValue(menuItem, {})[1];
  }

  /**
   * Determine which helpers will be used with a menu item and its resulting value.
   *
   * @param menuItem Menu item to check.
   * @param overrideModifiers Overrides for consumption modifiers, if any.
   * @returns Pair [array of helpers and base menu item, value].
   */
  consumptionHelpersAndValue(
    menuItem: MenuItem<T>,
    overrideModifiers: Partial<ConsumptionModifiers>
  ): RawDietEntry<T> {
    const helpers = [];
    if (itemType(menuItem.item) === "food" && this.mayoLookup.size) {
      const mayo = menuItem.mayo
        ? this.mayoLookup.get(menuItem.mayo)
        : this.mayoLookup.get(Mayo.flex);
      if (mayo) helpers.push(mayo);
    }

    const defaultModifiers = {
      forkMug: false,
      seasoning: this.seasoning ? helpers.includes(this.seasoning) : false,
      whetStone: this.whetStone ? helpers.includes(this.whetStone) : false,
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

    if (
      this.seasoning &&
      itemType(menuItem.item) === "food" &&
      this.mpa *
        (expectedAdventures(menuItem.item, {
          ...defaultModifiers,
          seasoning: true,
        }) -
          expectedAdventures(menuItem.item, {
            ...defaultModifiers,
            seasoning: false,
          })) >
        mallPrice($item`Special Seasoning`)
    ) {
      helpers.push(this.seasoning);
    }

    if (
      this.whetStone &&
      itemType(menuItem.item) === "food" &&
      this.mpa > mallPrice($item`whet stone`)
    ) {
      helpers.push(this.whetStone);
    }

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

    const valueSpleen =
      $items`jar of fermented pickle juice, extra-greasy slider`.includes(
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
   *
   * @param organ Organ to plan
   * @param capacity Organ capacity.
   * @param overrideModifiers Overrides for consumption modifiers, if any.
   * @returns Pair of [value, menu items and quantities].
   */
  planOrgan(
    organ: Organ,
    capacity: number,
    overrideModifiers: Partial<ConsumptionModifiers> = {}
  ): [number, RawDiet<T>] {
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
        ] as [MenuItem<T>[], number, number, number?]
    );
    return knapsack(knapsackValues, capacity);
  }

  /**
   * Plan organs.
   *
   * @param organCapacities Organ capacities.
   * @param overrideModifiers Overrides for consumption modifiers, if any.
   * @returns Pair of [value, menu items and quantities].
   */
  planOrgans(
    organCapacities: OrganSize[],
    overrideModifiers: Partial<ConsumptionModifiers> = {}
  ): [number, RawDiet<T>] {
    const valuePlans = organCapacities.map(([organ, capacity]) =>
      this.planOrgan(organ, capacity, overrideModifiers)
    );
    return [
      sum(valuePlans, ([value]) => value),
      ([] as RawDiet<T>).concat(...valuePlans.map(([, plan]) => plan)),
    ];
  }

  /**
   * Plan organs, retrying with and without each trial item. Runtime is
   * proportional to 2 ^ trialItems.length.
   *
   * @param organCapacities Organ capacities.
   * @param trialItems Items to rerun solver with and without.
   * @param overrideModifiers Overrides for consumption modifiers, if any.
   * @returns Pair of [value, menu items and quantities].
   */
  planOrgansWithTrials(
    organCapacities: OrganSize[],
    trialItems: [MenuItem<T>, OrganSize[]][],
    overrideModifiers: Partial<ConsumptionModifiers>
  ): [number, RawDiet<T>] {
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
      if (current === undefined) {
        // Organs with no capacity are excluded from the organCapacities map, so this item excluded from the trial.
        // Solves the problem with the diet offering to eat toasted brie after exiting Shrunken Adventurer with 20/15 fullness.
        return this.planOrgansWithTrials(
          organCapacities,
          trialItems.slice(1),
          overrideModifiers
        );
      }

      organCapacitiesWithMap.set(organ, current - size);
    }
    const organCapacitiesWith = [...organCapacitiesWithMap];

    const isRefinedPalate =
      (trialItem.item === $item`pocket wish` &&
        trialItem.effect === $effect`Refined Palate`) ||
      trialItem.item === $item`toasted brie`;

    const isGarish =
      (trialItem.item === $item`pocket wish` &&
        trialItem.effect === $effect`Gar-ish`) ||
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
      : [valueWith + value, [...planWith, [helpersAndItem, 1]]];
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
 *
 * @param mpa Meat per adventure value.
 * @param menu Array of MenuItems to consider for diet purposes.
 * @param organCapacities Optional override of each organ's capacity.
 * @returns Array of [menu item and helpers, count].
 */
function planDiet<T>(
  mpa: number,
  menu: MenuItem<T>[],
  organCapacities: [Organ, number | null][] = [
    ["food", null],
    ["booze", null],
    ["spleen item", null],
  ]
): RawDiet<T> {
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
            menuItem.effect === itemOrEffect)
      );
      if (interacting) {
        const [, organSizes] = interacting;
        return [menuItem, organSizes];
      } else {
        return null;
      }
    })
    .filter((value) => value !== null) as [MenuItem<T>, OrganSize[]][];

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

class DietEntry<T> {
  quantity: number;
  constructor(readonly menuItems: MenuItem<T>[], quantity: number) {
    this.quantity = quantity;
  }

  target(): MenuItem<T> {
    return this.menuItems[this.menuItems.length - 1];
  }

  helpers(): MenuItem<T>[] {
    if (this.menuItems.length > 1) {
      return this.menuItems.slice(0, -1);
    }
    return [];
  }

  expectedAdventures(diet: Diet<T>) {
    {
      if (this.menuItems.length === 0 || this.quantity === 0) {
        return 0;
      } else {
        const items = this.menuItems.map((m) => m.item);
        const targetItem = this.menuItems[this.menuItems.length - 1].item;
        const fork =
          itemType(targetItem) === "food" &&
          items.includes($item`Ol' Scratch's salad fork`);
        const mug =
          itemType(targetItem) === "booze" &&
          items.includes($item`Frosty's frosty mug`);

        return (
          this.quantity *
          expectedAdventures(this.menuItems[this.menuItems.length - 1].item, {
            forkMug: fork || mug,
            seasoning: items.includes($item`Special Seasoning`),
            whetStone: items.includes($item`whet stone`),
            mayoflex: items.includes(Mayo.flex),
            refinedPalate: diet.refinedPalate,
            garish: diet.garish,
            saucemaven: diet.saucemaven,
            pinkyRing: diet.pinkyRing,
            tuxedoShirt: diet.tuxedoShirt,
          })
        );
      }
    }
  }

  expectedValue(
    mpa: number,
    diet: Diet<T>,
    method: "gross" | "net" = "gross"
  ): number {
    const gross =
      mpa * this.expectedAdventures(diet) +
      this.quantity *
        sum(this.menuItems, (menuItem) => menuItem.additionalValue ?? 0);
    if (method === "gross") {
      return gross;
    } else {
      return gross - this.expectedPrice();
    }
  }

  expectedPrice(): number {
    return this.quantity * sum(this.menuItems, (menuItem) => menuItem.price());
  }
}
interface OrganCapacity {
  food?: number | "auto";
  booze?: number | "auto";
  spleen?: number | "auto";
}
/**
 * A representation of a potential diet
 */
export class Diet<T> {
  entries: DietEntry<T>[];

  constructor(entries: DietEntry<T>[] = []) {
    this.entries = entries;
  }

  get refinedPalate(): boolean {
    return this.entries.some((dietEntry) =>
      dietEntry.menuItems.some(
        (trialItem) =>
          (trialItem.item === $item`pocket wish` &&
            trialItem.effect === $effect`Refined Palate`) ||
          trialItem.item === $item`toasted brie`
      )
    );
  }

  get garish(): boolean {
    return this.entries.some((dietEntry) =>
      dietEntry.menuItems.some(
        (trialItem) =>
          (trialItem.item === $item`pocket wish` &&
            trialItem.effect === $effect`Gar-ish`) ||
          trialItem.item === $item`potion of the field gar`
      )
    );
  }

  get saucemaven(): boolean {
    return have($skill`Saucemaven`);
  }

  get tuxedoShirt(): boolean {
    return have($item`tuxedo shirt`) && canEquip($item`tuxedo shirt`);
  }

  get pinkyRing(): boolean {
    return have($item`mafia pinky ring`) && canEquip($item`mafia pinky ring`);
  }

  expectedAdventures(): number {
    return sum(this.entries, (dietEntry) => dietEntry.expectedAdventures(this));
  }

  expectedValue(mpa: number, method: "gross" | "net" = "gross"): number {
    return sum(this.entries, (dietEntry) =>
      dietEntry.expectedValue(mpa, this, method)
    );
  }

  expectedPrice(): number {
    return sum(this.entries, (dietEntry) => dietEntry.expectedPrice());
  }

  copy(): Diet<T> {
    return new Diet([...this.entries]);
  }

  static from<T>(rawDiet: RawDiet<T>): Diet<T> {
    const diet = rawDiet.map((item) => {
      const [menuItems, quantity] = item;
      return new DietEntry(menuItems, quantity);
    });
    return new Diet<T>(diet);
  }

  static plan<T>(
    mpa: number,
    menu: MenuItem<T>[],
    organCapacities: OrganCapacity = {
      food: "auto",
      booze: "auto",
      spleen: "auto",
    }
  ): Diet<T> {
    const { food, booze, spleen } = organCapacities;
    const plannerCapacity: [Organ, number | null][] = [];
    if (food) {
      plannerCapacity.push(["food", food === "auto" ? null : food]);
    }
    if (booze) {
      plannerCapacity.push(["booze", booze === "auto" ? null : booze]);
    }
    if (spleen) {
      plannerCapacity.push(["spleen item", spleen === "auto" ? null : spleen]);
    }

    return Diet.from(planDiet(mpa, menu, plannerCapacity));
  }
}
