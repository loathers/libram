import { getClanId } from "kolmafia";
import { Clan } from "../Clan";
import { $items } from "../template-string";
import Dungeon from "./Dungeon";

export class SlimeTube extends Dungeon {
  constructor(clanNameOrId: string | number = getClanId()) {
    super(
      "The Slime Tube",
      $items`slime-soaked brain, slime-soaked hypophysis, slime-soaked sweat gland, squirming Slime larva, caustic slime nodule, caustic slime nodule, hardened slime belt, hardened slime hat, hardened slime pants`,
      "cleanspot",
      "sealtube",
      250000,
      "slimehole.gif",
      "greasespot.gif",
      clanNameOrId
    );
  }
}
