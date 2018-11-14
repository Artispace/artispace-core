import React, { Component } from "react";
import { render } from "react-dom";

import Button from "../../src/Button";
import Avatar from "../../src/Avatar";

import Carousel from "../../src/Carousel";

import Tabs from "../../src/Tabs";

import renderComponent from "./renderComponents";

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

const tabs = [
  {
    label: "Art",
    tabId: 1
  },
  {
    label: "Design",
    tabId: 2
  }
];

class Demo extends Component {
  render() {
    const A = renderComponent("Avarar");
    console.log(A);

    return (
      <div>
        <Button />
        <Carousel images={images} caption="A simple caption" />
        <Tabs
          tabs={tabs}
          design="pill"
          secondary={true}
          components={[
            {
              component: "Avatar",
              tabId: 1,
              letter: "M"
            }
          ]}
          renderComponent={renderComponent}
        />

        <A />
      </div>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
