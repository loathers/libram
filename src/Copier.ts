import { Monster } from "kolmafia";

export class Copier {
  private couldCopy: () => boolean;
  private prepare: (() => boolean) | null;
  private canCopy: () => boolean;
  private copiedMonster: () => Monster | null;
  private fightCopy: (() => boolean) | null = null;

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

  // static PrintScreenButton = new Copier(
  //   $item`print screen button`,
  //   null,
  //   $item`screencapped monster`,
  //   () => property.getMonster(`screencappedMonster`),
  //   () => 1,
  //   () => use($item`screencapped monster`)
  // );

  // static PulledGreenTaffy = new Copier(
  //   $item`pulled green taffy`,
  //   null,
  //   $item`envyfish egg`,
  //   () => property.getMonster(`screencappedMonster`),
  //   () => (property.getBoolean("_envyfishEggUsed") ? 0 : 1),
  //   () => use($item`envyfish egg`)
  // );
}
