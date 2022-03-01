import { cliExecute, Skill } from "kolmafia";
import { have as haveItem } from "../../lib";
import { Modifiers } from "../../modifier";
import { get } from "../../property";
import { $item, $skill } from "../../template-string";

export const item = $item`unwrapped knock-off retro superhero cape`;

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
      Skill: $skill`Smooch of the Daywalker`,
    },
  ],
  [
    ["vampire", "kill"],
    {
      Skill: $skill`Slay the Dead`,
    },
  ],
  [["heck", "thrill"], { "Mysticality Experience": 3 }],
  [["heck", "kiss"], { Skill: $skill`Unleash the Devil's Kiss` }],
  [["robot", "hold"], { Skill: $skill`Deploy Robo-Handcuffs` }],
  [["robot", "thrill"], { "Moxie Experience": 3 }],
  [["robot", "kiss"], { Skill: $skill`Blow a Robo-Kiss` }],
  [["robot", "kill"], { Skill: $skill`Precision Shot` }],
]);

export function set(hero: Hero, mode: Mode): boolean {
  if (!have()) return false;
  cliExecute(`retrocape ${hero} ${mode}`);
  return (
    get("retroCapeSuperhero") === hero &&
    get("retroCapeWashingInstructions") === mode
  );
}

export function getModifier(hero: Hero, mode: Mode): Modifiers {
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

export function tuneToSkill(skill: Skill): boolean {
  const setting = skills.get(skill);
  if (!setting || !have()) return false;
  set(...setting);
  return [get("retroCapeSuperhero"), get("retroCapeWashingInstructions")].every(
    (element, index) => element === setting[index]
  );
}
