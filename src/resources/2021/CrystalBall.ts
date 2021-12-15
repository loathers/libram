import { myTurncount, toLocation, toMonster } from "kolmafia";
import { get } from "../../property";

const parsedProp = () =>
  get("crystalBallPredictions")
    .split("|")
    .map((element) => element.split(":") as [string, string, string])
    .map(
      ([turncount, location, monster]) =>
        [parseInt(turncount), toLocation(location), toMonster(monster)] as [
          number,
          Location,
          Monster
        ]
    );

export function currentPredictions(withFree = true): Map<Location, Monster> {
  const predictions = parsedProp();
  const freeCondition = (predictedTurns: number, turns: number) =>
    predictedTurns === turns;
  const nonFreeCondition = (predictedTurns: number, turns: number) =>
    predictedTurns + 1 === turns;
  return new Map(
    predictions
      .filter(
        ([turncount]) =>
          nonFreeCondition(turncount, myTurncount()) ||
          (withFree && freeCondition(turncount, myTurncount()))
      )
      .map(([, location, monster]) => [location, monster])
  );
}
