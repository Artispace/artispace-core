// @flow
import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { componentFromProp } from "recompose";

// crocks imports
import dissoc from "crocks/helpers/dissoc";

import type { HOC } from "recompose";

//recompose
import compose from "recompose/compose";
import shouldUpdate from "recompose/shouldUpdate";

// utilities
import {
  getObject,
  getArrayC,
  getFunctionC,
  getBooleanC,
  getNonEmptyString
} from "@artispace/utils/lib/ADTS/state";
import { isPropTrueC } from "@artispace/utils/lib/ADTS/pred";

const Genericcomponent = componentFromProp("component");
const Genericicon = componentFromProp("component");

const styles = (theme: Object) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  tabsRoot: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  pillsRoot: {
    backgroundColor: "transparent"
  },
  tabRoot: {
    textTransform: "initial",
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing.unit * 4,
    "&:hover": {
      opacity: 1
    },
    "&$tabSelected": {
      fontWeight: theme.typography.fontWeightMedium
    },
    "&:focus": {}
  },
  pilltabRoot: {
    width: 100,
    height: 100,
    marginTop: 15,
    borderRadius: 5,
    marginBottom: 15,
    marginRight: 5,
    "&$tabSelected": {
      background: theme.palette.primary.main,
      color: "white",
      boxShadow: "0px 6px 10px 0px rgba(0,0,0,0.44)"
    },
    "&:focus": {
      color: "white"
    }
  },
  tabSelected: {},
  typography: {
    padding: theme.spacing.unit * 3
  },
  nostyling: {}
});

type Tabprop = {
  label?: string,
  icon?: string,
  tabId?: string
};

type Props = {
  classes: Object,
  design: string,
  tabs: Array<Tabprop>,
  components: Array<any>,
  edit: boolean,
  centered: boolean
};

type State = {
  value: number
};

class CustomizedTabs extends React.Component<Props, State> {
  state = {
    value: 0
  };

  handleChange = (event: SyntheticEvent<>, value: number) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    // functions

    // styling the rootTab
    const rootTab = (design: string) => {
      switch (design) {
        case "ant":
          return classes.tabRoot;
        case "pill":
          return classes.pilltabRoot;
        default:
          return classes.nostyling;
      }
    };
    // styling the rootsBar
    const rootsBar = (design: string) => {
      switch (design) {
        case "ant":
          return classes.tabsRoot;
        case "pill":
          return classes.nostyling;
        default:
          return classes.nostyling;
      }
    };

    // the indicator function
    const indicatorfn = (design: string) => {
      switch (design) {
        case "pill":
          return classes.pillsRoot;
        default:
          return classes.nostyling;
      }
    };
    // the ripple function
    const rippleFn = (design: string) => {
      if (design === "ant") return true;
      else return false;
    };

    const safeSecondaryProp: string = isPropTrueC(this.props.secondary)
      ? "secondary"
      : "primary";
    // safeTabs props;
    const safeTabs: Array<Tabprop> = getArrayC("tabs", [{ label: "First" }])(
      this.props
    );
    //safe centered prop centered does not work woth scrollable on
    const safeCentered: boolean = getBooleanC("centered", false)(this.props);

    // styling for the TABS & TAB
    const safeRootTabs: Object = getNonEmptyString("design", "none")
      .map(rootsBar)
      .evalWith(this.props);
    const safeRootTab: Object = getNonEmptyString("design", "none")
      .map(rootTab)
      .evalWith(this.props);
    const safeIndicator: Object = getNonEmptyString("design", "none")
      .map(indicatorfn)
      .evalWith(this.props);

    // option For disabling ripple
    const safeRippleDisable: boolean = getNonEmptyString("design", "none")
      .map(rippleFn)
      .evalWith(this.props);

    // safe components
    const safeComponents: Array<any> = getArrayC("components", [])(this.props);

    const safeRenderComponent: any => mixed = getFunctionC(
      "renderFunction",
      () => {}
    )(this.props);
    const safeRenderIcon: any => mixed = getFunctionC("renderIcon", () => {})(
      this.props
    );

    return (
      <Paper elevation={0}>
        <div className={classes.root}>
          <Tabs
            value={value}
            indicatorColor={safeSecondaryProp}
            textColor={safeSecondaryProp}
            centered={safeCentered}
            scrollable={!safeCentered}
            scrollButtons="auto"
            onChange={this.handleChange}
            classes={{ root: safeRootTabs, indicator: safeIndicator }}
          >
            {safeTabs.map((tab, i) => {
              const isIconPropPresent: React.Node | void = getObject(
                "icon",
                null
              )
                .map(c =>
                  Boolean(c) ? (
                    <Genericicon component={safeRenderIcon(c.icon)} />
                  ) : null
                )
                .evalWith(tab);

              return (
                <Tab
                  key={i}
                  disableRipple={safeRippleDisable}
                  classes={{ root: safeRootTab, selected: classes.tabSelected }}
                  label={tab.label}
                  icon={isIconPropPresent}
                />
              );
            })}
          </Tabs>
        </div>
        <div>
          {safeComponents
            .filter((comp, i) => comp.tabId === safeTabs[value].tabId)
            .map((comp, i) => (
              <Genericcomponent
                {...dissoc("classes")(this.props)}
                key={i}
                {...comp}
                gridIndex={i}
                component={safeRenderComponent(comp.component)}
              />
            ))}
        </div>
      </Paper>
    );
  }
}

const Roottabs = withStyles(styles)(CustomizedTabs);

const optimize: HOC<*, boolean> = compose(
  shouldUpdate(
    (prev, next) =>
      prev.customtheme !== next.customtheme ||
      prev.edit !== next.edit ||
      prev.tabs !== next.tabs ||
      prev.design !== next.design ||
      prev.centered !== next.centered ||
      prev.components !== next.components
  )
);

export default optimize((props: Exportprop) => <Roottabs {...props} />);
