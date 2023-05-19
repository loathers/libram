import { print } from "kolmafia";

const logColor =
  (color?: string) =>
  (...args: { toString(): string }[]) => {
    const output = args.map((x) => x.toString()).join(" ");
    if (color) {
      print(output, color);
    } else {
      print(output);
    }
  };

export const log = logColor();
export const info = logColor("blue");
export const warn = logColor("red");
export const error = logColor("red");
