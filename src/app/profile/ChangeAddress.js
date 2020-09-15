import React, { useState, useRef, useEffect } from 'react';

import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/styles';

import ChangePhoneOtp from './ChangePhoneOtp';

import phoneSvg from '../../assets/images/Desktop Phone number.svg';
import {
  Dialog,
  DialogContent,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import BackdropLoader from '../common/ui/backdropLoader/BackdropLoader';
import phoneIcon from '../../assets/images/profile/location.svg';

import ProfileService from './ProfileService';
import { useHistory } from 'react-router-dom';
import { parse } from 'date-fns';

const useStyle = makeStyles((theme) => ({
  dialogPaper: {
    width: '400px',
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
    marginTop: '10px',
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

const ChangeAddress = (props) => {
  const classes = useStyle();
  const history = useHistory();
  const [userSubmit, setUserSubmit] = useState(false);
  const [add1, setAdd1] = useState('');
  const [add2, setAdd2] = useState('');
  const [add3, setAdd3] = useState('');
  const [landmark, setLandmark] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [reason, setReason] = useState('');
  const [document, setDocument] = useState();

  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [errMessage, setError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [disable, setDisable] = useState(true);
  const addressId = props.editableId;

  useEffect(() => {
    let loading = true;
    async function getCountriesFunction() {
      try {
        const token = localStorage.getItem('srmToken');
        const response = await ProfileService.fetchCountries(token);
        if (response.status === 200) {
          if (loading) {
            setCountryData(response.data.data);
          }
        }
      } catch (error) {
        console.log(error);
        setError('User not found');
        handleLoading(false);
      }
    }
    getCountriesFunction();
    return () => {
      loading = false;
    };
  }, []);

  useEffect(() => {
    async function getStatesFunction() {
      try {
        const token = localStorage.getItem('srmToken');
        const response = await ProfileService.fetchStates(token, {
          country_id: parseInt(selectedCountry),
        });
        if (response.status === 200) {
          setStateData(response.data.data);
        }
      } catch (error) {
        console.log(error);
        setError('User not found');
        handleLoading(false);
      }
    }
    if (selectedCountry !== '') {
      getStatesFunction();
    }
  }, [selectedCountry]);

  useEffect(() => {
    async function getCitiesFunction() {
      try {
        const token = localStorage.getItem('srmToken');
        const response = await ProfileService.fetchCities(token, {
          state_id: parseInt(selectedState),
        });
        if (response.status === 200) {
          setCityData(response.data.data);
        }
      } catch (error) {
        console.log(error);
        setError('User not found');
        handleLoading(false);
      }
    }
    if (selectedState !== '') {
      getCitiesFunction();
    }
  }, [selectedState]);

  async function updateAddressFunction(addressObj) {
    try {
      const token = localStorage.getItem('srmToken');
      const response = await ProfileService.updateAddress(
        token,
        addressId,
        addressObj
      );
      if (response.status === 200) {
        console.log(response);
        history.push('/profile');
      }
    } catch (error) {
      console.log(error);
      setError('Failed to Update');
    }
  }

  const submitForm = (event) => {
    event.preventDefault();
    console.log('Document', document);
    let addressObj = {
      address_line1: add1,
      address_line2: add2,
      address_line3: add3,
      landmark: landmark,
      country_id: parseInt(selectedCountry),
      state_id: parseInt(selectedState),
      city_id: parseInt(selectedCity),
      pincode: pinCode,
    };
    console.log('Submitted', addressObj);
    updateAddressFunction(addressObj);
  };

  const handleLoading = (load) => {
    setLoading(load);
  };

  const handleForm = (event) => {
    setError('');
    if (event.target.name === 'flat') {
      setAdd1(event.target.value);
    }
    if (event.target.name === 'area') {
      setAdd2(event.target.value);
    }
    if (event.target.name === 'address3') {
      setAdd3(event.target.value);
    }
    if (event.target.name === 'landmark') {
      setLandmark(event.target.value);
    }
    if (event.target.name === 'pincode') {
      setPinCode(event.target.value);
    }
    if (event.target.name === 'reason') {
      setReason(event.target.value);
    }
    if (event.target.name === 'file') {
      setDocument(event.target.files[0]);
    }
  };

  const handleCountry = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleState = (event) => {
    setSelectedState(event.target.value);
  };

  const handleCity = (event) => {
    setSelectedCity(event.target.value);
  };

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
              Change Address
            </Typography>
          </div>
          <Typography className={`${classes.errorColor}`}>
            {errMessage}
          </Typography>
          <form
            encType='multipart/form-data'
            className={classes.formStyle}
            onSubmit={submitForm}
          >
            <Box className={classes.margin}>
              <FormControl className={classes.fieldStyle}>
                <Input
                  id='flat'
                  name='flat'
                  className={classes.inputBorder}
                  type='text'
                  onChange={handleForm}
                  placeholder='Flat/Home Number'
                />
              </FormControl>
            </Box>
            <Box className={classes.margin}>
              <FormControl className={classes.fieldStyle}>
                <Input
                  id='area'
                  name='area'
                  className={classes.inputBorder}
                  type='text'
                  onChange={handleForm}
                  placeholder='Area, Street Number'
                />
              </FormControl>
            </Box>
            <Box className={classes.margin}>
              <FormControl className={classes.fieldStyle}>
                <Input
                  id='address3'
                  name='address3'
                  className={classes.inputBorder}
                  type='text'
                  onChange={handleForm}
                  placeholder='Address Line 3'
                />
              </FormControl>
            </Box>
            <Box className={classes.margin}>
              <FormControl className={classes.fieldStyle}>
                <Input
                  id='landmark'
                  name='landmark'
                  className={classes.inputBorder}
                  type='text'
                  onChange={handleForm}
                  placeholder='Landmark'
                />
              </FormControl>
            </Box>

            <Box className={classes.margin}>
              <FormControl className={classes.fieldStyle}>
                <InputLabel id='countryIP'>Country</InputLabel>
                <Select
                  labelId='countryIP'
                  id='countryIP'
                  value={selectedCountry}
                  onChange={handleCountry}
                >
                  {countryData.map((country) => {
                    return (
                      <MenuItem value={country.id} key={country.id}>
                        {country.display_name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>

            <Box className={classes.margin}>
              <FormControl className={classes.fieldStyle}>
                <InputLabel id='StateIp'>State</InputLabel>
                <Select
                  labelId='StateIp'
                  id='StateIp'
                  value={selectedState}
                  onChange={handleState}
                >
                  {stateData.map((state) => {
                    return (
                      <MenuItem value={state.id} key={state.id}>
                        {state.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>

            <Box className={classes.margin}>
              <FormControl className={classes.fieldStyle}>
                <InputLabel id='CityIp'>City</InputLabel>
                <Select
                  labelId='CityIp'
                  id='CityIp'
                  value={selectedCity}
                  onChange={handleCity}
                >
                  {cityData.map((city) => {
                    return (
                      <MenuItem value={city.id} key={city.id}>
                        {city.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>

            <Box className={classes.margin}>
              <FormControl className={classes.fieldStyle}>
                <Input
                  id='pincode'
                  name='pincode'
                  className={classes.inputBorder}
                  type='text'
                  onChange={handleForm}
                  placeholder='Pin Code'
                />
              </FormControl>
            </Box>

            <Box className={classes.margin}>
              <FormControl className={classes.fieldStyle}>
                <Input
                  id='reasson'
                  name='reasson'
                  className={classes.inputBorder}
                  type='text'
                  onChange={handleForm}
                  placeholder='Reason'
                />
              </FormControl>
            </Box>

            <Box className={classes.margin}>
              <FormControl className={classes.fieldStyle}>
                <Input
                  id='file'
                  name='file'
                  className={classes.inputBorder}
                  type='file'
                  onChange={handleForm}
                  placeholder='Document'
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

  return <>{render}</>;
};

export default ChangeAddress;
