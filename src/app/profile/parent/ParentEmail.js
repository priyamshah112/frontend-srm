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
const ParentEmail = (props) => {
  const classes = useStyles();

  const primary = props.primary;
  const secondary = props.secondary;
  const secondaryEmailId = props.secondaryEmailId;
  return (
    <>
      <div className={classes.profileContainer}>
        <ProfileCard title='Email' editableId={secondaryEmailId}>
          <Grid container>
            <div className={classes.mainDiv}>
              <div className={classes.contentDiv}>
                <Typography className={classes.labelText}>Primary -</Typography>
              </div>
              <div className={classes.contentDiv}>
                <Typography
                  className={`${classes.normalText} ${classes.margin5}`}
                >
                  {primary ? primary : 'N/A'}
                </Typography>
              </div>
            </div>
            <div className={`${classes.mainDiv} ${classes.mainMarginLeft}`}>
              <div className={classes.contentDiv}>
                <Typography className={classes.labelText}>
                  Secondary -
                </Typography>
              </div>
              <div className={classes.contentDiv}>
                <Typography
                  className={`${classes.normalText} ${classes.margin5}`}
                >
                  {secondary ? secondary : 'N/A'}
                </Typography>
              </div>
            </div>
          </Grid>
          <Grid container>
            <div className={`${classes.mainDiv} ${classes.mainMarginTop}`}>
              <Typography className={classes.labelText}>
                NOTE - Only secondary emails can be edited. Please click on
                “Edit Button” for changing secondary emails.
              </Typography>
            </div>
          </Grid>
        </ProfileCard>
      </div>
    </>
  );
};

export default ParentEmail;
