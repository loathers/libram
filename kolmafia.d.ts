// Type definitions for the KoLmafia JavaScript standard library

declare namespace Lib {
  /**
   * Prints the specified text `message` to the CLI. If the optional `color` parameter is specified and a valid html color code or entity, it will print in that color. See the CSS 2.1 color specification for a description of valid color syntax and keywords.
   * @param message The text to print
   * @param color The html color name or code
   */
  function print(message: string, color?: string): void;

  /**
   * Looks for a global or appropriate user preference from the saved files (found in your "Settings" directory) and if it finds one that matches, it returns whatever value is stored for that preference. If a matching preference is not found, an empty string is returned.
   * @param propName The property to get
   * @param global Look for the property specifically in the global map if true, user map if false. If not included will check both.
   */
  function get_property(propName: string, global?: boolean): string;
}

declare abstract class MafiaClass {
  static get<T>(name: string): T;
  static get<T>(names: string[]): T[];
  static all<T>(): T[];
}

declare class Bounty extends MafiaClass {
  /**
   * Plural
   */
  readonly plural: string;

  /**
   * Type
   */
  readonly type: string;

  /**
   * KoL internal type
   */
  readonly kol_internal_type: string;

  /**
   * Number
   */
  readonly number: number;

  /**
   * Image
   */
  readonly image: string;

  /**
   * Monster
   */
  readonly monster: Monster;

  /**
   * Location
   */
  readonly location: Location;
}

declare class Class extends MafiaClass {
  /**
   * Primestat
   */
  readonly primestat: Stat;
}

declare class Coinmaster extends MafiaClass {
  /**
   * Token
   */
  readonly token: string;

  /**
   * Item
   */
  readonly item: Item;

  /**
   * Property
   */
  readonly property: string;

  /**
   * Available tokens
   */
  readonly available_tokens: number;

  /**
   * Buys
   */
  readonly buys: boolean;

  /**
   * Sells
   */
  readonly sells: boolean;
}

declare class Effect extends MafiaClass {
  /**
   * Default
   */
  readonly default: string;

  /**
   * Note
   */
  readonly note: string;

  /**
   * All
   */
  readonly all: string[];

  /**
   * Image
   */
  readonly image: string;

  /**
   * Descid
   */
  readonly descid: string;
}
declare class Element extends MafiaClass {
  /**
   * Image
   */
  readonly image: string;
}

declare class Familiar extends MafiaClass {}

declare class Item extends MafiaClass {
  /**
   * Item
   */
  readonly item: string;

  /**
   * Plural
   */
  readonly plural: string;

  /**
   * Descid
   */
  readonly descid: string;

  /**
   * Image
   */
  readonly image: string;

  /**
   * Smallimage
   */
  readonly smallimage: string;

  /**
   * Levelreq
   */
  readonly levelreq: number;

  /**
   * Quality
   */
  readonly quality: string;

  /**
   * Adventures
   */
  readonly adventures: string;

  /**
   * Muscle
   */
  readonly muscle: string;

  /**
   * Mysticality
   */
  readonly mysticality: string;

  /**
   * Moxie
   */
  readonly moxie: string;

  /**
   * Fullness
   */
  readonly fullness: number;

  /**
   * Inebriety
   */
  readonly inebriety: number;

  /**
   * Spleen
   */
  readonly spleen: number;

  /**
   * Min HP
   */
  readonly minhp: number;

  /**
   * Max HP
   */
  readonly maxhp: number;

  /**
   * Min MP
   */
  readonly minmp: number;

  /**
   * Max MP
   */
  readonly maxmp: number;

  /**
   * Daily uses left
   */
  readonly dailyusesleft: number;

  /**
   * Notes
   */
  readonly notes: string;

  /**
   * Quest
   */
  readonly quest: boolean;

  /**
   * Gift
   */
  readonly gift: boolean;

  /**
   * Tradeable
   */
  readonly tradeable: boolean;

  /**
   * Discardable
   */
  readonly discardable: boolean;

  /**
   * Combat
   */
  readonly combat: boolean;

