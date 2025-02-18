import React from "react";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import TeacherTimeTable from './teacher/classDropDownList';
import StudentTimeTable from './students/studentTimeTable';
const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    backgroundColor: theme.palette.mainBackground,
    height: "100%",
    marign: "0",
    padding: "0",
    overflow: "auto",
  },
}));

const TimeTable = (props) => {
  const classes = useStyles();
  const selectedRole = props.selectedRole;

  return (
    <div className={classes.container} >

                 {selectedRole === "teacher" || selectedRole === "admin" ?
    
                     <TeacherTimeTable /> : ''}
                 {selectedRole === "student" || selectedRole === "parent"?
    
                     <StudentTimeTable /> : ''}
    
             </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedRole: state.auth.selectedRole,
  };
};

export default connect(mapStateToProps)(TimeTable);
