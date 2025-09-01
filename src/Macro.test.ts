/* eslint-disable libram/verify-constants */
import { describe, it, expect, beforeAll } from "vitest";
import { InvalidMacroError, Macro } from "./combat.js";
import {
  $class,
  $effect,
  $item,
  $location,
  $monster,
  $skill,
  $stat,
} from "./template-string.js";

describe(Macro, () => {
  beforeAll(() => {
    // Prepare some mock instances

    const combatSkill = $skill`mock combat skill`;
    // @ts-expect-error TypeScript believes that this is readonly
    combatSkill.combat = true;

    const lungeSmack = $skill`Thrust-Smack`;
    // @ts-expect-error TypeScript believes that this is readonly
    lungeSmack.combat = true;

    const spiderWeb = $item`spider web`;
    // @ts-expect-error TypeScript believes that this is readonly
    spiderWeb.combat = true;

    const combatItem = $item`mock combat item`;
    // @ts-expect-error TypeScript believes that this is readonly
    combatItem.combat = true;

    const sealClubber = $class`Seal Clubber`;
    // @ts-expect-error TypeScript believes that this is readonly
    sealClubber.id = 1;

    const invalidLocation = $location`invalid mock location`;
    // @ts-expect-error TypeScript believes that this is readonly
    invalidLocation.id = -1;
  });

  it("abort", () => {
    expect(Macro.abort().toString()).toEqual(`abort;`);
  });

  it("abortWithWarning", () => {
    expect(Macro.abortWithWarning("test").toString()).toEqual(`abort "test";`);
  });

  it("runaway", () => {
    expect(Macro.runaway().toString()).toEqual(`runaway;`);
  });

  it("if_", () => {
    expect(Macro.if_("mock", Macro.abort()).toString()).toEqual(
      `if mock;abort;endif;`,
    );
  });

  it("ifNot", () => {
    expect(Macro.ifNot("mock", Macro.abort()).toString()).toEqual(
      `if !mock;abort;endif;`,
    );
  });

  it("while_", () => {
    expect(Macro.while_("mock", Macro.abort()).toString()).toEqual(
      `while mock;abort;endwhile;`,
    );
  });

  it("externalIf false", () => {
    expect(Macro.externalIf(false, "true", "false").toString()).toEqual(
      `false;`,
    );
  });

  it("externalIf true", () => {
    expect(Macro.externalIf(true, "true", "false").toString()).toEqual(`true;`);
  });

  it("repeat", () => {
    expect(Macro.attack().repeat().toString()).toEqual(`attack;repeat;`);
  });

  it("repeat message", () => {
    expect(Macro.attack().repeat("mock").toString()).toEqual(
      `attack;repeat mock;`,
    );
  });

  it("skill", () => {
    const mock = $skill`mock skill`;
    expect(Macro.skill(mock).toString()).toEqual(`skill ${mock.name};`);
  });

  it("trySkill", () => {
    const mock = $skill`mock combat skill`;
    expect(Macro.trySkill(mock).toString()).toEqual(
      `if hasskill ${mock.name};skill ${mock.name};endif;`,
    );
  });

  it("trySkillRepeat", () => {
    const mock = $skill`mock combat skill`;
    expect(Macro.trySkillRepeat(mock).toString()).toEqual(
      `if hasskill ${mock.name};skill ${mock.name};repeat hasskill ${mock.name};endif;`,
    );
  });

  it("item", () => {
    const mock = $item`mock item`;
    expect(Macro.item(mock).toString()).toEqual(`use ${mock.name};`);
  });

  it("item pair", () => {
    const mock = $item`mock item`;
    expect(Macro.item([mock, mock]).toString()).toEqual(
      `use ${mock.name}, ${mock.name};`,
    );
  });

  it("item pair + single", () => {
    const mock = $item`mock item`;
    expect(Macro.item([mock, mock], mock).toString()).toEqual(
      `${Macro.item([mock, mock]).toString()}${Macro.item(mock).toString()}`,
    );
  });

  it("item pair + pair", () => {
    const mock = $item`mock item`;
    expect(Macro.item([mock, mock], [mock, mock]).toString()).toEqual(
      `use ${mock.name}, ${mock.name};use ${mock.name}, ${mock.name};`,
    );
  });

  it("tryItem", () => {
    const mock = $item`mock item`;
    expect(Macro.tryItem(mock).toString()).toEqual(
      `if hascombatitem mock item;use ${mock.name};endif;`,
    );
  });

  it("tryItem same pair", () => {
    const mock = $item`mock item`;
    expect(Macro.tryItem([mock, mock]).toString()).toEqual(
      `if hastwocombatitems mock item;use mock item, mock item;endif;`,
    );
  });

  it("tryItem different pair", () => {
    const mock1 = $item`mock item`;
    const mock2 = $item`mock item two`;
    expect(Macro.tryItem([mock1, mock2]).toString()).toEqual(
      `if hascombatitem mock item && hascombatitem mock item two;use mock item, mock item two;endif;`,
    );
  });

  it("tryItem same pair + single", () => {
    const mock = $item`mock item`;
    expect(Macro.tryItem([mock, mock], mock).toString()).toEqual(
      `${Macro.tryItem([mock, mock]).toString()}${Macro.tryItem(mock).toString()}`,
    );
  });

  it("tryItem different pair + single", () => {
    const mock1 = $item`mock item`;
    const mock2 = $item`mock item two`;
    expect(Macro.tryItem([mock1, mock2], mock1).toString()).toEqual(
      `${Macro.tryItem([mock1, mock2]).toString()}${Macro.tryItem(mock1).toString()}`,
    );
  });

  it("funkslingItem same items", () => {
    const mock = $item`mock item`;
    expect(Macro.funkslingItem(mock, mock).toString()).toEqual(
      Macro.item([mock, mock]).toString(),
    );
  });

  it("funkslingItem different items", () => {
    const mock1 = $item`mock item`;
    const mock2 = $item`mock item two`;
    expect(Macro.funkslingItem(mock1, mock2).toString()).toEqual(
      Macro.item([mock1, mock2]).toString(),
    );
  });

  it("funklingItem same pair + single", () => {
    const mock = $item`mock item`;
    expect(Macro.funkslingItem(mock, mock, mock).toString()).toEqual(
      Macro.item([mock, mock], mock).toString(),
    );
  });

  it("funklingItem different pair + single", () => {
    const mock1 = $item`mock item`;
    const mock2 = $item`mock item two`;
    expect(Macro.funkslingItem(mock1, mock2, mock1).toString()).toEqual(
      Macro.item([mock1, mock2], mock1).toString(),
    );
  });

  it("tryFunklingItem same", () => {
    const mock = $item`mock item`;
    expect(Macro.tryFunkslingItem(mock, mock).toString()).toEqual(
      Macro.tryItem([mock, mock]).toString(),
    );
  });

  it("tryFunklingItem different", () => {
    const mock1 = $item`mock item`;
    const mock2 = $item`mock item two`;
    expect(Macro.tryFunkslingItem(mock1, mock2).toString()).toEqual(
      Macro.tryItem([mock1, mock2]).toString(),
    );
  });

  it("tryFunklingItem same pair + single", () => {
    const mock = $item`mock item`;
    expect(Macro.tryFunkslingItem(mock, mock, mock).toString()).toEqual(
      Macro.tryItem([mock, mock], mock).toString(),
    );
  });

  it("tryFunklingItem different pair + single", () => {
    const mock1 = $item`mock item`;
    const mock2 = $item`mock item two`;
    expect(Macro.tryFunkslingItem(mock1, mock2, mock1).toString()).toEqual(
      Macro.tryItem([mock1, mock2], mock1).toString(),
    );
  });

  it("attack", () => {
    expect(Macro.attack().toString()).toEqual(`attack;`);
  });

  it.todo("ifHolidayWanderer");

  it.todo("ifNotHolidayWanderer");
});

