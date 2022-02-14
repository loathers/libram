import { Monster, use } from "kolmafia";

import { getFoldGroup, have as haveItem } from "../../lib";
import { get } from "../../property";
import { $item } from "../../template-string";

export const box = $item`Rain-Doh black box`;

export function have(): boolean {
  return getFoldGroup(box).some((item) => haveItem(item));
}

export function getRainDohBlackBoxCopiesMade(): number {
  return Math.max(0, get("_raindohCopiesMade"));
}

export function getRainDohBlackBoxMonster(): Monster | null {
  return get("rainDohMonster");
}

export function useRainDohBlackBox(): boolean {
  return use(box);
}
