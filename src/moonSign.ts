const MoonSigns = [
  "Mongoose",
  "Wallaby",
  "Vole",
  "Platypus",
  "Opossum",
  "Marmot",
  "Wombat",
  "Blender",
  "Packrat",
] as const;
export type MoonSign = typeof MoonSigns[number];

/**
 * @param moon Moon sign name
 * @returns Moon sign id else 0
 */
export function signNameToId(moon: MoonSign): number {
  return MoonSigns.indexOf(moon) + 1;
}

/**
 * @param id Moon sign id
 * @returns Name of moon sign else "None"
 */
export function signIdToName(id: number): MoonSign | "None" {
  return MoonSigns[id - 1] || "None";
}
