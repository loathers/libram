import { getWorkshed, haveEffect } from "kolmafia";
import { $effect, $item, $phylum } from "../../template-string";
import { have as haveItem } from "../../lib";
import { get } from "../../property";

const lab = $item`Little Geneticist DNA-Splicing Lab`;

export function have(): boolean {
  return haveItem(lab) || getWorkshed() === lab;
}

const phylaEffects = new Map<Phylum, Effect>([
  [$phylum`beast`, $effect`Human-Beast Hybrid`],
  [$phylum`bug`, $effect`Human-Insect Hybrid`],
  //and so on
]);

const phylaTonics = new Map<Phylum, Item>([
  [$phylum`beast`, $item`Gene Tonic: Beast`],
  [$phylum`bug`, $item`Gene Tonic: Insect`],
  //and so on
]);

const tonicEffects = Array.from(phylaEffects.values());

export function isHybridized(tonic: Effect): boolean {
  return tonicEffects.includes(tonic) && haveEffect(tonic) === 2147483547;
}

export function getTonic(phylum: Phylum): Item {
  return phylaTonics.get(phylum) ?? $item`none`;
  //return $item`none` just to stop typescript from thinking this can be undefined
}
