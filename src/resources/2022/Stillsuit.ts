import { cliExecute, Modifier, toModifier, visitUrl } from "kolmafia";
import { have as haveItem } from "../../lib.js";
import { get } from "../../property.js";
import { $item } from "../../template-string.js";

/**
 * Do you own a still-suit?
 * @returns Whether you have the tiny stillsuit
 */
export function have(): boolean {
  return haveItem($item`tiny stillsuit`);
}

/**
 * @returns the expected adventures from drinking stillsuit distillate
 */
export function distillateAdventures(): number {
  if (!have()) return 0;
  const sweat = get("familiarSweat");
  return Math.round(sweat ^ 0.4);
}

/**
 * Drinks stillsuit distillate
 * @returns whether distillate was successfully drunk
 */
export function drinkDistillate(): boolean {
  if (!have() || get("familiarSweat") <= 0) return false;
  cliExecute("drink stillsuit distillate");
  return true;
}

const modifierMap: Record<string, string> = {
  "Muscle Stats Per Fight": "Muscle Experience",
  "Mysticality Stats Per Fight": "Mysticality Experience",
  "Moxie Stats Per Fight": "Moxie Experience",
  "Item Drops from Monsters": "Item Drop",
  "Food Drops from Monsters": "Food Drop",
  "Combat Initiative": "Initiative",
  "Spooky Damage": "Spooky Damage",
  "Hot Damage": "Hot Damage",
  "Cold Damage": "Cold Damage",
  "Stench Damage": "Stench Damage",
  "Sleaze Damage": "Sleaze Damage",
  "Weapon Damage": "Weapon Damage",
  "Damage Reduction": "Damage Reduction",
  "Sleaze Spell Damage": "Sleaze Spell Damage",
  "Hot Spell Damage": "Hot Spell Damage",
  "Cold Spell Damage": "Cold Spell Damage",
  "Stench Spell Damage": "Stench Spell Damage",
  "Spooky Spell Damage": "Spooky Spell Damage",
};

// Regex to capture both "+X [modifier]" and "[modifier] +X" or "[modifier]: X"
const regex =
  /(?:\+(\d+)%?\s*(Muscle Stats Per Fight|Mysticality Stats Per Fight|Moxie Stats Per Fight|Item Drops from Monsters|Food Drops from Monsters|Combat Initiative|Spooky Damage|Hot Damage|Cold Damage|Stench Damage|Sleaze Damage|Weapon Damage|Damage Reduction|Sleaze Spell Damage|Hot Spell Damage|Cold Spell Damage|Stench Spell Damage|Spooky Spell Damage)|(?:Damage Reduction|Weapon Damage):?\s+(\d+))/g;

/**
 * Checks distillate for buffs
 * @returns an array of tuples with the standardized modifier and its numeric value
 */
export function distillateBuffs(): Array<[Modifier, number]> {
  const text = visitUrl("inventory.php?action=distill&pwd");
  const matches = [...text.matchAll(regex)]
    .map((match) => {
      // Extract value and modifier text
      const value = parseInt(match[1] ?? match[3], 10); // Supports both formats (before or after)
      const modifierText = match[2] || match[4];

      // Map to standardized modifier names
      const standardizedModifier = toModifier(modifierMap[modifierText]);

      // Return tuple if mapping exists
      return standardizedModifier ? [standardizedModifier, value] : null;
    })
    .filter((result): result is [Modifier, number] => result !== null); // Adjusted type predicate

  return matches;
}
