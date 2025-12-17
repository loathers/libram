import { handlingChoice, myHash, use, visitUrl } from "kolmafia";
import { $item } from "../../template-string.js";

function extractChoiceId(pageText: string): number {
  const match = pageText.match(/whichchoice[=\s]+(\d+)/);
  return match ? parseInt(match[1]) : 0;
}

function parseState(page: string) {
  // Parse configuration images
  const configuration = Object.fromEntries(
    [...page.matchAll(/otherimages\/bbatt\/(.*?)\.png/g)]
      .map((m) => {
        const image = m[1];
        if (image.startsWith("barb")) return ["barb", parseInt(m[4])] as const;
        if (image.startsWith("moat")) return ["moat", parseInt(m[4])] as const;
        if (image.startsWith("bridge"))
          return ["bridge", parseInt(m[6])] as const;
        if (image.startsWith("holes"))
          return ["holes", parseInt(m[5])] as const;
        return null;
      })
      .filter((e) => e !== null),
  );

  // Parse needle positions
  const stats = [
    ...page.matchAll(
      /<img style='position: absolute; top: (?:\d+); left: (\d+);'/g,
    ),
  ]
    .slice(0, 6)
    .map((m) => parseInt(m[1]));

  return {
    stats: stats,
    configuration,
    choiceId: extractChoiceId(page),
    page,
  };
}

type State = ReturnType<typeof parseState>;

function runChoice(whichChoice: number, option: number): State {
  return parseState(
    visitUrl(
      `choice.php?whichchoice=${whichChoice}&option=${option}&pwd=${myHash()}`,
      false,
    ),
  );
}

/**
 * @param chooser A function that, given the current state, returns a number 1-3 indicating which option to choose
 * @param page The HTML of the current page, if already known
 * @param lockInScore Whether to lock in your score upon completing the game
 * @returns Final state of the game
 */
export function play(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  chooser = (state: State) => Math.floor(Math.random() * 3) + 1,
  page = "",
  lockInScore = true,
): State {
  let state: State | undefined;

  if (!handlingChoice()) {
    use($item`Bastille Battalion control rig`);
    state = runChoice(1313, 5);
  }

  state = parseState(page || visitUrl("choice.php"));

  for (let breakout = 100; breakout > 0; breakout--) {
    const choiceId = state.choiceId;

    switch (state.choiceId) {
      case 1314: // Main screen
        state = runChoice(choiceId, 3); // look for cheese
        break;
      case 1315: // Castle versus castle
      case 1317: // Improve attack
      case 1318: // Improve defence
      case 1319: // Cheese
        state = runChoice(choiceId, chooser(state));
        break;
      case 1316: // GAME OVER
        if (lockInScore && state.page.includes("Lock in your score")) {
          return runChoice(choiceId, 1); // lock in score
        }

        return runChoice(choiceId, 3); // stop playing
      default:
        return state;
    }
  }

  return state;
}
