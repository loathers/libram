import { getClanName, myId, toItem, visitUrl, xpath } from "kolmafia";
import { Clan } from "../Clan";
import { getPlayerFromIdOrName } from "../lib";

export default class Dungeon {
  name: string;
  loot: Item[];
  openAction: string;
  closeAction: string;
  openCost: number;
  openImage: string;
  closedImage: string;
  clan: number;

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
  constructor(
    name: string,
    loot: Item[],
    openAction: string,
    closeAction: string,
    openCost: number,
    openImage: string,
    closedImage: string,
    clanNameOrId: number | string
  ) {
    this.name = name;
    this.loot = loot;
    this.openAction = openAction;
    this.closeAction = closeAction;
    this.openCost = openCost;
    this.openImage = openImage;
    this.closedImage = closedImage;
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

  /**
   * Distributes loot from given dungeon
   * @param idOrName The player you're trying to distribute to, either as a username or a player ID. Defaults to self.
   * @param loot The loot you're looking to distribute, specific to this dungeon
   * @param distributeAllOfAGivenItem For items that you can get multiple of in a dungeon. When true, this will give everything of that ilk to your chosen player.
   */
  distribute(
    idOrName: number | string = myId(),
    loot: Item | Item[] = this.loot,
    distributeAllOfAGivenItem = true
  ): void {
    Clan.with(this.clan, () => {
      const player = getPlayerFromIdOrName(idOrName);
      const lootList = Array.isArray(loot) ? loot : [loot];
      const badLoot = lootList.find(
        (lootItem) => !this.loot.includes(lootItem)
      );
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
    });
  }

  close(): boolean {
    return Clan.with(this.clan, () => {
      visitUrl(
        `clan_basement.php?action=${this.closeAction}&confirm=true`,
        true
      );
      const pageText = visitUrl("clan_basement.php");
      return pageText.includes(this.closedImage);
    });
  }
  /**
   * Opens clan dungeon and, if relevant, pays meat to do so
   * @param paymentPolicy "None", "All", or "Difference". Difference pays into the stash the exact amount needed to open the dungeon.
   */
  open(paymentPolicy: "None" | "All" | "Difference" = "Difference"): boolean {
    return Clan.with(this.clan, () => {
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
    });
  }
}
