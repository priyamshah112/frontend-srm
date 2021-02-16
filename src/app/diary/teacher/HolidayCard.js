import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import * as moment from "moment";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditIcon from "../../../assets/images/Edit.svg";
import { connect } from "react-redux";
import { holidayAll } from "../../redux/actions/attendence.action";
import { holidayByMonth } from "../../redux/actions/attendence.action";
import { CircularProgress } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  span: {
    textTransform: "capitalize",
  },
  typography: {
    margin: "16px 0",
    marginTop: "-9px",
  },
  card: {
    width: "100%",
    marginTop: "20px",
    borderRadius: 0,
    boxShadow: "none",
    marginLeft: "35px",
  },
  reminder: {
    width: "100%",
    textAlign: "right",
    cursor: "pointer",
  },
  NewsHeader: {
    padding: "8px 16px 8px 16px !important",
    "& span": {
      cursor: "pointer",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "8px 16px 8px 16px !important",
      "& span": {
        fontSize: "16px",
      },
    },
  },
  cardContent: {
    padding: "20px 20px 12px 0 !important",
    // height: "80px",
    overflow: "auto",
    backgroundColor: "white",
  },
  contentMargin: {
    marginTop: "16px",
  },
  announcementText: {
    fontStyle: "normal",
  },
  announcementImg: {
    justifyContent: "center",
    textAlign: "center",
    "& img": {
      maxWidth: "100%",
      border: `1px solid ${theme.palette.common.deluge}`,
      borderRadius: "4px",
    },
  },
  statusText: {
    fontStyle: "normal",
    textTransform: "uppercase",
    paddingTop: "10px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "13px",
    },
  },
  cardActionStyle: {
    padding: "8px 16px 8px 16px",
    color: "#6C757D",
  },
  contentCenter: {
    textAlign: "right",
    height: "50%",

    "& img": {
      marginTop: "25px",
      width: "25px",
      cursor: "pointer",

      [theme.breakpoints.down("xs")]: {
        marginTop: "10px",
      },
    },
    [theme.breakpoints.down("xs")]: {
      textAlign: "right",
    },
  },
  createdDate: {
    padding: "5px 0 5px 0",
  },
  editBtnGrid: {
    textAlign: "right",
  },
  deleteIcon: {
    marginLeft: "10px",
  },
  editBtn: {
    marginLeft: "auto",
    cursor: "pointer",
  },
  cardHeader: {
    padding: "20px 20px 10px",
  },
  labelText: {
    fontStyle: "normal",
    color: "#000",
  },

  editBtnDiv: {
    marginLeft: "auto",
    transform: "translateY(4px)",
  },
  editBtn: {
    width: "19px",
    height: "19px",
    paddingLeft: "10px",
    transform: "translateY(4px)",
    cursor: "pointer",
  },
  deleteBtn: {
    width: "19px",
    height: "19px",
    paddingLeft: "5px",
    cursor: "pointer",
  },
  normalText: {
    fontStyle: "normal",
    color: `${theme.palette.common.blackRussian}`,
    fontWeight: 500,
    opacity: 1,
  },
  textAlignRight: {
    textAlign: "right",
    color: "#AEAEB2",
    fontSize: "0.85rem",
  },
  textAlignRight1: {
    textAlign: "left",
    color: "#AEAEB2",
    fontSize: "0.85rem",
    paddingLeft: "50px",
  },
  gridContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
  imgGrid: {
    position: "relative",
  },
  imgDiv: {
    bottom: "0px",
    // right: "35px",
    // position: "absolute",
    // margin: "16px 0",
    justifyContent: "flex-end",
    display: "flex",
  },
  imgDiv_del: {
    bottom: 0,
    right: 0,
    position: "absolute",
    margin: "16px 0",
    transform: "translateY(5px)",
    cursor: "pointer",
    color: "#AEAEB2",
  },
  circle: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#7B72AF",
    color: "white",
    borderRadius: "50%",
    padding: "25px",
    width: "18px",
    position: "absolute",
    left: "20px",
    marginTop: "-14px",
  },
  Del_img: {
    cursor: "pointer",
    marginLeft: "10px",
    marginTop: "3px",
  },
  cardContainer: {
    display: "flex",
    justifyContent: "flex-start",
    paddingBottom: "70px",
  },
  CircularProgress: {
    display: "flex",
    justifyContent: "center",
    margin: "20px",
  },
  message: {
    width: "100%",
    "& p": {
      textAlign: "center",
      fontSize: 14,
      fontFamily: "Avenir medium",
      margin: "20px",
    },
  },
}));

