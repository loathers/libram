import { adv1, Monster } from "kolmafia";
import { Copier } from "../../Copier.js";
import { have as haveItem, haveWandererCounter, Wanderer } from "../../lib.js";
import { get, withChoices } from "../../property.js";
import { $item, $location } from "../../template-string.js";

/**
 * @returns Is the love tunnel available?
 */
export function have(): boolean {
  return get("loveTunnelAvailable");
}

/**
 * @returns Have we visited the love tunnel yet today?
 */
export function isUsed(): boolean {
  return get("_loveTunnelUsed");
}

/**
 * @returns Do we `have` an Enamorang?
 */
export function haveLovEnamorang(): boolean {
  return haveItem($item`LOV Enamorang`);
}

/**
 * @returns How many enamorangs have we used today?
 */
export function getLovEnamorangUses(): number {
  return get("_enamorangs");
}

/**
 * @returns Can we currently use an enamorang?
 */
export function couldUseLoveEnamorang(): boolean {
  return (
    !haveWandererCounter(Wanderer.Enamorang) &&
    getLovEnamorangUses() < 3 &&
    haveLovEnamorang()
  );
}

/**
 * @returns The Monster currently in our enamorang; `null` for none
 */
export function getLovEnamorangMonster(): Monster | null {
  return get("enamorangMonster");
}

export const LovEnamorang = new Copier(
  () => couldUseLoveEnamorang(),
  null,
  () => couldUseLoveEnamorang(),
  () => getLovEnamorangMonster(),
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

/**
 * Internal function used for `fightAll`
 *
 * @param equipment The equipment to select from the tunnel
 * @returns The relevant choice option
 */
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

/**
 *Internal function used for `fightAll`
 *
 * @param effect The effect to select from the tunnel
 * @returns The relevant choice option
 */
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

/**
 * Internal function used for `fightAll`
 *
 * @param extra The extra item to select from the tunnel
 * @returns The relevant choice option
 */
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
 *
 * @param equipment Equipment to take from LOV.
 * @param effect Effect to take from LOV.
 * @param extra Extra item to take from LOV.
 */
export function fightAll(
  equipment: LOVEquipment,
  effect: LOVEffect,
  extra: LOVExtra,
): void {
  withChoices(
    {
      1222: 1,
      1223: 1,
      1224: equipmentChoice(equipment),
      1225: 1,
      1226: effectChoice(effect),
      1227: 1,
      1228: extraChoice(extra),
    },
    () => {
      adv1($location`The Tunnel of L.O.V.E.`, 0, "");
    },
  );
}
