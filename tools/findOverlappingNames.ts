import { toItem, toLowerCase, toSkill } from "kolmafia";

function overlappingSkills(): Skill[] {
    const combatSkillNames = Skill.all().filter((skill) => skill.combat).map((skill) => toLowerCase(skill.name));
    return combatSkillNames.filter((name1) => combatSkillNames.some((name2) => name2 !== name1 && name2.includes(name1))).map(toSkill)
}

function overlappingItems(): Item[] {
    const combatItemNames = Item.all().filter((item) => item.combat).map((item) => toLowerCase(item.name));
    return combatItemNames.filter((name1) => combatItemNames.some((name2) => name2 !== name1 && name2.includes(name1))).map(toItem)
}