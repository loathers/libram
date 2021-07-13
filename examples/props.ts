import { get, set } from "../src";
import { withProperty } from "../src/property";

const raindoh = get("_raindohCopiesMade");
const putty = get("spookyPuttyCopiesMade");

console.log(raindoh + putty);

console.log(`before: ${get("libram_test_prop", 0)}`)
set("libram_test_prop", 30000);
console.log(`after: ${get<number>("libram_test_prop") + 5}`)

withProperty("guzzlrBronzeDeliveries", 69, () => {
  console.log("nice");
});