import { myHash, runChoice, runCombat, toInt, visitUrl } from "kolmafia";
import { haveInCampground } from "../lib";
import { get } from "../property";
import { $item } from "../template-string";

export function have(): boolean {
  return haveInCampground($item`Witchess Set`);
}

export function fightsDone(): number {
  return get("_witchessFights");
}

export function fightPiece(piece: Monster): string {
  if (
    !visitUrl("campground.php?action=witchess").includes(
      "whichchoice value=1181"
    )
  ) {
    throw new Error("Failed to open Witchess.");
  }
  if (!runChoice(1).includes("whichchoice=1182")) {
    throw new Error("Failed to visit shrink ray.");
  }
  if (
    !visitUrl(
      `choice.php?option=1&pwd=${myHash()}&whichchoice=1182&piece=${toInt(
        piece
      )}`,
      false
    ).includes(piece.name)
  ) {
    throw new Error("Failed to start fight.");
  }
  return runCombat();
}
