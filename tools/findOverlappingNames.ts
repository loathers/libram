import { toItem, toSkill } from "kolmafia";

export function overlappingSkills(): Skill[] {
  const combatSkillNames = Skill.all()
    .filter((skill) => skill.combat)
    .map((skill) => skill.name.toLowerCase());
  return combatSkillNames
    .filter((name1) =>
      combatSkillNames.some((name2) => name2 !== name1 && name2.includes(name1))
    )
    .map(toSkill);
}

export function overlappingItems(): Item[] {
  const combatItemNames = Item.all()
    .filter((item) => item.combat)
    .map((item) => item.name.toLowerCase());
  return combatItemNames
    .filter((name1) =>
      combatItemNames.some((name2) => name2 !== name1 && name2.includes(name1))
    )
    .map(toItem);
}
