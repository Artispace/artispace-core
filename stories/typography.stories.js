import React from "react";
import { storiesOf } from "@storybook/react";

import Typography from "../src/Typography";

import Theme from "../src/Theme";
import Button from "../src/Button";
import ListSubheader from "@material-ui/core/ListSubheader";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typographycomponent from "@material-ui/core/Typography";

import CenteredCard from "../src/Centeredcard";

import LinkButton from "../src/Button";

const background =
  "https://images.pexels.com/photos/1393996/pexels-photo-1393996.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

const props = {
  fontfamily: "Pacifico",
  customtheme: {
    type: "dark"
  }
};

storiesOf("Typography", module)
  .add("Default Typography", () => <Typography />)
  .add("Typography with Theme", () => (
    <Theme {...props}>
      <Typography />
      <Button />
      <ListSubheader>Hello</ListSubheader>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typographycomponent variant="h6" color="inherit">
            Photos
          </Typographycomponent>
        </Toolbar>
      </AppBar>
      <CenteredCard
        avatar={{
          src: background
        }}
        background={background}
        title="Title"
        content="Content is here"
        link={{
          href: "/goodintent",
          content: "Link"
        }}
        LinkButton={LinkButton}
      />
    </Theme>
  ));
