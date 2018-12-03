// @flow
import React from "react";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";

import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import compose from "crocks/helpers/compose";
import Typography from "../Typography";

import dissoc from "crocks/helpers/dissoc";

import classNames from "classnames";

// recompose
import shouldUpdate from "recompose/shouldUpdate";
import recomposecompose from "recompose/compose";
import type { HOC } from "recompose";

// will import from artispace
import { getStringC } from "@artispace/utils/lib/ADTS/state";
import { isObjectPropTrueC } from "@artispace/utils/lib/ADTS/pred";
import { valInPathC } from "@artispace/utils/lib/ADTS/maybe";

type ButtonVariants =
  | "flat"
  | "outlined"
  | "contained"
  | "raised"
  | "fab"
  | "extended";

type Size = "small" | "medium" | "large";

type Flex =
  | "flex-start"
  | "center"
  | "flex-end"
  | "space-between"
  | "space-around"
  | "space-evenly";

type Props = {
  align?: string,
  edit?: boolean,
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

  const safeVariant: ButtonVariants = getStringC("variant", "text")(props);

  const safeSize: Size = getStringC("size", "medium")(props);

  const safeWidth: boolean = isObjectPropTrueC("fullWidth")(props);

  const safeContent: string = getStringC("content", "Link Text")(props);

  const safeJustify: Flex = getStringC("justify", "center")(props);

  const safeAlign: Flex = getStringC("align", "center")(props);

  const safeComponent = valInPathC(["component"], "div")(props);

  const removeUnwantedObjects: any => Object = compose(
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
        {safeVariant === "extended" ? (
          <Fab
            color="primary"
            {...removeUnwantedObjects(props)}
            variant={safeVariant}
            component={safeComponent}
          >
            <Typography
              content={safeContent}
              color="inherit"
              nobackground
              variant="button"
            />
          </Fab>
        ) : (
          <Button
            color="primary"
            {...removeUnwantedObjects(props)}
            variant={safeVariant}
            size={safeSize}
            fullWidth={safeWidth}
            component={safeComponent}
          >
            <Typography
              content={safeContent}
              color="inherit"
              nobackground
              variant="button"
            />
          </Button>
        )}
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

const optimize: HOC<*, Props> = recomposecompose(
  shouldUpdate(
    (prev, next) =>
      prev.align !== next.align ||
      prev.edit !== next.edit ||
      prev.justify !== next.justify ||
      prev.variant !== next.variant ||
      prev.content !== next.content ||
      prev.fullWidth !== next.fullWidth ||
      prev.customtheme !== next.customtheme
  )
);

export default optimize((props: Props) => {
  return <Buttonwithstyles {...props} />;
});
