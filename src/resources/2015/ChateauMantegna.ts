import { buy, getChateau, runCombat, visitUrl } from "kolmafia";
import { $item, $items } from "../..";
import { get } from "../../property";

export function have(): boolean {
  return get("chateauAvailable");
}

export function paintingMonster(): Monster | null {
  return get("chateauMonster");
}

export function paintingFought(): boolean {
  return get("_chateauMonsterFought");
}

export function fightPainting(): string {
  visitUrl("place.php?whichplace=chateau&action=chateau_painting", false);
  return runCombat();
}

const desks = $items`Fancy Stationary Set, Swiss Piggy Bank, Continental Juice Bar`;
const ceilings = $items`Antler Chandelier, Ceiling Fan, Artificial Skylight`;
const nightstands = $items`Foreign Language Tapes, Bottle of Potpourri, Electric Muscle Stimulator`;

export function getDesk(): Item {
  return (
    desks.find((desk) =>
      Object.getOwnPropertyNames(getChateau()).includes(desk.name)
    ) || $item`none`
  );
}

export function getCeiling(): Item {
  return (
    ceilings.find((ceiling) =>
      Object.getOwnPropertyNames(getChateau()).includes(ceiling.name)
    ) || $item`none`
  );
}

export function getNightstand(): Item {
  return (
    nightstands.find((nightstand) =>
      Object.getOwnPropertyNames(getChateau()).includes(nightstand.name)
    ) || $item`none`
  );
}

export function changeDesk(desk: Item): boolean {
  if (getDesk() === desk) return true;
  if (!desks.includes(desk)) return false;
  buy(desk);
  return getDesk() === desk;
}

export function changeCeiling(ceiling: Item): boolean {
  if (getCeiling() === ceiling) return true;
  if (!ceilings.includes(ceiling)) return false;
  buy(ceiling);
  return getCeiling() === ceiling;
}

export function changeNightstand(nightstand: Item): boolean {
  if (getNightstand() === nightstand) return true;
  if (!nightstands.includes(nightstand)) return false;
  buy(nightstand);
  return getNightstand() === nightstand;
}
