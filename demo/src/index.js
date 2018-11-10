import React, { Component } from "react";
import { render } from "react-dom";

import Button from "../../src/Button";

class Demo extends Component {
  render() {
    return (
      <div>
        <Button />
      </div>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
