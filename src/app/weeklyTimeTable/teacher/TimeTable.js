import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { getWeekFilterUsingALL } from "../../redux/actions/attendence.action";
import { deleteRowWeeklyTimeTable } from "../../redux/actions/attendence.action";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import Buttons from "./Buttons";
import LectureBreak from "./LectureBreak";
import { publishWeeklyTimeTable } from "../../redux/actions/attendence.action";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { SnackBarRef } from "../../../SnackBar";
import LinearProgress from "@material-ui/core/LinearProgress";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const useStyles = makeStyles(() => ({
  table: {
    // minWidth: 650,
    width: "100%",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  container: {
    marginTop: "15px",
    paddingBottom: "40px",
  },
  headingList: {
    background: "#7b72af",
    padding: "5px",
    textAlign: "center",
    font: "normal normal medium 14px/19px Avenir",
    borderBottom: "1px solid lightgrey ",
    borderRight: "1px solid lightgrey",
    color: "#FFFFFF",
  },
  timetableheading: {
    fontSize: "0.5rem,",
    fontFamily: "Avenir Medium",
    fontWeight: "400",
    lineHeight: 1.5,
  },
  tableHead: {
    fontFamily: "Avenir",
    fontSize: 14,
    fontWeight: 100,
    padding: "10px",
    backgroundColor: "#7B72AF",
    borderLeft: "1px solid white",
    color: "white",
  },
  tableHeadCell1: {
    fontFamily: "Avenir",
    fontSize: 14,
    fontWeight: 100,
    padding: "10px",
    backgroundColor: "#7B72AF",
    color: "white",
  },
  tableData: {
    fontFamily: "Avenir",
    fontSize: 14,
    padding: "10px",
    borderLeft: "1px solid rgb(200, 200, 200)",
    cursor: "pointer",
  },
  tableDataCell1: {
    fontFamily: "Avenir medium",
    fontSize: 14,
    padding: "10px",
    display: "flex",
    justifyContent: "space-between",
  },
  paper: {
    textAlign: "",
    margin: "0",
    height: "auto",
    boxShadow: "none",
    padding: "10px",
    background: "#FFFFFF",
    borderBottom: "2px solid grey",
    borderTopRightRadius: "5px",
    borderTopLeftRadius: "5px",
  },
  subjectname: {
    fontSize: 14,
    fontFamily: "Avenir",
    fontWeight: "400",
    lineHeight: "1.5",
  },
  date: {
    fontSize: 14,
    fontFamily: "Avenir",
    fontWeight: "400",
    lineHeight: "1.5",
    color: "rgb(150, 150, 150)",
  },
  loading: {
    width: "100%",
    textAlign: "center",
    paddingTop: "8px",
    fontSize: "20px",
  },
  draft: {
    color: "rgb(150, 150, 150)",
    fontSize: "12px",
    fontFamily: "Avenir medium",
  },
  message: {
    fontFamily: "Avenir",
    fontSize: 14,
    textAlign: "center",
    marginTop: "45px",
  },
  CircularProgress: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginRight: "25px",
    marginBottom: "20px",
  },
  imgDiv_del: {
    bottom: 0,
    right: 0,
    // color:'red',
    transform: "translateY(5px)",
    cursor: "pointer",
    color: "#AEAEB2",
  },
  tableCell00: {
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
  },
}));

