import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Typography,
  CardContent,
  Button,
} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import userIcon from '../../assets/images/transport/User.svg';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

const useStyle = makeStyles((theme) => ({
  buttonContainer: {
    width: "100%",
    padding:"3%",
  },
  header: {
    display: 'flex',
  },
  cardHeader: {
    marginLeft: '4px',
    padding:'3px',
  },
  button: {
    width: "94%",
  },
  card: {
    boxShadow: 'none',
    borderRadius: '10px',
    padding:'15px',
  },
  cardContent: {
    padding: '0px !important',  
    "textAlign":"left","font":"normal normal 300 14px/19px Avenir","letterSpacing":"0px","color":"#1C1C1E","opacity":"1",
  },
  cardContent_temp: {
    padding: '0px !important',  
    "textAlign":"left","font":"normal normal 300 14px/19px Avenir","letterSpacing":"0px","color":"#1C1C1E","opacity":"1",
    height:"150px"
  },
  profileDiv: {
    marginTop: '32px',
    paddingLeft:'3%',
    paddingRight:'3%',
    paddingBottom:'3%',

  },
  iconStyle: {
    width: '15px',
    height: '16px',
    transform: 'translateY(4px)',
    padding:'3px',
  },
  profileTitle: {
    display: 'inline',
    marginLeft: '5px',
    fontWeight: 700,
    textTransform: 'uppercase',
  },
  inp:{
    marginTop:'15px',
  },
  formControl: {
    marginTop:'15px',
  },
  side1:{
    float:'left',
    width:'45%',
    marginTop:'7%',
  },
  side2:{
    float:'right',
    width:'45%',
  },
  vertical:{
    height:"100px",
    left:'50%',
    top:'110px',
    borderLeft: '2px solid grey',
    position: 'absolute',
  },
  snack:{
    // zIndex:'1',
    top:'60%',
    width:"400px",
  },
  
}));


