import {
  bufferToFile,
  fileToBuffer,
  getCampground,
  mySessionItems,
  mySessionMeat,
  toItem,
} from "kolmafia";
import { getItem } from "./property";
import { getFoldGroup } from "./lib";
import { $item, $items } from "./template-string";
import { sumNumbers } from "./utils";

/**
 * A map of item -> how it should be represented in the session log
 * @returns A map of item to its representation
 */
function getItemMappings() {
  const manyToOne = (primary: Item, mapped: Item[]): [Item, Item][] =>
    mapped.map((target: Item) => [target, primary]);
  const foldable = (item: Item): [Item, Item][] =>
    manyToOne(item, getFoldGroup(item));

  return new Map<Item, Item>([
    ...foldable($item`liar's pants`),
    ...foldable($item`ice pick`),
    ...manyToOne($item`Spooky Putty sheet`, [
      $item`Spooky Putty monster`,
      ...getFoldGroup($item`Spooky Putty sheet`),
    ]),
    ...foldable($item`stinky cheese sword`),
    ...foldable($item`naughty paper shuriken`),
    ...foldable($item`Loathing Legion knife`),
    ...foldable($item`deceased crimbo tree`),
    ...foldable($item`makeshift turban`),
    ...foldable($item`turtle wax shield`),
    ...foldable($item`metallic foil bow`),
    ...foldable($item`ironic moustache`),
    ...foldable($item`bugged balaclava`),
    ...foldable($item`toggle switch (Bartend)`),
    ...foldable($item`mushroom cap`),
    ...manyToOne($item`can of Rain-Doh`, $items`empty Rain-Doh can`),
    ...manyToOne(
      $item`meteorite fragment`,
      $items`meteorite earring, meteorite necklace, meteorite ring`
    ),
    ...manyToOne(
      $item`Sneaky Pete's leather jacket`,
      $items`Sneaky Pete's leather jacket (collar popped)`
    ),
    ...manyToOne($item`Boris's Helm`, $items`Boris's Helm (askew)`),
    ...manyToOne(
      $item`Jarlsberg's pan`,
      $items`Jarlsberg's pan (Cosmic portal mode)`
    ),
    ...manyToOne(
      $item`tiny plastic sword`,
      $items`grogtini, bodyslam, dirty martini, vesper, cherry bomb, sangria del diablo`
    ),
    ...manyToOne(
      $item`earthenware muffin tin`,
      $items`blueberry muffin, bran muffin, chocolate chip muffin`
    ),
  ]);
}

/**
 * Return a mapping of the session items, mapping foldable items to a single of their forms
 * @returns the item session results, with foldables mapped to a single of their folding forms
 */
function mySessionItemsWrapper(): Map<Item, number> {
  const itemMappings = getItemMappings();

  const inventory = new Map<Item, number>();
  for (const [itemStr, quantity] of Object.entries(mySessionItems())) {
    const item = toItem(itemStr);
    const mappedItem = itemMappings.get(item) ?? item;
    inventory.set(mappedItem, quantity + (inventory.get(mappedItem) ?? 0));
  }
  return inventory;
}

function getCampgroundWrapper(): {
  workshed?: Item;
  garden?: Item;
  muffin?: Item;
} {
  const worksheds = $items`cold medicine cabinet, diabolic pizza cube, Asdon Martin keyfob, portable Mayo Clinic, Little Geneticist DNA-Splicing Lab, snow machine, snow machine, spinning wheel, warbear auto-anvil, warbear chemistry lab, warbear high-efficiency still, warbear induction oven, warbear jackhammer drill press, warbear LP-ROM burner`;
  const gardens = $items`packet of pumpkin seeds, Peppermint Pip Packet, packet of dragon's teeth, packet of beer seeds, packet of winter seeds, packet of thanksgarden seeds, packet of tall grass seeds, packet of mushroom spores`;

  const workshed = worksheds.find((item) => getCampground()[`${item}`]);
  const garden = gardens.find((item) => getCampground()[`${item}`]);
  const muffin = getItem("muffinOnOrder") ?? undefined; // coerce null into undefined
  return { workshed, garden, muffin };
}

/**
 * Performa a binary element-wise operation on two inventories
 * @param a The LHS inventory to perform the operation on
 * @param b The RHS inventory to perform the operation on
 * @param op an operator to compute between the sets
 * @param commutative if true use the value of b for any items not in a. if false, ignore values not in a
 * @returns a new map representing the combined inventories
 */
function inventoryOperation(
  a: Map<Item, number>,
  b: Map<Item, number>,
  op: (aPart: number, bPart: number) => number,
  commutative: boolean
): Map<Item, number> {
  // return every entry that is in a and not in b
  const difference = new Map<Item, number>();

  for (const [item, quantity] of a.entries()) {
    const combinedQuantity = op(quantity, b.get(item) ?? 0);
    difference.set(item, combinedQuantity);
  }
  if (commutative) {
    for (const [item, quantity] of b.entries()) {
      if (!a.has(item)) {
        difference.set(item, quantity);
      }
    }
  }
  const diffEntries: [Item, number][] = [...difference.entries()];

  return new Map<Item, number>(diffEntries.filter((value) => value[1] !== 0));
}

/**
 * An entry showing the value of each Item in a session
 * @member item the item associated with this detail
 * @member value the numeric value of the full quantity of items (to get value of each item, do value / quantity) (can be negative)
 * @member quantity the number of items for this detail
 */
interface ItemDetail {
  item: Item;
  value: number;
  quantity: number;
}

/**
 * The full value (in meat) results of a session
 * @member meat the value of this session in pure meat
 * @member items the value of the items in this session in meat
 * @member total sum of meat and items
 * @member itemDetails a list of the detailed accounting for each item in this session
 */
