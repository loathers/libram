import {
  fullnessLimit,
  inebrietyLimit,
  itemType,
  mallPrice,
  mallPrices,
  mySpleenUse,
  print,
  spleenLimit,
} from "kolmafia";
import { have } from "../lib";
import { get } from "../property";
import { $item, $items } from "../template-string";
import { clamp, sum } from "../utils";
import { knapsack } from "./knapsack";

function expectedAdventures(item: Item): number {
  const bounds = item.adventures.split(/-–—/);
  return sum(bounds, (s) => parseInt(s)) / bounds.length;
}

// Assumes list is already sorted, counts adjacent items.
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
  value?: number;
  size: number;

  constructor(item: Item, maximum?: number, value?: number, size?: number) {
    this.item = item;
    this.maximum = maximum;
    this.value = value;

    const typ = itemType(this.item);
    this.size =
      size ?? typ === "food"
        ? this.item.fullness
        : typ === "booze"
        ? this.item.inebriety
        : typ === "spleen"
        ? this.item.spleen
        : 0;
  }
}

class DietPlanner {
  mpa: number;
  menu: MenuItem[];
  checkFork: boolean;
  checkMug: boolean;
  spleenValue = 0;

  constructor(mpa: number, menu: MenuItem[]) {
    this.mpa = mpa;
    this.menu = menu.filter((item) =>
      ["food", "booze", "spleen"].includes(itemType(item.item))
    );
    this.checkFork = menu.some(
      (item) => item.item === $item`Ol' Scratch's salad fork`
    );
    this.checkMug = menu.some(
      (item) => item.item === $item`Frosty's frosty mug`
    );

    if (menu.length > 100) {
      mallPrices("food");
      mallPrices("booze");
    }

    const spleenItems = menu.filter((item) => itemType(item.item) === "spleen");
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

  consumptionValue(item: MenuItem): number {
    const value =
      item.value ??
      expectedAdventures(item.item) * this.mpa - mallPrice(item.item);
    if (
      $items`jar of fermented pickle juice, extra-greasy slider`.includes(
        item.item
      )
    ) {
      return value + 5 * this.spleenValue;
    } else {
      return value;
    }
  }

  planOrgan(
    organ: "food" | "booze" | "spleen",
    capacity: number
  ): [number, [Item[], number][]] {
    print(`Plan ${organ} < ${capacity}`);
    const submenu = this.menu.filter((item) => itemType(item.item) === organ);
    const knapsackValues = submenu.map(
      (item) =>
        [[item], this.consumptionValue(item), item.size, item.maximum] as [
          MenuItem[],
          number,
          number,
          number?
        ]
    );
    if (organ === "food" && this.checkFork) {
      knapsackValues.push(
        ...submenu.map(
          (item) =>
            [
              [$item`Ol' Scratch's salad fork`, item],
              this.consumptionValue(item) +
                mallPrice($item`Ol' Scratch's salad fork`),
              item.size,
              item.maximum,
            ] as [MenuItem[], number, number, number?]
        )
      );
    }
    if (organ === "booze" && this.checkMug) {
      knapsackValues.push(
        ...(submenu.map((item) => [
          [$item`Frosty's frosty mug`, item],
          this.consumptionValue(item) + mallPrice($item`Frosty's frosty mug`),
          item.size,
          item.maximum,
        ]) as [MenuItem[], number, number, number?][])
      );
    }
    const [value, menuItemList] = knapsack(knapsackValues, capacity);
    const itemList = menuItemList.map((menuItems) =>
      menuItems.map((menuItem) => menuItem.item)
    );
    print(
      `Items: ${itemList.length} ${([] as Item[])
        .concat(...itemList)
        .map((item) => item.name)
        .join(", ")}`
    );
    return [
      value,
      aggregate(itemList, (x: Item[], y: Item[]) =>
        x.every((elem, index) => elem === y[index])
      ),
    ];
  }

  planOrgans(
    organCapacities: ["food" | "booze" | "spleen", number][]
  ): [number, [Item[], number][]] {
    const valuePlans = organCapacities.map(([organ, capacity]) =>
      this.planOrgan(organ, capacity)
    );
    return [
      sum(valuePlans, ([value]) => value),
      ([] as [Item[], number][]).concat(...valuePlans.map(([, plan]) => plan)),
    ];
  }
}

export function planDiet(mpa: number, menu: MenuItem[]): [Item[], number][] {
  const dietPlanner = new DietPlanner(mpa, menu);
  const availableFullness =
    fullnessLimit() + (have($item`distention pill`) ? 1 : 0);
  const availableInebriety =
    inebrietyLimit() + (have($item`synthetic dog hair pill`) ? 1 : 0);
  const availableSpleen =
    spleenLimit() - mySpleenUse() + clamp(3 - get("currentMojoFilters"), 0, 3);

  const [valueNoMelange, planNoMelange] = dietPlanner.planOrgans([
    ["food", availableFullness],
    ["booze", availableInebriety],
  ]);
  const [valueMelange, planMelange] = dietPlanner.planOrgans([
    ["food", availableFullness + 3],
    ["booze", availableInebriety + 3],
  ]);
  const planFoodBooze =
    valueNoMelange > valueMelange - mallPrice($item`spice melange`)
      ? planNoMelange
      : [...planMelange, [[$item`spice melange`], 1] as [Item[], number]];
  print(`planfood: ${planFoodBooze.length}`);

  const additionalSpleen = sum(planFoodBooze, ([items, number]) =>
    items.includes($item`jar of fermented pickle juice`) ||
    items.includes($item`extra-greasy slider`)
      ? 5 * number
      : 0
  );

  const [, planSpleen] = dietPlanner.planOrgan(
    "spleen",
    availableSpleen + additionalSpleen
  );

  return [...planFoodBooze, ...planSpleen];
}
