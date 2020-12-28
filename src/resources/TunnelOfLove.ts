import {
  $item,
  have as haveItem,
  haveWandererCounter,
  Wanderer,
  get,
} from "..";
import { Copier } from "../Copier";

export function have(): boolean {
  return get("loveTunnelAvailable");
}

export function isUsed(): boolean {
  return get("_loveTunnelUsed");
}

export function haveLovEnamorang(): boolean {
  return haveItem($item`LOV Enamorang`);
}

export function getLovEnamorangUses(): number {
  return get("_enamorangs");
}

export function couldUseLoveEnamorang(): boolean {
  return (
    !haveWandererCounter(Wanderer.Enamorang) &&
    getLovEnamorangUses() < 3 &&
    haveLovEnamorang()
  );
}

export function getLovEnamorangMonster(): Monster | null {
  return get("enamorangMonster");
}

export const LovEnamorang = new Copier(
  () => couldUseLoveEnamorang(),
  null,
  () => couldUseLoveEnamorang(),
  () => getLovEnamorangMonster()
);
