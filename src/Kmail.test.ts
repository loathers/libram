import { describe, expect, it } from "vitest";
import Kmail from "./Kmail.js";
import { Item } from "kolmafia";

describe("Kmail parsing", () => {
  it("skips a Valentine", () => {
    const kmail = Kmail.parse({
      id: "1",
      azunixtime: "1744557183000",
      localtime: "1744557183000",
      type: "normal",
      fromid: "1829137",
      fromname: "Seraphiii",
      message:
        "<center><table><tr><td><img src=\"https://d2uyhvukfffg5a.cloudfront.net/adventureimages/smiley.gif\" width=100 height=100></td><td valign=center>You zerg rush'd my heart<br>Your love gets me high<br>Come give me a kiss<br>You're oh em gee KAWAIIIIIIII!!11!!11!!!?!!?!</td></tr></table></center>",
    });

    expect(kmail.message).toBe("");
  });

  it("parses a kmail with items and a message", () => {
    const kmail = Kmail.parse({
      id: "182501176",
      azunixtime: "1744557183000",
      localtime: "1744557183000",
      type: "normal",
      fromid: "1829137",
      fromname: "Seraphiii",
      message:
        'Enjoy!<center><table class="item" style="float: none" rel="id=641&s=14&q=0&d=1&g=0&t=1&n=1&m=0&p=0&u=e"><tr><td><img src="https://d2uyhvukfffg5a.cloudfront.net/itemimages/toast.gif" alt="toast" title="toast" class=hand onClick=\'descitem(931984879)\' ></td><td valign=center class=effect>You acquire an item: <b>toast</b></td></tr></table></center>',
    });

    expect(kmail.message).toBe("Enjoy!");

    const items = kmail.items();
    expect(items.size).toBe(1);
    expect(items.has(Item.get("toast"))).toBe(true);
    expect(items.get(Item.get("toast"))).toBe(1);
  });

  it("parses a kmail with items but no message", () => {
    const kmail = Kmail.parse({
      id: "182501176",
      azunixtime: "1744557183000",
      localtime: "1744557183000",
      type: "normal",
      fromid: "1829137",
      fromname: "Seraphiii",
      message:
        '<center><table class="item" style="float: none" rel="id=6863&s=1&q=0&d=1&g=0&t=1&n=2&m=0&p=0&u=e"><tr><td><img src="https://d2uyhvukfffg5a.cloudfront.net/itemimages/butterpat.gif" alt="pat of butter" title="pat of butter" class=hand onClick=\'descitem(310457727)\' ></td><td valign=center class=effect>You acquire <b>2 pats of butter</b></td></tr></table></center>',
    });

    expect(kmail.message).toBe("");

    const items = kmail.items();
    expect(items.size).toBe(1);
    expect(items.has(Item.get("pats of butter"))).toBe(true);
    expect(items.get(Item.get("pats of butter"))).toBe(2);
  });
});
