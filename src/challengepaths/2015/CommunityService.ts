import {
  equippedItem,
  familiarWeight,
  getPower,
  haveEquipped,
  myBasestat,
  myBuffedstat,
  myClass,
  myFamiliar,
  myLevel,
  myMaxhp,
  myThrall,
  myTurncount,
  numericModifier,
  print,
  runChoice,
  toSlot,
  visitUrl,
  weightAdjustment,
} from "kolmafia";
import { get } from "../../property";
import { Requirement } from "../../maximize";
import {
  $class,
  $familiar,
  $item,
  $items,
  $skill,
  $slot,
  $stat,
  $thrall,
} from "../../template-string";
import { get as getModifier } from "../../modifier";
import { have } from "../../lib";
import { SongBoom } from "../../resources";

export const log: {
  [index: string]: {
    predictedTurns: number;
    turnCost: number;
    seconds: number;
  };
} = {};

class Test {
  private id: number;
  private name: string;
  private predictor: () => number;
  private maximizeRequirements: Requirement | null;

  constructor(
    id: number,
    name: string,
    predictor: () => number,
    maximizeRequirements: Requirement | null = null
  ) {
    this.id = id;
    this.name = name;
    this.predictor = predictor;
    this.maximizeRequirements = maximizeRequirements;
  }

  isDone(): boolean {
    return get("csServicesPerformed").includes(this.name);
  }

  maximize(): void {
    if (this.maximizeRequirements) this.maximizeRequirements.maximize();
  }

  do(): boolean {
    visitUrl("council.php");
    runChoice(this.id);
    return this.isDone();
  }

  run<T>(prepare: () => T): T | null {
    if (this.isDone()) return null;

    print();
    print("=======================================");
    print(`Beginning test ${this.constructor.name}.`, "blue");

    const startTime = Date.now();
    const startTurns = myTurncount();
    try {
      return prepare();
    } finally {
      const prediction = this.predictor();
      print(
        `Executing test ${this.constructor.name}, predicting ${prediction} turns.`
      );

      this.do();

      const loggedTest = {
        predictedTurns: prediction,
        turnCost: myTurncount() - startTurns,
        seconds: (Date.now() - startTime) / 1000,
      };

      if (this.isDone()) {
        print(
          `Finished test ${this.name}. ` +
            `Took ${loggedTest.seconds.toFixed(1)} seconds and ${
              loggedTest.turnCost
            } turns.`,
          "blue"
        );

        log[this.name] = loggedTest;
      } else {
        print(
          `Failed to complete test ${this.name} for unknown reasons`,
          "red"
        );
      }
    }
  }
}

const thralls = new Map<Stat, Thrall>([
  [$stat`muscle`, $thrall`Undead Elbow Macaroni`],
  [$stat`moxie`, $thrall`Bind Penne Dreadful`],
]);

const statTestPredictor = (stat: Stat) => {
  let baseStat: Stat = stat;
  if (myClass() === $class`Pastamancer`) {
    const thrall = thralls.get(stat);
    if (thrall && myThrall() === thrall) baseStat = $stat`mysticality`;
  }

  return () =>
    60 - Math.floor((1 / 30) * (myBuffedstat(stat) - myBasestat(baseStat)));
};

export const HP = new Test(
  1,
  "Donate Blood",
  () => 60 - Math.floor((myMaxhp() - myBuffedstat($stat`muscle`) - 3) / 30),
  new Requirement(["HP"], {})
);

export const Muscle = new Test(
  2,
  "Feed The Children",
  statTestPredictor($stat`muscle`),
  new Requirement(["Muscle"], {})
);

export const Mysticality = new Test(
  3,
  "Build Playground Mazes",
  statTestPredictor($stat`mysticality`),
  new Requirement(["Mysticality"], {})
);

export const Moxie = new Test(
  4,
  "Feed Conspirators",
  statTestPredictor($stat`moxie`),
  new Requirement(["Moxie"], {})
);

export const FamiliarWeight = new Test(
  5,
  "Breed More Collies",
  () =>
    60 - Math.floor((familiarWeight(myFamiliar()) + weightAdjustment()) / 5),
  new Requirement(["Familiar Weight"], {})
);

export const WeaponDamage = new Test(
  6,
  "Reduce Gazelle Population",
  () => {
    const weaponPower = getPower(equippedItem($slot`weapon`));
    const offhandPower =
      toSlot(equippedItem($slot`off-hand`)) === $slot`weapon`
        ? getPower(equippedItem($slot`off-hand`))
        : 0;
    const familiarPower =
      toSlot(equippedItem($slot`familiar`)) === $slot`weapon`
        ? getPower(equippedItem($slot`familiar`))
        : 0;
    const songDamage =
      SongBoom.song() === "These Fists Were Made for Punchin'" ? myLevel() : 0;
    return (
      60 -
      Math.floor(
        (getModifier("Weapon Damage") -
          0.15 * (weaponPower + offhandPower + familiarPower) -
          songDamage) /
          25 +
          0.001
      ) -
      Math.floor(getModifier("Weapon Damage Percent") / 25 + 0.001)
    );
  },
  new Requirement(["Weapon Damage", "Weapon Damage Percent"], {})
);

export const SpellDamage = new Test(
  7,
  "Make Sausage",
  () => {
    const spicyDamage = have($skill`Intrinsic Spiciness`) ? 11 : 0;
    const dragonfishDamage =
      myFamiliar() === $familiar`Magic Dragonfish`
        ? numericModifier(
            $familiar`Magic Dragonfish`,
            "Spell Damage Percent",
            familiarWeight($familiar`Magic Dragonfish`) + weightAdjustment(),
            $item`none`
          )
        : 0;
    return (
      60 -
      Math.floor((getModifier("Spell Damage") - spicyDamage) / 25 + 0.001) -
      Math.floor(
        (getModifier("Spell Damage Percent") - dragonfishDamage) / 25 + 0.001
      )
    );
  },
  new Requirement(["Spell Damage", "Spell Damage Percent"], {})
);

export const Noncombat = new Test(
  8,
  "Be a Living Statue",
  () => {
    const noncombatRate = -1 * getModifier("Combat Rate");
    const unsoftcappedRate =
      noncombatRate > 25 ? 25 + (noncombatRate - 25) * 5 : noncombatRate;
    return 60 - 3 * Math.floor(unsoftcappedRate / 5);
  },
  new Requirement(["-combat"], {})
);

export const BoozeDrop = new Test(
  9,
  "Make Margaritas",
  () => {
    const familiarItemDrop = numericModifier(
      myFamiliar(),
      "Item Drop",
      familiarWeight(myFamiliar()) + weightAdjustment(),
      equippedItem($slot`familiar`)
    );
    if (
      haveEquipped($item`broken champagne bottle`) &&
      get("garbageChampagneCharge") > 0
    ) {
      return (
        60 -
        Math.floor((getModifier("Item Drop") - familiarItemDrop) / 60 + 0.001) -
        Math.floor(getModifier("Booze Drop") / 15 + 0.001)
      );
    } else {
      return (
        60 -
        Math.floor((getModifier("Item Drop") - familiarItemDrop) / 30 + 0.001) -
        Math.floor(getModifier("Booze Drop") / 15 + 0.001)
      );
    }
  },
  new Requirement(["Item Drop", "2 Booze Drop"], {
    preventEquip: $items`broken champagne bottle`,
  })
);

export const HotRes = new Test(
  10,
  "Clean Steam Tunnels",
  () => getModifier("Hot Resistance"),
  new Requirement(["Hot Resistance"], {})
);

export const CoilWire = new Test(11, "Coil Wire", () => 60, null);
