import fetch from "node-fetch";
import * as _importForGlobals from "kolmafia";

import { isBooleanProperty, isLocationProperty, isMonsterProperty, isNumericOrStringProperty, isNumericProperty } from "../src/propertyTyping";

const PROPS_FILE = "https://sourceforge.net/p/kolmafia/code/HEAD/tree/src/data/defaults.txt?format=raw";

async function main() {
  const response = await fetch(PROPS_FILE);
  const text = await response.text()
  const props = text.split("\n");

  const propTypes: { [key: string]: string[] } = {
    BooleanProperty: [],
    NumericProperty: [],
    MonsterProperty: [],
    LocationProperty: [],
    StringProperty: [],
    NumericOrStringProperty: [],
  };

  for (const prop of props) {
    const [, property, defaultValue] = prop.split("\t");
    if (!property) continue;

    if (isMonsterProperty(property)) {
      propTypes.MonsterProperty.push(property);
    } else if (isLocationProperty(property)) {
      propTypes.LocationProperty.push(property)
    } else if (isNumericOrStringProperty(property)) {
      propTypes.NumericOrStringProperty.push(property);
    } else if (!defaultValue) {
      propTypes.StringProperty.push(property);
    } else if (isBooleanProperty(property, defaultValue)) {
      propTypes.BooleanProperty.push(property);
    } else if (isNumericProperty(property, defaultValue)) {
      propTypes.NumericProperty.push(property);
    } else {
      propTypes.StringProperty.push(property);
    }
  }

  Object.entries(propTypes).forEach(([type, values]) => {
    console.log(`export type ${type} = ${values.map(v => `"${v}"`).join(" | ")};`);
  });
}

main();