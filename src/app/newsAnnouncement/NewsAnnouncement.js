import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useRouteMatch, useParams } from 'react-router-dom';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import BackdropLoader from '../common/ui/backdropLoader/BackdropLoader';
import AnnouncementSection from './AnnouncementSection';
import AnnouncementService from './AnnouncementService';
import Box from '@material-ui/core/Grid';
import CreateAnnouncement from './teacher/CreateAnnouncement';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

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
  panel: {
    flexGrow: '1',
    overflow: 'auto',
    minHeight: '100%',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },

  tabBar: {
    backgroundColor: theme.palette.mainBackground,
    color: theme.palette.common.deluge,
    boxShadow: 'none',
    // '& .Mui-selected': {
    //   borderBottomWidth: '3px',
    // },
  },

  eventsTab: {
    padding: '6px 0px',
    borderBottom: '1px solid #aeaeb2',

    '& .MuiTab-wrapper': {
      height: '30px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '11px',
    },
  },

  borderRight: {
    '& .MuiTab-wrapper': {
      borderRight: '1px solid  #aeaeb2',
    },
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={4}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const NewsAnnouncement = (props) => {
  const classes = useStyles();
  const location = useLocation();
  const { id } = useParams();
  const [classState, setClassState] = useState(null);
  const [category, setcategory] = useState(null);
  const [isClassLoading, setIsClassLoading] = useState(null);
  const [value, setValue] = useState(0);

  const tabref = useRef(null);

  useEffect(() => {
    const fetchClasses = async () => {
      setIsClassLoading(true);
      const classesResponse = await AnnouncementService.fetchClasses(
        props.token
      );
      let initialClassState = [];
      classesResponse.data.data.forEach((className) => {
        initialClassState[className.id] = className.class_name;
      });

      const categoryResponse = await AnnouncementService.fetchCategories(
        props.token,
        'news'
      );

      let categoryList = {};
      categoryResponse.data.data.forEach((categoryData) => {
        categoryList[categoryData.id] = categoryData.category_name;
      });
      setcategory({ ...categoryList });
      setClassState({ ...initialClassState });
    };
    if (location.pathname === `/create-announcement/${id}`) {
      fetchClasses();
    }
  }, []);

  useEffect(() => {
    if (classState !== null && category != null) {
      setIsClassLoading(false);
    }
  }, [classState, category]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.container} id='scrollable'>
      {props.selectedRole === 'parent' || props.selectedRole === 'student' ? (
        <Redirect to='/home' />
      ) : (
        ''
      )}
      {location.pathname === '/news' ? (
        <>
          <AppBar position='sticky' className={classes.tabBar}>
            <Tabs
              centered
              value={value}
              onChange={handleChange}
              indicatorColor='primary'
              textColor='primary'
              variant='fullWidth'
            >
              <Tab
                label='By me'
                {...a11yProps(0)}
                className={`${classes.eventsTab} ${classes.borderRight}`}
              />
              <Tab
                label='For me'
                {...a11yProps(1)}
                className={classes.eventsTab}
              />
            </Tabs>
          </AppBar>
          {[...Array(2).keys()].map((id) => (
            <TabPanel value={value} index={id} key={id}>
              <AnnouncementSection createdBy={!id} />

              <br />
              <br />
              <br />
            </TabPanel>
          ))}
        </>
      ) : location.pathname === `/create-announcement/${id}` &&
        isClassLoading === false ? (
        <Box p={3}>
          <CreateAnnouncement classState={classState} categories={category} />
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

export default connect(mapStateToProps)(NewsAnnouncement);
