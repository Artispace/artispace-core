import React from "react";

import { storiesOf } from "@storybook/react";

import Buttonbase from "../src/Buttonbase";

storiesOf("Buttonbase", module)
  .add("Default ButtonBase", () => <Buttonbase />)
  .add("ButtonBase with custom image", () => (
    <Buttonbase image="https://images.pexels.com/photos/1393996/pexels-photo-1393996.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
  ))
  .add("ButtonBase with title", () => <Buttonbase title="Different Title" />)
  .add("ButtonBase with custom image and custom height", () => (
    <Buttonbase
      height={{
        sm: 300,
        md: 300,
        lg: 300
      }}
      image="https://images.pexels.com/photos/1393996/pexels-photo-1393996.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    />
  ));
