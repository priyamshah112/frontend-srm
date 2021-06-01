import React, { useState, useEffect } from "react";
import "date-fns";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";
import {
  makeStyles,
  Box,
  Grid,
  FormControl,
  Button,
  Typography,
  FormControlLabel,
  Select,
  MenuItem,
  TextareaAutosize,
  Radio,
  RadioGroup,
  IconButton,
  InputAdornment,
  InputLabel,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import LeaveService from "../LeaveService";
import EventIcon from "@material-ui/icons/Event";
import BackIcon from "../../../assets/images/Back.svg";

const height = 85;
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
    width: "97%",
    fontFamily: "Avenir Book",
    fontSize: " 1rem",
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

  form_txtarea: {
    marginBottom: "20px",
  },
  textarea: {
    width: "100%",
    height: "100px",
    borderRadius: "5px",
    fontFamily:
      'Avenir Book,Avenir,Avenir Black Oblique,Roboto,"Helvetica Neue",Arial,sans-serif',
    fontWeight: "400",
    lineHeight: "1.5",
    outline: "none",
  },
  form_row: {
    display: "flex",
    textAlign: "center",
    marginTop: "20px",
    marginBottom: "20px",
  },
  label: {
    marginRight: "15px",
    fontSize: "1rem",
    fontFamily:
      'Avenir,Avenir Book,Avenir Black Oblique,Roboto,"Helvetica Neue",Arial,sans-serif',
    fontWeight: "400",
    lineHeight: "1.5",
  },
  select: {
    border: "none",
    borderBottom: "1px solid #7b72af",
    padding: "5px 0px",
  },
  selectadmin: {
    marginLeft: "12px",
    paddingTop: "6px",
  },
  topdate: {
    marginTop: "18px",
  },
  leavereason: {
    fontSize: "15px",
  },
  tchClassRoot: {
    marginLeft: "27px",
    transform: "translateY(-10px)",
  },
  tchSelect: {
    width: "150px",
  },
  sideMargins: {
    marginLeft: "20px",
  },
  publishBtns: {
    textAlign: "right",
    justifyContent: "right",
  },
  margin: {
    marginTop: "30px",
    [theme.breakpoints.down("xs")]: {
      marginTop: "10px",
    },
    "& .publishBtn": {
      float: "right",
      borderRadius: "3px",
      width: "inherit",
      margin: 0,
      textTransform: 'none',
      [theme.breakpoints.down("xs")]: {
        marginTop: "10px",
        marginRight: 0,
        width: "100%",
      },
    },
    "& .publishLaterBtn": {
      border: `1px solid ${theme.palette.common.adornment}`,
      marginRight: "5px",
    },
  },
  titleText: {
    textAlign: "center",
    margin: "auto",
    fontFamily: "Avenir Medium",
    fontize: "1.2rem",
    color: "#1C1C1E",
  },
}));

