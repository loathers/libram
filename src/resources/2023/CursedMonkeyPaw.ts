import {
  Item,
  Location,
  canAdventure,
  getMonsters,
  itemDropsArray,
  Effect,
  toEffect,
  monkeyPaw,
  prepareForAdventure,
  cliExecute,
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

const INVALID_CHARACTERS = /[^a-z\d -]/g;

let _unwishableEffects: Effect[];
function unwishableEffects(): Effect[] {
  // This is the set of all names of genie-wishable effects, split into the maximal substrings we can actually submit
  const names = Effect.all()
    .filter((e) => !e.attributes.includes("nohookah"))
    .map((e) => {
      const name = e.name.toLowerCase();
      return { name, splitName: name.split(INVALID_CHARACTERS) };
    });

  return names
    .filter(
      ({ name, splitName }) =>
        // Any effect that doesn't contain an INVALID_CHARACTER is fine
        splitName.length > 1 &&
        // To be unwishable, there can't be any substrings that uniquely match a genie-wishable effect
        splitName.every((s) =>
          // So we check every maximal substring against every one of our genie-wishable effects, excluding the effect we're currently looking at
          // if one of the substrings matches a substring associated with another effect, we're screwed.
          names.some(({ name: n }) => n !== name && n.includes(s))
        )
    )
    .map(({ name }) => toEffect(name));
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
 * Wish for a given Item or Effect.
 * If it's an item, will `prepareForAdventure`; if an item is available in multiple locations this will pick the first one.
 *
 * @param wish The Item or Effect to wish for
 * @returns Whether we succeeded in this endeavor
 */
export function wishFor(wish: Effect | Item): boolean {
  if (wishes() <= 0) return false;

  if (wish instanceof Effect) return monkeyPaw(wish);

  const locations = Location.all().filter(
    (l) =>
      canAdventure(l) &&
      getMonsters(l).some(
        (m) => m.copyable && itemDropsArray(m).some(({ drop }) => drop === wish)
      )
  );

  try {
    if (locations.length) {
      cliExecute("checkpoint");
      prepareForAdventure(locations[0]);
    }
    return monkeyPaw(wish);
  } finally {
    if (locations.length) cliExecute("outfit checkpoint");
  }
}
