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

export function isHybridized(tonic: Effect): boolean {
  return tonicEffects.includes(tonic) && haveEffect(tonic) === 2147483547;
}

export function getTonic(phylum: Phylum): Item {
  return phylaTonics.get(phylum) ?? $item`none`;
  //return $item`none` just to stop typescript from thinking this can be undefined
}