function TimeTable(props) {
  const selectedRole = props.selectedRole;
  const class_id =
    selectedRole === "student" ? props.studentClassId : props.class_id;
  const { data = {}, loading, classLoading, publishLoading } = props;
  const tableData = data[class_id] || {};
  const status = tableData.status;
  props.status(status);
  const weekTimeTableData = tableData.data || [];
  let length = weekTimeTableData.length;

  const classes = useStyles();
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");
  const [updateStartTime, setUpdateStartTime] = useState("");
  const [updateEndTime, setUpdateEndTime] = useState("");
  const [updateRadioValue, setUpdateRadioValue] = useState("");
  const [updateMonday, setUpdateMonday] = useState("");
  const [updateTuesday, setUpdateTuesday] = useState("");
  const [updateWednesday, setUpdateWednesday] = useState("");
  const [updateThursday, setUpdateThursday] = useState("");
  const [updateFriday, setUpdateFriday] = useState("");
  const [updateSaturday, setUpdateSaturday] = useState("");
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const handleClickOpen = (id) => {
    setOpen(true);
    setDeleteId(id);
  };
  const handleCloseNO = () => {
    setOpen(false);
  };
  const handleSuccess = () => {
    SnackBarRef.open("", true, "Row deleted successfully");
    props.getWeekFilterUsingALL(class_id);
    setOpen(false);
    setDeleteId("");
  };
  const handleFail = (error) => {
    setDeleteId("");
    console.log("error", error);
    if (error) {
      SnackBarRef.open("", false, error.message);
    }
  };
  const handleDelete = () => {
    console.log("Deleting row");
    props.deleteRowWeeklyTimeTable(deleteId, handleSuccess, handleFail);
  };

  useEffect(() => {
    if (class_id) {
      fetchData();
    }
  }, [class_id]);

  const fetchData = () => {
    console.log("alert");
    props.getWeekFilterUsingALL(class_id);
  };

  const handleOnClick = (item) => {
    setEdit(true);
    setId(item.id);
    setUpdateStartTime(item.start_time);
    setUpdateEndTime(item.end_time);
    if (item.Monday.week_time_table.timetable_status !== "Break") {
      setUpdateRadioValue("Lecture");
    } else {
      setUpdateRadioValue("Break");
    }
    setUpdateMonday(item.Monday.subject_id);
    setUpdateTuesday(item.Tuesday.subject_id);
    setUpdateWednesday(item.Wednesday.subject_id);
    setUpdateThursday(item.Thursday.subject_id);
    setUpdateFriday(item.Friday.subject_id);
    setUpdateSaturday(item.Saturday.subject_id);
  };

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let currentTime = new Date();
  let currentDate = currentTime.getDate();
  let currentMonth = currentTime.getMonth();
  currentMonth = monthNames[currentMonth];

  let currentHours = currentTime.getHours();
  let currentMinutes = currentTime.getMinutes();
  // const currentSeconds = currentTime.getSeconds()

  currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;
  // currentSeconds = (currentSeconds < 10 ? '0' : '') + currentSeconds

  let timeOfDay = currentHours < 12 ? "AM" : "PM";

  currentHours = currentHours > 12 ? currentHours - 12 : currentHours;
  currentHours = currentMinutes == 0 ? 12 : currentHours;
  currentHours = (currentHours < 10 ? "0" : "") + currentHours;

  let currentTimeStr = currentHours + ":" + currentMinutes + " " + timeOfDay;

  const handleCloseAdd = () => {
    setEdit(false);
  };

  const renderCellItem = (item) => {
    return item.subject_name &&
      item.week_time_table.timetable_status === "Lecture" &&
      item.subject_id
      ? item.subject_name
      : item.week_time_table.timetable_status === "Break"
      ? "Break"
      : "No Lecture";
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleCloseNO}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete?"}
        </DialogTitle>
        {props.deleteRowLoading ? (
          <LinearProgress />
        ) : (
          <DialogActions>
            <Button onClick={handleCloseNO} color="primary" autoFocus>
              NO
            </Button>
            <Button onClick={handleDelete} color="primary">
              YES
            </Button>
          </DialogActions>
        )}
      </Dialog>

      {selectedRole === "teacher" || selectedRole === "admin" ? (
        <LectureBreak
          edit={edit}
          tableId={id}
          name={props.name}
          schoolId={props.schoolId}
          class_id={class_id}
          open={edit}
          close={handleCloseAdd}
          updateStartTime={updateStartTime}
          updateEndTime={updateEndTime}
          updateRadioValue={updateRadioValue}
          updateMonday={updateMonday}
          updateTuesday={updateTuesday}
          updateWednesday={updateWednesday}
          updateThursday={updateThursday}
          updateFriday={updateFriday}
          updateSaturday={updateSaturday}
        />
      ) : (
        ""
      )}
      <div className={classes.container}>
        {loading || classLoading ? (
          <div className={classes.loading}>
            <CircularProgress color="primary" size={30} />
          </div>
        ) : length ? (
          <>
            <Grid container lg={12} sm={12} xs={12}>
              <Grid lg={8} sm={8} xs={8}>
                <Typography
                  display=""
                  align="right"
                  gutterBottom
                  className={classes.paper}
                >
                  <span className={classes.subjectname}>
                    {props.name} Weekly Time Table
                  </span>
                </Typography>
              </Grid>
              <Grid lg={4} sm={4} xs={4}>
                <Typography
                  display=""
                  align="right"
                  gutterBottom
                  className={classes.paper}
                >
                  <span className={classes.date}>
                    {currentDate} {currentMonth}, {currentTimeStr}
                  </span>
                </Typography>
              </Grid>
            </Grid>
            <TableContainer style={{ marginBottom: "30px" }} component={Paper}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.tableHeadCell1}>
                      <div>
                        <div className={classes.tableCell00}>
                          Days{" "}
                          <div style={{marginTop:'5px'}}>
                            <ArrowForwardIcon fontSize="small" />
                          </div>
                        </div>
                        <div className={classes.tableCell00}>
                          Time{" "}
                          <div style={{marginTop:'5px'}}>
                            <ArrowDownwardIcon fontSize="small" />
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className={classes.tableHead} align="center">
                      Monday
                    </TableCell>
                    <TableCell className={classes.tableHead} align="center">
                      Tuesday
                    </TableCell>
                    <TableCell className={classes.tableHead} align="center">
                      Wednesday
                    </TableCell>
                    <TableCell className={classes.tableHead} align="center">
                      Thursday
                    </TableCell>
                    <TableCell className={classes.tableHead} align="center">
                      Friday
                    </TableCell>
                    <TableCell className={classes.tableHead} align="center">
                      Saturday
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {weekTimeTableData.map((item, index) =>
                    selectedRole === "student" && item.status === "draft" ? (
                      ""
                    ) : (
                      <TableRow
                        className={classes.tableRow}
                        id={item.week_timetable_id}
                        key={index}
                      >
                        <TableCell
                          className={classes.tableDataCell1}
                          scope="row"
                        >
                          <div style={{ marginTop: "7px" }}>
                            {item.start_time}-{item.end_time}
                          </div>
                          {selectedRole === "teacher" ||
                          selectedRole === "admin" ? (
                            <div
                              className={`${classes.imgDiv_del}`}
                              onClick={() => handleClickOpen(item.id)}
                            >
                              <DeleteOutlineOutlinedIcon
                                style={{ color: "red" }}
                                fontSize={"medium"}
                              />
                            </div>
                          ) : (
                            ""
                          )}
                        </TableCell>
                        <TableCell
                          onClick={() => handleOnClick(item)}
                          className={classes.tableData}
                          align="center"
                        >
                          {renderCellItem(item.Monday)}
                        </TableCell>
                        <TableCell
                          onClick={() => handleOnClick(item)}
                          className={classes.tableData}
                          align="center"
                        >
                          {renderCellItem(item.Tuesday)}
                        </TableCell>
                        <TableCell
                          onClick={() => handleOnClick(item)}
                          className={classes.tableData}
                          align="center"
                        >
                          {renderCellItem(item.Wednesday)}
                        </TableCell>
                        <TableCell
                          onClick={() => handleOnClick(item)}
                          className={classes.tableData}
                          align="center"
                        >
                          {renderCellItem(item.Thursday)}
                        </TableCell>
                        <TableCell
                          onClick={() => handleOnClick(item)}
                          className={classes.tableData}
                          align="center"
                        >
                          {renderCellItem(item.Friday)}
                        </TableCell>
                        <TableCell
                          onClick={() => handleOnClick(item)}
                          className={classes.tableData}
                          align="center"
                        >
                          {renderCellItem(item.Saturday)}
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            {selectedRole === "teacher" || selectedRole === "admin" ? (
              status === "draft" ? (
                publishLoading ? (
                  <div className={classes.CircularProgress}>
                    <CircularProgress />
                  </div>
                ) : (
                  <Buttons class_id={class_id} />
                )
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </>
        ) : (
          <div className={classes.message}>
            <span>No weekly time table available yet!</span>
          </div>
        )}
      </div>
    </>
  );
}

const mapStateToProps = ({ Attendence, auth }) => {
  const {
    get_week_filter_using_all = [],
    publishWeeklyTimeTableLoading,
    getWeekFilterUsingAllLoading,
    classesLoading,
    deleteRowWeeklyTimeTableLoading,
  } = Attendence;
  return {
    data: get_week_filter_using_all,
    loading: getWeekFilterUsingAllLoading,
    classLoading: classesLoading,
    selectedRole: auth.selectedRole,
    studentClassId: auth.userInfo.user_classes.class_id,
    publishLoading: publishWeeklyTimeTableLoading,
    deleteRowLoading: deleteRowWeeklyTimeTableLoading,
  };
};

export default connect(mapStateToProps, {
  publishWeeklyTimeTable,
  getWeekFilterUsingALL,
  deleteRowWeeklyTimeTable,
})(TimeTable);
