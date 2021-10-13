import { getClanName, myId, toItem, visitUrl, xpath } from "kolmafia";
import { $items } from "../template-string";
import { Clan } from "../Clan";
import { getPlayerFromIdOrName } from "../lib";
import { countedMapToArray } from "../utils";

export type dungeon = {
  name: string;
  loot: Item[];
  openAction: string;
  closeAction: string;
  openCost: number;
  openImage: string;
  closedImage: string;
};

/**
 * Distributes loot from given dungeon
 * @param dungeon The dungeon to distribute loot from
 * @param idOrName The player you're trying to distribute to, either as a username or a player ID. Defaults to self.
 * @param loot The loot you're looking to distribute, specific to this dungeon
 * @param distributeAllOfAGivenItem For items that you can get multiple of in a dungeon. When true, this will give everything of that ilk to your chosen player.
 */

export function distribute(
  dungeon: dungeon,
  idOrName: number | string = myId(),
  loot: Item | Item[] | Map<Item, number> = dungeon.loot,
  distributeAllOfAGivenItem = true
): void {
  const player = getPlayerFromIdOrName(idOrName);
  const lootList =
    loot instanceof Map
      ? countedMapToArray(loot)
      : Array.isArray(loot)
      ? loot
      : [loot];
  const badLoot = lootList.find((lootItem) => !dungeon.loot.includes(lootItem));
  if (badLoot) {
    throw new Error(`${badLoot} is not a valid piece of dungeon loot`);
  }
  const pageText = visitUrl("clan_basement.php");
  if (!pageText.match(player.name)) {
    throw new Error(
      `${player.name} cannot be distributed loot from ${getClanName()}`
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

export function close(dungeon: dungeon): boolean {
  visitUrl(
    `clan_basement.php?action=${dungeon.closeAction}&confirm=true`,
    true
  );
  const pageText = visitUrl("clan_basement.php");
  return pageText.includes(dungeon.closedImage);
}

/**
 * Opens clan dungeon and, if relevant, pays meat to do so
 * @param dungeon The dungeon to open
 * @param paymentPolicy "None", "All", or "Difference". Difference pays into the stash the exact amount needed to open the dungeon.
 */
export function open(
  dungeon: dungeon,
  paymentPolicy: "None" | "All" | "Difference" = "Difference"
): boolean {
  const pageText = visitUrl("clan_basement.php");
  if (pageText.includes(dungeon.openImage)) return true;

  const clan = Clan.get();

  if (paymentPolicy === "All") {
    clan.putMeatInCoffer(dungeon.openCost);
  } else {
    const stashMeat = clan.getMeatInCoffer();
    const payDifference = dungeon.openCost - stashMeat;
    if (payDifference > 0) {
      if (paymentPolicy === "None") return false;
      clan.putMeatInCoffer(payDifference);
    }
  }
  visitUrl(`clan_basement.php?action=${dungeon.openAction}`, true);
  return visitUrl("clan_basement.php").includes(dungeon.openImage);
}

/**
 * Creates dungeon object for managing clan dungeons
 * @param name Name of the dungeon in question
 * @param loot Distributable loot dropped by bosses in dungeon
 * @param openAction String action used in form submission to open dungeon
 * @param closeAction String action used in form submission to close dungeon
 * @param openCost Meat cost of opening dungeon
 * @param openImage Image text to search clan_basement.php for to check if dungeon is open
 * @param closedImage Image text to search clan_basement.php for to check if dungeon is closed
 */
function createDungeon(
  name: string,
  loot: Item[],
  openAction: string,
  closeAction: string,
  openCost: number,
  openImage: string,
  closedImage: string
): dungeon {
  return {
    name: name,
    loot: loot,
    openAction: openAction,
    closeAction: closeAction,
    openCost: openCost,
    openImage: openImage,
    closedImage: closedImage,
  };
}

export const Dreadsylvania = createDungeon(
  "Dreadsylvania",
  $items`Great Wolf's headband, Great Wolf's right paw, Great Wolf's left paw, Great Wolf's lice, Great Wolf's rocket launcher, Great Wolf's beastly trousers, Drapes-You-Regally, Warms-Your-Tush, Covers-Your-Head, Protects-Your-Junk, Quiets-Your-Steps, Helps-You-Sleep, Mayor Ghost's khakis, Mayor Ghost's cloak, Mayor Ghost's toupee, Mayor Ghost's scissors, Mayor Ghost's sash, Mayor Ghost's gavel, zombie mariachi hat, zombie accordion, zombie mariachi pants, HOA regulation book, HOA zombie eyes, HOA citation pad, Unkillable Skeleton's skullcap, Unkillable Skeleton's shinguards, Unkillable Skeleton's breastplate, Unkillable Skeleton's shield, Unkillable Skeleton's sawsword, Unkillable Skeleton's restless leg, skull capacitor, Thunkula's drinking cap, Drunkula's silky pants, Drunkula's cape, Drunkula's ring of haze, Drunkula's wineglass, Drunkula's bell, bottle of Bloodweiser, bottle of Bloodweiser, bottle of Bloodweiser, bottle of Bloodweiser, electric Kool-Aid, electric Kool-Aid, electric Kool-Aid, electric Kool-Aid, ghost pepper, ghost pepper, ghost pepper, ghost pepper, Gets-You-Drunk, Gets-You-Drunk, Gets-You-Drunk, Gets-You-Drunk, wriggling severed nose, wriggling severed nose, wriggling severed nose, wriggling severed nose, Hunger™ Sauce, Hunger™ Sauce, Hunger™ Sauce, Hunger™ Sauce`,
  "translatemap",
  "foldmap",
  1000000,
  "dvmap.gif",
  "foldmap.gif"
);

export const Hobopolis = createDungeon(
  "Hobopolis",
  $items`Ol' Scratch's ash can, Ol' Scratch's ol' britches, Ol' Scratch's stovepipe hat, Ol' Scratch's infernal pitchfork, Ol' Scratch's manacles, Ol' Scratch's stove door, Frosty's carrot, Frosty's nailbat, Frosty's old silk hat, Frosty's arm, Frosty's iceball, Frosty's snowball sack, Oscus's dumpster waders, Oscus's pelt, Wand of Oscus, Oscus's flypaper pants, Oscus's garbage can lid, Oscus's neverending soda, Zombo's grievous greaves, Zombo's shield, Zombo's skullcap, Zombo's empty eye, Zombo's shoulder blade, Zombo's skull ring, Chester's bag of candy, Chester's cutoffs, Chester's moustache, Chester's Aquarius medallion, Chester's muscle shirt, Chester's sunglasses, Hodgman's bow tie, Hodgman's porkpie hat, Hodgman's lobsterskin pants, Hodgman's almanac, Hodgman's lucky sock, Hodgman's metal detector, Hodgman's varcolac paw, Hodgman's harmonica, Hodgman's garbage sticker, Hodgman's cane, Hodgman's whackin' stick, Hodgman's disgusting technicolor overcoat, Hodgman's imaginary hamster`,
  "cleansewer",
  "floodsewer",
  1000000,
  "opengrate.gif",
  "sewergrate.gif"
);

export const SlimeTube = createDungeon(
  "The Slime Tube",
  $items`slime-soaked brain, slime-soaked hypophysis, slime-soaked sweat gland, squirming Slime larva, caustic slime nodule, caustic slime nodule, hardened slime belt, hardened slime hat, hardened slime pants`,
  "cleanspot",
  "sealtube",
  250000,
  "slimehole.gif",
  "greasespot.gif"
);

export function findLoot(dungeon: dungeon): Map<Item, number> {
  const returnValue = new Map<Item, number>();
  const pageText = visitUrl("clan_basement.php");
  for (const lootItem of dungeon.loot) {
    returnValue.set(lootItem, pageText.match(lootItem.name)?.length ?? 0);
  }
  return returnValue;
}
