import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import LogIcon from "../../../assets/images/attendance/log.svg";
import AttendanceFooter from "../components/attendanceFooter";
import moment from "moment";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {
  getAttendence,
  getSingleClass,
} from "../../redux/actions/attendence.action";
import Summary from "./summary";
import { CircularProgress } from "@material-ui/core";
import AttendanceDot from "../components/attendanceDot";
import {
  getWeekDates,
  weekStartDate,
  currentMonth,
  getMonth,
  getMonthDates,
  getWeekEndDate,
  monthStartDate,
  getMonthEndDate,
  getPreviousWeekStartDate,
  getPreviousMonthStartDate,
  getNextMonthStartDate,
  getNextWeekStartDate,
} from "../../../shared/datediff";
import TableTopHead from "../components/tableTopHeader";
import WeekMonthFilter from "./weekMonthFilter";
import { formatSujectName } from "../../../shared/filter";

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
  const [filter, setFilter] = useState("");
  const [attendance, setAttendance] = useState({});
  const [subjects, setSubject] = useState([]);
  const [weekStart, setWeekStart] = useState(weekStartDate);
  const [monthStart, setMonthStart] = useState(monthStartDate);
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [classId, setClassId] = useState("");
  const [subjectIdName, setSubjectIdName] = useState({});

  useEffect(() => {
    if (!filter) return;
    fetchAttendence(filter);
  }, [monthStart, weekStart]);

  const fetchAttendence = (get_by) => {
    if (loading) return;
    const fDate = get_by === "month" ? monthStart : weekStart;
    const eDate =
      get_by === "month"
        ? getMonthEndDate(monthStart)
        : getWeekEndDate(weekStart);
    const from_date = moment(fDate).format("YYYY-MM-DD");
    const to_date = moment(eDate).format("YYYY-MM-DD");
    setLoading(true);
    console.log({ get_by, from_date, to_date });
    props.getAttendence(
      { get_by, from_date, to_date },
      (d) => onGet(d, get_by),
      onFail
    );
  };

  const onChangeFilter = (f) => {
    setFilter(f);
    setSelectedMonth(getMonth(f === "month" ? monthStart : weekStart));
    if (f === filter) return;
    fetchAttendence(f);
  };

  const onGet = (d = {}, get_by) => {
    const { data = {} } = d;
    const { attendance = {} } = data;
    setAttendance(data);
    if (attendance.length) {
      const cId = attendance[0] || {};
      setClassId(cId);
      fetchClassData(cId.class_id, attendance, get_by);
    }
  };

  const onFail = (err = {}) => {
    setLoading(false);
    setError(err.message);
  };

  const fetchClassData = (class_id = classId, aData = [], get_by) => {
    if (subjects.length) {
      filterAttendanceData(subjects, aData, subjectIdName, get_by);
      return;
    }
    props.getSingleClass(
      class_id,
      (d) => onGetClassData(d, aData, get_by),
      onFailFetchClassData
    );
  };

  const onFailFetchClassData = () => {
    fetchClassData();
  };

  const onGetClassData = (d = {}, aData, get_by) => {
    const { data = {} } = d;
    const { subject_lists = [] } = data;
    const sData = [];
    const sIdName = {};

    subject_lists.map((s) => {
      const { subject_data = {} } = s;
      sData.push({
        ...subject_data,
        subject_id: subject_data.id,
        subject_name: subject_data.name,
      });
      sIdName[subject_data.id] = subject_data.name;
      setSubjectIdName(sIdName);
    });

    setSubject(sData);
    filterAttendanceData(sData, aData, sIdName, get_by);
  };

  const filterAttendanceData = (
    sub = [],
    att = [],
    sIdName = subjectIdName,
    filter = "week"
  ) => {
    let aData = [];
    if (filter === "month") {
      aData = getMonthDates() || [];
    } else {
      aData = getWeekDates(weekStart) || [];
    }

    aData.map((d, index) => {
      const subjectAttendance = {};

      sub.map((s) => {
        subjectAttendance[s.name || s.id] = {};
      });

      att.map((a) => {
        if (d.date === a.attendance_date) {
          const name = sIdName[Number(a.subject_id)];
          subjectAttendance[name] = { ...a, user: undefined };
        }
      });

      aData[index] = { ...d, subjectAttendance };
    });
    setAttendanceData(aData);
    setLoading(false);
  };

  const onPrevious = () => {
    if (loading) return;
    if (filter === "month") {
      const startDate = getPreviousMonthStartDate(monthStart);
      setMonthStart(startDate);
      setSelectedMonth(getMonth(startDate));
    } else {
      const startDate = getPreviousWeekStartDate(weekStart);
      setWeekStart(startDate);
      setSelectedMonth(getMonth(startDate));
    }
  };

  const onNext = () => {
    if (loading) return;
    if (filter === "month") {
      if (
        moment(monthStart).format("YYYY-MM-DD") ===
        moment(monthStartDate).format("YYYY-MM-DD")
      )
        return;

      const startDate = getNextMonthStartDate(monthStart);
      setMonthStart(startDate);
      setSelectedMonth(getMonth(startDate));
    } else {
      if (
        moment(weekStart).format("YYYY-MM-DD") ===
        moment(weekStartDate).format("YYYY-MM-DD")
      )
        return;
      const startDate = getNextWeekStartDate(weekStart);
      setWeekStart(startDate);
      setSelectedMonth(getMonth(startDate));
    }
  };

  const classes = useStyles();

  const renderDot = (subjectAttendance = {}) => {
    const keys = Object.keys(subjectAttendance);
    return keys.map((k) => {
      const item = subjectAttendance[k] || {};
      return <AttendanceDot status={item.status} />;
    });
  };

  const renderFilter = () => (
    <WeekMonthFilter selected={filter} onSelect={onChangeFilter} />
  );

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
                <TableTopHead
                  renderFilter={renderFilter()}
                  onNext={onNext}
                  onPrevious={onPrevious}
                />
                <TableContainer>
                <Table stickyHeader aria-label="customized table">
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
                            {formatSujectName(s.name) || s.id}
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
                </TableContainer>
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
  getSingleClass,
})(ParentAttendanceContainer);
