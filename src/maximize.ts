import {
  availableAmount,
  bjornifyFamiliar,
  canEquip,
  cliExecute,
  enthroneFamiliar,
  equip,
  equippedAmount,
  equippedItem,
  isWearingOutfit,
  maximize,
  myBasestat,
  myBjornedFamiliar,
  myEnthronedFamiliar,
  myFamiliar,
  outfit,
} from "kolmafia";
import { $familiar, $item, $slot, $slots, $stats } from "./template-string";
import logger from "./logger";
import { setEqual } from "./utils";

export type MaximizeOptions = {
  updateOnFamiliarChange: boolean;
  updateOnCanEquipChanged: boolean;
  useOutfitCaching: boolean;
  forceEquip: Item[];
  preventEquip: Item[];
  bonusEquip: Map<Item, number>;
  onlySlot: Slot[];
  preventSlot: Slot[];
};

/**
 * Merges a Partial<MaximizeOptions> onto a MaximizeOptions. We merge via overriding for all boolean properties and for onlySlot, and concat all other array properties.
 * @param defaultOptions MaximizeOptions to use as a "base."
 * @param addendums Options to attempt to merge onto defaultOptions.
 */
function mergeMaximizeOptions(
  defaultOptions: MaximizeOptions,
  addendums: Partial<MaximizeOptions>
): MaximizeOptions {
  return {
    updateOnFamiliarChange:
      addendums.updateOnFamiliarChange ?? defaultOptions.updateOnFamiliarChange,

    updateOnCanEquipChanged:
      addendums.updateOnCanEquipChanged ??
      defaultOptions.updateOnCanEquipChanged,

    useOutfitCaching:
      addendums.useOutfitCaching ?? defaultOptions.useOutfitCaching,
    forceEquip: [...defaultOptions.forceEquip, ...(addendums.forceEquip ?? [])],

    preventEquip: [
      ...defaultOptions.preventEquip,
      ...(addendums.preventEquip ?? []),
    ],

    bonusEquip: new Map<Item, number>([
      ...defaultOptions.bonusEquip,
      ...(addendums.bonusEquip ?? []),
    ]),

    onlySlot: addendums.onlySlot ?? defaultOptions.onlySlot,

    preventSlot: [
      ...defaultOptions.preventSlot,
      ...(addendums.preventSlot ?? []),
    ],
  };
}

const defaultMaximizeOptions: MaximizeOptions = {
  updateOnFamiliarChange: true,
  updateOnCanEquipChanged: true,
  useOutfitCaching: true,
  forceEquip: [],
  preventEquip: [],
  bonusEquip: new Map(),
  onlySlot: [],
  preventSlot: [],
};

/**
 *
 * @param options Default options for each maximizer run.
 * @param options.updateOnFamiliarChange Re-run the maximizer if familiar has changed. Default true.
 * @param options.updateOnCanEquipChanged Re-run the maximizer if stats have changed what can be equipped. Default true.
 * @param options.forceEquip Equipment to force-equip ("equip X").
 * @param options.preventEquip Equipment to prevent equipping ("-equip X").
 * @param options.bonusEquip Equipment to apply a bonus to ("200 bonus X").
 */
export function setDefaultMaximizeOptions(
  options: Partial<MaximizeOptions>
): void {
  Object.assign(defaultMaximizeOptions, options);
}

// Subset of slots that are valid for caching.
const cachedSlots = $slots`hat, weapon, off-hand, back, shirt, pants, acc1, acc2, acc3, familiar`;

class CacheEntry {
  equipment: Map<Slot, Item>;
  rider: Map<Item, Familiar>;
  familiar: Familiar;
  canEquipItemCount: number;

  constructor(
    equipment: Map<Slot, Item>,
    rider: Map<Item, Familiar>,
    familiar: Familiar,
    canEquipItemCount: number
  ) {
    this.equipment = equipment;
    this.rider = rider;
    this.familiar = familiar;
    this.canEquipItemCount = canEquipItemCount;
  }
}

class OutfitLRUCache {
  static OUTFIT_PREFIX = "Script Outfit";

  // Current outfits allocated
  #outfitSlots: CacheEntry[] = [];
  // Array of indices into #outfitSlots in order of use. Most recent at the front.
  #useHistory: number[] = [];
  #maxSize: number;

  constructor(maxSize: number) {
    this.#maxSize = maxSize;
  }

