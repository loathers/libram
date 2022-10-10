import {
  availableAmount,
  bjornifyFamiliar,
  canEquip,
  cliExecute,
  enthroneFamiliar,
  equip,
  equippedAmount,
  equippedItem,
  Familiar,
  getProperty,
  haveEquipped,
  isWearingOutfit,
  Item,
  maximize,
  myBasestat,
  myBjornedFamiliar,
  myEnthronedFamiliar,
  myFamiliar,
  outfit,
  Slot,
} from "kolmafia";
import logger from "./logger";
import { $familiar, $item, $slot, $slots, $stats } from "./template-string";
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
  forceUpdate: boolean;
  modes: Modes;
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
    ].filter(
      (item) =>
        !defaultOptions.forceEquip.includes(item) &&
        !addendums.forceEquip?.includes(item)
    ),

    bonusEquip: new Map<Item, number>([
      ...defaultOptions.bonusEquip,
      ...(addendums.bonusEquip ?? []),
    ]),

    onlySlot: addendums.onlySlot ?? defaultOptions.onlySlot,

    preventSlot: [
      ...defaultOptions.preventSlot,
      ...(addendums.preventSlot ?? []),
    ],

    forceUpdate: addendums.forceUpdate ?? defaultOptions.forceUpdate,
    modes: { ...defaultOptions.modes, ...(addendums.modes ?? {}) },
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
  forceUpdate: false,
  modes: {},
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

const modeableCommands = [
  "backupcamera",
  "umbrella",
  "snowsuit",
  "edpiece",
  "retrocape",
  "parka",
] as const;
type Mode = typeof modeableCommands[number];
type Modes = Partial<{ [x in Mode]: string }>;
const modeableItems = {
  backupcamera: $item`backup camera`,
  umbrella: $item`unbreakable umbrella`,
  snowsuit: $item`Snow Suit`,
  edpiece: $item`The Crown of Ed the Undying`,
  retrocape: $item`unwrapped knock-off retro superhero cape`,
  parka: $item`Jurassic Parka`,
} as const;

const modeableState = {
  backupcamera: () => getProperty("backupCameraMode"),
  umbrella: () => getProperty("umbrellaState"),
  snowsuit: () => getProperty("snowsuit"),
  edpiece: () => getProperty("edPiece"),
  retrocape: () =>
    getProperty("retroCapeSuperhero") +
    " " +
    getProperty("retroCapeWashingInstructions"),
  parka: () => getProperty("parkaMode"),
} as const;

function getCurrentModes(): Modes {
  const modes: Modes = {};
  for (const key of modeableCommands) {
    if (haveEquipped(modeableItems[key])) {
      modes[key] = modeableState[key]();
    }
  }
  return modes;
}

function applyModes(modes: Modes) {
  for (const command of modeableCommands) {
    if (haveEquipped(modeableItems[command])) {
      if (modeableState[command]() !== modes[command]) {
        cliExecute(command + " " + modes[command]);
      }
    }
  }
}

// Subset of slots that are valid for caching.
const cachedSlots = $slots`hat, weapon, off-hand, back, shirt, pants, acc1, acc2, acc3, familiar`;

class CacheEntry {
  equipment: Map<Slot, Item>;
  rider: Map<Item, Familiar>;
  familiar: Familiar;
  canEquipItemCount: number;
  modes: Modes;

  constructor(
    equipment: Map<Slot, Item>,
    rider: Map<Item, Familiar>,
    familiar: Familiar,
    canEquipItemCount: number,
    modes: Modes
  ) {
    this.equipment = equipment;
    this.rider = rider;
    this.familiar = familiar;
    this.canEquipItemCount = canEquipItemCount;
    this.modes = modes;
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
    if (familiarEquip) equip($slot`familiar`, familiarEquip);
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
      entry.rider.get($item`Crown of Thrones`) || $familiar.none
    );
  }

  if (
    equippedAmount($item`Buddy Bjorn`) > 0 &&
    entry.rider.get($item`Buddy Bjorn`)
  ) {
    bjornifyFamiliar(entry.rider.get($item`Buddy Bjorn`) || $familiar.none);
  }

  applyModes({ ...entry.modes, ...options.modes });
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
    const desiredSlots = slotGroup
      .map((slot) => [slot, entry.equipment.get(slot) ?? null])
      .filter(([, item]) => item !== null) as [Slot, Item][];
    const desiredSet = desiredSlots.map(([, item]) => item);
    const equippedSet = desiredSlots.map(([slot]) => equippedItem(slot));
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
    canEquipItemCount(),
    { ...getCurrentModes(), ...options.modes }
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
 * @returns Whether the maximize call succeeded.
 */
