import { isGiftable, Item, visitUrl } from "kolmafia";
import { $item, Kmail } from "../src";
import mocked = jest.mocked;

jest.mock("kolmafia");

const USER = 11;

const mockItem1 = $item`Jumbo Dr. Lucifer`;
const mockItem2 = $item`worthless trinket`;

beforeEach(() => {
  jest.clearAllMocks();
});

describe(Kmail.send, () => {
  beforeEach(() => {
    mocked(visitUrl).mockReturnValue(`<div>Message sent.</div>`);
    mocked(isGiftable).mockReturnValue(true);
  });

  it("should send a kmail with a message", () => {
    Kmail.send(USER, "Hello, world!");

    expect(visitUrl).toHaveBeenCalledWith(
      "sendmessage.php?action=send&pwd&towho=11&message=Hello%2C%20world!&sendmeat=0",
      true,
      true
    );
  });

  it("should send a kmail with a message and meat", () => {
    Kmail.send(USER, "Hello, world!", [], 100);

    expect(visitUrl).toHaveBeenCalledWith(
      "sendmessage.php?action=send&pwd&towho=11&message=Hello%2C%20world!&sendmeat=100",
      true,
      true
    );
  });

  it("should send a kmail with a message and items", () => {
    Kmail.send(USER, "Hello, world!", [mockItem1]);

    expect(visitUrl).toHaveBeenCalledWith(
      `sendmessage.php?action=send&pwd&towho=11&message=Hello%2C%20world!&sendmeat=0&whichitem1=${mockItem1.id}&howmany1=1`,
      true,
      true
    );
  });

  it("should send a kmail with a message, items, and meat", () => {
    Kmail.send(
      USER,
      "Hello, world!",
      new Map([
        [mockItem1, 11],
        [mockItem2, 42],
      ]),
      100
    );

    expect(visitUrl).toHaveBeenCalledWith(
      `sendmessage.php?action=send&pwd&towho=11&message=Hello%2C%20world!&sendmeat=100&whichitem1=${mockItem1.id}&howmany1=11&whichitem2=${mockItem2.id}&howmany2=42`,
      true,
      true
    );
  });

  it("should send at most 11 items per chunk", () => {
    const mockItems = Array(15)
      .fill(undefined)
      .map((_, i) => Item.get(`mock item ${i}`));

    Kmail.send(USER, "Hello, world!", mockItems, 100);

    expect(visitUrl).toHaveBeenCalledTimes(2);
    expect(visitUrl).toHaveBeenNthCalledWith(
      1,
      `sendmessage.php?action=send&pwd&towho=11&message=Hello%2C%20world!&sendmeat=100&whichitem1=${mockItems[0].id}&howmany1=1&whichitem2=${mockItems[1].id}&howmany2=1&whichitem3=${mockItems[2].id}&howmany3=1&whichitem4=${mockItems[3].id}&howmany4=1&whichitem5=${mockItems[4].id}&howmany5=1&whichitem6=${mockItems[5].id}&howmany6=1&whichitem7=${mockItems[6].id}&howmany7=1&whichitem8=${mockItems[7].id}&howmany8=1&whichitem9=${mockItems[8].id}&howmany9=1&whichitem10=${mockItems[9].id}&howmany10=1&whichitem11=${mockItems[10].id}&howmany11=1`,
      true,
      true
    );
    expect(visitUrl).toHaveBeenNthCalledWith(
      2,
      `sendmessage.php?action=send&pwd&towho=11&message=Hello%2C%20world!&sendmeat=0&whichitem1=${mockItems[11].id}&howmany1=1&whichitem2=${mockItems[12].id}&howmany2=1&whichitem3=${mockItems[13].id}&howmany3=1&whichitem4=${mockItems[14].id}&howmany4=1`,
      true,
      true
    );
  });

  it.todo(
    "should send a kmail with a message, items, and meat, and skip ungiftable items"
  );

  it.todo(
    "should fallback to sending a gift if the user cannot receive meat or items"
  );

  it("should properly encode ampersand characters", () => {
    Kmail.send(USER, "Hi there, give me all your money!&sendmeat=10000000000");

    expect(visitUrl).toHaveBeenCalledWith(
      "sendmessage.php?action=send&pwd&towho=11&message=Hi%20there%2C%20give%20me%20all%20your%20money!%26sendmeat%3D10000000000&sendmeat=0",
      true,
      true
    );
  });
});

