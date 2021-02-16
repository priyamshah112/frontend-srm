import React from "react";
import { makeStyles, CircularProgress, Box } from "@material-ui/core";

const useStyles = makeStyles({
  loading: {
    width: "100%",
    textAlign: "center",
    paddingTop: "8px",
    fontSize: "20px",
  },
});

const Spinner = () => {
  const classes = useStyles();

  return (
    <>
      <br />
      <Box className={classes.loading}>
        <CircularProgress />
      </Box>
      <br />
    </>
  );
};

export default Spinner;
