import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import MyLocationRoundedIcon from '@material-ui/icons/MyLocationRounded';
import GoogleMapReact from 'google-map-react';
import BackIcon from "../../assets/images/Back.svg";


const useStyles = makeStyles((theme) => ({
  container: {
    width: "95%",
    backgroundColor: theme.palette.mainBackground,
    height: "100%",
    marign: "0",
    padding: "3%",
    overflowY: "auto",
  },
  backImg: {
    float: "left",
    transform: "translateY(7px)",
    cursor: "pointer",
    // width:'10%'
    width:'15px',
  },
  tabBar: {
    backgroundColor: theme.palette.mainBackground,
    color: theme.palette.common.deluge,
    boxShadow: 'none',
    // backgroundColor:'black',

  },
  ui_back:{
    // backgroundColor:'blue',
    width:'30px',
  },
  ui_tabs:{
    // width:'100%',
    // backgroundColor:'purple',
  },
  eventsTab: {
    padding: '6px 0px',
    borderBottom: '1px solid #aeaeb2',

    '& .MuiTab-wrapper': {
      height: '30px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '11px',
    },
  },

  borderRight: {
    '& .MuiTab-wrapper': {
      borderRight: '1px solid  #aeaeb2',
    },
  },
  formControl: {
    marginTop:'15px',
  },
}));

  
  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }
const Transport_mode = (props) => {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
      const api_key='AIzaSyBWHwz9MXM1scJeIQl74l0WC2zvePFwnFg';
      const defaultProps = {
        center: {
          lat: 59.95,
          lng: 30.33
        },
        zoom: 11
      };
  return (
    <div className={classes.container}>
       <AppBar position='sticky' className={classes.tabBar}>
            <Tabs
              centered
              value={value}
              onChange={handleChange}
              indicatorColor='primary'
              textColor='primary'
              variant='fullWidth'
            >
            <div className={classes.ui_back}>
              <img
              src={BackIcon}
              alt="Back"
              className={classes.backImg}
              onClick={() => {
                props.change_mode(false);
              }}
            />
            </div>
            {/* <div className={classes.ui_tabs}> */}
              <Tab
                label='Add Stop'
                {...a11yProps(0)}
                className={`${classes.eventsTab} ${classes.borderRight}`}
              />
              <Tab
                label='Change Route'
                {...a11yProps(1)}
                className={classes.eventsTab}
              />
              {/* </div> */}
            </Tabs>
          </AppBar>

                    <FormControl fullWidth={true} className={classes.formControl}>
                          <InputLabel >Search</InputLabel>

                          <Input
                                id="standard-adornment-password"
                                // type={values.showPassword ? 'text' : 'password'}
                                // value={values.password}
                                // onChange={handleChange('password')}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    // onClick={handleClickShowPassword}
                                    // onMouseDown={handleMouseDownPassword}
                                    >
                                    {/* {values.showPassword ? <Visibility /> : <VisibilityOff />} */}
                                    <MyLocationRoundedIcon />
                                    </IconButton>
                                </InputAdornment>
                                }
                            />
                          
                    </FormControl>
                        
                        <GoogleMapReact
                        bootstrapURLKeys={{ key: 'AIzaSyDOT2Bw7_GZKku97EQR42lC-x4xB5q8xpQ' } }
                        defaultCenter={defaultProps.center}
                        defaultZoom={defaultProps.zoom}
                        >
                        {/* <div
                            lat={59.955413}
                            lng={30.337844}
                            text="My Marker"
                        /> */}
                        </GoogleMapReact>
    </div>

  );
};

const mapStateToProps = (state) => {
  return {

  };
};

export default connect(mapStateToProps)(Transport_mode);