  checkConsistent() {
    if (
      this.#useHistory.length !== this.#outfitSlots.length ||
      ![...this.#useHistory].sort().every((value, index) => value === index)
    ) {
      throw new Error("Outfit cache consistency failed.");
    }
  }

  promote(index: number) {
    this.#useHistory = [index, ...this.#useHistory.filter((i) => i !== index)];
    this.checkConsistent();
  }

  get(key: CacheEntry): string | undefined {
    const index = this.#outfitSlots.indexOf(key);
    if (index < 0) return undefined;
    this.promote(index);
    return `${OutfitLRUCache.OUTFIT_PREFIX} ${index}`;
  }

  insert(key: CacheEntry): string {
    let lastUseIndex: number | undefined = undefined;
    if (this.#outfitSlots.length >= this.#maxSize) {
      lastUseIndex = this.#useHistory.pop();
      if (lastUseIndex === undefined) {
        throw new Error("Outfit cache consistency failed.");
      }
      this.#useHistory.splice(0, 0, lastUseIndex);
      this.#outfitSlots[lastUseIndex] = key;
      this.checkConsistent();
      return `${OutfitLRUCache.OUTFIT_PREFIX} ${lastUseIndex}`;
    } else {
      const index = this.#outfitSlots.push(key) - 1;
      this.#useHistory.splice(0, 0, index);
      this.checkConsistent();
      return `${OutfitLRUCache.OUTFIT_PREFIX} ${index}`;
    }
  }
}

/**
 * Save current equipment as KoL-native outfit.
 * @param name Name of new outfit.
 */
function saveOutfit(name: string): void {
  cliExecute(`outfit save ${name}`);
}

// Objective cache entries.
const cachedObjectives: { [string: string]: CacheEntry } = {};
// Outfit cache entries. Keep 6 by default to avoid cluttering list.
const outfitCache = new OutfitLRUCache(6);
// Cache to prevent rescanning all items unnecessarily
let cachedStats = [0, 0, 0];
let cachedCanEquipItemCount = 0;

/**
 * Count the number of unique items that can be equipped.
 * @returns The count of unique items.
 */
function canEquipItemCount(): number {
  const stats = $stats`Muscle, Mysticality, Moxie`.map((stat) =>
    Math.min(myBasestat(stat), 300)
  );
  if (stats.every((value, index) => value === cachedStats[index])) {
    return cachedCanEquipItemCount;
  }
  cachedStats = stats;
  cachedCanEquipItemCount = Item.all().filter((item) => canEquip(item)).length;
  return cachedCanEquipItemCount;
}

/**
 * Checks the objective cache for a valid entry.
 * @param cacheKey The cache key to check.
 * @param updateOnFamiliarChange Ignore cache if familiar has changed.
 * @param updateOnCanEquipChanged Ignore cache if stats have changed what can be equipped.
 * @returns A valid CacheEntry or null.
 */
function checkCache(
  cacheKey: string,
  options: MaximizeOptions
): CacheEntry | null {
  const entry = cachedObjectives[cacheKey];
  if (!entry) {
    return null;
  }

  if (options.updateOnFamiliarChange && myFamiliar() !== entry.familiar) {
    logger.warning(
      "Equipment found in maximize cache but familiar is different."
    );
    return null;
  }

  if (
    options.updateOnCanEquipChanged &&
    entry.canEquipItemCount !== canEquipItemCount()
  ) {
    logger.warning(
      "Equipment found in maximize cache but equippable item list is out of date."
    );
    return null;
  }

  return entry;
}

/**
 * Applies equipment that was found in the cache.
 * @param entry The CacheEntry to apply
 */
function applyCached(entry: CacheEntry, options: MaximizeOptions): void {
  const outfitName = options.useOutfitCaching
    ? outfitCache.get(entry)
    : undefined;
  if (outfitName) {
    if (!isWearingOutfit(outfitName)) {
      outfit(outfitName);
    }
    const familiarEquip = entry.equipment.get($slot`familiar`);
    if (familiarEquip) equip(familiarEquip);
  } else {
    for (const [slot, item] of entry.equipment) {
      if (equippedItem(slot) !== item && availableAmount(item) > 0) {
        equip(slot, item);
      }
    }
    if (verifyCached(entry) && options.useOutfitCaching) {
      const outfitName = outfitCache.insert(entry);
      logger.info(`Saving equipment to outfit ${outfitName}.`);
      saveOutfit(outfitName);
    }
  }

  if (
    equippedAmount($item`Crown of Thrones`) > 0 &&
    entry.rider.get($item`Crown of Thrones`)
  ) {
    enthroneFamiliar(
      entry.rider.get($item`Crown of Thrones`) || $familiar`none`
    );
  }

  if (
    equippedAmount($item`Buddy Bjorn`) > 0 &&
    entry.rider.get($item`Buddy Bjorn`)
  ) {
    bjornifyFamiliar(entry.rider.get($item`Buddy Bjorn`) || $familiar`none`);
  }
}

const slotStructure = [
  $slots`hat`,
  $slots`back`,
  $slots`shirt`,
  $slots`weapon, off-hand`,
  $slots`pants`,
  $slots`acc1, acc2, acc3`,
  $slots`familiar`,
] as const;

/**
 * Verifies that a CacheEntry was applied successfully.
 * @param entry The CacheEntry to verify
 * @returns If all desired equipment was appliedn in the correct slots.
 */
function verifyCached(entry: CacheEntry): boolean {
  let success = true;
  for (const slotGroup of slotStructure) {
    const desiredSet = slotGroup.map(
      (slot) => entry.equipment.get(slot) ?? $item`none`
    );
    const equippedSet = slotGroup.map((slot) => equippedItem(slot));
    if (!setEqual(desiredSet, equippedSet)) {
      logger.warning(
        `Failed to apply cached ${desiredSet.join(", ")} in ${slotGroup.join(
          ", "
        )}.`
      );
      success = false;
    }
  }

  if (
    equippedAmount($item`Crown of Thrones`) > 0 &&
    entry.rider.get($item`Crown of Thrones`)
  ) {
    if (entry.rider.get($item`Crown of Thrones`) !== myEnthronedFamiliar()) {
      logger.warning(
        `Failed to apply ${entry.rider.get(
          $item`Crown of Thrones`
        )} in ${$item`Crown of Thrones`}.`
      );
      success = false;
    }
  }

  if (
    equippedAmount($item`Buddy Bjorn`) > 0 &&
    entry.rider.get($item`Buddy Bjorn`)
  ) {
    if (entry.rider.get($item`Buddy Bjorn`) !== myBjornedFamiliar()) {
      logger.warning(
        `Failed to apply${entry.rider.get(
          $item`Buddy Bjorn`
        )} in ${$item`Buddy Bjorn`}.`
      );
      success = false;
    }
  }

  return success;
}

/**
 * Save current equipment to the objective cache.
 * @param cacheKey The cache key to save.
 */
function saveCached(cacheKey: string, options: MaximizeOptions): void {
  const equipment: Map<Slot, Item> = new Map<Slot, Item>();
  const rider: Map<Item, Familiar> = new Map<Item, Familiar>();

  for (const slot of cachedSlots) {
    equipment.set(slot, equippedItem(slot));
  }

  if (equippedAmount($item`card sleeve`) > 0) {
    equipment.set($slot`card-sleeve`, equippedItem($slot`card-sleeve`));
  }

  if (equippedAmount($item`Crown of Thrones`) > 0) {
    rider.set($item`Crown of Thrones`, myEnthronedFamiliar());
  }

  if (equippedAmount($item`Buddy Bjorn`) > 0) {
    rider.set($item`Buddy Bjorn`, myBjornedFamiliar());
  }

  if (options.preventSlot && options.preventSlot.length > 0) {
    for (const slot of options.preventSlot) {
      equipment.delete(slot);
    }
    if (options.preventSlot.includes($slot`buddy-bjorn`)) {
      rider.delete($item`Buddy Bjorn`);
    }
    if (options.preventSlot.includes($slot`crown-of-thrones`)) {
      rider.delete($item`Crown of Thrones`);
    }
  }

  if (options.onlySlot && options.onlySlot.length > 0) {
    for (const slot of Slot.all()) {
      if (!options.onlySlot.includes(slot)) {
        equipment.delete(slot);
      }
    }

    if (!options.onlySlot.includes($slot`buddy-bjorn`)) {
      rider.delete($item`Buddy Bjorn`);
    }
    if (!options.onlySlot.includes($slot`crown-of-thrones`)) {
      rider.delete($item`Crown of Thrones`);
    }
  }

  const entry = new CacheEntry(
    equipment,
    rider,
    myFamiliar(),
    canEquipItemCount()
  );
  cachedObjectives[cacheKey] = entry;
  if (options.useOutfitCaching) {
    const outfitName = outfitCache.insert(entry);
    logger.info(`Saving equipment to outfit ${outfitName}.`);
    saveOutfit(outfitName);
  }
}

/**
 * Run the maximizer, but only if the objective and certain pieces of game state haven't changed since it was last run.
 * @param objectives Objectives to maximize for.
 * @param options Options for this run of the maximizer.
 * @param options.updateOnFamiliarChange Re-run the maximizer if familiar has changed. Default true.
 * @param options.updateOnCanEquipChanged Re-run the maximizer if stats have changed what can be equipped. Default true.
 * @param options.forceEquip Equipment to force-equip ("equip X").
 * @param options.preventEquip Equipment to prevent equipping ("-equip X").
 * @param options.bonusEquip Equipment to apply a bonus to ("200 bonus X").
 */
export function maximizeCached(
  objectives: string[],
  options: Partial<MaximizeOptions> = {}
): void {
  const fullOptions = mergeMaximizeOptions(defaultMaximizeOptions, options);
  const {
    forceEquip,
    preventEquip,
    bonusEquip,
    onlySlot,
    preventSlot,
  }: {
    updateOnFamiliarChange: boolean;
    updateOnCanEquipChanged: boolean;
    forceEquip: Item[];
    preventEquip: Item[];
    bonusEquip: Map<Item, number>;
    onlySlot: Slot[];
    preventSlot: Slot[];
  } = fullOptions;

  // Sort each group in objective to ensure consistent ordering in string
  const objective = [
    ...objectives.sort(),
    ...forceEquip.map((item) => `equip ${item}`).sort(),
    ...preventEquip.map((item) => `-equip ${item}`).sort(),
    ...onlySlot.map((slot) => `${slot}`).sort(),
    ...preventSlot.map((slot) => `-${slot}`).sort(),
    ...Array.from(bonusEquip.entries())
      .filter(([, bonus]) => bonus !== 0)
      .map(([item, bonus]) => `${Math.round(bonus * 100) / 100} bonus ${item}`)
      .sort(),
  ].join(", ");

  const cacheEntry = checkCache(objective, fullOptions);
  if (cacheEntry) {
    logger.info("Equipment found in maximize cache, equipping...");
    applyCached(cacheEntry, fullOptions);
    if (verifyCached(cacheEntry)) {
      logger.info(`Equipped cached ${objective}`);
      return;
    }
    logger.warning("Maximize cache application failed, maximizing...");
  }

  maximize(objective, false);
  saveCached(objective, fullOptions);
}

export class Requirement {
  #maximizeParameters: string[];
  #maximizeOptions: Partial<MaximizeOptions>;

