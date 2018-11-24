// @flow
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import compose from "crocks/helpers/compose";

import {
  resolveIconSvgImage,
  getfileextensionfromname
} from "../utils/logic/uploadfilelogic";
const styles = {
  card: {
    // maxWidth: 345
  },
  media: {
    // ⚠️ object-fit is not supported by IE11.
    //objectFit: 'cover',
  }
};

const resolveiconfromcomposition = compose(
  resolveIconSvgImage,
  getfileextensionfromname
);

export type File = {
  file: string,
  description: string,
  reference: string,
  id: string
};

type Props = {
  file: File,
  classes: Object
};

const Singlefiledisplay = (props: Props) => {
  const { classes, file } = props;

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          className={classes.media}
          height="140"
          image={resolveiconfromcomposition(file.reference)}
          title={file.reference}
        />
        <CardContent>
          <Typography gutterBottom noWrap variant="overline">
            {file.reference}
          </Typography>
          <Typography gutterBottom noWrap variant="subtitle1">
            {file.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          component="a"
          target="_blank"
          href={file.file}
          size="small"
          color="primary"
        >
          Open File
        </Button>
      </CardActions>
    </Card>
  );
};

export default withStyles(styles)(Singlefiledisplay);
