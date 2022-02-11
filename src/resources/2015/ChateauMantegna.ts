import {
  buy,
  getChateau,
  Item,
  Monster,
  runCombat,
  totalFreeRests,
  visitUrl,
} from "kolmafia";
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

export function rest(): void {
  visitUrl("place.php?whichplace=chateau&action=chateau_restbox");
}

export function restIfFree(): boolean {
  if (totalFreeRests() > get("timesRested")) {
    visitUrl("place.php?whichplace=chateau&action=chateau_restbox");
    return true;
  } else return false;
}

const desks = [
  "fancy stationery set",
  "Swiss piggy bank",
  "continental juice bar",
] as const;
const ceilings = [
  "antler chandelier",
  "ceiling fan",
  "artificial skylight",
] as const;
const nightstands = [
  "foreign language tapes",
  "bowl of potpourri",
  "electric muscle stimulator",
] as const;

export type Desk = typeof desks[number];
export type Ceiling = typeof ceilings[number];
export type Nightstand = typeof nightstands[number];

export function getDesk(): Desk | null {
  return desks.find((desk) => Object.keys(getChateau()).includes(desk)) ?? null;
}

export function getCeiling(): Ceiling | null {
  return (
    ceilings.find((ceiling) => Object.keys(getChateau()).includes(ceiling)) ??
    null
  );
}

export function getNightstand(): Nightstand | null {
  return (
    nightstands.find((nightstand) =>
      Object.keys(getChateau()).includes(nightstand)
    ) ?? null
  );
}

export function changeDesk(desk: Desk): boolean {
  if (getDesk() === desk) return true;
  if (!desks.includes(desk)) return false;
  buy(Item.get(desk));
  return getDesk() === desk;
}

export function changeCeiling(ceiling: Ceiling): boolean {
  if (getCeiling() === ceiling) return true;
  if (!ceilings.includes(ceiling)) return false;
  buy(Item.get(ceiling));
  return getCeiling() === ceiling;
}

export function changeNightstand(nightstand: Nightstand): boolean {
  if (getNightstand() === nightstand) return true;
  if (!nightstands.includes(nightstand)) return false;
  buy(Item.get(nightstand));
  return getNightstand() === nightstand;
}
