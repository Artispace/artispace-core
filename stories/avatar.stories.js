import React from "react";
import { storiesOf } from "@storybook/react";

import Avatar from "../src/Avatar";

const image =
  "https://images.pexels.com/photos/160426/lead-man-sun-sunglasses-160426.jpeg?auto=compress&cs=tinysrgb&h=650&w=940";

storiesOf("Avatar", module)
  .add("Default Avatar", () => <Avatar />)
  .add("Avatar with Letter", () => <Avatar letter="T" />)
  .add("Avatar with Image", () => <Avatar src={image} />)
  .add("Avatar with Big Size", () => <Avatar src={image} size={300} />);
