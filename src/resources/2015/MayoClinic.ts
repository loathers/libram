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
  if (get("mayoInMouth") && get("mayoInMouth") !== mayo.name)
    throw `You used a bad mayo, my friend!`; //Is this what we want?
  retrieveItem(quantity, mayo);
  if (!have($item`Mayo Minder™`)) buy($item`Mayo Minder™`);
  if (get("mayoMinderSetting") !== mayo.name) {
    withChoice(1076, toInt(mayo) - 8260, () => use($item`Mayo Minder™`));
  }
}
