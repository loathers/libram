import { getClanId } from "kolmafia";
import { Clan } from "../Clan";
import { $items } from "../template-string";
import Dungeon from "./Dungeon";

export default class SlimeTube extends Dungeon {
  clan: number;

  constructor(clanNameOrId: string | number = getClanId()) {
    super(
      "The Slime Tube",
      $items`slime-soaked brain, slime-soaked hypophysis, slime-soaked sweat gland, squirming Slime larva, caustic slime nodule, caustic slime nodule, hardened slime belt, hardened slime hat, hardened slime pants`,
      "cleanspot",
      "sealtube",
      250000,
      "slimehole.gif",
      "greasespot.gif"
    );
    if (typeof clanNameOrId === "number") {
      this.clan = clanNameOrId;
    } else {
      const clanId = Clan.getWhitelisted().find(
        (clan) => clan.name.toLowerCase() === clanNameOrId.toLowerCase()
      )?.id;
      if (!clanId)
        throw new Error(
          "Unable to find a clan by that name in your whitelist!"
        );
      this.clan = clanId;
    }
  }
}
