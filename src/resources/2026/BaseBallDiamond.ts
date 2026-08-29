import { Monster, myHash, runChoice, visitUrl } from "kolmafia";
import { get } from "../../property";
import { $item } from "../../template-string";
import { have as have_ } from "../../lib.js";

/* Baseball Diamond utilities.
 *
 * A baseball game consists of nine pitches. Each pitch can be one of five
 * elements:
 *
 *   1. Hot
 *   2. Cold
 *   3. Spooky
 *   4. Stench
 *   5. Sleaze
 *
 * Each element has two lesser pitches followed by one greater/special pitch.
 *
 * For example:
 *
 *   Hot:
 *     Throw Some Smoke       (lesser)
 *     Bring the Heat         (lesser)
 *     Schenectady Scorcher   (greater)
 *
 * The two lesser pitches for an element may be repeated. Once two lesser
 * pitches have been performed, that element's next pitch must be its greater
 * pitch. A greater pitch can only be used once.
 *
 * Every pitch can target any monster. The monster lineup only determines
 * which monster receives each of the nine pitches.
 */

/**
 * @returns Whether you `have` the Baseball Diamond.
 */
export function have(): boolean {
  return have_($item`Baseball Diamond`);
}

/**
 * Get the number of players currently on your baseball team.
 *
 * @returns The number of players on the team.
 */
export function numberOfPlayers(): number {
  return get("baseballTeam").split(",").length;
}

/**
 * Check whether a monster is available as a baseball special pitcher.
 *
 * The first two entries in `baseballTeam` are not eligible for special
 * pitches. The remaining nine entries are the actual baseball lineup.
 *
 * @param monster The monster to check.
 * @returns Whether the monster is eligible for a special pitch.
 */
export function canSpecialPitch(monster: Monster): boolean {
  return get("baseballTeam")
    .split(",")
    .slice(2)
    .some((id) => Number(id) === monster.id);
}

/**
 * The five baseball pitch elements.
 *
 * Each element has two lesser pitches and one greater pitch.
 */
const PITCH_ELEMENTS = {
  "Throw Some Smoke": "Hot",
  "Bring the Heat": "Hot",
  "Schenectady Scorcher": "Hot",

  "Deep Freeze": "Cold",
  Snowball: "Cold",
  "Ice Him Out": "Cold",

  "Ghost Pitch": "Spooky",
  Skullball: "Spooky",
  "Non-Euclidean Curveball": "Spooky",

  Garbageball: "Stench",
  Beanball: "Stench",
  "Some Cheddar": "Stench",

  Slurveball: "Sleaze",
  "Bacon-Wrapped Slider": "Sleaze",
  Screwball: "Sleaze",
} as const;

type Pitch = keyof typeof PITCH_ELEMENTS;
type Element = (typeof PITCH_ELEMENTS)[Pitch];

/**
 * The pitches belonging to each element.
 *
 * The first two entries are lesser pitches. The third entry is the greater
 * pitch.
 */
const PITCHES_BY_ELEMENT: Record<Element, [Pitch, Pitch, Pitch]> = {
  Hot: ["Throw Some Smoke", "Bring the Heat", "Schenectady Scorcher"],
  Cold: ["Deep Freeze", "Snowball", "Ice Him Out"],
  Spooky: ["Ghost Pitch", "Skullball", "Non-Euclidean Curveball"],
  Stench: ["Garbageball", "Beanball", "Some Cheddar"],
  Sleaze: ["Slurveball", "Bacon-Wrapped Slider", "Screwball"],
};

/**
 * The baseball choice number corresponding to each pitch element.
 *
 * These are the choices presented by the Baseball Diamond:
 *
 *   1 = Hot
 *   2 = Cold
 *   3 = Spooky
 *   4 = Stench
 *   5 = Sleaze
 */
const PITCH_CHOICE: Record<Element, number> = {
  Hot: 1,
  Cold: 2,
  Spooky: 3,
  Stench: 4,
  Sleaze: 5,
};

const ELEMENTS = Object.keys(PITCHES_BY_ELEMENT) as Element[];

/**
 * Find a possible nine-pitch sequence that allows the requested special
 * pitches to be thrown against the specified monsters.
 *
 * Every pitch position may use any element. The function searches for a
 * sequence which:
 *
 * - uses two lesser pitches before a greater pitch;
 * - forces the greater pitch once an element has used two lesser pitches;
 * - never uses a greater pitch more than once;
 * - throws each requested special pitch against its requested monster;
 * - respects the order of the monsters in the baseball lineup.
 *
 * The actual lesser pitch used does not matter because lesser pitches may
 * be repeated. The first lesser pitch for each element is therefore used
 * as the representative lesser pitch in the returned sequence.
 *
 * @param monster1 Monster against which `pitch1` should be thrown.
 * @param pitch1 Special pitch to throw against `monster1`.
 * @param monster2 Optional second monster.
 * @param pitch2 Optional special pitch for `monster2`.
 * @param monster3 Optional third monster.
 * @param pitch3 Optional special pitch for `monster3`.
 *
 * @returns A valid nine-pitch sequence, or `null` if none exists.
 */
