import React, { useEffect, useState } from 'react';
import { useLocation, useRouteMatch, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import HomeworkSection from './HomeworkSection';
import HomeworkService from './HomeworkService';
import Box from '@material-ui/core/Grid';
import CreateHomework from './teacher/CreateHomework';
import StudentHomework from '../home/studentHome/homeWork/Homeworks';
import BackdropLoader from '../common/ui/backdropLoader/BackdropLoader';

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
  const [isClassLoading, setIsClassLoading] = useState(null);
  const [openLoader, setOpenLoader] = useState(false);
  const selectedRole = props.selectedRole;
  useEffect(() => {
    const fetchClasses = async () => {
      setIsClassLoading(true);
      const classesResponse = await HomeworkService.fetchClasses(props.token);
      let initialClassState = {};

      classesResponse.data.data.forEach((className) => {
        initialClassState[className.id] = className.class_name;
      });

      setClassState({ ...initialClassState });
    };
    if (location.pathname === `/create-homework/${id}`) {
      fetchClasses();
    }
  }, []);
  useEffect(() => {
    if (classState !== null) {
      setIsClassLoading(false);
    }
  }, [classState]);

  const handleChangeLoader = () => {
    setOpenLoader(true);
  };
  return (
    <div className={classes.container} id='scrollable'>
      {location.pathname === '/assignment' ? (
        selectedRole === 'student' || selectedRole === 'parent' ? (
          <div className={classes.studentDiv}>
            <StudentHomework />
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>
        ) : (
          <>
            <HomeworkSection handleChangeLoader={handleChangeLoader} />
          </>
        )
      ) : location.pathname === `/create-homework/${id}` &&
        isClassLoading === false ? (
        <Box p={3}>
          <CreateHomework classState={classState} openLoader={openLoader} />
          <br />
          <br />
          <br />
        </Box>
      ) : (
        ''
      )}
      <BackdropLoader open={isClassLoading} />
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
