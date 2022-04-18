import {
  equippedItem,
  familiarWeight,
  getPower,
  haveEquipped,
  myAdventures,
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

const visitCouncil = () => visitUrl("council.php");

export default class CommunityService {
  private choice: number;
  private stat: string;
  private property: string;
  private predictor: () => number;
  private maximizeRequirements: Requirement | null;

  /**
   * Class to store properties of various CS tests.
   * @param id The id the game HTML uses to identify the test; this is used primarily in runChoice.
   * @param stat The principle stat the test measures, often used as more easily memorable shorthand for the specific tests
   * @param property The name of the test as a string, often used as part of the string property "csServicesPerformed".
   * @param predictor A function that returns an estimate for the number of turns that the test will take given your character's current state.
   * @param maximizeRequirements A Requirement object, if applicable, that aligns with the things needed to maximize for this particular test.
   */
  private constructor(
    id: number,
    stat: string,
    property: string,
    predictor: () => number,
    maximizeRequirements: Requirement
  ) {
    this.choice = id;
    this.stat = stat;
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
   * @returns The primary stat the test measures, used primarily as memorable shorthand in place of test names.
   */
  get statName(): string {
    return this.stat;
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

  static logTask(name: string, action: () => number | void) {
    const startTime = Date.now();
    const startTurns = myTurncount();
    const estimatedTurns = action() ?? 0;
    CommunityService.log[name] = {
      type: "task",
      turnCost: myTurncount() - startTurns,
      predictedTurns: estimatedTurns,
      seconds: (Date.now() - startTime) / 1000,
    };
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
    if (get("csServicesPerformed").trim().length === 0) visitCouncil();

    visitCouncil();
    const councilText = runChoice(this.choice);
    return this._verifyIsDone(councilText);
  }

  /**
   * Wrapper function that prepares for a test and then completes it, adding time and turn details to the log.
   * @param prepare A function that does all necessary preparations for this CS test, including choosing your outfit. Optionally returns the number of turns you expect to spend preparing for the test.
   * @param maxTurns We will run the test iff the predicted/actual turns is less than or equal to this parameter.
   * @returns "completed", "failed", or "already completed".
   */
  run(
    prepare: () => void | number,
    maxTurns = Infinity
  ): "completed" | "failed" | "already completed" {
    if (this.isDone()) return "already completed";

    const startTime = Date.now();
    const startTurns = myTurncount();

    let additionalTurns: number;
    try {
      additionalTurns = prepare() ?? 0;
    } catch {
      return "failed";
    }

    const prediction = this.predictor();

    const council = visitCouncil();
    const turns = this._actualCost(council);
    if (!turns) return "already completed";

    if (turns > Math.min(maxTurns, myAdventures())) {
      return "failed";
    }

    if (!this.do()) return "failed";

    CommunityService.log[this.property] = {
      predictedTurns: prediction + additionalTurns,
      turnCost: myTurncount() - startTurns,
      seconds: (Date.now() - startTime) / 1000,
      type: "test",
    };
    return "completed";
  }

  private _verifyIsDone(councilText: string): boolean {
    return !councilText.includes(
      `<input type=hidden name=option value=${this.choice}>`
    );
  }

  /**
   * Checks council.php to verify that a test is complete; more reliable than isDone, but requires an additional pagehit.
   * @returns Whether council.php suggests that the test is complete.
   */
  verifyIsDone(): boolean {
    return this._verifyIsDone(visitCouncil());
  }

  private _actualCost(councilText: string): number {
    const match = councilText.match(
      `<input type=hidden name=option value=${this.id}>.*?Perform Service \\((\\d+) Adventures\\)`
    );
    return match ? parseInt(match[1]) : 0;
  }

  /**
   * Checks council.php for the number of turns this test will take; more reliable than prediction, but requires an additional pagehit.
   * @returns The number of turns to complete this test according to council.php.
   */
  actualCost(): number {
    return this._actualCost(visitCouncil());
  }

  /**
   * A log of the predicted turns, actual turns, and duration of each CS test performed.
   */
  static log: {
    [index: string]: {
      predictedTurns: number;
      turnCost: number;
      seconds: number;
      type: "test" | "task";
    };
  } = {};

  /**
   * Prints turncount and time details of the test in question.
   * @param colour The colour (or color) you'd like the log to be printed in.
   */
  static printLog(colour = "blue"): void {
    const logEntries = Object.entries(CommunityService.log);
    for (const [testName, testEntry] of logEntries) {
      const { type, predictedTurns, turnCost, seconds } = testEntry;
      if (type === "test") {
        print(
          `We predicted the ${testName} test would take ${predictedTurns} turns, ${
            predictedTurns === turnCost ? "and" : "but"
          } it took ${turnCost} turns.`,
          colour
        );
        print(`${testName} took ${seconds.toFixed(1)} seconds.`, colour);
      } else {
        if (!(predictedTurns === 0 && turnCost === 0)) {
          print(
            `We predicted the task ${testName} would take ${predictedTurns} turns, ${
              predictedTurns === turnCost ? "and" : "but"
            } it took ${turnCost} turns.`,
            colour
          );
        }
        print(
          `The task ${testName} took ${seconds.toFixed(1)} seconds.`,
          colour
        );
      }
    }
    const totalTime = sum(logEntries, ([, testEntry]) => testEntry.seconds);
    print(
      `All together, you have spent ${totalTime.toFixed(
        1
      )} seconds during this Community Service run`,
      colour
    );
  }

  // Below, we have the tests themselves.

  static HP = new CommunityService(
    1,
    "HP",
    "Donate Blood",
    () => 60 - Math.floor((myMaxhp() - myBuffedstat($stat`muscle`) - 3) / 30),
    new Requirement(["HP"], {})
  );

  static Muscle = new CommunityService(
    2,
    "Muscle",
    "Feed The Children",
    statCommunityServicePredictor($stat`Muscle`),
    new Requirement(["Muscle"], {})
  );

  static Mysticality = new CommunityService(
    3,
    "Mysticality",
    "Build Playground Mazes",
    statCommunityServicePredictor($stat`Mysticality`),
    new Requirement(["Mysticality"], {})
  );

  static Moxie = new CommunityService(
    4,
    "Moxie",
    "Feed Conspirators",
    statCommunityServicePredictor($stat`Moxie`),
    new Requirement(["Moxie"], {})
  );

  static FamiliarWeight = new CommunityService(
    5,
    "Familiar Weight",
    "Breed More Collies",
    () =>
      60 - Math.floor((familiarWeight(myFamiliar()) + weightAdjustment()) / 5),
    new Requirement(["Familiar Weight"], {})
  );

  static WeaponDamage = new CommunityService(
    6,
    "Weapon Damage",
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
    "Spell Damage",
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
    "Non-Combat",
    "Be a Living Statue",
    () => {
      const noncombatRate = -1 * getModifier("Combat Rate");
      return 60 - 3 * Math.floor(noncombatRate / 5);
    },
    new Requirement(["-combat"], {})
  );

  static BoozeDrop = new CommunityService(
    9,
    "Item Drop",
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
    "Hot Resistance",
    "Clean Steam Tunnels",
    () => 60 - getModifier("Hot Resistance"),
    new Requirement(["Hot Resistance"], {})
  );

  static CoilWire = new CommunityService(
    11,
    "Coil Wire",
    "Coil Wire",
    () => 60,
    new Requirement([], {})
  );

  static donate = () => {
    visitCouncil();
    visitUrl("choice.php?whichchoice=1089&option=30");
  };
}
