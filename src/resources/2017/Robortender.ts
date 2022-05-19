import { haveFamiliar, Item, Monster, Phylum } from "kolmafia";
import { get } from "../../property";
import { $familiar, $item, $phylum } from "../../template-string";

export const familiar = $familiar`Robortender`;

export function have(): boolean {
  return haveFamiliar(familiar);
}

const phylumDrops = new Map<Phylum, Item>([
  [$phylum`Bug`, $item`pickled grasshopper`],
  [$phylum`Constellation`, $item`bottle of anís`],
  [$phylum`Demon`, $item`bottle of novelty hot sauce`],
  [$phylum`Elemental`, $item`elemental sugarcube`],
  [$phylum`Elf`, $item`peppermint sprig`],
  [$phylum`Fish`, $item`bottle of clam juice`],
  [$phylum`Goblin`, $item`cocktail mushroom`],
  [$phylum`Hippy`, $item`shot of granola liqueur`],
  [$phylum`Hobo`, $item`can of cherry-flavored sterno`],
  [$phylum`Horror`, $item`lump of black ichor`],
  [$phylum`Humanoid`, $item`bottle of gregnadigne`],
  [$phylum`Mer-kin`, $item`bottle of Crème de Fugu`],
  [$phylum`Orc`, $item`baby oil shooter`],
  [$phylum`Penguin`, $item`fish head`],
  [$phylum`Pirate`, $item`limepatch`],
  [$phylum`Plant`, $item`pile of dirt`],
  [$phylum`Slime`, $item`slime shooter`],
  [$phylum`Weird`, $item`imaginary lemon`],
]);

export function dropFrom(target: Monster | Phylum): Item {
  const phylum = target instanceof Monster ? target.phylum : target;
  return phylumDrops.get(phylum) ?? $item`none`;
}

export function dropChance(): number {
  return [1, 0.5, 0.4, 0.4, 0.4, 0.3, 0.3, 0.3][get("_roboDrops")] ?? 0.2;
}
