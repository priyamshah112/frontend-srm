import React, { useState, useEffect } from "react";
import "date-fns";
import { useHistory, useParams } from "react-router-dom";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DateFnsUtils from "@date-io/date-fns";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import FormHelperText from '@material-ui/core/FormHelperText';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NativeSelect from '@material-ui/core/NativeSelect';
import {
  MuiPickersUtilsProvider,
  DateTimePicker,
  DatePicker,
} from '@material-ui/pickers';
import EventIcon from '@material-ui/icons/Event';

import LeaveService from "../LeaveService";
import { IconButton, InputAdornment, InputLabel } from "@material-ui/core";
const height = 85

const useStyle = makeStyles((theme) => ({
  formStyle: {
    margin: "auto",
    width: "95%",
    backgroundColor: "white",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: "5px",
  },
  backImg: {
    float: "left",
    paddingLeft: "10px",
    cursor: "pointer",
  },
  adornmentColor: {
    color: "rgba(0, 0, 0, 0.54)",
  },
  themeColor: {
    color: `${theme.palette.common.deluge}`,
    padding: 0,
    margin: 0,
  },
  errorColor: {
    color: "red",
  },
  fieldStyle: {
    width: "90%",
    margin: "auto",
    "& .MuiInput-underline:before": {
      borderBottom: "2px solid #eaeaea",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottom: "2px solid #7B72AF",
      transitionProperty: "border-bottom-color",
      transitionDuration: "500ms",
      transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
  },
  inputBorder: {
    height: "50px",
  },
  datePicker: {
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  paper: {
    display: "flex",
    minHeight: "40px",
    backgroundColor: "none",
    justifyContent: "left",
    flexWrap: "wrap",
    listStyle: "none",
    border: "1px solid #eaeaea",
    padding: theme.spacing(0.5),
    textAlign: "left",
  },
  paperShowIn: {
    display: "flex",
    minHeight: "40px",
    backgroundColor: "none",
    justifyContent: "left",
    flexWrap: "wrap",
    listStyle: "none",

    padding: theme.spacing(0.5),
    margin: "auto",
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  paperBoxShadow: {
    boxShadow: `2px 2px 2px 0 #E5E5EA`,
  },
  textAlignLeft: {
    textAlign: "left",
    color: "rgba(0, 0, 0, 0.54)",
  },
  contentCenter: {
    justifyContent: "center",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },

  margin: {
    marginTop: "30px",
    [theme.breakpoints.down("xs")]: {
      marginTop: "10px",
    },
    "& .publishBtn": {
      borderRadius: "3px",
      width: "100%",
      // opacity: '0.5',
      marginBottom: "15px",
    },
    "& .publishLaterBtn": {
      backgroundColor: `${theme.palette.common.white}`,
      border: `1px solid ${theme.palette.common.adornment}`,
      marginRight: "5px",
    },
  },
  form_txtarea: {
    marginBottom: '20px',
  },
  tchSelect:{
    width:'150px'
  },
  textarea :{
    width: '100%',
    height: '100px',
    borderRadius: '5px',
    fontFamily: 'Avenir,Avenir Book,Avenir Black Oblique,Roboto,"Helvetica Neue",Arial,sans-serif',
    fontWeight: '400',
    lineHeight: '1.5',
    outline: 'none'
  },
  form_row: {
    display: 'flex',

    marginTop: '20px',
    marginBottom: '20px',
  },
  label: {
    marginRight: '15px',
    fontSize: '1rem',
    fontFamily: 'Avenir,Avenir Book,Avenir Black Oblique,Roboto,"Helvetica Neue",Arial,sans-serif',
    fontWeight: '400',
    lineHeight: '1.5',
  },
  select : {
    border: 'none',
    borderBottom: '1px solid #7b72af',
    padding: '5px 0px',
  },
  selectadmin : {
    marginLeft: '21px',
    transform: 'translateY(3px)'
  },
  tchClassRoot:{
    marginLeft:"27px",
    transform:'translateY(-13px)'
  },
  topdate:{
    marginTop:'18px',
  },
  leavereason:{
    fontSize: '15px',
  },
  slotd:{
    width:'220px',
    textAlign: "left",
  }
}));

const StudentLeave = (props) => {
  const history = useHistory();
  const { id } = useParams();
  const classes = useStyle();

  const [openPubLater, setOpenPubLater] = useState(false);
  const [eventDate, setEventDate] = useState(null);
  const [evenTotDate, setEventToDate] = useState(null);
 
  const status = "active";
  const [age, setAge] = React.useState('');
  const [reason, HandleareaContent] = React.useState('');
  const [teachevalue, Teacherdata] = React.useState('');
  const [teacherval, Teacher] = React.useState('');
  const [allTeacher,setTeacher] = useState([]);
  const [halfday, sethalfday] = React.useState(false);
  const [teachersValue, setTeachersValue] = useState('')

  useEffect(() => {
    let isLoading = true;
    const fetchTeacher = async () => {
      try {
        const token = localStorage.getItem('srmToken');
        const response = await LeaveService.fetchAllTeacher(token);
        if (isLoading) {
          setTeacher([...allTeacher, ...response.data.data]);
        }
      } catch (error) {
        console.log('Error: ', error);
      }
    };
    fetchTeacher();
    return () => {
      isLoading = false;
    };
  }, []);


  const handleEventDate = (date) => {
    if (evenTotDate != null && evenTotDate.getTime() <= date.getTime()){
      toast("Please  enter valid date");
      setEventToDate(null);
      setEventDate(date);
      
    } else  {
      setEventDate(date);
    }
  };

  const handleHalfDay = (event,value) => {
    if(value=='h_day'){
      sethalfday(true);
    } else {
      sethalfday(false);
    }
    
  };

  const handleDateChange = (date) => {
    if(eventDate  == null){
      toast("Please Select any Date");
      return false;
    }
    else if (date.getTime() <= eventDate.getTime()){
      toast("Please enter valid date");
      return false;
    } else  {
      setEventToDate(date);
    }
    
  
  };

  const publishData = async (publisedDate, status='', data,type,slot,content,teachersValue) => {
    try {    
      
    const response = await LeaveService.postLeave(
        { id },
        {
          "leavearr" : {
            "start_date": data.target.eventDate.value,
            "end_date": data.target.enddate.value,
            "half_day": slot=='h_day'?true:false,
            "full_day": slot=='f_day'?true:false,
            "half_day_half": type,
            "sanctioner_id": teachersValue,
            "reason": content
            }
          },
        props.token
      );

      if (response.status === 200) {
        history.replace("/leave");
      }
    } catch (e) {
      console.log(e);
    }
  };
  

  const handleTeachersValue = (event) =>{
    setTeachersValue(event.target.value)
  }

const submitForm = async (event) => {
  
  let type= '0';
  let slot= event.target.slot.value;
  if(slot == 'h_day'){
    type= event.target.type.value;
  }
  let content = event.target.content.value;
  publishData(new Date().toISOString(), status, event,type,slot,content,teachersValue);
  event.preventDefault();
}
const handleChange = (event) => {
  setAge(event.target.value);
};

const handleChangeTeacher = (event) => {
  Teacherdata(event.target.value);
};

  return (
    <>
      <div>
      
        <form className={classes.formStyle} onSubmit={submitForm}>
        <div>
        <ToastContainer />
          <Box className={classes.margin} >
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container className={classes.fieldStyle}>
                <Grid item xs={12} className={classes.topdate} >
                
                  <DatePicker
                    id="eventDate"
                    label="From Date"
                    variant='dialog'
                    minDate={new Date()}
                    format="yyyy/MM/dd"
                    value={eventDate}
                    onChange={handleEventDate}
                    disablePast="true"
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton>
                            <EventIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    className={classes.datePicker}
                  />
                </Grid>
              </Grid>
            </MuiPickersUtilsProvider>
          </Box>
          <Box className={classes.margin}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container className={classes.fieldStyle}>
                <Grid item xs={12}>
                  <DatePicker
                     minDate={new Date()}
                     variant="dialog"
                     format="yyyy/MM/dd"
                     id="enddate"
                     label="End Date"
                     disablePast="true"
                     value={evenTotDate}
                     onChange={handleDateChange}
                     KeyboardButtonProps = {{
                       'aria-label': 'change date',
                     }}
                     InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton>
                            <EventIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                     className={classes.datePicker}
                   />
                   
                </Grid>
              </Grid>
              
            </MuiPickersUtilsProvider>
          </Box>
        </div>

          <Box className={classes.margin}>
            <Grid className={classes.fieldStyle}>
              
              <div className={classes.form_row}>
              <Typography variant="h5" className={`${classes.slotd}`}
              >
                <FormControl component="fieldset" >
                  <RadioGroup row aria-label="position" name="slot" defaultValue="top" >
                    <FormControlLabel value="f_day" onClick={(e) => {   handleHalfDay(e,'f_day')}} control={<Radio color="primary" />} label="Full day" checked={!halfday}/>
                    <FormControlLabel value="h_day" onClick={(e) => {   handleHalfDay(e,'h_day')}}  control={<Radio color="primary" />} label="Half Day" checked={halfday}/>
                  </RadioGroup>
                </FormControl>

              </Typography>

              {halfday == true &&
              <Typography variant="h5"              >
                <Select
                  defaultValue={0}
                  inputProps={{
                    name: 'type',
                    id: 'type',
                  }}

                >
                  <MenuItem  value={0}>First Half</MenuItem >
                  <MenuItem  value={1}>Second Half</MenuItem >
                </Select>
                </Typography>
              }

        <FormControl classes={{root: classes.tchClassRoot}}>
                <InputLabel id="demo-simple-select-label">Teacher's Name</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={teachersValue}
                  className={classes.tchSelect}
                  onChange={handleTeachersValue}
                  // inputProps={{
                  //   name: 'teachers',
                  //   id: 'teachers',
                  // }}

                >
                {allTeacher.map((teacher) => (
                  <MenuItem value={teacher.user_id}>{teacher.firstname}&nbsp;{teacher.lastname}</MenuItem>
                ))}
                </Select>
              </FormControl>
              </div>
              
            </Grid>
          </Box>
          

          <Box className={classes.margin}>
            <Grid className={classes.fieldStyle}>
              <div className={classes.form_txtarea}>
              <Typography className={`${classes.titleText}`}
              >
                <TextareaAutosize
                  className={classes.textarea}
                  rowsMax={4}
                  aria-label="maximum height"
                  placeholder="Reason*"
                  style={{ height }}
                  onChange={HandleareaContent}
                  name="content"
                />
                </Typography>
             </div>
            </Grid>
          </Box>
          <Box className={classes.margin}>
            <Grid container className={classes.fieldStyle}>
            <Grid item xs={12}>

                <Button
                  id="publishBtn"
                  variant="contained"
                  className={`${classes.fieldStyle} ${"publishBtn"}`}
                  color="primary"
                  // onClick={handlePublish}
                  type="submit"
                  disableElevation
                >
                  SUBMIT
                </Button>
                
              </Grid>
              
              <Grid item xs={12}>
                <Button
                  id="publishLaterBtn"
                  variant="contained"
                  className={`${
                    classes.fieldStyle
                  } ${"publishBtn"} ${"publishLaterBtn"}`}
                  disableElevation
                  onClick={(event) => {
                    history.push('/leave');
                  }}
                >
                  CANCEL
                </Button>
                
              </Grid>
            </Grid>
          </Box>
        </form>
      </div>
     
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(StudentLeave);
