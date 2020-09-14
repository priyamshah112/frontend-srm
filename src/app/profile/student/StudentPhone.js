import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import ProfileCard from '../ProfileCard';
import { Typography } from '@material-ui/core';
import userIcon from '../../../assets/images/profile/User.svg';
import phoneIcon from '../../../assets/images/profile/Phone number.svg';
import emailIcon from '../../../assets/images/profile/Email.svg';

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
  detailsSpan: {
    paddingLeft: '30px',
  },
  detailsStyle: {
    paddingLeft: '10px',
  },
  iconStyle: {
    height: '14px',
  },
  mainMarginTop: {
    marginTop: '10px',
  },
}));
const StudentPhone = (props) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.profileContainer}>
        <ProfileCard title='Contact Details'>
          <Grid container>
            <div className={classes.mainDiv}>
              <div className={classes.contentDiv}>
                <Typography
                  className={`${classes.normalText} ${classes.margin5}`}
                >
                  Samarth Atmakur
                </Typography>
              </div>
            </div>
          </Grid>
          <Grid container>
            <div className={classes.mainDiv}>
              <div className={classes.contentDiv}>
                <Typography className={` ${classes.margin5}`}>
                  <span>
                    <img src={userIcon} />
                    <span className={classes.detailsStyle}>Male</span>
                  </span>
                  <span className={classes.detailsSpan}>
                    <img src={phoneIcon} className={classes.iconStyle} />
                    <span className={classes.detailsStyle}>Male</span>
                  </span>
                  <span className={classes.detailsSpan}>
                    <img src={emailIcon} />
                    <span className={classes.detailsStyle}>Male</span>
                  </span>
                </Typography>
              </div>
            </div>
          </Grid>
        </ProfileCard>
      </div>
    </>
  );
};

export default StudentPhone;
