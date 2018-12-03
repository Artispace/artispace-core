//@flow
import React from "react";

import { withStyles } from "@material-ui/core/styles";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

import Typography from "../Typography";
import { getStringC } from "@artispace/utils/lib/ADTS/state";

const styles = (theme: Object) => ({
  root: {
    display: "flex",
    flexDirection: "column"
  },
  image: {
    width: "100%",
    maxHeight: 400,
    height: "auto",
    listStyleType: "none"
  },
  img: {
    width: "100%",
    maxHeight: 370,
    height: "auto",
    objectFit: "cover"
  }
});

const Image = (props: {
  classes: Object,
  src?: string,
  alt: string,
  title?: string
}) => {
  const { classes } = props;
  const safeTitle: string = getStringC("title", "")(props);
  const safeSrc: string = getStringC("src", "")(props);
  return (
    <div className={classes.root}>
      <GridListTile className={classes.image}>
        <img src={safeSrc} alt={safeTitle} className={classes.img} />
        <GridListTileBar
          title={
            <Typography
              align="center"
              nobackground
              color="inherit"
              content={safeTitle}
            />
          }
        />
      </GridListTile>
    </div>
  );
};

export default withStyles(styles)(Image);
