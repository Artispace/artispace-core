// @flow
import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import withWidth from "@material-ui/core/withWidth";

//recompose
import compose from "recompose/compose";
import shouldUpdate from "recompose/shouldUpdate";

import propPath from "crocks/Maybe/propPath";

import type { HOC } from "recompose";

// utils
import {
  getString,
  getStringC,
  getNumberC,
  getObject
} from "@artispace/utils/lib/ADTS/state";

import formatWidth from "../utils/width";

//
import LinkButton from "../Button";

const styles = (theme: Object) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%"
  },
  image: {
    position: "relative",
    width: "100% !important", // Overrides inline-style
    "&:hover, &$focusVisible": {
      zIndex: 1,
      "& $imageBackdrop": {
        opacity: 0.15
      },
      "& $imageMarked": {
        opacity: 0
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
    flexDirection: "column",
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
    backgroundColor: theme.palette.background.default,
    opacity: 0.6,
    transition: theme.transitions.create("opacity")
  },
  imageText: {
    position: "relative"
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity")
  }
});

type Props = {
  classes: Object,
  height?: number,
  width: "xs" | "sm" | "md" | "lg",
  background?: string,
  title?: string,
  content?: string,
  avatar?: {
    size?: number,
    src?: string
  },
  link: Object
};

type Optionalcomponent = React.Node | null;

function CenteredCard(props: Props) {
  const { classes, width } = props;
  const safeHeight = getObject("height", {})
    .map(height => {
      return propPath(["height", formatWidth(width)], props).option(250);
    })
    .evalWith(props);
  // const safeBackground = safe(isString, background).option("");
  const safeBackground: string = getStringC("background", "")(props);
  // const titleContent = safe(isString, title);
  const titleContent: Object = getString("title", null);
  const safeTitle = titleContent
    .map(title =>
      Boolean(title) ? (
        <Typography variant="h4" className={classes.imageText}>
          {title}
        </Typography>
      ) : null
    )
    .evalWith(props);
  const safeAlt: string = getStringC("title", "")(props);
  const safeContent: Optionalcomponent = getString("content", null)
    .map(content =>
      Boolean(content) ? (
        <Typography className={classes.imageText}>{content}</Typography>
      ) : null
    )
    .evalWith(props);

  const safeAvatar: Optionalcomponent = getObject("avatar", null)
    .map(avatar =>
      Boolean(avatar) ? (
        <Avatar
          alt={safeAlt}
          style={{
            width: getNumberC("size", 100)(avatar),
            height: getNumberC("size", 100)(avatar)
          }}
          src={avatar.src}
          className={classes.avatar}
        />
      ) : null
    )
    .evalWith(props);

  const safeLink: Optionalcomponent = getObject("link", null)
    .map(link =>
      Boolean(link) ? (
        <LinkButton variant="raised" {...{ link }} {...link} nobackground />
      ) : null
    )
    .evalWith(props);
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
          style={{
            backgroundImage: `url(${safeBackground})`
          }}
        />
        <span className={classes.imageBackdrop} />
        <span className={classes.imageButton}>
          {safeAvatar}
          {safeTitle}
          {safeContent}
          {safeLink}
        </span>
      </ButtonBase>
    </div>
  );
}

const optimize: HOC<*, Props> = compose(
  shouldUpdate(
    (prev, next) =>
      prev.avatar !== next.avatar ||
      prev.edit !== next.edit ||
      prev.title !== next.title ||
      prev.content !== next.content ||
      prev.background !== next.background ||
      prev.link !== next.link ||
      prev.background !== next.background ||
      prev.customtheme !== next.customtheme
  )
);

const Centeredwithcustomtheme = optimize(props => <CenteredCard {...props} />);

export default compose(
  withStyles(styles),
  withWidth()
)(Centeredwithcustomtheme);
