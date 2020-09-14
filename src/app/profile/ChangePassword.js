import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import MuiAlert from '@material-ui/lab/Alert';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Box from '@material-ui/core/Box';

import passwordSvg from '../../assets/images/Desktop Password.svg';
import { IconButton, Snackbar } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import ProfileService from './ProfileService';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    width: '369px',
  },
  dialogActionsContainer: {
    '&.MuiDialogActions-root': {
      justifyContent: 'center',
      marginBottom: '10px',
    },
  },
  button: {
    minWidth: '80px',
    textTransform: 'none',
  },
  confirmationText: {
    fontWeight: 500,
    fontSize: '1rem',
    color: '#000000',
  },
  dialogContent: {
    textAlign: 'center',
  },
  formStyle: {
    margin: 'auto',
    width: '100%',
    justifyContent: 'center',
    textAlign: 'center',
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
  inputBorder: {
    height: '50px',
  },
  errorColor: {
    color: 'red',
  },
  helperText: {
    color: '#f44336',
    display: 'none',
  },
  margin: {
    marginTop: '20px',
    // paddingBottom: '20px',
    '@media (max-width:400px)': {
      marginTop: '10px',
    },
    '& .loginBtn': {
      borderRadius: '6px',
    },
  },
  marginBottom: {
    marginBottom: '20px',
  },
}));

const ChangePassword = (props) => {
  const classes = useStyles();
  const { open, handleClose } = props;
  const history = useHistory();

  const [disableBtn, setDisableBtn] = useState(false);
  const [oldPass, setOldPass] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [mismatchErr, setMismatchErr] = useState(false);
  const [errMessage, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [showOldPass, setShowOldPass] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCnfPassword, setShowCnfPassword] = useState(false);

  useEffect(() => {
    if (password === '' || rePassword === '') {
      setDisableBtn(true);
    } else {
      if (password === rePassword) {
        setDisableBtn(false);
      } else {
        setDisableBtn(true);
      }
    }
  }, [password, rePassword]);

  const handleChangePassword = async (event) => {
    event.preventDefault();
    if (password.length < 6) {
      setError('Password should have more than 6 characters');
    } else {
      try {
        const token = localStorage.getItem('srmToken');
        const response = await ProfileService.changePassword(token, {
          old_password: oldPass,
          new_password: password,
          confirm_password: rePassword,
        });
        console.log('Response', response);
        if (response.data.status === 200) {
          handleClose();
          props.handleSnackbar(true, response.data.message, false);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleClickShowOldPass = () => {
    setShowOldPass(!showOldPass);
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowCnfPassword = () => {
    setShowCnfPassword(!showCnfPassword);
  };

  const handleOldPassword = (event) => {
    setOldPass(event.target.value);
  };

  const handlePassword = (event) => {
    setError('');
    setPassword(event.target.value);
  };
  const handleConfirmPassword = (event) => {
    setError('');
    setRePassword(event.target.value);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={'xs'}
        fullWidth={false}
        classes={{ paper: classes.dialogPaper }}
      >
        <DialogContent>
          <div>
            <form className={classes.formStyle} onSubmit={handleChangePassword}>
              <Typography variant='h6'>
                {/* <img src={passwordSvg} width='40px' alt='Phone SVG' /> */}
                Change Password
              </Typography>

              <Typography className={`${classes.errorColor}`}>
                {errMessage}
              </Typography>
              <Box className={classes.margin}>
                <FormControl className={classes.fieldStyle}>
                  <Input
                    id='oldPassword'
                    className={classes.inputBorder}
                    type={showOldPass ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleClickShowOldPass}
                        >
                          {showOldPass ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    required={true}
                    value={oldPass}
                    onChange={handleOldPassword}
                    placeholder='Old Password'
                  />
                </FormControl>
              </Box>
              <Box className={classes.margin}>
                <FormControl className={classes.fieldStyle}>
                  <Input
                    id='password'
                    className={classes.inputBorder}
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleClickShowPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    required={true}
                    value={password}
                    onChange={handlePassword}
                    placeholder='Password'
                  />
                </FormControl>
              </Box>
              <Box className={classes.margin}>
                <FormControl className={classes.fieldStyle}>
                  <Input
                    id='repassword'
                    className={classes.inputBorder}
                    type={showCnfPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle confirm password visibility'
                          onClick={handleClickShowCnfPassword}
                        >
                          {showCnfPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    required={true}
                    value={rePassword}
                    onChange={handleConfirmPassword}
                    error={mismatchErr}
                    placeholder='Re-enter passoword'
                  />
                </FormControl>
              </Box>
              <Box className={classes.margin}>
                <Button
                  variant='contained'
                  type='submit'
                  className={`${classes.fieldStyle} ${'loginBtn'}`}
                  color='primary'
                  disableElevation
                  disabled={disableBtn}
                >
                  Change
                </Button>
              </Box>
              <Box className={`${classes.margin} ${classes.marginBottom}`}>
                <Button
                  variant='outlined'
                  className={`${classes.fieldStyle} ${'loginBtn'}`}
                  color='primary'
                  disableElevation
                  onClick={props.handleClose}
                >
                  Cancel
                </Button>
              </Box>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChangePassword;
