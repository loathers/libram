import { getClanName, Item, toItem, visitUrl, xpath } from "kolmafia";
import { Clan } from "./Clan";
import { getPlayerFromIdOrName } from "./lib";
import { $items } from "./template-string";
import { countedMapToArray } from "./utils";

export class Dungeon {
  private name_: string;
  private loot: Item[];
  private openAction: string;
  private closeAction: string;
  private openCost: number;
  private openImage: string;
  private closedImage: string;

  get possibleLoot() {
    return [...this.loot];
  }

  get name() {
    return this.name_;
  }

  /**
   * Creates dungeon object for managing clan dungeons
   *
   * @param name_ name_ of the dungeon in question
   * @param loot Distributable loot dropped by bosses in dungeon
   * @param openAction String action used in form submission to open dungeon
   * @param closeAction String action used in form submission to close dungeon
   * @param openCost Meat cost of opening dungeon
   * @param openImage Image text to search clan_basement.php for to check if dungeon is open
   * @param closedImage Image text to search clan_basement.php for to check if dungeon is closed
   */
  constructor(
    name_: string,
    loot: Item[],
    openAction: string,
    closeAction: string,
    openCost: number,
    openImage: string,
    closedImage: string,
  ) {
    this.name_ = name_;
    this.loot = loot;
    this.openAction = openAction;
    this.closeAction = closeAction;
    this.openCost = openCost;
    this.openImage = openImage;
    this.closedImage = closedImage;
  }

  distribute(
    idOrname_: number | string,
    loot: Item | Item[] | Map<Item, number> = this.loot,
    distributeAllOfAGivenItem = !(loot instanceof Map),
  ) {
    const player = getPlayerFromIdOrName(idOrname_);
    const lootList =
      loot instanceof Map
        ? countedMapToArray(loot)
        : Array.isArray(loot)
          ? loot
          : [loot];
    const badLoot = lootList.find((lootItem) => !this.loot.includes(lootItem));
    if (badLoot) {
      throw new Error(`${badLoot} is not a valid piece of dungeon loot`);
    }
    const pageText = visitUrl("clan_basement.php");
    if (!pageText.match(new RegExp(player.name, "i"))) {
      throw new Error(
        `${player.name} cannot be distributed loot from ${getClanName()}`,
      );
    }
    const itemname_s = xpath(pageText, "//tr/td[2]/b/text()");
    const whichLoots = xpath(
      pageText,
      '//form[@action="clan_basement.php"]//input[@type="hidden"][@name_="whichloot"]/@value',
    );
    itemname_s.forEach((itemname_, index) => {
      if (lootList.includes(toItem(itemname_))) {
        visitUrl(
          `clan_basement.php?whichloot=${whichLoots[index]}&recipient=${player.id}`,
        );
        if (!distributeAllOfAGivenItem)
          lootList.splice(lootList.indexOf(toItem(itemname_)));
      }
    });
  }

  /**
   * Close this dungeon
   *
   * @returns Whether the dungeon is now closed
   */
  close(): boolean {
    visitUrl(`clan_basement.php?action=${this.closeAction}&confirm=true`, true);
    const pageText = visitUrl("clan_basement.php");
    return pageText.includes(this.closedImage);
  }

  /**
   * Open an instance of this dungeon
   *
   * @param paymentPolicy How much meat should we put into the clan stash to open this dungeon?
   * @returns Whether the dungeon is now open
   */
  open(paymentPolicy: "None" | "All" | "Difference" = "Difference"): boolean {
    const pageText = visitUrl("clan_basement.php");
    if (pageText.includes(this.openImage)) return true;

    const clan = Clan.get();

    if (paymentPolicy === "All") {
      clan.putMeatInCoffer(this.openCost);
    } else {
      const stashMeat = clan.getMeatInCoffer();
      const payDifference = this.openCost - stashMeat;
      if (payDifference > 0) {
        if (paymentPolicy === "None") return false;
        clan.putMeatInCoffer(payDifference);
      }
    }
    visitUrl(`clan_basement.php?action=${this.openAction}`, true);
    return visitUrl("clan_basement.php").includes(this.openImage);
  }

