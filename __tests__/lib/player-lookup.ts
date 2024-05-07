import { mocked } from "jest-mock";
import { getPlayerId, getPlayerName } from "kolmafia";

import {
  getPlayerFromIdOrName,
  getPlayerIdFromName,
  getPlayerNameFromId,
} from "../../src";

jest.mock("kolmafia");

mocked(getPlayerName).mockImplementation((id: number) => {
  switch (id) {
    case 1:
      return "Jick";
    case 1889009:
      return "Buffy";
    default:
      return id.toString();
  }
});
mocked(getPlayerId).mockImplementation((name: string) => {
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
