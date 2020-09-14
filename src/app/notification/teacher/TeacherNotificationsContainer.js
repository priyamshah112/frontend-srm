import "date-fns";
import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import InfiniteScroll from "react-infinite-scroll-component";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";

import AddIcon from "../../../assets/images/Add.svg";

import NotificationCard from "../NotificationCard";
import TeacherNotificationCard from "./TeacherNotificationCard";
import NotificationService from "../NotificationService";

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
  filterHeader: {
    width: "100%",
  },
  selectFiler: {
    color: `${theme.palette.common.adornment}`,
    fontSize: "15px",
    "&:before": {
      borderColor: `${theme.palette.common.adornment}`,
    },
    "& .MuiInputBase-input": {
      paddingBottom: "3px",
    },
  },
  formControl: {
    width: "50%",
    padding: "10px 0px  0px 27px",
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
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    let isNotificationLoading = true;
    const fetchNotification = async () => {
      try {
        const response = await NotificationService.fetchNotification(
          props.token,
          props.created_by,
          props.selectedRole,
          currentPage
        );
        if (response.status === 200) {
          if (isNotificationLoading) {
            if (
              response.data.data.last_page === response.data.data.current_page
            ) {
              setHasMore(false);
              setNotifications([...response.data.data.data]);
            } else {
              setCurrentPage(currentPage + 1);
              setNotifications([...response.data.data.data]);
            }
          }
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchNotification();
    return () => {
      isNotificationLoading = false;
    };
  }, []);

  const fetchNotificationOnScroll = async () => {
    try {
      const response = await NotificationService.fetchNotification(
        props.token,
        props.created_by,
        props.selectedRole,
        currentPage
      );
      if (response.status === 200) {
        if (response.data.data.last_page === response.data.data.current_page) {
          setHasMore(false);
          setNotifications([...notifications, ...response.data.data.data]);
        } else {
          setCurrentPage(currentPage + 1);
          setNotifications([...notifications, ...response.data.data.data]);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleCreateAnnouncement = async () => {
    try {
      const response = await NotificationService.createNotification(
        props.token
      );
      if (response.status === 200) {
        history.push(`/create-notification/${response.data.data.id}`);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };
  let content;

  if (props.created_by) {
    content = notifications.map((notification) => (
      <TeacherNotificationCard
        key={notification.id}
        notification={notification}
      />
    ));
  } else {
    content = notifications.map((notification) => (
      <NotificationCard key={notification.id} notification={notification} />
    ));
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
        <div className={classes.filterHeader}>
          <FormControl className={classes.formControl}>
            <Select
              labelId="Filter"
              id="demo-simple-select"
              value={filter}
              onChange={handleFilterChange}
              className={classes.selectFiler}
            >
              <MenuItem value={"All"}>All</MenuItem>
              <MenuItem value={"Archived"}>Archived</MenuItem>
              <MenuItem value={"Read"}>Read</MenuItem>
              <MenuItem value={"Unread"}>Unread</MenuItem>
            </Select>
          </FormControl>
        </div>
      )}
      <Box className={classes.cardBoxPadding}>
        <InfiniteScroll
          dataLength={notifications.length}
          next={fetchNotificationOnScroll}
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
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(TeacherNotificationsContainer);
