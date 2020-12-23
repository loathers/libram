import {
  $item,
  have as haveItem,
  haveWandererCounter,
  Wanderer,
  prop,
} from "..";
import { Copier } from "../Copier";

export function have(): boolean {
  return prop("loveTunnelAvailable");
}

export function isUsed(): boolean {
  return prop("_loveTunnelUsed");
}

export function haveLovEnamorang(): boolean {
  return haveItem($item`LOV Enamorang`);
}

export function getLovEnamorangUses(): number {
  return prop("_enamorangs");
}

export function couldUseLoveEnamorang(): boolean {
  return (
    !haveWandererCounter(Wanderer.Enamorang) &&
    getLovEnamorangUses() < 3 &&
    haveLovEnamorang()
  );
}

export function getLovEnamorangMonster(): Monster | null {
  return prop("enamorangMonster");
}

export const LovEnamorang = new Copier(
  () => couldUseLoveEnamorang(),
  null,
  () => couldUseLoveEnamorang(),
  () => getLovEnamorangMonster()
);
