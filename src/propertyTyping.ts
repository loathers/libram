import {
  booleanProperties,
  BooleanProperty,
  familiarProperties,
  FamiliarProperty,
  locationProperties,
  LocationProperty,
  monsterProperties,
  MonsterProperty,
  numericOrStringProperties,
  NumericOrStringProperty,
  numericProperties,
  NumericProperty,
  phylumProperties,
  PhylumProperty,
  statProperties,
  StatProperty,
  stringProperties,
  StringProperty,
} from "./propertyTypes";

const booleanPropertiesSet = new Set(booleanProperties);
const numericPropertiesSet = new Set(numericProperties);
const numericOrStringPropertiesSet = new Set(numericOrStringProperties);
const stringPropertiesSet = new Set(stringProperties);
const locationPropertiesSet = new Set(locationProperties);
const monsterPropertiesSet = new Set(monsterProperties);
const familiarPropertiesSet = new Set(familiarProperties);
const statPropertiesSet = new Set(statProperties);
const phylumPropertiesSet = new Set(phylumProperties);

export function isBooleanProperty(
  property: string
): property is BooleanProperty {
  return (booleanPropertiesSet as Set<string>).has(property);
}

export function isNumericProperty(
  property: string
): property is NumericProperty {
  return (numericPropertiesSet as Set<string>).has(property);
}

export function isNumericOrStringProperty(
  property: string
): property is NumericOrStringProperty {
  return (numericOrStringPropertiesSet as Set<string>).has(property);
}

export function isStringProperty(property: string): property is StringProperty {
  return (stringPropertiesSet as Set<string>).has(property);
}

export function isLocationProperty(
  property: string
): property is LocationProperty {
  return (locationPropertiesSet as Set<string>).has(property);
}

export function isMonsterProperty(
  property: string
): property is MonsterProperty {
  return (monsterPropertiesSet as Set<string>).has(property);
}

export function isFamiliarProperty(
  property: string
): property is FamiliarProperty {
  return (familiarPropertiesSet as Set<string>).has(property);
}

export function isStatProperty(property: string): property is StatProperty {
  return (statPropertiesSet as Set<string>).has(property);
}

export function isPhylumProperty(property: string): property is PhylumProperty {
  return (phylumPropertiesSet as Set<string>).has(property);
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
