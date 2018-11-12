//@flow
import React, { Component } from "react";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Check from "@material-ui/icons/Check";

import isEmpty from "crocks/predicates/isEmpty";
import isNumber from "crocks/predicates/isNumber";
import CryptoJS from "crypto-js";

//recompose
import compose from "recompose/compose";
import shouldUpdate from "recompose/shouldUpdate";

import Singlefile from "./singlefile";

import type { File } from "./singlefile";

import type { HOC } from "recompose";

import { getFilesC, getNonEmptyString } from "@artispace/utils/lib/ADTS/state";

type Props = {
  classes: Object,
  files: Array<File>
};

const safeprivatekey = getNonEmptyString("private", "");

class Highlightfiles extends Component<Props, {}> {
  state = {
    password: "",
    doespassmatch: false,
    errormessage: ""
  };

  handleChangePassword = event => {
    this.setState({ password: event.target.value });
  };

  handleDecode = event => {
    const { id, componentId, gridIndex } = this.props;
    const { password } = this.state;

    let resolvedId;
    if (!isNumber(gridIndex)) {
      resolvedId = id;
    } else {
      resolvedId = componentId;
    }
    const bytes = CryptoJS.AES.decrypt(
      safeprivatekey.evalWith(this.props),
      resolvedId
    );
    if (bytes.toString(CryptoJS.enc.Utf8) === password) {
      this.setState({
        doespassmatch: true
      });
    } else {
      this.setState({
        errormessage: "You entered a wrong password"
      });
    }
  };

  render() {
    const { doespassmatch, errormessage } = this.state;
    const safeFiles = getFilesC("files", [])(this.props);
    const isPrivateKeyEmpty = safeprivatekey.map(isEmpty).evalWith(this.props);
    return (
      <div style={{ padding: 10 }}>
        {isPrivateKeyEmpty || doespassmatch === true ? (
          <Grid container spacing={16} justify="center">
            {safeFiles.map((file, i) => (
              <Grid key={i} item>
                <Singlefile {...{ file }} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <div
            style={{
              height: 150,
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <TextField
              variant="outlined"
              label="Enter password"
              error={!isEmpty(errormessage)}
              helperText={
                isEmpty(errormessage)
                  ? `You need a password to access these files`
                  : errormessage
              }
              onChange={this.handleChangePassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment variant="filled" position="end">
                    <IconButton onClick={this.handleDecode}>
                      <Check />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </div>
        )}
      </div>
    );
  }
}

const optimize: HOC<*, boolean> = compose(
  shouldUpdate(
    (prev, next) =>
      prev.edit !== next.edit ||
      prev.customtheme !== next.customtheme ||
      prev.files !== next.files ||
      prev.private !== next.private
  )
);

export default optimize(props => <Highlightfiles {...props} />);
