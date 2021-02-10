import { getProperty, MafiaClass, setProperty } from "kolmafia";

import {
  isBooleanProperty,
  isLocationProperty,
  isMonsterProperty,
  isNumericProperty,
  KnownProperty,
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
    // @ts-expect-error This needs a more dedicated fix
    return getMonster(property, _default);
  }

  if (isLocationProperty(property)) {
    // @ts-expect-error This needs a more dedicated fix
    return getLocation(property, _default);
  }

  if (value === "") {
    return _default === undefined ? "" : _default;
  }

  if (isBooleanProperty(property, value)) {
    // @ts-expect-error This needs a more dedicated fix
    return getBoolean(property, _default);
  }

  if (isNumericProperty(property, value)) {
    // @ts-expect-error This needs a more dedicated fix
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
  const stringValue = value === null ? "" : String(value);
  setProperty(property, stringValue);
}
