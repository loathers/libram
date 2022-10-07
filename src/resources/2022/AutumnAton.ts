import {
  availableAmount,
  handlingChoice,
  Item,
  Location,
  runChoice,
  toLocation,
  totalTurnsPlayed,
  visitUrl,
  xpath,
} from "kolmafia";
import { get } from "../../property";

export const item = Item.get("Autumn-Aton");

export function available(): boolean {
  return availableAmount(item) > 0;
}

export function have(): boolean {
  return get("hasAutumnaton") || available();
}

function checkLocations(html: string): Location[] {
  return xpath(
    html,
    '//select[@name="heythereprogrammer"]//option[position()>1]/text()'
  ).map((name) => toLocation(name));
}

const use = () => visitUrl("inv_use.php?pwd&whichitem=10954");

export function sendTo(location: Location): boolean {
  if (!available()) return false;

  const pageHtml = use();
  const locationsAvailable = checkLocations(pageHtml);
  if (!locationsAvailable.includes(location)) return false;

  runChoice(2, `heythereprogrammer=${location.id}`);
  if (handlingChoice()) runChoice(3);
  return !available();
}

export function availableLocations(): Location[] {
  if (!available()) return [];
  const pageHtml = use();
  runChoice(3);
  return checkLocations(pageHtml);
}

export const possibleUpgrades = [
  "leftarm1",
  "leftleg1",
  "rightarm1",
  "rightleg1",
  "base_blackhat",
  "cowcatcher",
  "periscope",
  "radardish",
  "dualexhaust",
] as const;
export type Upgrade = typeof possibleUpgrades[number];

export function currentUpgrades(): Upgrade[] {
  return get("autumnatonUpgrades").split(",") as Upgrade[];
}

export function turnsLeft(): number {
  return get("autumnatonQuestTurn") - totalTurnsPlayed();
}

export function turnsForQuest(): number {
  return (
    11 *
    Math.max(
      get("_autumnatonQuests") -
        currentUpgrades().filter((u) => u.includes("leg")).length
    )
  );
}

export function visualAcuity(): 1 | 2 | 3 {
  const visualUpgrades = ["periscope", "radardish"];
  return (1 +
    currentUpgrades().filter((u) => visualUpgrades.includes(u)).length) as
    | 1
    | 2
    | 3;
}

export function zoneItems(): 3 | 4 | 5 {
  return (3 + currentUpgrades().filter((u) => u.includes("arm")).length) as
    | 3
    | 4
    | 5;
}

export function seasonalItems(): 1 | 2 {
  return currentUpgrades().includes("base_blackhat") ? 2 : 1;
}

export function currentlyIn(): Location | null {
  return get("autumnatonQuestLocation");
}
