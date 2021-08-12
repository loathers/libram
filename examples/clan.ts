import { getClanName, itemAmount, printHtml } from "kolmafia";
import { $item, Clan, console } from "../src/index";

const piglets = Clan.join("The Piglets of Fate");

Clan.with("The Hogs of Exploitery", () => {
  try {
    console.log(piglets.getMeatInCoffer());
  } catch (e) {
    console.log(e.message);
  }
});

printHtml(
  `<b>1. In ${getClanName()} with my ${itemAmount($item`toast`)} toast</b>`
);

Clan.withStash("The Hogs of Exploitery", [$item`toast`], () => {
  printHtml(
    `<b>2. In ${getClanName()} with my ${itemAmount($item`toast`)} toast</b>`
  );
});

printHtml(
  `<b>3. In ${getClanName()} with my ${itemAmount($item`toast`)} toast</b>`
);
