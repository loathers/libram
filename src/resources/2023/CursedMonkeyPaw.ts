import {
  Item,
  Location,
  canAdventure,
  getMonsters,
  itemDropsArray,
  Effect,
  toEffect,
  monkeyPaw,
} from "kolmafia";
import { have as have_ } from "../../lib";
import { get } from "../../property";
import { $item } from "../../template-string";
import { clamp } from "../../utils";

export const item = $item`cursed monkey's paw`;

/**
 * @returns Whether or not we currently `have` the cursed monkey's paw
 */
export function have(): boolean {
  return have_(item);
}

/**
 * @returns The number of monkey paw wishes we have remaining
 */
export function wishes(): number {
  return clamp(5 - get("_monkeyPawWishesUsed"), 0, 5);
}

/**
 * @returns A set of all items we expect to be able to wish; this doesn't actually constitute all items
 */
export function wishableItems(): Set<Item> {
  return new Set(
    ...Location.all()
      .filter((l) => canAdventure(l))
      .map((l) =>
        getMonsters(l)
          .filter((m) => m.copyable)
          .map((m) =>
            itemDropsArray(m)
              .filter(
                ({ type, rate, drop }) =>
                  !drop.quest && (type !== "c" || rate >= 1) // Remove random roll drops
              )
              .map(({ drop }) => drop)
          )
      )
      .flat()
  );
}
let _unwishableEffects: Effect[];
function unwishableEffects(): Effect[] {
  const names = Effect.all()
    .filter((e) => !e.attributes.includes("nohookah"))
    .map((e) => e.name.toLowerCase())
    .map((n) => ({ name: n, splitName: n.split(RegExp("[.,']", "g")) }));
  return names
    .filter(({ name, splitName }) =>
      splitName.every((s) =>
        names.some(
          (n) => n.name !== name && n.splitName.some((x) => x.includes(s))
        )
      )
    )
    .map(({ name }) => toEffect(name))
    .filter((e) => e.toString().toLowerCase().match(RegExp("[,.']")));
}

/**
 * @returns An Array consisting of all genie-wishable Effects that are not Monkey-wishable
 */
export function getUnwishableEffects(): Effect[] {
  return (_unwishableEffects ??= unwishableEffects());
}

/**
 * Decides if we expect that a given Item or Effect can be wished for.
 * May be slow for Effects;
 *
 * @param wish The Item or Effect in question
 * @returns Whether we expect it can be wished for
 */
export function isWishable(wish: Effect | Item): boolean {
  if (wish instanceof Item) {
    return wishableItems().has(wish);
  } else {
    if (wish.attributes.includes("nohookah")) return false;
    if (!wish.name.match(/[.,']/)) return true;
    return !getUnwishableEffects().includes(wish);
  }
}

/**
 * Wish for a given Item or Effect; this simply wraps kolmafia's `monkeyPaw`.
 *
 * @param wish The Item or Effect to wish for
 * @returns Whether we succeeded in this endeavor
 */
export function wishFor(wish: Effect | Item): boolean {
  if (wishes() <= 0) return false;
  // Overloads are apparently meaningfully different from type unions
  return wish instanceof Effect ? monkeyPaw(wish) : monkeyPaw(wish);
}
