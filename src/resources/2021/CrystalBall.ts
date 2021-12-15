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

export function currentPredictions(): Map<Location, Monster> {
  const predictions = parsedProp();
  return new Map(
    predictions
      .filter(([turncount]) => 1 + turncount >= myTurncount())
      .map(([, location, monster]) => [location, monster])
  );
}
