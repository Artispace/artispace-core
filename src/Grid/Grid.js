//@flow
import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

//recompose
import componentFromProp from "recompose/componentFromProp";
import compose from "recompose/compose";
import shouldUpdate from "recompose/shouldUpdate";

// utils
import {
  getStringC,
  getNumberC,
  getArrayC,
  getFunctionC
} from "@artispace/utils/lib/ADTS/state";
import dissoc from "crocks/helpers/dissoc";

import type { HOC } from "recompose";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: 140,
    width: 100
  },
  control: {
    padding: theme.spacing.unit * 2
  }
});

const Genericcomponent = componentFromProp("component");

// safety first

type Props = {
  classes: Object,
  components?: Array<any>,
  justify: string,
  alignItems: string,
  direction: string,
  spacing: number
};

class Gridcomponent extends React.Component<Props, {}> {
  render() {
    const { classes } = this.props;

    // safe components
    const safeComponents: Array<any> = getArrayC("components", [])(this.props);

    // safe properties
    // justify

    const safeJustifyContent: string = getStringC("justify", "center")(
      this.props
    );
    // alignItems

    const safeAlignItems: string = getStringC("alignItems", "center")(
      this.props
    );
    // direction

    const safeDirection: string = getStringC("direction", "row")(this.props);
    // safeSpacing

    const safeSpacing: number = getNumberC("spacing", 0)(this.props);
    const paddingstyle = {
      padding: safeSpacing / 2
    };

    const safeRenderFn: any => mixed = getFunctionC("renderFunction", () => {})(
      this.props
    );

    return (
      <div style={paddingstyle}>
        <Grid
          justify={safeJustifyContent}
          alignItems={safeAlignItems}
          direction={safeDirection}
          container
          className={classes.root}
          spacing={safeSpacing}
        >
          {safeComponents.map((comp, i) => {
            const safexs = getNumberC("xs", 12)(12);
            const safesm = getNumberC("sm", 6)(6);
            const safemd = getNumberC("md", 6)(6);
            return (
              <Grid key={i} item xs={safexs} sm={safesm} md={safemd}>
                <Genericcomponent
                  {...comp}
                  {...dissoc("classes")(this.props)}
                  gridIndex={i}
                  component={safeRenderFn(comp.component)}
                />
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }
}

const Gridcomponentwithstyles = withStyles(styles)(Gridcomponent);

const optimize: HOC<*, Props> = compose(
  shouldUpdate(
    (prev, next) =>
      prev.components !== next.components ||
      prev.edit !== next.edit ||
      prev.justify !== next.justify ||
      prev.alignItems !== next.alignItems ||
      prev.direction !== next.direction ||
      prev.customtheme !== next.customtheme ||
      prev.spacing !== next.spacing
  )
);

export default optimize((props: Props) => (
  <Gridcomponentwithstyles {...props} />
));
