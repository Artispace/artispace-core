import React from "react";
import { storiesOf } from "@storybook/react";

import Typography from "../src/Typography";

import Theme from "../src/Theme";

const props = {
  fontfamily: "Pacifico"
};

storiesOf("Typography", module)
  .add("Default Typography", () => <Typography />)
  .add("Typography with Theme", () => (
    <Theme {...props}>
      <Typography />
    </Theme>
  ));
