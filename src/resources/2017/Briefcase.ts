import { abort, stringModifier, visitUrl } from "kolmafia";

import { have as haveItem } from "../../lib";
import logger from "../../logger";
import { get } from "../../property";
import { $item } from "../../template-string";

const briefcase = $item`Kremlin's Greatest Briefcase`;

/**
 * @returns Whether the player has a KGB
 */
export function have(): boolean {
  return haveItem(briefcase);
}

/*
 * Utility
 */
function getPage(): string {
  return visitUrl("place.php?whichplace=kgb", false, false);
}

function act(action: string): string {
  return visitUrl(
    `place.php?whichplace=kgb&action=kgb_${action}`,
    false,
    false
  );
}

/**
 * Resets the KGB state
 */
export function reset(): void {
  let reset = false;
  while (reset === false) {
    setHandle(true);
    reset = !setHandle(false).includes("You flip the handle down");
  }
}

/**
 * @returns Number of clicks remaining today
 */
export function clicksRemaining(): number {
  return (get("_kgbFlywheelCharged") ? 22 : 11) - get("_kgbClicksUsed");
}

/*
 * Dials
 */
type DialsSide = [number, number, number];
type Dials = [...DialsSide, ...DialsSide];

/**
 * @param page Page content to read, else it will read the page itself
 * @returns The six digits representing all of the dials
 */
export function getDials(page = getPage()): Dials {
  return [...page.matchAll(/action=kgb_dial(\d)>.*?char(\d|a).gif/g)]
    .map(
      ([, dial, value]) =>
        [Number(dial) - 1, value === "a" ? 10 : Number(value)] as const
    )
    .sort(([a], [b]) => a - b)
    .map(([, value]) => value) as Dials;
}

function getDialsSide(left: boolean, page = getPage()): DialsSide {
  return getDials(page).slice(left ? 0 : 3, left ? 3 : 6) as DialsSide;
}

/**
 * Sets the dials on the KGB to a given state
 *
 * @param dials Desired dial state
 */
export function setDials(...dials: Dials): void {
  let state = getDials();
  dials.forEach((value, index) => {
    while (state[index] !== value) {
      const result = act(`dial${index + 1}`);
      state = getDials(result);
    }
    logger.debug(`[KGB] Set dial ${index + 1} to ${value}`);
  });
}

function setDialsSide(left: boolean, ...dials: DialsSide): void {
  const state = getDials();
  state.splice(left ? 0 : 3, left ? 3 : 6, ...dials);
  return setDials(...state);
}

/*
 * Lights
 */
type LightState = "on" | "blinking" | "off";
type Lights = [
  LightState,
  LightState,
  LightState,
  LightState,
  LightState,
  LightState
];
type MastermindLights = [LightState, LightState, LightState];
type Mastermind = [solid: number, blinking: number];

export function getLightSet(id: "light", page: string): Lights;
export function getLightSet(id: "mastermind", page: string): MastermindLights;
/**
 * @param id Type of lights to read
 * @param page Page content to read, else it will read the page itself
 * @returns State of the lights requested
 */
export function getLightSet(
  id: "light" | "mastermind",
  page = getPage()
): Lights | MastermindLights {
  const regex = new RegExp(
    `id=kgb_${id}(\\d) .*?/light_(on|blinking|off).gif`,
    "g"
  );
  return [...page.matchAll(regex)]
    .map(
      ([, light, value]) => [Number(light) - 1, value as LightState] as const
    )
    .sort(([a], [b]) => a - b)
    .map(([, value]) => value) as Lights | MastermindLights;
}

/**
 * @param page Page content to read, else it will read the page itself
 * @returns State of the standard lights
 */
export function getLights(page = getPage()): Lights {
  return getLightSet("light", page);
}

/**
 * @param page Page content to read, else it will read the page itself
 * @returns State of the mastermind lights
 */
export function getMastermind(page = getPage()): Mastermind {
  const lights = getLightSet("mastermind", page);
  return [
    lights.filter((l) => l === "on").length,
    lights.filter((l) => l === "blinking").length,
  ];
}

