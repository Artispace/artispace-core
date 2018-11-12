//@flow
import React from "react";

import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";

import propPath from "crocks/Maybe/propPath";

//recompose
import compose from "recompose/compose";
import shouldUpdate from "recompose/shouldUpdate";
import type { HOC } from "recompose";

// safety

import { getStringC, getObject } from "@artispace/utils/lib/ADTS/state";

// utils
import formatWidth from "../utils/width";

type Themetype = Object;

const styles = (theme: Themetype) => ({
  root: {
    width: "100%",
    listStyleType: "none",
    maxHeight: 500
  }
});

type MoreInfoprop = {
  title?: string,
  subtitle?: string,
  position?: string
};

type Itemprops = {
  classes: Object,
  moreinfo?: MoreInfoprop,
  width?: string
};

const Griditem = (props: Itemprops) => {
  const { classes, width } = props;
  const safeinfobool = getObject("moreinfo", true)
    .map(info => Boolean(info))
    .evalWith(props);

  const safeinfocontent: MoreInfoprop = getObject("moreinfo", {
    title: "Image",
    subtitle: "Subtitle",
    position: "top"
  })
    .map(more => {
      return {
        title: getStringC("title", "Title")(more),
        subtitle: getStringC("subtitle", "Subtitle")(more),
        position: getStringC("position", "top")(props)
      };
    })
    .evalWith(props);
  const safeHeight: number = getObject("height", 300)
    .map(height => {
      return propPath(["height", formatWidth(width)], props).option(200);
    })
    .evalWith(props);

  const safeImage = getStringC(
    "image",
    "https://images.pexels.com/photos/1236044/pexels-photo-1236044.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
  )(props);

  const stylling = {
    height: safeHeight
  };

  return (
    <div>
      <GridListTile className={classes.root} style={stylling}>
        <img
          src={safeImage}
          className={classes.root}
          alt={safeinfocontent.title}
          style={{
            width: "100%",
            maxHeight: 500
          }}
        />
        {Boolean(safeinfobool) && (
          <GridListTileBar
            titlePosition={safeinfocontent.position}
            title={safeinfocontent.title}
            subtitle={safeinfocontent.subtitle}
          />
        )}
      </GridListTile>
    </div>
  );
};

const Gridbannerimage = compose(
  withStyles(styles),
  withWidth()
)(Griditem);

type Editingprops = {};

const optimize: HOC<*, boolean> = compose(
  shouldUpdate(
    (prev, next) =>
      prev.edit !== next.edit ||
      prev.image !== next.image ||
      prev.moreinfo !== next.moreinfo ||
      prev.height !== next.height
  )
);

export default optimize((props: Editingprops) => (
  <Gridbannerimage {...props} />
));
