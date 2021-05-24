import { adv1 } from "kolmafia";
import { Copier } from "../../Copier";
import { have as haveItem, haveWandererCounter, Wanderer } from "../../lib";
import { get, set } from "../../property";
import { $item, $location } from "../../template-string";

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

type LOVEquipment = "LOV Eardigan" | "LOV Epaulettes" | "LOV Earring";
type LOVEffect = "Lovebotamy" | "Open Heart Surgery" | "Wandering Eye Surgery";
type LOVExtra =
  | "LOV Enamorang"
  | "LOV Emotionizer"
  | "LOV Extraterrestrial Chocolate"
  | "LOV Echinacea Bouquet"
  | "LOV Elephant"
  | "toast"
  | null;

function equipmentChoice(equipment: LOVEquipment) {
  switch (equipment) {
    case "LOV Eardigan":
      return 1;
    case "LOV Epaulettes":
      return 2;
    case "LOV Earring":
      return 3;
  }
}

function effectChoice(effect: LOVEffect) {
  switch (effect) {
    case "Lovebotamy":
      return 1;
    case "Open Heart Surgery":
      return 2;
    case "Wandering Eye Surgery":
      return 3;
  }
}

function extraChoice(extra: LOVExtra) {
  switch (extra) {
    case "LOV Enamorang":
      return 1;
    case "LOV Emotionizer":
      return 2;
    case "LOV Extraterrestrial Chocolate":
      return 3;
    case "LOV Echinacea Bouquet":
      return 4;
    case "LOV Elephant":
      return 5;
    case "toast":
      return 6;
    case null:
      return 7;
  }
}

/**
 * Fight all LOV monsters and get buffs/equipment.
 * @param equipment Equipment to take from LOV.
 * @param effect Effect to take from LOV.
 * @param extra Extra item to take from LOV.
 */
export function fightAll(
  equipment: LOVEquipment,
  effect: LOVEffect,
  extra: LOVExtra
): void {
  set("choiceAdventure1222", 1); // Entrance
  set("choiceAdventure1223", 1); // Fight LOV Enforcer
  set("choiceAdventure1224", equipmentChoice(equipment));
  set("choiceAdventure1225", 1); // Fight LOV Engineer
  set("choiceAdventure1226", effectChoice(effect));
  set("choiceAdventure1227", 1); // Fight LOV Equivocator
  set("choiceAdventure1228", extraChoice(extra));
  adv1($location`The Tunnel of L.O.V.E.`, 0, () => "");
}
