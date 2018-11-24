// @flow

import * as React from "react";

import { getNumberC } from "@artispace/utils/lib/ADTS/state";
// recompose
import compose from "recompose/compose";
import shouldUpdate from "recompose/shouldUpdate";
import type { HOC } from "recompose";

type Props = {
  height?: number,
  edit?: boolean
};
const Blankspace = (props: Props) => {
  const safeHeight = getNumberC("height", 20)(props);
  return (
    <div
      style={{
        height: safeHeight
      }}
    />
  );
};

const optimize: HOC<*, Props> = compose(
  shouldUpdate(
    (prev, next) => prev.height !== next.height || prev.edit !== next.edit
  )
);

export default optimize((props: Props) => <Blankspace {...props} />);
