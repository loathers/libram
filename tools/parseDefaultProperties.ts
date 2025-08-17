/// <reference types="kolmafia" />
import { writeFile } from "fs/promises";
import path from "path";
import url from "url";
import { difference } from "lodash-es";
import nodeFetch from "node-fetch";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const PROPS_FILE =
  "https://raw.githubusercontent.com/kolmafia/kolmafia/main/src/data/defaults.txt";

const TYPES_FILE = path.join(__dirname, "../src/propertyTypes.ts");

/**
 * @param property Property name
 * @param value Property value
 * @returns Whether the default value for this property is numeric
 */
export function hasNumericDefault(property: string, value: string): boolean {
  return !isNaN(Number(value)) && !isNaN(parseFloat(value));
}

const numericOrStringProperties = [
  "statusEngineering",
  "statusGalley",
  "statusMedbay",
  "statusMorgue",
  "statusNavigation",
  "statusScienceLab",
  "statusSonar",
  "statusSpecialOps",
  "statusWasteProcessing",
];
const choiceAdventurePattern = /^choiceAdventure\d+$/;
/**
 * @param property Property name
 * @returns Whether the supplied property should be coerced to a number or string
 */
export function isNumericOrStringProperty(property: string): boolean {
  if (numericOrStringProperties.includes(property)) return true;
  return choiceAdventurePattern.test(property);
}

const fakeBooleans = ["_jickJarAvailable", "trackVoteMonster"];
function hasBooleanDefault(property: string, defaultValue: string): boolean {
  if (fakeBooleans.includes(property)) return false;
  return ["true", "false"].includes(defaultValue);
}

const otherLocations = [
  "nextSpookyravenElizabethRoom",
  "nextSpookyravenStephenRoom",
  "sourceOracleTarget",
  "lastAdventure",
  "nextAdventure",
  "_lastPirateRealmIsland",
];
/**
 * @param property Property name
 * @returns Whether the supplied property should be coerced to a
 */
export function isLocationProperty(property: string): boolean {
  return otherLocations.includes(property) || property.endsWith("Location");
}

const otherMonsters = [
  "romanticTarget",
  "yearbookCameraTarget",
  "rufusDesiredEntity",
];
const fakeMonsters = ["trackVoteMonster"];
/**
 * @param property Property name
 * @returns Whether the supplied property should be coerced to a Monster
 */
export function isMonsterProperty(property: string): boolean {
  if (otherMonsters.includes(property)) return true;
  return (
    (property.endsWith("Monster") || property.endsWith("Boss")) &&
    !fakeMonsters.includes(property)
  );
}

/**
 * @param property Property name
 * @returns Whether the supplied property should be coerced to a Familiar
 */
export function isFamiliarProperty(property: string): boolean {
  return property.endsWith("Familiar");
}

const statProps = ["nsChallenge1", "shrugTopper", "snojoSetting"];
/**
 * @param property Property name
 * @returns Whether the supplied property should be coerced to a Stat
 */
export function isStatProperty(property: string): boolean {
  return statProps.includes(property);
}

const phylumProps = ["dnaSyringe"];
/**
 * @param property Property name
 * @returns Whether the supplied property should be coerced to a Phylum
 */
export function isPhylumProperty(property: string): boolean {
  return phylumProps.includes(property) || property.endsWith("Phylum");
}

const fakeItemProps = [
  "_unknownEasyBountyItem",
  "_unknownHardBountyItem",
  "_unknownSpecialBountyItem",
  "_untakenEasyBountyItem",
  "_untakenHardBountyItem",
  "_untakenSpecialBountyItem",
  "currentEasyBountyItem",
  "currentHardBountyItem",
  "currentSpecialBountyItem",
];
const itemProps = [
  "trapperOre",
  "guzzlrQuestBooze",
  "muffinOnOrder",
  "rufusDesiredArtifact",
  "_cookbookbatQuestIngredient",
  "_dailySpecial",
  "_pirateRealmCurio",
  "rufusDesiredItems",
];
/**
 * @param property Property name
 * @returns Whether the supplied property should be coerced to an Item
 */
export function isItemProperty(property: string): boolean {
  return (
    !fakeItemProps.includes(property) &&
    (itemProps.includes(property) || property.endsWith("Item"))
  );
}

