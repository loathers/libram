import { useSkill } from "kolmafia";
import {
  $class,
  $familiar,
  $item,
  $skill,
  ascend,
  get,
  have,
  Lifestyle,
  Paths,
  prepareAscension,
} from "libram";

const safariTargets = [
  "Kenny Kamakazi",
  "Busta_Rhymes",
  "Manendra",
  "Gausie",
  "Beldur",
  "worthawholebean",
  "ReverKiller",
  "Asmodais",
  "The Dictator",
];

while (
  $skill`Experience Safari`.timescast < get("skillLevel180") &&
  safariTargets.length
) {
  useSkill($skill`Experience Safari`, 1, safariTargets[0]);
  safariTargets.shift();
}

prepareAscension(
  {
    workshed: $item`Asdon Martin keyfob`,
    garden: $item`Peppermint Pip Packet`,
    eudora: $item`Our Daily Candles™ order form`,
  },
  {
    desk: $item`continental juice bar`,
    nightstand: $item`foreign language tapes`,
    ceiling: $item`ceiling fan`,
  }
);

const pet = have($familiar`Baby Bugged Bugbear`)
  ? $item`astral statuette`
  : $item`astral pet sweater`;

ascend(
  Paths.CommunityService,
  $class`Pastamancer`,
  Lifestyle.hardcore,
  "knoll",
  $item`astral six-pack`,
  pet
);
