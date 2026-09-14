import {
  Monster,
  availableAmount,
  getProperty,
  runChoice,
  visitUrl,
} from "kolmafia";
import { beforeEach, describe, expect, it, vi } from "vitest";

import * as Baseball from "./BaseBallDiamond.js";

const team = "122,125,126,124,124,125,125,977,982";

function monster(id: number): Monster {
  return { id } as Monster;
}

beforeEach(() => {
  vi.mocked(availableAmount).mockReturnValue(1);

  vi.mocked(getProperty).mockImplementation((property) => {
    if (property === "baseballTeam") {
      return team;
    }

    return "";
  });

  vi.clearAllMocks();
});

describe("BaseBallDiamond", () => {
  describe("have", () => {
    it("returns true when you have a Baseball Diamond", () => {
      vi.mocked(availableAmount).mockReturnValue(1);

      expect(Baseball.have()).toBe(true);
    });

    it("returns false when you do not have a Baseball Diamond", () => {
      vi.mocked(availableAmount).mockReturnValue(0);

      expect(Baseball.have()).toBe(false);
    });
  });

  describe("numberOfPlayers", () => {
    it("counts the players on the baseball team", () => {
      expect(Baseball.numberOfPlayers()).toBe(9);
    });

    it("handles a different-sized team", () => {
      vi.mocked(getProperty).mockReturnValue("122,125,126");

      expect(Baseball.numberOfPlayers()).toBe(3);
    });
  });

  describe("canSpecialPitch", () => {
    it("does not allow ineleigible players to special pitch", () => {
      expect(Baseball.canSpecialPitch(monster(122))).toBe(false);
    });

    it("allows players after the first two to special pitch", () => {
      expect(Baseball.canSpecialPitch(monster(126))).toBe(true);
      expect(Baseball.canSpecialPitch(monster(124))).toBe(true);
      expect(Baseball.canSpecialPitch(monster(977))).toBe(true);
      expect(Baseball.canSpecialPitch(monster(982))).toBe(true);
    });

    it("returns false for a monster not on the team", () => {
      expect(Baseball.canSpecialPitch(monster(999999))).toBe(false);
    });
  });

  describe("findPitchOrder", () => {
    it("returns null when the baseball team does not have the expected lineup", () => {
      expect(
        Baseball.findPitchOrder(
          monster(126),
          "Schenectady Scorcher",
          monster(124),
          "Ice Him Out",
        ),
      ).toBeNull();
    });

    it("returns null when the requested monster is not in the lineup", () => {
      expect(
        Baseball.findPitchOrder(monster(999999), "Schenectady Scorcher"),
      ).toBeNull();
    });

    it("returns null when the requested special pitch is too early", () => {
      // This monster is at position 0 in the actual team.
      expect(
        Baseball.findPitchOrder(monster(122), "Schenectady Scorcher"),
      ).toBeNull();
    });

    it("can determine whether a requested special pitch is possible", () => {
      // This test uses the lineup shape expected by findPitchOrder:
      // two non-pitchers followed by nine pitchers.
      vi.mocked(getProperty).mockReturnValue(
        "100,101,122,125,126,124,124,125,125",
      );

      const result = Baseball.findPitchOrder(
        monster(126),
        "Schenectady Scorcher",
      );

      expect(result).not.toBeNull();
      expect(result).toHaveLength(9);
    });

    it("places the requested special pitch against the requested monster", () => {
      vi.mocked(getProperty).mockReturnValue(
        "100,101,122,125,126,124,124,125,125",
      );

      const result = Baseball.findPitchOrder(
        monster(126),
        "Schenectady Scorcher",
      );

      expect(result).not.toBeNull();

      expect(result).toContain("Schenectady Scorcher");
    });

    it("can schedule multiple special pitches", () => {
      vi.mocked(getProperty).mockReturnValue(
        "100,101,122,125,126,124,124,125,125",
      );

      const result = Baseball.findPitchOrder(
        monster(126),
        "Schenectady Scorcher",
        monster(124),
        "Ice Him Out",
      );

      expect(result).not.toBeNull();
      expect(result).toContain("Schenectady Scorcher");
      expect(result).toContain("Ice Him Out");
    });
  });

  describe("canPitchGame", () => {
    it("returns false when no valid game can be constructed", () => {
      expect(
        Baseball.canPitchGame(monster(999999), "Schenectady Scorcher"),
      ).toBe(false);
    });

    it("returns true when a valid game can be constructed", () => {
      vi.mocked(getProperty).mockReturnValue(
        "100,101,122,125,126,124,124,125,125",
      );

      expect(Baseball.canPitchGame(monster(126), "Schenectady Scorcher")).toBe(
        true,
      );
    });
  });

  describe("pitchAGame", () => {
    it("returns false without starting a game when no pitch order exists", () => {
      expect(Baseball.pitchAGame(monster(999999), "Schenectady Scorcher")).toBe(
        false,
      );

      expect(visitUrl).not.toHaveBeenCalled();
      expect(runChoice).not.toHaveBeenCalled();
    });
  });
});
