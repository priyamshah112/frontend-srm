import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import UserIcon from "../../assets/images/chat/User.svg";

import Chat from "./Chat";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: "13px",
    marginTop: "15px",
    marginRight: "13px",
  },
  headingContainer: {
    display: "flex",
    alignItems: "center",
    "& div": {
      margin: "3px",
    },
  },
  headingText: {
    fontWeight: 900,
    fontSize: "0.875rem",
    fontStyle: "normal",
    color: theme.palette.common.bastille,
  },
  conversationContainer: {
    marginTop: "10px",
  },
}));

const ChatIndex = (props) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <div className={classes.headingContainer}>
          <div>
            <img src={UserIcon} alt="User" />
          </div>
          <div>
            <Typography className={classes.headingText}>Chats</Typography>
          </div>
        </div>
        <div className={classes.conversationContainer}>
          {/* <Chat /> */}
          <Typography>Chat Messages</Typography>
        </div>
      </div>
    </>
  );
};

export default ChatIndex;
