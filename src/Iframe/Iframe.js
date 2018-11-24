//@flow
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import Typography from "@material-ui/core/Typography";

import Paper from "@material-ui/core/Paper";

//recompose
import compose from "recompose/compose";
import shouldUpdate from "recompose/shouldUpdate";

import propPath from "crocks/Maybe/propPath";

import type { HOC } from "recompose";

// safety

import formattedwidth from "../utils/width";

import { getStringC, getNumberC } from "@artispace/utils/lib/ADTS/state";

const styles = theme => ({
  root: {}
});

type Props = {
  classes: Object,
  url?: string,
  width: string,
  height?: Object,
  elevation?: number,
  caption?: string
};

const Iframecomponent = (props: Props) => {
  const { classes, width } = props;

  const safeUrl: string = getStringC(
    "url",
    "https://www.youtube.com/embed/pOmu0LtcI6Y"
  )(props);

  const safeHeight: number = propPath(
    ["height", formattedwidth(width)],
    props
  ).option(200);

  const safeElevation: number = getNumberC("elevation", 4)(props);

  const safeCaption: string = getStringC("caption", "Caption")(props);

  const style = {
    height: safeHeight,
    width: "100%",
    overflow: "hidden",
    position: "relative"
  };

  return (
    <div>
      <Paper
        src={safeUrl}
        component="iframe"
        style={{
          border: 0,
          ...style
        }}
        className={classes.root}
        elevation={safeElevation}
      />
      <br />
      <Typography variant="caption" gutterBottom align="center">
        {safeCaption}
      </Typography>
      <br />
    </div>
  );
};

Iframecomponent.propTypes = {
  classes: PropTypes.object.isRequired
};

const Iframecompositioncomponent = compose(
  withStyles(styles),
  withWidth()
)(Iframecomponent);

const optimize: HOC<*, Props> = compose(
  shouldUpdate(
    (prev, next) =>
      prev.caption !== next.caption ||
      prev.edit !== next.edit ||
      prev.url !== next.url ||
      prev.height !== next.height ||
      prev.elevation !== next.elevation
  )
);

export default optimize((props: Props) => (
  <Iframecompositioncomponent {...props} />
));
