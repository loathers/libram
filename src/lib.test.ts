import { getPlayerId, getPlayerName, visitUrl, xpath } from "kolmafia";
import { beforeEach, describe, it, expect, vi } from "vitest";

import {
  getPlayerFromIdOrName,
  getPlayerIdFromName,
  getPlayerNameFromId,
  getRange,
  setCombatFlags,
  withCombatFlags,
} from "./lib.js";

vi.mocked(getPlayerName).mockImplementation((id: number) => {
  switch (id) {
    case 1:
      return "Jick";
    case 1889009:
      return "Buffy";
    default:
      return id.toString();
  }
});
vi.mocked(getPlayerId).mockImplementation((name: string) => {
  switch (name.toLowerCase()) {
    case "jick":
      return "1";
    case "buffy":
      return "1889009";
    default:
      return name;
  }
});

describe(getPlayerIdFromName, () => {
  describe("with onMissing = 'throw'", () => {
    it.each([
      ["Jick", 1],
      ["Buffy", 1889009],
    ])("should return the player id for a given name", (name, id) => {
      expect(getPlayerIdFromName(name)).toBe(id);
    });

    it.each([
      ["jick", 1],
      ["JICK", 1],
      ["bufFy", 1889009],
      ["BuffY", 1889009],
    ])(
      "should return the player id for a given name, case-insensitively",
      (name, id) => {
        expect(getPlayerIdFromName(name)).toBe(id);
      },
    );

    it("should throw an error for an unknown name", () => {
      expect(() => getPlayerIdFromName("Unknown")).toThrowError(
        "Player not found: Unknown",
      );
    });
  });

  describe("with onMissing = 'return-null'", () => {
    it.each([
      ["Jick", 1],
      ["Buffy", 1889009],
    ])("should return the player id for a given name", (name, id) => {
      expect(getPlayerIdFromName(name, "return-null")).toBe(id);
    });

    it.each([
      ["jick", 1],
      ["JICK", 1],
      ["bufFy", 1889009],
      ["BuffY", 1889009],
    ])(
      "should return the player id for a given name, case-insensitively",
      (name, id) => {
        expect(getPlayerIdFromName(name, "return-null")).toBe(id);
      },
    );

    it("should return undefined for an unknown name", () => {
      expect(getPlayerIdFromName("Unknown", "return-null")).toBeNull();
    });
  });
});

describe(getPlayerNameFromId, () => {
  describe("with onMissing = 'throw'", () => {
    it.each([
      [1, "Jick"],
      [1889009, "Buffy"],
    ])("should return the player name for a given id", (id, name) => {
      expect(getPlayerNameFromId(id)).toBe(name);
    });

    it("should throw an error for an unknown id", () => {
      expect(() => getPlayerNameFromId(123)).toThrowError(
        "Player not found: 123",
      );
    });
  });

  describe("with onMissing = 'return-null'", () => {
    it.each([
      [1, "Jick"],
      [1889009, "Buffy"],
    ])("should return the player name for a given id", (id, name) => {
      expect(getPlayerNameFromId(id, "return-null")).toBe(name);
    });

    it("should return undefined for an unknown id", () => {
      expect(getPlayerNameFromId(123, "return-null")).toBeNull();
    });
  });
});

