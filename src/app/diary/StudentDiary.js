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
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  message: {
    textAlign: "center",
    fontSize: 14,
    fontFamily: "Avenir Book",
    padding: "20px",
  },
  sectionContainer: {
    height: "100%",
    width: "100%",
    paddingBottom: "75px",
  },

  header: {
    paddingRight: "20px",
    paddingLeft: "20px",
    paddingBottom: "85px",
    // textAlign: "right",
  },
  header2: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    // paddingRight: '15px',
    // paddingLeft: '15px',
    // paddingTop: '10px',
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
    // marginRight: "15px",
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
    paddingBottom: "15px !important",
    overflow: "auto",
    // margin: '10px',
  },
  textAlignRight: {
    textAlign: "right",
    color: "#AEAEB2",
    fontSize: "0.85rem",
  },
  labelText: {
    fontStyle: "normal",
    color: "#8E8E93",
    fontSize: "14px !important",
    fontFamily: "Avenir medium",
  },
  typography: {
    marginTop: "5px",
    cursor: "pointer",
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
    position: "absolute",
    left: "46%",
    top: "120px",
  },
}));

const StudentDiary = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [menuVal, setMenuVal] = useState("general");
  const selectedRole = props.selectedRole;

  const { data, loading } = props;
  console.log("student", data);

  const fetchData = () => {
    props.studentSideData();
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleMenuChange = (e) => {
    setMenuVal(e.target.value);
  };

  return (
    <>
      <div className={classes.sectionContainer}>
        <div style={{ zIndex: "1", marginLeft: "20px" }}>
          <FormControl className={classes.fieldStyle}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={menuVal}
              onChange={handleMenuChange}
              classes={{
                paper: classes.menuContainer,
                list: classes.menuList,
              }}
            >
              <MenuItem value="general">General Diary Entry</MenuItem>
              {props.selectedRole === "teacher" ||
              props.selectedRole === "admin" ? (
                <>
                  <MenuItem value="teacher">Teacher Observation</MenuItem>
                  <MenuItem value="late">Late Coming</MenuItem>
                </>
              ) : (
                ""
              )}
            </Select>
          </FormControl>
        </div>
        <div className={classes.header}>
          {loading ? (
            <div className={classes.circularProgress}>
              <CircularProgress />
            </div>
          ) : !data[0] ? (
            <Typography className={classes.message}>
              No diary record available yet!
            </Typography>
          ) : (
            data.map((item) => (
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Grid container>
                    <Grid item xs={8}>
                      <span>
                        {item.title === null ? (
                          <Typography variant="body1">N/A</Typography>
                        ) : (
                          <Typography variant="body1">{item.title}</Typography>
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
                      onClick={() =>
                        history.push(`/diary/diary-details/${item.id}`)
                      }
                    >
                      <Typography className={classes.labelText} variant="body2">
                        <Typography
                          className={`${classes.typography}`}
                          variant="body2"
                        ></Typography>
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
                          <span className={`${classes.span}`}>
                            {item.status}
                          </span>
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
            ))
          )}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  const { studentSideData, studentSideDataLoading } = state.Attendence;
  return {
    data: studentSideData,
    loading: studentSideDataLoading,
    selectedRole: state.auth.selectedRole,
  };
};

export default connect(mapStateToProps, {
  studentSideData,
})(StudentDiary);
