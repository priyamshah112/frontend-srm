import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";

import ActivityContainer from "./studentHome/ActivityContainer";
import TchActivityContainer from "./teacherHome/ActivityContainer";

const useStyles = makeStyles((theme) => ({
  homeRoot: {
    height: "100%",
  },
}));

const Home = (props) => {
  const classes = useStyles();
  const selectedRole = props.selectedRole;
  console.log("Selected Role from Home", selectedRole);
  useEffect(() => {
    console.log("home");
  }, []);
  return (
    <div className={classes.homeRoot}>
      {selectedRole === "teacher" || selectedRole === "admin" ? (
        <TchActivityContainer />
      ) : (
        <ActivityContainer />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedRole: state.auth.selectedRole,
  };
};
export default connect(mapStateToProps)(Home);
