import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import PublishBtn from "./PublishBtn";
import PublishLater from "./PublishLater";

const useStyles = makeStyles((theme) => ({
  textAlignLeft: {
    textAlign: "left",
    color: "rgba(0, 0, 0, 0.54)",
  },
  fieldStyle: {
    width: "100%",
    margin: "auto",
    fontFamily: "Avenir Book",
    fontSize: " 1rem",
    "& .MuiInput-underline:before": {
      borderBottom: "2px solid #eaeaea",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottom: "2px solid #7B72AF",
      transitionProperty: "border-bottom-color",
      transitionDuration: "500ms",
      transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
  },
  publishBtns: {
    textAlign: "right",
    justifyContent: "right",
  },
  sideMargins: {
    marginLeft: "20px",
    // marginRight: '20px',
  },
  margin: {
    marginTop: "30px",
    [theme.breakpoints.down("xs")]: {
      marginTop: "10px",
    },
    "& .publishBtn": {
      borderRadius: "3px",
      width: "inherit",
      margin: 0,
      [theme.breakpoints.down("xs")]: {
        marginTop: "10px",
        marginRight: 0,
        width: "100%",
      },
    },
    "& .publishLaterBtn": {
      backgroundColor: `${theme.palette.common.white}`,
      border: `1px solid ${theme.palette.common.adornment}`,
      marginRight: "5px",
    },
  },
}));
export default function Buttons(props) {
  const class_id = props.class_id;
  const classes = useStyles();
  const [openPub, setOpenPub] = useState(false);
  const [openPubLtr, setOpenPubLater] = useState(false);

  console.log('class_id', class_id)

  const handleOpenPubLater = () => {
    setOpenPubLater(true);
  };
  const handleClosePubLater = () => {
    setOpenPubLater(false);
  };

  const handleOpenPub = () => {
    setOpenPub(true);
  };
  const handleClosePub = () => {
    setOpenPub(false);
  };

  return (
    <div>
      {openPub ? (
        <PublishBtn
          class_id={class_id}
          open={handleOpenPub}
          handleClose={handleClosePub}
        />
      ) : (
        ""
      )}
      {openPubLtr ? (
        <PublishLater
          class_id={class_id}
          open={handleOpenPubLater}
          handleClose={handleClosePubLater}
        />
      ) : (
        ""
      )}
      <Box className={`${classes.margin} ${classes.sideMargins}`}>
        <Grid container className={classes.fieldStyle} direction="row-reverse">
          <Grid item sm={9} xs={12} className={classes.publishBtns}>
            <Button
              id="publishLaterBtn"
              variant="contained"
              onClick={handleOpenPubLater}
              className={`${
                classes.fieldStyle
              } ${"publishBtn"} ${"publishLaterBtn"}`}
              disableElevation
            >
              Publish Later
            </Button>
            <Button
              id="publishBtn"
              variant="contained"
              onClick={handleOpenPub}
              className={`${classes.fieldStyle} ${"publishBtn"}`}
              color="primary"
              type="submit"
              disableElevation
            >
              Publish Now
            </Button>
          </Grid>
          <Grid item sm={3} xs={12} className={classes.textAlignLeft}>
            <br />
            <br />
          </Grid>

          <br />
          <br />
          <br />
        </Grid>
      </Box>
    </div>
  );
}
