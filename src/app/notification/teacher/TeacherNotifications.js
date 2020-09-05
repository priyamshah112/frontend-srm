import React, { useState, useRef } from 'react';
import NotificationCard from '../NotificationCard';
import { makeStyles, AppBar, Tabs, Tab, Box } from '@material-ui/core';
import TeacherNotificationsContainer from './TeacherNotificationsContainer';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 0,
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: 0,
    },
  },

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
  notificationContainer: {
    width: '95%',
    height: 'auto',
    margin: '0 auto 100px',
    padding: 0,
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
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const TeacherNotifications = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const tabref = useRef(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.mainContainer}>
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
              label='For me'
              {...a11yProps(0)}
              className={`${classes.eventsTab} ${classes.borderRight}`}
            />
            <Tab
              label='By me'
              {...a11yProps(1)}
              className={classes.eventsTab}
            />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <TeacherNotificationsContainer created_by={false} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TeacherNotificationsContainer created_by={true} />
        </TabPanel>
      </>
    </div>
  );
};

export default TeacherNotifications;