  /**
   * A convenient way of combining maximization parameters and options
   * @param maximizeParameters Parameters you're attempting to maximize
   * @param maximizeOptions Object potentially containing forceEquips, bonusEquips, preventEquips, and preventSlots
   */
  constructor(
    maximizeParameters: string[],
    maximizeOptions: Partial<MaximizeOptions>
  ) {
    this.#maximizeParameters = maximizeParameters;
    this.#maximizeOptions = maximizeOptions;
  }

  get maximizeParameters(): string[] {
    return this.#maximizeParameters;
  }

  get maximizeOptions(): Partial<MaximizeOptions> {
    return this.#maximizeOptions;
  }
  /**
   * Merges two requirements, concanating relevant arrays. Typically used in static form.
   * @param other Requirement to merge with.
   */

  merge(other: Requirement): Requirement {
    const optionsA = this.maximizeOptions;
    const optionsB = other.maximizeOptions;
    return new Requirement(
      [...this.maximizeParameters, ...other.maximizeParameters],
      {
        updateOnFamiliarChange:
          optionsA.updateOnFamiliarChange ||
          other.maximizeOptions.updateOnFamiliarChange,
        updateOnCanEquipChanged:
          optionsA.updateOnCanEquipChanged ||
          other.maximizeOptions.updateOnCanEquipChanged,
        forceEquip: [
          ...(optionsA.forceEquip ?? []),
          ...(other.maximizeOptions.forceEquip ?? []),
        ],
        preventEquip: [
          ...(optionsA.preventEquip ?? []),
          ...(other.maximizeOptions.preventEquip ?? []),
        ],
        bonusEquip: new Map([
          ...(optionsA.bonusEquip?.entries() ?? []),
          ...(optionsB.bonusEquip?.entries() ?? []),
        ]),
        onlySlot: [...(optionsA.onlySlot ?? []), ...(optionsB.onlySlot ?? [])],
        preventSlot: [
          ...(optionsA.preventSlot ?? []),
          ...(optionsB.preventSlot ?? []),
        ],
      }
    );
  }

  /**
   * Merges a set of requirements together, starting with an empty requirement.
   * @param allRequirements Requirements to merge
   */
  static merge(allRequirements: Requirement[]): Requirement {
    return allRequirements.reduce(
      (x, y) => x.merge(y),
      new Requirement([], {})
    );
  }

  /**
   * Runs maximizeCached, using the maximizeParameters and maximizeOptions contained by this requirement.
   */
  maximize(): void {
    maximizeCached(this.maximizeParameters, this.maximizeOptions);
  }

  /**
   * Merges requirements, and then runs maximizeCached on the combined requirement.
   * @param requirements Requirements to maximize on
   */
  static maximize(...requirements: Requirement[]): void {
    Requirement.merge(requirements).maximize();
  }
}
