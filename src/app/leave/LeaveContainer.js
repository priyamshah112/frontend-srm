import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core";
import TeacherLeave from "./teacher/TeacherLeave";
import ParentHomeLeave from "./parent/ParentHomeLeave";
import AdminLeave from "./admin/AdminLeave";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.mainBackground,
    margin: 0,
    padding: 0,
  },
}));

const FaqContainer = (props) => {
  const classes = useStyles();
  const selectedRole = props.selectedRole;
  return (
    <>
      <div className={classes.container}>
        {selectedRole === "admin" ? <AdminLeave /> : ""}

        {selectedRole === "teacher" ? <TeacherLeave /> : ""}

        {selectedRole === "parent" ? <ParentHomeLeave /> : ""}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedRole: state.auth.selectedRole,
  };
};

export default connect(mapStateToProps)(FaqContainer);
