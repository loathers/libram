import { decode as decodeEntities } from "html-entities";
import { jest } from "@jest/globals";

import type RuntimeLibrary from "kolmafia";
import Mocked = jest.Mocked;

type Kolmafia = typeof RuntimeLibrary;

type N = number | string | (number | string)[];

function mockOneOrMany<
  Ctor extends new (name: string) => T,
  T extends MafiaClass
>(ctor: Ctor, n: N, knownInstances: T[]): T | T[] {
  function mockOne(name: number | string): T {
    // to make mocking easier, we'll just tread ids as names
    if (typeof name === "number") {
      name = `[${name.toString()}]`;
    }
    const existingInstance = knownInstances.find((i) => i.name === name);
    if (existingInstance) {
      return existingInstance;
    }
    const instance = new ctor(name);
    knownInstances.push(instance);
    return instance;
  }

  if (Array.isArray(n)) {
    return n.map((name) => mockOne(name));
  }
  return mockOne(n);
}

abstract class MafiaClass {
  constructor(readonly name: string) {}
}

class Bounty extends MafiaClass {
  private static knownInstances: Bounty[] = [];

  static get = jest.fn((n: N) =>
    mockOneOrMany(Bounty, n, Bounty.knownInstances)
  );

  static all = jest.fn(() => Bounty.knownInstances);

  static none = {};
}
class Class extends MafiaClass {
  private static knownInstances: Class[] = [];

  static get = jest.fn((n: N) => mockOneOrMany(Class, n, Class.knownInstances));

  static all = jest.fn(() => Class.knownInstances);

  static none = {};
}
class Coinmaster extends MafiaClass {
  private static knownInstances: Coinmaster[] = [];

  static get = jest.fn((n: N) =>
    mockOneOrMany(Coinmaster, n, Coinmaster.knownInstances)
  );

  static all = jest.fn(() => Coinmaster.knownInstances);

  static none = {};
}
class Effect extends MafiaClass {
  private static knownInstances: Effect[] = [];

  static get = jest.fn((n: N) =>
    mockOneOrMany(Effect, n, Effect.knownInstances)
  );

  static all = jest.fn(() => Effect.knownInstances);

  static none = {};
}
class Element extends MafiaClass {
  private static knownInstances: Element[] = [];

  static get = jest.fn((n: N) =>
    mockOneOrMany(Element, n, Element.knownInstances)
  );

  static all = jest.fn(() => Element.knownInstances);

  static none = {};
}
class Familiar extends MafiaClass {
  private static knownInstances: Familiar[] = [];

  static get = jest.fn((n: N) =>
    mockOneOrMany(Familiar, n, Familiar.knownInstances)
  );

  static all = jest.fn(() => Familiar.knownInstances);

  static none = {};
}
class Item extends MafiaClass {
  private static knownInstances: Item[] = [];

  private static mockId = 11;

  static get = jest.fn((n: N) => mockOneOrMany(Item, n, Item.knownInstances));

  static all = jest.fn(() => Item.knownInstances);

  static _findByPlural(plural: string) {
    return Item.knownInstances.find((i) => i.plural === plural);
  }

  static none = new Item("", -1, "");

  constructor(
    readonly name: string,
    readonly id: number = ++Item.mockId,
    public plural: string = `Multiple ${name}`
  ) {
    super(name);
  }
}

class Location extends MafiaClass {
  private static knownInstances: Location[] = [];

  static get = jest.fn((n: N) =>
    mockOneOrMany(Location, n, Location.knownInstances)
  );

  static all = jest.fn(() => Location.knownInstances);

  static none = {};
}
class Modifier extends MafiaClass {
  private static knownInstances: Modifier[] = [];

  static get = jest.fn((n: N) =>
    mockOneOrMany(Modifier, n, Modifier.knownInstances)
  );

  static all = jest.fn(() => Modifier.knownInstances);

  static none = {};
}
class Monster extends MafiaClass {
  private static knownInstances: Monster[] = [];

  static get = jest.fn((n: N) =>
    mockOneOrMany(Monster, n, Monster.knownInstances)
  );

  static all = jest.fn(() => Monster.knownInstances);

  static none = {};
}
class Path extends MafiaClass {
  private static knownInstances: Path[] = [];

  static get = jest.fn((n: N) => mockOneOrMany(Path, n, Path.knownInstances));

  static all = jest.fn(() => Path.knownInstances);

  static none = {};
}
class Phylum extends MafiaClass {
  private static knownInstances: Phylum[] = [];

  static get = jest.fn((n: N) =>
    mockOneOrMany(Phylum, n, Phylum.knownInstances)
  );

  static all = jest.fn(() => Phylum.knownInstances);

