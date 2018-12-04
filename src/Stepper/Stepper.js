//@flow
import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import StepButton from "@material-ui/core/StepButton";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "../Typography";

import withWidth from "@material-ui/core/withWidth";

import compose from "recompose/compose";
import shouldUpdate from "recompose/shouldUpdate";

// crocks importation
import propPath from "crocks/Maybe/propPath";

import Filescollection from "../Highlightfiles";

//formattedwidth
import formattedwidth from "../utils/width";

// utils
import { getArrayC, getStringC } from "@artispace/utils/lib/ADTS/state";

import type { HOC } from "recompose";

import type { File } from "../../flowtypes/file";

type Themetype = {
  spacing: {
    unit: number
  }
};

const styles = (theme: Themetype) => ({
  root: {
    width: "100%"
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2
  },
  resetContainer: {
    padding: theme.spacing.unit * 3
  }
});

type Steprop = {
  label: string,
  content: string,
  files?: Array<File>
};

type Props = {
  classes: Object,
  steps: Array<Steprop>,
  onfinish: string,
  orientation: string,
  width: string
};

type State = {
  activeStep: number
};

class Steppercomponent extends React.Component<Props, State> {
  state = {
    activeStep: 0
  };

  handleNext = () => {
    this.setState({
      activeStep: this.state.activeStep + 1
    });
  };

  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  handleStep = (step: number) => () => {
    this.setState({
      activeStep: step
    });
  };

  render() {
    const { classes, width } = this.props;
    const { activeStep } = this.state;
    const safeSteps: Array<Steprop> = getArrayC("steps", [])(this.props);

    const safeFinish: string = getStringC(
      "onfinish",
      "All steps completed - you&quot;re finished"
    )(this.props);

    // safe orientation

    const safeOrientation: string = propPath(
      ["orientation", formattedwidth(width)],
      this.props
    ).option("vertical");

    // the buttons
    const Renderbuttons = () => (
      <div className={classes.actionsContainer}>
        <div>
          <Button
            disabled={activeStep === 0}
            onClick={this.handleBack}
            className={classes.button}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleNext}
            className={classes.button}
          >
            {activeStep === safeSteps.length - 1 ? "Finish" : "Next"}
          </Button>
        </div>
      </div>
    );

    return (
      <Paper className={classes.root} elevation={0}>
        <Stepper activeStep={activeStep} orientation={safeOrientation}>
          {safeSteps.map((step, index) => {
            const safeFiles: Array<File> = getArrayC("files", [])(step);
            if (safeOrientation === "vertical") {
              return (
                <Step key={index}>
                  <StepLabel>{step.label}</StepLabel>
                  <StepContent>
                    <Typography align="left" content={step.content} />
                    <Filescollection files={safeFiles} />
                    <Renderbuttons />
                  </StepContent>
                </Step>
              );
            } else {
              return (
                <Step key={index}>
                  <StepButton onClick={this.handleStep(index)}>
                    {step.label}
                  </StepButton>
                </Step>
              );
            }
          })}
        </Stepper>
        {safeOrientation === "horizontal" && activeStep !== safeSteps.length && (
          <div
            style={{
              marginLeft: 20
            }}
          >
            <Typography align="left" content={safeSteps[activeStep].content} />
            <Filescollection
              files={getArrayC("files", [])(safeSteps[activeStep])}
            />
            <Renderbuttons />
          </div>
        )}
        {activeStep === safeSteps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography align="left" content={safeFinish} />
            <Button onClick={this.handleReset} className={classes.button}>
              Reset
            </Button>
          </Paper>
        )}
      </Paper>
    );
  }
}

// withStyles(styles)(Steppercomponent);
const Stepperwithstyles = compose(
  withStyles(styles),
  withWidth()
)(Steppercomponent);

const optimize: HOC<*, Props> = compose(
  shouldUpdate(
    (prev, next) =>
      prev.edit !== next.edit ||
      prev.customtheme !== next.customtheme ||
      prev.steps !== next.steps ||
      prev.orientation !== next.orientation ||
      prev.onfinish !== next.onfinish ||
      prev.width !== next.width
  )
);

export default optimize((props: Props) => <Stepperwithstyles {...props} />);