function HolidayCard(props) {
  const classes = useStyle();
  const [open, setOpen] = useState(false);
  const {
    data,
    loading,
    school_id,
    dataByMonth,
    byMonthLoading,
    month_id,
  } = props;

  const holidayData = Object.entries(data);
  const monthHolidayData = Object.entries(dataByMonth);
  let holidayResult = month_id === "all" ? holidayData : monthHolidayData;
  console.log("holidayResult", holidayResult);

  const handleClickDel = () => {
    setOpen(true);
  };

  const handleCloseNO = () => {
    setOpen(false);
  };

  console.log("month_id", month_id);

  const fetchData = () => {
    props.holidayAll(school_id);
  };

  useEffect(() => {
    if (school_id) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (month_id !== "all") {
      props.holidayByMonth(month_id, school_id);
    }
  }, [month_id]);

  return (
    <>
      {loading || byMonthLoading ? (
        <div className={classes.CircularProgress}>
          <CircularProgress />
        </div>
      ) : (
        <Grid
          container
          direction="row"
          justify="center"
          alignContent="center"
          className={classes.cardContainer}
        >
          {holidayResult.map((item) => (
            <>
              {!item[1][0] && month_id !== "all" ? (
                <div className={classes.message}>
                  <Typography style={{}}>No holidays available yet!</Typography>
                </div>
              ) : (
                <>
                  <div style={{ marginTop: "20px" }}>
                    <Typography>{item[1][0] ? item[0] : ""}</Typography>
                  </div>
                  {item[1].map((data) => (
                    <div className={classes.card} key={data.id}>
                      <div className={classes.cardContent}>
                        <div className={classes.circle}>
                          <span className={classes.span}>
                            {new Date(data.from_date).getDate()}
                          </span>
                        </div>
                        <Grid container className={classes.gridContainer}>
                          <Grid item xs={7}>
                            <span>
                              {data.title ? (
                                <Typography variant="body1">
                                  {data.title}
                                </Typography>
                              ) : (
                                <Typography variant="body1">N/A</Typography>
                              )}
                            </span>
                          </Grid>
                          <Grid item xs={4}>
                            {/* <Typography
                          className={`${classes.textAlignRight}`}
                          variant="body2"
                        >
                          Created at:{" "}
                          {moment(data.created_at).format("DD MMM YY")}
                        </Typography> */}
                          </Grid>
                        </Grid>
                        <Grid container className={classes.gridContainer}>
                          <Grid item xs={7}>
                            <Typography
                              style={{ fontSize: ".8rem" }}
                              className={classes.labelText}
                              variant="body2"
                            >
                              <Typography
                                className={`${classes.typography}`}
                                variant="body2"
                              ></Typography>
                              {moment(data.from_date).format("DD MMM YY")} -{" "}
                              {moment(data.to_date).format("DD MMM YY")}
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            {/* <Typography
                      className={`${classes.textAlignRight}`}
                      variant="body2"
                    >
                      {item.status}
                    </Typography> */}
                          </Grid>
                        </Grid>
                        {/* <Grid container className={classes.gridContainer}>
                  <Grid item xs={7}></Grid>
                  <Grid item xs={4}>
                    {item.status === "Draft" ? (
                      <div
                        className={`${classes.imgDiv} ${classes.textAlignRight}`}
                      >
                        <img src={EditIcon} className={classes.editBtn} />
                        <div
                          className={classes.Del_img}
                          onClick={handleClickDel}
                        >
                          <DeleteOutlineOutlinedIcon fontSize={"medium"} />
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </Grid>
                </Grid> */}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </>
          ))}
        </Grid>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  const {
    holidayAll = [],
    holidayAllLoading,
    holidayByMonth = [],
    holidayByMonthLoading,
  } = state.Attendence;
  const userInfo = state.auth.userInfo || {};
  const userClasses = userInfo.user_classes || {};
  return {
    data: holidayAll,
    loading: holidayAllLoading,
    dataByMonth: holidayByMonth,
    byMonthLoading: holidayByMonthLoading,
    // class_id: userClasses.class_id,
    school_id: userClasses.school_id,
  };
};

export default connect(mapStateToProps, { holidayAll, holidayByMonth })(
  HolidayCard
);
