import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import StudentProfileCard from '../StudentProfileCard';
import { Typography } from '@material-ui/core';
import profileImage from './cr7.jpg';

const useStyles = makeStyles((theme) => ({
  profileContainer: {
    width: '95%',
    margin: '0 auto',
  },
  profile: {
    textAlign: 'right',
  },
  profilePictureDiv: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    marginLeft: 'auto',
    border: '1px solid',
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
  capitalize: {
    textTransform: 'capitaize',
  },
  mainMarginTop: {
    marginTop: '10px',
  },
  TopContent: {
    paddingTop: '10px',
    borderBottom: '1px solid #D1D1D6',
    paddingBottom: '10px',
  },
}));
const StudentParents = (props) => {
  const classes = useStyles();
  const parentsData = props.parentsData;
  return (
    <>
      <div className={classes.profileContainer}>
        <StudentProfileCard title='Parents'>
          {parentsData.map((parents) => {
            return (
              <div className={classes.TopContent}>
                <Grid container>
                  <Grid item xs={8}>
                    <div className={classes.mainDiv}>
                      <div className={classes.contentDiv}>
                        <Typography className={`${classes.normalText}`}>
                          {parents.parents_data['firstname']}{' '}
                          {parents.parents_data['lastname']}
                        </Typography>
                      </div>
                    </div>
                    <div className={classes.mainDiv}>
                      <div className={classes.contentDiv}>
                        <Typography className={`${classes.lightText}`}>
                          <span className={classes.capitalize}>
                            {parents['relation_type']}
                          </span>
                        </Typography>
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={4}>
                    <div className={classes.profile}>
                      <div
                        className={classes.profilePictureDiv}
                        style={{
                          backgroundImage: `url(${parents.parents_data['thumbnail']})`,
                          'background-repeat': 'no-repeat',
                          'background-size': 'cover',
                          'background-position': 'center',
                        }}
                      ></div>
                    </div>
                  </Grid>
                </Grid>
              </div>
            );
          })}
        </StudentProfileCard>
      </div>
    </>
  );
};

export default StudentParents;
