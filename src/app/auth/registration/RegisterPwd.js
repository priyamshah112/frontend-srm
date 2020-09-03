import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/styles';

import AuthContainer from '../AuthContainer';
import RegisterService from './RegisterService';
import passwordSvg from '../../../assets/images/Desktop Password.svg';
import { Typography, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyle = makeStyles((theme) => ({
  formStyle: {
    margin: 'auto',
    width: '100%',
    justifyContent: 'center',
    textAlign: 'center',
  },
  fieldStyle: {
    width: '80%',
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
    marginTop: '30px',
    paddingBottom: '20px',
    '@media (max-width:400px)': {
      marginTop: '10px',
    },

    '& .loginBtn': {
      borderRadius: '6px',
    },
  },
}));

const ChangePwd = (props) => {
  const [disableBtn, setDisableBtn] = useState(false);
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [mismatchErr, setMismatchErr] = useState(false);
  const [errMessage, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showCnfPassword, setShowCnfPassword] = useState(false);

  const classes = useStyle();
  const helperTextRef = useRef();
  const history = useHistory();

  useEffect(() => {
    if (password === rePassword) {
      setMismatchErr(false);
      setDisableBtn(false);
      helperTextRef.current.style.display = 'none';
    } else {
      setMismatchErr(true);
      setDisableBtn(true);
      helperTextRef.current.style.display = 'block';
    }
  }, [password, rePassword]);

  const handleChangePassword = async (event) => {
    event.preventDefault();
    console.log(event);
    if (password.length < 6) {
      setError('Password should have more than 6 characters');
    } else {
      try {
        const Bearertoken = props.token;
        const confirm_password = rePassword;
        const response = await RegisterService.changePassword(Bearertoken, {
          new_password: password,
          confirm_password: confirm_password,
        });
        console.log(response);
        if (response.data.message === 'Password updated successfully.') {
          history.push({
            pathname: '/login',
            search: `?register=true`,
          });
        } else {
          history.push({
            pathname: '/login',
            search: `?register=false`,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handlePassword = (event) => {
    setError('');
    setPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowCnfPassword = () => {
    setShowCnfPassword(!showCnfPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseDownCnfPassword = (event) => {
    event.preventDefault();
  };

  const handleConfirmPassword = (event) => {
    setError('');
    setRePassword(event.target.value);
  };

  return (
    <>
      <AuthContainer title={'Register'}>
        <div>
          <Typography className={`${classes.errorColor}`}>
            {errMessage}
          </Typography>
          <form className={classes.formStyle} onSubmit={handleChangePassword}>
            <Box className={classes.margin}>
              <FormControl className={classes.fieldStyle}>
                <Input
                  id='password'
                  className={classes.inputBorder}
                  type={showPassword ? 'text' : 'password'}
                  startAdornment={
                    <InputAdornment position='start'>
                      <img src={passwordSvg} width='40px' alt='Phone SVG' />
                    </InputAdornment>
                  }
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
                  startAdornment={
                    <InputAdornment position='start'>
                      <img src={passwordSvg} width='40px' alt='Phone SVG' />
                    </InputAdornment>
                  }
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
                  placeholder='Confirm passoword'
                />
                <FormHelperText
                  ref={helperTextRef}
                  className={classes.helperText}
                >
                  *password not matching
                </FormHelperText>
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
                SUBMIT
              </Button>
            </Box>
          </form>
        </div>
      </AuthContainer>
      {/* <SuccessDialog open={success} msg={successMsg} /> */}
    </>
  );
};

export default ChangePwd;
