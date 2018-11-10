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

// safety
import { dynamicSafeStringGetter } from "../utils/ADT/defaultState";

import { isObjectPropValueTrue } from "../utils/ADT/pred";

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
  classes: Object
};

const Buttoncomponent = (props: Props) => {
  const { classes } = props;
  //safeFontFamily::String? -> String
  // const safeFontFamily = safe(isNonEmptyString, fontfamily).option("Roboto");
  const safeFontFamily: string = dynamicSafeStringGetter(
    "fontfamily",
    "Roboto"
  ).evalWith(props);
  //safeVariant::('text'| 'flat'| 'outlined'| 'contained'| 'raised'| 'fab'| 'extendedFab')? -> String
  // const safeVariant = safe(isNonEmptyString, variant).option("text");
  const safeVariant: ButtonVariants = dynamicSafeStringGetter(
    "variant",
    "text"
  ).evalWith(props);
  //safeSize::('small' |'medium' |'large')? -> String
  // const safeSize = safe(isNonEmptyString, size).option("medium");
  const safeSize: Size = dynamicSafeStringGetter("size", "medium").evalWith(
    props
  );
  //fullWidth:: (String, Object ) -> Maybe -> Boolean
  // const safeWidth = prop("fullWidth", props)
  //   .map(width => Boolean(width))
  //   .option(false);
  const safeWidth: boolean = isObjectPropValueTrue("fullWidth").runWith(props);
  //safeContent:: String -> String
  // const safeContent = safe(isNonEmptyString, content).option("Link Text");
  const safeContent: string = dynamicSafeStringGetter(
    "content",
    "Link Text"
  ).evalWith(props);

  // grid
  // safeJustify::(flex-start |center |flex - end |space - between |space - around |space - evenly) -> String
  // const safeJustify = safe(isNonEmptyString, justify).option("center");
  const safeJustify: Flex = dynamicSafeStringGetter(
    "justify",
    "center"
  ).evalWith(props);
  //safeAlign::(flex-start |center |flex - end |space - between |space - around |space - evenly) -> String
  // const safeAlign = safe(isNonEmptyString, align).option("center");
  const safeAlign: Flex = dynamicSafeStringGetter("align", "center").evalWith(
    props
  );

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

const optimize = recomposecompose(
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
