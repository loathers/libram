import {
  equippedItem,
  familiarWeight,
  getPower,
  haveEquipped,
  myBasestat,
  myBuffedstat,
  myFamiliar,
  myMaxhp,
  myThrall,
  myTurncount,
  numericModifier,
  print,
  runChoice,
  Stat,
  Thrall,
  toSlot,
  visitUrl,
  weightAdjustment,
} from "kolmafia";
import { have } from "../../lib";
import { Requirement } from "../../maximize";
import { get as getModifier } from "../../modifier";
import { get } from "../../property";
import { MummingTrunk } from "../../resources";
import {
  $effect,
  $familiar,
  $item,
  $items,
  $slot,
  $stat,
  $thrall,
} from "../../template-string";
import { sum } from "../../utils";

const thralls = new Map<Stat, Thrall>([
  [$stat`muscle`, $thrall`Elbow Macaroni`],
  [$stat`moxie`, $thrall`Penne Dreadful`],
]);

const statCommunityServicePredictor = (stat: Stat) => {
  return () =>
    60 -
    Math.floor(
      (1 / 30) *
        (myBuffedstat(stat) -
          myBasestat(
            thralls.get(stat) === myThrall() ? $stat`mysticality` : stat
          ))
    );
};

export default class CommunityService {
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
  private constructor(
    id: number,
    property: string,
    predictor: () => number,
    maximizeRequirements: Requirement
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
    if (get("csServicesPerformed").trim().length === 0) visitUrl("council.php");
    visitUrl("council.php");
    runChoice(this.choice);
    return this.isDone();
  }

