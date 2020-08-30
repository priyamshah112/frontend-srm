import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core';

import TeacherFaq from './teacher/TeacherFaq';
import StudentFaq from './student/StudentFaq';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.mainBackground,
    margin: 0,
    padding: 0,
  },
}));

const FaqContainer = (props) => {
  const classes = useStyles();
  const selectedRole = props.selectedRole;
  console.log(selectedRole);
  return (
    <>
      <div className={classes.container}>
        {selectedRole === 'teacher' || selectedRole === 'admin' ? (
          <TeacherFaq />
        ) : (
          <StudentFaq />
        )}
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
