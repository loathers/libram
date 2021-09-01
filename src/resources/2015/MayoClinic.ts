import { buy, getWorkshed, retrieveItem, toInt, use } from "kolmafia";
import { $item, get, have } from "../..";
import { withChoice } from "../../property";

export const Mayo = {
  nex: $item`Mayonex`,
  diol: $item`Mayodiol`,
  zapine: $item`Mayozapine`,
  flex: $item`Mayoflex`,
};

export function mindMayo(mayo: Item, quantity: number): void {
  if (getWorkshed() !== $item`portable Mayo Clinic`) return;
  if (!Object.values(Mayo).includes(mayo))
    throw `That is not mayo, I'm afraid.`;
  if (get("mayoInMouth") && get("mayoInMouth") !== mayo.name)
    throw `Your mouth is already full and it is not what you want.`; //Is this what we want?
  retrieveItem(quantity, mayo);
  if (!have($item`Mayo Minder™`)) buy($item`Mayo Minder™`);
  if (get("mayoMinderSetting") !== mayo.name) {
    withChoice(1076, toInt(mayo) - 8260, () => use($item`Mayo Minder™`));
  }
}
