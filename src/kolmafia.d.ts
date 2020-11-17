// Type definitions for the KoLmafia JavaScript standard library

declare namespace Lib {
    function print(message: string): void;
}

declare class MafiaType {
    static get<T extends typeof MafiaType>(this: T, name: string): T;
    static getty<T extends typeof MafiaType>(this: T, name: string): T;
    static get<T extends typeof MafiaType>(this: T, names: string[]): T[];
}

declare class Item extends MafiaType {
    readonly id: number;
    readonly name: string;
    readonly plural: string;
}

declare class Monster extends MafiaType {
    readonly name: string;
}
