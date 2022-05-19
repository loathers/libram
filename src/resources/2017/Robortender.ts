import { haveFamiliar, Item, Monster, Phylum } from "kolmafia";
import { get } from "../../property";
import { $familiar, $item, $phylum } from "../../template-string";

/**
 * The Robortender itself
 */
export const familiar = $familiar`Robortender`;

/**
 * @returns Whether you have the Robortender in your terrarium/available
 */
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

/**
 *
 * @param target The phylum or monster you want to know the robortender drop of
 * @returns The robortender drop associated with that phylum or monster
 */
export function dropFrom(target: Monster | Phylum): Item {
  const phylum = target instanceof Monster ? target.phylum : target;
  return phylumDrops.get(phylum) ?? $item`none`;
}

/**
 * Determines the probability of getting a robortender drop based on number of drops received
 * @param dropNumber The number of drops to assume you've already received; defaults to mafia's tracked amount
 * @returns The probability of getting a robort drop
 */
export function dropChance(dropNumber = get("_roboDrops")): number {
  return [1, 0.5, 0.4, 0.4, 0.4, 0.3, 0.3, 0.3][dropNumber] ?? 0.2;
}
