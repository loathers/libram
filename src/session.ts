import {
  todayToString,
  myName,
  bufferToFile,
  fileToBuffer,
  Item,
  mySessionItems,
  mySessionMeat,
  toItem,
  getCampground,
  getCloset,
  getDisplay,
  getStorage,
  myClosetMeat,
  myStorageMeat,
  totalTurnsPlayed,
} from "kolmafia";
import { getFoldGroup } from "./lib";
import { $item, $items } from "./template-string";
import { sum } from "./utils";

/**
 * Return a mapping of the session items, mapping foldable items to a single of their forms
 *
 * @param sessionOnly should closet, DC, and storage be ignored for the session calculation
 * @returns the item session results, with foldables mapped to a single of their folding forms
 */
function mySessionItemsWrapper(sessionOnly = false): Map<Item, number> {
  const manyToOne = (primary: Item, mapped: Item[]): [Item, Item][] =>
    mapped.map((target: Item) => [target, primary]);

  const foldable = (item: Item): [Item, Item][] =>
    manyToOne(item, getFoldGroup(item));

  const itemMappings = new Map<Item, Item>([
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
    ...manyToOne($item`ChibiBuddy™ (on)`, $items`ChibiBuddy™ (off)`),
  ]);

  const inventory = new Map<Item, number>();
  const invLocations = sessionOnly
    ? [mySessionItems]
    : [mySessionItems, getCloset, getDisplay, getStorage];
  for (const inventoryFunc of invLocations) {
    for (const [itemStr, quantity] of Object.entries(inventoryFunc())) {
      const item = toItem(itemStr);
      const mappedItem = itemMappings.get(item) ?? item;
      inventory.set(mappedItem, quantity + (inventory.get(mappedItem) ?? 0));
    }
  }

  for (const [itemStr, quantity] of Object.entries(getCampground())) {
    const item = toItem(itemStr);
    if (item === $item`big rock`) continue; // Used to represent an empty house slot
    const mappedItem = itemMappings.get(item) ?? item;
    inventory.set(mappedItem, quantity + (inventory.get(mappedItem) ?? 0));
  }
  return new Map([...inventory.entries()].filter(([, quantity]) => quantity));
}

/**
 * Perform a binary element-wise operation on two inventories
 *
 * @param a The LHS inventory to perform the operation on
 * @param b The RHS inventory to perform the operation on
 * @param op an operator to compute between the sets
 * @returns a new map representing the combined inventories
 */
function inventoryOperation(
  a: Map<Item, number>,
  b: Map<Item, number>,
  op: (aPart: number, bPart: number) => number
): Map<Item, number> {
  // return every entry that is in a and not in b
  const difference = new Map<Item, number>();

  for (const item of new Set([...a.keys(), ...b.keys()])) {
    difference.set(item, op(a.get(item) ?? 0, b.get(item) ?? 0));
  }

  const diffEntries: [Item, number][] = [...difference.entries()];

  return new Map<Item, number>(diffEntries.filter(([, value]) => value !== 0));
}

/**
 * An entry showing the value of each Item in a session
 *
 * @member item the item associated with this detail
 * @member value the numeric value of the full quantity of items (to get value of each item, do value / quantity) (can be negative)
 * @member quantity the number of items for this detail
 */
export interface ItemDetail {
  item: Item;
  value: number;
  quantity: number;
}

/**
 * The full value (in meat) results of a session
 *
 * @member meat the value of this session in pure meat
 * @member items the value of the items in this session in meat
 * @member total sum of meat and items
 * @member itemDetails a list of the detailed accounting for each item in this session
 * @member turns the number of turns associated with this session
 */
export interface ItemResult {
  meat: number;
  items: number;
  total: number;
  itemDetails: ItemDetail[];
  turns: number;
}

