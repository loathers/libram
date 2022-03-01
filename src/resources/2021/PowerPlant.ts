import { cliExecute, inHardcore } from "kolmafia";
import { have as haveItem } from "../../lib";
import { withProperties } from "../../property";
import { $item } from "../../template-string";

export const plant = $item`potted power plant`;
export function have(): boolean {
  return haveItem(plant);
}

export function harvest(): void {
  const breakfastProperty = inHardcore()
    ? "breakfastHardcore"
    : "breakfastSoftcore";
  const tomesProperty = inHardcore()
    ? "tomeSkillsHardcore"
    : "tomeSkillsSoftcore";
  const batteriesProperty = inHardcore()
    ? "harvestBatteriesHardcore"
    : "harvestBatteriesSoftcore";
  withProperties(
    {
      [tomesProperty]: "",
      [breakfastProperty]: "",
      [batteriesProperty]: true,
      breakfastCompleted: false,
    },
    () => cliExecute("breakfast")
  );
}
