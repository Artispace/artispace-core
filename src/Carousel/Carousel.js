//@flow
import React from "react";
import SwipeableViews from "react-swipeable-views";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

//recompose
import shouldUpdate from "recompose/shouldUpdate";
import compose from "recompose/compose";

//utils
import { getStringC, getArrayC } from "@artispace/utils/lib/ADTS/state";

import type { HOC } from "recompose";

import Typography from "../Typography";
import Image from "./image";
import Controls from "./Carouselcontrols";

const styles = {
  slide: {
    minHeight: 100,
    color: "white"
  }
};

type Item = {
  src?: string,
  title?: string
};

type Props = {
  images?: Array<Item>,
  caption?: string,
  customtheme?: Object
};

type State = {
  index: number
};

class Carousell extends React.Component<Props, State> {
  state = {
    index: 0
  };

  handleChangeIndex = (index: number): void => {
    this.setState({ index });
  };
  render() {
    const { index } = this.state;

    const safeImages: Array<Item> = getArrayC("images", [])(this.props);
    const safeCaption: string = getStringC("caption", "")(this.props);
    return (
      <Paper>
        <SwipeableViews
          enableMouseEvents
          resistance
          index={index}
          onChangeIndex={this.handleChangeIndex}
        >
          {safeImages.map((item, i) => (
            <div key={i} style={Object.assign({}, styles.slide)}>
              <Image title={item.title} src={item.src} />
            </div>
          ))}
        </SwipeableViews>
        <Controls
          {...{ safeImages }}
          index={index}
          handleChangeIndex={this.handleChangeIndex}
        />
        <div
          style={{
            position: "relative"
          }}
        >
          <Typography
            variant="overline"
            content={safeCaption}
            color="inherit"
          />
        </div>
      </Paper>
    );
  }
}

const stylestheme = theme => ({
  root: {
    background: theme.palette.background.paper
  }
});

const StyledCarousel = withStyles(stylestheme)(Carousell);

const optimize: HOC<*, Props> = compose(
  shouldUpdate(
    (prev, next) =>
      prev.caption !== next.caption ||
      prev.images !== next.images ||
      prev.customtheme !== next.customtheme
  )
);

export default optimize((props: Props) => <StyledCarousel {...props} />);
