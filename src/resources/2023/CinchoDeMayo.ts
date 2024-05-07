import { totalFreeRests } from "kolmafia";
import { have as have_ } from "../../lib";
import { get } from "../../property";
import { $item, $skill } from "../../template-string";
import { clamp, sum } from "../../utils";

const cincho = $item`Cincho de Mayo`;

/**
 * @returns Whether you `have` the Cincho de Mayo
 */
export function have(): boolean {
  return have_(cincho);
}

/**
 * @returns Your current cinch
 */
export function currentCinch(): number {
  return have() ? clamp(100 - get("_cinchUsed"), 0, 100) : 0;
}

/**
 * @param currentRests The rest number to evaluate
 * @returns The amount of cinch restored by the given rest
 */
export function cinchRestoredBy(currentRests = get("_cinchoRests")) {
  return have() ? clamp(50 - currentRests * 5, 5, 30) : 0;
}

/**
 * @returns Your current cinch, plus the total amount if cinch that can be generated through free rests
 */
export function totalAvailableCinch(): number {
  const remainingRests = Math.max(0, totalFreeRests() - get("timesRested"));

  return have()
    ? currentCinch() +
        sum(
          new Array(remainingRests)
            .fill(null)
            .map((_, i) => i + get("_cinchoRests")),
          (restNumber) => cinchRestoredBy(restNumber),
        )
    : 0;
}

export const skills = {
  SaltAndLime: $skill`Cincho: Dispense Salt and Lime`,
  PartySoundtrack: $skill`Cincho: Party Soundtrack`,
  FiestaExit: $skill`Cincho: Fiesta Exit`,
  ProjectilePiñata: $skill`Cincho: Projectile Piñata`,
  PartyFoul: $skill`Cincho: Party Foul`,
  ConfettiExtrava: $skill`Cincho: Confetti Extravaganza`,
} as const;
