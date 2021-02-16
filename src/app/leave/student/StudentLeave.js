import React, { useState, useEffect } from "react";
import { makeStyles, Typography, Box } from "@material-ui/core";
import Spinner from "../shared/Spinner";
import Header from "../shared/Header";
import NoLeave from "../shared/NoLeave";
import LeaveCard from "../shared/LeaveCard";
import InfiniteScroll from "react-infinite-scroll-component";
import LeaveService from "../LeaveService";

const useStyles = makeStyles({
  leavesRoot: {
    maxWidth: "100%",
    paddingBottom: "100px",
  },
});

const StudentLeave = () => {
  const classes = useStyles();
  const [hasMore, setHasMore] = useState(true);
  const [allLeaves, setLeaves] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isLoading = true;
    const fetchLeave = async () => {
      try {
        const token = localStorage.getItem("srmToken");
        const response = await LeaveService.fetchAllLeaves(token);
        setLoading(false);
        if (isLoading) {
          setLeaves(response.data.data.data);
          let next_page_url = response.data.data.next_page_url;
          if (next_page_url === null) {
            setHasMore(false);
          } else {
            setNextUrl(next_page_url);
            setCurrentPage(currentPage + 1);
            setHasMore(true);
          }
        }
      } catch (error) {
        setLoading(false);
        console.log("Error: ", error);
      }
    };
    fetchLeave();
    return () => {
      isLoading = false;
    };
  }, []);

  const fetchMoreLeave = async () => {
    try {
      const token = localStorage.getItem("srmToken");
      const response = await LeaveService.fetchMoreLeave(token, nextUrl);
      setLeaves([...allLeaves, ...response.data.data.data]);
      let next_page_url = response.data.data.next_page_url;
      if (next_page_url === null) {
        setHasMore(false);
      } else {
        setNextUrl(next_page_url);
        setCurrentPage(currentPage + 1);
        setHasMore(true);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <Box id="scrollable">
      <Header title />
      <Box className={classes.leavesRoot}>
        <InfiniteScroll
          dataLength={allLeaves.length}
          next={fetchMoreLeave}
          hasMore={hasMore}
          loader={<Spinner />}
          scrollableTarget="scrollable"
          scrollThreshold={0.5}
        >
          <Typography>
            {allLeaves.map((leave) => (
              <LeaveCard leave={leave} />
            ))}
            {!loading && !allLeaves.length ? <NoLeave /> : null}
          </Typography>
        </InfiniteScroll>
      </Box>
    </Box>
  );
};

export default StudentLeave;
