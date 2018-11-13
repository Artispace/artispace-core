import React from "react";
import { storiesOf } from "@storybook/react";
// mui
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import orange from "@material-ui/core/colors/orange";
import green from "@material-ui/core/colors/green";
import pink from "@material-ui/core/colors/pink";

import Tabs from "../src/Tabs";

const tabs = [
  {
    label: "Art"
  },
  {
    label: "Design"
  }
];

const theme = createMuiTheme({
  palette: {
    primary: orange, // Purple and green play nicely together.
    secondary: pink // This is just green.A700 as hex.
  }
});

storiesOf("Tabs", module)
  .add("Default Tabs", () => <Tabs />)
  .add("Tabs with two tabs", () => <Tabs tabs={tabs} />)
  .add("Tabs with two tabs and pill design", () => (
    <MuiThemeProvider theme={theme}>
      <Tabs tabs={tabs} design="pill" />
    </MuiThemeProvider>
  ))
  .add("Tabs with 2 tabs,  pill design and secondary color", () => (
    <MuiThemeProvider theme={theme}>
      <Tabs tabs={tabs} design="pill" secondary={true} />
    </MuiThemeProvider>
  ));
