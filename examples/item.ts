import { console, $items } from "../src";

console.log(
  $items`lemon, lime`.map((i) => `${i.name} is ${i.quality}`).join(", "),
);

console.log(
  $items`hilarious comedy prop, Victor\, the Insult Comic Hellhound Puppet, observational glasses`
    .map((i) => i.name)
    .join(", "),
);
