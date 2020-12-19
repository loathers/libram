import { console, Clan } from "../src/index";

const piglets = Clan.join("The Piglets of Fate");
Clan.join("The Hogs of Exploitery");

try {
  console.log(piglets.getMeatInCoffer());
} catch (e) {
  console.log(e.message);
}

Clan.join("The Piglets of Fate");
