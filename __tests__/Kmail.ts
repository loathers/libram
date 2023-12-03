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
