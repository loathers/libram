import "core-js/modules/es.object.entries";
import "core-js/modules/es.object.from-entries";

import {
  Bounty,
  Class,
  Coinmaster,
  Effect,
  Element,
  Familiar,
  getProperty,
  Item,
  Location,
  MafiaClass,
  Monster,
  Phylum,
  Servant,
  setProperty,
  Skill,
  Slot,
  Stat,
  Thrall,
  toBounty,
  toClass,
  toCoinmaster,
  toEffect,
  toElement,
  toFamiliar,
  toItem,
  toLocation,
  toMonster,
  toPhylum,
  toServant,
  toSkill,
  toSlot,
  toStat,
  toThrall,
} from "kolmafia";

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
import {
  isBooleanProperty,
  isFamiliarProperty,
  isLocationProperty,
  isMonsterProperty,
  isNumericOrStringProperty,
  isNumericProperty,
  isPhylumProperty,
  isStatProperty,
  isStringProperty,
  KnownProperty,
} from "./propertyTyping";

const createPropertyGetter =
  <T>(transform: (value: string, property: string) => T) =>
  (property: string, default_?: T): T => {
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
  Type: typeof MafiaClass & (new () => T),
  toType: (x: string) => T
): ((property: string, default_?: T) => T | null) =>
  createPropertyGetter((value) => {
    if (value === "") return null;
    const v = toType(value);
    return v === Type.get<T>("none") ? null : v;
  });

export const getString = createPropertyGetter((value) => value);

export const getCommaSeparated = createPropertyGetter((value) =>
  value.split(/, ?/)
);

export const getBoolean = createPropertyGetter((value) => value === "true");

export const getNumber = createPropertyGetter((value) => Number(value));

export const getBounty = createMafiaClassPropertyGetter(Bounty, toBounty);

export const getClass = createMafiaClassPropertyGetter(Class, toClass);

export const getCoinmaster = createMafiaClassPropertyGetter(
  Coinmaster,
  toCoinmaster
);

export const getEffect = createMafiaClassPropertyGetter(Effect, toEffect);

export const getElement = createMafiaClassPropertyGetter(Element, toElement);

export const getFamiliar = createMafiaClassPropertyGetter(Familiar, toFamiliar);

export const getItem = createMafiaClassPropertyGetter(Item, toItem);

export const getLocation = createMafiaClassPropertyGetter(Location, toLocation);

export const getMonster = createMafiaClassPropertyGetter(Monster, toMonster);

export const getPhylum = createMafiaClassPropertyGetter(Phylum, toPhylum);

export const getServant = createMafiaClassPropertyGetter(Servant, toServant);

export const getSkill = createMafiaClassPropertyGetter(Skill, toSkill);

export const getSlot = createMafiaClassPropertyGetter(Slot, toSlot);

export const getStat = createMafiaClassPropertyGetter(Stat, toStat);

export const getThrall = createMafiaClassPropertyGetter(Thrall, toThrall);

/**
 * Returns the value of a mafia property, either built in or custom
 * @param property Name of the property
 * @param _default Default value for the property to take if not set
 */
export function get(property: BooleanProperty): boolean;
export function get(property: BooleanProperty, _default: boolean): boolean;
export function get(property: NumericProperty): number;
export function get(property: NumericProperty, _default: number): number;
export function get(property: NumericOrStringProperty): number | string;
export function get(
  property: NumericOrStringProperty,
  _default: number | string
): number | string;
export function get(property: StringProperty): string;
export function get(property: StringProperty, _default: string): string;
export function get(property: LocationProperty): Location | null;
export function get(property: LocationProperty, _default: Location): Location;
export function get(property: MonsterProperty): Monster | null;
export function get(property: MonsterProperty, _default: Monster): Monster;
export function get(property: FamiliarProperty): Familiar | null;
export function get(property: FamiliarProperty, _default: Familiar): Familiar;
export function get(property: StatProperty): Stat | null;
export function get(property: StatProperty, _default: Stat): Stat;
export function get(property: PhylumProperty): Phylum | null;
export function get(property: PhylumProperty, _default: Phylum): Phylum;
export function get(property: string, _default: Location): Location | null;
export function get(property: string, _default: Monster): Monster | null;
export function get(property: string, _default: Familiar): Familiar | null;
export function get(property: string, _default: boolean): boolean;
export function get(property: string, _default: number): number;
export function get(property: string, _default?: string): string;
export function get(property: string, _default?: unknown): unknown {
  const value = getString(property);

  // Handle known properties.
  if (isBooleanProperty(property)) {
    return getBoolean(property, _default as boolean | undefined) ?? false;
  } else if (isNumericProperty(property)) {
    return getNumber(property, _default as number | undefined) ?? 0;
  } else if (isNumericOrStringProperty(property)) {
    return value.match(/^\d+$/) ? parseInt(value) : value;
  } else if (isLocationProperty(property)) {
    return getLocation(property, _default as Location | undefined);
  } else if (isMonsterProperty(property)) {
    return getMonster(property, _default as Monster | undefined);
  } else if (isFamiliarProperty(property)) {
    return getFamiliar(property, _default as Familiar | undefined);
  } else if (isStatProperty(property)) {
    return getStat(property, _default as Stat | undefined);
  } else if (isPhylumProperty(property)) {
    return getPhylum(property, _default as Phylum | undefined);
  } else if (isStringProperty(property)) {
    return value;
  }

  // Not a KnownProperty from here on out.
  if (_default instanceof Location) {
    return getLocation(property, _default as Location | undefined);
  } else if (_default instanceof Monster) {
    return getMonster(property, _default as Monster | undefined);
  } else if (_default instanceof Familiar) {
    return getFamiliar(property, _default as Familiar | undefined);
  } else if (_default instanceof Stat) {
    return getStat(property, _default as Stat | undefined);
  } else if (_default instanceof Phylum) {
    return getPhylum(property, _default as Phylum | undefined);
  } else if (typeof _default === "boolean") {
    return value === "true" ? true : value === "false" ? false : _default;
  } else if (typeof _default === "number") {
    return value === "" ? _default : parseInt(value);
  } else if (value === "") {
    return _default === undefined ? "" : _default;
  } else {
    return value;
  }
}

