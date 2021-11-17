import {
  BooleanProperty,
  FamiliarProperty,
  LocationProperty,
  MonsterProperty,
  NumericOrStringProperty,
  NumericProperty,
  PhylumProperty,
  StatProperty,
  StringProperty,
} from "./propertyTypes";

export function isNumericProperty(
  property: string,
  value: string
): property is NumericProperty {
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
export function isNumericOrStringProperty(
  property: string
): property is NumericOrStringProperty {
  if (numericOrStringProperties.includes(property)) return true;
  return choiceAdventurePattern.test(property);
}

const fakeBooleans = ["trackVoteMonster", "_jickJarAvailable"];
export function isBooleanProperty(
  property: string,
  value: string
): property is BooleanProperty {
  if (fakeBooleans.includes(property)) return false;
  return ["true", "false"].includes(value);
}

const otherLocations = [
  "nextSpookyravenElizabethRoom",
  "nextSpookyravenStephenRoom",
  "sourceOracleTarget",
];
export function isLocationProperty(
  property: string
): property is LocationProperty {
  return otherLocations.includes(property) || property.endsWith("Location");
}

const otherMonsters = ["romanticTarget", "yearbookCameraTarget"];
const fakeMonsters = ["trackVoteMonster"];
export function isMonsterProperty(
  property: string
): property is MonsterProperty {
  if (otherMonsters.includes(property)) return true;
  return property.endsWith("Monster") && !fakeMonsters.includes(property);
}

export function isFamiliarProperty(
  property: string
): property is FamiliarProperty {
  return property.endsWith("Familiar");
}

const statProps = ["nsChallenge1", "shrugTopper", "snojoSetting"];
export function isStatProperty(property: string): property is StatProperty {
  return statProps.includes(property);
}

const phylumProps = ["dnaSyringe"];
export function isPhylumProperty(property: string): property is PhylumProperty {
  return phylumProps.includes(property) || property.endsWith("Phylum");
}

export type KnownProperty =
  | NumericProperty
  | BooleanProperty
  | MonsterProperty
  | LocationProperty
  | FamiliarProperty
  | PhylumProperty
  | StatProperty
  | StringProperty
  | NumericOrStringProperty;

export type PropertyValue<
  Property,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Default = any
> = Property extends NumericProperty
  ? number
  : Property extends BooleanProperty
  ? boolean
  : Property extends MonsterProperty
  ? Monster | null
  : Property extends LocationProperty
  ? Location | null
  : Property extends StringProperty
  ? string
  : Property extends FamiliarProperty
  ? Familiar | null
  : Property extends StatProperty
  ? Stat | null
  : Property extends PhylumProperty
  ? Phylum | null
  : Property extends NumericOrStringProperty
  ? number | string
  : Default;
