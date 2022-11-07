import { Item, runChoice, visitUrl } from "kolmafia";
import { have as _have } from "../../lib";
import { $familiar, $item } from "../../template-string";

export function have(): boolean {
  return _have($familiar`Reagnimated Gnome`);
}

export const bodyParts = {
  ears: $item`gnomish swimmer's ears`,
  lung: $item`gnomish coal miner's lung`,
  elbow: $item`gnomish tennis elbow`,
  kgnee: $item`gnomish housemaid's kgnee`,
  foot: $item`gnomish athlete's foot`,
} as const;

export type BodyPart = keyof typeof bodyParts;

export function chosenPart(): Item | undefined {
  return Object.values(bodyParts).find((part) => _have(part));
}

export function choosePart(part: BodyPart): boolean {
  if (!have()) return false;
  if (!chosenPart()) {
    visitUrl("arena.php");
    runChoice(4);
  }
  return chosenPart() === bodyParts[part];
}

export function expectedAdvsPerCombat(weight: number): number {
  return 0.01 + weight / 1000;
}
