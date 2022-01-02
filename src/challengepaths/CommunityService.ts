import { myTurncount, print, runChoice, visitUrl } from "kolmafia";
import { get, PropertiesManager } from "..";

export const testLog: { [index: string]: { turns: number; seconds: number } } =
  {};

export type TestContext = {
  propertyManager: PropertiesManager;
};

export abstract class Test {
  context: TestContext;

  constructor(context: TestContext) {
    this.context = context;
  }

  isDone(): boolean {
    return get("csServicesPerformed").includes(this.name);
  }

  run(): void {
    if (!this.isDone()) {
      print();
      print("=======================================");
      print(`Beginning test ${this.constructor.name}.`, "blue");
      const startTime = Date.now();
      const startTurns = myTurncount();
      this.prepare();
      print(
        `Executing test ${
          this.constructor.name
        }, predicting ${this.predictedTurns()} turns.`
      );
      visitUrl("council.php");
      runChoice(this.id);
      if (!this.isDone()) {
        throw `Failed to do test ${this.constructor.name}. Maybe we are out of turns.`;
      }
      const log = {
        turns: myTurncount() - startTurns,
        seconds: (Date.now() - startTime) / 1000,
      };
      print(
        `Finished test ${this.constructor.name}. ` +
          `Took ${log.seconds.toFixed(1)} seconds and ${log.turns} turns.`,
        "blue"
      );
      testLog[this.constructor.name] = log;
    }
  }

  abstract get id(): number;
  abstract get name(): string;
  abstract predictedTurns(): number;
  abstract prepare(): void;
}
