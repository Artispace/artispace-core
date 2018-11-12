//@flow
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import withWidth from "@material-ui/core/withWidth";

import Typographycomponent from "../Typography";

//recompose
import shouldUpdate from "recompose/shouldUpdate";
import compose from "recompose/compose";

// crocks
import propPath from "crocks/Maybe/propPath";

//utils
import { getStringC, getObject } from "@artispace/utils/lib/ADTS/state";

import formatedWidth from "../utils/width";

import type { HOC } from "recompose";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%"
  },
  image: {
    position: "relative",

    "&:hover, &$focusVisible": {
      zIndex: 1,
      "& $imageBackdrop": {
        opacity: 0.15
      },
      "& $imageMarked": {
        opacity: 0
      },
      "& $imageTitle": {
        border: "4px solid currentColor"
      }
    }
  },
  focusVisible: {},
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%"
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity")
  },
  imageTitle: {
    position: "relative",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme
      .spacing.unit + 6}px`,
    color: theme.palette.common.white
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: "currentColor",
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity")
  }
});

type Props = {
  classes: Object,
  title?: string,
  image?: string,
  width?: string,
  fontfamily?: string
};

class Base extends React.Component<Props, {}> {
  render() {
    const { classes, width } = this.props;
    const safeTitle: string = getStringC("title", "Title")(this.props);

    const safeImage: string = getStringC(
      "image",
      "https://firebasestorage.googleapis.com/v0/b/ke-pages.appspot.com/o/preview%2Fbuttonbase.png?alt=media&token=85825b3e-a7a1-46ee-803a-e753f59b3792"
    )(this.props);

    const safeFontFamily: string = getStringC("fontfamily", "Roboto")(
      this.props
    );

    const safeHeight: number = getObject("height", {})
      .map(height => {
        return propPath(["height", formatedWidth(width)], this.props).option(
          200
        );
      })
      .evalWith(this.props);
    const style = {
      height: safeHeight,
      width: "100%"
    };
    return (
      <div className={classes.root}>
        <ButtonBase
          disableRipple
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          style={style}
        >
          <span
            className={classes.imageSrc}
            style={{ backgroundImage: `url(${safeImage})` }}
          />
          <span className={classes.imageBackdrop} />
          <span className={classes.imageButton}>
            <div className={classes.imageTitle}>
              <Typographycomponent
                content={safeTitle}
                align="center"
                color="inherit"
                fontfamily={safeFontFamily}
                variant="h5"
                nobackground
              />
              <span className={classes.imageMarked} />
            </div>
          </span>
        </ButtonBase>
      </div>
    );
  }
}

const BasewithStyle = compose(
  withStyles(styles),
  withWidth()
)(Base);

const optimize: HOC<*, boolean> = compose(
  shouldUpdate(
    (prev, next) =>
      prev.title !== next.title ||
      prev.edit !== next.edit ||
      prev.image !== next.image ||
      prev.fontfamily !== next.fontfamily ||
      prev.height !== next.height ||
      prev.customtheme !== next.customtheme
  )
);

export default optimize((props: Props) => <BasewithStyle {...props} />);
