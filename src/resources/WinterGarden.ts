import { Copier } from "../Copier";
import { get } from "../property";
import { have as haveItem, haveInCampground } from "../lib";
import { $item } from "../template-string";

export function have(): boolean {
  return haveInCampground($item`packet of winter seeds`);
}

export function haveUnfinishedIceSculpture(): boolean {
  return haveItem($item`unfinished ice sculpture`);
}

export function isUnfinishedIceSculptureUsed(): boolean {
  return get("_iceSculptureUsed");
}

export function couldUseUnfinishedIceSculpture(): boolean {
  return (
    haveItem($item`unfinished ice sculpture`) &&
    !haveItem($item`finished ice sculpture`)
  );
}

export function getUnfinishedIceSculptureMonster(): Monster | null {
  return get("iceSculptureMonster");
}

export const UnfinishedIceSculpture = new Copier(
  () => couldUseUnfinishedIceSculpture(),
  null,
  () => couldUseUnfinishedIceSculpture(),
  () => getUnfinishedIceSculptureMonster()
);
