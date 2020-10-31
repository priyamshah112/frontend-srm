import React, { useState, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Grid from "@material-ui/core/Grid";
import Moment from "react-moment";
import LeaveService from "../LeaveService";
import Paper from "@material-ui/core/Paper";
import InfiniteScroll from "react-infinite-scroll-component";
import { useHistory, useParams } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { red, green } from "@material-ui/core/colors";
import CheckIcon from "@material-ui/icons/Check";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    backgroundColor: theme.palette.mainBackground,
    height: "100%",
    marign: "0",
    padding: "0",
    overflow: "auto",
    "&::-webkit-scrollbar": {
      width: 0,
    },
  },
  book:{
    fontFamily: "Avenir Book",
  },
  tabBar: {
    backgroundColor: theme.palette.mainBackground,
    color: theme.palette.common.deluge,
    boxShadow: "none",
  },

  eventsTab: {
    padding: "6px 0px",
    borderBottom: "1px solid #aeaeb2",

    "& .MuiTab-wrapper": {
      height: "30px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "11px",
    },
  },

  borderRight: {
    "& .MuiTab-wrapper": {
      borderRight: "1px solid  #aeaeb2",
    },
  },
  container: {
    width: "100%",
    backgroundColor: theme.palette.mainBackground,
    height: "100%",
    marign: "0",
    padding: "0",
    overflow: "auto",

    "&::-webkit-scrollbar": {
      width: 0,
    },
  },
  paper: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    boxShadow: "none",
    margin: "15px",
    padding: "10px",
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
  },
  center: {
    paddingLeft: "12px",
  },
  uppertext: {
    marginBottom: "4px",
    fontFamily: "Avenir Medium",
  },
  newclass: {},
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
  root: {
    height: "100%",
    overflow: "auto",
    "& > span": {
      margin: theme.spacing(2),
    },
  },
  loading: {
    textAlign: "center",
    justifyContent: "center",
    margin: "auto",
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
    backgroundColor: "#fff",
    borderRadius: "50%",
    display: "inline-block",
    border: "1px solid red",
    width: "16px",
    height: "16px",
  },
  createButtonIconCircleOk: {
    backgroundColor: "#fff",
    borderRadius: "50%",
    display: "inline-block",
    border: "1px solid green",
    width: "16px",
    height: "16px",
    marginLeft: "5px",
  },
  Approved: {
    color: "#40BD13",
    paddingTop:"25px",
  },
  Cancelled: {
    color: "#3076A1",
    paddingTop:"25px",

  },
  Rejected: {
    color: "#D92424",
    paddingTop:"25px",

  },
  leavereason: {
    fontSize: "15px",
    "white-space": "pre-wrap"
  },
  name: {
    transform: "translateY(17px)",
    fontFamily: "Avenir Medium",

  },
  emptyView: {
    width: "100%",
    textAlign: "center",
    paddingTop: "100px",
    fontSize: "20px",
  },
}));