describe(Kmail.gift, () => {
  it("should send a gift with a message", () => {
    Kmail.gift(USER, "Hello, world!");

    expect(visitUrl).toHaveBeenCalledWith(
      "town_sendgift.php?action=Yep.&pwd&fromwhere=0&note=Hello%2C%20world!&insidenote=&towho=11&whichpackage=0&sendmeat=0",
      true,
      true
    );
  });

  it("should send a gift with a message and an inside note", () => {
    Kmail.gift(
      USER,
      "Hello, world!",
      undefined,
      undefined,
      "This is not even funny."
    );

    expect(visitUrl).toHaveBeenCalledWith(
      "town_sendgift.php?action=Yep.&pwd&fromwhere=0&note=Hello%2C%20world!&insidenote=This%20is%20not%20even%20funny.&towho=11&whichpackage=0&sendmeat=0",
      true,
      true
    );
  });

  it("should send a gift with a message and meat", () => {
    Kmail.gift(USER, "Hello, world!", [], 100);

    expect(visitUrl).toHaveBeenCalledWith(
      "town_sendgift.php?action=Yep.&pwd&fromwhere=0&note=Hello%2C%20world!&insidenote=&towho=11&whichpackage=0&sendmeat=100",
      true,
      true
    );
  });

  it("should send a gift with a message and one item", () => {
    Kmail.gift(USER, "Hello, world!", [mockItem1]);

    expect(visitUrl).toHaveBeenCalledWith(
      `town_sendgift.php?action=Yep.&pwd&fromwhere=0&note=Hello%2C%20world!&insidenote=&towho=11&whichpackage=1&sendmeat=0&whichitem1=${mockItem1.id}&howmany1=1`,
      true,
      true
    );
  });

  it("should send a gift with a message and multiple items", () => {
    Kmail.gift(
      USER,
      "Hello, world!",
      new Map([
        [mockItem1, 11],
        [mockItem2, 42],
      ]),
      100
    );

    expect(visitUrl).toHaveBeenCalledWith(
      `town_sendgift.php?action=Yep.&pwd&fromwhere=0&note=Hello%2C%20world!&insidenote=&towho=11&whichpackage=2&sendmeat=100&whichitem1=${mockItem1.id}&howmany1=11&whichitem2=${mockItem2.id}&howmany2=42`,
      true,
      true
    );
  });

  it("should send at most 3 items per chunk", () => {
    const mockItems = Array(5)
      .fill(undefined)
      .map((_, i) => Item.get(`mock item ${i}`));

    Kmail.gift(USER, "Hello, world!", mockItems, 100);

    expect(visitUrl).toHaveBeenCalledTimes(2);
    expect(visitUrl).toHaveBeenNthCalledWith(
      1,
      `town_sendgift.php?action=Yep.&pwd&fromwhere=0&note=Hello%2C%20world!&insidenote=&towho=11&whichpackage=3&sendmeat=100&whichitem1=${mockItems[0].id}&howmany1=1&whichitem2=${mockItems[1].id}&howmany2=1&whichitem3=${mockItems[2].id}&howmany3=1`,
      true,
      true
    );
    expect(visitUrl).toHaveBeenNthCalledWith(
      2,
      `town_sendgift.php?action=Yep.&pwd&fromwhere=0&note=Hello%2C%20world!&insidenote=&towho=11&whichpackage=2&sendmeat=0&whichitem1=${mockItems[3].id}&howmany1=1&whichitem2=${mockItems[4].id}&howmany2=1`,
      true,
      true
    );
  });
});

