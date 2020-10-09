import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import LogIcon from "../../../assets/images/attendance/log.svg";
import AttendanceFooter from "../components/attendanceFooter";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { getAttendence } from "../../redux/actions/attendence.action";
import Summary from "./summary";
import { CircularProgress } from "@material-ui/core";
import AttendanceDot from "../components/attendanceDot";
import {
  getWeekDates,
  weekStartDate,
  currentMonth,
} from "../../../shared/datediff";

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
  topPanelRow: {
    marginTop: "20px",
  },
  panelCol: {
    width: "100%",
  },
  summaryTitle: {
    textAlign: "left",
    font: "normal normal 900 15px Avenir",
    letterSpacing: "0px",
    color: "#2C2C2E",
    padding: "3px 0px 0px 3px",
  },
  contentTitle: {
    display: "flex",
    marginTop: "20px",
  },
  mainContent: {
    borderRadius: "10px",
    marginTop: "10px",
  },
  tableHeader: {
    backgroundColor: "#E8E8E8",
    display: "flex",
  },
  tableHeaderBtn: {
    padding: "10px 20px",
  },
  tableHeadermid: {
    width: "100%",
    padding: "10px 20px",
    textAlign: "center",
  },
  tableRowHeader: {
    backgroundColor: "white",
  },
  tableTitle: {
    backgroundColor: "white !important",
    color: "var(--unnamed-color-1c1c1e)",
    font: "normal normal 300 14px/19px Avenir",
    letterSpacing: "0px",
    color: "#1C1C1E !important",
    opacity: "1",
  },
  loadingView: {
    height: "150px",
  },
  loader: {
    position: "absolute",
    left: "30px",
    right: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "150px",
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

const ParentAttendanceContainer = (props) => {
  const [filter, setFilter] = useState("week");
  const [attendance, setAttendance] = useState({});
  const [subjects, setSubject] = useState([]);
  const [weekStart, setWeekStart] = useState(weekStartDate);
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  useEffect(() => {
    fetchAttendence();
  }, []);

  const fetchAttendence = () => {
    setLoading(true);
    props.getAttendence({ get_by: filter, from_date: "2020-09-28", to_date: "2020-10-05" }, onGet, onFail);
  };

  const onGet = (d = {}) => {
    const { data = {} } = d;
    const { attendance = {} } = data;
    setAttendance(data);
    setSubjects(attendance.data);
  };

  const onFail = (err = {}) => {
    setLoading(false);
    setError(err.message);
  };

  const setSubjects = (att = []) => {
    const sub = [];
    att.map((s) => {
      const name = s.subject_name || s.subject_id;
      if (!sub.includes(name)) {
        sub.push(name);
      }
    });
    setSubject(sub);
    filterAttendanceData(att, sub);
  };

  const filterAttendanceData = (att = [], sub = []) => {
    const weekData = getWeekDates(weekStart) || [];
    weekData.map((d, index) => {
      const subjectAttendance = {};

      sub.map((s) => {
        subjectAttendance[s] = {};
      });

      att.map((a) => {
        if (d.date === a.attendance_date) {
          const name = a.subject_name || a.subject_id;
          subjectAttendance[name] = { ...a, user: undefined };
        }
      });

      weekData[index] = { ...d, subjectAttendance };
    });
    setAttendanceData(weekData);
    setLoading(false);
  };

  const classes = useStyles();

  const weekData = getWeekDates(weekStart);

  console.log("ParentAttendanceContainer weekData", {
    weekData,
    attendance: attendance.attendance,
  });

  const renderDot = (subjectAttendance = {}) => {
    const keys = Object.keys(subjectAttendance);
    return keys.map((k) => {
      const item = subjectAttendance[k] || {};
      return <AttendanceDot status={item.status} />;
    });
  };

  return (
    <div className={classes.container}>
      <Grid container className={classes.content}>
        <Grid item sm={12} className={classes.panel}>
          <Grid container className={classes.topPanelRow}>
            <Grid item xs={12} className={classes.panelCol}>
              <Summary data={attendance} loading={loading} />

              <div className={classes.contentTitle}>
                <img src={LogIcon} alt="Menu" width="24" height="24" />
                <Typography className={classes.summaryTitle}>LOGS</Typography>
              </div>
              <TableContainer className={classes.mainContent} component={Paper}>
                <div className={classes.tableHeader}>
                  <Typography className={classes.tableHeaderBtn}>
                    Preview
                  </Typography>
                  <Typography className={classes.tableHeadermid}>
                    Weekly
                  </Typography>
                  <Typography className={classes.tableHeaderBtn}>
                    Next
                  </Typography>
                </div>
                <Table aria-label="customized table">
                  {subjects.length ? (
                    <TableHead>
                      <TableRow className={classes.tableRowHeader}>
                        <StyledTableCell className={classes.tableTitle}>
                          Month - {selectedMonth}
                        </StyledTableCell>
                        {subjects.map((s) => (
                          <StyledTableCell
                            className={classes.tableTitle}
                            align="center"
                          >
                            {s}
                          </StyledTableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                  ) : null}
                  {loading ? (
                    <div className={classes.loadingView}>
                      <div className={classes.loader}>
                        <CircularProgress center alignCenter />
                      </div>
                    </div>
                  ) : (
                    <TableBody>
                      {attendanceData.map((row, rowIndex) => {
                        const { day = {} } = row;
                        return (
                          <StyledTableRow
                            key={rowIndex}
                            className="statusTable"
                          >
                            <StyledTableCell className={classes.tableNoColumn}>
                              {day.date_day}
                            </StyledTableCell>
                            {renderDot(row.subjectAttendance || {})}
                          </StyledTableRow>
                        );
                      })}
                    </TableBody>
                  )}
                </Table>
                <AttendanceFooter />
              </TableContainer>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = ({ auth, Attendence }) => {
  const { attendenceLoading } = Attendence;
  return {
    selectedRole: auth.selectedRole,
    // loading: attendenceLoading,
  };
};

export default connect(mapStateToProps, {
  getAttendence,
})(ParentAttendanceContainer);
