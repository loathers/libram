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

export function chosenParts(): Item[] {
  return Object.values(bodyParts).filter((part) => _have(part));
}

export function choosePart(part: BodyPart): boolean {
  if (!have()) return false;
  if (_have(bodyParts[part])) return true;
  visitUrl("arena.php");
  runChoice(4);
  return chosenParts().includes(bodyParts[part]);
}

export function expectedAdvsPerCombat(weight: number): number {
  return Math.min(0.01 + weight / 1000, 1);
}
