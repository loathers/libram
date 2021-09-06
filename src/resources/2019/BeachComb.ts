import { cliExecute } from "kolmafia";
import { have } from "../../lib";
import { getString } from "../../property";
import { $effect } from "../../template-string";

export const headBuffs = [
  $effect`Hot-Headed`,
  $effect`Cold as Nice`,
  $effect`A Brush with Grossness`,
  $effect`Does It Have a Skull In There??`,
  $effect`Oiled, Slick`,
  $effect`Lack of Body-Building`,
  $effect`We're All Made of Starfish`,
  $effect`Pomp & Circumsands`,
  $effect`Resting Beach Face`,
  $effect`Do I Know You From Somewhere?`,
  $effect`You Learned Something Maybe!`,
] as const;

export function tryHead(effect: Effect): boolean {
  if (!headBuffs.includes(effect)) return false;
  const headNumber = 1 + headBuffs.indexOf(effect);
  if (getString("_beachHeadsUsed").split(",").includes(headNumber.toString()))
    return false;
  cliExecute(effect.default);
  return have(effect);
}
