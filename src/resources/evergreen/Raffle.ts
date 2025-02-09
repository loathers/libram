import {
  canAdventure,
  canInteract,
  cliExecute,
  descToItem,
  Location,
  myPath,
  Path,
  visitUrl,
} from "kolmafia";
import { tuple } from "../../utils.js";

/**
 * @returns Whether the player can access the raffle house.
 */
export function accessible() {
  return (
    canAdventure(Location.get("South of the Border")) &&
    myPath() !== Path.get("Zombie Slayer")
  );
}

function getRafflePrize(place: "First" | "Second", page: string) {
  const descId = new RegExp(
    `${place} Prize:</td><td><img class=hand onclick='descitem\\((\\d+)\\)`,
  ).exec(page);
  return descToItem(descId?.[1] ?? "");
}

/**
 * @returns tuple of First and Second place raffle prizes
 */
export function getRafflePrizes() {
  const page = visitUrl("raffle.php");
  return tuple(getRafflePrize("First", page), getRafflePrize("Second", page));
}

/**
 * @returns number of tickets player has purchased for today's raffle checked by the readout on raffle.php
 */
export function currentTickets() {
  const page = visitUrl("raffle.php");
  if (page.includes("You haven't bought any tickets for today's raffle."))
    return 0;
  return Number(
    /You have purchased ([\d,]+) tickets for today's raffle/
      .exec(page)?.[1]
      .replace(/,/g, "") ?? 0,
  );
}

/**
 * Purchase tickets up to a target total
 * @param quantity - target number of tickets to purchase
 */
export function buyTicketsUpTo(quantity: number) {
  const current = currentTickets();
  const needed = Math.max(0, quantity - current);
  cliExecute(`raffle ${needed} ${canInteract() ? "inventory" : "storage"}`);
}
