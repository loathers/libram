// This is an example consult script using the macro handler in src/combat.ts.

import { Macro } from "../src";

export function main(): void {
  Macro.load().submit();
}
