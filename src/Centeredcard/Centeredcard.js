// @flow
import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import withWidth from "@material-ui/core/withWidth";
import Grid from "@material-ui/core/Grid";

//recompose
import compose from "recompose/compose";
import shouldUpdate from "recompose/shouldUpdate";
import branch from "recompose/branch";
import renderComponent from "recompose/renderComponent";
import renderNothing from "recompose/renderNothing";

import propPath from "crocks/Maybe/propPath";
import isObject from "crocks/predicates/isObject";
import and from "crocks/logic/and";
import hasProp from "crocks/predicates/hasProp";

import type { HOC } from "recompose";

// utils
import {
  getStringC,
  getNumberC,
  getObject
} from "@artispace/utils/lib/ADTS/state";

import { doesPropExistC } from "@artispace/utils/lib/ADTS/pred";

import formatWidth from "../utils/width";

const styles = (theme: Object) => ({
  root: {
    flexGrow: 1,
    padding: 16
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
  link: Object,
  LinkButton?: React.Node,
  customtheme?: Object
};

function Title(props) {
  const { classes } = props;
  const title: string = getStringC("title", "")(props);
  return (
    <Grid item>
      <Typography
        color="textPrimary"
        variant="h4"
        align="center"
        className={classes.imageText}
      >
        {title}
      </Typography>
    </Grid>
  );
}

const Rendertitle = branch(
  doesPropExistC("title"),
  renderComponent(Title),
  renderNothing
)(<div />);

function Content(props) {
  const { classes } = props;
  const content = getStringC("content")(props);
  return (
    <Grid item>
      <Typography
        color="textPrimary"
        align="center"
        className={classes.imageText}
      >
        {content}
      </Typography>
    </Grid>
  );
}

const Rendercontent = branch(
  doesPropExistC("content"),
  renderComponent(Content),
  renderNothing
)(<div />);

function Avatarcomponent(props) {
  const safeAlt: string = getStringC("title", "")(props);

  const { classes, avatar } = props;

  return (
    <Grid item>
      <Avatar
        alt={safeAlt}
        style={{
          width: getNumberC("size", 100)(avatar),
          height: getNumberC("size", 100)(avatar)
        }}
        src={avatar.src}
        className={classes.avatar}
      />
    </Grid>
  );
}

const isAvatarAnObject = and(hasProp("avatar"), isObject);

const RenderAvatar = branch(
  isAvatarAnObject,
  renderComponent(Avatarcomponent),
  renderNothing
)(<div />);

function Linkcomponent(props) {
  const { link, LinkButton } = props;
  return (
    <LinkButton variant="contained" {...{ link }} {...link} nobackground />
  );
}

const isLinkAnObject = and(hasProp("link"), isObject);
const Renderlink = branch(
  isLinkAnObject,
  renderComponent(Linkcomponent),
  renderNothing
)(<div />);

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

  const style = {
    height: safeHeight,
    width: "100%"
  };
  return (
    <div className={classes.root}>
      <ButtonBase
        component={Grid}
        container
        justify="center"
        alignItems="center"
        direction="column"
        spacing={16}
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
        <span>
          <RenderAvatar {...props} />
          <Rendertitle {...props} />
          <Rendercontent {...props} />
          <Renderlink {...props} />
        </span>
      </ButtonBase>
    </div>
  );
}

const optimize: HOC<*, Props> = compose(
  shouldUpdate(
    (prev, next) =>
      prev.avatar !== next.avatar ||
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
