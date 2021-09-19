import { choiceFollowsFight, myHash, runChoice, runCombat, toInt, visitUrl } from "kolmafia";
import { haveInCampground } from "../../lib";
import { get } from "../../property";
import { $item } from "../../template-string";

export const item = $item`Witchess Set`;
export function have(): boolean {
  return haveInCampground(item);
}

export function fightsDone(): number {
  return get("_witchessFights");
}

export const pieces = Monster.get([
  "Witchess Pawn",
  "Witchess Knight",
  "Witchess Bishop",
  "Witchess Rook",
  "Witchess Queen",
  "Witchess King",
  "Witchess Witch",
  "Witchess Ox",
]);
export function fightPiece(piece: Monster): void {
  if (!pieces.includes(piece)) throw new Error("That is not a valid piece.");
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
  runCombat();
  if (choiceFollowsFight()) visitUrl("choice.php");
}
