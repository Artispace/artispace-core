// @flow
import React from "react";

import { withTheme } from "@material-ui/core/styles";

import Avatar from "@material-ui/core/Avatar";

// recompose
import compose from "recompose/compose";
import shouldUpdate from "recompose/shouldUpdate";

// types
import type { HOC } from "recompose";
import type { Theme } from "../../flowtypes/palette";

import {
  getStringC,
  getNonEmptyStringC,
  getNumberC
} from "@artispace/utils/lib/ADTS/state";

import { isPropStringC, isPropTrueC } from "@artispace/utils/lib/ADTS/pred";

// crocks
import or from "crocks/logic/or";

type Props = {
  theme: Theme,
  alt?: string,
  src?: string,
  letter?: string,
  secondary?: string,
  size?: number
};

const Avatarcomponent = (props: Props) => {
  const {
    theme: { palette },
    secondary
  } = props;

  const safeAlt: string = getStringC("alt", "Oh Deer")(props);

  const safeSrc: string = getStringC(
    "src",
    "https://firebasestorage.googleapis.com/v0/b/ke-pages.appspot.com/o/preview%2Favatar-face.jpg?alt=media&token=afca9bc9-0efd-4986-81fb-9422f85162eb"
  )(props);

  const safeLetter: string | null = getNonEmptyStringC("letter", null)(props);

  const safeSecondary: boolean = or(isPropStringC, isPropTrueC)(secondary);
  const safeSize: number = getNumberC("size", 80)(props);
  const style = {
    backgroundColor: safeSecondary
      ? palette.secondary.main
      : palette.primary.main,
    height: safeSize,
    width: safeSize
  };
  if (safeLetter) return <Avatar style={style}>{safeLetter}</Avatar>;
  return <Avatar style={style} alt={safeAlt} src={safeSrc} />;
};

const Avatarcomponentwiththeme = withTheme()(Avatarcomponent);

const optimize: HOC<*, boolean> = compose(
  shouldUpdate(
    (prev, next) =>
      prev.alt !== next.alt ||
      prev.src !== next.src ||
      prev.letter !== next.letter ||
      prev.secondary !== next.secondary ||
      prev.customtheme !== next.customtheme ||
      prev.size !== next.size ||
      prev.theme !== next.theme ||
      prev.edit !== next.edit
  )
);
export default optimize(props => {
  return <Avatarcomponentwiththeme {...props} />;
});
