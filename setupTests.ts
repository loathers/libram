import { decode as decodeEntities } from "html-entities";

import * as kolmafia from "kolmafia";
import { vi } from "vitest";

vi.mock("kolmafia");

type N = number | string | (number | string)[];

function mockOneOrMany<
  Ctor extends new (name: string) => T,
  T extends { name: string },
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const knownInstances: Record<string, any[]> = {};
const knownIds: Record<string, number> = {};

// Mock all of the MafiaClasses
for (const [key, value] of Object.entries(kolmafia)) {
  if (typeof value !== "function") {
    continue;
  }

  // Let's take the existence of a none static to be proof of being a MafiaClass
  const descriptor = Object.getOwnPropertyDescriptor(value, "prototype");
  if (!descriptor?.value.constructor.none) {
    continue;
  }

  const mockedClass = vi.mocked(kolmafia)[key];
  knownInstances[key] = [];
  knownIds[key] = 11;
  mockedClass.prototype.constructor.mockImplementation(function (name) {
    this.name = name;
    this.id = knownIds[key]++;
  });
  mockedClass.prototype.toString = function () {
    return this.name;
  };
  mockedClass.get.mockImplementation((n: N) =>
    mockOneOrMany(mockedClass, n, knownInstances[key]),
  );
  mockedClass.all.mockImplementation(() => knownInstances[key]);
}

function findItemByPlural(plural: string) {
  return knownInstances["Item"].find((i) => i.plural === plural);
}

vi.mocked(kolmafia).logprint.mockImplementation((msg) =>
  console.log(`[kolmafia.logprint] ${msg}`),
);
vi.mocked(kolmafia).print.mockImplementation((msg?) =>
  console.log(`[kolmafia.print] ${msg}`),
);
vi.mocked(kolmafia).printHtml.mockImplementation((msg) =>
  console.log(`[kolmafia.printHtml] ${msg}`),
);
vi.mocked(kolmafia).extractItems.mockImplementation((s) => {
  const items: Record<string, number> = {};

  for (const match of s.matchAll(/You acquire an item: <b>([^<]+)<\/b>/g)) {
    const name = decodeEntities(match[1]);
    items[name] = (items[name] ?? 0) + 1;
  }
  for (const match of s.matchAll(/You acquire <b>(\d+) ([^<]+)<\/b>/g)) {
    const count = parseInt(match[1], 10);
    const plural = decodeEntities(match[2]);
    const item = findItemByPlural(plural) ?? kolmafia.Item.get(plural);
    const name = item.name;
    items[name] = (items[name] ?? 0) + count;
  }
  return items;
});
vi.mocked(kolmafia).extractMeat.mockImplementation((s) => {
  const match = /You gain (\d+) Meat/.exec(s);
  return match ? parseInt(match[1], 10) : 0;
});
vi.mocked(kolmafia).getMonsters.mockImplementation(() => []);
vi.mocked(kolmafia).nowToString.mockImplementation(() =>
  new Date().toISOString(),
);
vi.mocked(kolmafia).toInt.mockImplementation((value) =>
  parseInt(value.toString(), 10),
);
vi.mocked(kolmafia).toPlural.mockImplementation((item) => item.plural);
vi.mocked(kolmafia).toString.mockImplementation((value) => value.toString());

const mockProperties = new Map<string, string>();
export const clearMockProperties = () => mockProperties.clear();
vi.mocked(kolmafia).getProperty.mockImplementation(
  (key) => mockProperties.get(key) ?? "",
);
vi.mocked(kolmafia).setProperty.mockImplementation((key, value) =>
  mockProperties.set(key, value),
);
