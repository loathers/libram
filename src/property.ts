import "core-js/features/object/entries";
import "core-js/features/object/from-entries";
import { getProperty, MafiaClass, setProperty } from "kolmafia";

import {
  isBooleanProperty,
  isLocationProperty,
  isMonsterProperty,
  isNumericProperty,
  KnownProperty,
  NumericOrStringProperty,
  PropertyValue,
} from "./propertyTyping";

const createPropertyGetter = <T>(
  transform: (value: string, property: string) => T
) => (property: string, default_?: T): T => {
  const value = getProperty(property);
  if (default_ !== undefined && value === "") {
    return default_;
  }

  return transform(value, property);
};

type MafiaClasses =
  | Bounty
  | Class
  | Coinmaster
  | Effect
  | Element
  | Familiar
  | Item
  | Location
  | Monster
  | Phylum
  | Servant
  | Skill
  | Slot
  | Stat
  | Thrall;

const createMafiaClassPropertyGetter = <T extends MafiaClasses>(
  Type: typeof MafiaClass & (new () => T)
): ((property: string, default_?: T | null) => T | null) =>
  createPropertyGetter((value) => {
    if (value === "") return null;
    const v = Type.get<T>(value);
    return v === Type.get<T>("none") ? null : v;
  });

export const getString = createPropertyGetter((value) => value);

export const getCommaSeparated = createPropertyGetter((value) =>
  value.split(/, ?/)
);

export const getBoolean = createPropertyGetter((value) => value === "true");

export const getNumber = createPropertyGetter((value) => Number(value));

export const getBounty = createMafiaClassPropertyGetter(Bounty);

export const getClass = createMafiaClassPropertyGetter(Class);

export const getCoinmaster = createMafiaClassPropertyGetter(Coinmaster);

export const getEffect = createMafiaClassPropertyGetter(Effect);

export const getElement = createMafiaClassPropertyGetter(Element);

export const getFamiliar = createMafiaClassPropertyGetter(Familiar);

export const getItem = createMafiaClassPropertyGetter(Item);

export const getLocation = createMafiaClassPropertyGetter(Location);

export const getMonster = createMafiaClassPropertyGetter(Monster);

export const getPhylum = createMafiaClassPropertyGetter(Phylum);

export const getServant = createMafiaClassPropertyGetter(Servant);

export const getSkill = createMafiaClassPropertyGetter(Skill);

export const getSlot = createMafiaClassPropertyGetter(Slot);

export const getStat = createMafiaClassPropertyGetter(Stat);

export const getThrall = createMafiaClassPropertyGetter(Thrall);

/**
 * Returns the value of a mafia property, either built in or custom
 * @param property Name of the property
 * @param _default Default value for the property to take if not set
 */
export function get<_D, P extends KnownProperty>(
  property: P,
  _default?: PropertyValue<P>
): PropertyValue<P>;
export function get<D = string | boolean | number, P extends string = string>(
  property: P,
  _default?: D
): PropertyValue<P, D>;
export function get<_D, P extends string>(
  property: P,
  _default?: PropertyValue<P>
): unknown {
  const value = getString(property);

  if (isMonsterProperty(property)) {
    return getMonster(property, _default);
  }

  if (isLocationProperty(property)) {
    return getLocation(property, _default);
  }

  if (value === "") {
    return _default === undefined ? "" : _default;
  }

  if (isBooleanProperty(property, value)) {
    return getBoolean(property, _default);
  }

  if (isNumericProperty(property, value)) {
    return getNumber(property, _default);
  }

  return value;
}

/**
 * Sets the value of a mafia property, either built in or custom
 * @param property Name of the property
 * @param value Value to give the property
 */
export function set<P extends KnownProperty>(
  property: P,
  value: PropertyValue<P>
): void;
export function set<P extends string>(
  property: P,
  value: PropertyValue<P>
): void;
export function set<P extends string>(
  property: P,
  value: PropertyValue<P>
): void {
  const stringValue = value === null ? "" : value.toString();
  setProperty(property, stringValue);
}

type Properties = Partial<
  {
    [P in KnownProperty]: PropertyValue<P>;
  }
>;

export function setProperties(properties: Properties): void {
  for (const [prop, value] of Object.entries(properties)) {
    set(prop, value);
  }
}

export function withProperties(
  properties: Properties,
  callback: () => void
): void {
  const propertiesBackup = Object.fromEntries(
    Object.entries(properties).map(([prop]) => [prop, get(prop)])
  ) as Properties;
  setProperties(properties);
  try {
    callback();
  } finally {
    setProperties(propertiesBackup);
  }
}

export function withProperty<P extends KnownProperty>(
  property: P,
  value: PropertyValue<P>,
  callback: () => void
): void {
  withProperties({ [property]: value }, callback);
}

export function withChoices(
  choices: { [choice: number]: number | string },
  callback: () => void
): void {
  const properties = Object.fromEntries(
    Object.entries(choices).map(([choice, option]) => [
      `choiceAdventure${choice}` as NumericOrStringProperty,
      option,
    ])
  );
  withProperties(properties, callback);
}

export function withChoice(
  choice: number,
  value: number | string,
  callback: () => void
): void {
  withChoices({ [choice]: value }, callback);
}

export class PropertiesManager {
  properties: Properties;
  constructor() {
    this.properties = {};
  }

  set(propertiesToSet: Properties): void {
    for (const [propertyName, propertyValue] of Object.entries(
      propertiesToSet
    )) {
      if (this.properties[propertyName as KnownProperty] === undefined) {
        this.properties[propertyName as KnownProperty] = get(propertyName);
      }
      set(propertyName, propertyValue);
    }
  }

  setChoices(choicesToSet: { [choice: number]: number | string }): void {
    this.set(
      Object.fromEntries(
        Object.entries(choicesToSet).map(([choiceNumber, choiceValue]) => [
          `choiceAdventure${choiceNumber}` as KnownProperty,
          choiceValue,
        ])
      )
    );
  }

  resetAll(): void {
    Object.entries(this.properties).forEach(([propertyName, propertyValue]) =>
      set(propertyName, propertyValue)
    );
  }
}
