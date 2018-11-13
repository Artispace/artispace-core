import React from "react";
import { storiesOf } from "@storybook/react";

//carousel
import Carousel from "../src/Carousel";

const images = [
  {
    src:
      "https://images.pexels.com/photos/1393996/pexels-photo-1393996.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    title: "Hey there"
  },
  {
    src:
      "https://images.pexels.com/photos/1393996/pexels-photo-1393996.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    title: "Hello there"
  }
];

storiesOf("Carousel", module)
  .add("Default Carousel", () => <Carousel />)
  .add("Carousel with caption", () => <Carousel caption="Custom caption" />)
  .add("Carousel with caption and images", () => (
    <Carousel caption="Custom caption" images={images} />
  ));
