import { getClanId } from "kolmafia";
import { Clan } from "../Clan";
import { $items } from "../template-string";
import Dungeon from "./Dungeon";

export class Dreadsylvania extends Dungeon {
  clan: number;

  constructor(clanNameOrId: string | number = getClanId()) {
    super(
      "Dreadsylvania",
      $items`Great Wolf's headband, Great Wolf's right paw, Great Wolf's left paw, Great Wolf's lice, Great Wolf's rocket launcher, Great Wolf's beastly trousers, Drapes-You-Regally, Warms-Your-Tush, Covers-Your-Head, Protects-Your-Junk, Quiets-Your-Steps, Helps-You-Sleep, Mayor Ghost's khakis, Mayor Ghost's cloak, Mayor Ghost's toupee, Mayor Ghost's scissors, Mayor Ghost's sash, Mayor Ghost's gavel, zombie mariachi hat, zombie accordion, zombie mariachi pants, HOA regulation book, HOA zombie eyes, HOA citation pad, Unkillable Skeleton's skullcap, Unkillable Skeleton's shinguards, Unkillable Skeleton's breastplate, Unkillable Skeleton's shield, Unkillable Skeleton's sawsword, Unkillable Skeleton's restless leg, skull capacitor, Thunkula's drinking cap, Drunkula's silky pants, Drunkula's cape, Drunkula's ring of haze, Drunkula's wineglass, Drunkula's bell, bottle of Bloodweiser, bottle of Bloodweiser, bottle of Bloodweiser, bottle of Bloodweiser, electric Kool-Aid, electric Kool-Aid, electric Kool-Aid, electric Kool-Aid, ghost pepper, ghost pepper, ghost pepper, ghost pepper, Gets-You-Drunk, Gets-You-Drunk, Gets-You-Drunk, Gets-You-Drunk, wriggling severed nose, wriggling severed nose, wriggling severed nose, wriggling severed nose, Hunger™ Sauce, Hunger™ Sauce, Hunger™ Sauce, Hunger™ Sauce`,
      "translatemap",
      "foldmap",
      1000000,
      "dvmap.gif",
      "foldmap.gif"
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
