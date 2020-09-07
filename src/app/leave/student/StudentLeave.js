import React, { useState, useEffect } from "react";
import "date-fns";
import { useHistory, useParams } from "react-router-dom";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import DateFnsUtils from "@date-io/date-fns";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import BackIcon from "../../../assets/images/Back.svg";
import RichTextEditor from "../../../shared/richTextEditor";
import { set } from "date-fns";
import LeaveService from "../LeaveService";
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
  textarea :{
    width: '100%',
    height: '100px',
    borderRadius: '5px',
  },form_row: {
    display: 'flex',
    textAlign: 'center',
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
}));

const StudentLeave = (props) => {
  const classes = useStyle();
  const history = useHistory();
  const { id } = useParams();

  const [scheduler, setScheduler] = useState(false);
  const [openPubLater, setOpenPubLater] = useState(false);
  const [eventDate, setEventDate,selectedDate] = useState(null);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [errMessage, setError] = useState("");
  const [category, setCategory] = useState("");
  const status = "active";
  const [age, setAge] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('female');

  useEffect(() => {
    let isFormLoading = true;
    // give first api call to create

    // api call to save
    
    
    return () => {
      isFormLoading = false;
      // clearInterval(saveDataApi);
    };
  }, []);

  const handleChangeInput = (event) => {
    let name = event.target.slot.value.name;
    if (name === "title") {
      setTitle(event.target.slot.value.value);
    } else {
      setSummary(event.target.value);
    }
  };

  const handleEventDate = (date) => {
    setEventDate(date);
  };

  const handleDateChange = (date) => {
    setEventDate(date);
  };


  const handleDescription = (data) => {
    setDescription(data);
  };
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const publishData = async (publisedDate, status='', data) => {
    try {   

      let data11 = {
        "leavearr" : {
            "start_date": data.target.eventDate.value,
            "end_date": data.target.enddate.value,
            "half_day": data.target.enddate.leave=='h_day'?true:false,
            "full_day": data.target.enddate.leave=='f_day'?true:false,
            "half_day_half": data.target.enddate.slot,
            "sanctioner_id": 5,
            "reason": data.target.enddate.content
            }
        };
        
     
      console.log(data11,'------------------------')
      // const response = await LeaveService.postLeave(
      //   { id },
      //   {
      //     "leavearr" : {
      //         "start_date": data.target.eventDate.value,
      //         "end_date": data.target.enddate.value,
      //         "half_day": data.target.enddate.content=='h_day'?true:false,
      //         "full_day": data.target.enddate.content=='f_day'?true:false,
      //         "half_day_half": data.target.enddate.slot,
      //         "sanctioner_id": 5,
      //         "reason": data.target.enddate.content
      //         }
      //     },
      //   props.token
      // );
      
      // if (response.status === 200) {
      //   history.replace("/leave");
      // }
    } catch (e) {
      console.log(e);
    }
  };
  

  const handleClosePubLater = () => {
    setOpenPubLater(false);
  };
const submitForm = async (event) => {

  console.log(event.target.slot.value,'=============')

  publishData(new Date().toISOString(), status, event);
  event.preventDefault();
}

const handleChange = (event) => {
  setAge(event.target.value);
};
const handleChangeredio = (event) => {
  setValue(event.target.value);
};

const handleClose = () => {
  setOpen(false);
};

const handleOpen = () => {
  setOpen(true);
};
 

  return (
    <>
      <div>
        <form className={classes.formStyle} onSubmit={submitForm}>
        <div>
          <Box className={classes.margin}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container className={classes.fieldStyle}>
                <Grid item xs={12}>
                  <KeyboardDatePicker
                    id="eventDate"
                    label="From Date"
                    variant="dialog"
                    minDate={new Date()}
                    format="yyyy/MM/dd"
                    value={eventDate}
                    onChange={handleEventDate}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
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
                  <KeyboardDatePicker
                     minDate={new Date()}
                     variant="dialog"
                     format="yyyy/MM/dd"
                     id="enddate"
                     label="End Date"
                     value={selectedDate}
                     onChange={handleDateChange}
                     KeyboardButtonProps = {{
                       'aria-label': 'change date',
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
              <Typography variant="h5"className={`${classes.titleText}`}
              >
                <FormControl component="fieldset">
                  <RadioGroup row aria-label="position" name="slot" defaultValue="top">
                    <FormControlLabel value="f_day" control={<Radio color="primary" />} label="Full day" />
                    <FormControlLabel value="h_day" control={<Radio color="primary" />} label="Half Day" />
                  </RadioGroup>
                </FormControl>

              </Typography>
              <FormControl className={classes.formControl}>
                  <Select
                    value={age}
                    onChange={handleChange}
                    displayEmpty
                    className={classes.select}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value="" disabled>
                      Select Leave
                    </MenuItem>
                    <MenuItem value='1stslot'>First Half</MenuItem>
                    <MenuItem value='2ndtslot'>Second Half</MenuItem>
                  </Select>
                  <FormHelperText>Select Leave</FormHelperText>
                </FormControl>
              </div>
            </Grid>
          </Box>
          <Box className={classes.margin}>
            <Grid className={classes.fieldStyle}>
              <div className={classes.form_txtarea}>
                <TextareaAutosize
                  className={classes.textarea}
                  rowsMax={4}
                  aria-label="maximum height"
                  placeholder="reason Here!!"
                  style={{ height }}
                />
             </div>
            </Grid>
          </Box>
          <Box className={classes.margin}>
            <Grid container  className={classes.fieldStyle}>
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
