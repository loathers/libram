import { getProperty, MafiaClass } from "kolmafia";

import { NumericProperty, BooleanProperty, isNumericProperty, isBooleanProperty, MonsterProperty, StringProperty, LocationProperty, isMonsterProperty, isLocationProperty } from "./propertyTyping";

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

export function get(property: NumericProperty): number;
export function get(property: BooleanProperty): boolean;
export function get(property: MonsterProperty): Monster | null;
export function get(property: LocationProperty): Location | null;
export function get(property: StringProperty | string): string;
export function get<T extends string>(property: T): string | number | boolean | Monster | Location | null {
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

