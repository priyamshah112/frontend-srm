import React from 'react';
import { makeStyles } from '@material-ui/styles';
import ParentProfile from './parent/ParentProfile';
import { connect } from 'react-redux';
import StudentProfile from './student/StudentProfile';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    backgroundColor: theme.palette.mainBackground,
    height: '100%',
    marign: '0',
    padding: '0',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: 0,
    },
  },
  profileContainer: {
    width: '95%',
    margin: '0 auto',
  },
}));
const Profile = (props) => {
  const classes = useStyles();
  const selectedRole = props.selectedRole;
  return (
    <div className={classes.container}>
      {selectedRole === 'parent' ? (
        <ParentProfile />
      ) : selectedRole === 'student' ? (
        <StudentProfile />
      ) : (
        ''
      )}
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedRole: state.auth.selectedRole,
  };
};

export default connect(mapStateToProps)(Profile);
