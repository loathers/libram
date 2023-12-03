import { visitUrl } from "kolmafia";

import { buildUrl, combineQuery, EMPTY_VALUE, fetchUrl } from "../src/url";

jest.mock(
  "kolmafia",
  () => ({
    visitUrl: jest.fn(),
  }),
  { virtual: true }
);

describe(buildUrl, () => {
  it.each([
    "test.php",
    "test.php?foo=bar",
    "test.php?foo=bar&baz=qux",
    "https://www.google.com/",
  ])("should not modify a given path if there is no query", (path) => {
    expect(buildUrl(path)).toEqual(path);
  });

  it.each([
    ["test.php", { foo: "bar" }, "test.php?foo=bar"],
    ["test.php", { foo: "bar", baz: "qux" }, "test.php?foo=bar&baz=qux"],
    ["test.php?foo=bar", { baz: "qux" }, "test.php?foo=bar&baz=qux"],
    [
      "test.php",
      { message: "Send me hugs & kisses", foo: "bar=baz" },
      "test.php?message=Send%20me%20hugs%20%26%20kisses&foo=bar%3Dbaz",
    ],
    [
      "test.php?foo=bar%3Dbaz",
      { message: "Send me hugs & kisses" },
      "test.php?foo=bar%3Dbaz&message=Send%20me%20hugs%20%26%20kisses",
    ],
  ])(
    "should append query (as object) to the given path",
    (path, query, expected) => {
      expect(buildUrl(path, query)).toEqual(expected);
    }
  );

  it.each([
    ["test.php", [["foo", "bar"]], "test.php?foo=bar"],
    [
      "test.php",
      [
        ["foo", "bar"],
        ["baz", "qux"],
      ],
      "test.php?foo=bar&baz=qux",
    ],
    ["test.php?foo=bar", [["baz", "qux"]], "test.php?foo=bar&baz=qux"],
    [
      "test.php",
      [
        ["message", "Send me hugs & kisses"],
        ["foo", "bar=baz"],
      ],
      "test.php?message=Send%20me%20hugs%20%26%20kisses&foo=bar%3Dbaz",
    ],
    [
      "test.php?foo=bar%3Dbaz",
      [["message", "Send me hugs & kisses"]],
      "test.php?foo=bar%3Dbaz&message=Send%20me%20hugs%20%26%20kisses",
    ],
  ] as const)(
    "should append query (as array) to the given path",
    (path, query, expected) => {
      expect(buildUrl(path, query)).toEqual(expected);
    }
  );

  it.each([
    ["test.php?foo=bar", { foo: "baz" }, "test.php?foo=bar&foo=baz"],
    [
      "test.php?foo=bar%3Dbaz",
      { foo: "bar&baz" },
      "test.php?foo=bar%3Dbaz&foo=bar%26baz",
    ],
  ])(
    "should append a parameter even if it already exists",
    (path, query, expected) => {
      expect(buildUrl(path, query)).toEqual(expected);
    }
  );

  it.each([
    [
      "test.php",
      { foo: 42, bar: true, baz: EMPTY_VALUE },
      "test.php?foo=42&bar=true&baz",
    ],
    [
      "test.php",
      [
        ["foo", true],
        ["bar", EMPTY_VALUE],
        ["baz", 11],
      ],
      "test.php?foo=true&bar&baz=11",
    ],
  ] as const)(
    "should correctly encode non-string types",
    (path, query, expected) => {
      expect(buildUrl(path, query)).toEqual(expected);
    }
  );

  it.each([
    [["foo", "bar", "baz"]],
    [[["foo", "bar"], ["baz"], ["quux", "quuz"]]],
    [
      [
        ["foo", "bar"],
        ["baz", "qux", "quux"],
      ],
    ],
  ])("should fail if a query parameter is not a pair", (query) => {
    expect(() => buildUrl("test.php", query as any)).toThrow(
      "may only contain pair"
    );
  });
});

describe(fetchUrl, () => {
  it("should call visitUrl with post=false and encoded=true", () => {
    fetchUrl("test.php", { foo: "bar&baz" });

    expect(visitUrl).toHaveBeenCalledWith("test.php?foo=bar%26baz", true, true);
  });

  it("should call visitUrl with post=false if requested", () => {
    fetchUrl("test.php", { foo: "bar&baz" }, { method: "GET" });

    expect(visitUrl).toHaveBeenCalledWith(
      "test.php?foo=bar%26baz",
      false,
      true
    );
  });
});

describe(combineQuery, () => {
  it("should return an empty query array if no queries are given", () => {
    expect(combineQuery()).toEqual([]);
  });

  it("should return the given query if only one query is given", () => {
    expect(combineQuery({ foo: "bar" })).toEqual({ foo: "bar" });
  });

  it("should combine multiple object queries into one", () => {
    expect(combineQuery({ foo: "bar" }, { baz: "qux" })).toEqual([
      ["foo", "bar"],
      ["baz", "qux"],
    ]);
  });

  it("should combine multiple array queries into one", () => {
    expect(combineQuery([["foo", "bar"]], [["baz", "qux"]])).toEqual([
      ["foo", "bar"],
      ["baz", "qux"],
    ]);
  });

  it("should combine an object and an array into one", () => {
    expect(combineQuery({ foo: "bar" }, [["baz", "qux"]])).toEqual([
      ["foo", "bar"],
      ["baz", "qux"],
    ]);
  });

  it("should combine an array and an object into one", () => {
    expect(combineQuery([["foo", "bar"]], { baz: "qux" })).toEqual([
      ["foo", "bar"],
      ["baz", "qux"],
    ]);
  });

  it("should combine more than two queries", () => {
    expect(
      combineQuery({ foo: "bar" }, [["baz", "qux"]], { quux: "quuz" })
    ).toEqual([
      ["foo", "bar"],
      ["baz", "qux"],
      ["quux", "quuz"],
    ]);
  });
});