const TeacherLeaveApply = (props) => {
  const history = useHistory();
  const { id } = useParams();
  const classes = useStyle();
  const [eventDate, setEventDate] = useState(null);
  const [evenTotDate, setEventToDate] = useState(null);
  const [reason_content, HandleareaContent] = React.useState("");
  const [teachersValue, setTeachersValue] = useState("");
  const [bool_full, setbool_full] = useState(true);
  const [bool_half, setbool_half] = useState(false);
  const [halfdayhalf, sethalfdayhalf] = useState(0);
  const [halfday, sethalfday] = React.useState(false);
  const [allAdmin, setAdmin] = useState([]);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [snackbarmsg, setSnackbarmsg] = useState("");

  useEffect(() => {
    let isLoading = true;
    const fetchadmin = async () => {
      try {
        const token = localStorage.getItem("srmToken");
        const response = await LeaveService.fetchAllAdmin(token);
        if (isLoading) {
          setAdmin([...allAdmin, ...response.data.data]);
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    fetchadmin();
    return () => {
      isLoading = false;
    };
  }, []);

  const handleEventDate = (date) => {
    if (evenTotDate != null && evenTotDate.getTime() <= date.getTime()) {
      setSnackbarmsg("From Date can't be greater than End Date");
      setErrorSnackbarOpen(true);
      setEventToDate(null);
      setEventDate(date);
    } else {
      setEventDate(date);
    }
  };

  const sethalfdayhalf_handeler = (event) => {
    sethalfdayhalf(event.target.value);
  };
  const HandleareaContent_handeler = (event) => {
    HandleareaContent(event.target.value);
  };
  const handleDateChange = (date) => {
    if (eventDate == null) {
      alert("Please Select any Date");
      return false;
    } else if (date.getTime() <= eventDate.getTime()) {
      setSnackbarmsg("From Date can't be greater than End Date");
      setErrorSnackbarOpen(true);
      return false;
    } else {
      setEventToDate(date);
    }
  };

  const handleTeachersValue = (event) => {
    setTeachersValue(event.target.value);
  };

  const submitForm = async () => {
    if (bool_full) {
      sethalfdayhalf(2);
    }
    if (
      eventDate == null ||
      evenTotDate == null ||
      reason_content == "" ||
      teachersValue == ""
    ) {
      setSnackbarmsg("Form is incomplete");
      setErrorSnackbarOpen(true);
    } else {
      const response = await LeaveService.postLeave(
        { id },
        {
          leavearr: {
            start_date: eventDate,
            end_date: evenTotDate,
            half_day: bool_half,
            full_day: bool_full,
            half_day_half: halfdayhalf,
            sanctioner_id: teachersValue,
            reason: reason_content,
          },
        },
        props.token
      );

      if (response.status === 200) {
        history.replace("/leave");
      }
    }
  };
  const handleDay = (event, value) => {
    if (value == "h_day") {
      sethalfday(true);
      setbool_half(true);
      setbool_full(false);
      sethalfdayhalf(0);
    } else {
      sethalfday(false);
      setbool_half(false);
      setbool_full(true);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorSnackbarOpen(false);
  };

  return (
    <>
      <Box className={classes.formStyle}>
        <Box className={`${classes.margin} ${classes.sideMargins}`} pt={4}>
          <Box>
            <img
              src={BackIcon}
              alt="Back"
              className={classes.backImg}
              onClick={(event) => {
                history.push("/leave");
              }}
            />
            <Typography
              variant="h5"
              className={`${classes.themeColor} ${classes.titleText}`}
            >
              Create leave
            </Typography>
          </Box>
        </Box>
        <Box>
          <Snackbar
            open={errorSnackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
          >
            <Alert onClose={handleSnackbarClose} severity="error">
              {snackbarmsg}
            </Alert>
          </Snackbar>

          <Box className={classes.margin}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container className={classes.fieldStyle}>
                <Grid item xs={12} className={classes.topdate}>
                  <DatePicker
                    id="eventDate"
                    label="From Date"
                    variant="dialog"
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
                        <InputAdornment position="end">
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
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
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
        </Box>
        <Box className={classes.margin}>
          <Grid className={classes.fieldStyle}>
            <Box className={classes.form_row}>
              <Typography variant="h5" className={`${classes.slotd}`}>
                <FormControl component="fieldset">
                  <RadioGroup
                    row
                    aria-label="position"
                    name="slot"
                    defaultValue="top"
                  >
                    <FormControlLabel
                      value="f_day"
                      onClick={(e) => {
                        handleDay(e, "f_day");
                      }}
                      control={<Radio color="primary" />}
                      label="Full day"
                      checked={bool_full}
                    />
                    <FormControlLabel
                      value="h_day"
                      onClick={(e) => {
                        handleDay(e, "h_day");
                      }}
                      control={<Radio color="primary" />}
                      label="Half Day"
                      checked={bool_half}
                    />
                  </RadioGroup>
                </FormControl>
              </Typography>
              {halfday == true && (
                <Typography variant="h5">
                  <Select
                    defaultValue={0}
                    value={halfdayhalf}
                    onChange={sethalfdayhalf_handeler}
                    inputProps={{
                      name: "type",
                      id: "type",
                    }}
                  >
                    <MenuItem value={0}>First Half</MenuItem>
                    <MenuItem value={1}>Second Half</MenuItem>
                  </Select>
                </Typography>
              )}
              <FormControl classes={{ root: classes.tchClassRoot }}>
                <InputLabel id="demo-simple-select-label">
                  Admin's Name
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={teachersValue}
                  className={classes.tchSelect}
                  onChange={handleTeachersValue}
                >
                  {allAdmin.map((teacher) => (
                    <MenuItem value={teacher.user_id}>
                      {teacher.firstname}&nbsp;{teacher.lastname}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Box>
        <Box className={classes.margin}>
          <Grid className={classes.fieldStyle}>
            <Box className={classes.form_txtarea}>
              <Typography className={`${classes.titleText}`}>
                <TextareaAutosize
                  className={classes.textarea}
                  rowsMax={4}
                  aria-label="maximum height"
                  placeholder="Reason*"
                  style={{ height }}
                  onChange={HandleareaContent_handeler}
                  name="content"
                />
              </Typography>
            </Box>
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
                onClick={submitForm}
                type="submit"
                disableElevation
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
        <br />
      </Box>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(TeacherLeaveApply);
