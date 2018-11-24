import React from "react";
import { storiesOf } from "@storybook/react";

import Button from "../src/Button";

const Link = props => <a {...props} href="/hello there" />;

storiesOf("Button", module)
  .add("Default Button", () => <Button />)
  .add("Button with content", () => <Button content="Hello there tester" />)
  .add("Button with custom Link Component", () => (
    <Button content="I have a link" component={Link} />
  ));
