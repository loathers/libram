import { cliExecute } from "kolmafia";
import { have as have_ } from "../../lib";
import { get } from "../../property";
import { $item } from "../../template-string";
import { clamp } from "../../utils";

/**
 * @returns Do we `have` the Deck of Every Card?
 */
export function have(): boolean {
  return have_($item`Deck of Every Card`);
}

export const cards = Object.freeze([
  "X of Clubs",
  "X of Diamonds",
  "X of Hearts",
  "X of Spades",
  "X of Papayas",
  "X of Kumquats",
  "X of Salads",
  "X of Cups",
  "X of Coins",
  "X of Swords",
  "X of Wands",
  "XVI - The Tower",
  "Professor Plum",
  "Spare Tire",
  "Extra Tank",
  "Sheep",
  "Year of Plenty",
  "Mine",
  "Laboratory",
  "Plains",
  "Swamp",
  "Mountain",
  "Forest",
  "Island",
  "Lead Pipe",
  "Rope",
  "Wrench",
  "Candlestick",
  "Knife",
  "Revolver",
  "Gift Card",
  "1952 Mickey Mantle",
  "XXI - The World",
  "III - The Empress",
  "VI - The Lovers",
  "Healing Salve",
  "Dark Ritual",
  "Lightning Bolt",
  "Giant Growth",
  "Ancestral Recall",
  "XI - Strength",
  "I - The Magician",
  "0 - The Fool",
  "X - The Wheel of Fortune",
  "The Race Card",
  "Green Card",
  "IV - The Emperor",
  "IX - The Hermit",
  "Werewolf",
  "The Hive",
  "XVII - The Star",
  "VII - The Chariot",
  "XV - The Devil",
  "V - The Hierophant",
  "Fire Elemental",
  "Christmas Card",
  "Go Fish",
  "Goblin Sapper",
  "II - The High Priestess",
  "XIV - Temperance",
  "XVIII - The Moon",
  "Hunky Fireman Card",
  "Aquarius Horoscope",
  "XII - The Hanged Man",
  "Suit Warehouse Discount Card",
  "Pirate Birthday Card",
  "Plantable Greeting Card",
  "Slimer Trading Card",
  "XIII - Death",
  "Unstable Portal",
] as const);

export type Card = typeof cards[number];

/**
 * @returns The number of cards we've drawn so far today--remember, cheating counts as 5
 */
export function getCardsDrawn(): number {
  return clamp(get("_deckCardsDrawn"), 0, 15);
}

/**
 * @returns The number of draws we have remaining today--remember, cheating counts as 5
 */
export function getRemainingDraws(): number {
  return 15 - getCardsDrawn();
}

/**
 * @returns The number of additional cards we can cheat today
 */
export function getRemainingCheats(): number {
  return Math.floor(getRemainingDraws() / 5);
}

/**
 * @returns An array of the Cards we've seen today
 */
export function getCardsSeen(): Card[] {
  return get("_deckCardsSeen")
    ? (get("_deckCardsSeen").split("|") as Card[])
    : [];
}

/**
 * Cheat a card of your choice from the Deck
 *
 * @param card The card in question
 * @returns `true` if we succeed or if we've already cheated that card today; `false` if we fail or are out of draws/cheats for the day.
 */
export function cheatCard(card: Card): boolean {
  if (getCardsSeen().includes(card)) return true;
  if (getRemainingDraws() < 5) return false;
  return cliExecute(`cheat ${card}`);
}
