import React from "react";
import NotificationCard from "../NotificationCard";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    width: "100%",
    height: "100%",
    margin: 0,
    padding: 0,
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: 0,
    },
  },
  notificationContainer: {
    width: "95%",
    height: "auto",
    margin: "0 auto 100px",
    padding: 0,
  },
  notification: {
    marginTop: "20px",
  },
}));

const ParentNotifications = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.mainContainer}>
      <div className={classes.notificationContainer}>
        <div className={classes.notification}>
          <NotificationCard />
        </div>
      </div>
    </div>
  );
};

export default ParentNotifications;
