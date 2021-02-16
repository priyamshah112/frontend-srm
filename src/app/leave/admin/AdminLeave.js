import React, { useState, useRef, useEffect } from "react";
import { makeStyles, Grid, Paper, Typography, Box } from "@material-ui/core";
import NoLeave from "../shared/NoLeave";
import Spinner from "../shared/Spinner";
import Header from "../shared/Header";
import Moment from "react-moment";
import InfiniteScroll from "react-infinite-scroll-component";
import { useHistory } from "react-router-dom";
import LeaveService from "../LeaveService";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";
import { red, green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: "100px",
    width: "calc(100% - 40px)",
    margin: "10px",
  },
  book: {
    fontFamily: "Avenir Book",
  },
  tabBar: {
    backgroundColor: theme.palette.mainBackground,
    color: theme.palette.common.deluge,
    boxShadow: "none",
  },
  borderRight: {
    "& .MuiTab-wrapper": {
      borderRight: "1px solid  #aeaeb2",
    },
  },
  paper: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    boxShadow: "none",
    marginTop: "20px",
    padding: "10px",
    borderRadius: "5px",
    width: "calc(100% - 40px)",
    margin: "0 auto",
  },
  left: {
    paddingRight: "12px",
    borderRight: "1px solid #cacacc",
  },
  rowflex: {
    display: "flex",
    flexWrap: "wrap",
  },
  img: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    marginLeft: "auto",
    border: "1px solid",
    marginTop: "5px",
  },
  center: {
    paddingLeft: "12px",
  },
  uppertext: {
    fontFamily: "Avenir Medium",
    fontSize: "14px",
    color: "#1C1C1E",
    paddingBottom: "2px",
  },
  borderLeft: {
    borderLeft: "2px solid #dedede",
    textAlign: "left",
    paddingLeft: "10px",
  },
  create: {
    float: "right",
    paddingRight: "21px",
    paddingTop: "8px",
  },
  createHeader: {
    display: "flex",
    float: "right",
  },
  createButtonIcon: {
    paddingRight: "5px",
  },
  createTitle: {
    display: "flex",
    paddingTop: "4px",
  },
  align: {
    textAlign: "justify",
    paddingLeft: "8px",
  },
  status: {
    display: "inline-block",
    paddingTop: "8px",
    marginLeft: "2px",
  },
  createButtonIconCircle: {
    cursor: "pointer",
    backgroundColor: "#fff",
    borderRadius: "50%",
    display: "inline-block",
    border: "1px solid red",
    width: "16px",
    height: "16px",
    marginRight: "12px",
    color: red[500],
  },
  createButtonIconCircleOk: {
    cursor: "pointer",
    backgroundColor: "#fff",
    borderRadius: "50%",
    display: "inline-block",
    border: "1px solid green",
    width: "16px",
    height: "16px",
    color: green[500],
  },
  Pending: {
    paddingTop: "6px",
    fontSize: "14px",
  },
  Approved: {
    color: "#40BD13",
    paddingTop: "10px",
    fontSize: "14px",
  },
  Cancelled: {
    color: "#D92424",
    paddingTop: "10px",
    fontSize: "14px",
  },
  Rejected: {
    color: "#D92424",
    paddingTop: "10px",
    fontSize: "14px",
  },
  leavereason: {
    fontSize: "15px",
    "white-space": "pre-wrap",
  },
  name: {
    transform: "translateY(10px)",
    textAlign: "left",
    paddingLeft: "15px",
    paddingTop: "12px",
    fontFamily: "Avenir Medium",
    fontSize: "14px",
  },
  book: {
    fontFamily: "Avenir Book",
    "& > *": {
      fontSize: "14px",
    },
  },
  leaveStatus: {
    textAlign: "right",
    paddingRight: "10px",
  },
  reason: {
    fontFamily: "Avenir Medium",
  },
  leavesRoot: {
    maxWidth: "100%",
    paddingBottom: "100px",
  },
}));

