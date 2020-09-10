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
}));
const ParentAssociated = (props) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.profileContainer}>
        <ProfileCard title='Associated Accounts'>
          <div className={classes.TopContent}>
            <Grid container>
              <div className={classes.mainDiv}>
                <div className={classes.contentDiv}>
                  <Typography className={`${classes.normalText}`}>
                    Suresh Atmakur
                  </Typography>
                </div>
              </div>
            </Grid>
            <Grid container>
              <div className={classes.mainDiv}>
                <div className={classes.contentDiv}>
                  <Typography className={`${classes.lightText}`}>
                    Father
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

export default ParentAssociated;