describe(Macro.makeBALLSPredicate, () => {
  it("Monster", () => {
    const mock = $monster`mock monster`;
    expect(Macro.makeBALLSPredicate(mock)).toEqual(`monsterid ${mock.id}`);
  });

  it("Monster[]", () => {
    const mockArray = [$monster`mock monster1`, $monster`mock monster2`];
    expect(Macro.makeBALLSPredicate(mockArray)).toEqual(
      `(monsterid ${mockArray[0].id} || monsterid ${mockArray[1].id})`,
    );
  });

  it("Effect", () => {
    const mock = $effect`mock effect`;
    expect(Macro.makeBALLSPredicate(mock)).toEqual(`haseffect ${mock.id}`);
  });

  it("Skill", () => {
    const mock = $skill`mock combat skill`;
    expect(Macro.makeBALLSPredicate(mock)).toEqual(`hasskill ${mock.name}`);
  });

  it("Skill Overlapping", () => {
    const mock = $skill`Thrust-Smack`;
    expect(Macro.makeBALLSPredicate(mock)).toEqual(`hasskill ${mock.id}`);
  });

  it("Item", () => {
    const mock = $item`mock combat item`;
    expect(Macro.makeBALLSPredicate(mock)).toEqual(
      `hascombatitem ${mock.name}`,
    );
  });

  it("Item Pair Same", () => {
    const mock = $item`mock combat item`;
    expect(Macro.makeBALLSPredicate([mock, mock])).toEqual(
      `hastwocombatitems ${mock.name}`,
    );
  });

  it("Item Pair Different", () => {
    const mock1 = $item`mock combat item`;
    const mock2 = $item`mock combat item two`;
    expect(Macro.makeBALLSPredicate([mock1, mock2])).toEqual(
      `hascombatitem ${mock1.name} && hascombatitem ${mock2.name}`,
    );
  });

  it("Item Overlapping", () => {
    const mock = $item`spider web`;
    expect(Macro.makeBALLSPredicate(mock)).toEqual(`hascombatitem ${mock.id}`);
  });

  it("Item Invalid", () => {
    const mock = $item`invalid mock item`;
    expect(() => Macro.makeBALLSPredicate(mock)).toThrow(InvalidMacroError);
  });

  it("Location", () => {
    const mock = $location`mock location`;
    expect(Macro.makeBALLSPredicate(mock)).toEqual(`snarfblat ${mock.id}`);
  });

  it("Location Invalid", () => {
    const mock = $location`invalid mock location`;
    expect(() => Macro.makeBALLSPredicate(mock)).toThrow(InvalidMacroError);
  });

  it("Class", () => {
    const mock = $class`Seal Clubber`;
    expect(Macro.makeBALLSPredicate(mock)).toEqual(`sealclubber`);
  });

  it("Class Invalid", () => {
    // Our testing tools produce instances starting at id = 11. By creating a new class, we can ensure that the id is invalid.
    const mock = $class`invalid mock class`;
    expect(() => Macro.makeBALLSPredicate(mock)).toThrow(InvalidMacroError);
  });

  it("Stat", () => {
    const mock = $stat`Mock`;
    expect(Macro.makeBALLSPredicate(mock)).toEqual(`mockclass`);
  });

  it("string", () => {
    expect(Macro.makeBALLSPredicate("mock")).toEqual("mock");
  });
});
