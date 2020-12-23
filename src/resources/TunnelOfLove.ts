import {
  $item,
  have as haveItem,
  haveWandererCounter,
  property,
  Wanderer,
} from "..";
import { Copier } from "../Copier";

export function have(): boolean {
  return property.getBoolean("loveTunnelAvailable");
}

export function isUsed(): boolean {
  return property.getBoolean("_loveTunnelUsed");
}

export function haveLovEnamorang(): boolean {
  return haveItem($item`LOV Enamorang`);
}

export function getLovEnamorangUses(): number {
  return property.getNumber("_enamorangs");
}

export function couldUseLoveEnamorang(): boolean {
  return (
    !haveWandererCounter(Wanderer.Enamorang) &&
    getLovEnamorangUses() < 3 &&
    haveLovEnamorang()
  );
}

export function getLovEnamorangMonster(): Monster | null {
  return property.getMonster("enamorangMonster");
}

export const LovEnamorang = new Copier(
  () => couldUseLoveEnamorang(),
  null,
  () => couldUseLoveEnamorang(),
  () => getLovEnamorangMonster()
);
