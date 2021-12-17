import { Macro } from "../combat";
import { Requirement } from "../maximize";

export type FindActionSourceOptions = {
  requireFree?: () => boolean;
  requireFamiliar?: () => boolean;
  requireUnlimited?: () => boolean;
  noFamiliar?: () => boolean;
  noRequirements?: () => boolean;
  noPreparation?: () => boolean;
  maximumCost?: () => number;
};

export type ActionOptions = {
  equipmentRequirements?: () => Requirement;
  preparation?: () => boolean;
  familiar?: () => Familiar;
  cost?: () => number;
};

function mergeOptions(...options: ActionOptions[]): ActionOptions {
  return {
    equipmentRequirements: () =>
      Requirement.merge([
        ...options.map(
          (option) =>
            option.equipmentRequirements?.() ?? new Requirement([], {})
        ),
      ]),
    preparation: () => {
      let success = true;
      options.forEach(
        (option) =>
          (success = success && (!option?.preparation || option?.preparation()))
      );
      return success;
    },
    // Return thet firs familiar if multiples need them
    familiar: options
      .map((option) => option.familiar)
      .find((familiar) => familiar),
    cost: () =>
      options
        .map((option) => option.cost?.() ?? 0)
        .reduce((previous, current) => previous + current),
  };
}

export class ActionSource {
  source: Item | Skill | Familiar;
  potential: () => number; // -1: unlimited
  macro: Macro;
  options?: ActionOptions;

  constructor(
    source: Item | Skill | Familiar,
    potential: () => number,
    macro: Macro,
    options?: ActionOptions
  ) {
    this.source = source;
    this.potential = potential;
    this.macro = macro;
    this.options = options;
  }

  name(): string {
    return `${this.source}`;
  }

  available(): boolean {
    return this.potential() !== 0;
  }

  cost(): number {
    return this.options?.cost ? this.options?.cost() : 0;
  }

  isFree(): boolean {
    return !this.cost || this.cost() === 0;
  }

  isUnlimited(): boolean {
    return this.potential() === -1;
  }

  merge(...others: ActionSource[]): ActionSource {
    const actions = [this, ...others];
    return new ActionSource(
      this.source,
      () =>
        actions
          .map((action) => action.potential())
          .reduce((previous, current) => previous + current),
      Macro.step(...actions.map((action) => action.macro)),
      mergeOptions(...actions.map((action) => action.options ?? {}))
    );
  }
}

function filterAction(
  action: ActionSource,
  options?: FindActionSourceOptions
): boolean {
  return (
    action.available() &&
    !(options?.requireFree?.() && !action.isFree()) &&
    !(options?.requireFamiliar?.() && !action.options?.familiar) &&
    !(options?.requireUnlimited?.() && !action.isUnlimited()) &&
    !(options?.noFamiliar?.() && action.options?.familiar) &&
    !(options?.noRequirements?.() && action.options?.equipmentRequirements) &&
    !(options?.noPreparation?.() && action.options?.preparation) &&
    !(options?.maximumCost && action.cost() > options.maximumCost())
  );
}

export function findActionSource(
  actions: ActionSource[],
  options?: FindActionSourceOptions
): ActionSource | null {
  return (
    actions
      .filter((actions) => filterAction(actions, options))
      .sort((a, b) => a.cost() - b.cost())
      .find(() => true) ?? null
  );
}

// TODO: This will overcount if any Actions share a counter
export function actionSourcesAvailable(
  actions: ActionSource[],
  options?: FindActionSourceOptions
): number {
  return actions
    .filter((action) => filterAction(action, options))
    .map((action) => action.potential())
    .reduce((previous, current) => previous + current);
}
