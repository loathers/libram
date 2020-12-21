import {
  $item,
  have as haveItem,
  haveWandererCounter,
  property,
  Wanderer,
} from "..";
import { Copier } from "../Copier";

export function have() {
  return property.getBoolean("loveTunnelAvailable");
}

export function isUsed() {
  return property.getBoolean("_loveTunnelUsed");
}

export function haveLovEnamorang() {
  return haveItem($item`LOV Enamorang`);
}

export function getLovEnamorangUses() {
  return property.getNumber("_enamorangs");
}

export function couldUseLoveEnamorang() {
  return (
    !haveWandererCounter(Wanderer.Enamorang) &&
    getLovEnamorangUses() < 3 &&
    haveLovEnamorang()
  );
}

export function getLovEnamorangMonster() {
  return property.getMonster("enamorangMonster");
}

export const LovEnamorang = new Copier(
  () => couldUseLoveEnamorang(),
  null,
  () => couldUseLoveEnamorang(),
  () => getLovEnamorangMonster()
);
