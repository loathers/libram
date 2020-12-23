import { print } from "kolmafia";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const logColor = (color?: string) => (...args: any[]) => {
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
