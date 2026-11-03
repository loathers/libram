import {
  entityDecode,
  equip,
  handlingChoice,
  lastChoice,
  Location,
  Monster,
  runChoice,
  visitUrl,
} from "kolmafia";
import {
  getBanishedMonsters,
  have as have_,
  withOutfitCheckpoint,
} from "../../lib.js";
import { get } from "../../property.js";
import { $item, $phylum, $skill } from "../../template-string.js";

const item = $item`Monodent of the Sea`;

export const skills = {
  SummonAWave: $skill`Sea *dent: Summon a Wave`,
  ThrowALightningBolt: $skill`Sea *dent: Throw a Lightning Bolt`,
  TalkToSomeFish: $skill`Sea *dent: Talk to Some Fish`,
} as const;

/**
 * @returns Whether you `have` the Monodent of the Sea.
 */
export function have(): boolean {
  return have_(item);
}

/**
 * @returns The number of tines on your Monodent (potentially making it a bident or greater).
 */
export function tines(): number {
  return get("seadentLevel");
}

/**
 * @returns The number of construct kills on your Monodent.
 */
export function constructKills(): number {
  return get("seadentConstructKills");
}

/**
 * @returns Construct kills needed for the next tine, or Infinity at the ten-tine cap.
 */
export function killsToNextTine(): number {
  if (tines() >= 10) return Infinity;
  return Math.max(0, (tines() + 1) ** 2 - constructKills());
}

/**
 * Check monster eligibility for Talk to Some Fish.
 * @param monster The monster to turn into some fish.
 * @returns Whether the monster can be turned into Some Fish.
 */
export function canFishify(monster: Monster): boolean {
  return (
    monster !== Monster.none &&
    monster.phylum !== $phylum`fish` &&
    !monster.boss &&
    monster.instakillable
  );
}

/**
 * @returns The number of Lightning Bolts you have left today.
 */
export function lightningBoltsRemaining(): number {
  return have() ? Math.max(0, 11 - get("_seadentLightningUsed")) : 0;
}

/**
 * @returns The monster currently banished by Lightning Bolt; null if none.
 */
export function banishedMonster(): Monster | null {
  return getBanishedMonsters().get(skills.ThrowALightningBolt) ?? null;
}

/**
 * @returns Whether you're able to cast Summon a Wave today.
 */
export function waveAvailable(): boolean {
  return have() && !get("_seadentWaveUsed");
}

/**
 * @returns The current location flooded by Summon a Wave; null if none.
 */
export function waveZone(): Location | null {
  return get("_seadentWaveZone");
}

/**
 * Flood your last adventure location, equipping the Monodent if needed and
 * restoring your outfit afterward. Checks the target shown in the choice and
 * cancels without casting if it does't match the intended target.
 *
 * @param location The intended target of the wave.
 * @returns Whether the intended location is flooded.
 */
export function summonWave(location: Location): boolean {
  if (location === Location.none) return false;
  if (waveZone() === location) return true;
  if (!waveAvailable() || location.environment === "underwater") {
    return false;
  }

  return withOutfitCheckpoint(() => {
    if (!have_(skills.SummonAWave) && !equip(item)) return false;
    const page = visitUrl(
      `runskillz.php?pwd&action=Skillz&whichskill=${skills.SummonAWave.id}&quantity=1`,
      false,
    );
    if (!handlingChoice() || lastChoice() !== 1566) return false;

    const target = entityDecode(page.replace(/<[^>]*>/g, "")).match(
      /You look upon (.*?) and contemplate flooding it with a giant wave\./,
    )?.[1];
    // Location.toString() returns the adventure name, which may contain entities.
    if (target !== entityDecode(String(location))) {
      runChoice(2);
      return false;
    }

    runChoice(1);
    return waveZone() === location;
  });
}
