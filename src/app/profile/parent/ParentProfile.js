import React from 'react';
import { makeStyles } from '@material-ui/styles';
import ParentPhone from './ParentPhone';
import ParentEmail from './ParentEmail';
import ParentAddress from './ParentAddress';
import ParentChildren from './ParentChildren';
import ParentAssociated from './ParentAssociated';
import { Typography, Button } from '@material-ui/core';
import editButtonIcon from '../../../assets/images/Edit Button.svg';
import profileImage from './cr7.jpg';

const useStyles = makeStyles((theme) => ({
  profileNameDiv: {
    textAlign: 'center',
    marginTop: '30px',
  },
  profilePictureDiv: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    margin: 'auto',
    border: '1px solid',
  },
  editProfile: {
    transform: 'translate(40px,85px)',
    cursor: 'pointer',
  },
  profileName: {
    fontStyle: 'normal',
    fontSize: '24px',
    fontWeight: 500,
  },
  changePwdDiv: {
    width: '95%',
    marginTop: '40px',
    margin: 'auto',
  },
  changePwd: {
    width: '100%',
    height: '50px',
    borderRadius: '5px',
    borderWidth: '2px',
    borderStyle: 'solid',
  },
}));
const ParentProfile = (props) => {
  const classes = useStyles();
  return (
    <>
      <div>
        <div className={classes.profileNameDiv}>
          <div
            className={classes.profilePictureDiv}
            style={{
              backgroundImage: `url(${profileImage})`,
              'background-repeat': 'no-repeat',
              'background-size': 'cover',
              'background-position': 'center',
            }}
          >
            <img
              src={editButtonIcon}
              alt='Edit Profile Pic'
              className={classes.editProfile}
            />
          </div>
          <Typography className={classes.profileName}>
            Pratyusha Atmakur
          </Typography>
        </div>
        <ParentPhone />
        <ParentEmail />
        <ParentAddress />
        <ParentChildren />
        <ParentAssociated />
        <div className={classes.changePwdDiv}>
          <Button
            variant='outlined'
            color='primary'
            className={classes.changePwd}
          >
            Change Password
          </Button>
        </div>
      </div>
      <br />
      <br />
    </>
  );
};

export default ParentProfile;