export interface MeatPerAdventureAnalysis {
  mpa: {
    effective: number;
    meat: number;
    items: number;
    total: number;
  };
  values: {
    effective: number;
    meat: number;
    items: number;
    total: number;
  };
  outlierItems: ItemDetail[];
  turns: number;
}
/**
 * A wrapper around tracking items and meat gained from this session
 * Smartly handles foldables being added/removed based on their state
 * Provides operations to add sessions and subtract Sessions so you can isolate the value of each Session using a baseline
 *
 * @member meat the raw meat associated with this Session
 * @member items a map representing the items gained/lost during this Session
 */
export class Session {
  meat: number;
  items: Map<Item, number>;
  totalTurns: number;
  /**
   * Construct a new session
   *
   * @param meat the amount of meat associated with this session
   * @param items the items associated with this session
   * @param totalTurns the number of turns associated with this session
   */
  private constructor(
    meat: number,
    items: Map<Item, number>,
    totalTurns: number
  ) {
    this.meat = meat;
    this.items = items;
    this.totalTurns = totalTurns;
  }

  /**
   * Register session results that do not get tracked natively
   *
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
   *
   * @param itemValue a function that, when given an item, will give a meat value of the item
   * @returns ItemResult with the full value of this session given the input function
   */
  value(itemValue: (item: Item) => number): ItemResult {
    // TODO: add garbo specific pricing (sugar equipment for synth, etc.)

    const turns = this.totalTurns;
    const meat = Math.floor(this.meat);
    const itemDetails = [...this.items.entries()].map(([item, quantity]) => {
      return { item, quantity, value: itemValue(item) * quantity };
    });
    const items = Math.floor(sum(itemDetails, "value"));

    return { meat, items, total: meat + items, itemDetails, turns };
  }

  /**
   * Subtract the contents of another session from this one, removing any items that have a resulting quantity of 0
   *  (this will ignore elements in b but not in a)
   *
   * @param other the session from which to pull values to remove from this session
   * @returns a new session representing the difference between this session and the other session
   */
  diff(other: Session): Session {
    return new Session(
      this.meat - other.meat,
      inventoryOperation(
        this.items,
        other.items,
        (a: number, b: number) => a - b
      ),
      this.totalTurns - other.totalTurns
    );
  }
  /**
   * Subtract the contents of snasphot b from session a, removing any items that have a resulting quantity of 0
   *  (this will ignore elements in b but not in a)
   *
   * @param a the session from which to subtract elements
   * @param b the session from which to add elements
   * @returns a new session representing the difference between a and b
   */
  static diff(a: Session, b: Session): Session {
    return a.diff(b);
  }

  /**
   * Generate a new session combining multiple sessions together
   *
   * @param other the session from which to add elements to this set
   * @returns a new session representing the addition of other to this
   */
  add(other: Session): Session {
    return new Session(
      this.meat + other.meat,
      inventoryOperation(
        this.items,
        other.items,
        (a: number, b: number) => a + b
      ),
      this.totalTurns + other.totalTurns
    );
  }

  /**
   * Combine the contents of sessions
   *
   * @param sessions the set of sessions to combine together
   * @returns a new session representing the difference between a and b
   */
  static add(...sessions: Session[]): Session {
    return sessions.reduce((previousSession, currentSession) =>
      previousSession.add(currentSession)
    );
  }

  static getFilepath(filename: string): string {
    return filename.endsWith(".json")
      ? filename
      : `snapshots/${myName()}/${todayToString()}_${filename}.json`;
  }

  /**
   * Export this session to a file in the data/ directory. Conventionally this file should end in ".json"
   *
   * @param filename The file into which to export
   */
  toFile(filename: string): void {
    const val = {
      meat: this.meat,
      items: Object.fromEntries(this.items),
      totalTurns: this.totalTurns,
    };
    bufferToFile(JSON.stringify(val), Session.getFilepath(filename));
  }

