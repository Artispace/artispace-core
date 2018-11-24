// @flow
import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import withWidth from "@material-ui/core/withWidth";

import SwipeableViews from "react-swipeable-views";

// crocks
import propPath from "crocks/Maybe/propPath";

// utils
import formatwidth from "../utils/width";

//safety
import { getArrayC, getStringC } from "@artispace/utils/lib/ADTS/state";

//types
import type { HOC } from "recompose";

import compose from "recompose/compose";

import shouldUpdate from "recompose/shouldUpdate";

const styles = (theme: Object) => ({
  root: {
    maxWidth: "100%",
    flexGrow: 1
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    paddingLeft: theme.spacing.unit * 4,
    marginBottom: 20,
    backgroundColor: theme.palette.background.default
  },
  img: {
    height: "auto",
    maxWidth: "100%",
    overflow: "hidden",
    width: "100%"
  }
});

type Stepprop = {
  label?: string,
  src?: string
};

type Props = {
  classes: Object,
  steps: Array<Stepprop>,
  width: string,
  height: {
    sm?: string,
    md?: string,
    lg?: string
  }
};

type State = {
  activeStep: number
};

class SwipeableTextMobileStepper extends React.Component<Props, State> {
  state = {
    activeStep: 0
  };

  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1
    }));
  };

  handleStepChange = activeStep => {
    this.setState({ activeStep });
  };

  render() {
    const { classes, width } = this.props;
    const { activeStep } = this.state;

    const safeSteps: Array<Stepprop> = getArrayC("steps", [])(this.props);

    const safeStepsLength: number = safeSteps.length;

    const safeHeight: number = propPath(
      ["height", formatwidth(width)],
      this.props
    ).option(200);

    const style = {
      height: safeHeight
    };
    return (
      <div className={classes.root}>
        <Paper square elevation={0} className={classes.header}>
          <Typography align="center" variant="subtitle1" gutterBottom>
            {getStringC("label", "")(safeSteps[activeStep])}
          </Typography>
        </Paper>
        <SwipeableViews
          index={this.state.activeStep}
          onChangeIndex={this.handleStepChange}
          enableMouseEvents
          resistance
        >
          {safeSteps.map((step, i) => {
            const safeImage: string = getStringC(
              "src",
              "https://images.pexels.com/photos/164642/pexels-photo-164642.jpeg?auto=compress&cs=tinysrgb&h=350"
            )(step);

            return (
              <img
                key={i}
                className={classes.img}
                {...{ style }}
                src={safeImage}
                alt={getStringC("label", "")(step)}
              />
            );
          })}
        </SwipeableViews>
        <MobileStepper
          steps={safeStepsLength}
          position="static"
          activeStep={activeStep}
          className={classes.mobileStepper}
          nextButton={
            <Button
              size="small"
              onClick={this.handleNext}
              disabled={
                activeStep === safeStepsLength - 1 || safeStepsLength === 0
              }
            >
              Next
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={this.handleBack}
              disabled={activeStep === 0}
            >
              <KeyboardArrowLeft />
              Back
            </Button>
          }
        />
      </div>
    );
  }
}

const optimize: HOC<*, Props> = compose(
  shouldUpdate(
    (prev, next) =>
      prev.edit !== next.edit ||
      prev.customtheme !== next.customtheme ||
      prev.steps !== next.steps ||
      prev.orientation !== next.orientation ||
      prev.onfinish !== next.onfinish ||
      prev.width !== next.width ||
      prev.height !== next.height
  )
);

const Swipeablestepperwithstyles = withWidth()(
  withStyles(styles)(SwipeableTextMobileStepper)
);

export default optimize((props: Props) => (
  <Swipeablestepperwithstyles {...props} />
));