interface ItemResult {
  meat: number;
  items: number;
  total: number;
  itemDetails: ItemDetail[];
}

/**
 * A wrapper around tracking items and meat gained from this session
 * Smartly handles foldables being added/removed based on their state
 * Provides operations to add sessions and subtract Sessions so you can isolate the value of each Session using a baseline
 * @member meat the raw meat associated with this Session
 * @member items a map representing the items gained/lost during this Session
 */
export class Session {
  meat: number;
  items: Map<Item, number>;
  campground: { workshed?: Item; garden?: Item; muffin?: Item };
  /**
   * Construct a new session
   * @param meat the amount of meat associated with this session
   * @param items the items associated with this session
   */
  private constructor(
    meat: number,
    items: Map<Item, number>,
    campground: { workshed?: Item; garden?: Item }
  ) {
    this.meat = meat;
    this.items = items;
    this.campground = campground;
  }

  itemsWithCampground(): Map<Item, number> {
    const thisItems = new Map(this.items);
    if (this.campground.garden) {
      thisItems.set(
        this.campground.garden,
        this.items.get(this.campground.garden) ?? 0 + 1
      );
    }
    if (this.campground.workshed) {
      thisItems.set(
        this.campground.workshed,
        this.items.get(this.campground.workshed) ?? 0 + 1
      );
    }
    if (this.campground.muffin) {
      thisItems.set(
        $item`earthenware muffin tin`,
        this.items.get($item`earthenware muffin tin`) ?? 0 + 1
      );
    }
    return thisItems;
  }

  /**
   * Register session results that do not get tracked natively
   * @param target either the Item or a string saying "meat" of what quantity to modify
   * @param quantity How much to modify the tracked amount by
   */
  register(target: Item | "meat", quantity: number) {
    if (target === "meat") {
      this.meat += quantity;
    } else {
      this.items.set(target, (this.items.get(target) ?? 0) + quantity);
    }
  }

  /**
   * Value this session
   * @param itemValue a function that, when given an item, will give a meat value of the item
   * @returns ItemResult with the full value of this session given the input function
   */
  value(itemValue: (item: Item) => number): ItemResult {
    // TODO: add garbo specific pricing (sugar equipment for synth, etc.)

    const meat = Math.floor(this.meat);
    const itemDetails = [...this.items.entries()].map(([item, quantity]) => {
      return { item, quantity, value: itemValue(item) * quantity };
    });
    const items = Math.floor(
      sumNumbers(itemDetails.map((detail) => detail.value))
    );

    return { meat, items, total: meat + items, itemDetails };
  }

  /**
   * Subtract the contents of another session from this one, removing any items that have a resulting quantity of 0
   *  (this will ignore elements in b but not in a). Also considers items you have as worksheds, gardens, or at the breakfast counter
   * @param other the session from which to pull values to remove from this session
   * @returns a new session representing the difference between this session and the other session
   */
  diff(other: Session): Session {
    return new Session(
      this.meat - other.meat,
      inventoryOperation(
        this.itemsWithCampground(),
        other.itemsWithCampground(),
        (a: number, b: number) => a - b,
        false
      ),
      {}
    );
  }
  /**
   * Subtract the contents of snasphot b from session a, removing any items that have a resulting quantity of 0
   *  (this will ignore elements in b but not in a) Also considers items you have as worksheds, gardens, or at the breakfast counter
   * @param a the session from which to subtract elements
   * @param b the session from which to add elements
   * @returns a new session representing the difference between a and b
   */
  static diff(a: Session, b: Session): Session {
    return a.diff(b);
  }

  /**
   * Generate a new session combining multiple sessions together.
   * Also considers items you have as worksheds, gardens, or at the breakfast counter
   * @param other the session from which to add elements to this set
   * @returns a new session representing the addition of other to this
   */
  add(other: Session): Session {
    return new Session(
      this.meat + other.meat,
      inventoryOperation(
        this.itemsWithCampground(),
        other.itemsWithCampground(),
        (a: number, b: number) => a + b,
        true
      ),
      {}
    );
  }

  /**
   * Combine the contents of sessions
   * Also considers items you have as worksheds, gardens, or at the breakfast counter
   * @param sessions the set of sessions to combine together
   * @returns a new session representing the difference between a and b
   */
  static add(...sessions: Session[]): Session {
    return sessions.reduce((previousSession, currentSession) =>
      previousSession.add(currentSession)
    );
  }

  /**
   * Export this session to a file in the data/ directory. Conventionally this file should end in ".json"
   * @param filename The file into which to export
   */
  toFile(filename: string): void {
    const val = {
      meat: this.meat,
      items: Object.fromEntries(this.items),
      campground: this.campground,
    };
    bufferToFile(JSON.stringify(val), filename);
  }

  /**
   * Import a session from a file in the data/ directory. Conventionally the file should end in ".json"
   * @param filename The file from which to import
   * @returns the session represented by the file
   */
  static fromFile(filename: string): Session {
    const fileValue = fileToBuffer(filename);
    // fileToBuffer returns empty string for files that don't exist
    if (fileValue.length > 0) {
      const val: {
        meat: number;
        items: { [item: string]: number };
        campground: { workshed?: Item; garden?: Item };
      } = JSON.parse(fileValue);

      const parsedItems: [Item, number][] = Object.entries(
        val.items
      ).map(([itemStr, quantity]) => [toItem(itemStr), quantity]);
      return new Session(
        val.meat,
        new Map<Item, number>(parsedItems),
        val.campground
      );
    } else {
      // if the file does not exist, return an empty session
      return new Session(0, new Map<Item, number>(), {});
    }
  }

  static current(): Session {
    return new Session(
      mySessionMeat(),
      mySessionItemsWrapper(),
      getCampgroundWrapper()
    );
  }
}
