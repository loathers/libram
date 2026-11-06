import { getProperty, propertyExists, setProperty } from "kolmafia";
import { describe, expect, expectTypeOf, it, vi } from "vitest";

import { getStep, QuestState, questStep } from "./lib.js";
import { get, PropertiesManager, withProperty } from "./property.js";
import { questProperties, QuestProperty } from "./propertyTypes.js";
import {
  isQuestProperty,
  isStringProperty,
  QuestStatus,
} from "./propertyTyping.js";

describe("quest properties", () => {
  it.each([
    ["unstarted", "unstarted", QuestState.UNSTARTED],
    ["started", "started", QuestState.STARTED],
    ["finished", "finished", QuestState.FINISHED],
    ["completed", "completed", QuestState.FINISHED],
    ["", "", QuestState.BLANK],
    ["step0", "step0", 0],
    ["step12", "step12", 12],
  ])("reads %s", (raw, status, numeric) => {
    setProperty("questL02Larva", String(raw));
    expect(get("questL02Larva")).toBe(status);
    expect(getStep("questL02Larva")).toBe(numeric);
  });

  it("preserves Party Fair's blank status when choosing to party", () => {
    setProperty("_questPartyFair", "");
    expect(get("_questPartyFair")).toBe("");
    expect(getStep("_questPartyFair")).toBe(Infinity);
    setProperty("_questPartyFair", "finished");
    expect(getStep("_questPartyFair")).toBe(QuestState.FINISHED);
  });

  it("uses defaults only for blank values", () => {
    expect(get("questL02Larva", "unstarted")).toBe("unstarted");
    expect(getStep("questL02Larva", -2)).toBe(-2);
    setProperty("questL02Larva", "started");
    expect(get("questL02Larva", "step4")).toBe("started");
    expect(getStep("questL02Larva", 4)).toBe(QuestState.STARTED);
  });

  it.each(["step", "stepNaN", "step1x", "unknown"])(
    "rejects malformed status %s",
    (raw) => {
      setProperty("questL02Larva", raw);
      expect(get("questL02Larva")).toBe(raw);
      expect(() => getStep("questL02Larva")).toThrow("questL02Larva");
    },
  );

  it("distinguishes statuses from quest metadata", () => {
    expect(questProperties).toContain("_questPartyFair");
    expect(questProperties).toContain("_questPirateRealm");
    for (const property of questProperties) {
      expect(isQuestProperty(property)).toBe(true);
      expect(isStringProperty(property)).toBe(false);
    }
    for (const property of [
      "_questESp",
      "_questPartyFairProgress",
      "_questPartyFairQuest",
      "_questPartyFairItemsOpened",
      "questCustom",
      "warProgress",
    ]) {
      expect(isQuestProperty(property)).toBe(false);
    }
    setProperty("_questPartyFairProgress", "step1");
    expect(get("_questPartyFairProgress")).toBe("step1");
  });

  it("preserves questStep's legacy blank mapping", () => {
    expect(questStep("questL02Larva")).toBe(999);
  });

  it("restores the raw step after temporary property changes", () => {
    setProperty("questL02Larva", "step2");
    withProperty("questL02Larva", "started", () => {
      expect(get("questL02Larva")).toBe("started");
    });
    expect(getProperty("questL02Larva")).toBe("step2");
    vi.mocked(propertyExists).mockReturnValueOnce(true);
    const manager = new PropertiesManager();
    manager.set({ questL02Larva: "finished" });
    manager.resetAll();
    expect(getProperty("questL02Larva")).toBe("step2");
  });

  it("exposes raw quest statuses and numeric getStep values", () => {
    expectTypeOf(get("questL02Larva")).toEqualTypeOf<QuestStatus>();
    expectTypeOf(getStep("questL02Larva")).toEqualTypeOf<number>();
    expectTypeOf(getStep).parameter(0).toEqualTypeOf<QuestProperty>();
  });
});
