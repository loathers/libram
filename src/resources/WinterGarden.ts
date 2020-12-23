import { $item, haveInCampground, have as haveItem, property } from "..";
import { Copier } from "../Copier";

export function have() {
  return haveInCampground($item`packet of winter seeds`);
}

export function haveUnfinishedIceSculpture() {
  return haveItem($item`unfinished ice sculpture`);
}

export function isUnfinishedIceSculptureUsed() {
  return property.getNumber("_iceSculptureUsed");
}

export function couldUseUnfinishedIceSculpture() {
  return (
    haveItem($item`unfinished ice sculpture`) &&
    !haveItem($item`finished ice sculpture`)
  );
}

export function getUnfinishedIceSculptureMonster() {
  return property.getMonster("iceSculptureMonster");
}
export const UnfinishedIceSculpture = new Copier(
  () => couldUseUnfinishedIceSculpture(),
  null,
  () => couldUseUnfinishedIceSculpture(),
  () => getUnfinishedIceSculptureMonster()
);
