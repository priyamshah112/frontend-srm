import React, { useState, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Moment from "react-moment";
import LeaveService from "../LeaveService";
import Paper from "@material-ui/core/Paper";
import InfiniteScroll from "react-infinite-scroll-component";
import { useHistory } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { red, green } from "@material-ui/core/colors";
import CheckIcon from "@material-ui/icons/Check";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    backgroundColor: theme.palette.mainBackground,
    height: "100%",
    marign: "0",
    padding: "0",
    overflow: "auto",
    rection: "column",
    "&::-webkit-scrollbar": {
      width: 0,
    },
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
    marginTop: "10px",
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
    margin: "auto",
    border: "1px solid",
    transform: "translateY(10px)",
  },
  center: {
    paddingLeft: "12px",
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
  root: {
    "& > span": {
      margin: "15px",
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
    cursor: "pointer",
  },
  statusIcon: {
    transform: "translateY(2px)",
  },
  createTitle: {
    display: "flex",
    color: `${theme.palette.common.deluge}`,
    transform: "translateY(2px)",
    cursor: "pointer",
  },
  align: {
    textAlign: "justify",
  },
  status: {
    display: "inline-block",
    marginLeft: "5px",
    fontSize: "20px",
  },
  createButtonIconCircle: {
    cursor: "pointer",
    backgroundColor: "#fff",
    borderRadius: "100%",
    display: "inline-block",
    border: "1px solid red",
    width: "18px",
    height: "18px",
    marginRight: "30px",
  },
  createButtonIconCircle1: {
    cursor: "pointer",
    backgroundColor: "#fff",
    borderRadius: "100%",
    display: "inline-block",
    border: "1px solid red",
    width: "18px",
    height: "18px",
    marginRight: "7px",
  },
  createButtonIconCircleOk: {
    backgroundColor: "#fff",
    borderRadius: "50%",
    display: "inline-block",
    border: "1px solid green",
    width: "18px",
    height: "18px",
    marginTop: "25px",
    margin: "auto",
    cursor: "pointer",
  },
  Seen: {
    color: "#40BD13",
    paddingTop: "25px",
  },
  Cancelled: {
    color: "#D92424",
    paddingTop: "25px",
  },
  Approved1: {
    color: "#40BD13",
    padding: "2px",
    transform: "translateY(-3px)",
    textAlign: "center",
  },
  Cancelled1: {
    color: "#3076A1",
    transform: "translateY(-3px)",
    padding: "2px",
    textAlign: "center",
  },
  Rejected1: {
    color: "#D92424",
    transform: "translateY(-3px)",
    padding: "2px",
    textAlign: "center",
  },
  book: {
    fontFamily: "Avenir Book",
  },
  name: {
    transform: "translateY(10px)",
    textAlign: "left",
    paddingLeft: "15px",
    fontFamily: "Avenir Medium",
    fontSize: "1rem",
  },
  name1: {
    transform: "translateY(17px)",
    textAlign: "left",
    paddingLeft: "15px",
    fontFamily: "Avenir Medium",
  },
  stat: {
    textAlign: "right",
    transform: "translateY(10px)",
    paddingTop: "25px",
  },
  stat2: {
    textAlign: "right",
    transform: "translateY(10px)",
    paddingTop: "15px",
    textAlign: "center",
  },
  stat1: {
    textAlign: "right",
    transform: "translateY(-25px)",
  },
  stat11: {
    textAlign: "center",
    transform: "translateY(3px)",
  },
  emptyView: {
    width: "100%",
    textAlign: "center",
    paddingTop: "100px",
    fontSize: "20px",
  },
  leavereason: {
    "white-space": "pre-wrap",
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={4}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const TeacherLeave = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const tabref = useRef(null);
  const [hasMore, setHasMore] = useState(true);
  const [hasMore2, setHasMore2] = useState(true);
  const [allLeaves, setLeaves] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [nextUrl2, setNextUrl2] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [allLeavesStud, setLeavesStudent] = useState([]);
  const [showNoContentMsg, setNocontentmsg] = useState(false);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

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
    const fetchLeaveStudent = async () => {
      try {
        const token = localStorage.getItem("srmToken");
        const response = await LeaveService.fetchAllLeavesQueve(token);
        if (isLoading) {
          setLeavesStudent(response.data.data.data);
          if (response.data.data.data.length === 0) {
            setNocontentmsg(true);
          }
          let next_page_url = response.data.data.next_page_url;
          if (next_page_url === null) {
            setHasMore2(false);
          } else {
            setNextUrl2(next_page_url);
            setCurrentPage(currentPage + 1);
            setHasMore2(true);
          }
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    fetchLeaveStudent();
    fetchLeave();
    return () => {
      isLoading = false;
    };
  }, []);

  const fetchLeaveStudent = async () => {
    try {
      const token = localStorage.getItem("srmToken");
      const response = await LeaveService.fetchAllLeavesQueve(token);
      for (let row in response.data.data.data) {
        setLeavesStudent(response.data.data.data);
        if (response.data.data.data.length === 0) {
          setNocontentmsg(true);
        }
        let next_page_url = response.data.data.next_page_url;
        if (next_page_url === null) {
          setHasMore2(false);
        } else {
          setNextUrl2(next_page_url);
          setCurrentPage(currentPage + 1);
          setHasMore2(true);
        }
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

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

  const fetchMoreLeaveStudent = async () => {
    try {
      const token = localStorage.getItem("srmToken");
      const response = await LeaveService.fetchMoreLeavesQueve(token, nextUrl2);
      setLeavesStudent([...allLeavesStud, ...response.data.data.data]);
      if (response.data.data.data.length === 0) {
        setNocontentmsg(true);
      }
      let next_page_url = response.data.data.next_page_url;
      if (next_page_url === null) {
        setHasMore2(false);
      } else {
        setNextUrl2(next_page_url);
        setCurrentPage(currentPage + 1);
        setHasMore2(true);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
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

  const SeenLeave = async (event) => {
    try {
      const token = localStorage.getItem("srmToken");

      const response = await LeaveService.putLeave(
        {
          leavecode: event,
          leavestatus: "SEEN",
        },
        token
      );
      if (response.status === 200) {
        fetchLeaveStudent();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={classes.container} ref={tabref} id="scrollable">
      <AppBar position="sticky" className={classes.tabBar}>
        <Tabs
          centered
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          className={classes.tabs}
        >
          <Tab
            label="My Leave"
            {...a11yProps(0)}
            className={`${classes.eventsTab} ${classes.borderRight}`}
          />
          <Tab
            label="Student Leave"
            {...a11yProps(1)}
            className={classes.eventsTab}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <div className={classes.container} id="scrollable">
          <div className={classes.root}>
            <div className={classes.headerText}>
              <Typography variant="body1" className={classes.status}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={classes.statusIcon}
                  width="18"
                  height="20"
                  viewBox="0 0 14 18"
                >
                  <defs>
                    <style></style>
                  </defs>
                  <g transform="translate(-10.439 -7)">
                    <path
                      class="a"
                      d="M21.153,7H11V25H25V10.517Zm.186,1.017,2.542,2.324-2.542,0ZM11.646,24.393V7.607h9.046v3.337l3.662.005V24.393Z"
                      transform="translate(-0.561)"
                    />
                    <rect
                      class="a"
                      width="6"
                      transform="translate(13.065 8.878)"
                    />
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
                    <rect
                      class="a"
                      width="9.197"
                      transform="translate(13 16.806)"
                    />
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
                <span className={classes.status}>Status</span>
              </Typography>
              <Typography variant="body2" className={classes.createHeader}>
                <AddCircleIcon
                  color="primary"
                  className={classes.createButtonIcon}
                  onClick={(event) => {
                    history.push("/leave/create");
                  }}
                />
                <span className={classes.createTitle}>New</span>
              </Typography>
            </div>

            <Grid container className={classes.newclass}>
              <Grid item xs={12}>
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
                  scrollThreshold={0.5}
                >
                  <Typography variant="h8">
                    {allLeaves.map((leaves) => (
                      <Paper className={classes.paper}>
                        <div className={classes.rowflex}>
                          <Grid item xs={10} className={classes.align}>
                            <Typography
                              variant="body1"
                              className={classes.leavereason}
                            >
                              <div className={classes.uppertext}>
                                <Moment format="D MMM YYYY">
                                  {leaves.start_date}
                                </Moment>
                                &nbsp; &nbsp; -&nbsp; &nbsp;
                                <Moment format="D MMM YYYY">
                                  {leaves.end_date}
                                </Moment>
                              </div>
                              <div className={classes.book}>
                                {leaves.full_day ? (
                                  <span>Full day</span>
                                ) : leaves.half_day_half == 0 ? (
                                  <span>Half day - First Half</span>
                                ) : (
                                  <span>Half day - Second Half</span>
                                )}
                              </div>
                              <div className={classes.book}>
                                Reason - {leaves.reason}
                              </div>
                            </Typography>
                          </Grid>

                          <Grid item xs={2} className={classes.stat2}>
                            <Typography
                              variant="body1"
                              className={classes.leavereason}
                            >
                              {leaves.leave_status == "PENDING" ? (
                                <CloseIcon
                                  color="action"
                                  className={classes.createButtonIconCircle1}
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
                                <div className={classes.stat11}>Pending</div>
                              ) : (
                                ""
                              )}

                              {leaves.leave_status == "REJECTED" ? (
                                <div className={classes.Rejected1}>
                                  Rejected
                                </div>
                              ) : (
                                ""
                              )}

                              {leaves.leave_status == "CANCELLED" ? (
                                <div className={classes.Cancelled1}>
                                  Cancelled
                                </div>
                              ) : (
                                ""
                              )}

                              {leaves.leave_status == "APPROVED" ? (
                                <div className={classes.Approved1}>
                                  Approved
                                </div>
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
                        <Typography>You don't have any leave.</Typography>
                      </div>
                    ) : null}
                  </Typography>
                </InfiniteScroll>
                <br /> <br /> <br />
                <br />
              </Grid>
            </Grid>
          </div>
        </div>
      </TabPanel>

      <TabPanel value={value} index={1} className={classes.newclass}>
        <div className={classes.container} id="scrollable">
          <div className={classes.root}>
            <Grid container className={classes.newclass}>
              <Grid item xs={12}>
                <InfiniteScroll
                  dataLength={allLeaves.length}
                  next={fetchMoreLeaveStudent}
                  hasMore={hasMore2}
                  loader={
                    <>
                      <br />
                      {showNoContentMsg ? (
                        "No data available"
                      ) : (
                        <div className={classes.loading}>
                          <CircularProgress />
                        </div>
                      )}

                      <br />
                    </>
                  }
                  scrollableTarget="scrollable"
                  scrollThreshold={0.5}
                >
                  {allLeavesStud.map((leaves) => (
                    <Paper className={classes.paper}>
                      <div className={classes.rowflex}>
                        <Grid item xs={12} lg={5} md={5} sm={6}>
                          <div className={classes.rowflex}>
                            <Grid item xs={2}>
                              <img
                                className={classes.img}
                                src={leaves.users.thumbnail}
                              ></img>
                              {/* <svg className="MuiSvgIcon-root MuiAvatar-fallback" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg> */}
                            </Grid>
                            <Grid item xs={6}>
                              <div className={classes.name}>
                                {leaves.users.firstname}&nbsp;
                                {leaves.users.lastname}{" "}
                              </div>
                              <div className={classes.name1}>
                                {`${leaves.users.user_classes.classes_data}` ===
                                "null" ? (
                                  <div></div>
                                ) : (
                                  <div>
                                    {
                                      leaves.users.user_classes.classes_data
                                        .class_name
                                    }
                                  </div>
                                )}
                              </div>
                            </Grid>
                          </div>
                        </Grid>

                        <Grid
                          item
                          xs={12}
                          lg={5}
                          md={5}
                          sm={6}
                          className={classes.borderLeft}
                        >
                          <Typography
                            variant="body1"
                            className={classes.leavereason}
                          >
                            <div className={classes.uppertext}>
                              <Moment format="D MMM YYYY">
                                {leaves.start_date}
                              </Moment>
                              &nbsp; -&nbsp;
                              <Moment format="D MMM YYYY">
                                {leaves.end_date}
                              </Moment>
                            </div>
                            <div className={classes.book}>
                              {leaves.full_day ? (
                                <span>Full day</span>
                              ) : leaves.half_day_half == 0 ? (
                                <span>Half day - First Half</span>
                              ) : (
                                <span>Half day - Second Half</span>
                              )}
                            </div>
                            <div className={classes.book}>
                              Reason - {leaves.reason}
                            </div>
                          </Typography>
                        </Grid>
                        <Grid item xs={12} lg={2} md={2} sm={12}>
                          <Typography
                            variant="body1"
                            className={classes.leavereason}
                          >
                            {leaves.leave_status == "PENDING" ? (
                              <CheckIcon
                                color="action"
                                className={`${classes.createButtonIconCircleOk} ${classes.actionBtns}`}
                                onClick={(e) => {
                                  SeenLeave(leaves.leave_code);
                                }}
                                value={leaves.leave_code}
                                style={{ color: green[500] }}
                              />
                            ) : (
                              ""
                            )}

                            {leaves.leave_status == "CANCELLED" ? (
                              <div className={classes.Cancelled}>Cancelled</div>
                            ) : (
                              ""
                            )}

                            {leaves.leave_status == "SEEN" ? (
                              <div className={classes.Seen}>Seen</div>
                            ) : (
                              ""
                            )}
                          </Typography>
                        </Grid>
                      </div>
                    </Paper>
                  ))}
                  {!loading && !allLeavesStud.length ? (
                    <div className={classes.emptyView}>
                      <Typography>You don't have any leave.</Typography>
                    </div>
                  ) : null}
                </InfiniteScroll>
                <br /> <br /> <br />
                <br />
              </Grid>
            </Grid>
          </div>
        </div>
      </TabPanel>
    </div>
  );
};

export default TeacherLeave;
