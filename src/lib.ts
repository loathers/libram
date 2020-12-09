import { booleanModifier, myEffects, numericModifier, toSkill } from "kolmafia";

import { $class } from "./template-string";

export function songLimit() {
  return 3 + (booleanModifier("Four Songs") ? 1 : 0) + numericModifier("Additional Song");
}

export function songCount() {
  return Object.keys(myEffects()).filter(e => toSkill(e).class === $class`Accordion Thief` && toSkill(e).buff).length;
}