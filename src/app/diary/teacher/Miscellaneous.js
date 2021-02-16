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
import BackdropLoader from "../../common/ui/backdropLoader/BackdropLoader";
import { SnackBarRef } from "../../../SnackBar";

const useStyle = makeStyles((theme) => ({
  sectionContainer: {
    flexWrap: "wrap",
    padding: "20px 0 20px 20px",
  },
  head: {
    // margin: "20px",
    display: "flex",
    justifyContent: "center",
  },
  heading: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Avenir",
  },
  heading1: {
    fontSize: "18px",
    fontFamily: "Avenir medium",
    textAlign: "center",
  },
  imageGroup: {
    margin: "20px 20px 20px 0",
    display: "flex",
    flexWrap: "wrap",
  },
  imageContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: 103,
    height: 125,
    border: "1px solid #7B72AF",
    backgroundColor: "white",
    marginRight: "20px",
    marginBottom: "20px",
    padding: "10px",
    cursor: "pointer",
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
    // lineSpacing
  },
  CircularProgress: {
    display: "flex",
    height: "93%",
    justifyContent: "center",
    alignItems: "center",
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
    props.miscellaneous();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSuccess = (result) => {
    history.push(`/miscellaneous/${result.data.id}`);
    console.log("result", result);
  };

  const handleOpen = (name) => {
    let list = miscellaneousList.find((o) => o.name === name);
    console.log("list", list);
    if ((selectedRole === "parent" || selectedRole === "student") && !list) {
      SnackBarRef.open(
        "",
        true,
        `${
          name === "prayer"
            ? "Prayer"
            : name === "vijayi"
            ? "Vijayi Vishwa Tiranga Pyara"
            : name === "national"
            ? "National Pledge"
            : name === "jaya"
            ? "Jaya Bharat Jananiya"
            : name === "saare"
            ? "Saare Jahan Se Achcha"
            : name === "rules"
            ? "School Rules and Other Info"
            : ""
        } is empty`
      );
    }
    if (!list) {
      let data = {
        name: name,
        school_id: props.school_id,
      };
      console.log("post call")
      props.postMiscellaneous(data, handleSuccess);
    } else {
      console.log('get call')
      props.getMiscellaneous(list.id, handleSuccess);
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
              <span className={classes.heading1}>Holidays</span>
            </div>
          </div>
          <Grid container className={classes.imageGroup}>
            <div
              onClick={() => {
                handleOpen("prayer");
              }}
              className={classes.imageContainer}
            >
              <div className={classes.img} style={{ marginTop: "-15px" }}>
                <img src={PrayerIcon} width="88px" height="88px" />
              </div>
              <Typography className={classes.textStyle}>Prayer</Typography>
            </div>
            <div
              onClick={() => handleOpen("vijayi")}
              className={classes.imageContainer}
            >
              <div className={classes.img}>
                <img src={Notebook} width="87px" height="88px" />
              </div>
              <Typography className={classes.textStyle}>
                Vijayi Vishwa Tiranga Pyara
              </Typography>
            </div>
            <div
              onClick={() => handleOpen("national")}
              className={classes.imageContainer}
            >
              <div className={classes.img} style={{ marginTop: "-24px" }}>
                <img src={NationalFlag} width="71px" height="88px" />
              </div>
              <Typography className={classes.textStyle}>
                National Pledge
              </Typography>
            </div>
            <div
              onClick={() => handleOpen("jaya")}
              className={classes.imageContainer}
            >
              <div className={classes.img} style={{ marginTop: "-2px" }}>
                <img src={JayaBharat} width="76px" height="88px" />
              </div>
              <Typography className={classes.textStyle}>
                Jaya Bharat Jananiya
              </Typography>
            </div>
            <div
              onClick={() => handleOpen("saare")}
              className={classes.imageContainer}
            >
              <div className={classes.img} style={{ marginTop: "-7px" }}>
                <img src={Earth} width="112px" height="88px" />
              </div>
              <Typography className={classes.textStyle}>
                Saare Jahan Se Achcha
              </Typography>
            </div>
            <div
              onClick={() => handleOpen("rules")}
              className={classes.imageContainer}
            >
              <div className={classes.img} style={{ marginTop: "-7px" }}>
                <img src={GraduationHat} width="82px" height="88px" />
              </div>
              <Typography className={classes.textStyle}>
                School Rules and Other Info
              </Typography>
            </div>
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
