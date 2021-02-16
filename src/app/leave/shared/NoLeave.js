import React from "react";
import { makeStyles, Box, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "100%",
    textAlign: "center",
    fontSize: "20px",
    paddingTop: "60px",
  },
});

const NoLeave = (props) => {
  const classes = useStyles();
  const { text } = props;

  return (
    <Box className={classes.root}>
      <Typography>{text ? text : "You don't have any leave."}</Typography>
    </Box>
  );
};

export default NoLeave;
