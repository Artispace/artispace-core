// @flow
import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import compose from "crocks/helpers/compose";

import dissoc from "crocks/helpers/dissoc";

import classNames from "classnames";

// recompose
import shouldUpdate from "recompose/shouldUpdate";
import recomposecompose from "recompose/compose";
import type { HOC } from "recompose";

// will import from artispace
import { getStringC } from "@artispace/utils/lib/ADTS/state";
import { isObjectPropTrueC } from "@artispace/utils/lib/ADTS/pred";

type ButtonVariants =
  | "flat"
  | "outlined"
  | "contained"
  | "raised"
  | "fab"
  | "extendedFab";

type Size = "small" | "medium" | "large";

type Flex =
  | "flex-start"
  | "center"
  | "flex-end"
  | "space-between"
  | "space-around"
  | "space-evenly";

type Props = {
  edit?: boolean,
  fontfamily?: string,
  justify?: Flex,
  variant?: ButtonVariants,
  size?: Size,
  content?: string,
  fullWidth?: boolean,
  customtheme?: Object,
  classes: Object,
  nobackground: boolean
};

const Buttoncomponent = (props: Props) => {
  const { classes } = props;

  const safeFontFamily: string = getStringC("fontfamily", "Roboto")(props);

  const safeVariant: ButtonVariants = getStringC("variant", "text")(props);

  const safeSize: Size = getStringC("size", "medium")(props);

  const safeWidth: boolean = isObjectPropTrueC("fullWidth")(props);

  const safeContent: string = getStringC("content", "Link Text")(props);

  const safeJustify: Flex = getStringC("justify", "center")(props);

  const safeAlign: Flex = getStringC("align", "center")(props);

  // the font
  // This will make sure WebFont.load is only used in the browser.
  if (typeof window !== "undefined") {
    var WebFont = require("webfontloader");

    WebFont.load({
      google: {
        families: [safeFontFamily]
      }
    });
  }

  const removeUnwantedObjects: Object = compose(
    dissoc("edit"),
    dissoc("classes"),
    dissoc("nobackground")
  );

  return (
    <Grid
      container
      justify={safeJustify}
      alignItems={safeAlign}
      className={classNames({
        [classes.background]: !props.nobackground
      })}
    >
      <Grid item>
        <Button
          color="primary"
          variant={safeVariant}
          size={safeSize}
          fullWidth={safeWidth}
          style={{ fontFamily: safeFontFamily }}
          {...removeUnwantedObjects(props)}
        >
          {safeContent}
        </Button>
      </Grid>
    </Grid>
  );
};

const styles = (theme: Object) => ({
  background: {
    background: theme.palette.background.paper
  },
  root: {
    color: theme.palette.text.primary
  }
});

const Buttonwithstyles = withStyles(styles)(Buttoncomponent);

const optimize: HOC<*, boolean> = recomposecompose(
  shouldUpdate(
    (prev, next) =>
      prev.align !== next.align ||
      prev.edit !== next.edit ||
      prev.justify !== next.justify ||
      prev.fontfamily !== next.fontfamily ||
      prev.variant !== next.variant ||
      prev.content !== next.content ||
      prev.fullWidth !== next.fullWidth ||
      prev.customtheme !== next.customtheme
  )
);

export default optimize((props: Props) => {
  return <Buttonwithstyles {...props} />;
});
