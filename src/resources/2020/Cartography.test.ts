import {
  adv1,
  canAdventure,
  choiceFollowsFight,
  currentRound,
  getProperty,
  handlingChoice,
  haveSkill,
  myTurncount,
  runChoice,
  setProperty,
  useSkill,
} from "kolmafia";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { $location, $monster, $skill } from "../../template-string.js";
import { mapMonster, tryMapMonster } from "./Cartography.js";

const location = $location`Domed City of Grimacia`;
const monster = $monster`grizzled survivor`;
const previousChoice = "2";

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(haveSkill).mockReturnValue(true);
  vi.mocked(canAdventure).mockReturnValue(true);
  vi.mocked(currentRound).mockReturnValue(0);
  vi.mocked(myTurncount).mockReturnValue(100);
  vi.mocked(choiceFollowsFight).mockReturnValue(false);
  vi.mocked(handlingChoice).mockReturnValue(false);
  vi.mocked(useSkill).mockImplementation(() => {
    setProperty("mappingMonsters", "true");
    return true;
  });
  vi.mocked(adv1).mockImplementation(() => {
    expect(getProperty("choiceAdventure1435")).toBe(
      `1&heyscriptswhatsupwinkwink=${monster.id}`,
    );
    setProperty("mappingMonsters", "false");
    return true;
  });
  vi.mocked(runChoice).mockImplementation(() => "");
  setProperty("mappingMonsters", "false");
  setProperty("_monstersMapped", "0");
  setProperty("choiceAdventure1435", previousChoice);
});

describe("tryMapMonster", () => {
  it("consumes an uninterrupted map in one adventure", () => {
    expect(tryMapMonster(location, monster)).toBe("mapped");
    expect(adv1).toHaveBeenCalledTimes(1);
    expect(getProperty("mappingMonsters")).toBe("false");
    expect(getProperty("choiceAdventure1435")).toBe(previousChoice);
  });

  it("returns control after a completed interruption changes combat resources", () => {
    vi.mocked(adv1).mockImplementationOnce(() => {
      setProperty("_saberForceUses", "5");
      return true;
    });
    expect(tryMapMonster(location, monster)).toBe("interrupted");
    expect(adv1).toHaveBeenCalledTimes(1);
    expect(getProperty("mappingMonsters")).toBe("true");
    expect(getProperty("_saberForceUses")).toBe("5");
    expect(getProperty("choiceAdventure1435")).toBe(previousChoice);
  });

  it("can resume an interrupted third map on the next call", () => {
    setProperty("mappingMonsters", "true");
    setProperty("_monstersMapped", "3");
    vi.mocked(adv1).mockImplementationOnce(() => true);

    expect(tryMapMonster(location, monster)).toBe("interrupted");
    expect(adv1).toHaveBeenCalledTimes(1);
    expect(tryMapMonster(location, monster)).toBe("mapped");
    expect(adv1).toHaveBeenCalledTimes(2);
    expect(useSkill).not.toHaveBeenCalled();
  });

  it("finishes an interruption's choice without starting another adventure", () => {
    vi.mocked(adv1).mockImplementationOnce(() => {
      vi.mocked(handlingChoice).mockReturnValue(true);
      return true;
    });
    vi.mocked(runChoice).mockImplementation(() => {
      vi.mocked(handlingChoice).mockReturnValue(false);
      return "";
    });
    expect(tryMapMonster(location, monster)).toBe("interrupted");
    expect(runChoice).toHaveBeenCalledWith(-1);
    expect(adv1).toHaveBeenCalledTimes(1);
    expect(getProperty("mappingMonsters")).toBe("true");
  });

  it("does not try to start mapping during an unresolved fight", () => {
    vi.mocked(currentRound).mockReturnValue(1);
    expect(tryMapMonster(location, monster)).toBe("failed");
    expect(useSkill).not.toHaveBeenCalled();
    expect(adv1).not.toHaveBeenCalled();
  });

  it.each(["adventure failure", "unresolved combat", "unresolved choice"])(
    "returns failed rather than interrupted for an %s",
    (failure) => {
      vi.mocked(adv1).mockImplementationOnce(() => {
        vi.mocked(currentRound).mockReturnValue(
          failure === "unresolved combat" ? 1 : 0,
        );
        vi.mocked(handlingChoice).mockReturnValue(
          failure === "unresolved choice",
        );
        return failure !== "adventure failure";
      });

      expect(tryMapMonster(location, monster)).toBe("failed");
      expect(adv1).toHaveBeenCalledTimes(1);
      expect(getProperty("mappingMonsters")).toBe("true");
      expect(getProperty("choiceAdventure1435")).toBe(previousChoice);
    },
  );
});

