import React from "react";
import { makeStyles, Box, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  emptyView: {
    width: "100%",
    textAlign: "center",
    paddingTop: "100px",
    fontSize: "18px",
  },
});

const NoFAQ = (props) => {
  const classes = useStyles();
  const { text } = props;

  return (
    <Box className={classes.emptyView}>
      <Typography>{text ? text : "Don't have any FAQ."}</Typography>
    </Box>
  );
};

export default NoFAQ;
