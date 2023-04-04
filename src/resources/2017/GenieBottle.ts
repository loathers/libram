import { Effect, Item, Monster, runChoice, toInt, visitUrl } from "kolmafia";
import { have as _have } from "../../lib";
import { get } from "../../property";
import { $item } from "../../template-string";

export type GenieOption = keyof typeof GeniePhrases;

const GeniePhrases = {
  Meat: "I was rich",
  Stats: "I was big",
  Muscle: "I was a little bit taller",
  Moxie: "I was a baller",
  Mysticality: "I had a rabbit in a hat with a bat",
  Pony: "for a pony",
  Shirt: "for a blessed rustproof +2 gray dragon scale mail",
};

const bottle = $item`genie bottle`;
const pocketWish = $item`pocket wish`;

/**
 * @returns true if the player owns a genie bottle.
 */
export function have(): boolean {
  return _have(bottle);
}

/**
 * @returns true if the player has genie bottle wishes remaining, pocket wishes are not limited in this way.
 */
export function canWishFromBottle(): boolean {
  return get("_genieWishesUsed") < 3;
}

/**
 * @returns true if the player can wish for a monster. Both genie bottle and pocket wishes are limited.
 */
export function canWishForMonster(): boolean {
  return get("_genieFightsUsed") < 3;
}

function getFlavorText(effect: Effect): string {
  const description = visitUrl(`desc_effect.php?whicheffect=${effect.descid}`);
  const flavorText = description.match(/<blockquote>(.+)<\/blockquote>/);
  if (!flavorText || !flavorText[1]) {
    throw new Error(
      `Failed to match flavortext when wishing by description for ${effect}`
    );
  }
  return flavorText[1];
}

function _wish(item: Item, target: Effect | Monster | GenieOption): boolean {
  visitUrl(`inv_use.php?whichitem=${toInt(item)}`);

  if (target instanceof Effect) {
    const wishResult = runChoice(1, `wish=to be ${getFlavorText(target)}`);
    const match = wishResult.match(/You acquire an effect: <b>([^<]+)<\/b>/);
    return !!match && match[1] === target.name;
  }

  if (target instanceof Monster) {
    if (!canWishForMonster()) return false;
    return false;
  }

  const targetPhrase = GeniePhrases[target];
  if (targetPhrase) {
    return runChoice(1, `wish=${targetPhrase}`) !== "";
  }

  return false;
}

/**
 * Uses the genie bottle to acquire an effect from description text instead of the effect name. Helpful for ambiguous effect names.
 * Will not use pocket wishes, use @function pocketWishFor for that instead.
 * @param target The desired effect to be wished for.
 * @returns A boolean denoting success or failure.
 */
export function wishFor(target: Effect | Monster | GenieOption): boolean {
  if (!have()) return false;
  if (!canWishFromBottle()) return false;
  return _wish(bottle, target);
}

/**
 * Uses a pocket wish to acquire an effect from description text instead of the effect name. Helpful for ambiguous effect names.
 * Does not use the genie bottle IotM directly, use @function wishFor for that instead.
 * @param target The desired effect to be wished for.
 * @returns A boolean denoting success or failure.
 */
export function pocketWishFor(target: Effect | Monster | GenieOption): boolean {
  if (!_have(pocketWish)) return false;
  return _wish(pocketWish, target);
}
