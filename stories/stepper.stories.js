import React from "react";
import { storiesOf } from "@storybook/react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import Stepper from "../src/Stepper";

const theme = createMuiTheme({
  palette: {
    type: "dark"
  },
  status: {
    danger: "orange"
  }
});

const steps = [
  {
    label: "One",
    content: "One's content"
  },
  {
    label: "Two",
    content: "Two's content"
  }
];

storiesOf("Stepper", module)
  .add("Default Stepper", () => <Stepper />)
  .add("Stepper with 2 steps", () => <Stepper steps={steps} />)
  .add("Stepper with 2 steps and onfinish", () => (
    <Stepper
      steps={steps}
      onfinish="Now that you have seen my info, check out my other things"
    />
  ))
  .add(
    "Stepper with 2 steps and different orientation based on screen width",
    () => (
      <Stepper
        steps={steps}
        orientation={{
          sm: "horizontal",
          md: "vertical",
          lg: "horizontal"
        }}
        onfinish="Now that you have seen my info, check out my other things"
      />
    )
  )
  .add("Dark stepper", () => (
    <MuiThemeProvider theme={theme}>
      <Stepper
        steps={steps}
        orientation={{
          sm: "horizontal",
          md: "vertical",
          lg: "horizontal"
        }}
        onfinish="Now that you have seen my info, check out my other things"
      />
    </MuiThemeProvider>
  ));
