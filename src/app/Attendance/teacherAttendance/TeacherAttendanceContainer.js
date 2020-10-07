import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "./Attendance.css";
import AttendanceDot from "../components/attendanceDot";
import TableTopHead from "../components/tableTopHeader";
import AttendanceFilter from "./filters";
import {
  getAttendence,
  getStudents,
  updateAddendance,
} from "../../redux/actions/attendence.action";
import CircularProgress from "@material-ui/core/CircularProgress";
import { attendanceData } from "../dummyData";
import {
  weekStartDate,
  getWeekDates,
  getNextWeekStartDate,
  getPreviousWeekStartDate,
  currentMonth,
  getMonth,
} from "../../../shared/datediff";
import { formatAttendanceData } from "../../../shared/filter";
import AttendanceFooter from "../components/attendanceFooter";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    backgroundColor: theme.palette.mainBackground,
    height: "100%",
    marign: "0",
    padding: "0",
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flexGrow: "1",
    display: "flex",
    flexDirection: "column",
    minHeight: "0",
    padding: "0 20px 20px 20px",
  },
  panel: {
    flexGrow: "1",
    overflow: "auto",
    minHeight: "100%",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  marginTop: {
    marginTop: "20px",
  },
  middlePanelRow: {
    marginTop: "20px",
    backgroundColor: "#e6e6e6",
    borderRadius: "10px",
    display: "block",
  },
  table: {
    minWidth: 700,
  },
  tableTitle: {
    backgroundColor: "white !important",
    color: "var(--unnamed-color-1c1c1e)",
    textAlign: "center",
    font: "normal normal normal 14px/21px Avenir",
    letterSpacing: "-0.22px",
    color: "#1C1C1E !important",
    opacity: "1",
  },
  tableNameColumn: {
    textAlign: "center",
    font: "normal normal normal 12px/16px Avenir",
    letterSpacing: "0px",
    color: "#808082",
    opacity: "1",
  },
  tableNoColumn: {
    textAlign: "center",
    font: "normal normal normal 12px/16px Avenir",
    letterSpacing: "0px",
    color: "#808082",
    opacity: "1",
  },
  loader: {
    justifyContent: "center",
    alignItem: "center",
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const TeacherAttendanceContainer = (props) => {
  const [class_id, setClassId] = useState("");
  const [subject_id, setSubjectId] = useState("");
  const [weekStart, setWeekStart] = useState(weekStartDate);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const { loading } = props;

  const classes = useStyles();

  useEffect(() => {
    if(class_id && subject_id){
      fetchAttendence();
    }
  }, [class_id, subject_id]);

  const fetchAttendence = () => {
    props.getAttendence();
    props.getStudents({ class_id: 1 });
  };

  const data = formatAttendanceData(attendanceData);
  const weekData = getWeekDates(weekStart);

  console.log("TeacherAttendanceContainer filterData", weekData, data);

  const onPrevious = () => {
    const startDate = getPreviousWeekStartDate(weekStart);
    setWeekStart(startDate);
    setSelectedMonth(getMonth(startDate));
  };

  const onNext = () => {
    const startDate = getNextWeekStartDate(weekStart);
    setWeekStart(startDate);
    setSelectedMonth(getMonth(startDate));
  };

  const getAttendanceDates = (dates = []) => {
    const weekDates = weekData.map((item) => item.date);
    const newDates = weekDates.map((attendance_date) => {
      return { attendance_date };
    });

    if (dates.length) {
      dates.map((d) => {
        const indexOf = weekDates.indexOf(d.attendance_date);
        if (indexOf !== -1) {
          newDates.splice(indexOf, 1, d);
        }
      });
    }

    return newDates;
  };

  const changeAttendanceStatus = (d = {}) => {
    const attendanceStatus = {
      present: "absent",
      absent: "holiday",
      holiday: "present",
    };

    const data = {
      user_id: d.user_id,
      class_id: d.class_id,
      attendance_date: d.attendance_date,
      status: attendanceStatus[d.status] || "absent",
    };
    console.log("TeacherAttendanceContainer changeAttendanceStatus", d);
    props.updateAddendance(data, d.id);
  };

  const renderDots = (row = {}) => {
    const { dates = [] } = row;
    const datesData = getAttendanceDates(dates);

    const userData = {
      class_id: row.class_id,
      roll_no: row.roll_no,
      user_id: row.user_id,
    };
    return datesData.map((date) => (
      <AttendanceDot
        onClick={() => changeAttendanceStatus({ ...userData, ...date })}
        status={date.status}
      />
    ));
  };

  const onChangeClass = (id) => {
    setClassId(id);
    setSubjectId("");
  };

  return (
    <div className={classes.container}>
      <Grid container className={classes.content}>
        <Grid item sm={12} className={classes.panel}>
          <AttendanceFilter
            class_id={class_id}
            setClassId={onChangeClass}
            subject_id={subject_id}
            setSubjectId={setSubjectId}
          />

          <TableContainer component={Paper}>
            <TableTopHead onNext={onNext} onPrevious={onPrevious} />
            <Table aria-label="customized table">
              <TableHead>
                <TableRow className="tableRowHeader">
                  <StyledTableCell className={classes.tableTitle}>
                    Roll No
                  </StyledTableCell>
                  <StyledTableCell
                    className={classes.tableTitle}
                    align="center"
                  >
                    Name | {selectedMonth}
                  </StyledTableCell>
                  {weekData.map((d) => (
                    <StyledTableCell
                      className={classes.tableTitle}
                      align="center"
                    >
                      <p>{d.day.date_day}</p>
                      <span>({d.day.day_sort})</span>
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              {loading ? (
                <CircularProgress center alignCenter />
              ) : (
                <TableBody>
                  {data.map((row, rowIndex) => (
                    <StyledTableRow key={rowIndex} className="statusTable">
                      <StyledTableCell className={classes.tableNoColumn}>
                        {row.roll_no}
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        className={classes.tableNameColumn}
                      >
                        {`${row.firsname} ${row.lastname}`}
                      </StyledTableCell>
                      {renderDots(row)}
                    </StyledTableRow>
                  ))}
                </TableBody>
              )}
            </Table>
            <AttendanceFooter />
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = ({ auth, Attendence }) => {
  const { attendence = [], attendenceLoading } = Attendence;
  return {
    selectedRole: auth.selectedRole,
    loading: attendenceLoading,
  };
};

export default connect(mapStateToProps, {
  getAttendence,
  updateAddendance,
  getStudents,
})(TeacherAttendanceContainer);