const ALL_POSSIBILITIES = (function getAllPossibilities() {
  const possibilities: DialsSide[] = [];
  for (let i = 0; i < 11; i++) {
    for (let j = 0; j < 11; j++) {
      for (let k = 0; k < 11; k++) {
        possibilities.push([i, j, k] as DialsSide);
      }
    }
  }
  return possibilities;
})();

const ALL_SCORES = (function getAllScores() {
  const scores: Mastermind[] = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      scores.push([i, j] as Mastermind);
    }
  }
  return scores;
})();

function calculateScore(answer: DialsSide, guess: DialsSide): Mastermind {
  const solid = answer.reduce((acc, a, i) => acc + (guess[i] === a ? 1 : 0), 0);
  const blink = answer.reduce(
    (acc, a) => acc + (guess.includes(a) ? 1 : 0),
    -solid
  );
  return [solid, blink];
}

function eliminate(
  guess: DialsSide,
  score: Mastermind,
  possibilities = ALL_POSSIBILITIES
) {
  return possibilities.filter((poss) => calculateScore(poss, guess).join(",") === score.join(","));
}

/**
 * Minimax function as described by Donald Knuth
 * http://www.cs.uni.edu/~wallingf/teaching/cs3530/resources/knuth-mastermind.pdf
 *
 * @param possibilities The set of possibilities to test
 * @returns Guess that minimizes the maximum number of remaining possiblities
 */
function minimax(possibilities: DialsSide[]): DialsSide {
  let bestGuess = possibilities[0];
  let minimaxValue = possibilities.length;

  for (const guess of possibilities) {
    const maxRemainingPossibilites = Math.max(
      ...ALL_SCORES.map(
        (score) =>
          possibilities.length - eliminate(guess, score, possibilities).length
      )
    );
    if (maxRemainingPossibilites < minimaxValue) {
      minimaxValue = maxRemainingPossibilites;
      bestGuess = guess;
    }
  }

  return bestGuess;
}

/**
 * Solve the mastermind puzzle on the Briefcase
 *
 * @param left True if aim is to solve the left side, else solve the right side
 */
export function solveMastermind(left: boolean): void {
  unlockButtons();
  const page = getPage();
  let guess = getDialsSide(left, page);
  let score = getMastermind(page);
  let possibilities = undefined;

  while (score[0] < 3) {
    logger.debug(
      `[KGB] ${guess.join(",")} on the ${left ? "left" : "right"} has ${
        score[0]
      } on and ${score[1]} flashing`
    );
    possibilities = eliminate(guess, score, possibilities);
    guess = minimax(possibilities);
    logger.debug(
      `[KGB] Guessing ${guess.join(",")} on the ${
        left ? "left" : "right"
      } (from ${possibilities.length} possibilities)`
    );
    setDialsSide(left, ...guess);
    score = getMastermind(pressActuator(left));
  }
}

/**
 * Solve the first light puzzle
 */
export function solveLight1(): void {
  const page = getPage();
  const lights = getLights(page);
  switch (lights[1]) {
    case "on":
      return;
    case "blinking":
      pressRightActuator();
      return;
    case "off":
      pressLeftActuator();
      pressRightActuator();
      return;
  }
}

/**
 * Solve the second light puzzle
 */
export function solveLight2(): void {
  unlockButtons();
  solveMastermind(true);
  pressRightActuator();
  solveMastermind(false);
}

/*
 * Handle
 */

/**
 * @param page Page content to read, else it will read the page itself
 * @returns Handle position
 */
export function getHandle(page = getPage()): boolean {
  return /kgb\/handle(up|down)/.exec(page)?.[1] === "up";
}

/**
 * @param up Set handle position
 * @returns Page content after position is set
 */
export function setHandle(up: boolean): string {
  logger.debug(`[KGB] Set handle ${up ? "up" : "down"}`);
  return act(`handle${up ? "down" : "up"}`);
}

/*
 * Actuators
 */

