//@flow
import React from "react";

import Typography from "@material-ui/core/Typography";
import {
  MuiThemeProvider,
  createMuiTheme,
  withStyles
} from "@material-ui/core/styles";
import classNames from "classnames";

// recompose

import compose from "recompose/compose";
import shouldUpdate from "recompose/shouldUpdate";

import {
  getStringC,
  getNonEmptyStringC
} from "@artispace/utils/lib/ADTS/state";

import type { HOC } from "recompose";

import { paletteFn } from "../Theme/Theme";

type Props = {
  align?: string,
  color?: string,
  content?: string,
  variant?: string,
  fontfamily?: string
};

const Typographycomponent = (props: Props) => {
  const { classes } = props;
  const safeTypography: string = getStringC("content", "Typography")(props);
  const safeVariant: string = getNonEmptyStringC("variant", "subtitle1")(props);
  const safeColor: string = getNonEmptyStringC("color", "inherit")(props);
  const safeAlign: string = getStringC("align", "center")(props);
  const safeFontFamily: string = getStringC("fontfamily", "Roboto")(props);
  const safeComponent: string = getStringC("component", "p")(props);

  const palette = paletteFn(props).palette;
  const theme = createMuiTheme({
    palette,
    typography: {
      fontFamily: safeFontFamily.split(":")[0]
    }
  });

  // This will make sure WebFont.load is only used in the browser.
  if (typeof window !== "undefined") {
    var WebFont = require("webfontloader");

    WebFont.load({
      google: {
        families: [safeFontFamily]
      }
    });
  }

  return (
    <div
      className={classNames({
        [classes.background]: !props.nobackground
      })}
    >
      <MuiThemeProvider theme={theme}>
        <Typography
          variant={safeVariant}
          color={safeColor}
          gutterBottom
          align={safeAlign}
          component={safeComponent}
        >
          {safeTypography}
        </Typography>
      </MuiThemeProvider>
    </div>
  );
};

const styles = theme => ({
  background: {
    background: theme.palette.background.paper
  }
});

const TypographywithStyles = withStyles(styles)(Typographycomponent);

const optimize: HOC<*, boolean> = compose(
  shouldUpdate(
    (prev, next) =>
      prev.content !== next.content ||
      prev.color !== next.color ||
      prev.variant !== next.variant ||
      prev.fontfamily !== next.fontfamily ||
      prev.customtheme !== next.customtheme ||
      prev.align !== next.align ||
      prev.edit !== next.edit
  )
);

export default optimize((props: Props) => <TypographywithStyles {...props} />);
