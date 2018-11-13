import React from "react";
import { storiesOf } from "@storybook/react";

import Blankspace from "../src/Blankspace";

storiesOf("Blankspace", module)
  .add("Default Blankspace", () => <Blankspace />)
  .add("Blankspace with h1 text", () => (
    <div>
      <h1>Hello there</h1>
      <Blankspace />
      <h1>Hello there</h1>
    </div>
  ))
  .add("Blank space with specified height", () => (
    <div>
      <h1>Hey there</h1>
      <Blankspace height={50} />
      <h1>Hey there</h1>
    </div>
  ));
