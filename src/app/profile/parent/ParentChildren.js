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
  mainMarginTop: {
    marginTop: '10px',
  },
  TopContent: {
    // borderBottom: '1px solid #D1D1D6',
    // paddingBottom: '20px',
  },
  capitalize: {
    textTransform: 'capitalize',
  },
  BottomContent: {
    paddingTop: '20px',
  },
}));
const ParentChildren = (props) => {
  const classes = useStyles();
  const students = props.students;
  return (
    <>
      <div className={classes.profileContainer}>
        <ProfileCard title='Children'>
          {students.map((student, index) => {
            return (
              <div className={classes.TopContent} key={index}>
                <Grid container>
                  <Grid item xs={8}>
                    <Grid container>
                      <div className={classes.mainDiv}>
                        <div className={classes.contentDiv}>
                          <Typography className={`${classes.normalText}`}>
                            {student.firstname} {student.lastname}
                          </Typography>
                        </div>
                      </div>
                    </Grid>
                    <Grid container>
                      <div className={classes.mainDiv}>
                        <div className={classes.contentDiv}>
                          <Typography className={`${classes.lightText}`}>
                            {/* Male | 10yrs | DOB: 05/05/2010 */}
                            <span className={classes.capitalize}>
                              {student.gender}
                            </span>
                          </Typography>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                  <Grid item xs={4}>
                    <div className={classes.profile}>
                      <div
                        className={classes.profilePictureDiv}
                        style={{
                          backgroundImage: `url(${student['thumbnail']})`,
                          'background-repeat': 'no-repeat',
                          'background-size': 'cover',
                          'background-position': 'center',
                        }}></div>
                    </div>
                  </Grid>
                </Grid>
                <br />
              </div>
            );
          })}
        </ProfileCard>
      </div>
    </>
  );
};

export default ParentChildren;