const TeacherLeave = () => {
  const classes = useStyles();
  const tabref = useRef(null);
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
        const token = localStorage.getItem("srmToken");
        const response = await LeaveService.fetchAllLeavesQueve(token);
        setLoading(false);
        if (isLoading) {
          setLeaves(response.data.data.data);
          let next_page_url = response.data.data.next_page_url;
          if (next_page_url === null) {
            setHasMore(false);
          } else {
            setNextUrl(next_page_url);
            setCurrentPage(currentPage + 1);
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
      const response = await LeaveService.fetchMoreLeavesQueve(token, nextUrl);
      setLeaves([...allLeaves, ...response.data.data.data]);
      let next_page_url = response.data.data.next_page_url;
      if (next_page_url === null) {
        setHasMore(false);
      } else {
        setNextUrl(next_page_url);
        setCurrentPage(currentPage + 1);
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
          leavestatus: "REJECTED",
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

  const ApprovedLeave = async (event) => {
    try {
      const token = localStorage.getItem("srmToken");
      const response = await LeaveService.putLeave(
        {
          leavecode: event,
          leavestatus: "APPROVED",
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
    <Box className={classes.root} ref={tabref} id="scrollable">
      <Header title titleText="Teacher's Leaves" />
      <InfiniteScroll
        dataLength={allLeaves.length}
        next={fetchMoreLeave}
        hasMore={hasMore}
        loader={<Spinner />}
        scrollableTarget="scrollable"
        scrollThreshold={0.2}
      >
        {allLeaves.map((leaves) => (
          <Paper className={classes.paper}>
            <Box className={classes.rowflex}>
              <Grid item xs={12} lg={4} md={4} sm={6}>
                <Box className={classes.rowflex}>
                  <Grid style={{ marginRight: "7px" }} item xs={2}>
                    <img className={classes.img} src={leaves.users.thumbnail} />
                  </Grid>
                  <Grid item xs={6}>
                    <Box className={classes.name}>
                      {leaves.users.firstname}&nbsp;{leaves.users.lastname}
                    </Box>
                  </Grid>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                lg={6}
                md={6}
                sm={6}
                className={classes.borderLeft}
              >
                <Typography variant="body1" className={classes.leavereason}>
                  <Box className={classes.uppertext}>
                    <Moment format="D MMM YYYY">{leaves.start_date}</Moment>
                    &nbsp; &nbsp; -&nbsp; &nbsp;
                    <Moment format="D MMM YYYY">{leaves.end_date}</Moment>
                    <span className={classes.book}>
                      {leaves.full_day ? (
                        <span className={classes.book}>
                          &nbsp;&#10629;Full Day&#10630;
                        </span>
                      ) : leaves.half_day_half == 0 ? (
                        <span className={classes.book}>
                          &nbsp;&#10629;Half day - First Half&#10630;
                        </span>
                      ) : (
                        <span className={classes.book}>
                          &nbsp;&#10629;Half day - Second Half&#10630;
                        </span>
                      )}
                    </span>
                  </Box>
                  <Box className={classes.book}>Reason - {leaves.reason}</Box>
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography className={classes.leaveStatus}>
                  <Box style={{ padding: "10px 1px 0px 0px" }}>
                    {leaves.leave_status == "PENDING" ? (
                      <CloseIcon
                        color="action"
                        className={classes.createButtonIconCircle}
                        onClick={(_event) => CancelLeave(leaves.leave_code)}
                        value={leaves.leave_code}
                      />
                    ) : null}

                    {leaves.leave_status == "PENDING" ? (
                      <CheckIcon
                        color="action"
                        className={classes.createButtonIconCircleOk}
                        onClick={(_event) => ApprovedLeave(leaves.leave_code)}
                        value={leaves.leave_code}
                      />
                    ) : null}
                  </Box>

                  {leaves.leave_status == "PENDING" ? (
                    <Box className={classes.Pending}>Pending</Box>
                  ) : null}

                  {leaves.leave_status == "REJECTED" ? (
                    <Box className={classes.Rejected}>Rejected</Box>
                  ) : null}

                  {leaves.leave_status == "CANCELLED" ? (
                    <Box className={classes.Cancelled}>Cancelled</Box>
                  ) : null}

                  {leaves.leave_status == "APPROVED" ? (
                    <Box className={classes.Approved}>Approved</Box>
                  ) : null}
                </Typography>
              </Grid>
            </Box>
          </Paper>
        ))}
        {!loading && !allLeaves.length ? <NoLeave text="No leaves" /> : null}
      </InfiniteScroll>
    </Box>
  );
};

export default TeacherLeave;
