import { cliExecute, visitUrl } from "kolmafia";
import { Modifiers } from "../..";
import { get } from "../../property";

/**
 * @returns Whether or not the horsery is available
 */
export function have(): boolean {
  return get("horseryAvailable");
}

export type Horse = "pale" | "dark" | "normal" | "crazy";

/**
 * @returns Your current horse; `null` if you are horseless
 */
export function current(): Horse | null {
  return (get("_horsery") || null) as Horse | null;
}

/**
 * @param horse The horse to change to
 * @returns Whether, at the end of all things, that is your horse
 */
export function changeHorse(horse: Horse): boolean {
  cliExecute(`horsery ${horse}`);
  return current() === horse;
}

/**
 * @returns a `Modifiers` object consisting of the crazy horse's stats today
 */
export function crazyHorseStats(): Modifiers {
  if (!have()) return {};

  if (!get("_horseryCrazyName")) {
    visitUrl("place.php?whichplace=town_right&action=town_horsery");
  }

  return {
    "Mysticality Percent": Number(get("_horseryCrazyMys")),
    "Muscle Percent": Number(get("_horseryCrazyMus")),
    "Moxie Percent": Number(get("_horseryCrazyMox")),
  };
}
