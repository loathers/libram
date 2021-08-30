import {
  availableAmount,
  bjornifyFamiliar,
  canEquip,
  enthroneFamiliar,
  equip,
  equippedAmount,
  equippedItem,
  maximize,
  myBasestat,
  myBjornedFamiliar,
  myEnthronedFamiliar,
  myFamiliar,
} from "kolmafia";
import { $familiar, $item, $slot, $slots, $stats } from "./template-string";
import logger from "./logger";
import merge from "lodash/merge";

export type MaximizeOptions = {
  updateOnFamiliarChange?: boolean;
  updateOnCanEquipChanged?: boolean;
  forceEquip?: Item[];
  preventEquip?: Item[];
  bonusEquip?: Map<Item, number>;
  onlySlot?: Slot[];
  preventSlot?: Slot[];
};

const defaultMaximizeOptions = {
  updateOnFamiliarChange: true,
  updateOnCanEquipChanged: true,
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
export function setDefaultMaximizeOptions(options: MaximizeOptions): void {
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

// Objective cache entries.
const cachedObjectives: { [string: string]: CacheEntry } = {};
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
  updateOnFamiliarChange: boolean,
  updateOnCanEquipChanged: boolean
): CacheEntry | null {
  const entry = cachedObjectives[cacheKey];
  if (!entry) {
    return null;
  }

  if (updateOnFamiliarChange && myFamiliar() !== entry.familiar) {
    logger.warning(
      "Equipment found in maximize cache but familiar is different."
    );
    return null;
  }

  if (
    updateOnCanEquipChanged &&
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
function applyCached(entry: CacheEntry): void {
  for (const [slot, item] of entry.equipment) {
    if (equippedItem(slot) !== item && availableAmount(item) > 0) {
      equip(slot, item);
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

/**
 * Verifies that a CacheEntry was applied successfully.
 * @param entry The CacheEntry to verify
 * @returns If all desired equipment was appliedn in the correct slots.
 */
function verifyCached(entry: CacheEntry): boolean {
  let success = true;
  for (const [slot, item] of entry.equipment) {
    if (equippedItem(slot) !== item) {
      logger.warning(`Failed to apply cached ${item} in ${slot}.`);
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

  cachedObjectives[cacheKey] = new CacheEntry(
    equipment,
    rider,
    myFamiliar(),
    canEquipItemCount()
  );
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
  options: MaximizeOptions = {}
): void {
  const {
    updateOnFamiliarChange,
    updateOnCanEquipChanged,
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
  } = { ...defaultMaximizeOptions, ...options };

  // Sort each group in objective to ensure consistent ordering in string
  const objective = [
    ...objectives.sort(),
    ...forceEquip.map((item) => `equip ${item}`).sort(),
    ...preventEquip.map((item) => `-equip ${item}`).sort(),
    ...onlySlot
      .filter((slot) => !$slots`buddy-bjorn, crown-of-thrones`.includes(slot))
      .map((slot) => `${slot}`)
      .sort(),
    ...preventSlot
      .filter((slot) => !$slots`buddy-bjorn, crown-of-thrones`.includes(slot))
      .map((slot) => `-${slot}`)
      .sort(),
    ...Array.from(bonusEquip.entries())
      .filter(([, bonus]) => bonus !== 0)
      .map(([item, bonus]) => `${Math.round(bonus * 100) / 100} bonus ${item}`)
      .sort(),
  ].join(", ");

  const cacheEntry = checkCache(
    objective,
    updateOnFamiliarChange,
    updateOnCanEquipChanged
  );
  if (cacheEntry) {
    logger.info("Equipment found in maximize cache, equipping...");
    applyCached(cacheEntry);
    if (verifyCached(cacheEntry)) {
      logger.info(`Equipped cached ${objective}`);
      return;
    }
    logger.warning("Maximize cache application failed, maximizing...");
  }

  maximize(objective, false);
  saveCached(objective, options);
}

export class Requirement {
  #maximizeParameters: string[];
  #maximizeOptions: MaximizeOptions;

  /**
   * A convenient way of combining maximization parameters and options
   * @param maximizeParameters Parameters you're attempting to maximize
   * @param maximizeOptions Object potentially containing forceEquips, bonusEquips, preventEquips, and preventSlots
   */
  constructor(maximizeParameters: string[], maximizeOptions: MaximizeOptions) {
    this.#maximizeParameters = maximizeParameters;
    this.#maximizeOptions = maximizeOptions;
  }

  get maximizeParameters(): string[] {
    return this.#maximizeParameters;
  }

  get maximizeOptions(): MaximizeOptions {
    return this.#maximizeOptions;
  }

  merge(other: Requirement): Requirement {
    return merge(this, other);
  }

  static merge(allRequirements: Requirement[]): Requirement {
    return allRequirements.reduce(
      (x, y) => x.merge(y),
      new Requirement([], {})
    );
  }
}

export function maximizeRequirementsCached(requirements: Requirement[]): void {
  const compiledRequirements = Requirement.merge(requirements);
  maximizeCached(
    compiledRequirements.maximizeParameters,
    compiledRequirements.maximizeOptions
  );
}
