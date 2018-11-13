import React, { Component } from "react";
import { render } from "react-dom";

import Button from "../../src/Button";
import Avatar from "../../src/Avatar";

import Carousel from "../../src/Carousel";

const images = [
  {
    src:
      "https://images.pexels.com/photos/1393996/pexels-photo-1393996.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    title: "Hey there"
  },
  {
    src:
      "https://images.pexels.com/photos/1393996/pexels-photo-1393996.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    title: "Hello"
  }
];

class Demo extends Component {
  render() {
    return (
      <div>
        <Button />
        <Carousel images={images} caption="A simple caption" />
      </div>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
