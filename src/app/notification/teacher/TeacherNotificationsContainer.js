import "date-fns";
import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import InfiniteScroll from "react-infinite-scroll-component";

import AddIcon from "../../../assets/images/Add.svg";
import NotificationCard from "../NotificationCard";
import TeacherNotificationCard from "./TeacherNotificationCard";

const useStyles = makeStyles((theme) => ({
  datePicker: {
    width: "25%",
    paddingRight: "10px",
  },
  sectionContainer: {
    height: "100%",
    width: "100%",
  },

  header: {
    paddingRight: "15px",
    paddingLeft: "15px",
    paddingTop: "10px",
    textAlign: "right",
  },
  cardBoxPadding: {
    padding: "0px 24px 24px 24px",
    [theme.breakpoints.down("sm")]: {
      padding: "16px",
    },
  },
  addNew: {
    color: theme.palette.common.deluge,
    marginTop: "15px",
    marginRight: "15px",
    "& .new": {
      float: "right",
      fontSize: "14px",
      padding: "5px",
    },
    "& img": {
      margin: "5px",
      height: "20px",
      cursor: "pointer",
    },
  },

  addNewDiv: {
    cursor: "pointer",
    width: "fit-content",
    marginLeft: "auto",
  },
  loading: {
    width: "100%",
    textAlign: "center",
    paddingTop: "8px",
    fontSize: "20px",
  },
}));

const TeacherNotificationsContainer = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const selectedRole = props.selectedRole;
  const [hasMore, setHasMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [notifications, setNotifications] = useState([]);

  const fetchAnnouncementOnScroll = async () => {
    console.log("Fetch More");
  };
  const handleCreateAnnouncement = async () => {
    history.push("/create-notification/64");
    console.log("Create Announcement");
  };

  let content;

  if (props.created_by) {
    content = <TeacherNotificationCard />;
  } else {
    content = <NotificationCard />;
  }

  return (
    <div className={classes.sectionContainer} id="scrollable">
      {props.created_by ? (
        <div className={classes.header}>
          {selectedRole === "teacher" || selectedRole === "admin" ? (
            <div className={classes.addNew}>
              <div
                onClick={handleCreateAnnouncement}
                className={classes.addNewDiv}
              >
                <img src={AddIcon} alt="add" />
                <Typography className="new">New</Typography>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
      <Box className={classes.cardBoxPadding}>
        <InfiniteScroll
          dataLength={notifications.length}
          next={fetchAnnouncementOnScroll}
          hasMore={hasMore}
          loader={
            <>
              <div className={classes.loading}>
                <CircularProgress color="primary" size={30} />
              </div>
              <br />
            </>
          }
          scrollableTarget="scrollable"
          scrollThreshold={0.2}
        >
          {content}
        </InfiniteScroll>
      </Box>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedRole: state.auth.selectedRole,
  };
};

export default connect(mapStateToProps)(TeacherNotificationsContainer);