describe("message parsing", () => {
  // we need the correct plural for the extractItems mock to work
  ($item`"DRINK ME" potion` as any).plural = `bottles of "DRINK ME" potion`;

  const baseMessage = {
    id: "11",
    fromid: "1852283",
    fromname: "StuBorn",
    azunixtime: "1714072304",
    localtime: "04/25/24 09:11:44 PM",
  };

  it.each([
    {
      input: {
        // fake meat gain in message
        ...baseMessage,
        type: "normal",
        message: "You gain 11 Meat.",
      },
      expectedMeat: 0,
    },
    {
      input: {
        // fake meat gain in message with different suffix
        ...baseMessage,
        type: "normal",
        message: "You gain 11 Meatballs",
      },
      expectedMeat: 0,
    },
    {
      input: {
        // fake html of meat gain in message
        ...baseMessage,
        type: "normal",
        message:
          "&lt;center&gt;&lt;table&gt;&lt;tr&gt;&lt;td&gt;&lt;img src=&quot;https://d2uyhvukfffg5a.cloudfront.net/itemimages/meat.gif&quot; height=30 width=30 alt=&quot;Meat&quot;&gt;&lt;/td&gt;&lt;td valign=center&gt;You gain 11 Meat.&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;&lt;/center&gt;",
      },
      expectedMeat: 0,
    },
    {
      input: {
        // fake meat gain in message while actually sending less real meat
        ...baseMessage,
        type: "normal",
        message:
          'You gain 11 Meat.<center><table><tr><td><img src="https://d2uyhvukfffg5a.cloudfront.net/itemimages/meat.gif" height=30 width=30 alt="Meat"></td><td valign=center>You gain 1 Meat.</td></tr></table></center>',
      },
      expectedMeat: 1,
    },
    {
      input: {
        // fake meat gain in outside message of gift (unopened)
        ...baseMessage,
        type: "giftshop",
        message:
          'You gain 11 Meat.<center><table class="item" style="float: none" rel="id=1167&s=0&q=0&d=0&g=1&t=0&n=1&m=0&p=0&u=."><tr><td><img src="https://d2uyhvukfffg5a.cloudfront.net/itemimages/plainbrown.gif" alt="plain brown wrapper" title="plain brown wrapper" class=hand onClick=\'descitem(546961999)\' ></td><td valign=center class=effect>You acquire an item: <b>plain brown wrapper</b></td></tr></table></center>',
      },
      expectedMeat: 0,
    },
    {
      input: {
        // fake meat gain in outside and inside message of gift while actually sending less real meat
        ...baseMessage,
        type: "giftshop",
        message:
          'You gain 11 Meat.<center><table class="item" style="float: none" rel="id=1167&s=0&q=0&d=0&g=1&t=0&n=1&m=0&p=0&u=."><tr><td><img src="https://d2uyhvukfffg5a.cloudfront.net/itemimages/plainbrown.gif" alt="plain brown wrapper" title="plain brown wrapper" class=hand onClick=\'descitem(546961999)\' ></td><td valign=center class=effect>You acquire an item: <b>plain brown wrapper</b></td></tr></table></center><p>Inside Note:<p>You gain 11 Meat.<center><table><tr><td><img src="https://d2uyhvukfffg5a.cloudfront.net/itemimages/meat.gif" height=30 width=30 alt="Meat"></td><td valign=center>You gain 1 Meat.</td></tr></table></center>',
      },
      expectedMeat: 1,
    },
    {
      input: {
        // fake meat gain in message with valentine
        ...baseMessage,
        type: "normal",
        message:
          '<center><table><tr><td><img src="https://d2uyhvukfffg5a.cloudfront.net/adventureimages/1335.gif" width=100 height=100></td><td valign=center>r0535 R R3d<br>5ug4r i5 5w337<br>If U\'d b3 m1n3<br>I\'d f33l pr377y 1337.</td></tr></table></center>You gain 11 Meat.<center><table><tr><td><img src="https://d2uyhvukfffg5a.cloudfront.net/itemimages/meat.gif" height=30 width=30 alt="Meat"></td><td valign=center>You gain 1 Meat.</td></tr></table></center>',
      },
      expectedMeat: 1,
    },
    {
      input: {
        // fake meat gain in message with valentine while actually sending less real meat
        ...baseMessage,
        type: "normal",
        message:
          "<center><table><tr><td><img src=\"https://d2uyhvukfffg5a.cloudfront.net/adventureimages/1335.gif\" width=100 height=100></td><td valign=center>r0535 R R3d<br>5ug4r i5 5w337<br>If U'd b3 m1n3<br>I'd f33l pr377y 1337.</td></tr></table></center>You gain 11 Meat.",
      },
      expectedMeat: 0,
    },
  ] as const)(
    "should not be fooled with fake meat gains",
    ({ input, expectedMeat }) => {
      mocked(visitUrl).mockReturnValueOnce(JSON.stringify([input]));

      const kmails = Kmail.inbox();
      expect(kmails).toHaveLength(1);
      expect(kmails[0].message).toMatch("You gain 11 Meat");
      expect(kmails[0].meat()).toEqual(expectedMeat);
    }
  );

  it.each([
    {
      input: {
        ...baseMessage,
        type: "normal",
        message:
          'You acquire an item: &lt;b&gt;Mr. Accessory&lt;/b&gt;<center><table class="item" style="float: none" rel="id=4508&s=0&q=0&d=0&g=0&t=1&n=1&m=1&p=0&u=u"><tr><td><img src="https://d2uyhvukfffg5a.cloudfront.net/itemimages/drinkme.gif" alt="&quot;DRINK ME&quot; potion" title="&quot;DRINK ME&quot; potion" class=hand onClick=\'descitem(830929931)\' ></td><td valign=center class=effect>You acquire an item: <b>&quot;DRINK ME&quot; potion</b></td></tr></table></center>',
      },
      expectedItems: new Map([[$item`"DRINK ME" potion`, 1]]),
    },
    {
      input: {
        ...baseMessage,
        type: "normal",
        message:
          'You acquire an item: &lt;b&gt;Mr. Accessory&lt;/b&gt;\r\n<center><table class="item" style="float: none" rel="id=4508&s=0&q=0&d=0&g=0&t=1&n=11&m=1&p=0&u=u"><tr><td><img src="https://d2uyhvukfffg5a.cloudfront.net/itemimages/drinkme.gif" alt="&quot;DRINK ME&quot; potion" title="&quot;DRINK ME&quot; potion" class=hand onClick=\'descitem(830929931)\' ></td><td valign=center class=effect>You acquire <b>11 bottles of &quot;DRINK ME&quot; potion</b><br>(That\'s ridiculous.  It\'s not even funny.)</td></tr></table></center>',
      },
      expectedItems: new Map([[$item`"DRINK ME" potion`, 11]]),
    },
  ])(
    "should not be fooled by fake item gains in a message",
    ({ input, expectedItems }) => {
      mocked(visitUrl).mockReturnValueOnce(JSON.stringify([input]));

      const kmails = Kmail.inbox();
      expect(kmails).toHaveLength(1);
      expect(kmails[0].items()).toEqual(expectedItems);
    }
  );

  it.each([
    {
      input: {
        ...baseMessage,
        type: "normal",
        message:
          '<center><table><tr><td><img src="https://d2uyhvukfffg5a.cloudfront.net/adventureimages/smiley.gif" width=100 height=100></td><td valign=center>You zerg rush\'d my heart<br>Your love gets me high<br>Come give me a kiss<br>You\'re oh em gee KAWAIIIIIIII!!11!!11!!!?!!?!</td></tr></table></center>This is a message<center><table class="item" style="float: none" rel="id=4508&s=0&q=0&d=0&g=0&t=1&n=1&m=1&p=0&u=u"><tr><td><img src="https://d2uyhvukfffg5a.cloudfront.net/itemimages/drinkme.gif" alt="&quot;DRINK ME&quot; potion" title="&quot;DRINK ME&quot; potion" class=hand onClick=\'descitem(830929931)\' ></td><td valign=center class=effect>You acquire an item: <b>&quot;DRINK ME&quot; potion</b></td></tr></table></center><center><table><tr><td><img src="https://d2uyhvukfffg5a.cloudfront.net/itemimages/meat.gif" height=30 width=30 alt="Meat"></td><td valign=center>You gain 11 Meat.</td></tr></table></center>',
      },
      expectedMessage: "This is a message",
      expectedMeat: 11,
    },
    {
      input: {
        ...baseMessage,
        type: "normal",
        message:
          "<center><table><tr><td><img src=\"https://d2uyhvukfffg5a.cloudfront.net/adventureimages/1335.gif\" width=100 height=100></td><td valign=center>r0535 R R3d<br>5ug4r i5 5w337<br>If U'd b3 m1n3<br>I'd f33l pr377y 1337.</td></tr></table></center>This is a valentine's message with &lt;b&gt;fake html&lt;/b&gt;\r\n\r\n",
      },
      expectedMessage:
        "This is a valentine's message with &lt;b&gt;fake html&lt;/b&gt;\r\n\r\n",
      expectedMeat: 0,
    },
  ])(
    "should strip off valentine messages",
    ({ input, expectedMessage, expectedMeat }) => {
      mocked(visitUrl).mockReturnValueOnce(JSON.stringify([input]));

      const kmails = Kmail.inbox();
      expect(kmails).toHaveLength(1);
      expect(kmails[0].message).toEqual(expectedMessage);
      expect(kmails[0].meat()).toEqual(expectedMeat);
    }
  );

  it.each([
    {
      input: {
        ...baseMessage,
        type: "giftshop",
        message:
          'This is an outside note with &lt;fake&gt;&lt;/html&gt;<center><table class="item" style="float: none" rel="id=1167&s=0&q=0&d=0&g=1&t=0&n=1&m=0&p=0&u=."><tr><td><img src="https://d2uyhvukfffg5a.cloudfront.net/itemimages/plainbrown.gif" alt="plain brown wrapper" title="plain brown wrapper" class=hand onClick=\'descitem(546961999)\' ></td><td valign=center class=effect>You acquire an item: <b>plain brown wrapper</b></td></tr></table></center><p>Inside Note:<p>This is an inside note with &lt;b&gt;fake&lt;/b&gt;&lt;/html&gt;<center><table><tr><td><img src="https://d2uyhvukfffg5a.cloudfront.net/itemimages/meat.gif" height=30 width=30 alt="Meat"></td><td valign=center>You gain 11 Meat.</td></tr></table></center><center><table class="item" style="float: none" rel="id=4508&s=0&q=0&d=0&g=0&t=1&n=1&m=1&p=0&u=u"><tr><td><img src="https://d2uyhvukfffg5a.cloudfront.net/itemimages/drinkme.gif" alt="&quot;DRINK ME&quot; potion" title="&quot;DRINK ME&quot; potion" class=hand onClick=\'descitem(830929931)\' ></td><td valign=center class=effect>You acquire an item: <b>&quot;DRINK ME&quot; potion</b></td></tr></table></center>',
      },
      expectedMessage:
        "This is an outside note with &lt;fake&gt;&lt;/html&gt;\n\nInside Note:\nThis is an inside note with &lt;b&gt;fake&lt;/b&gt;&lt;/html&gt;",
      expectedOutsideNote:
        "This is an outside note with &lt;fake&gt;&lt;/html&gt;",
      expectedInsideNote:
        "This is an inside note with &lt;b&gt;fake&lt;/b&gt;&lt;/html&gt;",
      expectedItems: new Map([
        [$item`plain brown wrapper`, 1],
        [$item`"DRINK ME" potion`, 1],
      ]),
      expectedOutsideItems: new Map([[$item`plain brown wrapper`, 1]]),
      expectedInsideItems: new Map([[$item`"DRINK ME" potion`, 1]]),
      expectedMeat: 11,
    },
    {
      // unopened
      input: {
        ...baseMessage,
        type: "giftshop",
        message:
          'This is an outside note with &lt;b&gt;fake html&lt;/b&gt;.<center><table class="item" style="float: none" rel="id=1168&s=0&q=0&d=0&g=1&t=0&n=1&m=0&p=0&u=."><tr><td><img src="https://d2uyhvukfffg5a.cloudfront.net/itemimages/lessthan3.gif" alt="less-than-three-shaped box" title="less-than-three-shaped box" class=hand onClick=\'descitem(938194457)\' ></td><td valign=center class=effect>You acquire an item: <b>less-than-three-shaped box</b></td></tr></table></center>',
      },
      expectedMessage:
        "This is an outside note with &lt;b&gt;fake html&lt;/b&gt;.",
      expectedOutsideNote:
        "This is an outside note with &lt;b&gt;fake html&lt;/b&gt;.",
      expectedInsideNote: null,
      expectedItems: new Map([[$item`less-than-three-shaped box`, 1]]),
      expectedOutsideItems: new Map([[$item`less-than-three-shaped box`, 1]]),
      expectedInsideItems: new Map(),
      expectedMeat: 0,
    },
    {
      // opened
      input: {
        ...baseMessage,
        type: "giftshop",
        message:
          'This is an outside note with &lt;b&gt;fake html&lt;/b&gt;.<center><table class="item" style="float: none" rel="id=1168&s=0&q=0&d=0&g=1&t=0&n=1&m=0&p=0&u=."><tr><td><img src="https://d2uyhvukfffg5a.cloudfront.net/itemimages/lessthan3.gif" alt="less-than-three-shaped box" title="less-than-three-shaped box" class=hand onClick=\'descitem(938194457)\' ></td><td valign=center class=effect>You acquire an item: <b>less-than-three-shaped box</b></td></tr></table></center><p>Inside Note:<p>This is an inside note with &lt;b&gt;fake html&lt;/b&gt;.<center><table class="item" style="float: none" rel="id=4508&s=0&q=0&d=0&g=0&t=1&n=11&m=1&p=0&u=u"><tr><td><img src="https://d2uyhvukfffg5a.cloudfront.net/itemimages/drinkme.gif" alt="&quot;DRINK ME&quot; potion" title="&quot;DRINK ME&quot; potion" class=hand onClick=\'descitem(830929931)\' ></td><td valign=center class=effect>You acquire <b>11 bottles of &quot;DRINK ME&quot; potion</b><br>(That\'s ridiculous.  It\'s not even funny.)</td></tr></table></center><center><table class="item" style="float: none" rel="id=1907&s=65&q=0&d=1&g=0&t=1&n=1&m=0&p=0&u=u"><tr><td><img src="https://d2uyhvukfffg5a.cloudfront.net/itemimages/8ball.gif" alt="8-ball" title="8-ball" class=hand onClick=\'descitem(631597539)\' ></td><td valign=center class=effect>You acquire an item: <b>8-ball</b></td></tr></table></center>',
      },
      expectedMessage:
        "This is an outside note with &lt;b&gt;fake html&lt;/b&gt;.\n\nInside Note:\nThis is an inside note with &lt;b&gt;fake html&lt;/b&gt;.",
      expectedOutsideNote:
        "This is an outside note with &lt;b&gt;fake html&lt;/b&gt;.",
      expectedInsideNote:
        "This is an inside note with &lt;b&gt;fake html&lt;/b&gt;.",
      expectedItems: new Map([
        [$item`less-than-three-shaped box`, 1],
        [$item`"DRINK ME" potion`, 11],
        [$item`8-ball`, 1],
      ]),
      expectedOutsideItems: new Map([[$item`less-than-three-shaped box`, 1]]),
      expectedInsideItems: new Map([
        [$item`"DRINK ME" potion`, 11],
        [$item`8-ball`, 1],
      ]),
      expectedMeat: 0,
    },
    {
      input: {
        ...baseMessage,
        type: "giftshop",
        message:
          'This is a gift with an empty inside note<center><table class="item" style="float: none" rel="id=1167&s=0&q=0&d=0&g=1&t=0&n=1&m=0&p=0&u=."><tr><td><img src="https://d2uyhvukfffg5a.cloudfront.net/itemimages/plainbrown.gif" alt="plain brown wrapper" title="plain brown wrapper" class=hand onClick=\'descitem(546961999)\' ></td><td valign=center class=effect>You acquire an item: <b>plain brown wrapper</b></td></tr></table></center><p>Inside Note:<p><center><table><tr><td><img src="https://d2uyhvukfffg5a.cloudfront.net/itemimages/meat.gif" height=30 width=30 alt="Meat"></td><td valign=center>You gain 1 Meat.</td></tr></table></center>',
      },
      expectedMessage:
        "This is a gift with an empty inside note\n\nInside Note:\n",
      expectedOutsideNote: "This is a gift with an empty inside note",
      expectedInsideNote: "",
      expectedItems: new Map([[$item`plain brown wrapper`, 1]]),
      expectedOutsideItems: new Map([[$item`plain brown wrapper`, 1]]),
      expectedInsideItems: new Map(),
      expectedMeat: 1,
    },
  ] as const)(
    "should correctly parse outside and inside of gift message",
    ({
      input,
      expectedMessage,
      expectedOutsideNote,
      expectedInsideNote,
      expectedItems,
      expectedOutsideItems,
      expectedInsideItems,
      expectedMeat,
    }) => {
      mocked(visitUrl).mockReturnValueOnce(JSON.stringify([input]));

      const kmails = Kmail.inbox();
      expect(kmails).toHaveLength(1);
      expect(kmails[0].message).toEqual(expectedMessage);
      expect(kmails[0].outsideNote).toEqual(expectedOutsideNote);
      expect(kmails[0].insideNote).toEqual(expectedInsideNote);
      expect(kmails[0].items()).toEqual(expectedItems);
      expect(kmails[0].outsideItems()).toEqual(expectedOutsideItems);
      expect(kmails[0].insideItems()).toEqual(expectedInsideItems);
      expect(kmails[0].meat()).toEqual(expectedMeat);
    }
  );
});
