// @flow
import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
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
import crockscompose from "crocks/helpers/compose";
import map from "crocks/pointfree/map";

//MUI
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

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
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
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

const getContent = getStringC("content", "");

function Content(props) {
  const content = getContent(props);
  return (
    <CardContent>
      <Typography color="textPrimary" align="center">
        {content}
      </Typography>
    </CardContent>
  );
}

const isLengthGreaterThan100 = props => getContent(props).length > 65;

const shouldContentRender = and(
  doesPropExistC("content"),
  isLengthGreaterThan100
);

const Rendercontent = branch(
  shouldContentRender,
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
    <CardActions
      disableActionSpacing
      style={{
        display: "flex"
      }}
    >
      <LinkButton
        align="flex-end"
        justify="flex-end"
        variant="outlined"
        {...{ link }}
        {...link}
        nobackground
      />
    </CardActions>
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
  const safeTitle: string = getStringC("title", "")(props);
  const safeSubTitle: string = getStringC("content", "")(props);
  const safeContent =
    safeSubTitle.length > 64 ? `${safeSubTitle.slice(0, 64)}...` : safeSubTitle;
  const style = {
    minHeight: safeHeight,
    width: "100%"
  };
  return (
    <div className={classes.root}>
      <Card style={style}>
        <CardHeader
          avatar={<RenderAvatar {...props} />}
          title={safeTitle}
          subheader={safeContent}
        />
        <CardMedia
          className={classes.media}
          image={safeBackground}
          title={safeTitle}
        />
        <Rendercontent {...props} />
        <Renderlink {...props} />
      </Card>
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
