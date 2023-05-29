import {
  availableAmount,
  equippedItem,
  haveSkill,
  Item,
  retrieveItem,
  visitUrl,
} from "kolmafia";
import { $item, $items, $skill, $slots } from "../../template-string";

export const stickers = {
  unicorn: $item`scratch 'n' sniff unicorn sticker`,
  apple: $item`scratch 'n' sniff apple sticker`,
  UPC: $item`scratch 'n' sniff UPC sticker`,
  wrestler: $item`scratch 'n' sniff wrestler sticker`,
  dragon: $item`scratch 'n' sniff dragon sticker`,
  rockband: $item`scratch 'n' sniff rock band sticker`,
} as const;

export type Sticker = keyof typeof stickers;

/**
 * @returns Whether the player has the Summon Stickers skill
 */
export function have(): boolean {
  return haveSkill($skill`Summon Stickers`);
}

/**
 * @returns The player's current sticker weapon
 */
export function weapon(): Item | null {
  return (
    $items`scratch 'n' sniff sword, scratch 'n' sniff crossbow`.find((i) =>
      availableAmount(i)
    ) ?? null
  );
}

const weapons = {
  sword: $item`scratch 'n' sniff sword`,
  crossbow: $item`scratch 'n' sniff crossbow`,
};

/**
 * Make a sword
 *
 * @param sticker Sticker to use when making the sword
 */
export function makeSword(sticker: Sticker): void {
  if (weapon()) return;
  visitUrl(`bedazzle.php?action=juststick&sticker=${stickers[sticker].id}&pwd`);
}

/**
 * Change weapon mode
 *
 * @param mode New weapon mode
 * @returns Success
 */
export function foldWeapon(mode: keyof typeof weapons): boolean {
  const currentWep = weapon();
  if (!currentWep) return false;
  if (weapons[mode] === currentWep) return true;
  visitUrl("bedazzle.php?action=fold&pwd");
  return weapons[mode] === currentWep;
}

/**
 * Get current stickers on sticker weapon
 *
 * @returns Tuple of stickers
 */
export function currentStickers(): [Item, Item, Item] {
  return $slots`sticker1, sticker2, sticker3`.map((s) => equippedItem(s)) as [
    Item,
    Item,
    Item
  ];
}

/**
 * Set configuration for sticker weapon
 *
 * @param options Tuple of either sticker or null
 * @returns Resultant configuration
 */
export function setStickers(
  ...options: [Sticker | null, Sticker | null, Sticker | null]
): [Item, Item, Item] {
  for (const s of options) {
    if (s) retrieveItem(stickers[s], options.filter((x) => x === s).length);
  }

  visitUrl("bedazzle.php");
  const start = currentStickers();

  for (let i = 0; i <= 2; i++) {
    const sticker = options[i];
    if (!sticker) continue;
    const item = stickers[sticker];
    if (start[i] === item) continue;
    visitUrl(`bedazzle.php?action=peel&slot=${i + 1}&pwd`);
    visitUrl(`bedazzle.php?action=stick&slot=${i + 1}&sticker=${item.id}&pwd`);
  }

  return currentStickers();
}
