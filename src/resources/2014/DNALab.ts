import {
  cliExecute,
  Effect,
  getWorkshed,
  haveEffect,
  Item,
  itemAmount,
  Phylum,
  toEffect,
} from "kolmafia";
import { have as haveItem } from "../../lib.js";
import { get as getModifier } from "../../modifier.js";
import { get } from "../../property.js";
import { $effect, $item, $phylum } from "../../template-string.js";
import { clamp } from "../../utils.js";

const lab = $item`Little Geneticist DNA-Splicing Lab`;

/**
 * @returns Whether or not you `have` DNA lab or it's installed
 */
export function have(): boolean {
  return haveItem(lab) || getWorkshed() === lab;
}

/**
 * @returns Whether the DNA Lab is your currently active workshed
 */
export function installed(): boolean {
  return getWorkshed() === lab;
}

const phylaEffects = new Map<Phylum, Effect>([
  [$phylum`beast`, $effect`Human-Beast Hybrid`],
  [$phylum`bug`, $effect`Human-Insect Hybrid`],
  [$phylum`constellation`, $effect`Human-Constellation Hybrid`],
  [$phylum`construct`, $effect`Human-Machine Hybrid`],
  [$phylum`demon`, $effect`Human-Demon Hybrid`],
  [$phylum`dude`, $effect`Human-Human Hybrid`],
  [$phylum`elemental`, $effect`Human-Elemental Hybrid`],
  [$phylum`elf`, $effect`Human-Elf Hybrid`],
  [$phylum`fish`, $effect`Human-Fish Hybrid`],
  [$phylum`goblin`, $effect`Human-Goblin Hybrid`],
  [$phylum`hippy`, $effect`Human-Hobo Hybrid`],
  [$phylum`horror`, $effect`Human-Horror Hybrid`],
  [$phylum`humanoid`, $effect`Human-Humanoid Hybrid`],
  [$phylum`mer-kin`, $effect`Human-Mer-kin Hybrid`],
  [$phylum`orc`, $effect`Human-Orc Hybrid`],
  [$phylum`penguin`, $effect`Human-Penguin Hybrid`],
  [$phylum`pirate`, $effect`Human-Pirate Hybrid`],
  [$phylum`plant`, $effect`Human-Plant Hybrid`],
  [$phylum`slime`, $effect`Human-Slime Hybrid`],
  [$phylum`undead`, $effect`Human-Undead Hybrid`],
  [$phylum`weird`, $effect`Human-Weird Thing Hybrid`],
]);

const phylaTonics = new Map<Phylum, Item>([
  [$phylum`beast`, $item`Gene Tonic: Beast`],
  [$phylum`bug`, $item`Gene Tonic: Insect`],
  [$phylum`constellation`, $item`Gene Tonic: Constellation`],
  [$phylum`construct`, $item`Gene Tonic: Construct`],
  [$phylum`demon`, $item`Gene Tonic: Demon`],
  [$phylum`dude`, $item`Gene Tonic: Humanoid`],
  [$phylum`elemental`, $item`Gene Tonic: Elemental`],
  [$phylum`elf`, $item`Gene Tonic: Elf`],
  [$phylum`fish`, $item`Gene Tonic: Fish`],
  [$phylum`goblin`, $item`Gene Tonic: Goblin`],
  [$phylum`hippy`, $item`Gene Tonic: Hobo`],
  [$phylum`horror`, $item`Gene Tonic: Horror`],
  [$phylum`humanoid`, $item`Gene Tonic: Humanoid`],
  [$phylum`mer-kin`, $item`Gene Tonic: Mer-kin`],
  [$phylum`orc`, $item`Gene Tonic: Orc`],
  [$phylum`penguin`, $item`Gene Tonic: Penguin`],
  [$phylum`pirate`, $item`Gene Tonic: Pirate`],
  [$phylum`plant`, $item`Gene Tonic: Plant`],
  [$phylum`slime`, $item`Gene Tonic: Slime`],
  [$phylum`undead`, $item`Gene Tonic: Undead`],
  [$phylum`weird`, $item`Gene Tonic: Weird`],
]);

