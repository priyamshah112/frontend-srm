import React, { useState, useRef, useEffect } from 'react';

import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/styles';

import ChangeEmailOtp from './ChangeEmailOtp';

import phoneSvg from '../../assets/images/Desktop Phone number.svg';
import { Dialog, DialogContent, Typography } from '@material-ui/core';
import BackdropLoader from '../common/ui/backdropLoader/BackdropLoader';
import phoneIcon from '../../assets/images/profile/Email.svg';

import ProfileService from './ProfileService';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

const useStyle = makeStyles((theme) => ({
  dialogPaper: {
    width: '300px',
  },
  cardHeader: {
    textAlign: 'left',
  },
  profileTitle: {
    display: 'inline',
    marginLeft: '5px',
    fontWeight: 500,
    fontSize: '14px',
    textTransform: 'uppercase',
  },
  iconStyle: {
    width: '19px',
    height: '19px',
    transform: 'translateY(4px)',
  },
  formStyle: {
    margin: 'auto',
    width: '100%',
    justifyContent: 'center',
    textAlign: 'center',
    paddingBttom: '20px',
  },
  boxMargin: {
    marginTop: '30px',
    '@media (max-width:400px)': {
      marginTop: '10px',
    },
  },
  fieldStyle: {
    width: '100%',
    margin: 'auto',
    '& .MuiInput-underline:before': {
      borderBottom: '2px solid #eaeaea',
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: '2px solid #7B72AF',
      transitionProperty: 'border-bottom-color',
      transitionDuration: '500ms',
      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  dataContentRoot: {
    padding: '24px',
  },
  errorColor: {
    color: 'red',
  },
  inputBorder: {
    height: '50px',
    '& span': {
      paddingLeft: '10px',
    },
  },
  margin: {
    marginTop: '10px',
    '@media (max-width:400px)': {
      marginTop: '10px',
    },

    '& .loginBtn': {
      borderRadius: '6px',
      marginBotton: '10px',
      // opacity: '0.5',
    },
  },
}));

const ChangeEmail = (props) => {
  const classes = useStyle();
  const history = useHistory();
  const userInfo = props.userInfo;
  const [userSubmit, setUserSubmit] = useState(false);
  const [user, setUser] = useState('');
  const [isPhone, setIsPhone] = useState(false);
  const [isChild, setIsChild] = useState(false);
  const [token, setToken] = useState('');
  const [errMessage, setError] = useState('');
  const [parentContacts, setParentContacts] = useState([]);
  const [selectedParentContact, setSelectedParentContact] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);

  async function getOtpFunction(userData) {
    try {
      console.log('Send OTP Function for user: ', userData);
      handleLoading(true);
      const response = await ProfileService.sendOtp({
        username: userData,
        send_direct: 'true',
        user_id: userInfo['id'],
      });
      console.log('OTP is: ', response.data.data.otp);
      setToken(response.data.data.access_token);
      handleLoading(false);

      if (response.status === 200) {
        console.log('OTP Sent Successfully');
        setUserSubmit(true);
      }
    } catch (error) {
      console.log(error);
      setError('Check your email');
      handleLoading(false);
    }
  }

  const handleCloseParentDetails = () => {
    setIsChild(false);
  };

  const submitForm = (event) => {
    event.preventDefault();
    setDisable(true);
    getOtpFunction(user);
  };

  const handleLoading = (load) => {
    setLoading(load);
  };

  const handleForm = (event) => {
    setError('');
    setDisable(false);
    setUser(event.target.value);
  };
  useEffect(() => {
    if (isPhone) {
      getOtpFunction(user);
    }
  }, [isPhone]);
  const render = (
    <>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        maxWidth={'xs'}
        fullWidth={false}
        classes={{ paper: classes.dialogPaper }}
      >
        <DialogContent classes={{ root: classes.dataContentRoot }}>
          <div className={classes.cardHeader}>
            <img src={phoneIcon} className={classes.iconStyle} />
            <Typography className={classes.profileTitle}>
              Change Email Address
            </Typography>
          </div>
          <Typography className={`${classes.errorColor}`}>
            {errMessage}
          </Typography>
          <form className={classes.formStyle} onSubmit={submitForm}>
            <Box className={classes.margin}>
              <FormControl className={classes.fieldStyle}>
                <Input
                  id='username'
                  name='username'
                  className={classes.inputBorder}
                  type='email'
                  onChange={handleForm}
                  placeholder='Enter Email Address'
                  required
                />
              </FormControl>
            </Box>

            <Box className={classes.margin}>
              <Button
                id='phoneSubmit'
                type='submit'
                variant='contained'
                className={`${classes.fieldStyle} ${'loginBtn'}`}
                color='primary'
                disableElevation
                disabled={disable}
              >
                SUBMIT
              </Button>
            </Box>
            <Box className={classes.margin}>
              <Button
                id='phoneSubmit'
                type='submit'
                variant='outlined'
                className={`${classes.fieldStyle} ${'loginBtn'}`}
                color='oulined'
                disableElevation
                onClick={(event) => {
                  props.handleClose();
                }}
              >
                Cancel
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );

  return (
    <>
      {userSubmit ? (
        <ChangeEmailOtp
          open={props.open}
          onClose={props.handleClose}
          editableId={props.editableId}
          userId={userInfo['id']}
          user={user}
          handleLoading={handleLoading}
          token={token}
        />
      ) : (
        render
      )}
      <BackdropLoader open={isLoading} />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.auth.userInfo,
  };
};

export default connect(mapStateToProps)(ChangeEmail);
