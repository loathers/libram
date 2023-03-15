# libram

`libram` is a Typescript library that intends to provide comprehensive support for automating KoLmafia. It is installable via e.g. `yarn add libram` or `npm install libram`.

## In-mafia support

`libram` can also be used directly from the KoLmafia graphical command line. Start by installing with `git checkout https://github.com/loathers/libram release`. Then set up an alias of `jsl`: `alias jsl => js { Object.assign(globalThis, require("libram")); }`. You can then run e.g. `jsl AsdonMartin.fillTo(100)` to fill your Asdon Martin, or use any other libram component.
