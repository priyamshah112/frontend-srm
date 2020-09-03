import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import ProfileCard from '../ProfileCard';
import { Typography, Box, CardContent, CardActions } from '@material-ui/core';
import Card from '@material-ui/core/Card';

import taskBookIcon from '../../../assets/images/home/teacher/TaskBook.svg';
import userIcon from '../../../assets/images/profile/User.svg';
import phoneIcon from '../../../assets/images/profile/Phone number.svg';
import emailIcon from '../../../assets/images/profile/Email.svg';
import AddIcon from '../../../assets/images/Add.svg';
import locationIcon from '../../../assets/images/profile/location.svg';
import editIcon from '../../../assets/images/Edit Button.svg';

const useStyles = makeStyles((theme) => ({
  profileContainer: {
    width: '95%',
    margin: '0 auto',
  },
}));
const ParentProfile = (props) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.profileContainer}>
        <ProfileCard title='Parent'>Parent Content</ProfileCard>
      </div>
    </>
  );
};

export default ParentProfile;
