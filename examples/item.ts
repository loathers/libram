import { $item, $items } from "../src";

console.log($items`lemon, lime`.map(i => `${i.name} is ${i.quality}`).join(", "));