function isDeprecated(attrs: string | undefined): boolean {
  if (!attrs) return false;
  return attrs.includes("deprecated");
}

async function main() {
  const response = await nodeFetch(PROPS_FILE);
  const text = await response.text();
  const props = text.split("\n");

  const propTypes = {
    BooleanProperty: [] as string[],
    NumericProperty: [] as string[],
    MonsterProperty: [] as string[],
    MonsterNumericProperty: [] as string[],
    LocationProperty: [] as string[],
    StringProperty: [] as string[],
    NumericOrStringProperty: [] as string[],
    FamiliarProperty: [] as string[],
    FamiliarNumericProperty: [] as string[],
    StatProperty: [] as string[],
    PhylumProperty: [] as string[],
    ItemProperty: [] as string[],
    ItemNumericProperty: [] as string[],
  };

  const deprecatedProps: Record<keyof typeof propTypes, string[]> = {
    BooleanProperty: [],
    NumericProperty: [],
    MonsterProperty: [],
    MonsterNumericProperty: [],
    LocationProperty: [],
    StringProperty: [],
    NumericOrStringProperty: [],
    FamiliarProperty: [],
    FamiliarNumericProperty: [],
    StatProperty: [],
    PhylumProperty: [],
    ItemProperty: [],
    ItemNumericProperty: [],
  };

  for (const prop of props) {
    // Skip comments
    if (prop.startsWith("#")) continue;

    // Skip lines with fewer than 2 columns
    const [, property, defaultValue, attrs] = prop.split("\t");
    if (!property) continue;

    const deprecated = isDeprecated(attrs);
    const keys: (keyof typeof propTypes)[] = [];

    if (isMonsterProperty(property)) {
      keys.push("MonsterProperty");
      if (hasNumericDefault(property, defaultValue)) {
        keys.push("MonsterNumericProperty");
      }
    } else if (isLocationProperty(property)) {
      keys.push("LocationProperty");
    } else if (isStatProperty(property)) {
      keys.push("StatProperty");
    } else if (isFamiliarProperty(property)) {
      keys.push("FamiliarProperty");
      if (hasNumericDefault(property, defaultValue)) {
        keys.push("FamiliarNumericProperty");
      }
    } else if (isPhylumProperty(property)) {
      keys.push("PhylumProperty");
    } else if (isItemProperty(property)) {
      keys.push("ItemProperty");
      if (hasNumericDefault(property, defaultValue)) {
        keys.push("ItemNumericProperty");
      }
    } else if (isNumericOrStringProperty(property)) {
      keys.push("NumericOrStringProperty");
    } else if (!defaultValue) {
      keys.push("StringProperty");
    } else if (hasBooleanDefault(property, defaultValue)) {
      keys.push("BooleanProperty");
    } else if (hasNumericDefault(property, defaultValue)) {
      keys.push("NumericProperty");
    } else {
      keys.push("StringProperty");
    }

    for (const key of keys) {
      propTypes[key].push(property);
      if (deprecated) {
        deprecatedProps[key].push(property);
      }
    }
  }

  // Print a report
  const current = await import(TYPES_FILE);

  let contents = `/** THIS FILE IS AUTOMATICALLY GENERATED. See tools/parseDefaultProperties.ts for more information */\n`;

  Object.entries(propTypes).forEach(([type, values]) => {
    // e.g. StringProperty -> stringProperties
    const typeLower = `${type[0].toLowerCase()}${type.slice(1, -1)}ies`;

    const added = difference(values, current[typeLower]);
    const removed = difference(current[typeLower], values);
    const report = `${added.length > 0 ? added.join(", ") : "none"} added, ${
      removed.length > 0 ? removed.join(", ") : "none"
    } removed`;

    console.log(`Storing ${values.length} props of type ${type} - ${report}`);
    contents += `export const ${typeLower} = [${values
      .map((v) => `"${v}"`)
      .join(", ")}] as const;\n`;
    contents += `export type ${type} = typeof ${typeLower}[number];\n`;
    const deprecated = deprecatedProps[type as keyof typeof propTypes];
    contents += `export type Deprecated${type} = ${deprecated.length > 0 ? deprecated.map((v) => `"${v}"`).join(" | ") : "never"};\n`;
  });

  await writeFile(TYPES_FILE, contents);
}

main();
