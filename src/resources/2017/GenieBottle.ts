import {
  Effect,
  Item,
  Monster,
  holiday,
  runChoice,
  runCombat,
  toInt,
  visitUrl,
} from "kolmafia";
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

class SaladError extends Error {}
function unsalad(url: string, filter: RegExp): string {
  let text = visitUrl(url).match(filter);
  if (!text) throw new Error();
  if (!holiday().includes("April Fool's Day")) return text[1];

  let fragments = text[1].split(" ");
  for (let i = 0; i < 100; i++) {
    text = visitUrl(url).match(filter);
    if (!text) throw new Error();
    const newFragments = text[1].split(" ");
    if (fragments.length !== newFragments.length) throw new SaladError();
    fragments = fragments.map((word, index) => {
      const newWord = newFragments[index];
      if (word.match(/salad/i) && !newWord.match(/salad/i)) return newWord;
      else return word;
    });
    if (fragments.every((word) => !word.match(/salad/i))) {
      return fragments.join(" ");
    }
  }

  throw new SaladError();
}

function getFlavorText(effect: Effect): string {
  try {
    const flavorText = unsalad(
      `desc_effect.php?whicheffect=${effect.descid}`,
      /<blockquote>(.+)<\/blockquote>/
    );
    return flavorText[1];
  } catch (err) {
    if (err instanceof SaladError)
      throw new Error(
        `Unable to handle description for ${effect} due to April Fool's Salad.`
      );
    else throw new Error(
      `Failed to get description text before wishing by for ${effect}`
    );
  }
}

function _wish(item: Item, target: Effect | Monster | GenieOption): string {
  visitUrl(`inv_use.php?whichitem=${toInt(item)}`);

  if (target instanceof Effect) {
    const wishResult = runChoice(1, `wish=to be ${getFlavorText(target)}`);
    const match = wishResult.match(/You acquire an effect: <b>([^<]+)<\/b>/);
    return (match && match[1]) || "wishfailed";
  }

  if (target instanceof Monster) {
    if (!canWishForMonster()) return "";
    const wishResult = runChoice(1, `wish to fight a ${target}`);
    const match = wishResult.match(/<a href="fight.php">/);
    if (match) {
      visitUrl("fight.php");
      return runCombat();
    }
    return "wishfailed";
  }

  const targetPhrase = GeniePhrases[target];
  if (targetPhrase) return runChoice(1, `wish=${targetPhrase}`);

  throw new Error(`Unhandled wish ${target}`);
}

/**
 * Uses the genie bottle to acquire an effect from description text instead of the effect name. Helpful for ambiguous effect names.
 * Will not use pocket wishes, use @function pocketWishFor for that instead.
 *
 * @param target The desired effect to be wished for.
 * @returns A string containing the successful page text, "nobottle" if not owned, "nowishes" if 3 genie bottle wishes are already consumed, or "wishfailed" if the genie returned an error.
 */
export function wishFor(
  target: Effect | Monster | GenieOption
): string | "nobottle" | "nowishes" | "wishfailed" {
  if (!have()) return "nobottle";
  if (!canWishFromBottle()) return "nowishes";
  return _wish(bottle, target);
}

/**
 * Uses a pocket wish to acquire an effect from description text instead of the effect name. Helpful for ambiguous effect names.
 * Does not use the genie bottle IotM directly, use @function wishFor for that instead.
 *
 * @param target The desired effect to be wished for.
 * @returns A string containing the successful page text, "nowishes" if no pocket wish in inventory, or "wishfailed" if the genie returned an error.
 */
export function pocketWishFor(
  target: Effect | Monster | GenieOption
): string | "nowishes" | "wishfailed" {
  if (!_have(pocketWish)) return "nowishes";
  return _wish(pocketWish, target);
}
