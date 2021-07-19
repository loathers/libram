import { visitUrl } from "kolmafia";
import { have as haveItem } from "../../lib";
import { get, set } from "../../property";
import { $item } from "../../template-string";

const briefcase = $item`Kremlin's Greatest Briefcase`;

export function have(): boolean {
  return haveItem(briefcase);
}

type Dials = [number, number, number, number, number, number]

function parse(page: string): void {
  parseDials(page);
}

function parseDials(page: string): Dials {
  const dials = [...page.matchAll(/action=kgb_dial(\d)>.*?char(\d|a).gif/g)]
    .map(([, dialNumber, value]) => [Number(dialNumber) - 1, value === "a" ? 10 : Number(value)] as const)
    .sort(([a,], [b,]) => a - b)
    .map(([, value]) => value) as Dials;

  set("_kgb_dails", dials.join(","));
  return dials;
}

function getPage(): string {
  return visitUrl("place.php?whichplace=kgb");
}

export function update(): void {
  parse(getPage());
}

export function getDials(): Dials {
  const dials = get<string>("_kgb_dials");
  return (dials === "") ? parseDials(getPage()) : dials.split(",").map(Number) as Dials;
}

export function setDials(...dials: Dials): void {
  let state = getDials();
  dials.forEach((value, index) => {
    while (state[index] !== value) {
      const result = visitUrl(`place.php?whichplace=kgb&action=kgb_dial${index + 1}`);
      state = parseDials(result);
    }
  });
}