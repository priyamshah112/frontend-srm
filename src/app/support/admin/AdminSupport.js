import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Typography,
  CardContent,
  AppBar,
  Tabs,
  Tab,
  Box,
} from '@material-ui/core';

import SupportCard from '../SupportCard';
import SupportForMe from './SupportForMe';
import SupportByMe from './SupportByMe';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    backgroundColor: theme.palette.mainBackground,
    marign: '0',
    padding: '0',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: 0,
    },
  },

  commentsSection: {
    marginTop: '30px',
  },
  appbarRoot: {
    backgroundColor: theme.palette.mainBackground,
    boxShadow: 'none',
    color: theme.palette.common.blackRussian,
    borderTopLeftRadius: '3px',
    borderTopRightRadius: '3px',
  },
  tabBar: {
    backgroundColor: theme.palette.common.white,
    boxShadow: 'none',
    // '& .Mui-selected': {
    //   borderBottomWidth: '3px',
    // },
  },

  eventsTab: {
    padding: '6px 0px',
    borderBottom: '1px solid #aeaeb2',
    fontWeight: 500,

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

const AdminSupport = (props) => {
  const classes = useStyles();

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <div className={classes.container}>
        <AppBar
          position='static'
          className={classes.tabbar}
          classes={{ root: classes.appbarRoot }}
          // style={{ background: '#2E3B55' }}
        >
          <Tabs
            centered
            value={value}
            onChange={handleChange}
            indicatorColor='primary'
            variant='fullWidth'
          >
            <Tab
              label='For Me'
              {...a11yProps(0)}
              className={`${classes.eventsTab} ${classes.borderRight}`}
            />
            <Tab
              label='By Me'
              {...a11yProps(1)}
              className={classes.eventsTab}
            />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <SupportForMe />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SupportByMe />
        </TabPanel>
      </div>
    </>
  );
};

export default AdminSupport;
