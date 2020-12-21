import { getProperty, MafiaClass } from "kolmafia";

import { $monster, $skill } from "./template-string";

export const createPropertyGetter = <T>(transform: (value: string) => T) => (
  property: string,
  default_?: T
) => {
  const value = getProperty(property);
  if (default_ !== undefined && value === "") {
    return default_;
  }

  return transform(value);
};

export const createMafiaClassPropertyGetter = <T extends MafiaClass>(
  Type: typeof MafiaClass & (new () => T)
) =>
  createPropertyGetter((value) => {
    const v = Type.get<T>(value);
    return v === Type.get<T>("none") ? null : v;
  });

export const get = createPropertyGetter((value) => value);

export const getCommaSeparated = createPropertyGetter((value) =>
  value.split(/, ?/)
);

export const getBoolean = createPropertyGetter((value) => value === "true");

export const getNumber = createPropertyGetter((value) =>
  Number.parseInt(value)
);

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
