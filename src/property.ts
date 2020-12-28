import { getProperty, MafiaClass, setProperty } from "kolmafia";

import { KnownProperty, PropertyValue, isNumericProperty, isBooleanProperty, isMonsterProperty, isLocationProperty } from "./propertyTyping";

export const createPropertyGetter = <T>(transform: (value: string, property: string) => T) => (
  property: string,
  default_?: T
): T => {
  const value = getProperty(property);
  if (default_ !== undefined && value === "") {
    return default_;
  }

  return transform(value, property);
};

type MafiaClasses = Bounty | Class | Coinmaster | Effect | Element | Familiar | Item | Location | Monster | Phylum | Servant | Skill | Slot | Stat | Thrall;

export const createMafiaClassPropertyGetter = <T extends MafiaClasses>(
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

export function get<P extends KnownProperty>(property: P): PropertyValue<P>;
export function get<P extends string>(property: P): PropertyValue<P, string>;
export function get(property: string): unknown {
  const value = getString(property);

  if (isMonsterProperty(property)) {
    return getMonster(property);
  }

  if (isLocationProperty(property)) {
    return getLocation(property);
  }

  if (value === "") {
    return value;
  }

  if (isBooleanProperty(property, value)) {
    return getBoolean(property);
  }

  if (isNumericProperty(property, value)) {
    return getNumber(property);
  }

  return value;
}

export function set<P extends KnownProperty>(property: P, value: PropertyValue<P>): void;
export function set<P extends string>(property: P, value: PropertyValue<P>): void;
export function set<P extends string>(property: P, value: PropertyValue<P>): void {
  const stringValue = value === null ? "" : value.toString();
  setProperty(property, stringValue);
}
