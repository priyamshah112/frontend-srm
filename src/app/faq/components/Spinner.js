import React from "react";
import { makeStyles, Box, CircularProgress } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
    margin: "20px auto",
  },
});

const Spinner = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <CircularProgress color="primary" size={30} />
    </Box>
  );
};

export default Spinner;
