import { Monster } from "kolmafia";
import { Copier } from "../../Copier";
import { haveInCampground, have as haveItem } from "../../lib";
import { get } from "../../property";
import { $item } from "../../template-string";

/**
 * @returns Whether the Winter Garden is our currently installed garden
 */
export function have(): boolean {
  return haveInCampground($item`packet of winter seeds`);
}

/**
 * @returns Whether we have an unfinished ice sculpture hanging around
 */
export function haveUnfinishedIceSculpture(): boolean {
  return haveItem($item`unfinished ice sculpture`);
}

/**
 * @returns Whether or not we've used an unfinished ice sculpture today
 */
export function isUnfinishedIceSculptureUsed(): boolean {
  return get("_iceSculptureUsed");
}

/**
 * @returns Whether we're able to use an unfinished ice sculpture in combat right now
 */
export function couldUseUnfinishedIceSculpture(): boolean {
  return (
    haveItem($item`unfinished ice sculpture`) && !haveItem($item`ice sculpture`)
  );
}

/**
 * @returns Our current ice sculpture monster; `null` if none
 */
export function getUnfinishedIceSculptureMonster(): Monster | null {
  return get("iceSculptureMonster");
}

export const UnfinishedIceSculpture = new Copier(
  () => couldUseUnfinishedIceSculpture(),
  null,
  () => couldUseUnfinishedIceSculpture(),
  () => getUnfinishedIceSculptureMonster()
);
