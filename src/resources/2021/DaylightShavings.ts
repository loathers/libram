import { myClass, toEffect, toInt } from "kolmafia";
import { have as haveItem } from "../../lib";
import { get } from "../../property";
import { $effects, $item } from "../../template-string";

export const helmet = $item`Daylight Shavings Helmet`;

export function have(): boolean {
  return haveItem(helmet);
}

export const buffs = $effects`Spectacle Moustache, Toiletbrush Moustache, Barbell Moustache, Grizzly Beard, Surrealist's Moustache, Musician's Musician's Moustache, Gull-Wing Moustache, Space Warlord's Beard, Pointy Wizard Beard, Cowboy Stache, Friendly Chops`;

export function buffCycle(playerclass: Class): Effect[] {
  const returnValue: Effect[] = [];
  const id = toInt(playerclass);
  const seed = id > 6 ? (id % 6) + 1 : id;
  for (let i = 1; i < 12; i++) {
    const index = (i * seed) % 11;
    returnValue.push(buffs[index]);
  }
  return returnValue;
}

export function nextBuff(): Effect {
  const currentBuff = toEffect(get<number>("lastBeardBuff"));

  const cycle = buffCycle(myClass());

  const index = cycle.indexOf(currentBuff);

  const newIndex = (1 + index) % 11;
  return cycle[newIndex];
}

export function buffsUntil(buff: Effect): number | null {
  if (!buffs.includes(buff)) return null;

  const currentIndex = buffs.indexOf(nextBuff()) - 1;
  const newIndex = buffs.indexOf(buff);

  const diff = (newIndex - currentIndex) % 11;
  return diff === 0 ? 11 : diff;
}
