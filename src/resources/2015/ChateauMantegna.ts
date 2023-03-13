import { buy, getChateau, Item, Monster, runCombat, visitUrl } from "kolmafia";
import { get } from "../../property";

/**
 * @returns Whether we own the Chateau Mantegna
 */
export function have(): boolean {
  return get("chateauAvailable");
}

/**
 * @returns `null` for an empty painting; otherwise, the monster trapped in our painting
 */
export function paintingMonster(): Monster | null {
  return get("chateauMonster");
}

/**
 * @returns Whether or not we've fought our painted monster today
 */
export function paintingFought(): boolean {
  return get("_chateauMonsterFought");
}

/**
 * Fights your currently installed painting monster if able
 *
 * @returns The result of `runCombat`, which is the page html of the final round of combat
 */
export function fightPainting(): string {
  visitUrl("place.php?whichplace=chateau&action=chateau_painting", false);
  return runCombat();
}

export const desks = [
  "fancy stationery set",
  "Swiss piggy bank",
  "continental juice bar",
] as const;
export const ceilings = [
  "antler chandelier",
  "ceiling fan",
  "artificial skylight",
] as const;
export const nightstands = [
  "foreign language tapes",
  "bowl of potpourri",
  "electric muscle stimulator",
] as const;

export type Desk = typeof desks[number];
export type Ceiling = typeof ceilings[number];
export type Nightstand = typeof nightstands[number];

/**
 * @returns The currently installed desk in your chateau; `null` for none
 */
export function getDesk(): Desk | null {
  return desks.find((desk) => Object.keys(getChateau()).includes(desk)) ?? null;
}

/**
 * @returns The currently installed ceiling in your chateau; `null` for none
 */
export function getCeiling(): Ceiling | null {
  return (
    ceilings.find((ceiling) => Object.keys(getChateau()).includes(ceiling)) ??
    null
  );
}

/**
 * @returns The currently installed nightstand in your chateau; `null` for none
 */
export function getNightstand(): Nightstand | null {
  return (
    nightstands.find((nightstand) =>
      Object.keys(getChateau()).includes(nightstand)
    ) ?? null
  );
}

/**
 * @param desk The desk to change to
 * @returns Whether our desk currently matches the one requested
 */
export function changeDesk(desk: Desk): boolean {
  if (getDesk() === desk) return true;
  if (!desks.includes(desk)) return false;
  buy(Item.get(desk));
  return getDesk() === desk;
}

/**
 * @param ceiling The ceiling to change to
 * @returns Whether our ceiling currently matches the one requested
 */
export function changeCeiling(ceiling: Ceiling): boolean {
  if (getCeiling() === ceiling) return true;
  if (!ceilings.includes(ceiling)) return false;
  buy(Item.get(ceiling));
  return getCeiling() === ceiling;
}

/**
 * @param nightstand The nightstand to change to
 * @returns Whether our nightstand currently matches the one requested
 */
export function changeNightstand(nightstand: Nightstand): boolean {
  if (getNightstand() === nightstand) return true;
  if (!nightstands.includes(nightstand)) return false;
  buy(Item.get(nightstand));
  return getNightstand() === nightstand;
}
