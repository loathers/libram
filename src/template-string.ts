const concatTemplateString = (
  literals: TemplateStringsArray,
  ...placeholders: string[]
) =>
  literals.reduce(
    (acc, literal, i) => acc + literal + (placeholders[i] || ""),
    ""
  );

const createSingleConstant = <T extends MafiaClass>(
  Type: typeof MafiaClass & (new () => T)
) => (literals: TemplateStringsArray, ...placeholders: string[]) => {
  const input = concatTemplateString(literals, ...placeholders);
  type I = InstanceType<typeof Type>;
  return Type.get<I>(input);
}

const createPluralConstant = <T extends MafiaClass>(
  Type: typeof MafiaClass & (new () => T)
) => (literals: TemplateStringsArray, ...placeholders: string[]) => {
  const input = concatTemplateString(literals, ...placeholders);

  type I = InstanceType<typeof Type>;

  if (input === "") {
    return Type.all<I>();
  }

  return Type.get<I>(input.split(","));
};

/**
 * An Item specified by name.
 */
export const $item = createSingleConstant(Item);

/**
 * A list of Items specified by a comma-separated list of names.
 * For a list of all possible Items, leave the template string blank.
 */
export const $items = createPluralConstant(Item);

/**
 * A Monster specified by name.
 */
export const $monster = createSingleConstant(Monster);

/**
 * A list of Monsters specified by a comma-separated list of names.
 * For a list of all possible Monsters, leave the template string blank.
 */
export const $monsters = createPluralConstant(Monster);
