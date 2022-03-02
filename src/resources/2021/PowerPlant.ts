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
  const core = inHardcore() ? "Hardcore" : "Softcore";
  withProperties(
    {
      breakfastCompleted: false,
      ["breakfast" + core]: "",
      ["harvestBatteries" + core]: true,
      ["makePocketWishes" + core]: false,
      ["useCrimboToys" + core]: false,
      ["grabClovers" + core]: false,
      ["visitLounge" + core]: false,
      ["haveBoxingDaydream" + core]: false,
      ["checkJackass" + core]: false,
      ["autoPlant" + core]: false,
      ["readManual" + core]: false,
      ["pathedSummons" + core]: false,
      ["harvestGarden" + core]: "none",
      ["grimoireSkills" + core]: "none",
      ["libramSkills" + core]: "none",
      ["tomeSkills" + core]: "none",
    },
    () => cliExecute("breakfast")
  );
}
