import { Skill, todayToString } from "kolmafia";
import { have as have_ } from "../../lib";
import { $item, $skills } from "../../template-string";

export const SKILLS = Object.freeze(
  // eslint-disable-next-line libram/verify-constants
  $skills`Aug. 1st: Mountain Climbing Day!, Aug. 2nd: Find an Eleven-Leaf Clover Day, Aug. 3rd: Watermelon Day!, Aug. 4th: Water Balloon Day!, Aug. 5th: Oyster Day!, Aug. 6th: Fresh Breath Day!, Aug. 7th: Lighthouse Day!, Aug. 8th: Cat Day!, Aug. 9th: Hand Holding Day!, Aug. 10th: World Lion Day!, Aug. 11th: Presidential Joke Day!, Aug. 12th: Elephant Day!, Aug. 13th: Left/Off Hander's Day!, Aug. 14th: Financial Awareness Day!, Aug. 15th: Relaxation Day!, Aug. 16th: Roller Coaster Day!, Aug. 17th: Thriftshop Day!, Aug. 18th: Serendipity Day!, Aug. 19th: Honey Bee Awareness Day!, Aug. 20th: Mosquito Day!, Aug. 21st: Spumoni Day!, Aug. 22nd: Tooth Fairy Day!, Aug. 23rd: Ride the Wind Day!, Aug. 24th: Waffle Day!, Aug. 25th: Banana Split Day!, Aug. 26th: Toilet Paper Day!, Aug. 27th: Just Because Day!, Aug. 28th: Race Your Mouse Day!, Aug. 29th: More Herbs\, Less Salt Day!, Aug. 30th: Beach Day!, Aug. 31st: Cabernet Sauvignon Day!`
);

/**
 * @returns Whether you `have` the august scepter
 */
export function have(): boolean {
  return have_($item`august scepter`);
}

const today = () => Number(todayToString()) % 100;

/**
 * @returns Today's august scepter skill
 */
export function todaysSkill(): Skill {
  return SKILLS[today() - 1];
}