describe("mapMonster", () => {
  it("maps using normal adventure automation and restores the choice setting", () => {
    expect(mapMonster(location, monster)).toBe(true);
    expect(useSkill).toHaveBeenCalledWith($skill`Map the Monsters`);
    expect(adv1).toHaveBeenCalledTimes(1);
    expect(adv1).toHaveBeenCalledWith(location, -1, "");
    expect(getProperty("choiceAdventure1435")).toBe(previousChoice);
  });

  it("resumes a pending third map without recasting", () => {
    setProperty("mappingMonsters", "true");
    setProperty("_monstersMapped", "3");
    expect(mapMonster(location, monster)).toBe(true);
    expect(useSkill).not.toHaveBeenCalled();
  });

  it("does not start a fourth map", () => {
    setProperty("_monstersMapped", "3");
    expect(mapMonster(location, monster)).toBe(false);
    expect(useSkill).not.toHaveBeenCalled();
    expect(adv1).not.toHaveBeenCalled();
  });

  it("does not adventure when activating mapping fails", () => {
    vi.mocked(useSkill).mockReturnValue(false);
    expect(mapMonster(location, monster)).toBe(false);
    expect(adv1).not.toHaveBeenCalled();
  });

  it("retries a completed interruption without activating another map", () => {
    vi.mocked(adv1).mockImplementationOnce(() => true);
    expect(mapMonster(location, monster)).toBe(true);
    expect(adv1).toHaveBeenCalledTimes(2);
    expect(useSkill).toHaveBeenCalledTimes(1);
  });

  it.each(["open", "following"])(
    "resolves the %s choice after an interrupting fight before retrying",
    (state) => {
      vi.mocked(adv1).mockImplementationOnce(() => {
        vi.mocked(handlingChoice).mockReturnValue(state === "open");
        vi.mocked(choiceFollowsFight).mockReturnValue(state === "following");
        return true;
      });
      vi.mocked(runChoice).mockImplementation(() => {
        vi.mocked(handlingChoice).mockReturnValue(false);
        vi.mocked(choiceFollowsFight).mockReturnValue(false);
        return "";
      });
      expect(mapMonster(location, monster)).toBe(true);
      expect(runChoice).toHaveBeenCalledTimes(1);
      expect(runChoice).toHaveBeenCalledWith(-1);
      expect(adv1).toHaveBeenCalledTimes(2);
    },
  );

  it("preserves pending mapping when an interrupting combat is unresolved", () => {
    vi.mocked(adv1).mockImplementationOnce(() => {
      vi.mocked(currentRound).mockReturnValue(1);
      return false;
    });
    expect(mapMonster(location, monster)).toBe(false);
    expect(adv1).toHaveBeenCalledTimes(1);
    expect(getProperty("mappingMonsters")).toBe("true");
    expect(getProperty("choiceAdventure1435")).toBe(previousChoice);
  });

  it("stops when an interrupting choice cannot be resolved", () => {
    vi.mocked(adv1).mockImplementationOnce(() => {
      vi.mocked(handlingChoice).mockReturnValue(true);
      return true;
    });
    expect(mapMonster(location, monster)).toBe(false);
    expect(adv1).toHaveBeenCalledTimes(1);
    expect(getProperty("mappingMonsters")).toBe("true");
  });

  it("stops before retrying after an interruption spends a turn", () => {
    vi.mocked(adv1).mockImplementationOnce(() => {
      vi.mocked(myTurncount).mockReturnValue(101);
      return true;
    });
    expect(() => mapMonster(location, monster)).toThrow(
      "Map the Monsters unsuccessful?",
    );
    expect(adv1).toHaveBeenCalledTimes(1);
    expect(getProperty("choiceAdventure1435")).toBe(previousChoice);
  });

  it("restores the choice setting if adventuring throws", () => {
    vi.mocked(adv1).mockImplementationOnce(() => {
      throw new Error("Adventure failed");
    });
    expect(() => mapMonster(location, monster)).toThrow("Adventure failed");
    expect(getProperty("choiceAdventure1435")).toBe(previousChoice);
  });
});
