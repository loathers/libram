import {
  bufferToFile,
  fileToBuffer,
  mySessionItems,
  mySessionMeat,
  toItem,
} from "kolmafia";
import { getFoldGroup } from "./lib";
import { $item } from "./template-string";
import { sumNumbers } from "./utils";

/**
 * Return a mapping of the session items, mapping foldable items to a single of their forms
 * @returns the item session results, with foldables mapped to a single of their folding forms
 */
function mySessionItemsWrapper(): Map<Item, number> {
  const foldableMapping = (item: Item): [Item, Item][] =>
    getFoldGroup(item).map((target: Item) => [target, item]);

  const foldables = new Map<Item, Item>([
    ...foldableMapping($item`liar's pants`),
    ...foldableMapping($item`ice pick`),
    ...foldableMapping($item`Spooky Putty sheet`),
    [$item`Spooky Putty monster`, $item`Spooky Putty sheet`],
    ...foldableMapping($item`stinky cheese sword`),
    ...foldableMapping($item`naughty paper shuriken`),
    ...foldableMapping($item`Loathing Legion knife`),
    ...foldableMapping($item`deceased crimbo tree`),
    ...foldableMapping($item`makeshift turban`),
    ...foldableMapping($item`turtle wax shield`),
    ...foldableMapping($item`metallic foil bow`),
    ...foldableMapping($item`ironic moustache`),
    ...foldableMapping($item`bugged balaclava`),
    ...foldableMapping($item`toggle switch (Bartend)`),
    ...foldableMapping($item`mushroom cap`),
    [$item`empty Rain-Doh can`, $item`can of Rain-Doh`],
  ]);

  const inventory = new Map<Item, number>();
  for (const [itemStr, quantity] of Object.entries(mySessionItems())) {
    const item = toItem(itemStr);
    const foldableItem = foldables.get(item) ?? item;
    const alreadyInventory = inventory.get(item);
    if (alreadyInventory !== undefined) {
      inventory.set(foldableItem, quantity + alreadyInventory);
    } else {
      inventory.set(foldableItem, quantity);
    }
  }
  return inventory;
}

/**
 * Performa a binary element-wise operation on two inventories
 * @param a The LHS inventory to perform the operation on
 * @param b The RHS inventory to perform the operation on
 * @param op a function to compute between the sets
 * @param transitive if true use the value of b for any items not in a. if false, ignore values not in a
 * @returns a new map representing the combined inventories
 */
function inventoryOperation(
  a: Map<Item, number>,
  b: Map<Item, number>,
  op: (aPart: number, bPart: number) => number,
  transitive: boolean
): Map<Item, number> {
  // return every entry that is in a and not in b
  const difference = new Map<Item, number>();

  for (const [item, quantity] of a.entries()) {
    const combinedQuantity = op(quantity, b.get(item) ?? 0);
    difference.set(item, combinedQuantity);
  }
  if (transitive) {
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
 * An entry showing the value of each Item in a snapshot
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
 * The full value (in meat) results of a Snapshot
 * @member meat the value of this snapshot in pure meat
 * @member items the value of the items in this snapshot in meat
 * @member total sum of meat and items
 * @member itemDetails a list of the detailed accounting for each item in this snapshot
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
 * Provides operations to add sessions and subtract Snapshots so you can isolate the value of each snapshot using a baseline
 * @member meat the raw meat associated with this snapshot
 * @member items a map representing the items gained/lost during this snapshot
 */
export class Snapshot {
  meat: number;
  items: Map<Item, number>;
  /**
   * Construct a new snapshot
   * @param meat the amount of meat associated with this snapshot
   * @param items the items associated with this snapshot
   */
  private constructor(meat: number, items: Map<Item, number>) {
    this.meat = meat;
    this.items = items;
  }

  /**
   * Value this snapshot
   * @param itemValue a function that, when given an item, will give a meat value of the item
   * @returns ItemResult with the full value of this snapshot given the input function
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
   * Subtract the contents of another snapshot from this one, removing any items that have a resulting quantity of 0
   *  (this will ignore elements in b but not in a)
   * @param other the snapshot from which to pull values to remove from this snapshot
   * @returns a new snapshot representing the difference between this snapshot and the other snapshot
   */
  diff(other: Snapshot): Snapshot {
    return new Snapshot(
      this.meat - other.meat,
      inventoryOperation(
        this.items,
        other.items,
        (a: number, b: number) => a - b,
        false
      )
    );
  }
  /**
   * Subtract the contents of snasphot b from snapshot a, removing any items that have a resulting quantity of 0
   *  (this will ignore elements in b but not in a)
   * @param a the snapshot from which to subtract elements
   * @param b the snapshot from which to add elements
   * @returns a new snapshot representing the difference between a and b
   */
  static diff(a: Snapshot, b: Snapshot): Snapshot {
    return a.diff(b);
  }

  /**
   * Generate a new Snapshot combining multiple snapshots together
   * @param other the snapshot from which to add elements to this set
   * @returns a new snapshot representing the addition of other to this
   */
  add(other: Snapshot): Snapshot {
    return new Snapshot(
      this.meat + other.meat,
      inventoryOperation(
        this.items,
        other.items,
        (a: number, b: number) => a + b,
        true
      )
    );
  }

  /**
   * Combine the contents of snapshots
   * @param snapshots the set of snapshots to combine together
   * @returns a new snapshot representing the difference between a and b
   */
  static add(...snapshots: Snapshot[]): Snapshot {
    return snapshots.reduce((previousSnapshot, currentSnapshot) =>
      previousSnapshot.add(currentSnapshot)
    );
  }

  /**
   * Export this snapshot to a file in the data/ directory. Conventionally this file should end in ".json"
   * @param filename The file into which to export
   */
  toFile(filename: string): void {
    const val = {
      meat: this.meat,
      items: Object.fromEntries(this.items),
    };
    bufferToFile(JSON.stringify(val), filename);
  }

  /**
   * Import a snapshot from a file in the data/ directory. Conventionally the file should end in ".json"
   * @param filename The file from which to import
   * @returns the Snapshot represented by the file
   */
  static fromFile(filename: string): Snapshot {
    const val: { meat: number; items: { [item: string]: number } } = JSON.parse(
      fileToBuffer(filename)
    );

    const parsedItems: [Item, number][] = Object.entries(
      val.items
    ).map(([itemStr, quantity]) => [toItem(itemStr), quantity]);
    return new Snapshot(val.meat, new Map<Item, number>(parsedItems));
  }

  static current(): Snapshot {
    return new Snapshot(mySessionMeat(), mySessionItemsWrapper());
  }
}
