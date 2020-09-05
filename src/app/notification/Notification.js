import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import ParentNotifications from './parent/ParentNotifications';
import TeacherNotifications from './teacher/TeacherNotifications';

const useStyles = makeStyles((theme) => ({
  notificationRoot: {
    height: '100%',
  },
}));

const Notification = (props) => {
  const classes = useStyles();
  const selectedRole = props.selectedRole;
  // console.log("Selected Role from Home", selectedRole);

  return (
    <div className={classes.notificationRoot}>
      {selectedRole === 'teacher' || selectedRole === 'admin' ? (
        // <TeacherActivityContainer />
        <TeacherNotifications />
      ) : (
        <ParentNotifications />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedRole: state.auth.selectedRole,
  };
};
export default connect(mapStateToProps)(Notification);
