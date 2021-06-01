import React, { useState, useRef, useEffect } from "react";
import {
  makeStyles,
  AppBar,
  Tabs,
  Tab,
  Box,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import Header from "../shared/Header";
import Spinner from "../shared/Spinner";
import NoLeave from "../shared/NoLeave";
import LeaveCard from "../shared/LeaveCard";
import InfiniteScroll from "react-infinite-scroll-component";
import Moment from "react-moment";
import LeaveService from "../LeaveService";
import { useHistory } from "react-router-dom";
import CheckIcon from "@material-ui/icons/Check";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  tabBar: {
    backgroundColor: theme.palette.mainBackground,
    color: theme.palette.common.deluge,
    boxShadow: "none",
  },
  tabPanel: {
    width: "100%",
    margin: "0 auto",
    marginTop: "10px",
  },
  uppertext: {
    fontFamily: "Avenir Medium",
    fontSize: "14px",
    color: "#1C1C1E",
    paddingBottom: "2px",
  },
  eventsTab: {
		padding: '6px 0px',
		borderBottom: '1px solid #aeaeb2',

		'& .MuiTab-wrapper': {
			height: '30px',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '11px',
		},
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
    width: "calc(100% - 60px)",
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
    margin: "auto",
    border: "1px solid",
    marginTop: "5px",
  },
  center: {
    paddingLeft: "12px",
  },
  borderLeft: {
    borderLeft: "2px solid #dedede",
    textAlign: "left",
    paddingLeft: "10px",
  },
  align: {
    textAlign: "justify",
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
    color: green[500],
  },
  Seen: {
    color: "#40BD13",
    paddingTop: "20px",
    fontSize: "14px",
  },
  Cancelled: {
    color: "#D92424",
    paddingTop: "20px",
    fontSize: "14px",
  },
  Approved1: {
    color: "#40BD13",
    padding: "2px",
    transform: "translateY(-3px)",
    textAlign: "center",
  },
  Cancelled1: {
    color: "#D92424",
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
    "& > *": {
      fontSize: "14px",
    },
  },
  name: {
    transform: "translateY(10px)",
    textAlign: "left",
    paddingLeft: "15px",
    fontFamily: "Avenir Medium",
    fontSize: "14px",
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
  leavereason: {
    "white-space": "pre-wrap",
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
  activeTab: {
    fontWeight: 800,
  },
  pendingBtnContainer: {
    paddingRight: "10px",
    marginTop: "-4px",
  },
}));

function TabPanel(props) {
	const { children, value, index, ...other } = props

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			{value === index && <Box>{children}</Box>}
		</div>
	)
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const TeacherLeave = () => {
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
      for (let _row in response.data.data.data) {
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

  const handleChange = (_event, newValue) => setValue(newValue);

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
    <Box ref={tabref} id="scrollable">
      <AppBar position="sticky" className={classes.tabBar}>
        <Tabs
							centered
							value={value}
							onChange={handleChange}
							indicatorColor='primary'
							textColor='primary'
							variant='fullWidth'
        >
          <Tab
            label="My Leave"
            {...a11yProps(0)}
            className={`${classes.eventsTab} ${classes.borderRight}`}
          />
          <Tab
            label="Student Leave"
            {...a11yProps(1)}
            className={`${classes.eventsTab}`}
          />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <Header
          title={false}
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
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Box className={classes.leavesRoot}>
          <InfiniteScroll
            dataLength={allLeaves.length}
            next={fetchMoreLeaveStudent}
            hasMore={hasMore2}
            loader={<Spinner />}
            scrollableTarget="scrollable"
            scrollThreshold={0.5}
          >
            {allLeavesStud.map((leaves) => (
              <Paper className={classes.paper}>
                <Box className={classes.rowflex}>
                  <Grid item xs={12} lg={4} md={4} sm={6}>
                    <Box className={classes.rowflex}>
                      <Grid style={{ marginRight: "7px" }} item xs={2}>
                        <img
                          className={classes.img}
                          src={leaves.users.thumbnail}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Box className={classes.name}>
                          {leaves.users.firstname}&nbsp;
                          {leaves.users.lastname}
                        </Box>
                        <Box className={classes.name1}>
                          {`${leaves.users.user_classes.classes_data}` ===
                          "null" ? null : (
                            <Box
                              style={{
                                fontFamily: "Avenir Medium",
                                fontSize: "14px",
                              }}
                            >
                              {
                                leaves.users.user_classes.classes_data
                                  .class_name
                              }
                            </Box>
                          )}
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
                    <Typography className={classes.leavereason}>
                      <Box className={classes.uppertext}>
                        <Moment format="D MMM YYYY">{leaves.start_date}</Moment>
                        &nbsp; -&nbsp;
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
                      <Typography className={classes.reason}>
                        Reason - {leaves.reason}
                      </Typography>
                    </Typography>
                  </Grid>

                  <Grid item xs={12} lg={2} md={2} sm={12}>
                    <Box className={classes.leaveStatus}>
                      {leaves.leave_status == "PENDING" ? (
                        <Box className={classes.pendingBtnContainer}>
                          <CheckIcon
                            color="action"
                            className={`${classes.createButtonIconCircleOk} ${classes.actionBtns}`}
                            onClick={(_event) => SeenLeave(leaves.leave_code)}
                            value={leaves.leave_code}
                          />
                        </Box>
                      ) : null}

                      {leaves.leave_status == "CANCELLED" ? (
                        <Typography className={classes.Cancelled}>
                          Cancelled
                        </Typography>
                      ) : null}

                      {leaves.leave_status == "SEEN" ? (
                        <Typography className={classes.Seen}>Seen</Typography>
                      ) : null}
                    </Box>
                  </Grid>
                </Box>
              </Paper>
            ))}
            {!loading && !allLeavesStud.length ? <NoLeave /> : null}
          </InfiniteScroll>
        </Box>
      </TabPanel>
    </Box>
  );
};

export default TeacherLeave;