/**
 * Press an actuator
 *
 * @param left True to press the left actuator, else the right
 * @returns Page content after actuator is pressed
 */
export function pressActuator(left: boolean): string {
  logger.debug(`[KGB] Pressed ${left ? "left" : "right"} actuator`);
  return act(`actuator${left ? 1 : 2}`);
}

/**
 * Press the left actuator
 *
 * @returns Page content after actuator is pressed
 */
export function pressLeftActuator(): string {
  return pressActuator(true);
}

/**
 * Press the right actuator
 *
 * @returns Page content after actuator is pressed
 */
export function pressRightActuator(): string {
  return pressActuator(false);
}

/*
 * Crank
 */

/**
 * @param page Page content to read, else it will read the page itself
 * @returns Whether the crank is currently unlocked
 */
export function crankUnlocked(page = getPage()): boolean {
  return page.includes("crank.gif");
}

/**
 * Use the crank
 *
 * @param level Level to which the crank should be charged
 */
export function useCrank(level = 1): void {
  let current = 0;
  while (current < level) {
    const result = act(`crank`);
    if (result.includes("capacitor charging")) {
      current = antennaeUnlocked(result);
      logger.debug(`[KGB] Capacity spun to level ${current}`);
    } else {
      current = /spinning up(\.+)/.exec(result)?.[1].length ?? current + 1;
      logger.debug(`[KGB] Flywheel spun to level ${current}`);
    }
  }
}

/**
 * Unlock the crank
 *
 * @returns Whether the crank was successfully unlocked
 */
export function unlockCrank(): boolean {
  if (crankUnlocked()) return true;
  solveLight1();
  setDials(0, 0, 0, 0, 0, 0);
  setHandle(false);
  pressLeftActuator();
  return crankUnlocked();
}

/**
 * Charge the flywheel
 *
 * @returns Whether the flywheel was successfully charged
 */
export function chargeFlywheel(): boolean {
  if (get("_kgbFlywheelCharged")) return true;
  unlockCrank();
  setHandle(true);
  useCrank(11);
  return setHandle(false).includes("The case emanates warmth.");
}

/**
 * @param page Page content to read, else it will read the page itself
 * @returns The charge level of the antennae or -1 if they are still locked
 */
export function antennaeUnlocked(page = getPage()): number {
  return Number(/ladder(\d).gif/.exec(page)?.[1]) ?? -1;
}

/**
 * Unlock the antennae
 *
 * @returns Whether the antennae were unlocked successfully
 */
export function unlockAntennae(): boolean {
  if (antennaeUnlocked()) return true;
  solveLight2();
  return antennaeUnlocked() > 0;
}

/**
 * Fully charge the antennae
 *
 * @returns Always true
 */
export function chargeAntennae(): boolean {
  unlockCrank();
  setHandle(false);
  useCrank(7);
  return true;
}

/*
 * Buttons
 */

/**
 * @param page Page content to read, else it will read the page itself
 * @returns Whether the buttons are unlocked
 */
export function buttonsUnlocked(page = getPage()): boolean {
  return page.includes("button.gif");
}

/**
 * Unlock the buttons
 *
 * @returns Whether the buttons were successfully unlocked
 */
export function unlockButtons(): boolean {
  if (buttonsUnlocked()) return true;
  solveLight1();
  setDials(0, 1, 2, 2, 1, 0);
  pressLeftActuator();
  return buttonsUnlocked();
}

/**
 * Press a button a number of times
 *
 * @param button Button to press
 * @param times Times to press it
 * @returns The contents of the final page
 */
export function pressButton(button: number, times = 1): string {
  unlockButtons();
  let result = "";
  Array(times)
    .fill(0)
    .forEach(() => {
      result = act(`button${button}`);
      logger.debug(`[KGB] Pressed button ${button}`);
    });
  return result;
}

/*
 * Drawers
 */

/**
 * @param page Page content to read, else it will read the page itself
 * @returns Whether the left drawer is open
 */
