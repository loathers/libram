function mockOneOrMany<
  Ctor extends new (name: string) => T,
  T extends MafiaClass
>(
  ctor: Ctor,
  n: number | string | (number | string)[],
  knownInstances: T[]
): T | T[] {
  function mockOne(name: number | string): T {
    // to make mocking easier, we'll just tread ids as names
    if (typeof name === "number") {
      name = name.toString();
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

export class Bounty extends MafiaClass {
  private static knownInstances: Bounty[] = [];
  static get = jest.fn((n) => mockOneOrMany(Bounty, n, Bounty.knownInstances));
  static all = jest.fn(() => Bounty.knownInstances);
  static none = {};
}
export class Class extends MafiaClass {
  private static knownInstances: Class[] = [];
  static get = jest.fn((n) => mockOneOrMany(Class, n, Class.knownInstances));
  static all = jest.fn(() => Class.knownInstances);
  static none = {};
}
export class Coinmaster extends MafiaClass {
  private static knownInstances: Coinmaster[] = [];
  static get = jest.fn((n) =>
    mockOneOrMany(Coinmaster, n, Coinmaster.knownInstances)
  );
  static all = jest.fn(() => Coinmaster.knownInstances);
  static none = {};
}
export class Effect extends MafiaClass {
  private static knownInstances: Effect[] = [];
  static get = jest.fn((n) => mockOneOrMany(Effect, n, Effect.knownInstances));
  static all = jest.fn(() => Effect.knownInstances);
  static none = {};
}
export class Element extends MafiaClass {
  private static knownInstances: Element[] = [];
  static get = jest.fn((n) =>
    mockOneOrMany(Element, n, Element.knownInstances)
  );
  static all = jest.fn(() => Element.knownInstances);
  static none = {};
}
export class Familiar extends MafiaClass {
  private static knownInstances: Familiar[] = [];
  static get = jest.fn((n) =>
    mockOneOrMany(Familiar, n, Familiar.knownInstances)
  );
  static all = jest.fn(() => Familiar.knownInstances);
  static none = {};
}
export class Item extends MafiaClass {
  private static knownInstances: Item[] = [];
  private static mockId = 11;
  static get = jest.fn((n) => mockOneOrMany(Item, n, Item.knownInstances));
  static all = jest.fn(() => Item.knownInstances);
  static none = new Item("", -1, "");

  constructor(
    readonly name: string,
    readonly id: number = ++Item.mockId,
    readonly plural: string = `Multiple ${name}`
  ) {
    super(name);
  }
}

export class Location extends MafiaClass {
  private static knownInstances: Location[] = [];
  static get = jest.fn((n) =>
    mockOneOrMany(Location, n, Location.knownInstances)
  );
  static all = jest.fn(() => Location.knownInstances);
  static none = {};
}
export class Modifier extends MafiaClass {
  private static knownInstances: Modifier[] = [];
  static get = jest.fn((n) =>
    mockOneOrMany(Modifier, n, Modifier.knownInstances)
  );
  static all = jest.fn(() => Modifier.knownInstances);
  static none = {};
}
export class Monster extends MafiaClass {
  private static knownInstances: Monster[] = [];
  static get = jest.fn((n) =>
    mockOneOrMany(Monster, n, Monster.knownInstances)
  );
  static all = jest.fn(() => Monster.knownInstances);
  static none = {};
}
export class Path extends MafiaClass {
  private static knownInstances: Path[] = [];
  static get = jest.fn((n) => mockOneOrMany(Path, n, Path.knownInstances));
  static all = jest.fn(() => Path.knownInstances);
  static none = {};
}
export class Phylum extends MafiaClass {
  private static knownInstances: Phylum[] = [];
  static get = jest.fn((n) => mockOneOrMany(Phylum, n, Phylum.knownInstances));
  static all = jest.fn(() => Phylum.knownInstances);
  static none = {};
}
export class Servant extends MafiaClass {
  private static knownInstances: Servant[] = [];
  static get = jest.fn((n) =>
    mockOneOrMany(Servant, n, Servant.knownInstances)
  );
  static all = jest.fn(() => Servant.knownInstances);
  static none = {};
}
export class Skill extends MafiaClass {
  private static knownInstances: Skill[] = [];
  static get = jest.fn((n) => mockOneOrMany(Skill, n, Skill.knownInstances));
  static all = jest.fn(() => Skill.knownInstances);
  static none = {};
}
export class Slot extends MafiaClass {
  private static knownInstances: Slot[] = [];
  static get = jest.fn((n) => mockOneOrMany(Slot, n, Slot.knownInstances));
  static all = jest.fn(() => Slot.knownInstances);
  static none = {};
}
export class Stat extends MafiaClass {
  private static knownInstances: Stat[] = [];
  static get = jest.fn((n) => mockOneOrMany(Stat, n, Stat.knownInstances));
  static all = jest.fn(() => Stat.knownInstances);
  static none = {};
}
export class Thrall extends MafiaClass {
  private static knownInstances: Thrall[] = [];
  static get = jest.fn((n) => mockOneOrMany(Thrall, n, Thrall.knownInstances));
  static all = jest.fn(() => Thrall.knownInstances);
  static none = {};
}
export class Vykea extends MafiaClass {
  private static knownInstances: Vykea[] = [];
  static get = jest.fn((n) => mockOneOrMany(Vykea, n, Vykea.knownInstances));
  static all = jest.fn(() => Vykea.knownInstances);
  static none = {};
}

export const getPlayerName = jest.fn();
export const getPlayerId = jest.fn();

export const getProperty = jest.fn();

export const isGiftable = jest.fn();

export const print = jest.fn((msg) => console.log(`[kolmafia.print] ${msg}`));

export const toItem = jest.fn((name) => Item.get(name));
export const visitUrl = jest.fn();
