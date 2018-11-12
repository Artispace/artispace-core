//@flow
import React from "react";

import { withStyles } from "@material-ui/core/styles";

import { getString } from "@artispace/utils/lib/ADTS/state";

import Typography from "../Typography";

const styles = (theme: Object) => ({
  root: {
    display: "flex",
    flexDirection: "column"
  },
  image: {
    width: "100%",
    maxHeight: 400,
    height: "auto"
  },
  img: {
    width: "100%",
    maxHeight: 400,
    height: "auto",
    objectFit: "cover"
  },
  titleBackground: {
    backgroundColor: theme.palette.common.black,
    top: -130,
    position: "relative",
    opacity: 0.4,
    height: 70
  },
  title: {
    position: "relative",
    top: -80,
    zIndex: 100
  }
});

const Image = (props: {
  classes: Object,
  src?: string,
  alt: string,
  title?: string
}) => {
  const { classes } = props;
  const safeTitle: string = getString("title", "")(props);
  const safeSrc: string = getString("src", "")(props);
  return (
    <div className={classes.root}>
      <div className={classes.image}>
        <img src={safeSrc} alt={safeTitle} className={classes.img} />
      </div>
      <div className={classes.title}>
        <Typography align="center" color="inherit" content={safeTitle} />
      </div>
      <div className={classes.titleBackground} />
    </div>
  );
};

export default withStyles(styles)(Image);