  /**
   * Import a session from a file in the data/ directory. Conventionally the file should end in ".json"
   *
   * @param filename The file from which to import
   * @returns the session represented by the file
   */
  static fromFile(filename: string): Session {
    const fileValue = fileToBuffer(Session.getFilepath(filename));
    // fileToBuffer returns empty string for files that don't exist
    if (fileValue.length > 0) {
      const val: {
        meat: number;
        items: { [item: string]: number };
        totalTurns?: number;
      } = JSON.parse(fileValue);

      const parsedItems: [Item, number][] = Object.entries(val.items).map(
        ([itemStr, quantity]) => [toItem(itemStr), quantity]
      );
      return new Session(
        val.meat,
        new Map<Item, number>(parsedItems),
        val.totalTurns ?? 0
      );
    } else {
      // if the file does not exist, return an empty session
      return new Session(0, new Map<Item, number>(), 0);
    }
  }

  /**
   * Return the meat and items for the current session
   *
   * @param sessionOnly should closet, DC, and storage be ignored for the session calculation
   * @returns current session
   */
  static current(sessionOnly = false): Session {
    const meat = sessionOnly
      ? [mySessionMeat]
      : [mySessionMeat, myClosetMeat, myStorageMeat];
    return new Session(
      sum(meat, (f) => f()),
      mySessionItemsWrapper(sessionOnly),
      totalTurnsPlayed()
    );
  }

  /**
   * @param baseline the base session to use when computing MPA
   * @param full the full session to use when computing MPA
   * @param options options for computing MPA
   * @param options.value a function to compute the meat value of a given item
   * @param options.isOutlier a function to compute if an item is considered an outlier. By default, no items are outliers
   * @param options.excludeValue meat values to exclude when calculating specific portions of the MPA
   * @param options.excludeValue.meat how much meat to exclude when calculating the meat portion of MPA
   * @param options.excludeValue.item how much meat to exclude when calculating hte item portion of MPA
   * @returns an analysis of the effective MPA for the given session
   */
  static computeMPA(
    baseline: Session,
    full: Session,
    options: {
      value: (item: Item) => number;
      isOutlier?: (item: ItemDetail) => boolean;
      excludeValue?: { meat?: number; item?: number };
    }
  ): MeatPerAdventureAnalysis {
    const value = options.value;
    const excludeValue = options.excludeValue ?? { meat: 0, item: 0 };
    const isOutlier = options.isOutlier;
    const result = full.diff(baseline).value(value);
    const meatValue = result.meat - (excludeValue.meat ?? 0);
    const outlierItems = isOutlier ? result.itemDetails.filter(isOutlier) : [];
    const outliersValue = sum(outlierItems, (detail) => detail.value);
    const itemValue = result.items - outliersValue - (excludeValue.item ?? 0);
    const { turns } = result;

    return {
      mpa: {
        effective: (meatValue + itemValue) / turns,
        total: (meatValue + itemValue + outliersValue) / turns,
        meat: meatValue / turns,
        items: itemValue / turns,
      },
      values: {
        effective: meatValue + itemValue,
        total: meatValue + itemValue + outliersValue,
        meat: meatValue,
        items: itemValue,
      },
      outlierItems: outlierItems,
      turns: turns,
    };
  }
  /**
   * @param other the session to diff against this session when computing MPA
   * @param options options for computing MPA
   * @param options.value a function to compute the meat value of a given item
   * @param options.isOutlier a function to compute if an item is considered an outlier. By default, no items are outliers
   * @param options.excludeValue meat values to exclude when calculating specific portions of the MPA
   * @param options.excludeValue.meat how much meat to exclude when calculating the meat portion of MPA
   * @param options.excludeValue.item how much meat to exclude when calculating hte item portion of MPA
   * @returns an analysis of the effective MPA for the given session
   */
  computeMPA(
    other: Session,
    options: {
      value: (item: Item) => number;
      isOutlier?: (item: ItemDetail) => boolean;
      excludeValue?: { meat?: number; item?: number };
    }
  ): MeatPerAdventureAnalysis {
    return Session.computeMPA(this, other, options);
  }
}
