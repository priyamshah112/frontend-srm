import React from "react";
import { makeStyles, Typography, Box } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
  },
  headerText: {
    fontFamily: "Avenir Medium",
    fontSize: "18px",
    textAlign: "center",
  },
  newFaqRoot: {
    display: "inline-flex",
    float: "right",
    paddingRight: "3px",
    marginTop: "20px",
    marginBottom: "15px",
    "& > span": {
      fontSize: "14px",
    },
  },
  newFaqBtn: {
    paddingRight: "5px",
    marginTop: "-4px",
    cursor: "pointer",
  },
});

const Header = (props) => {
  const classes = useStyles();
  const { title, newFaqBtnHandler } = props;

  return (
    <Box className={classes.root}>
      <Typography className={classes.headerText}>
        {title ? title : "Frequently Asked Questions"}
      </Typography>
      {newFaqBtnHandler ? (
        <Typography color="primary" className={classes.newFaqRoot}>
          <AddCircleIcon
            color="primary"
            className={classes.newFaqBtn}
            onClick={newFaqBtnHandler}
          />
          <span>New</span>
        </Typography>
      ) : null}
    </Box>
  );
};

export default Header;
