import React, { useEffect, useState } from 'react';
import { useLocation, useRouteMatch, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import TimetableSection from './TimetableSection';
import TimetableService from './TimetableService';
import Box from '@material-ui/core/Grid';
import CreateTimetable from './teacher/CreateTimetable';
import StudentHomework from '../home/studentHome/homeWork/Homeworks';

import axios from 'axios';
const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    backgroundColor: theme.palette.mainBackground,
    height: '100%',
    marign: '0',
    padding: '0',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  content: {
    flexGrow: '1',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '0',
    padding: '0 20px 20px 20px',
  },
  studentDiv: {
    width: '95%',
    margin: 'auto',
  },
  panel: {
    flexGrow: '1',
    overflow: 'auto',
    minHeight: '100%',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
}));
const Homework = (props) => {
  const classes = useStyles();
  const location = useLocation();
  const { id } = useParams();
  const [classState, setClassState] = useState(null);
  const [isClassLoading, setIsClassLoading] = useState(true);
  const selectedRole = props.selectedRole;
  useEffect(() => {
    const fetchClasses = async () => {
      const classesResponse = await TimetableService.fetchClasses(props.token);
      let initialClassState = {};
      classesResponse.data.data.forEach((className) => {
        initialClassState[className.class_name] = false;
      });

      setClassState({ ...initialClassState });
    };
    if (location.pathname === `/create-timetable/${id}`) {
      fetchClasses();
    }
  }, []);
  useEffect(() => {
    if (classState !== null) {
      setIsClassLoading(false);
    }
  }, [classState]);
  // console.log(isClassLoading);
  return (
    <div className={classes.container} id='scrollable'>
      {location.pathname === '/timetable' ? (
        selectedRole === 'student' || selectedRole === 'parent' ? (
          <div className={classes.studentDiv}>
            
            <StudentHomework />
            
          </div>
        ) : (
          <TimetableSection />
        )
      ) : location.pathname === `/create-timetable/${id}` &&
        isClassLoading === false ? (
        <Box p={3}>
          <CreateTimetable classState={classState} />
          <br />
          <br />
          <br />
        </Box>
      ) : (
        ''
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    selectedRole: state.auth.selectedRole,
  };
};

export default connect(mapStateToProps)(Homework);
