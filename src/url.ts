import { visitUrl } from "kolmafia";

export const EMPTY_VALUE = Symbol("empty");
type QValue = string | number | boolean | typeof EMPTY_VALUE;
export type QueryList = readonly (readonly [key: string, value: QValue])[];
export type QueryObject = Record<string, QValue>;
export type Query = QueryList | QueryObject;

type Options = {
  method?: "GET" | "POST";
};

/**
 * Fetches a URL and returns the response
 * @param path Path to resource, e.g. "clan_basement.php"
 * @param query Query parameters,
 *  either as an object, e.g. { action: "cleansewer" },
 *  or as a list of [key, value] pairs, e.g. [["action", "cleansewer"]]
 * @param options Additional options
 * @param options.method HTTP method to use, either "GET" or "POST", defaults to "POST"
 * @returns the response from visiting the URL
 */
export function fetchUrl(
  path: string,
  query: Query = [],
  options: Options = {}
): string {
  const { method = "POST" } = options;

  const url = buildUrl(path, query);

  return visitUrl(url, method === "POST", true);
}

/**
 * Builds a URL from a path and query
 * @param path Path to resource, e.g. "clan_basement.php"
 * @param query Query parameters,
 *  either as an object, e.g. { action: "cleansewer" },
 *  or as a list of [key, value] pairs, e.g. [["action", "cleansewer"]]
 * @returns the constructed URL, e.g. "clan_basement.php?action=cleansewer"
 */
export function buildUrl(path: string, query: Query = []): string {
  const urlParams = Array.isArray(query) ? query : Object.entries(query);
  if (urlParams.length === 0) {
    return path;
  }

  const chunks = [path];
  let sep = path.includes("?") ? "&" : "?";
  for (const param of urlParams) {
    if (param.length !== 2) {
      throw new Error(`Query parameter array may only contain pair elements`);
    }
    const [key, value] = param;
    chunks.push(sep);
    sep = "&";
    chunks.push(encodeURIComponent(key));
    if (value !== EMPTY_VALUE) {
      chunks.push("=");
      chunks.push(encodeURIComponent(value));
    }
  }
  return chunks.join("");
}

/**
 * Combines a list of queries into a single query
 * @param queries a list of query objects and/or arrays, can be mixed
 * @returns a single query
 */
export function combineQuery(...queries: Query[]): Query {
  if (queries.length === 1) {
    return queries[0];
  }
  const result = [];
  for (const query of queries) {
    if (Array.isArray(query)) {
      result.push(...query);
    } else {
      result.push(...Object.entries(query));
    }
  }
  return result;
}
