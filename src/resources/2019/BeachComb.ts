import { ensureEffect } from "../..";
import { getString } from "../../property";
import { $effect } from "../../template-string";

const heads = [
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
];

export function getHead(effect: Effect): void {
  if (!heads.includes(effect)) return;
  const headNumber = 1 + heads.indexOf(effect);
  if (getString("_beachHeadsUsed").split(",").includes(headNumber.toString()))
    return;
  ensureEffect(effect);
}
