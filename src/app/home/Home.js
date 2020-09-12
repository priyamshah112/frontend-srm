import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';

import ActivityContainer from './studentHome/ActivityContainer';
import TeacherActivityContainer from './teacherHome/TeacherActivityContainer';

const useStyles = makeStyles((theme) => ({
  homeRoot: {
    height: '100%',
  },
}));

const Home = (props) => {
  const classes = useStyles();
  const selectedRole = props.selectedRole;

  return (
    <div className={classes.homeRoot}>
      {selectedRole === 'teacher' || selectedRole === 'admin' ? (
        <TeacherActivityContainer />
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
