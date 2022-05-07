import { toInt, visitUrl } from "kolmafia";
import { have as have_ } from "../../lib";
import { get } from "../../property";
import { $familiar, $item } from "../../template-string";

export function have(): boolean {
  return have_($familiar`Crimbo Shrub`);
}

type Topper = "Muscle" | "Mysticality" | "Moxie";
type Lights = "Prismatic" | "Hot" | "Cold" | "Stench" | "Spooky" | "Sleaze";
type Garland = "HP Regen" | "PvP" | "Blocking";
type Gifts = "Yellow Ray" | "Red Ray" | "Gifts";

function topperChoice(topper: Topper) {
  switch (topper) {
    case "Muscle":
      return 1;
    case "Mysticality":
      return 2;
    case "Moxie":
      return 3;
  }
}

function lightsChoice(lights: Lights) {
  switch (lights) {
    case "Prismatic":
      return 1;
    case "Hot":
      return 2;
    case "Cold":
      return 3;
    case "Stench":
      return 4;
    case "Spooky":
      return 5;
    case "Sleaze":
      return 6;
  }
}

function garlandChoice(garland: Garland) {
  switch (garland) {
    case "HP Regen":
      return 1;
    case "PvP":
      return 2;
    case "Blocking":
      return 3;
  }
}

function giftsChoice(gifts: Gifts) {
  switch (gifts) {
    case "Yellow Ray":
      return 1;
    case "Red Ray":
      return 2;
    case "Gifts":
      return 3;
  }
}

export function decorate(
  topper: Topper,
  lights: Lights,
  garland: Garland,
  gifts: Gifts
): boolean {
  if (!have() || get("_shrubDecorated")) return false;
  visitUrl(
    `inv_use.php?pwd=&which=99&whichitem=${toInt(
      $item`box of old Crimbo decorations`
    )}`
  );
  visitUrl(
    `choice.php?whichchoice=999&pwd=&option=1&topper=${topperChoice(
      topper
    )}&lights=${lightsChoice(lights)}&garland=${garlandChoice(
      garland
    )}&gift=${giftsChoice(gifts)}`
  );
  return true;
}
