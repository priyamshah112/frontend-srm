import React from "react";
import { connect } from "react-redux";
import { makeStyles, Box } from "@material-ui/core";
import AdminLeave from "./admin/AdminLeave";
import TeacherLeave from "./teacher/TeacherLeave";
import ParentLeave from "./parent/ParentLeave";
import StudentLeave from "./student/StudentLeave";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.mainBackground,
    margin: 0,
    padding: 0,
    overflow: "auto",
    "&::-webkit-scrollbar": {
      width: 0,
    },
  },
}));

const LeaveContainer = (props) => {
  const classes = useStyles();
  const { selectedRole } = props;

  return (
    <Box className={classes.container}>
      {selectedRole === "admin" ? <AdminLeave /> : null}
      {selectedRole === "teacher" ? <TeacherLeave /> : null}
      {selectedRole === "parent" ? <ParentLeave /> : null}
      {selectedRole === "student" ? <StudentLeave /> : null}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedRole: state.auth.selectedRole,
  };
};

export default connect(mapStateToProps)(LeaveContainer);