/**
 * Sets the value of a mafia property, either built in or custom
 * @param property Name of the property
 * @param value Value to give the property
 */
export function set(property: BooleanProperty, value: boolean): void;
export function set(property: NumericProperty, value: number): void;
export function set(
  property: NumericOrStringProperty,
  value: number | string
): void;
export function set(property: StringProperty, value: string): void;
export function set(property: LocationProperty, value: Location): void;
export function set(property: MonsterProperty, value: Monster): void;
export function set(property: FamiliarProperty, value: Familiar): void;
export function set(property: StatProperty, value: Stat): void;
export function set(property: PhylumProperty, value: Phylum): void;
export function set<D extends { toString(): string }>(
  property: string,
  value: D
): void;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function set<D extends { toString(): string }>(
  property: string,
  value: D
): void {
  const stringValue = value === null ? "" : value.toString();
  setProperty(property, stringValue);
}

type Properties = Partial<{
  [P in KnownProperty]: unknown;
}>;

export function setProperties(properties: Properties): void {
  for (const [prop, value] of Object.entries(properties)) {
    set(prop, value as { toString(): string });
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
  value: unknown,
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
  private properties: Properties = {};

  get storedValues(): Properties {
    return this.properties;
  }

  /**
   * Sets a collection of properties to the given values, storing the old values.
   * @param propertiesToSet A Properties object, keyed by property name.
   */
  set(propertiesToSet: Properties): void {
    for (const [propertyName, propertyValue] of Object.entries(
      propertiesToSet
    )) {
      if (this.properties[propertyName as KnownProperty] === undefined) {
        this.properties[propertyName as KnownProperty] = get(propertyName);
      }
      set(propertyName, propertyValue as { toString(): string });
    }
  }

  /**
   * Sets a collection of choice adventure properties to the given values, storing the old values.
   * @param choicesToSet An object keyed by choice adventure number.
   */
  setChoices(choicesToSet: { [choice: number]: number | string }): void {
    this.set(
      Object.fromEntries(
        Object.entries(choicesToSet).map(([choiceNumber, choiceValue]) => [
          `choiceAdventure${choiceNumber}` as KnownProperty,
          choiceValue,
        ])
      ) as Properties
    );
  }

  /**
   * Resets the given properties to their original stored value. Does not delete entries from the manager.
   * @param properties Collection of properties to reset.
   */
  reset(...properties: KnownProperty[]): void {
    for (const property of properties) {
      const value = this.properties[property];
      if (value) {
        set(property, value as { toString(): string });
      }
    }
  }

  /**
   * Iterates over all stored values, setting each property back to its original stored value. Does not delete entries from the manager.
   */
  resetAll(): void {
    setProperties(this.properties);
  }

  /**
   * Stops storing the original values of inputted properties.
   * @param properties Properties for the manager to forget.
   */
  clear(...properties: KnownProperty[]): void {
    for (const property of properties) {
      if (this.properties[property]) {
        delete this.properties[property];
      }
    }
  }

  /**
   * Clears all properties.
   */
  clearAll(): void {
    this.properties = {};
  }

  /**
   * Increases a numeric property to the given value if necessary.
   * @param property The numeric property we want to potentially raise.
   * @param value The minimum value we want that property to have.
   * @returns Whether we needed to change the property.
   */
  setMinimumValue(property: NumericProperty, value: number): boolean {
    if (get(property, 0) < value) {
      this.set({ [property]: value });
      return true;
    }
    return false;
  }

  /**
   * Decrease a numeric property to the given value if necessary.
   * @param property The numeric property we want to potentially lower.
   * @param value The maximum value we want that property to have.
   * @returns Whether we needed to change the property.
   */
  setMaximumValue(property: NumericProperty, value: number): boolean {
    if (get(property, 0) > value) {
      this.set({ [property]: value });
      return true;
    }
    return false;
  }
}