export function maximizeCached(
  objectives: string[],
  options: Partial<MaximizeOptions> = {}
): boolean {
  const fullOptions = mergeMaximizeOptions(defaultMaximizeOptions, options);
  const {
    forceEquip,
    preventEquip,
    bonusEquip,
    onlySlot,
    preventSlot,
    forceUpdate,
  }: {
    updateOnFamiliarChange: boolean;
    updateOnCanEquipChanged: boolean;
    forceEquip: Item[];
    preventEquip: Item[];
    bonusEquip: Map<Item, number>;
    onlySlot: Slot[];
    preventSlot: Slot[];
    forceUpdate: boolean;
  } = fullOptions;

  // Sort each group in objective to ensure consistent ordering in string
  const objective = [
    ...new Set([
      ...objectives.sort(),
      ...forceEquip.map((item) => `equip ${item}`).sort(),
      ...preventEquip.map((item) => `-equip ${item}`).sort(),
      ...onlySlot.map((slot) => `${slot}`).sort(),
      ...preventSlot.map((slot) => `-${slot}`).sort(),
      ...Array.from(bonusEquip.entries())
        .filter(([, bonus]) => bonus !== 0)
        .map(
          ([item, bonus]) => `${Math.round(bonus * 100) / 100} bonus ${item}`
        )
        .sort(),
    ]),
  ].join(", ");

  // Items equipped in slots not touched by the maximizer must be in the cache key
  const untouchedSlots = cachedSlots.filter(
    (slot: Slot) =>
      preventSlot.includes(slot) ||
      (onlySlot.length > 0 && !onlySlot.includes(slot))
  );
  const cacheKey = [
    objective,
    ...untouchedSlots
      .map((slot: Slot) => `${slot}:${equippedItem(slot)}`)
      .sort(),
  ].join("; ");

  const cacheEntry = checkCache(cacheKey, fullOptions);
  if (cacheEntry && !forceUpdate) {
    logger.info("Equipment found in maximize cache, equipping...");
    applyCached(cacheEntry, fullOptions);
    if (verifyCached(cacheEntry)) {
      logger.info(`Equipped cached ${cacheKey}`);
      return true;
    }
    logger.warning("Maximize cache application failed, maximizing...");
  }

  const result = maximize(objective, false);
  saveCached(cacheKey, fullOptions);
  return result;
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
        ].filter((x) => !other.maximizeOptions.preventEquip?.includes(x)),
        preventEquip: [
          ...(optionsA.preventEquip ?? []),
          ...(other.maximizeOptions.preventEquip ?? []),
        ].filter((x) => !other.maximizeOptions.forceEquip?.includes(x)),
        bonusEquip: new Map([
          ...(optionsA.bonusEquip?.entries() ?? []),
          ...(optionsB.bonusEquip?.entries() ?? []),
        ]),
        onlySlot: [...(optionsA.onlySlot ?? []), ...(optionsB.onlySlot ?? [])],
        preventSlot: [
          ...(optionsA.preventSlot ?? []),
          ...(optionsB.preventSlot ?? []),
        ],

        forceUpdate: optionsA.forceUpdate || optionsB.forceUpdate,
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
   * @returns Whether the maximize call succeeded.
   */
  maximize(): boolean {
    return maximizeCached(this.maximizeParameters, this.maximizeOptions);
  }

  /**
   * Merges requirements, and then runs maximizeCached on the combined requirement.
   * @param requirements Requirements to maximize on
   */
  static maximize(...requirements: Requirement[]): void {
    Requirement.merge(requirements).maximize();
  }
}
