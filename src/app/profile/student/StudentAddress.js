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
    color: `${theme.palette.common.blackRussian}`,
    fontWeight: 500,
    opacity: 1,
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
}));
const StudentAddress = (props) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.profileContainer}>
        <ProfileCard title='Address'>
          <Grid container>
            <div className={classes.mainDiv}>
              <div className={classes.contentDiv}>
                <Typography className={`${classes.normalText}`}>
                  #18, 1st A Main, Samrat Layout, Arekere, Bengaluru - 560076
                </Typography>
              </div>
            </div>
          </Grid>
        </ProfileCard>
      </div>
    </>
  );
};

export default StudentAddress;