export function leftDrawerOpened(page = getPage()): boolean {
  return page.includes("drawer2.gif");
}

/**
 * @param page Page content to read, else it will read the page itself
 * @returns Whether the right drawer is open
 */
export function rightDrawerOpened(page = getPage()): boolean {
  return page.includes("drawer1.gif");
}

/**
 * Open the left drawer
 *
 * @returns Whether the left drawer was successfully opened
 */
export function openLeftDrawer(): boolean {
  if (leftDrawerOpened()) return true;
  solveLight1();
  setDials(2, 2, 2, 0, 0, 0);
  pressLeftActuator();
  return leftDrawerOpened();
}

/**
 * Open the right drawer
 *
 * @returns Whether the right drawer was successfully opened
 */
export function openRightDrawer(): boolean {
  if (rightDrawerOpened()) return true;
  solveLight1();
  setDials(0, 0, 0, 2, 2, 2);
  pressRightActuator();
  return rightDrawerOpened();
}

/**
 * Loot the left drawer
 *
 * @returns Contents of the final page
 */
export function lootLeftDrawer(): string {
  openLeftDrawer();
  return act(`drawer2`);
}

/**
 * Loot the right drawer
 *
 * @returns Contents of the final page
 */
export function lootRightDrawer(): string {
  openRightDrawer();
  return act(`drawer1`);
}

/*
 * Dispenser
 */

/**
 * @param page Page content to read, else it will read the page itself
 * @returns Whether the martini dispenser is unlocked
 */
export function dispenserUnlocked(page = getPage()): boolean {
  return page.includes("martinidispenser.gif");
}

/**
 * Unlock the martini dispenser
 *
 * @returns Whether the martini dispenser was successfully unlocked
 */
export function unlockDispenser(): boolean {
  if (dispenserUnlocked()) return true;
  solveLight1();
  setDials(0, 0, 0, 0, 0, 0);
  setHandle(true);
  pressLeftActuator();
  return dispenserUnlocked();
}

/**
 * Unlock the martini dispenser
 *
 * @returns Contents of the final page
 */
export function useDispenser(): string {
  unlockDispenser();
  return act(`dispenser`);
}

/*
 * Enchantments
 */
export enum Enchantment {
  None,
  WeaponDamage,
  CriticalHit,
  PrismaticDamage,
  SpellDamage,
  Initiative,
  SleazeRes,
  StenchRes,
  SpookyRes,
  ColdRes,
  HotRes,
  DamageAbsorption,
  Regen,
  ManaCost,
  MonsterLevel,
  CombatRate,
  NonCombatRate,
  PvPFights,
  Adventures,
}

const EnchantmentModifiers = {
  [Enchantment.WeaponDamage]: "Weapon Damage Percent: 25",
  [Enchantment.CriticalHit]: "Critical Hit Percent: 10",
  [Enchantment.PrismaticDamage]:
    "Hot Damage: 5, Cold Damage: 5, Spooky Damage: 5, Stench Damage: 5, Sleaze Damage: 5",
  [Enchantment.SpellDamage]: "Spell Damage Percent: 50",
  [Enchantment.Initiative]: "Initiative: 25",
  [Enchantment.SleazeRes]: "Sleaze Resistance: 5",
  [Enchantment.StenchRes]: "Stench Resistance: 5",
  [Enchantment.SpookyRes]: "Spooky Resistance: 5",
  [Enchantment.ColdRes]: "Cold Resistance: 5",
  [Enchantment.HotRes]: "Hot Resistance: 5",
  [Enchantment.DamageAbsorption]: "Damage Absorption: 100",
  [Enchantment.Regen]:
    "HP Regen Min: 5, HP Regen Max: 10, MP Regen Min: 5, MP Regen Max: 10",
  [Enchantment.ManaCost]: "Mana Cost: -3",
  [Enchantment.MonsterLevel]: "Monster Level: 25",
  [Enchantment.CombatRate]: "Combat Rate: 5",
  [Enchantment.NonCombatRate]: "Combat Rate: -5",
  [Enchantment.PvPFights]: "PvP Fights: 5",
  [Enchantment.Adventures]: "Adventures: 5",
  [Enchantment.None]: "__libram_placeholder__",
};

