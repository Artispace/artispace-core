//@flow

import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";

import withWidth from "@material-ui/core/withWidth";

//recompose
import compose from "recompose/compose";
import shouldUpdate from "recompose/shouldUpdate";

// crocks imports
import propPath from "crocks/Maybe/propPath";

// utils
import {
  getStringC,
  getNumberC,
  getArrayC,
  getObject,
  getFunction
} from "@artispace/utils/lib/ADTS/state";

import { doesPropExistC } from "@artispace/utils/lib/ADTS/pred";

import type { HOC } from "recompose";

type Themeprop = Object;

const styles = (theme: Themeprop) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: "100%",
    height: "auto"
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  }
});

type Imageprop = {
  img?: string,
  title?: string,
  subtitle?: string,
  position?: string
};

type Props = {
  classes: Object,
  images?: Array<Imageprop>,
  title: string,
  maxWidth: number,
  width: string,
  cols: {
    sm?: number,
    md?: number,
    lg?: number
  },
  height: number
};

class GridListComponent extends React.Component<Props, {}> {
  render() {
    const { classes, width } = this.props;

    const safeImages: Array<Imageprop> = getArrayC("images", [])(this.props);

    const safeTitle: string = getStringC("title", "Title")(this.props);

    const safeMaxWidth: string | number = getNumberC("maxWidth", "100%")(
      this.props
    );

    const safeMaxHeight: string = getNumberC("height", "auto")(this.props);

    const formattedwidth = (() => {
      if (doesPropExistC("showcasewidth")(this.props))
        return this.props.showcasewidth;
      if (width === "xs" || width === "sm") return "sm";
      if (width === "md") return "md";
      return "lg";
    })();

    // safeCols
    const safeCols: number = propPath(
      ["cols", formattedwidth],
      this.props
    ).option(2);

    // safeCellHeight
    const safeCellHeight: number = propPath(
      ["cellheight", formattedwidth],
      this.props
    ).option(180);

    const safeImagereturnFn = (img: Imageprop) =>
      getFunction("returnImage", () => {})
        .map(f => f(img))
        .evalWith(this.props);

    return (
      <div className={classes.root}>
        <GridList
          cellHeight={safeCellHeight}
          className={classes.gridList}
          style={{ maxWidth: safeMaxWidth, maxHeight: safeMaxHeight }}
          cols={safeCols}
        >
          <GridListTile
            key="Subheader"
            cols={safeCols}
            style={{ height: "auto" }}
          >
            <ListSubheader component="div">{safeTitle}</ListSubheader>
          </GridListTile>
          {safeImages.map((tile, i) => {
            const safecol: number = getObject("cols", {})
              .map(_ => {
                return propPath(["cols", formattedwidth], tile).option(1);
              })
              .evalWith(tile);
            const saferow: number = getObject("rows", {})
              .map(_ => {
                return propPath(["rows", formattedwidth], tile).option(1);
              })
              .evalWith(tile);
            const safeTitle: number = getStringC("title", "")(tile);
            const safeSubTitle: string = getStringC("subtitle", "")(tile);
            const safePosition: string = getStringC("position", "bottom")(tile);

            return (
              <GridListTile
                key={i}
                onClick={() => safeImagereturnFn(tile)}
                cols={safecol}
                rows={saferow}
              >
                <img
                  src={tile.img}
                  alt={tile.title}
                  style={{ backgroundColor: "grey" }}
                />

                {(doesPropExistC("title")(tile) ||
                  doesPropExistC("subtitle")(tile)) && (
                  <GridListTileBar
                    title={safeTitle}
                    subtitle={<span>{safeSubTitle}</span>}
                    titlePosition={safePosition}
                  />
                )}
              </GridListTile>
            );
          })}
        </GridList>
      </div>
    );
  }
}

const StyledGridList = compose(
  withStyles(styles),
  withWidth()
)(GridListComponent);

const optimize: HOC<*, boolean> = compose(
  shouldUpdate(
    (prev, next) =>
      prev.edit !== next.edit ||
      prev.images !== next.images ||
      prev.cols !== next.cols ||
      prev.title !== next.title
  )
);

export default optimize((props: Props) => <StyledGridList {...props} />);
