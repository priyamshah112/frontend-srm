import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import FormHelperText from "@material-ui/core/FormHelperText";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";

import DescriptionIcon from "@material-ui/icons/Description";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import VerticalAlignTopIcon from "@material-ui/icons/VerticalAlignTop";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import LogIcon from "../../../assets/images/attendance/log.svg";
import SummaryIcon from "../../../assets/images/attendance/summary.svg";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { getAttendence } from "../../redux/actions/attendence.action";
import AnnouncementService from "../../newsAnnouncement/AnnouncementService";

// import './Attendance.css';

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
  summaryHerderTitle: {
    display: "flex",
  },
  summaryIcon: {
    color: "rgb(142 142 147)",
  },
  summaryTitle: {
    textAlign: "left",
    font: "normal normal 900 15px Avenir",
    letterSpacing: "0px",
    color: "#2C2C2E",
    padding: "3px 0px 0px 3px",
  },
  summaryContent: {
    marginTop: "10px",
    borderRadius: "10px",
    padding: "10px",
    marginBottom: "30px",
  },
  contentRow: {
    display: "flex",
    padding: "20px 10px 0px 10px",
  },
  dayNum: {
    background: "rgb(123 114 175 / 0.2) 0% 0% no-repeat padding-box;",
    borderRadius: "4px",
    padding: "1px 6px",
    width: "fit-content",
    fontSize: "14px",
    letterSpacing: "0px",
    color: "#2C2C2E",
    margin: "0px 20px 0px 10px",
  },
  summaryMainContent: {
    color: "var(--unnamed-color-1c1c1e)",
    textAlign: "left",
    font: "normal normal 300 14px/24px Avenir",
    letterSpacing: "0px",
    color: "#1C1C1E",
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

function createData(no, sub1, sub2, sub3, sub4, sub5, sub6) {
  return { no, sub1, sub2, sub3, sub4, sub5, sub6 };
}

const ParentAttendanceContainer = (props) => {
  const [state, setState] = React.useState({
    classNum: "",
    name: "hai",
    study: "",
    studyName: "Social studies",
  });

  useEffect(() => {
    fetchAttendence();
  }, []);

  const fetchAttendence = async () => {
    props.getAttendence();
  };

  const classes = useStyles();
  const selectedRole = props.selectedRole;
  const handleClassChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };
  const handleStudyChange = (event) => {
    console.log(event.target);
    const studyName = event.target.name;
    setState({
      ...state,
      [studyName]: event.target.value,
    });
  };

  const handleClick = () => {
    console.log("click");
  };

  // 1=present, 0=absent, 2=holiday, 3=empty
  const rows = [
    createData("01", 1, 0, 2, 3, 1, 3, 3),
    createData("02", 1, 0, 2, 3, 1, 3, 3),
    createData("03", 1, 0, 2, 3, 1, 3, 3),
    createData("04", 1, 0, 2, 3, 1, 3, 3),
    createData("05", 1, 0, 2, 3, 1, 3, 3),
    createData("06", 1, 0, 2, 3, 1, 3, 3),
    createData("07", 1, 0, 2, 3, 1, 3, 3),
  ];

  return (
    <div className={classes.container}>
      <Grid container className={classes.content}>
        <Grid item sm={12} className={classes.panel}>
          <Grid container className={classes.topPanelRow}>
            <Grid item xs={12} className={classes.panelCol}>
              <div className={classes.summaryHerderTitle}>
                <img src={SummaryIcon} alt="Menu" width="24" height="24" />
                <Typography className={classes.summaryTitle}>
                  SUMMARY
                </Typography>
              </div>
              <Paper className={classes.summaryContent}>
                <div className={classes.contentRow}>
                  <Typography>Total Class Days</Typography>
                  <Typography className={classes.dayNum}>22</Typography>
                  <Typography>Holidays</Typography>
                  <Typography className={classes.dayNum}>06</Typography>
                  <Typography>Days Attended</Typography>
                  <Typography className={classes.dayNum}>18</Typography>
                  <Typography>Days Absent</Typography>
                  <Typography className={classes.dayNum}>04</Typography>
                </div>
                <div className={classes.contentRow}>
                  <Typography className={classes.summaryMainContent}>
                    Science - <b>100%</b>, English - <b>99%</b>, Kannada -{" "}
                    <b>70%</b>, Mathematics - <b>89%</b>, Social Science -{" "}
                    <b>97%</b>, Moral Science - <b>91%</b>
                  </Typography>
                </div>
              </Paper>

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
                  <TableHead>
                    <TableRow className={classes.tableRowHeader}>
                      <StyledTableCell className={classes.tableTitle}>
                        {" "}
                      </StyledTableCell>
                      <StyledTableCell
                        className={classes.tableTitle}
                        align="center"
                      >
                        Sci
                      </StyledTableCell>
                      <StyledTableCell
                        className={classes.tableTitle}
                        align="center"
                      >
                        Eng
                      </StyledTableCell>
                      <StyledTableCell
                        className={classes.tableTitle}
                        align="center"
                      >
                        Mat
                      </StyledTableCell>
                      <StyledTableCell
                        className={classes.tableTitle}
                        align="center"
                      >
                        Kan
                      </StyledTableCell>
                      <StyledTableCell
                        className={classes.tableTitle}
                        align="center"
                      >
                        S.Sc
                      </StyledTableCell>
                      <StyledTableCell
                        className={classes.tableTitle}
                        align="center"
                      >
                        M.Sc
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, rowIndex) => (
                      <StyledTableRow key={rowIndex} className="statusTable">
                        <StyledTableCell className={classes.tableNoColumn}>
                          {row.no}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <FiberManualRecordIcon
                            className={
                              row.sub1 == 0
                                ? "absentStatus"
                                : row.sub1 == 1
                                ? "presentStatus"
                                : row.sub1 == 2
                                ? "holidayStatus"
                                : "emptyStatus"
                            }
                          />
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <FiberManualRecordIcon
                            className={
                              row.sub2 == 0
                                ? "absentStatus"
                                : row.sub2 == 1
                                ? "presentStatus"
                                : row.sub2 == 2
                                ? "holidayStatus"
                                : "emptyStatus"
                            }
                          />
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <FiberManualRecordIcon
                            className={
                              row.sub3 == 0
                                ? "absentStatus"
                                : row.sub3 == 1
                                ? "presentStatus"
                                : row.sub3 == 2
                                ? "holidayStatus"
                                : "emptyStatus"
                            }
                          />
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <FiberManualRecordIcon
                            className={
                              row.sub4 == 0
                                ? "absentStatus"
                                : row.sub4 == 1
                                ? "presentStatus"
                                : row.sub4 == 2
                                ? "holidayStatus"
                                : "emptyStatus"
                            }
                          />
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <FiberManualRecordIcon
                            className={
                              row.sub5 == 0
                                ? "absentStatus"
                                : row.sub5 == 1
                                ? "presentStatus"
                                : row.sub5 == 2
                                ? "holidayStatus"
                                : "emptyStatus"
                            }
                          />
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <FiberManualRecordIcon
                            className={
                              row.sub6 == 0
                                ? "absentStatus"
                                : row.sub6 == 1
                                ? "presentStatus"
                                : row.sub6 == 2
                                ? "holidayStatus"
                                : "emptyStatus"
                            }
                          />
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="tableBottom">
                  <div className="stateRow">
                    <FiberManualRecordIcon className="presentStatus" />
                    <p className="rollStatus">Present</p>
                  </div>
                  <div className="stateRow">
                    <FiberManualRecordIcon className="absentStatus" />
                    <p className="rollStatus">Absent</p>
                  </div>
                  <div className="stateRow">
                    <FiberManualRecordIcon className="holidayStatus" />
                    <p className="rollStatus">Holiday</p>
                  </div>
                </div>
              </TableContainer>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedRole: state.auth.selectedRole,
  };
};

export default connect(mapStateToProps, { getAttendence })(
  ParentAttendanceContainer
);