const slots = [
  [
    Enchantment.WeaponDamage,
    Enchantment.CriticalHit,
    Enchantment.PrismaticDamage,
    Enchantment.SpellDamage,
  ],
  [
    Enchantment.Initiative,
    Enchantment.SleazeRes,
    Enchantment.StenchRes,
    Enchantment.SpookyRes,
    Enchantment.ColdRes,
    Enchantment.HotRes,
    Enchantment.DamageAbsorption,
  ],
  [
    Enchantment.Regen,
    Enchantment.ManaCost,
    Enchantment.MonsterLevel,
    Enchantment.CombatRate,
    Enchantment.NonCombatRate,
    Enchantment.PvPFights,
    Enchantment.Adventures,
  ],
];

function findRoute(total: number, a: number, b: number): number {
  if (a > b) return -findRoute(total, b, a);
  return b - a < total / 2 ? b - a : -(total - b) - a;
}

/**
 * @param slot Slot to check
 * @returns Enchantment for given slot
 */
export function getEnchantment(slot: number): Enchantment {
  const currentModifiers = stringModifier(briefcase.name, "Modifiers");
  for (const enchantment of slots[slot]) {
    if (currentModifiers.includes(EnchantmentModifiers[enchantment])) {
      return enchantment;
    }
  }
  return Enchantment.None;
}

/**
 *
 * @param enchantment Enchantment to apply to KGB
 * @returns Whether that enhantment was successfully applied
 */
export function setEnchantment(enchantment: Enchantment): boolean {
  const slot = slots.findIndex((slotEnchantments) =>
    slotEnchantments.includes(enchantment)
  );
  const current = getEnchantment(slot);
  if (current === enchantment) return true;
  const route = findRoute(
    slots[slot].length,
    slots[slot].indexOf(current),
    slots[slot].indexOf(enchantment)
  );
  const clicks = Math.abs(route);
  if (clicks > clicksRemaining()) {
    return false;
  }
  const button = slot * 2 + (route < 0 ? 1 : 2);
  setHandle(false);
  pressButton(button, clicks);
  return enchantment === getEnchantment(slot);
}

/*
 * Tabs
 */
type Tabs = [number, number, number, number, number, number];
type TabOrder = Tabs;

/**
 * @param page Page content to read, else it will read the page itself
 * @returns State of tabs
 */
export function getTabs(page = getPage()): Tabs {
  return [...page.matchAll(/action=kgb_tab(\d)>.*?tab(1|2).gif/g)]
    .map(([, tab, value]) => [Number(tab) - 1, Number(value)] as const)
    .reduce((acc, [tab, value]) => {
      acc[tab] = value;
      return acc;
    }, Array(6).fill(0) as Tabs);
}

/**
 * @param tab Tab to pull
 * @returns Contents of final page
 */
export function pullTab(tab: number): string {
  logger.debug(`[KGB] Pulled tab ${tab}`);
  return act(`tab${tab}`);
}

/**
 * Tabs denote a number but the position of each ternary unit is randomized, so this will read those tabs into a decimal digit based on the order provided
 *
 * @param order Order to consider the tabs when calculating their value
 * @param tabs Tabs values to consider, else get the current value
 * @returns Calculated value of tabs based on given order
 */
export function getTabValue(order: TabOrder, tabs = getTabs()): number {
  return tabs
    .map((t, i) => [i, t])
    .sort(([ia], [ib]) => order[ib] - order[ia])
    .reduce((acc, [, t], i) => (acc += t * 3 ** i), 0);
}

/**
 * Determine the correct order for the current tabs
 *
 * @deprecated Not actually deprecated, just doesn't work yet!
 */
export function decodeTabs(): void {
  abort(
    "This function is not yet complete, mostly because the trivial solution makes Gausie's computer blow up"
  );
  unlockButtons();
  setHandle(true);
}
