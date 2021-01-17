import { runCombat, visitUrl } from "kolmafia";
import { get } from "../property";

export function have(): boolean {
  return get("chateauAvailable");
}

export function paintingMonster(): Monster | null {
  return get("chateauMonster") ?? null;
}

export function paintingFought(): boolean {
  return get("_chateauMonsterFought");
}

export function fightPainting(): string {
  visitUrl("place.php?whichplace=chateau&action=chateau_painting", false);
  return runCombat();
}
