import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import ProfileCard from './ProfileCard';
import { Typography, Box, CardContent, CardActions } from '@material-ui/core';
import Card from '@material-ui/core/Card';

import taskBookIcon from '../../assets/images/home/teacher/TaskBook.svg';
import userIcon from '../../assets/images/profile/User.svg';
import phoneIcon from '../../assets/images/profile/Phone number.svg';
import emailIcon from '../../assets/images/profile/Email.svg';
import AddIcon from '../../assets/images/Add.svg';
import locationIcon from '../../assets/images/profile/location.svg';
import editIcon from '../../assets/images/Edit Button.svg';
import ParentProfile from './parent/ParentProfile';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    backgroundColor: theme.palette.mainBackground,
    height: '100%',
    marign: '0',
    padding: '0',
    overflowY: 'auto',
  },
  profileContainer: {
    width: '95%',
    margin: '0 auto',
  },
}));
const Profile = (props) => {
  const classes = useStyles();
  const selectedRole = props.selectedRole;
  return (
    <div className={classes.container}>
      {selectedRole === 'parent' ? <ParentProfile /> : ''}
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedRole: state.auth.selectedRole,
  };
};

export default connect(mapStateToProps)(Profile);
