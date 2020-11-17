const concatTemplateString = (
  literals: TemplateStringsArray,
  ...placeholders: string[]
) =>
  literals.reduce(
    (acc, literal, i) => acc + literal + (placeholders[i] || ""),
    ""
  );

const createMafiaConstant = <T extends typeof MafiaType>(Type: T) => (
  literals: TemplateStringsArray,
  ...placeholders: string[]
) => Type.get(concatTemplateString(literals, ...placeholders));

const createMafiaConstants = <T extends typeof MafiaType>(Type: T) => (
  literals: TemplateStringsArray,
  ...placeholders: string[]
) =>
  concatTemplateString(literals, ...placeholders)
    .split(",")
    .map((id) => Type.get(id));

export const $item = createMafiaConstant(Item);
export const $items = createMafiaConstants(Item);

export const $monster = createMafiaConstant(Monster);
export const $monsters = createMafiaConstants(Monster);

const lime = $item`lime`;