const TeacherLeave = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const tabref = useRef(null);
  const [hasMore, setHasMore] = useState(true);
  const [allLeaves, setLeaves] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const { id } = useParams();
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
          let last_page_url = response.data.data.last_page_url;

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
      // console.log(nextUrl)
      const token = localStorage.getItem("srmToken");
      const response = await LeaveService.fetchMoreLeavesQueve(token, nextUrl);

      // for(let row in response.data.data.data){
      //   let id = response.data.data.data[row].user_id;
      //   var useridres = await LeaveService.fetchAllUserdata(id,token);
      //   response.data.data.data[row]['username'] = useridres.data.data.user_details.username ;
      // }
      setLeaves([...allLeaves, ...response.data.data.data]);
      // console.log(response.data.data.next_page_url);
      let next_page_url = response.data.data.next_page_url;
      // console.log(next_page_url);
      if (next_page_url === null) {
        setHasMore(false);
      } else {
        // console.log("here")
        setNextUrl(next_page_url);
        setCurrentPage(currentPage + 1);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const userInfo = JSON.parse(localStorage.getItem("srmUserInfo"));




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
    <div className={classes.container} ref={tabref}>
      <div className={classes.container}>
        <div className={classes.root} id="scrollable">
          {/* <Grid container className={classes.newclass}>
        <Grid item xs={12}> */}
          <InfiniteScroll
            dataLength={allLeaves.length}
            next={fetchMoreLeave}
            hasMore={hasMore}
            loader={
              <>
                <br />
                <div className={classes.loading}>
                  <CircularProgress />
                </div>
                <br />
              </>
            }
            scrollableTarget="scrollable"
            scrollThreshold={0.2}
          >
            {allLeaves.map((leaves) => (
              <Paper className={classes.paper}>
                <div className={classes.rowflex}>
                  <Grid item xs={5}>
                    <div className={classes.rowflex}>
                      <Grid item xs={2}>
                        <img
                          className={classes.img}
                          src={leaves.users.thumbnail}
                        ></img>
                      </Grid>
                      <Grid item xs={6}>
                        <div className={classes.name}>
                          {leaves.users.firstname}&nbsp;{leaves.users.lastname}{" "}
                        </div>
                      </Grid>
                    </div>
                  </Grid>

                  <Grid item xs={5} className={classes.borderLeft}>
                    <Typography variant="h5" className={classes.leavereason}>
                      <div className={classes.uppertext}>
                        <Moment format="D MMM YYYY">{leaves.start_date}</Moment>
            &nbsp; &nbsp; -&nbsp; &nbsp;  

                        <Moment format="D MMM YYYY">{leaves.end_date}</Moment>
                      </div>
                      <div className={classes.book}>
                      {leaves.full_day 
                      ? 
                      (<span>Full day</span>)
                      :
                      (
                        leaves.half_day_half==0?
                        (<span>Half day - First Half</span>)
                        :
                        (<span>Half day - Second Half</span>)
                      
                      )
                      }
                      </div>
                      <div className={classes.book}>Reason - {leaves.reason}</div>
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="h5" className={classes.leavereason}>
                      {leaves.leave_status == "PENDING" ? (
                        <CloseIcon
                          color="action"
                          className={classes.createButtonIconCircle}
                          style={{ color: red[500] }}
                          onClick={(e) => {
                            CancelLeave(leaves.leave_code);
                          }}
                          value={leaves.leave_code}
                        />
                      ) : (
                        ""
                      )}

                      {leaves.leave_status == "PENDING" ? (
                        <CheckIcon
                          color="action"
                          className={classes.createButtonIconCircleOk}
                          onClick={(e) => {
                            ApprovedLeave(leaves.leave_code);
                          }}
                          value={leaves.leave_code}
                          style={{ color: green[500] }}
                        />
                      ) : (
                        ""
                      )}

                      {leaves.leave_status == "PENDING" ? (
                        <div className={classes.uppertext1}>Pending</div>
                      ) : (
                        ""
                      )}

                      {leaves.leave_status == "REJECTED" ? (
                        <div className={classes.Rejected}>Rejected</div>
                      ) : (
                        ""
                      )}

                      {leaves.leave_status == "CANCELLED" ? (
                        <div className={classes.Cancelled}>Cancelled</div>
                      ) : (
                        ""
                      )}

                      {leaves.leave_status == "APPROVED" ? (
                        <div className={classes.Approved}>Approved</div>
                      ) : (
                        ""
                      )}
                    </Typography>
                  </Grid>
                </div>
              </Paper>
            ))}
            {!loading && !allLeaves.length ? (
            <div className={classes.emptyView}>
              <Typography>Don't have any leave for you.</Typography>
            </div>
          ) : null}
          </InfiniteScroll>
          <br />
          <br />
          <br />
          <br />
          {/* </Grid>
        </Grid> */}
        </div>
      </div>
    </div>
  );
};

export default TeacherLeave;