const tonicEffects = Array.from(phylaEffects.values());

/**
 * Tells you whether you are currently hybridized. When passed with an input of any sort, tells you whether you are currently hybridized with that effect.
 *
 * @param tonic Optional input. When passed, the function returns whether that specific effect is hybridized.
 * @returns Whether the given tonic is currently hybridized
 */
export function isHybridized(tonic?: Effect | Phylum | Item): boolean {
  if (!tonic) return installed() && get("_dnaHybrid");
  const tonicEffect =
    tonic instanceof Effect
      ? tonic
      : tonic instanceof Phylum
        ? getEffect(tonic)
        : toEffect(getModifier("Effect", tonic));
  return (
    tonicEffects.includes(tonicEffect) && haveEffect(tonicEffect) === 2147483647
  );
}

/**
 * Returns the tonic item associated with a particular phylum.
 *
 * @param phylum The phylum in question.
 * @returns The tonic item associated with that phylum; returns $item.none for $phylum.none.
 */
export function getTonic(phylum: Phylum): Item {
  return phylaTonics.get(phylum) ?? $item.none;
  //return $item.none rather than null because it should never happen.
}

/**
 * Returns the tonic effect associated with a particular phylum.
 *
 * @param phylum The phylum in question.
 * @returns The tonic effect associated with that phylum; returns $effect.none for $phylum.none.
 */
export function getEffect(phylum: Phylum): Effect {
  return phylaEffects.get(phylum) ?? $effect.none;
  //return $effect.none rather than null because it should never happen
}

/**
 * Tells you which phylum to hunt down for a given effect or item.
 *
 * @param dnatype The tonic effect or item in question
 * @returns The Phylum associated with that effect or item; null if an invalid choice
 */
export function phylumFor(dnatype: Effect | Item): Phylum | null {
  if (dnatype instanceof Effect) {
    const phylumPair = Array.from(phylaEffects.entries()).find(
      ([, effect]) => effect === dnatype,
    );
    return phylumPair ? phylumPair[0] : null;
  } else {
    const phylumPair = Array.from(phylaTonics.entries()).find(
      ([, tonic]) => tonic === dnatype,
    );
    return phylumPair ? phylumPair[0] : null;
  }
}

/**
 * Hybridize yourself with the current contents of your syringe, if possible.
 *
 * @returns Whether or not we succeeded
 */
export function hybridize(): boolean {
  if (get("_dnaHybrid")) return false;
  if (!installed()) return false;
  const currentSyringe = get("dnaSyringe");
  if (!currentSyringe) return false;
  const tonicPotion = getTonic(currentSyringe);
  const expectedEffect = toEffect(getModifier("Effect", tonicPotion));
  cliExecute("camp dnainject");
  return isHybridized(expectedEffect);
}

/**
 * Makes tonics with whatever phylum is currently in your syringe
 *
 * @param {number} [amount=1] the number of tonics to make
 * @returns Whether we successfully made tonics; returns true if we made as many as we could, regardless of whether that was the number requested
 */
export function makeTonic(amount: 1 | 2 | 3 = 1): boolean {
  if (!installed()) return false;
  const currentSyringe = get("dnaSyringe");
  if (!currentSyringe) return false;
  const tonicPotion = getTonic(currentSyringe);
  const amountToMake = clamp(amount, 0, tonicsLeft());
  const startingAmount = itemAmount(tonicPotion);
  cliExecute(`camp dnapotion ${amountToMake}`);
  return itemAmount(tonicPotion) - startingAmount === amountToMake;
}

/**
 * Tells you how many tonics you can make the rest of the day.
 *
 * @returns The remaining tonics you can make
 */
export function tonicsLeft(): number {
  return clamp(3 - get("_dnaPotionsMade"), 0, 3);
}
