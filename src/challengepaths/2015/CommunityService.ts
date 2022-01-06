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
import { sum } from "../../utils";

/**
 * A log of the predicted turns, actual turns, and duration of each CS test performed.
 */
export const log: {
  [index: string]: {
    predictedTurns: number;
    turnCost: number;
    seconds: number;
  };
} = {};

class Test {
  private choice: number;
  private property: string;
  private predictor: () => number;
  private maximizeRequirements: Requirement | null;

  /**
   * Class to store properties of various CS tests.
   * @param id The id the game HTML uses to identify the test; this is used primarily in runChoice.
   * @param property The name of the test as a string, often used as part of the string property "csServicesPerformed".
   * @param predictor A function that returns an estimate for the number of turns that the test will take given your character's current state.
   * @param maximizeRequirements A Requirement object, if applicable, that aligns with the things needed to maximize for this particular test.
   */
  constructor(
    id: number,
    property: string,
    predictor: () => number,
    maximizeRequirements: Requirement | null = null
  ) {
    this.choice = id;
    this.property = property;
    this.predictor = predictor;
    this.maximizeRequirements = maximizeRequirements;
  }

  /**
   * @returns The id number of the test, used primarily in runChoice.
   */
  get id(): number {
    return this.choice;
  }
  /**
   * @returns The name of the test, used primarily as part of the string property "csServicesPerformed"
   */
  get name(): string {
    return this.property;
  }
  /**
   *  @returns The predicted number of turns this test will take given your character's current state.
   */
  get prediction(): number {
    return this.predictor();
  }
  /**
   * @returns A Requirement object, if applicable, that aligns with the things needed to maximize for this particular test.
   */
  get requirement(): Requirement | null {
    return this.maximizeRequirements;
  }

  /**
   * Checks the "csServicesPerformed" property to see whether mafia currently believes this test is complete.
   * @returns Whether mafia currently believes this test is complete.
   */
  isDone(): boolean {
    return get("csServicesPerformed").includes(this.property);
  }

  /**
   * Maximizes based on the Requirement associated with this particular test.
   */
  maximize(): void {
    if (this.maximizeRequirements) this.maximizeRequirements.maximize();
  }

  /**
   * Attempts to turn in the test to the Council of Loathing.
   * @returns Whether mafia believes the test is complete at the end of this function.
   */
  do(): boolean {
    visitUrl("council.php");
    runChoice(this.choice);
    return this.isDone();
  }

  /**
   * Wrapper function that prepares for a test and then completes it, adding time and turn details to the log.
   * @param prepare A function that does all necessary preparations for this CS test, including choosing your outfit.
   * @param beCertain Whether we should check council.php instead of mafia to determine whether the test is complete.
   * @returns The output of the prepare function given, or null if the test is already complete.
   */
  run<T>(prepare: () => T, beCertain = false): T | null {
    const finishedFunction = beCertain ? this.verifyIsDone : this.isDone;
    if (finishedFunction()) return null;

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

      if (finishedFunction()) {
        print(
          `Finished test ${this.property}. ` +
            `Took ${loggedTest.seconds.toFixed(1)} seconds and ${
              loggedTest.turnCost
            } turns.`,
          "blue"
        );

        log[this.property] = loggedTest;
      } else {
        print(
          `Failed to complete test ${this.property} for unknown reasons`,
          "red"
        );
      }
    }
  }

  /**
   * Checks council.php to verify that a test is complete; more reliable than isDone, but requires an additional pagehit.
   * @returns Whether council.php suggests that the test is complete.
   */
  verifyIsDone(): boolean {
    return !visitUrl("council.php").includes(
      `<input type=hidden name=option value=${this.choice}>`
    );
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
    const spicyDamage = have($skill`Intrinsic Spiciness`)
      ? Math.min(10, myLevel())
      : 0;
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

/**
 * Prints turncount and time details of the test in question.
 * @param colour The colour (or color) you'd like the log to be printed in.
 */
export function printLog(colour = "blue"): void {
  const logEntries = Object.entries(log);
  for (const [testName, testEntry] of logEntries) {
    const { predictedTurns, turnCost, seconds } = testEntry;

    print(
      `We predicted the ${testName} test would take ${predictedTurns} turns, ${
        predictedTurns === turnCost ? "and" : "but"
      } it took ${turnCost} turns`,
      colour
    );
    print(`${testName} took ${seconds} seconds`, colour);
  }
  print(
    `All together, you have spent ${sum(
      logEntries,
      ([, testEntry]) => testEntry.seconds
    )} seconds during this Community Service run`,
    colour
  );
}