  static none = {};
}
class Servant extends MafiaClass {
  private static knownInstances: Servant[] = [];

  static get = jest.fn((n: N) =>
    mockOneOrMany(Servant, n, Servant.knownInstances)
  );

  static all = jest.fn(() => Servant.knownInstances);

  static none = {};
}
class Skill extends MafiaClass {
  private static knownInstances: Skill[] = [];

  static get = jest.fn((n: N) => mockOneOrMany(Skill, n, Skill.knownInstances));

  static all = jest.fn(() => Skill.knownInstances);

  static none = {};
}
class Slot extends MafiaClass {
  private static knownInstances: Slot[] = [];

  static get = jest.fn((n: N) => mockOneOrMany(Slot, n, Slot.knownInstances));

  static all = jest.fn(() => Slot.knownInstances);

  static none = {};
}
class Stat extends MafiaClass {
  private static knownInstances: Stat[] = [];

  static get = jest.fn((n: N) => mockOneOrMany(Stat, n, Stat.knownInstances));

  static all = jest.fn(() => Stat.knownInstances);

  static none = {};
}
class Thrall extends MafiaClass {
  private static knownInstances: Thrall[] = [];

  static get = jest.fn((n: N) =>
    mockOneOrMany(Thrall, n, Thrall.knownInstances)
  );

  static all = jest.fn(() => Thrall.knownInstances);

  static none = {};
}
class Vykea extends MafiaClass {
  private static knownInstances: Vykea[] = [];

  static get = jest.fn((n: N) => mockOneOrMany(Vykea, n, Vykea.knownInstances));

  static all = jest.fn(() => Vykea.knownInstances);

  static none = {};
}

const kolmafiaClasses = {
  Bounty,
  Class,
  Coinmaster,
  Effect,
  Element,
  Familiar,
  Item,
  Location,
  Modifier,
  Monster,
  Path,
  Phylum,
  Servant,
  Skill,
  Slot,
  Stat,
  Thrall,
  Vykea,
};
const kolmafiaMocks: Record<string, unknown> = {
  ...kolmafiaClasses,
};

const actualKolmafia = jest.requireActual("kolmafia") as Kolmafia;

// we have to mock the functions ourselves, because with automock all functions
// share the same `warn` mock
for (const [key, value] of Object.entries(actualKolmafia)) {
  if (typeof value !== "function") {
    continue;
  }
  const descriptor = Object.getOwnPropertyDescriptor(value, "prototype");
  if (descriptor && !descriptor.writable) {
    if (!(key in kolmafiaClasses)) {
      console.warn("Missing MafiaClass from kolmafia mock:", key);
    }
    continue;
  }

  kolmafiaMocks[key] = jest.fn();
}

const kolmafia = kolmafiaMocks as Mocked<Kolmafia>;

kolmafia.logprint.mockImplementation((msg) =>
  console.log(`[kolmafia.logprint] ${msg}`)
);
kolmafia.print.mockImplementation((msg?) =>
  console.log(`[kolmafia.print] ${msg}`)
);
kolmafia.printHtml.mockImplementation((msg) =>
  console.log(`[kolmafia.printHtml] ${msg}`)
);

kolmafia.extractItems.mockImplementation((s) => {
  const items: Record<string, number> = {};

  for (const match of s.matchAll(/You acquire an item: <b>([^<]+)<\/b>/g)) {
    const name = decodeEntities(match[1]);
    items[name] = (items[name] ?? 0) + 1;
  }
  for (const match of s.matchAll(/You acquire <b>(\d+) ([^<]+)<\/b>/g)) {
    const count = parseInt(match[1], 10);
    const plural = decodeEntities(match[2]);
    const item = Item._findByPlural(plural) ?? (Item.get(plural) as Item);
    const name = item.name;
    items[name] = (items[name] ?? 0) + count;
  }
  return items;
});
kolmafia.extractMeat.mockImplementation((s) => {
  const match = /You gain (\d+) Meat/.exec(s);
  return match ? parseInt(match[1], 10) : 0;
});
kolmafia.getMonsters.mockImplementation(() => []);
kolmafia.nowToString.mockImplementation(() => new Date().toISOString());
kolmafia.toInt.mockImplementation((value) => parseInt(value as any, 10));
kolmafia.toPlural.mockImplementation((item) => item.plural);
kolmafia.toString.mockImplementation((value) => value.toString());

const mockProperties = new Map<string, string>();
export const clearMockProperties = () => mockProperties.clear();
kolmafia.getProperty.mockImplementation((key) => mockProperties.get(key) ?? "");
kolmafia.setProperty.mockImplementation((key, value) =>
  mockProperties.set(key, value)
);

module.exports = kolmafia;
