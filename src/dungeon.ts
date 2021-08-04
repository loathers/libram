import {
  getClanName,
  getPlayerId,
  getPlayerName,
  myId,
  toItem,
  visitUrl,
  xpath,
} from "kolmafia";
import { $items } from ".";

export class Dungeon {
  name: string;
  loot: Item[];
  openAction: string;
  closeAction: string;
  openCost: number;
  openImage: string;
  closedImage: string;

  constructor(
    name: string,
    loot: Item[],
    openAction: string,
    closeAction: string,
    openCost: number,
    openImage: string,
    closedImage: string
  ) {
    this.name = name;
    this.loot = loot;
    this.openAction = openAction;
    this.closeAction = closeAction;
    this.openCost = openCost;
    this.openImage = openImage;
    this.closedImage = closedImage;
  }

  distribute(
    idOrName: number | string = myId(),
    loot: Item | Item[] = this.loot,
    distributeAllOfAGivenItem = true
  ): void {
    const player = getPlayerFromIdOrName(idOrName);
    const lootList = Array.isArray(loot) ? loot : [loot];
    const badLoot = lootList.find((lootItem) => !this.loot.includes(lootItem));
    if (badLoot) {
      throw new Error(
        `Uh oh buddy, looks like ${badLoot} isn't a valid piece of dungeon loot. You may also have other invalid pieces of dungeon loot in this request. Stop that!`
      );
    }
    const pageText = visitUrl("clan_basement.php");
    if (!pageText.match(player.name)) {
      throw new Error(
        `Uh oh buddy, ${
          player.name
        } can't get loot from any dungeons in ${getClanName()}`
      );
    }
    const itemNames = xpath(pageText, "//tr/td[2]/b/text()");
    const whichLoots = xpath(
      pageText,
      '//form[@action="clan_basement.php"]//input[@type="hidden"][@name="whichloot"]/@value'
    );
    itemNames.forEach((itemName, index) => {
      if (lootList.includes(toItem(itemName))) {
        visitUrl(
          `clan_basement.php?whichloot=${whichLoots[index]}&recipient=${player.id}`
        );
        if (!distributeAllOfAGivenItem)
          lootList.slice(lootList.indexOf(toItem(itemName)));
      }
    });
  }

  close(): boolean {
    visitUrl(`clan_basement.php?action=${this.closeAction}&confirm=true`);
    const pageText = visitUrl("clan_basement.php");
    return pageText.includes(this.closedImage);
  }

  open(paymentPolicy: "None" | "All" | "Difference" = "Difference"): boolean {
    const pageText = visitUrl("clan_basement.php");
    if (pageText.includes(this.openImage)) return true;

    if (paymentPolicy === "All") {
      visitUrl(
        `clan_stash.php?action=contribute&howmuch=${this.openCost}`,
        true
      );
    } else {
      const stashText = visitUrl("clan_stash.php").match(
        /Your Clan Coffer contains ([0-9,]+) Meat./g
      );
      const stashMeat = stashText ? parseInt(stashText[0].replace(",", "")) : 0;
      const payDifference = this.openCost - stashMeat;
      if (payDifference > 0) {
        if (paymentPolicy === "None") return false;
        visitUrl(
          `clan_stash.php?action=contribute&howmuch=${payDifference}`,
          true
        );
      }
    }
    visitUrl(`clan_basement.php?action=${this.openAction}`, true);
    return visitUrl("clan_basement.php").includes(this.openImage);
  }

  static Hobopolis = new Dungeon(
    "Hobopolis",
    $items`Ol' Scratch's ash can, Ol' Scratch's ol' britches, Ol' Scratch's stovepipe hat, Ol' Scratch's infernal pitchfork, Ol' Scratch's manacles, Ol' Scratch's stove door, Frosty's carrot, Frosty's nailbat, Frosty's old silk hat, Frosty's arm, Frosty's iceball, Frosty's snowball sack, Oscus's dumpster waders, Oscus's pelt, Wand of Oscus, Oscus's flypaper pants, Oscus's garbage can lid, Oscus's neverending soda, Zombo's grievous greaves, Zombo's shield, Zombo's skullcap, Zombo's empty eye, Zombo's shoulder blade, Zombo's skull ring, Chester's bag of candy, Chester's cutoffs, Chester's moustache, Chester's Aquarius medallion, Chester's muscle shirt, Chester's sunglasses, Hodgman's bow tie, Hodgman's porkpie hat, Hodgman's lobsterskin pants, Hodgman's almanac, Hodgman's lucky sock, Hodgman's metal detector, Hodgman's varcolac paw, Hodgman's harmonica, Hodgman's garbage sticker, Hodgman's cane, Hodgman's whackin' stick, Hodgman's disgusting technicolor overcoat, Hodgman's imaginary hamster`,
    "cleansewer",
    "floodsewer",
    1000000,
    "opengrate.gif",
    "sewergrate.gif"
  );

  static Dreadsylvania = new Dungeon(
    "Dreadsylvania",
    $items`Great Wolf's headband, Great Wolf's right paw, Great Wolf's left paw, Great Wolf's lice, Great Wolf's rocket launcher, Great Wolf's beastly trousers, Drapes-You-Regally, Warms-Your-Tush, Covers-Your-Head, Protects-Your-Junk, Quiets-Your-Steps, Helps-You-Sleep, Mayor Ghost's khakis, Mayor Ghost's cloak, Mayor Ghost's toupee, Mayor Ghost's scissors, Mayor Ghost's sash, Mayor Ghost's gavel, zombie mariachi hat, zombie accordion, zombie mariachi pants, HOA regulation book, HOA zombie eyes, HOA citation pad, Unkillable Skeleton's skullcap, Unkillable Skeleton's shinguards, Unkillable Skeleton's breastplate, Unkillable Skeleton's shield, Unkillable Skeleton's sawsword, Unkillable Skeleton's restless leg, skull capacitor, Thunkula's drinking cap, Drunkula's silky pants, Drunkula's cape, Drunkula's ring of haze, Drunkula's wineglass, Drunkula's bell, bottle of Bloodweiser, bottle of Bloodweiser, bottle of Bloodweiser, bottle of Bloodweiser, electric Kool-Aid, electric Kool-Aid, electric Kool-Aid, electric Kool-Aid, ghost pepper, ghost pepper, ghost pepper, ghost pepper, Gets-You-Drunk, Gets-You-Drunk, Gets-You-Drunk, Gets-You-Drunk, wriggling severed nose, wriggling severed nose, wriggling severed nose, wriggling severed nose, Hunger™ Sauce, Hunger™ Sauce, Hunger™ Sauce, Hunger™ Sauce`,
    "translatemap",
    "foldmap",
    1000000,
    "dvmap.gif",
    "foldmap.gif"
  );

  static SlimeTube = new Dungeon(
    "The Slime Tube",
    $items`slime-soaked brain, slime-soaked hypophysis, slime-soaked sweat gland, squirming Slime larva, caustic slime nodule, caustic slime nodule, hardened slime belt, hardened slime hat, hardened slime pants`,
    "cleanspot",
    "sealtube",
    250000,
    "slimehole.gif",
    "greasespot.gif"
  );
}

type Player = {
  name: string;
  id: number;
};

function getPlayerFromIdOrName(idOrName: number | string): Player {
  return typeof idOrName === "string"
    ? { name: idOrName, id: parseInt(getPlayerId(idOrName)) }
    : { name: getPlayerName(idOrName), id: idOrName };
}