  /**
   * @returns A counted map of all loot from this dungeon eligible for distribution
   */
  findLoot(): Map<Item, number> {
    const result = new Map<Item, number>();
    const pageText = visitUrl("clan_basement.php");
    for (const lootItem of this.loot) {
      result.set(
        lootItem,
        pageText.match(new RegExp(lootItem.name, "g"))?.length ?? 0,
      );
    }
    return result;
  }
}

export const Dreadsylvania = new Dungeon(
  "Dreadsylvania",
  $items`Great Wolf's headband, Great Wolf's right paw, Great Wolf's left paw, Great Wolf's lice, Great Wolf's rocket launcher, Great Wolf's beastly trousers, Drapes-You-Regally, Warms-Your-Tush, Covers-Your-Head, Protects-Your-Junk, Quiets-Your-Steps, Helps-You-Sleep, Mayor Ghost's khakis, Mayor Ghost's cloak, Mayor Ghost's toupee, Mayor Ghost's scissors, Mayor Ghost's sash, Mayor Ghost's gavel, zombie mariachi hat, zombie accordion, zombie mariachi pants, HOA regulation book, HOA zombie eyes, HOA citation pad, Unkillable Skeleton's skullcap, Unkillable Skeleton's shinguards, Unkillable Skeleton's breastplate, Unkillable Skeleton's shield, Unkillable Skeleton's sawsword, Unkillable Skeleton's restless leg, skull capacitor, Thunkula's drinking cap, Drunkula's silky pants, Drunkula's cape, Drunkula's ring of haze, Drunkula's wineglass, Drunkula's bell, bottle of Bloodweiser, bottle of Bloodweiser, bottle of Bloodweiser, bottle of Bloodweiser, electric Kool-Aid, electric Kool-Aid, electric Kool-Aid, electric Kool-Aid, ghost pepper, ghost pepper, ghost pepper, ghost pepper, Gets-You-Drunk, Gets-You-Drunk, Gets-You-Drunk, Gets-You-Drunk, wriggling severed nose, wriggling severed nose, wriggling severed nose, wriggling severed nose, Hunger™ Sauce, Hunger™ Sauce, Hunger™ Sauce, Hunger™ Sauce`,
  "translatemap",
  "foldmap",
  1000000,
  "dvmap.gif",
  "foldmap.gif",
);

export const Hobopolis = new Dungeon(
  "Hobopolis",
  $items`Ol' Scratch's ash can, Ol' Scratch's ol' britches, Ol' Scratch's stovepipe hat, Ol' Scratch's infernal pitchfork, Ol' Scratch's manacles, Ol' Scratch's stove door, Frosty's carrot, Frosty's nailbat, Frosty's old silk hat, Frosty's arm, Frosty's iceball, Frosty's snowball sack, Oscus's dumpster waders, Oscus's pelt, Wand of Oscus, Oscus's flypaper pants, Oscus's garbage can lid, Oscus's neverending soda, Zombo's grievous greaves, Zombo's shield, Zombo's skullcap, Zombo's empty eye, Zombo's shoulder blade, Zombo's skull ring, Chester's bag of candy, Chester's cutoffs, Chester's moustache, Chester's Aquarius medallion, Chester's muscle shirt, Chester's sunglasses, Hodgman's bow tie, Hodgman's porkpie hat, Hodgman's lobsterskin pants, Hodgman's almanac, Hodgman's lucky sock, Hodgman's metal detector, Hodgman's varcolac paw, Hodgman's harmonica, Hodgman's garbage sticker, Hodgman's cane, Hodgman's whackin' stick, Hodgman's disgusting technicolor overcoat, Hodgman's imaginary hamster`,
  "cleansewer",
  "floodsewer",
  1000000,
  "opengrate.gif",
  "sewergrate.gif",
);

export const SlimeTube = new Dungeon(
  "The Slime Tube",
  $items`slime-soaked brain, slime-soaked hypophysis, slime-soaked sweat gland, squirming Slime larva, caustic slime nodule, caustic slime nodule, hardened slime belt, hardened slime hat, hardened slime pants`,
  "cleanspot",
  "sealtube",
  250000,
  "slimehole.gif",
  "greasespot.gif",
);
