import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import ParentPhone from './ParentPhone';
import ParentEmail from './ParentEmail';
import ParentAddress from './ParentAddress';
import ParentChildren from './ParentChildren';
import ParentAssociated from './ParentAssociated';
import {
  Typography,
  Button,
  Snackbar,
  Input,
  IconButton,
} from '@material-ui/core';
import editButtonIcon from '../../../assets/images/Edit Button.svg';
import MuiAlert from '@material-ui/lab/Alert';
import ChangePassword from '../ChangePassword';
import ProfileService from '../ProfileService';
import { connect } from 'react-redux';
import BackdropLoader from '../../common/ui/backdropLoader/BackdropLoader';
import { useHistory } from 'react-router-dom';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const useStyles = makeStyles((theme) => ({
  profileNameDiv: {
    textAlign: 'center',
    marginTop: '30px',
  },
  input: {
    display: 'none',
  },
  profilePictureDiv: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    margin: 'auto',
    border: '1px solid',
  },
  editProfile: {
    transform: 'translate(35px,75px)',
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
  const history = useHistory();
  const [openChangePass, setOpenChanegPass] = useState(false);
  const [openLoader, setOpenLoader] = useState(true);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [snackbarmsg, setSnackbarmsg] = useState('');
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userPic, setUserPic] = useState(null);
  const [primaryPhone, setPrimaryPhone] = useState('');
  const [secondaryPhone, setSecondaryPhone] = useState('');
  const [secondaryPhoneId, setSecondaryPhoneId] = useState();

  const [primaryEmail, setPrimaryEmail] = useState('');
  const [secondaryEmail, setSecondaryEmail] = useState('');
  const [secondaryEmailId, setSecondaryEmailId] = useState();
  const [studentsData, setStudentsData] = useState([]);
  const [addressId, setAddressId] = useState();
  const [newUserPic, setNewUserPic] = useState('');
  const [username, setUsername] = useState('');
  const [associatedAccounts, setAssociatedAccounts] = useState([]);
  const [showNoAdd, setShowNoAdd] = useState(false);

  const [address, setAddress] = useState();

  const userInfo = props.userInfo;
  const currentUserId = userInfo['id'];

  useEffect(() => {
    let loading = true;
    const getUser = async () => {
      try {
        const token = localStorage.getItem('srmToken');
        const response = await ProfileService.fetchuser(token, userInfo['id']);
        if (response.status === 200) {
          if (loading) {
            setUserData(response.data.data);
            setUserPic(response.data.data.user_details['thumbnail']);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    const getPhones = async () => {
      try {
        const token = localStorage.getItem('srmToken');
        const response = await ProfileService.fetchPhones(token);
        if (response.status === 200) {
          if (loading) {
            setPrimaryPhone(response.data.data[0]['phone_number']);
            setSecondaryPhone(response.data.data[1]['phone_number']);
            setSecondaryPhoneId(response.data.data[1]['id']);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    const getEmails = async () => {
      try {
        const token = localStorage.getItem('srmToken');
        const response = await ProfileService.fetchEmails(token);
        if (response.status === 200) {
          if (loading) {
            setPrimaryEmail(response.data.data[0]['email']);
            setSecondaryEmail(response.data.data[1]['email']);
            setSecondaryEmailId(response.data.data[1]['id']);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    const getAddress = async () => {
      try {
        const token = localStorage.getItem('srmToken');
        const response = await ProfileService.fetchAddress(token);
        if (response.status === 200) {
          if (loading) {
            if (response.data.data.length === 0) {
              setShowNoAdd(true);
            } else {
              setAddress(response.data.data[0]);
              setAddressId(response.data.data[0]['id']);
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getStudents = async () => {
      try {
        const token = localStorage.getItem('srmToken');
        const response = await ProfileService.fetchStudents(token);
        if (response.status === 200) {
          if (loading) {
            let temp = [];
            response.data.data.map((students) => {
              temp.push(students.students_data);
              setUsername(students.students_data.username);
            });
            setStudentsData(temp);
          }
        }
      } catch (error) {
        console.log(error);
      }
      setOpenLoader(false);
    };
    getUser();
    getPhones();
    getEmails();
    getAddress();
    getStudents();
    return () => {
      loading = false;
    };
  }, []);

  useEffect(() => {
    let isLoading = true;
    const getAssociated = async () => {
      try {
        const token = localStorage.getItem('srmToken');
        const response = await ProfileService.fetchParents(token, username);
        if (response.status === 200) {
          if (isLoading) {
            let temp = [];
            response.data.data.map((parents) => {
              if (currentUserId !== parents.parents_data.id) {
                temp.push(parents);
              }
            });
            setAssociatedAccounts(temp);
          }
        } else {
          console.log('Error');
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (username !== '') {
      getAssociated();
    }
    return () => {
      isLoading = false;
    };
  }, [username]);

  const updateProfilePic = async () => {
    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    const imageString = await toBase64(newUserPic);
    try {
      const token = localStorage.getItem('srmToken');
      const response = await ProfileService.updateUserPic(
        token,
        userInfo['id'],
        {
          thumbnail: imageString,
        }
      );
      if (response.status === 200) {
        history.push('/profile');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (newUserPic) {
      updateProfilePic();
    }
  }, [newUserPic]);

  const handleChangeProfilePic = (event) => {
    setNewUserPic(event.target.files[0]);
  };

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

  return (
    <>
      <div>
        <div className={classes.profileNameDiv}>
          <div
            className={classes.profilePictureDiv}
            style={{
              backgroundImage: `url(${userPic})`,
              'background-repeat': 'no-repeat',
              'background-size': 'cover',
              'background-position': 'center',
            }}
          >
            <form>
              <Input
                id='icon-button-file'
                name='file'
                className={`${classes.input}`}
                type='file'
                onChange={handleChangeProfilePic}
                placeholder='Document'
                accept='image/*'
              />
            </form>
            <label htmlFor='icon-button-file'>
              <IconButton
                color='primary'
                aria-label='upload picture'
                component='span'
                className={classes.editProfile}
              >
                <img src={editButtonIcon} alt='Edit Profile Pic' />
              </IconButton>
            </label>
          </div>
          <Typography className={classes.profileName}>
            {userData
              ? `${userData.user_details['firstname']} ${userData.user_details['lastname']}`
              : ''}
          </Typography>
        </div>
        <ParentPhone
          primary={primaryPhone}
          secondary={secondaryPhone}
          secondaryPhoneId={secondaryPhoneId}
        />
        <ParentEmail
          primary={primaryEmail}
          secondary={secondaryEmail}
          secondaryEmailId={secondaryEmailId}
        />
        <ParentAddress
          address={address}
          addressId={addressId}
          showNoAdd={showNoAdd}
        />
        {studentsData.length === 0 ? (
          ''
        ) : (
          <ParentChildren students={studentsData} />
        )}
        {associatedAccounts.length === 0 ? (
          ''
        ) : (
          <ParentAssociated associatedAccounts={associatedAccounts} />
        )}
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
      <BackdropLoader open={openLoader} />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.auth.userInfo,
  };
};

export default connect(mapStateToProps)(ParentProfile);
