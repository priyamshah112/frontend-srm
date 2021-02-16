import React, { useState, useEffect } from "react";
import { makeStyles, Box } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";
import Header from "../shared/Header";
import Spinner from "../shared/Spinner";
import NoLeave from "../shared/NoLeave";
import LeaveCard from "../shared/LeaveCard";
import { useHistory } from "react-router-dom";
import LeaveService from "../LeaveService";

const useStyles = makeStyles({
  leavesRoot: {
    maxWidth: "100%",
    paddingBottom: "100px",
  },
});

const ParentHomeLeave = () => {
  const classes = useStyles();
  const [hasMore, setHasMore] = useState(true);
  const [allLeaves, setLeaves] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    let isLoading = true;
    const fetchLeave = async () => {
      try {
        const token = localStorage.getItem("srmSelected_Child_token");
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

  const CancelLeave = async (event) => {
    try {
      const token = localStorage.getItem("srmToken");
      const response = await LeaveService.putLeave(
        {
          leavecode: event,
          leavestatus: "CANCELLED",
        },
        token
      );
      if (response.status === 200) {
        history.replace("/leave");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box id="scrollable">
      <Header
        title
        newLeaveBtn
        newLeaveBtnHandler={(_event) => {
          history.push("/leave/create");
        }}
      />
      <Box className={classes.leavesRoot}>
        <InfiniteScroll
          dataLength={allLeaves.length}
          next={fetchMoreLeave}
          hasMore={hasMore}
          loader={<Spinner />}
          scrollableTarget="scrollable"
          scrollThreshold={0.5}
        >
          {allLeaves.map((leave) => (
            <LeaveCard leave={leave} cancelBtnHandler={CancelLeave} />
          ))}
          {!loading && !allLeaves.length ? <NoLeave /> : null}
        </InfiniteScroll>
      </Box>
    </Box>
  );
};

export default ParentHomeLeave;
