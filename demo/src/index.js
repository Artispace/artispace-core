import React, { Component } from "react";
import { render } from "react-dom";

import Button from "../../src/Button";
import Avatar from "../../src/Avatar";

class Demo extends Component {
  render() {
    return (
      <div>
        <Button />
        <Avatar />
      </div>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
