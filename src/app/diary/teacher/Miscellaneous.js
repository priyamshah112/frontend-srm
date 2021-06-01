import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import PrayerIcon from "../../../assets/images/Miscellaneous/Prayer.svg";
import Notebook from "../../../assets/images/Miscellaneous/Notebook.svg";
import NationalFlag from "../../../assets/images/Miscellaneous/Flag.svg";
import JayaBharat from "../../../assets/images/Miscellaneous/Contract.svg";
import Earth from "../../../assets/images/Miscellaneous/Earth.svg";
import GraduationHat from "../../../assets/images/Miscellaneous/GraduationHat.svg";
import { CircularProgress, Grid, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { postMiscellaneous } from "../../redux/actions/attendence.action";
import { miscellaneous } from "../../redux/actions/attendence.action";
import { getMiscellaneous } from "../../redux/actions/attendence.action";
import { useHistory } from "react-router-dom";
import { SnackBarRef } from "../../../SnackBar";
import Paper from "@material-ui/core/Paper";

const useStyle = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    marginLeft: "20px",
    marginBottom: "20px",
    border: "1px solid #7B72AF",
    height: "140px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    cursor: "pointer",
  },
  sectionContainer: {
    // flexWrap: "wrap",
    paddingRight: "20px",

    "& .MuiGrid-spacing-xs-2": {
      margin: "calc(96% + 16px)",
    },
  },
  head: {
    margin: "20px",
    display: "flex",
    justifyContent: "center",
  },
  heading: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Avenir",
  },
  heading1: {
    fontSize: 18,
    fontFamily: "Avenir medium",
    textAlign: "center",
    color: "#1C1C1E",
  },
  imageGroup: {
    // margin: "20px 20px 20px 0",
    // display: "flex",
    // flexWrap: "wrap",
  },
  imageContainer: {
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "center",
    // width: 103,
    // height: 125,
    border: "1px solid #7B72AF",
    backgroundColor: "white",
    // marginRight: "20px",
    // marginBottom: "20px",
    // padding: "10px",
    // cursor: "pointer",
    borderRadius: "3px",
  },
  img: {
    display: "flex",
    justifyContent: "center",
  },
  textStyle: {
    fontFamily: "Avenir medium",
    fontSize: 14,
    textAlign: "center",
    color: "#1C1C1E",
  },
  CircularProgress: {
    display: "flex",
    height: "93%",
    justifyContent: "center",
    alignItems: "center",
  },
  gridContainer: {
    display: "flex",
    "& .MuiPaper-elevation1": {
      boxShadow: "none",
    },
  },
}));

function Miscellaneous(props) {
  const classes = useStyle();
  const history = useHistory();
  const {
    data,
    loading,
    miscellaneousList,
    miscellaneouslistLoading,
    selectedRole,
  } = props;
  console.log("miscellaneousList", miscellaneousList);
  const fetchData = () => {
    props.miscellaneous(selectedRole);
  };

  useEffect(() => {
    if (selectedRole) {
      fetchData();
    }
  }, []);

  const handleSuccess = (result) => {
    history.push(`/miscellaneous/${result.data.id}`);
    console.log("result", result);
  };

  const handleOpen = (name) => {
    let list = miscellaneousList.find((o) => o.name === name);
    console.log("list", list);

    if (!list) {
      let data = {
        name: name,
        school_id: props.school_id,
      };
      console.log("post call");
      props.postMiscellaneous(selectedRole, data, handleSuccess);
    } else {
      console.log("get call");
      history.push(`/miscellaneous/${list.id}`);
    }
  };

  return (
    <>
      {loading || miscellaneouslistLoading ? (
        <div className={classes.CircularProgress}>
          <CircularProgress />
        </div>
      ) : (
        <div className={classes.sectionContainer}>
          <div className={classes.head}>
            <div className={classes.heading}>
              <span className={classes.heading1}>Miscellaneous</span>
            </div>
          </div>
          <Grid spacing={2} className={classes.gridContainer}>
            <Grid
              item
              xs={3}
              onClick={() => {
                handleOpen("prayer");
              }}
            >
              <Paper className={classes.paper}>
                <div className={classes.img}>
                  <img src={PrayerIcon} width="88px" height="88px" />
                </div>
                <Typography
                  style={{ marginTop: "5px" }}
                  className={classes.textStyle}
                >
                  Prayer
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={3} onClick={() => handleOpen("vijayi")}>
              <Paper className={classes.paper}>
                <div className={classes.img}>
                  <img src={Notebook} width="87px" height="88px" />
                </div>
                <Typography className={classes.textStyle}>
                  Vijayi Vishwa Tiranga Pyara
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={3} onClick={() => handleOpen("national")}>
              <Paper className={classes.paper}>
                <div className={classes.img}>
                  <img src={NationalFlag} width="71px" height="88px" />
                </div>
                <Typography className={classes.textStyle}>
                  National Pledge
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={3} onClick={() => handleOpen("jaya")}>
              <Paper className={classes.paper}>
                <div className={classes.img}>
                  <img src={JayaBharat} width="76px" height="88px" />
                </div>
                <Typography className={classes.textStyle}>
                  Jaya Bharat Jananiya
                </Typography>
              </Paper>
            </Grid>
          </Grid>
          <Grid spacing={2} className={classes.gridContainer}>
            <Grid item xs={3} onClick={() => handleOpen("saare")}>
              <Paper className={classes.paper}>
                <div className={classes.img}>
                  <img src={Earth} width="112px" height="88px" />
                </div>
                <Typography className={classes.textStyle}>
                  National Anthem
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={3} onClick={() => handleOpen("rules")}>
              <Paper className={classes.paper}>
                <div className={classes.img}>
                  <img src={GraduationHat} width="82px" height="88px" />
                </div>
                <Typography className={classes.textStyle}>
                  School Rules and Other Info
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  const {
    miscellaneous = [],
    miscellaneousLoading,
    getAllMiscellaneous = [],
    getAllMiscellaneousLoading,
  } = state.Attendence;
  const userInfo = state.auth.userInfo || {};
  const userClasses = userInfo.user_classes || {};
  return {
    data: miscellaneous,
    loading: miscellaneousLoading,
    miscellaneousList: getAllMiscellaneous,
    miscellaneouslistLoading: getAllMiscellaneousLoading,
    school_id: userClasses.school_id,
    selectedRole: state.auth.selectedRole,
  };
};

export default connect(mapStateToProps, {
  postMiscellaneous,
  miscellaneous,
  getMiscellaneous,
})(Miscellaneous);
