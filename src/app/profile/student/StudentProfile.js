import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import StudentPhone from './StudentPhone';
import StudentAddress from './StudentAddress';
import StudentParents from './StudentParents';

import { Typography, Button, Snackbar } from '@material-ui/core';
import editButtonIcon from '../../../assets/images/Edit Button.svg';
import MuiAlert from '@material-ui/lab/Alert';
import profileImage from './cr7.jpg';
import ChangePassword from '../ChangePassword';
import { connect } from 'react-redux';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

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
const StudentProfile = (props) => {
  const classes = useStyles();
  const [openChangePass, setOpenChanegPass] = useState(false);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [snackbarmsg, setSnackbarmsg] = useState('');
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);

  const userInfo = props.userInfo;

  const handleSnackbar = (success, message, error) => {
    setSuccessSnackbarOpen(success);
    setSnackbarmsg(message);
    setErrorSnackbarOpen(error);
  };

  const changePassClose = () => {
    setOpenChanegPass(false);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessSnackbarOpen(false);
    setErrorSnackbarOpen(false);
  };

  console.log('user info:', userInfo);

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
        <StudentPhone />
        <StudentAddress />
        <StudentParents />
        <div className={classes.changePwdDiv}>
          <Button
            variant='outlined'
            color='primary'
            className={classes.changePwd}
            onClick={(event) => {
              setOpenChanegPass(true);
            }}
          >
            Change Password
          </Button>
        </div>
      </div>
      <br />
      <br />
      {/* <ChangePassword open={openChangePass} onClose={changePassClose} /> */}
      {openChangePass ? (
        <ChangePassword
          open={openChangePass}
          handleClose={changePassClose}
          handleSnackbar={handleSnackbar}
        />
      ) : (
        ''
      )}

      <Snackbar
        open={successSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity='success'>
          {snackbarmsg}
        </Alert>
      </Snackbar>
      <Snackbar
        open={errorSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity='error'>
          {snackbarmsg}
        </Alert>
      </Snackbar>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.auth.userInfo,
  };
};

export default connect(mapStateToProps)(StudentProfile);
