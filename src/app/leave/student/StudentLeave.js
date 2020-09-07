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
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import BackIcon from "../../../assets/images/Back.svg";
import RichTextEditor from "../../../shared/richTextEditor";
//import PublishLater from "./PublishLater";
import { set } from "date-fns";
import LeaveService from "../LeaveService";

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

  useEffect(() => {
    let isFormLoading = true;
    // give first api call to create

    // api call to save
    
    
    return () => {
      isFormLoading = false;
      // clearInterval(saveDataApi);
    };
  }, []);
  
  useEffect(() => {
    
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
      
     
      const response = await LeaveService.postLeave(
        { id },
        {
          "id": 0,
          "leave_code": "string",
          "school_id": 0,
          "user_id": 0,
          "start_date": "2020-09-06",
          "end_date": "2020-09-06",
          "half_day": true,
          "full_day": true,
          "half_day_half": 0,
          "sanctioner_id": 0,
          "reason": "string",
          "created_at": "2020-09-06T16:42:47.255Z",
          "deleted_at": "2020-09-06T16:42:47.255Z",
          "updated_at": "2020-09-06T16:42:47.255Z",
          "updated_by": 0
        },
        props.token
      );
      console.log(response,'------------------------')
      if (response.status === 200) {
        history.replace("/leave");
      }
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
                    format="MM/dd/yyyy"
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
                     format="MM/dd/yyyy"
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
                <div className={classes.form_radio}>

                <Typography variant="h5"className={`${classes.titleText}`}
              >
                 <input type="radio" value="f_day" name="leave" className={classes.radio} /> 
                  <label for="f_day" className={classes.label}>Full day</label>
                  <input type="radio" value="h_day" name="leave" className={classes.radio} /> 
                  <label for="h_day" className={classes.label}>Half Day</label>
              </Typography>

                </div>
                <div className={classes.form_select}>
                  <select name="slot" className={classes.select}>
                    <option value="1stslot">First Half</option>
                    <option value="2ndtslot">Second Half</option>
                  </select>
                 </div>
              </div>

            </Grid>
          </Box>
          <Box className={classes.margin}>
            <Grid className={classes.fieldStyle}>
              
              <div className={classes.form_txtarea}>
                <textarea className={classes.textarea} >Reason</textarea>
             </div>
            </Grid>
          </Box>

          <Box className={classes.margin}>
            <Grid container spacing={12} className={classes.fieldStyle}>


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
