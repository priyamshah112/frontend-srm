import "date-fns";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Typography, makeStyles, CircularProgress } from "@material-ui/core";
import { studentSideData } from "../redux/actions/attendence.action";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import * as moment from "moment";
import InfiniteRoll from "../common/infinteScroll";

const useStyles = makeStyles((theme) => ({
  CircularProgress: {
    margin: "8px",
    textAlign: "center",
  },
  message: {
    textAlign: "center",
    fontSize: 14,
    fontFamily: "Avenir Book",
    padding: "20px",
  },
  sectionContainer: {
    height: "100%",
    width: "100%",
    // paddingBottom: "75px",
    overflowY: "auto",
  },

  header: {
    paddingRight: "20px",
    paddingLeft: "20px",
    paddingBottom: "85px",
  },
  header2: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "left",
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
    cursor: "pointer",
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
  loading: {
    width: "100%",
    textAlign: "center",
    paddingTop: "8px",
    fontSize: "20px",
  },
  fieldStyle: {
    width: "180px",
    marginleft: "15px",
    marginTop: "15px",
    marginRight: "15px",
    fontFamily: "Avenir Book",
    fontSize: " 1rem",
    "& .MuiInput-underline:before": {
      borderBottom: "2px solid #eaeaea",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottom: "2px solid #7B72AF",
      transitionProperty: "border-bottom-color",
      transitionDuration: "500ms",
      transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
  },
  menuList: {
    width: "100% !important",
    padding: 0,
  },
  menuContainer: {
    backgroundColor: theme.palette.common.darkGray,
    color: "black",
    minWidth: "150px",
    "&.MuiPaper-rounded": {
      boxShadow: "0px 6px 6px #00000029",
    },
    [theme.breakpoints.down("md")]: {
      minWidth: "150px",
    },
    [theme.breakpoints.down("sm")]: {
      minWidth: "150px",
    },
  },
  card: {
    // width: "100%",
    marginTop: "20px",
  },
  cardForTeacher: {
    margin: "20px",
  },
  cardContent: {
    padding: "20px !important",
    overflow: "auto",
  },
  textAlignRight: {
    textAlign: "right",
    color: "#AEAEB2",
  },
  labelText: {
    fontStyle: "normal",
    fontSize: "14px !important",
    fontFamily: "Avenir Roman",
  },
  typography: {
    cursor: "pointer",
    fontFamily: "Avenir Book",
    fontSize: 14,
    color: "#AEAEB2",
  },
  span: {
    textTransform: "capitalize",
  },
  imgDiv: {
    display: "flex",
    justifyContent: "flex-end",
    margin: "-2px 0",
    transform: "translateY(5px)",
    color: "#AEAEB2",
  },
  editBtn: {
    width: "19px",
    height: "19px",
    transform: "translateY(4px)",
    cursor: "pointer",
    marginTop: "-3px",
  },
  Del_img: {
    cursor: "pointer",
    marginLeft: "10px",
  },
  circularProgress: {
    textAlign: "center",
    padding: "20px",
  },
  title: {
    fontFamily: "Avenir heavy",
    fontSize: 14,
    color: "#2C2C2E",
    marginBottom: "12px",
  },
  InfiniteScroll: {
    overflow: "revert !important",
    "& .infinite-scroll-component": {
      overflow: "revert !important",
    },
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingBottom: "76px",
  },
  container: {
    // height: "100%",
    width: "100%",
    boxSizing: "border-box",
    padding: "0 20px",
    marginBottom: "85px",
  },
  heading: {
    fontFamily: "Avenir Medium",
    fontSize: 18,
    color: "#1C1C1E",
    paddingTop: "20px",
    textAlign: "center",
  },
}));

const StudentDiary = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationInfo, setInfo] = useState({});
  const { selectedRole } = props;
  console.log("paginationInfo :>> ", data);

  const onSuccess = (result) => {
    console.log("result :>> ", result);
    if (result) {
      setLoading(false);
      setData([...data, ...result.data.data]);
      setInfo(result.data);
    }
  };
  const fetchData = (currentPage) => {
    if (currentPage) {
      props.studentSideData(currentPage, onSuccess);
    } else {
      const page = 1;
      props.studentSideData(page, onSuccess);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleLoadMore = (e) => {
    // console.log("event", e);
    // console.log("clientHeigh :>> ", e.target.clientHeigh);
    // console.log("scrollTop :>> ", e.target.scrollTop);
    // console.log("scrollHeight :>> ", e.target.scrollHeight);
    let bottom =
      e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop < 20;
    console.log("bottom :>> ", bottom);
    if (paginationInfo.last_page > currentPage) {
      if (bottom && !loading) {
        let page = currentPage + 1;
        fetchData(page);
        setLoading(true);
        setCurrentPage(page);
      }
    }
  };

  let content = data.map((item) => {
    return (
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Grid container>
            <Grid item xs={8}>
              <span>
                {item.title === null ? (
                  <Typography className={classes.title}>N/A</Typography>
                ) : (
                  <Typography className={classes.title}>
                    {item.title}
                  </Typography>
                )}
              </span>
            </Grid>
            <Grid item xs={4}>
              <Typography
                className={`${classes.textAlignRight} ${classes.labelText}`}
                variant="body2"
              >
                {moment(item.created_at).format("DD MMM YY")}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid
              item
              xs={8}
              style={{ cursor: "pointer" }}
              onClick={() => history.push(`/diary/diary-details/${item.id}`)}
            >
              <Typography className={`${classes.typography}`}>
                <Typography></Typography>
                Click here to check more details.
              </Typography>
            </Grid>
            <Grid item xs={4}>
              {props.selectedRole === "teacher" ||
              props.selectedRole === "admin" ? (
                <Typography
                  className={`${classes.labelText} ${classes.textAlignRight}`}
                  variant="body2"
                >
                  <span className={`${classes.span}`}>{item.status}</span>
                </Typography>
              ) : (
                ""
              )}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} className={classes.imgGrid}></Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  });

  return (
    <div onScroll={handleLoadMore} className={classes.sectionContainer}>
      <Typography className={classes.heading}>Diary</Typography>

      <div className={classes.container}>
        {content}
        {loading ? (
          <div className={classes.CircularProgress}>
            <CircularProgress color="primary" size={30} />
          </div>
        ) : (
          ""
        )}
      </div>
      {!data[0] ? (
        !loading ? (
          <Typography className={classes.message}>
            No diary record available yet!
          </Typography>
        ) : (
          ""
        )
      ) : (
        ""
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  const {
    studentSideData,
    studentSideDataLoading,
    studentSideDataInfo,
    hasMore,
  } = state.Attendence;
  return {
    data: studentSideData,
    paginationInfo: studentSideDataInfo,
    loading: studentSideDataLoading,
    selectedRole: state.auth.selectedRole,
  };
};

export default connect(mapStateToProps, {
  studentSideData,
})(StudentDiary);
