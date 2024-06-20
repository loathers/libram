import { cliExecute, Skill } from "kolmafia";
import { have as haveItem } from "../../lib.js";
import { Modifiers } from "../../modifier.js";
import { get } from "../../property.js";
import { $item, $skill } from "../../template-string.js";

const item = $item`unwrapped knock-off retro superhero cape`;
/**
 * Determines whether you have() the Retro Cape.
 *
 * @returns Whether you have the Retro Cape available.
 */
export function have(): boolean {
  return haveItem(item);
}

const Heroes = {
  vampire: {
    "Muscle Percent": 30,
    "Maximum HP": 50,
  },
  heck: {
    "Mysticality Percent": 30,
    "Maximum MP": 50,
  },
  robot: {
    "Moxie Percent": 30,
    "Maximum HP": 25,
    "Maximum MP": 25,
  },
};
type Hero = keyof typeof Heroes;
type Mode = "hold" | "thrill" | "kiss" | "kill";

export const currentHero = () => get("retroCapeSuperhero") as Hero;
export const currentMode = () => get("retroCapeWashingInstructions") as Mode;

const modeMap = new Map<[Hero, Mode], Modifiers>([
  [
    ["vampire", "hold"],
    {
      "Hot Resistance": 3,
      "Cold Resistance": 3,
      "Stench Resistance": 3,
      "Spooky Resistance": 3,
      "Sleaze Resistance": 3,
    },
  ],
  [
    ["vampire", "thrill"],
    {
      "Muscle Experience": 3,
    },
  ],
  [
    ["vampire", "kiss"],
    {
      Skill: "Smooch of the Daywalker",
    },
  ],
  [
    ["vampire", "kill"],
    {
      Skill: "Slay the Dead",
    },
  ],
  [["heck", "thrill"], { "Mysticality Experience": 3 }],
  [["heck", "kiss"], { Skill: "Unleash the Devil's Kiss" }],
  [["robot", "hold"], { Skill: "Deploy Robo-Handcuffs" }],
  [["robot", "thrill"], { "Moxie Experience": 3 }],
  [["robot", "kiss"], { Skill: "Blow a Robo-Kiss" }],
  [["robot", "kill"], { Skill: "Precision Shot" }],
]);

/**
 * Tunes retro cape to a given setting
 *
 * @param hero The Superhero to set it to
 * @param mode The washing instructions to set it to
 * @returns Whether we successfully tuned the Retro Cape.
 */
export function set(hero: Hero, mode: Mode): boolean {
  if (!have()) return false;
  if (currentHero() === hero && currentMode() === mode) return true;
  cliExecute(`retrocape ${hero} ${mode}`);
  return currentHero() === hero && currentMode() === mode;
}

/**
 * Returns the expected Modifiers of the Retro Cape for a particular setting
 *
 * @param hero The Superhero setting
 * @param mode The washing instructions setting
 * @returns A Modifiers object describing the Retro Cape were it to be tuned to that setting.
 */
export function getModifier(
  hero = currentHero(),
  mode = currentMode(),
): Modifiers {
  return {
    ...Heroes[hero],
    ...(modeMap.get([hero, mode]) ?? {}),
  };
}

const skills = new Map<Skill, [Hero, Mode]>([
  [$skill`Smooch of the Daywalker`, ["vampire", "kiss"]],
  [$skill`Slay the Dead`, ["vampire", "kill"]],
  [$skill`Unleash the Devil's Kiss`, ["heck", "kiss"]],
  [$skill`Deploy Robo-Handcuffs`, ["robot", "hold"]],
  [$skill`Blow a Robo-Kiss`, ["robot", "kiss"]],
  [$skill`Precision Shot`, ["robot", "kill"]],
]);

/**
 * Tunes the Retro Cape to allow it to grant a particular skill.
 *
 * @param skill The skill to tune the Retro Cape to.
 * @returns Whether we successfully tuned the cape.
 */
export function tuneToSkill(skill: Skill): boolean {
  const setting = skills.get(skill);
  if (!setting || !have()) return false;
  set(...setting);
  return [currentHero(), currentMode()].every(
    (element, index) => element === setting[index],
  );
}
