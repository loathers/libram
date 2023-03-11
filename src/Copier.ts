import { Monster } from "kolmafia";

export class Copier {
  readonly couldCopy: () => boolean;
  readonly prepare: (() => boolean) | null;
  readonly canCopy: () => boolean;
  readonly copiedMonster: () => Monster | null;
  readonly fightCopy: (() => boolean) | null = null;

  constructor(
    couldCopy: () => boolean,
    prepare: (() => boolean) | null,
    canCopy: () => boolean,
    copiedMonster: () => Monster | null,
    fightCopy?: () => boolean
  ) {
    this.couldCopy = couldCopy;
    this.prepare = prepare;
    this.canCopy = canCopy;
    this.copiedMonster = copiedMonster;
    if (fightCopy) this.fightCopy = fightCopy;
  }
}
