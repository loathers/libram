import { Familiar, Item, mallPrice, Skill, useFamiliar } from "kolmafia";
import { Macro } from "../combat";
import { Requirement } from "../maximize";
import { sum } from "../utils";

export type FindActionSourceConstraints = {
  /**
   * Function returning true if we only accept familiar-based actions.
   */
  requireFamiliar?: () => boolean;

  /**
   * Function returning true if we only accept sources that are unlimited.
   */
  requireUnlimited?: () => boolean;

  /**
   * Function returning whether to disallow actions requiring familiar change.
   */
  noFamiliar?: () => boolean;

  /**
   * Function returning whether to disallow actions requiring equipment change.
   */
  noRequirements?: () => boolean;

  /**
   * Function returning whether to disallow actions requiring preparation.
   */
  noPreparation?: () => boolean;

  /**
   * Function returning maximum cost of allowed actions. If undefined, allow
   * only actions that cost nothing.
   */
  maximumCost?: () => number;

  /**
   * Function allowing for custom logic if an action should be allowed.
   * If undefined, allow all actions to be considered by other constraints.
   *
   * @param action The action that is being considered.
   * @returns True if the action should be allowed.
   */
  allowedAction?: (action: ActionSource) => boolean;
};

export type ActionConstraints = {
  /**
   * Equipment requirements to have this action available.
   */
  equipmentRequirements?: () => Requirement;

  /**
   * Familiar required to be in use to have this action available.
   */
  familiar?: () => Familiar;

  /**
   * Miscellaneous preparation to ensure this action is available.
   */
  preparation?: () => boolean;

  /**
   * Cost in meat per usage of this action.
   */
  cost?: () => number;
};

function mergeConstraints(
  ...allConstraints: ActionConstraints[]
): ActionConstraints | null {
  const familiars = allConstraints
    .map((constraints) => constraints.familiar)
    .filter((familiar) => familiar);
  if (familiars.length > 1) {
    // Inconsistent requirements.
    return null;
  }
  return {
    equipmentRequirements: () =>
      Requirement.merge([
        ...allConstraints.map(
          (constraints) =>
            constraints.equipmentRequirements?.() ?? new Requirement([], {})
        ),
      ]),
    preparation: () => {
      let success = true;
      for (const constraints of allConstraints) {
        success =
          success && (!constraints.preparation || constraints.preparation());
      }
      return success;
    },
    familiar: familiars.find((familiar) => familiar),
    cost: () => sum(allConstraints, (constraints) => constraints.cost?.() ?? 0),
  };
}

/**
 * A combat-based action resource in the game (e.g. a free run or free kill).
 */
export class ActionSource {
  static defaultPriceFunction = (item: Item) =>
    mallPrice(item) > 0 ? mallPrice(item) : Infinity;
  source: Item | Skill | Familiar | Array<Item | Skill | Familiar>;
  potential: () => number; // Infinity: unlimited
  macro: Macro;
  constraints: ActionConstraints;

  /**
   * @param source Source(s) of the action (e.g. item, skill, or familiar needed).
   * @param potential Function returning how many times this action can be used.
   * @param macro Macro to execute this action in combat.
   * @param constraints Constraints required for this action to be available.
   */
  constructor(
    source: Item | Skill | Familiar | Array<Item | Skill | Familiar>,
    potential: () => number,
    macro: Macro,
    constraints: ActionConstraints = {}
  ) {
    this.source = source;
    this.potential = potential;
    this.macro = macro;
    this.constraints = constraints;
  }

  /**
   * @returns Name of the action source.
   */
  name(): string {
    return this.source.toString();
  }

  /**
   * @returns Whether the action is available.
   */
  available(): boolean {
    return this.potential() > 0;
  }

  /**
   * @returns Cost in meat per usage of the action.
   */
  cost(): number {
    return this.constraints.cost ? this.constraints.cost() : 0;
  }

  /**
   * @returns Whether the action costs 0 meat to use.
   */
  isFree(): boolean {
    return !this.cost || this.cost() === 0;
  }

  /**
   * @returns Whether unlimited uses of the action are available.
   */
  isUnlimited(): boolean {
    return this.potential() === Infinity;
  }

  /**
   * Create a compound action source with merged constraints.
   * @param others Other actions to have available.
   * @returns Merged constraints, or null if they are inconsistent.
   */
  merge(...others: ActionSource[]): ActionSource | null {
    const actions = [this, ...others];
    const constraints = mergeConstraints(
      ...actions.map((action) => action.constraints)
    );
    if (constraints === null) {
      // Inconsistent constraints - no path forward here.
      return null;
    }
    return new ActionSource(
      [...actions.map((action) => action.source).flat()],
      () => sum(actions, (action) => action.potential()),
      Macro.step(...actions.map((action) => action.macro)),
      constraints
    );
  }

  /**
   * Perform all preparation necessary to make this action available.
   * @param otherRequirements Any other equipment requirements.
   * @returns Whether preparation succeeded.
   */
  prepare(otherRequirements?: Requirement): boolean {
    if (this.constraints.familiar?.()) {
      if (!useFamiliar(this.constraints.familiar())) return false;
    }
    if (this.constraints.equipmentRequirements) {
      const requirement = otherRequirements
        ? otherRequirements.merge(this.constraints.equipmentRequirements())
        : this.constraints.equipmentRequirements();
      if (!requirement.maximize()) return false;
    }
    if (this.constraints.preparation) return this.constraints.preparation();
    return true;
  }

  /**
   * Perform all preparation necessary to make this action available.
   * Throws an error if preparation fails.
   * @param otherRequirements Any other equipment requirements.
   */
  ensure(otherRequirements?: Requirement): void {
    if (!this.prepare(otherRequirements)) {
      throw new Error(`Failed to prepare action ${this.name()}.`);
    }
  }
}

function filterAction(
  action: ActionSource,
  constraints: FindActionSourceConstraints
): boolean {
  return (
    action.available() &&
    (constraints.allowedAction === undefined ||
      constraints.allowedAction(action)) &&
    !(constraints.requireFamiliar?.() && !action.constraints.familiar) &&
    !(constraints.requireUnlimited?.() && !action.isUnlimited()) &&
    !(constraints.noFamiliar?.() && action.constraints.familiar) &&
    !(
      constraints.noRequirements?.() && action.constraints.equipmentRequirements
    ) &&
    !(constraints.noPreparation?.() && action.constraints.preparation) &&
    action.cost() <= (constraints.maximumCost?.() ?? 0)
  );
}

/**
 * Find an available action source subject to constraints.
 * @param actions Action source list.
 * @param constraints Preexisting constraints that restrict possible sources.
 * @returns Available action source satisfying constraints, or null.
 */
export function findActionSource(
  actions: ActionSource[],
  constraints: FindActionSourceConstraints = {}
): ActionSource | null {
  const validActions = actions.filter((actions) =>
    filterAction(actions, constraints)
  );
  return validActions
    ? validActions.reduce((a, b) => (a.cost() > b.cost() ? a : b))
    : null;
}

/**
 * Count available action sources subject to constraints. Note that, if
 * constraints.maximumCost is high enough, this will return Infinity.
 * @param actions Action source list.
 * @param constraints Preexisting constraints that restrict possible sources.
 * @returns Count of available action sources.
 */
export function actionSourcesAvailable(
  actions: ActionSource[],
  constraints: FindActionSourceConstraints = {}
): number {
  // TODO: This will overcount if any Actions share a counter
  return sum(
    actions.filter((action) => filterAction(action, constraints ?? {})),
    (action) => action.potential()
  );
}