  /**
   * Wrapper function that prepares for a test and then completes it, adding time and turn details to the log.
   * @param prepare A function that does all necessary preparations for this CS test, including choosing your outfit. Optionally returns the number of turns you expect to spend preparing for the test.
   * @param beCertain Whether we should check council.php instead of mafia to determine the test cost and whether the test is complete.
   * @param maxTurns We will run the test iff the predicted/actual turns is less than or equal to this parameter.
   * @returns "completed", "failed", or "already completed".
   */
  run(
    prepare: () => void | number,
    beCertain = false,
    maxTurns = Infinity
  ): "completed" | "failed" | "already completed" {
    const finishedFunction = () =>
      beCertain ? this.verifyIsDone() : this.isDone();
    if (finishedFunction()) return "already completed";

    const startTime = Date.now();
    const startTurns = myTurncount();

    let additionalTurns: number;
    try {
      additionalTurns = prepare() ?? 0;
    } catch {
      return "failed";
    }

    const prediction = this.predictor();

    if ((beCertain ? this.actualCost() : prediction) <= maxTurns) {
      this.do();
    }

    if (finishedFunction()) {
      CommunityService.log[this.property] = {
        predictedTurns: prediction + additionalTurns,
        turnCost: myTurncount() - startTurns,
        seconds: (Date.now() - startTime) / 1000,
      };
      return "completed";
    }
    return "failed";
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

  /**
   * Checks council.php for the number of turns this test will take; more reliable than prediction, but requires an additional pagehit.
   * @returns The number of turns to complete this test according to council.php.
   */
  actualCost(): number {
    const match = visitUrl("council.php").match(
      `<input type=hidden name=option value=${this.id}>.*?Perform Service \\((\\d+) Adventures\\)`
    );
    return match ? parseInt(match[1]) : 0;
  }

  /**
   * A log of the predicted turns, actual turns, and duration of each CS test performed.
   */
  static log: {
    [index: string]: {
      predictedTurns: number;
      turnCost: number;
      seconds: number;
    };
  } = {};

  /**
   * Prints turncount and time details of the test in question.
   * @param colour The colour (or color) you'd like the log to be printed in.
   */
  static printLog(colour = "blue"): void {
    const logEntries = Object.entries(CommunityService.log);
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

  // Below, we have the tests themselves.

  static HP = new CommunityService(
    1,
    "Donate Blood",
    () => 60 - Math.floor((myMaxhp() - myBuffedstat($stat`muscle`) - 3) / 30),
    new Requirement(["HP"], {})
  );

  static Muscle = new CommunityService(
    2,
    "Feed The Children",
    statCommunityServicePredictor($stat`Muscle`),
    new Requirement(["Muscle"], {})
  );

  static Mysticality = new CommunityService(
    3,
    "Build Playground Mazes",
    statCommunityServicePredictor($stat`Mysticality`),
    new Requirement(["Mysticality"], {})
  );

  static Moxie = new CommunityService(
    4,
    "Feed Conspirators",
    statCommunityServicePredictor($stat`Moxie`),
    new Requirement(["Moxie"], {})
  );

  static FamiliarWeight = new CommunityService(
    5,
    "Breed More Collies",
    () =>
      60 - Math.floor((familiarWeight(myFamiliar()) + weightAdjustment()) / 5),
    new Requirement(["Familiar Weight"], {})
  );

  static WeaponDamage = new CommunityService(
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

      // mafia does not currently count swagger
      const multiplier = have($effect`Bow-Legged Swagger`) ? 2 : 1;

      // We add 0.001 because the floor function sometimes introduces weird rounding errors
      return (
        60 -
        Math.floor(
          (multiplier *
            (getModifier("Weapon Damage") -
              0.15 * (weaponPower + offhandPower + familiarPower))) /
            50 +
            0.001
        ) -
        Math.floor(
          (multiplier * getModifier("Weapon Damage Percent")) / 50 + 0.001
        )
      );
    },
    new Requirement(["Weapon Damage", "Weapon Damage Percent"], {})
  );

  static SpellDamage = new CommunityService(
    7,
    "Make Sausage",
    () => {
      const dragonfishDamage =
        myFamiliar() === $familiar`Magic Dragonfish`
          ? numericModifier(
              $familiar`Magic Dragonfish`,
              "Spell Damage Percent",
              familiarWeight($familiar`Magic Dragonfish`) + weightAdjustment(),
              $item`none`
            )
          : 0;

      // We add 0.001 because the floor function sometimes introduces weird rounding errors
      return (
        60 -
        Math.floor(getModifier("Spell Damage") / 50 + 0.001) -
        Math.floor(
          (getModifier("Spell Damage Percent") - dragonfishDamage) / 50 + 0.001
        )
      );
    },
    new Requirement(["Spell Damage", "Spell Damage Percent"], {})
  );

  static Noncombat = new CommunityService(
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

  static BoozeDrop = new CommunityService(
    9,
    "Make Margaritas",
    () => {
      const mummingCostume = MummingTrunk.currentCostumes().get(myFamiliar());
      const mummingBuff =
        mummingCostume && mummingCostume[0] === "Item Drop"
          ? mummingCostume[1]
          : 0;

      const familiarItemDrop =
        numericModifier(
          myFamiliar(),
          "Item Drop",
          familiarWeight(myFamiliar()) + weightAdjustment(),
          equippedItem($slot`familiar`)
        ) +
        mummingBuff -
        numericModifier(equippedItem($slot`familiar`), "Item Drop");

      const familiarBoozeDrop =
        numericModifier(
          myFamiliar(),
          "Booze Drop",
          familiarWeight(myFamiliar()) + weightAdjustment(),
          equippedItem($slot`familiar`)
        ) - numericModifier(equippedItem($slot`familiar`), "Booze Drop");

      // Champagne doubling does NOT count for CS, so we undouble
      const multiplier =
        haveEquipped($item`broken champagne bottle`) &&
        get("garbageChampagneCharge") > 0
          ? 0.5
          : 1;

      // We add 0.001 because the floor function sometimes introduces weird rounding errors
      return (
        60 -
        Math.floor(
          (multiplier * (getModifier("Item Drop") - familiarItemDrop)) / 30 +
            0.001
        ) -
        Math.floor((getModifier("Booze Drop") - familiarBoozeDrop) / 15 + 0.001)
      );
    },
    new Requirement(["Item Drop", "2 Booze Drop"], {
      preventEquip: $items`broken champagne bottle`,
    })
  );

  static HotRes = new CommunityService(
    10,
    "Clean Steam Tunnels",
    () => 60 - getModifier("Hot Resistance"),
    new Requirement(["Hot Resistance"], {})
  );

  static CoilWire = new CommunityService(
    11,
    "Coil Wire",
    () => 60,
    new Requirement([], {})
  );

  static donate = () => {
    visitUrl("council.php");
    visitUrl("choice.php?whichchoice=1089&option=30");
  };
}
