import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';

import Tasks from './tasks/Tasks';
import Homework from './homework/Homework';
import HomeAnnouncements from './announcements/HomeAnnouncements';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    backgroundColor: theme.palette.mainBackground,
    height: '100%',
    marign: '0',
    padding: '0',
    display: 'flex',
    flexDirection: 'column',
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
  marginTop: {
    marginTop: '20px',
  },
  topPanelRow: {
    marginTop: '20px',
  },
  panelCol: {
    width: '100%',
  },
  taskCol: {
    height: '400px',
  },
  homeworkCol: {
    height: '130px',
    [theme.breakpoints.down('xs')]: {
      height: 'inherit',
    },
  },
}));
const ActivityContainer = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Grid container className={classes.content}>
        <Grid item sm={12} className={classes.panel}>
          <Grid container className={classes.topPanelRow}>
            <Grid
              item
              xs={12}
              className={`${classes.panelCol} ${classes.taskCol}`}
            >
              <Tasks />
            </Grid>
            <Grid
              item
              xs={12}
              className={`${classes.panelCol} ${classes.marginTop} ${classes.homeworkCol}`}
            >
              <Homework />
            </Grid>
            <Grid
              item
              xs={12}
              className={`${classes.panelCol} ${classes.marginTop}`}
            >
              <HomeAnnouncements />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ActivityContainer;