function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const Not_sub = (props) => {  
  const classes = useStyle();
  console.log("notsub ");
  const [address, setaddress] = useState(false);
  const [period, setperiod] = useState(false);
  
  const [form_house, setform_house] = useState('');
  const [form_streat, setform_streat] = useState('');
  const [form_landmark, setform_landmark] = useState('');
  const [form_pincode, setform_pincode] = useState('');
  const [form_city, setform_city] = useState('');
  const [form_state, setform_state] = useState('');


  const [form_comment, setform_comment] = useState('');

  const [selectedDate1, setSelectedDate1] = React.useState(new Date());
  const handleDateChange1 = (date) => {
    setSelectedDate1(date);
    console.log(date);
  };
  const [selectedDate2, setSelectedDate2] = React.useState(new Date());
  const handleDateChange2 = (date) => {
    setSelectedDate2(date);
    console.log(date);
  };

  const [form_month, setform_month] = useState('');
  const [status, setStatusBase] = React.useState(false);


  const event_handle_address=()=>{
    setaddress(true);

  };
  const event_handle_period=()=>{
    setperiod(true);

  };
  const Subscribe=()=>{
    console.log(form_house);
    console.log(form_streat);
    console.log(form_landmark);
    console.log(form_pincode);
    console.log(form_city);
    console.log(form_state);

    console.log(form_month);
    console.log(selectedDate1);
    console.log(selectedDate2);
    console.log(form_comment);
    
    setStatusBase(true);
    props.handle(true);

  };

  const event_form_house=(event)=>{   
    setform_house(event.target.value);
  };
  
  const event_form_streat=(event)=>{   
    setform_streat(event.target.value);
  };
  const event_form_landmark=(event)=>{   
    setform_landmark(event.target.value);
  };
  const event_form_pincode=(event)=>{   
    setform_pincode(event.target.value);
  };
  const event_form_city=(event)=>{   
    setform_city(event.target.value);
  };
  const event_form_state=(event)=>{   
    setform_state(event.target.value);
  };
  const event_form_comment=(event)=>{   
    setform_comment(event.target.value);
  };
  const event_form_month=(event)=>{   
    setform_month(event.target.value);
  };
  const event_status=()=>{   
    setStatusBase(!status);
  };
  
  return (
    <>
      {
          status ? 
                <div>
                  <Snackbar
                  open={status}
                  onClose={event_status}
                  message="Request has been submitted. Ticket #382748. School transportation department will get back to you with next steps. Thank you!"
                  TransitionComponent={SlideTransition}
                  key={SlideTransition}
                  autoHideDuration={3000}
                  className={classes.snack}
                />
                </div>
          : null
       }
    
    
    {address ?
        (
      
            period ? 
            (
              <div>

                <div className={classes.profileDiv}>
                      <div className={classes.header}>
                        <div className={classes.cardHeader}>
                          <img src={userIcon} className={classes.iconStyle} />
                          <Typography className={classes.profileTitle}>PERIOD</Typography>
                        </div>
                        
                      </div>
                    <Card className={classes.card}>
                      <CardContent className={classes.cardContent}>
                        <div>

                        <div className={classes.side1}>
                              <FormControl fullWidth={true}  className={classes.formControl}>
                                <InputLabel >Months</InputLabel>
                                <Select
                                  value={form_month}
                                  onChange={event_form_month}
                                >
                                  <MenuItem value={'1 Months'}>1 Months</MenuItem>
                                  <MenuItem value={'3 Months'}>3 Months</MenuItem>
                                  <MenuItem value={'6 Months'}>6 Months</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className={classes.vertical}></div>
                        <div className={classes.side2}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                      
                                      <KeyboardDatePicker
                                        margin="normal"
                                        label="From"
                                        format="MM/dd/yyyy"
                                        value={selectedDate1}
                                        onChange={handleDateChange1}
                                        KeyboardButtonProps={{
                                          'aria-label': 'change date',
                                        }}
                                      />

                                  </MuiPickersUtilsProvider>
                                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                      
                                      <KeyboardDatePicker
                                        margin="normal"
                                        label="To"
                                        format="MM/dd/yyyy"
                                        value={selectedDate2}
                                        onChange={handleDateChange2}
                                        KeyboardButtonProps={{
                                          'aria-label': 'change date',
                                        }}
                                      />

                                  </MuiPickersUtilsProvider>
                        </div>
                        
                        </div>
                      </CardContent>
                    </Card>
              </div>

                <div className={classes.profileDiv}>
                      <div className={classes.header}>
                        <div className={classes.cardHeader}>
                          <img src={userIcon} className={classes.iconStyle} />
                          <Typography className={classes.profileTitle}>COMMENTS</Typography>
                        </div>
                        
                      </div>
                    <Card className={classes.card}>
                      <CardContent className={classes.cardContent}>
                      <TextField fullWidth={true} onChange={event_form_comment} value={form_comment} label="Additional Comments" />
                      </CardContent>
                    </Card>
              </div>

                <div className={classes.buttonContainer}>
                    <Button
                      color="primary"
                      variant="contained"
                      className={classes.button}
                      onClick={Subscribe}
                    >
                      Subscribe
                    </Button>
                  </div>

              </div>
            )
            :
            (
            <div>
                  <div className={classes.profileDiv}>
                      <div className={classes.header}>
                        <div className={classes.cardHeader}>
                          <img src={userIcon} className={classes.iconStyle} />
                          <Typography className={classes.profileTitle}>PICK-UP ADDRESS</Typography>
                        </div>
                        
                      </div>
                    <Card className={classes.card}>
                      <CardContent className={classes.cardContent}>
                      <TextField fullWidth={true} onChange={event_form_house} value={form_house} label="House No / Apartment No" />
                      
                      <TextField fullWidth={true} className={classes.inp} onChange={event_form_streat} value={form_streat} label="Street, Area Name" />
                      
                      <TextField fullWidth={true} className={classes.inp} onChange={event_form_landmark} value={form_landmark} label="Landmark" />

                      <FormControl fullWidth={true} className={classes.formControl}>
                          <InputLabel >City</InputLabel>
                          <Select
                            value={form_city}
                            onChange={event_form_city}
                          >
                            <MenuItem value={'Bangalore'}>Bangalore</MenuItem>
                            <MenuItem value={'Mumbai'}>Mumbai</MenuItem>
                            <MenuItem value={'Pune'}>Pune</MenuItem>
                          </Select>
                      </FormControl>

                      <FormControl fullWidth={true} className={classes.formControl}>
                          <InputLabel >State</InputLabel>
                          <Select
                            value={form_state}
                            onChange={event_form_state}
                          >
                            <MenuItem value={'Maharashtra'}>Maharashtra</MenuItem>
                            <MenuItem value={'Rajasthan'}>Rajasthan</MenuItem>
                            <MenuItem value={'Karnataka'}>Karnataka</MenuItem>
                          </Select>
                      </FormControl>

                      <TextField fullWidth={true} className={classes.inp} onChange={event_form_pincode} value={form_pincode} label="Pincode" />



                      </CardContent>
                    </Card>
              </div>

                  <div className={classes.buttonContainer}>
                    <Button
                      color="primary"
                      variant="contained"
                      className={classes.button}
                      onClick={event_handle_period}
                    >
                      Next
                    </Button>
                  </div>
            </div>
            )
        )
        :
        (
             <div>
                  <div className={classes.profileDiv}>
                    <Card className={classes.card}>
            <CardContent className={classes.cardContent_temp}>
           
            </CardContent>
          </Card>
                     <br/>
                    <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
            Description on specific schools transportation system. 
            This is where we need content writer’s help. Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
            in culpa qui officia deserunt mollit anim id est laborum
                    
            </CardContent>
          </Card>
      </div>
            
                  <div className={classes.buttonContainer}>
              <Button
                color="primary"
                variant="contained"
                className={classes.button}
                onClick={event_handle_address}
              >
                Subscribe
              </Button>
            </div>
            </div>
        )
        }
    
    </>
  );
};
 
export default Not_sub;