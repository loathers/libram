import { Skill, Item } from "kolmafia";
import { getSaleValue } from "../lib.js";
import { $skill } from "../template-string.js";
import { sum, maxBy } from "../utils.js";
import {
  expected as candyHeartsExpected,
  have as candyHeartsHave,
} from "./2007/CandyHearts.js";
import {
  expected as divineFavorsExpected,
  have as divineFavorsHave,
} from "./2008/DivineFavors.js";
import {
  expected as loveSongsExpected,
  have as loveSongsHave,
} from "./2009/LoveSongs.js";
import {
  expected as brickosExpected,
  have as brickosHave,
} from "./2010/Brickos.js";
import { expected as diceExpected, have as diceHave } from "./2011/Gygaxian.js";
import {
  expected as resolutionsExpected,
  have as resolutionsHave,
} from "./2012/Resolutions.js";
import {
  expected as taffyExpected,
  have as taffyHave,
} from "./2013/PulledTaffy.js";

/**
 *
 * @param summonSkill The libram summoning skill
 * @returns map containing the chance of an item to be summoned
 */
export function expectedLibramSummon(summonSkill: Skill): Map<Item, number> {
  switch (summonSkill) {
    case $skill`Summon Candy Heart`:
      return candyHeartsExpected();
    case $skill`Summon Party Favor`:
      return divineFavorsExpected();
    case $skill`Summon Love Song`:
      return loveSongsExpected();
    case $skill`Summon BRICKOs`:
      return brickosExpected();
    case $skill`Summon Dice`:
      return diceExpected();
    case $skill`Summon Resolutions`:
      return resolutionsExpected();
    case $skill`Summon Taffy`:
      return taffyExpected();
  }
  return new Map<Item, number>();
}

/**
 *
 * @returns map containing the chance of items to be summoned for each libram summoning skill available
 */
export function possibleLibramSummons(): Map<Skill, Map<Item, number>> {
  const results = new Map<Skill, Map<Item, number>>();
  if (candyHeartsHave()) {
    results.set($skill`Summon Candy Heart`, candyHeartsExpected());
  }
  if (divineFavorsHave()) {
    results.set($skill`Summon Party Favor`, divineFavorsExpected());
  }
  if (loveSongsHave()) {
    results.set($skill`Summon Love Song`, loveSongsExpected());
  }
  if (brickosHave()) {
    results.set($skill`Summon BRICKOs`, brickosExpected());
  }
  if (diceHave()) {
    results.set($skill`Summon Dice`, diceExpected());
  }
  if (resolutionsHave()) {
    results.set($skill`Summon Resolutions`, resolutionsExpected());
  }
  if (taffyHave()) {
    results.set($skill`Summon Taffy`, taffyExpected());
  }
  return results;
}

/**
 * Determines the best libram to cast, based on expected meat value in mall
 *
 * @returns The best libram to cast, based on expected meat value in mall
 */
export function bestLibramToCast(): Skill | null {
  const arr = Array.from(possibleLibramSummons().entries());
  if (!arr.length) return null;

  return maxBy(arr, ([, itemMap]) =>
    sum(
      Array.from(itemMap.entries()),
      ([item, weight]) => weight * getSaleValue(item),
    ),
  )[0];
}
