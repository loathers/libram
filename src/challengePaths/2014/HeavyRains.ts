import {
  Location,
  Modifier,
  Monster,
  monsterFactoidsAvailable,
  myRain,
  numericModifier,
  useSkill,
  visitUrl,
} from "kolmafia";
import { have } from "../../lib";
import { withChoice } from "../../property";
import { $monster, $path, $skill } from "../../template-string";

/**
 * Cast Rain Man and fight the target monster
 * @param target the monster to fight
 */
export function rainMan(target: Monster): void {
  if (canRainMan(target)) {
    withChoice(970, `1&whichmonster=${target.id}`, () =>
      useSkill($skill`Rain Man`)
    );
  }
}

/**
 * Check if you can summon this monster using Rain Man
 * @param target the monster to attempt to summon
 * @returns true if you can summon the target monster, false otherwise
 */
export function canRainMan(target: Monster): boolean {
  if (
    !have($skill`Rain Man`) || // having the skill implies you are in heavy rains path
    myRain() < 50 ||
    !target.copyable ||
    target.id < 0
  ) {
    return false;
  }
  if (monsterFactoidsAvailable(target, false) > 0) {
    return true;
  }

  const page = withChoice(970, 2, () =>
    visitUrl(
      `runskillz.php?pwd&action=Skillz&whichskill=${
        $skill`Rain Man`.id
      }&quantity=1`
    )
  );
  return page.indexOf(`<option value=${target.id}>`) > 0;
}

export const RAIN_MONSTER_WINDOW_BEGIN = "Rain Monster window begin";
export const RAIN_MONSTER_WINDOW_END = "Rain Monster window end";

export const wanderers = Object.freeze(
  Monster.get([
    "giant isopod",
    "gourmet gourami",
    "freshwater bonefish",
    "alley catfish",
    "piranhadon",
    "giant tardigrade",
    "aquaconda",
    "storm cow",
  ])
);

/**
 * Calculate the expected wandering monster based on current water level
 * @param location the location to check for wanderers
 * @returns The monster for this location given the current waterlevel
 */
export function expectedWanderer(location: Location): Monster {
  const difficultyWaterLevel = location.difficultyLevel === "low" ? 1 : 2;
  const environmentWaterLevel =
    location.environment === "underground"
      ? 4
      : location.environment === "indoor"
      ? 2
      : 1; // location.environment === "unknown" || "outdoors"
  const waterLevel =
    numericModifier(Modifier.get("Water Level")) +
    difficultyWaterLevel +
    environmentWaterLevel;
  if (waterLevel > 1 && waterLevel < 6) {
    return wanderers[waterLevel - 1];
  } else if (waterLevel === 6 && location.environment === "underground") {
    return $monster`giant tardigrade`;
  } else if (waterLevel === 6 && location.environment === "indoor") {
    return $monster`aquaconda`;
  } else if (waterLevel === 6 && location.environment === "outdoor") {
    return $monster`storm cow`;
  } else {
    return $monster`giant isopod`;
  }
}

export const path = $path`Heavy Rains`;
