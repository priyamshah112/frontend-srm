import "date-fns";
import React, { useState, useEffect } from "react";
import AddIcon from "../../../assets/images/Filled Add.svg";
import { IconButton, Typography, makeStyles } from "@material-ui/core";
import LibraryCard from "./LibraryCard";
import { postLibrary } from "../../redux/actions/attendence.action";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import BackdropLoader from "../../common/ui/backdropLoader/BackdropLoader";

const useStyles = makeStyles((theme) => ({
  sectionContainer: {
    height: "100%",
    width: "100%",
  },
  header: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    paddingRight: "15px",
    paddingLeft: "15px",
    paddingTop: "10px",
    textAlign: "left",
    justifyContent: "center",
  },
  addNew: {
    color: theme.palette.common.deluge,
    position: "absolute",
    right: 0,
    marginTop: "15px",
    marginRight: "20px",
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
  themeColor: {
    // color: `${theme.palette.common.deluge}`,
    padding: 0,
    marginTop: "15px",
  },
  titleText: {
    fontFamily: "Avenir Medium",
    // fontize: '1rem',
    fontSize: 18,
    color: "#1C1C1E",
  },
}));

function Library(props) {
  const classes = useStyles();
  const history = useHistory();
  const {studentId} = useParams()
  console.log('studentId', studentId)

  const handleSuccess = (result) => {
    history.push(`/library/${studentId}/edit/${result.data.id}`);
  };
  const handleAddBook = () => {
    props.postLibrary(
      {
        school_id: props.school_id,
      },
      handleSuccess
    );
  };

  return (
    <>
      {props.dataLoading ? (
        <BackdropLoader open={props.dataLoading} />
      ) : (
        <div className={classes.sectionContainer}>
          <div className={classes.header}>
            <div style={{ zIndex: "1" }}>
              <Typography
                variant="h5"
                className={`${classes.themeColor} ${classes.titleText}`}
              >
                Library
              </Typography>
            </div>
            {props.selectedRole === "admin" ||
            props.selectedRole === "teacher" ? (
              <div className={classes.addNew} onClick={handleAddBook}>
                <img src={AddIcon} alt="add" />
                <Typography className="new">Add Book</Typography>
              </div>
            ) : (
              ""
            )}
          </div>
          <LibraryCard studentId={studentId} />
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  const { postLibrary, postLibraryLoading } = state.Attendence;
  const userInfo = state.auth.userInfo || {};
  const userClasses = userInfo.user_classes || {};
  return {
    data: postLibrary,
    dataLoading: postLibraryLoading,
    selectedRole: state.auth.selectedRole,
    school_id: userClasses.school_id,
  };
};

export default connect(mapStateToProps, {
  postLibrary,
})(Library);
