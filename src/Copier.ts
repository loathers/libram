import { use } from "kolmafia";
import { $item, property } from ".";

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

  static PrintScreenButton = new Copier(
    $item`print screen button`,
    null,
    $item`screencapped monster`,
    () => property.getMonster(`screencappedMonster`),
    () => 1,
    () => use($item`screencapped monster`)
  );

  static PulledGreenTaffy = new Copier(
    $item`pulled green taffy`,
    null,
    $item`envyfish egg`,
    () => property.getMonster(`screencappedMonster`),
    () => (property.getBoolean("_envyfishEggUsed") ? 0 : 1),
    () => use($item`envyfish egg`)
  );

  static RainDohBlackBox = new Copier(
    $item`Rain-Doh black box`,
    null,
    $item`Rain-Doh box full of monster`,
    () => property.getMonster(`rainDohMonster`),
    () =>
      5 -
      property.getNumber("spookyPuttyCopiesMade") +
      property.getNumber("_raindohCopiesMade"),
    () => use($item`Rain-Doh box full of monster`)
  );

  static UnfinishedIceSculpture = new Copier(
    $item`unfinished ice sculpture`,
    null,
    $item`ice sculpture`,
    () => property.getMonster("iceSculptureMonster"),
    () => (property.getBoolean("_iceSculptureUsed") ? 0 : 1),
    () => use($item`ice sculpture`)
  );
}