export function findPitchOrder(
  monster1: Monster,
  pitch1: Pitch,
  monster2?: Monster,
  pitch2?: Pitch,
  monster3?: Monster,
  pitch3?: Pitch,
): Pitch[] | null {
  // The first two baseballTeam entries are not pitchers. The remaining
  // nine entries correspond to the nine pitches of the game.
  const lineup = get("baseballTeam").split(",").slice(2).map(Number);

  if (lineup.length !== 9) {
    return null;
  }

  const requests = [
    [monster1, pitch1],
    [monster2, pitch2],
    [monster3, pitch3],
  ]
    .filter(
      (entry): entry is [Monster, Pitch] =>
        entry[0] !== undefined && entry[1] !== undefined,
    )
    .map(([monster, pitch]) => ({
      position: lineup.indexOf(monster.id),
      pitch,
    }));

  // Every requested monster must actually be in the nine-pitch lineup.
  if (requests.some(({ position }) => position < 0)) {
    return null;
  }

  // A greater pitch requires two previous lesser pitches.
  if (requests.some(({ position }) => position < 2)) {
    return null;
  }

  // Map each requested lineup position to the special pitch that must occur
  // there.
  const required = new Map(
    requests.map(({ position, pitch }) => [position, pitch]),
  );

  /*
   * State for each element:
   *
   *   0 = no lesser pitches used
   *   1 = one lesser pitch used
   *   2 = two lesser pitches used; greater is ready
   *   3 = greater pitch already used
   */
  type State = [number, number, number, number, number];

  /**
   * Search the remaining pitch positions.
   *
   * Because there are only nine positions and five elements, this search is
   * very small. The state also prevents us from exploring equivalent
   * sequences repeatedly.
   */
  const seen = new Set<string>();

  function search(position: number, state: State): Pitch[] | null {
    if (position === 9) {
      return [];
    }

    const stateKey = `${position}:${state.join(",")}`;

    if (seen.has(stateKey)) {
      return null;
    }

    seen.add(stateKey);

    const requiredPitch = required.get(position);

    /*
     * This lineup position has a requested special pitch.
     */
    if (requiredPitch !== undefined) {
      const element = PITCH_ELEMENTS[requiredPitch];
      const index = ELEMENTS.indexOf(element);

      // The greater pitch is only available after two lesser pitches.
      if (state[index] !== 2) {
        return null;
      }

      const next = [...state] as State;
      next[index] = 3;

      const result = search(position + 1, next);

      return result === null ? null : [requiredPitch, ...result];
    }

    /*
     * This is an unrestricted pitch position.
     *
     * We can choose any element:
     *
     *   0 -> 1: first lesser pitch
     *   1 -> 2: second lesser pitch
     *   2 -> 3: greater pitch (now forced)
     *   3: unavailable because the greater was already used
     */
    for (let index = 0; index < ELEMENTS.length; index++) {
      if (state[index] === 3) {
        continue;
      }

      const element = ELEMENTS[index];
      const next = [...state] as State;

      let pitch: Pitch;

      if (state[index] < 2) {
        // Lesser pitches may be repeated, so we don't care which of the
        // two lesser pitches is used.
        pitch = PITCHES_BY_ELEMENT[element][0];
        next[index]++;
      } else {
        // Once two lesser pitches have been used, the greater pitch is
        // the only possible pitch for this element.
        pitch = PITCHES_BY_ELEMENT[element][2];
        next[index] = 3;
      }

      const result = search(position + 1, next);

      if (result !== null) {
        return [pitch, ...result];
      }
    }

    return null;
  }

  return search(0, [0, 0, 0, 0, 0]);
}

/**
 * Determine whether a nine-pitch baseball game can be constructed that
 * throws the requested special pitches against the requested monsters.
 *
 * @param monster1 Monster against which `pitch1` should be thrown.
 * @param pitch1 Special pitch to throw against `monster1`.
 * @param monster2 Optional second monster.
 * @param pitch2 Optional special pitch for `monster2`.
 * @param monster3 Optional third monster.
 * @param pitch3 Optional special pitch for `monster3`.
 *
 * @returns Whether a valid pitch sequence exists.
 */
export function canPitchGame(
  monster1: Monster,
  pitch1: Pitch,
  monster2?: Monster,
  pitch2?: Pitch,
  monster3?: Monster,
  pitch3?: Pitch,
): boolean {
  return (
    findPitchOrder(monster1, pitch1, monster2, pitch2, monster3, pitch3) !==
    null
  );
}

/**
 * Pitch a baseball game using the requested special pitches.
 *
 * First finds a valid nine-pitch sequence. If no valid sequence exists,
 * no game is started and `false` is returned.
 *
 * Otherwise, the Baseball Diamond is opened and the nine pitches are
 * performed in the calculated order.
 *
 * @param monster1 Monster against which `pitch1` should be thrown.
 * @param pitch1 Special pitch to throw against `monster1`.
 * @param monster2 Optional second monster.
 * @param pitch2 Optional special pitch for `monster2`.
 * @param monster3 Optional third monster.
 * @param pitch3 Optional special pitch for `monster3`.
 *
 * @returns `true` if a valid pitch sequence was found and the game was
 * successfully submitted, otherwise `false`.
 */
export function pitchAGame(
  monster1: Monster,
  pitch1: Pitch,
  monster2?: Monster,
  pitch2?: Pitch,
  monster3?: Monster,
  pitch3?: Pitch,
): boolean {
  const pitchOrder = findPitchOrder(
    monster1,
    pitch1,
    monster2,
    pitch2,
    monster3,
    pitch3,
  );

  if (pitchOrder === null) {
    return false;
  }

  const lineup = get("baseballTeam").split(",").map(Number);

  if (lineup.length !== 9) {
    return false;
  }

  visitUrl(
    `inventory.php?pwd&action=pball&pwd=${myHash()}&action=pball`,
    false,
  );

  for (const pitch of pitchOrder) {
    runChoice(PITCH_CHOICE[PITCH_ELEMENTS[pitch]]);
  }

  runChoice(6);

  return true;
}
