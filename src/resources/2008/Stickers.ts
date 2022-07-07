import {
  availableAmount,
  equippedItem,
  haveSkill,
  Item,
  retrieveItem,
  toInt,
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

export function have(): boolean {
  return haveSkill($skill`Summon Stickers`);
}

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

export function makeSword(sticker: Sticker): void {
  if (weapon()) return;

  const id = toInt(stickers[sticker]);
  visitUrl(`bedazzle.php?action=juststick&sticker=${id}&pwd`);
}

export function foldWeapon(mode: keyof typeof weapons): boolean {
  const currentWep = weapon();
  if (!currentWep) return false;
  if (weapons[mode] === currentWep) return true;
  visitUrl("bedazzle.php?action=fold&pwd");
  return weapons[mode] === currentWep;
}

export function currentStickers(): [Item, Item, Item] {
  return $slots`sticker1, sticker2, sticker3`.map((s) => equippedItem(s)) as [
    Item,
    Item,
    Item
  ];
}

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
    visitUrl(
      `bedazzle.php?action=stick&slot=${i + 1}&sticker=${toInt(item)}&pwd`
    );
  }

  return currentStickers();
}
