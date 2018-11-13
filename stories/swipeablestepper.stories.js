import React from "react";
import { storiesOf } from "@storybook/react";

import Swipeablestepper from "../src/Swipeablestepper";

const src =
  "https://images.pexels.com/photos/1393996/pexels-photo-1393996.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

const images = [
  {
    src,
    label: "One Image"
  },
  {
    src,
    label: "Second Image"
  }
];

storiesOf("Swipeablestepper", module)
  .add("Default Swipeablestepper", () => <Swipeablestepper />)
  .add("Swipeablestepper with 2 images", () => (
    <Swipeablestepper steps={images} />
  ))
  .add("Swipeablestepper with 2 images and custom height", () => (
    <Swipeablestepper
      steps={images}
      height={{
        sm: 300,
        md: 300,
        lg: 300
      }}
    />
  ));
