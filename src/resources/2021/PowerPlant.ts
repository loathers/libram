import { cliExecute, inHardcore } from "kolmafia";
import { have as haveItem } from "../../lib";
import { withProperties } from "../../property";
import { $item } from "../../template-string";

export const plant = $item`potted power plant`;
export function have(): boolean {
  return haveItem(plant);
}

export function harvest(): void {
  if (!have()) return;
  const breakfastProperty = inHardcore()
    ? "breakfastHardcore"
    : "breakfastSoftcore";
  const tomesProperty = inHardcore()
    ? "tomeSkillsHardcore"
    : "tomeSkillsSoftcore";
  const batteriesProperty = inHardcore()
    ? "harvestBatteriesHardcore"
    : "harvestBatteriesSoftcore";
  const pocketWishProperty = inHardcore()
    ? "makePocketWishesHardcore"
    : "makePocketWishesSoftcore";
  const onceADayItemsProperty = inHardcore()
    ? "useCrimboToysHardcore"
    : "useCrimboToysSoftcore";
  const cloversProperty = inHardcore()
    ? "grabCloversHardcore"
    : "grabCloversSoftcore";
  const vipProperty = inHardcore()
    ? "visitLoungeHardcore"
    : "visitLoungeSoftcore";
  const boxingProperty = inHardcore()
    ? "haveBoxingDaydreamHardcore"
    : "haveBoxingDaydreamSoftcore";
  const jackassProperty = inHardcore()
    ? "checkJackassHardcore"
    : "checkJackassSoftcore";
  const plantProperty = inHardcore()
    ? "autoPlantHardcore"
    : "autoPlantSoftcore";
  const bookProperty = inHardcore()
    ? "readManualHardcore"
    : "readManualSoftcore";
  withProperties(
    {
      [tomesProperty]: "",
      [breakfastProperty]: "",
      [batteriesProperty]: true,
      [pocketWishProperty]: false,
      [onceADayItemsProperty]: false,
      [cloversProperty]: false,
      breakfastCompleted: false,
      [vipProperty]: false,
      [boxingProperty]: false,
      [jackassProperty]: false,
      [plantProperty]: false,
      [bookProperty]: false,
    },
    () => cliExecute("breakfast")
  );
}
