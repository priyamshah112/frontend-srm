import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import ProfileCard from '../ProfileCard';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  profileContainer: {
    width: '95%',
    margin: '0 auto',
  },
  mainDiv: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
      width: '100%',
    },
  },
  contentDiv: {
    [theme.breakpoints.down('xs')]: {
      display: 'inline-block',
    },
  },
  labelText: {
    fontSize: '14px',
    fontStyle: 'normal',
    color: `${theme.palette.common.blackRussian}`,
    opacity: 0.5,
  },
  normalText: {
    fontSize: '14px',
    fontStyle: 'normal',
    color: `${theme.palette.common.srmBastille}`,
    fontWeight: 500,
    opacity: 1,
  },
  lightText: {
    color: `${theme.palette.common.srmBastille}`,
    fontSize: '14px',
    fontStyle: 'normal',
  },
  margin5: {
    marginLeft: '5px',
  },
  mainMarginLeft: {
    marginLeft: '30px',
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
    },
  },
  mainMarginTop: {
    marginTop: '10px',
  },
  TopContent: {
    borderBottom: '1px solid #D1D1D6',
    paddingBottom: '20px',
  },
  BottomContent: {
    paddingTop: '20px',
  },
}));
const StudentParents = (props) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.profileContainer}>
        <ProfileCard title='Parents'>
          <div className={classes.TopContent}>
            <Grid container>
              <div className={classes.mainDiv}>
                <div className={classes.contentDiv}>
                  <Typography className={`${classes.normalText}`}>
                    Samarth Atmakur -
                  </Typography>
                </div>
                <div className={classes.contentDiv}>
                  <Typography
                    className={`${classes.lightText} ${classes.margin5}`}
                  >
                    Class IV
                  </Typography>
                </div>
              </div>
            </Grid>
            <Grid container>
              <div className={classes.mainDiv}>
                <div className={classes.contentDiv}>
                  <Typography className={`${classes.lightText}`}>
                    Male | 10yrs | DOB: 05/05/2010
                  </Typography>
                </div>
              </div>
            </Grid>
          </div>
          <div className={classes.BottomContent}>
            <Grid container>
              <div className={classes.mainDiv}>
                <div className={classes.contentDiv}>
                  <Typography className={`${classes.normalText}`}>
                    Samarth Atmakur -
                  </Typography>
                </div>
                <div className={classes.contentDiv}>
                  <Typography
                    className={`${classes.lightText} ${classes.margin5}`}
                  >
                    Class IV
                  </Typography>
                </div>
              </div>
            </Grid>
            <Grid container>
              <div className={classes.mainDiv}>
                <div className={classes.contentDiv}>
                  <Typography className={`${classes.lightText}`}>
                    Male | 10yrs | DOB: 05/05/2010
                  </Typography>
                </div>
              </div>
            </Grid>
          </div>
        </ProfileCard>
      </div>
    </>
  );
};

export default StudentParents;
