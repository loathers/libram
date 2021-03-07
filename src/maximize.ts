import { maximize, myBasestat, myFamiliar } from "kolmafia";
import { $stats } from "./template-string";

export type MaximizeOptions = {
  updateOnFamiliarChange?: boolean;
  updateOnStatThreshold?: number | null;
  forceEquip?: Item[];
  preventEquip?: Item[];
  bonusEquip?: Map<Item, number>;
};

const defaultMaximizeOptions = {
  updateOnFamiliarChange: true,
  updateOnStatThreshold: 10,
  forceEquip: [],
  preventEquip: [],
  bonusEquip: new Map(),
};

/**
 *
 * @param options Default options for each maximizer run.
 * @param options.updateOnFamiliarChange Re-run the maximizer if familiar has changed. Default true.
 * @param options.updateOnStatThreshold Re-run the maximizer if a stat has newly passed an even multiple
 * of this number (for new equip requirements), or null otherwise. Default 10.
 * @param options.forceEquip Equipment to force-equip ("equip X").
 * @param options.preventEquip Equipment to prevent equipping ("-equip X").
 * @param options.bonusEquip Equipment to apply a bonus to ("200 bonus X").
 */
export function setDefaultMaximizeOptions(options: MaximizeOptions): void {
  Object.assign(defaultMaximizeOptions, options);
}

let cachedObjective: string | null = null;
let cachedStats = [0, 0, 0];
let cachedFamiliar: Familiar | null = null;

/**
 * Run the maximizer, but only if the objective and certain pieces of game state haven't changed since it was last run.
 * @param objectives Objectives to maximize for.
 * @param options Options for this run of the maximizer.
 * @param options.updateOnFamiliarChange Re-run the maximizer if familiar has changed. Default true.
 * @param options.updateOnStatThreshold Re-run the maximizer if a stat has newly passed an even multiple
 * of this number (for new equip requirements), or null otherwise. Default 10.
 * @param options.forceEquip Equipment to force-equip ("equip X").
 * @param options.preventEquip Equipment to prevent equipping ("-equip X").
 * @param options.bonusEquip Equipment to apply a bonus to ("200 bonus X").
 */
export function maximizeCached(
  objectives: string[],
  options: MaximizeOptions
): void {
  const {
    updateOnFamiliarChange,
    updateOnStatThreshold,
    forceEquip,
    preventEquip,
    bonusEquip,
  }: {
    updateOnFamiliarChange: boolean;
    updateOnStatThreshold: number | null;
    forceEquip: Item[];
    preventEquip: Item[];
    bonusEquip: Map<Item, number>;
  } = { ...defaultMaximizeOptions, ...options };

  const objective = [
    ...objectives,
    ...forceEquip.map((item) => `equip ${item}`),
    ...preventEquip.map((item) => `-equip ${item}`),
    ...Array.from(bonusEquip.entries()).map(
      ([item, bonus]) => `${bonus} bonus ${item}`
    ),
  ].join(", ");

  const stats = $stats`Muscle, Mysticality, Moxie`.map((stat) =>
    myBasestat(stat)
  );
  // The highest known equip requirement is 300, so don't check after that.
  const statsChanged =
    updateOnStatThreshold !== null &&
    stats.some(
      (newStat, i) =>
        newStat > cachedStats[i] &&
        cachedStats[i] < 300 &&
        newStat % updateOnStatThreshold === 0
    );

  const familiarChanged =
    updateOnFamiliarChange && cachedFamiliar !== myFamiliar();

  if (statsChanged || familiarChanged || objective !== cachedObjective) {
    maximize(objective, false);
  }

  cachedFamiliar = myFamiliar();
  cachedStats = stats;
  cachedObjective = objective;
}
