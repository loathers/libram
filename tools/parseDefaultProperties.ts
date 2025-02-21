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

async function main() {
  const response = await nodeFetch(PROPS_FILE);
  const text = await response.text();
  const props = text.split("\n");

  const propTypes: { [key: string]: string[] } = {
    BooleanProperty: [],
    NumericProperty: [],
    MonsterProperty: [],
    LocationProperty: [],
    StringProperty: [],
    NumericOrStringProperty: [],
    FamiliarProperty: [],
    StatProperty: [],
    PhylumProperty: [],
    ItemProperty: [],
  };

  for (const prop of props) {
    const [, property, defaultValue] = prop.split("\t");
    if (!property) continue;

    if (isMonsterProperty(property)) {
      propTypes.MonsterProperty.push(property);
    } else if (isLocationProperty(property)) {
      propTypes.LocationProperty.push(property);
    } else if (isStatProperty(property)) {
      propTypes.StatProperty.push(property);
    } else if (isFamiliarProperty(property)) {
      propTypes.FamiliarProperty.push(property);
    } else if (isPhylumProperty(property)) {
      propTypes.PhylumProperty.push(property);
    } else if (isItemProperty(property)) {
      propTypes.ItemProperty.push(property);
    } else if (isNumericOrStringProperty(property)) {
      propTypes.NumericOrStringProperty.push(property);
    } else if (!defaultValue) {
      propTypes.StringProperty.push(property);
    } else if (hasBooleanDefault(property, defaultValue)) {
      propTypes.BooleanProperty.push(property);
    } else if (hasNumericDefault(property, defaultValue)) {
      propTypes.NumericProperty.push(property);
    } else {
      propTypes.StringProperty.push(property);
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
  });

  await writeFile(TYPES_FILE, contents);
}

main();
