import { cliExecute, getWorkshed, haveEffect, itemAmount } from "kolmafia";
import { $effect, $item, $phylum } from "../../template-string";
import { have as haveItem } from "../../lib";
import { get } from "../../property";
import { get as getModifier } from "../../modifier";
import { clamp } from "../../utils";

const lab = $item`Little Geneticist DNA-Splicing Lab`;

/**
 * Checks if you have DNA lab in inventory or installed
 */
export function have(): boolean {
  return haveItem(lab) || getWorkshed() === lab;
}

/**
 * Checks if you have DNA lab installed
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
 * Checks to see if you're hybridized, optionally with a specific phylum
 * @param {Phylum} [phylum] the phylum you're checking
 */
export function isHybridized(phylum?: Phylum): boolean {
  if (!installed()) return false;
  else if (phylum) {
    return (
      tonicEffects.includes(phylaEffects.get(phylum) ?? $effect`none`) &&
      haveEffect(phylaEffects.get(phylum) ?? $effect`none`) === 2147483547
    );
  } else {
    return get("_dnaHybrid");
  }
}

/**
 * returns the gene tonic for a specified phylum
 * @param {Phylum} phylum The phylum for which to get the associated tonic
 * @returns The gene tonic associated with the phylum
 */
export function getTonic(phylum: Phylum): Item {
  return phylaTonics.get(phylum) ?? $item`none`;
  //return $item`none` rather than null because it should never happen
}

/**
 * Returns the hybrid effect for a specified phylum
 * @param {Phylum} phylum the phylum to check
 * @returns The effect given by that phylum's DNA
 */
export function getEffect(phylum: Phylum): Effect {
  return phylaEffects.get(phylum) ?? $effect`none`;
  //return $effect`none` rather than null because it should never happen
}

export function phylumFor(dnatype: Effect | Item): Phylum | null {
  if (dnatype instanceof Effect) {
    const phylumPair = Array.from(phylaEffects.entries()).find(
      ([, effect]) => effect === dnatype
    );
    return phylumPair ? phylumPair[0] : null;
  } else {
    const phylumPair = Array.from(phylaTonics.entries()).find(
      ([, tonic]) => tonic === dnatype
    );
    return phylumPair ? phylumPair[0] : null;
  }
}

export function hybridize(): boolean {
  if (get("_dnaHybrid")) return false;
  if (!installed()) return false;
  const currentSyringe = get("dnaSyringe");
  if (!currentSyringe) return false;
  const tonicPotion = phylaTonics.get(currentSyringe);
  if (!tonicPotion) return false; //this line should never trigger
  const expectedEffect = getModifier("Effect", tonicPotion);
  cliExecute("camp dnainject");
  return isHybridized(expectedEffect);
}

export function makeTonic(amount: 1 | 2 | 3 = 1): boolean {
  if (!installed()) return false;
  const currentSyringe = get("dnaSyringe");
  if (!currentSyringe) return false;
  const tonicPotion = phylaTonics.get(currentSyringe);
  const amountToMake = clamp(amount, 0, 3 - get("_dnaPotionsMade"));
  if (!tonicPotion) return false; //this line should never trigger
  const startingAmount = itemAmount(tonicPotion);
  cliExecute(`camp dnapotion ${amountToMake}`);
  return itemAmount(tonicPotion) - startingAmount === amountToMake;
}
