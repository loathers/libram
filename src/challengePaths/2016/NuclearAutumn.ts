import { visitUrl } from "kolmafia";

export function coolingTank(): void {
  visitUrl("place.php?whichplace=falloutshelter&action=vault8");
}

export function spa(): void {
  visitUrl("place.php?whichplace=falloutshelter&action=vault3");
}

export function chronoLab(): void {
  visitUrl("place.php?whichplace=falloutshelter&action=vault5");
}
