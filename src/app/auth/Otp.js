import React, { useState, useRef } from 'react';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/styles';

import AuthContainer from './AuthContainer';

import phoneSvg from '../../assets/images/Desktop Phone number.svg';
import passwordSvg from '../../assets/images/Desktop Password.svg';

const useStyle = makeStyles((theme) => ({
  formStyle: {
    margin: 'auto',
    width: '100%',
    justifyContent: 'center',
    textAlign: 'center',
  },
  boxMargin: {
    marginTop: '30px',
    '@media (max-width:400px)': {
      marginTop: '10px',
    },
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
    '& span': {
      paddingLeft: '10px',
    },
  },
  margin: {
    marginTop: '30px',
    '@media (max-width:400px)': {
      marginTop: '10px',
    },

    '& .loginBtn': {
      borderRadius: '6px',
      // opacity: '0.5',
    },
  },
  rePass: {
    display: 'none',
  },
}));

const Otp = (props) => {
  const classes = useStyle();
  const otp_ref = useRef(null);
  const rePass_ref = useRef(null);

  let [isDisable, setdisable] = useState(true);
  let [otp, setotp] = useState('');

  const submitForm = (event) => {
    event.preventDefault();
    rePass_ref.current.style.display = 'true';
  };

  const validate = (event) => {
    let name = event.target.name;
    const otp_re = /^[0-9]{6}$/gm;
    if (name === 'otp') {
      setotp((otp = event.target.value));
    }
    if (otp_re.test(otp)) {
      setdisable(false);
    } else {
      setdisable(true);
    }
  };

  return (
    <AuthContainer title='Register'>
      <div>
        <Box className={classes.boxMargin}></Box>
        <form className={classes.formStyle} onSubmit={submitForm}>
          <Box className={classes.margin}>
            <FormControl className={classes.fieldStyle}>
              <Input
                id='otp'
                ref={otp_ref}
                name='otp'
                className={classes.inputBorder}
                type='text'
                onChange={validate}
                placeholder='Enter OTP'
                startAdornment={
                  <InputAdornment position='start'>
                    <img src={phoneSvg} width='40px' alt='Phone SVG' />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>

          <Box
            className={`${classes.margin} ${classes.rePass}`}
            ref={rePass_ref}
          >
            <FormControl className={classes.fieldStyle}>
              <Input
                id='repassword'
                name='repassword'
                className={classes.inputBorder}
                type=''
                placeholder='Re-Enter Password'
                startAdornment={
                  <InputAdornment position='start'>
                    <img src={passwordSvg} width='40px' alt='Password SVG' />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
          <Box className={classes.margin}>
            <Button
              id='loginBtn'
              type='submit'
              variant='contained'
              className={`${classes.fieldStyle} ${'loginBtn'}`}
              color='primary'
              disabled={isDisable}
              disableElevation
            >
              SUBMIT
            </Button>
          </Box>
        </form>
      </div>
    </AuthContainer>
  );
};

export default Otp;