  /**
   * Combat Reusable
   */
  readonly combat_reusable: boolean;

  /**
   * Usable
   */
  readonly usable: boolean;

  /**
   * Reusable
   */
  readonly reusable: boolean;

  /**
   * Multi
   */
  readonly multi: boolean;

  /**
   * Fancy
   */
  readonly fancy: boolean;

  /**
   * Candy
   */
  readonly candy: boolean;

  /**
   * Seller
   */
  readonly seller: Coinmaster;

  /**
   * Buyer
   */
  readonly buyer: Coinmaster;

  /**
   * Name length
   */
  readonly name_length: number;
}
declare class Location extends MafiaClass {
  /**
   * Nocombats
   */
  readonly nocombats: boolean;

  /**
   * Zone
   */
  readonly zone: string;

  /**
   * Parent
   */
  readonly parent: string;

  /**
   * Parentdesc
   */
  readonly parentdesc: string;

  /**
   * Environment
   */
  readonly environment: string;

  /**
   * Bounty
   */
  readonly bounty: Bounty;

  /**
   * Combat queue
   */
  readonly combat_queue: string;
  /**
   * Noncombat queue
   */
  readonly noncombat_queue: string;
  /**
   * Turns spent
   */
  readonly turns_spent: number;

  /**
   * Kisses
   */
  readonly kisses: number;

  /**
   * Recommended stat
   */
  readonly recommended_stat: number;

  /**
   * Water level
   */
  readonly water_level: number;
}

declare class Monster extends MafiaClass {
  readonly id: number;

  /**
   * Base HP
   * Includes modifiers
   * @see monster_hp()
   */
  readonly base_hp: number;

  /**
   * Base attack
   * Includes modifiers
   * @see monster_attack()
   */
  readonly base_attack: number;

  /**
   * Base defence
   * Includes modifiers
   * @see monster_defense()
   */
  readonly base_defense: number;

  /**
   * Raw HP
   * Excludes modifiers
   */
  readonly raw_hp: number;

  /**
   * Raw attack
   * Excludes modifiers
   */
  readonly raw_attack: number;

  /**
   * Raw defence
   * Excludes modifiers
   */
  readonly raw_defense: number;

  /**
   * Base initiative
   * Includes modifiers
   * @see monster_initiative()
   */
  readonly base_initiative: number;

  /**
   * Raw initiative
   * Excludes modifiers
   */
  readonly raw_initiative: number;

  /**
   * Attack element
   */
  readonly attack_element: Element;

  /**
   * Defence element
   * @see monster_element()
   */
  readonly defense_element: Element;

  /**
   * Physical resistance
   */
  readonly physical_resistance: number;

  /**
   * Min meat
   * (excludes modifiers)
   */
  readonly min_meat: number;

  /**
   * Max meat
   * (excludes modifiers)
   */
  readonly max_meat: number;

  /**
   * Base mainstat exp
   * Includes bonus stats from +ML but not from +stat effects
   */
  readonly base_mainstat_exp: number;

  /**
   * Phylum
   * @see monster_phylum()
   */
  readonly phylum: Phylum;

  /**
   * Poison
   */
  readonly poison: Effect;

  /**
   * Boss
   */
  readonly boss: boolean;

  /**
   * Dummy
   * @default false
   */
  readonly dummy: boolean;

  /**
   * Image
   */
  readonly image: string;

  /**
   * Images
   */
  readonly images: string[];

  /**
   * Attributes
   * A compilation of attack, defense, initiative, element, meat drop, and phylum
   */
  readonly attributes: string;

  /**
   * Random modifiers
   * The monster's random modifiers - like those generated in the One Crazy Random Summer path
   */
  readonly random_modifiers: string[];

  /**
   * Manuel name
   */
  readonly manuel_name: string;
}

declare class Phylum extends MafiaClass {
  /**
   * Image
   */
  readonly image: string;
}

declare class Servant extends MafiaClass {}

declare class Skill extends MafiaClass {}

declare class Slot extends MafiaClass {}

declare class Stat extends MafiaClass {}

declare class Thrall extends MafiaClass {}
