import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import InfiniteScroll from "react-infinite-scroll-component";
import { Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import AnnouncementCard from "./AnnouncementCard";
import HomeService from "../HomeSerivce";
import { set } from "date-fns";
const useStyles = makeStyles((theme) => ({
  loading: {
    width: "100%",
    textAlign: "center",
    paddingTop: "8px",
    fontSize: "20px",
  },
}));

const Announcements = (props) => {
  const location = useLocation();
  const classes = useStyles();
  const [announcements, setAnnouncements] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // const [isAnnouncementLoading, setIsAnnouncementLoading] = useState(true);
  useEffect(() => {
    // if (isAnnouncementLoading) {
    let isAnnouncementLoading = true;
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("srmToken");
        const selectedRole = props.selectedRole;
        const response = await HomeService.fetchAnnouncements(
          { selectedRole, currentPage },
          token
        );

        if (response.status === 200) {
          if (
            response.data.data.current_page === response.data.data.last_page
          ) {
            if (isAnnouncementLoading) {
              setAnnouncements([...announcements, ...response.data.data.data]);
              setHasMore(false);
            }
          } else {
            if (isAnnouncementLoading) {
              setAnnouncements([...announcements, ...response.data.data.data]);
              setCurrentPage(currentPage + 1);
            }
          }
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();

    return () => {
      isAnnouncementLoading = false;
    };
  }, []);

  const fetchAnnouncementOnScroll = async () => {
    try {
      const token = localStorage.getItem("srmToken");
      const selectedRole = props.selectedRole;
      const response = await HomeService.fetchAnnouncements(
        { selectedRole, currentPage },
        token
      );

      if (response.status === 200) {
        if (response.data.data.current_page !== response.data.data.last_page) {
          setAnnouncements([...announcements, ...response.data.data.data]);
          setCurrentPage(currentPage + 1);
        } else {
          setAnnouncements([...announcements, ...response.data.data.data]);

          setHasMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  let content = announcements.map((announcement, index) => {
    return <AnnouncementCard key={index} announcement={announcement} />;
  });
  return (
    <InfiniteScroll
      dataLength={announcements.length}
      next={fetchAnnouncementOnScroll}
      hasMore={hasMore}
      loader={
        <>
          <div className={classes.loading}>
            {/* <Typography>Loading...</Typography> */}
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
  );
};

const mapStateToProps = (state) => {
  return {
    selectedRole: state.auth.selectedRole,
  };
};

export default connect(mapStateToProps)(Announcements);
