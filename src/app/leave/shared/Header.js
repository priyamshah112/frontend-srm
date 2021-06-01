import React from "react";
import { makeStyles, Box, Typography } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { colors } from '../../common/ui/appStyles'

const useStyles = makeStyles({
  root: {
    fontFamily: "Avenir Medium",
    fontSize: "20px",
  },
  title: {
    textAlign: "center",
    margin: "15px 0px",
  },
  content: {
    marginLeft: "15px",
    marginRight: "15px",
    "& > *": {
      display: "inline-block",
      paddingTop: "8px",
      paddingLeft: "5px",
    },
  },
  statusRoot: {
    display: "inline-flex",
  },
  statusText: {
    marginLeft: "5px",
  },
  newLeaveRoot: {
    display: "inline-flex",
    float: "right",
    paddingRight: "3px",
    cursor: "pointer",
    '& span':{
      color: colors.tint,
      fontSize: '14px',
    }
  },
  newLeaveBtn: {
    paddingRight: "5px",
    marginTop: "-2px",
  },
});

const Header = (props) => {
  const classes = useStyles();
  const { title, titleText, newLeaveBtn, newLeaveBtnHandler } = props;

  return (
    <Box className={classes.root}>
      {title ? (
        <Typography className={classes.title}>
          {titleText ? titleText : "My Leave"}
        </Typography>
      ) : null}
      <Box className={classes.content}>
        <Typography className={classes.statusRoot}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 14 18"
          >
            <g transform="translate(-10.439 -7)">
              <path
                class="a"
                d="M21.153,7H11V25H25V10.517Zm.186,1.017,2.542,2.324-2.542,0ZM11.646,24.393V7.607h9.046v3.337l3.662.005V24.393Z"
                transform="translate(-0.561)"
              />
              <rect class="a" width="6" transform="translate(13.065 8.878)" />
              <rect
                class="a"
                width="9.197"
                height="1"
                transform="translate(13 11.84)"
              />
              <rect
                class="a"
                width="7"
                height="1"
                transform="translate(13.074 13.825)"
              />
              <rect class="a" width="9.197" transform="translate(13 16.806)" />
              <rect
                class="a"
                width="7"
                height="1"
                transform="translate(13.074 16.802)"
              />
              <rect
                class="a"
                width="9.197"
                height="1"
                transform="translate(13 19.779)"
              />
              <rect
                class="a"
                width="7"
                height="1"
                transform="translate(13.074 21.746)"
              />
            </g>
          </svg>
          <span className={classes.statusText}>Status</span>
        </Typography>

        {newLeaveBtn ? (
          <Typography className={classes.newLeaveRoot}>
            <AddCircleIcon
              color="primary"
              className={classes.newLeaveBtn}
              onClick={newLeaveBtnHandler}
            />
            <span>New</span>
          </Typography>
        ) : null}
      </Box>
    </Box>
  );
};

export default Header;
