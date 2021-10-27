import { getSaleValue } from "../lib";
import { countedMapToArray } from "../utils";
import {
  expected as candyHeartsExpected,
  have as candyHeartsHave,
  summonSkill as candyHeartsSkill,
} from "./2007/CandyHearts";
import {
  expected as divineFavorsExpected,
  have as divineFavorsHave,
  summonSkill as divineFavorsSkill,
} from "./2008/DivineFavors";
import {
  expected as loveSongsExpected,
  have as loveSongsHave,
  summonSkill as loveSongsSkill,
} from "./2009/LoveSongs";
import {
  expected as brickosExpected,
  have as brickosHave,
  summonSkill as brickosSkill,
} from "./2010/Brickos";
import {
  expected as diceExpected,
  have as diceHave,
  summonSkill as diceSkill,
} from "./2011/Gygaxian";
import {
  expected as resolutionsExpected,
  have as resolutionsHave,
  summonSkill as resolutionsSkill,
} from "./2012/Resolutions";
import {
  expected as taffyExpected,
  have as taffyHave,
  summonSkill as taffySkill,
} from "./2013/PulledTaffy";

/**
 *
 * @param summonSkill The libram summoning skill
 * @returns map containing the chance of an item to be summoned
 */
export function expectedLibramSummon(summonSkill: Skill): Map<Item, number> {
  switch (summonSkill) {
    case candyHeartsSkill:
      return candyHeartsExpected();
    case divineFavorsSkill:
      return divineFavorsExpected();
    case loveSongsSkill:
      return loveSongsExpected();
    case brickosSkill:
      return brickosExpected();
    case diceSkill:
      return diceExpected();
    case resolutionsSkill:
      return resolutionsExpected();
    case taffySkill:
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
    results.set(candyHeartsSkill, candyHeartsExpected());
  }
  if (divineFavorsHave()) {
    results.set(divineFavorsSkill, divineFavorsExpected());
  }
  if (loveSongsHave()) {
    results.set(loveSongsSkill, loveSongsExpected());
  }
  if (brickosHave()) {
    results.set(brickosSkill, brickosExpected());
  }
  if (diceHave()) {
    results.set(diceSkill, diceExpected());
  }
  if (resolutionsHave()) {
    results.set(resolutionsSkill, resolutionsExpected());
  }
  if (taffyHave()) {
    results.set(taffySkill, taffyExpected());
  }
  return results;
}

export function bestLibramToCast(): Skill | null {
  return Array.from(possibleLibramSummons().entries())
    .map(
      ([skill, itemMap]) =>
        [skill, getSaleValue(...countedMapToArray(itemMap))] as [Skill, number]
    )
    .sort((a, b) => b[1] - a[1])[0][0];
}