describe(getPlayerFromIdOrName, () => {
  describe("with onMissing = 'throw'", () => {
    it.each([
      [1, "Jick"],
      [1889009, "Buffy"],
    ])("should return the player id and name for a given id", (id, name) => {
      expect(getPlayerFromIdOrName(id)).toEqual({ id, name });
    });

    it.each([
      ["Jick", 1],
      ["Buffy", 1889009],
    ])("should return the player id and name for a given name", (name, id) => {
      expect(getPlayerFromIdOrName(name)).toEqual({ id, name });
    });

    it.each([
      ["jick", 1, "Jick"],
      ["JICK", 1, "Jick"],
      ["bufFy", 1889009, "Buffy"],
      ["BuffY", 1889009, "Buffy"],
    ])(
      "should return the player id and name for a given name, case-insensitively",
      (name, id, expectedName) => {
        expect(getPlayerFromIdOrName(name)).toEqual({ id, name: expectedName });
      },
    );

    it.each(["Unknown", 123])(
      "should throw an error for an unknown id or name",
      (idOrName) => {
        expect(() => getPlayerFromIdOrName(idOrName)).toThrowError(
          `Player not found: ${idOrName}`,
        );
      },
    );
  });

  describe("with onMissing = 'return-null'", () => {
    it.each([
      [1, "Jick"],
      [1889009, "Buffy"],
    ])("should return the player id and name for a given id", (id, name) => {
      expect(getPlayerFromIdOrName(id, "return-null")).toEqual({ id, name });
    });

    it.each([
      ["Jick", 1],
      ["Buffy", 1889009],
    ])("should return the player id and name for a given name", (name, id) => {
      expect(getPlayerFromIdOrName(name, "return-null")).toEqual({ id, name });
    });

    it.each([
      ["jick", 1, "Jick"],
      ["JICK", 1, "Jick"],
      ["bufFy", 1889009, "Buffy"],
      ["BuffY", 1889009, "Buffy"],
    ])(
      "should return the player id and name for a given name, case-insensitively",
      (name, id, expectedName) => {
        expect(getPlayerFromIdOrName(name, "return-null")).toEqual({
          id,
          name: expectedName,
        });
      },
    );

    it.each(["Unknown", 123])(
      "should return undefined for an unknown id or name",
      (idOrName) => {
        expect(getPlayerFromIdOrName(idOrName, "return-null")).toBeNull();
      },
    );
  });
});

describe("getRange", () => {
  it.each([
    // Normal range
    ["1-2", [1, 2]],
    // Single number
    ["1", [1, 1]],
    // Negative single number
    ["-1", [-1, -1]],
    // Invalid
    ["1-", [0, 0]],
    // Negative upper bound
    ["-5--1", [-5, -1]],
    // Unusual order (let this slide)
    ["10--1", [10, -1]],
    // Ending in zero
    ["-5-0", [-5, 0]],
  ])("should return the range for %p", (input, expected) => {
    expect(getRange(input)).toEqual(expected);
  });
});

describe("combat flags", () => {
  function getLastCombatUpdate() {
    const [url, usePostMethod] = vi.mocked(visitUrl).mock.lastCall ?? [];
    expect(usePostMethod).toBe(true);
    const { pathname, searchParams } = new URL(
      url ?? "",
      "https://www.kingdomofloathing.com/",
    );
    expect(pathname).toBe("/account.php");
    expect(searchParams.get("action")).toBe("Update");
    expect(searchParams.get("am")).toBe("1");
    expect(searchParams.get("ajax")).toBe("1");
    expect(searchParams.has("pwd")).toBe(true);
    return searchParams;
  }

  beforeEach(() => {
    vi.mocked(visitUrl).mockReset();
    vi.mocked(xpath).mockReset().mockReturnValue([]);
  });

  it("posts flag names and boolean values to the account endpoint", () => {
    vi.mocked(visitUrl).mockReturnValue("updated");
    expect(
      setCombatFlags(
        { flag: "disablefacts", value: true },
        { flag: "disablemeteor", value: false },
      ),
    ).toBe("updated");
    expect(visitUrl).toHaveBeenCalledTimes(1);
    const params = getLastCombatUpdate();
    expect(params.getAll("actions[]").sort()).toEqual([
      "flag_disablefacts",
      "flag_disablemeteor",
    ]);
    expect(params.get("flag_disablefacts")).toBe("1");
    expect(params.get("flag_disablemeteor")).toBe("0");
  });

  it.each([false, true])(
    "applies flags before the action and restores them afterward (throws: %s)",
    (throws) => {
      vi.mocked(xpath).mockReturnValue(["checked"]);
      const run = () =>
        withCombatFlags(
          () => {
            const params = getLastCombatUpdate();
            expect(params.getAll("actions[]")).toEqual(["flag_disablefacts"]);
            expect(params.get("flag_disablefacts")).toBe("0");
            if (throws) throw new Error("action failed");
            return "result";
          },
          { flag: "disablefacts", value: false },
        );

      if (throws) expect(run).toThrow("action failed");
      else expect(run()).toBe("result");

      const params = getLastCombatUpdate();
      expect(params.getAll("actions[]")).toEqual(["flag_disablefacts"]);
      expect(params.get("flag_disablefacts")).toBe("1");
    },
  );
});
