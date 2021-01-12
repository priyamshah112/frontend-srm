import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DateFnsUtils from "@date-io/date-fns";
import ScheduleIcon from '@material-ui/icons/Schedule'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import {
	MuiPickersUtilsProvider,
	TimePicker,
} from '@material-ui/pickers'
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { weeklyTimeTableSubject } from "../../redux/actions/attendence.action";
import { addSubjectsOrTime } from "../../redux/actions/attendence.action";
import Spinner from "../../common/ui/spinner/Spinner";
import { SnackBarRef } from "../../../SnackBar";
import { getWeekFilterUsingALL } from "../../redux/actions/attendence.action";
import { updateDataSubjectId } from "../../redux/actions/attendence.action";

const useStyles = makeStyles((theme) => ({
  dateTimeContainer: {
    // minWidth: '600px',

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
  dialogActionsContainer: {
    "&.MuiDialogActions-root": {
      justifyContent: "flex-end",
      marginTop: "10px",
      marginRight: 0,
      marginBottom: "10px",
    },
  },
  button: {
    minWidth: "80px",
    textTransform: "none",
  },
  confirmationText: {
    fontWeight: 500,
    fontSize: "1rem",
    color: "#000000",
  },
  textField: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  dialog: {
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  radio: {
    display: "flex",
    flexDirection: "row",
  },
  label: {
    color: "#7B72AF !important",
    '& label':{
			color: "#7B72AF !important",
		}
  },
  span: {
    fontFamily: "Avenir medium",
    fontSize: 14,
  },
  dialogContent: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    position: "absolute",
    right: 0,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  modelStyle:{
		width: '100%',
		'& input':{
			fontSize: '14px',
			fontFamily: 'Avenir medium',
		}
	},
}));

function LectureBreak(props) {
  const {loading, AddSubjectsLoading } = props;
  const tableId = props.tableId;
  const class_id = props.class_id;
  const schoolId = props.schoolId;
  let edit = props.edit;
  const classes = useStyles();
  const [startTime, setStartTime] = useState(new Date("2020-08-18T08:30:00"));
  const [endTime, setEndTime] = useState(new Date("2020-08-18T08:30:00"));
  const [radioValue, setRadioValue] = useState("Break");
  const [breakfast, setBreakfast] = useState("Break");
  const [monday, setMonday] = useState("no lecture");
  const [tuesday, setTuesday] = useState("no lecture");
  const [wednesday, setWednesday] = useState("no lecture");
  const [thursday, setThursday] = useState("no lecture");
  const [friday, setFriday] = useState("no lecture");
  const [saturday, setSaturday] = useState("no lecture");

  const data = props.data ? props.data : []

  useEffect(() => {
    if (class_id) {
      fetchData();
    }
  }, [class_id]);

  useEffect(() => {
    if (edit) {
      let updateStartTime = new Date(
        "2020-08-18T" + props.updateStartTime + ":00"
      );
      let updateEndTime = new Date("2020-08-18T" + props.updateEndTime + ":00");
      setStartTime(updateStartTime);
      setEndTime(updateEndTime);
      setRadioValue(props.updateRadioValue);
      setMonday(props.updateMonday ? props.updateMonday : "no lecture");
      setTuesday(props.updateTuesday ? props.updateTuesday : "no lecture");
      setWednesday(
        props.updateWednesday ? props.updateWednesday : "no lecture"
      );
      setThursday(props.updateThursday ? props.updateThursday : "no lecture");
      setFriday(props.updateFriday ? props.updateFriday : "no lecture");
      setSaturday(props.updateSaturday ? props.updateSaturday : "no lecture");
      console.log("props", props.tableId, props.updateEndTime);
    }
  }, [edit]);

  const fetchData = () => {
    props.weeklyTimeTableSubject(class_id);
  };

  const handleStartTimeChange = (time) => {
    setStartTime(time);
    console.log("time", time);
  };
  let date = new Date();
  console.log("current", date);

  const handleEndTimeChange = (time) => {
    console.log("time", time);
    setEndTime(time);
  };

  const handleMondayChange = (event) => {
    setMonday(event.target.value);
  };
  const handleTuesdayChange = (event) => {
    setTuesday(event.target.value);
  };
  const handleWednesdayChange = (event) => {
    setWednesday(event.target.value);
  };
  const handleThursdayChange = (event) => {
    setThursday(event.target.value);
  };
  const handleFridayChange = (event) => {
    setFriday(event.target.value);
  };
  const handleSaturdayChange = (event) => {
    setSaturday(event.target.value);
  };

  const handleSuccess = () => {
    if (edit) {
      SnackBarRef.open("", true, "Week Timetable updated successfully");
    } else {
      SnackBarRef.open("", true, "Week Timetable saved successfully");
    }
    props.close();
    setStartTime(new Date("2020-08-18T08:00:00"));
    setEndTime(new Date("2020-08-18T08:30:00"));
    setRadioValue("Break");
    setMonday("no lecture");
    setTuesday("no lecture");
    setWednesday("no lecture");
    setThursday("no lecture");
    setFriday("no lecture");
    setSaturday("no lecture");
    props.getWeekFilterUsingALL(class_id);
  };

  const handleFail = (error) => {
    console.log("error", error);
    if (error) {
      SnackBarRef.open("", false, error.message);
    }
  };

  const handleSave = () => {
    console.log("starttime", startTime, endTime);
    let currentStartTime = startTime;
    let startHours = currentStartTime.getHours();
    let startMinutes = currentStartTime.getMinutes();
    startHours = (startHours < 10 ? "0" : "") + startHours;
    startMinutes = (startMinutes < 10 ? "0" : "") + startMinutes;
    let start = startHours + ":" + startMinutes;

    let currentEndTime = endTime;
    let endHours = currentEndTime.getHours();
    let endMinutes = currentEndTime.getMinutes();
    endHours = (endHours < 10 ? "0" : "") + endHours;
    endMinutes = (endMinutes < 10 ? "0" : "") + endMinutes;
    let end = endHours + ":" + endMinutes;

    // monday = monday === "no lecture" ? "" : monday;
    // tuesday = tuesday === "no lecture" ? "" : tuesday;
    // wednesday = wednesday === "no lecture" ? "" : wednesday;
    // thursday = thursday === "no lecture" ? "" : thursday;
    // friday = friday === "no lecture" ? "" : friday;
    // saturday = saturday === "no lecture" ? "" : saturday;

    const lectureData = {
      start_time: start,
      end_time: end,
      class_id: class_id,
      school_id: schoolId,
      timetable_status: radioValue,
      subject_id: [
        `${monday === "no lecture" ? "" : monday}`,
        `${tuesday === "no lecture" ? "" : tuesday}`,
        `${wednesday === "no lecture" ? "" : wednesday}`,
        `${thursday === "no lecture" ? "" : thursday}`,
        `${friday === "no lecture" ? "" : friday}`,
        `${saturday === "no lecture" ? "" : saturday}`,
      ],
    };
    const breakData = {
      start_time: start,
      end_time: end,
      class_id: class_id,
      school_id: schoolId,
      timetable_status: radioValue,
      break_status: breakfast,
    };
    const addSubjectsTime = radioValue === "Lecture" ? lectureData : breakData;

    if (props.edit) {
      props.updateDataSubjectId(
        addSubjectsTime,
        tableId,
        class_id,
        handleSuccess,
        handleFail
      );
    } else {
      props.addSubjectsOrTime(
        addSubjectsTime,
        class_id,
        handleSuccess,
        handleFail
      );
    }
  };
  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
    console.log(event.target.value);
  };
  const handleSelectChange = (event) => {
    setBreakfast(event.target.value);
  };

  const GreenRadio = withStyles({
    root: {
      "&$checked": {
        color: "#7B72AF",
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);

  return (
    <>
      <Dialog open={props.open} maxWidth={"xs"} fullWidth={true}>
        <DialogContent className={classes.dialog}>
          <div className={classes.dialogContent}>
            <span className={classes.span}>{props.name} Weekly Time Table</span>
            <div onClick={() => props.close()} className={classes.icon}>
              <IconButton>
                <CloseIcon fontSize="small" />
              </IconButton>
            </div>
          </div>
          <div className={classes.dateTimeContainer}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              {/* <Grid container lg={8} sm={8} xs={8}> */}
              <form className={classes.textField} noValidate autoComplete="off">
                
                <TimePicker
									margin='normal'
									label='Start Time'
                  value={startTime}
									className={classes.label}
									format='HH:mm:ss'
									onClick={() => setStartTime(new Date())}
									onChange={handleStartTimeChange}
									KeyboardButtonProps={{
										'aria-label': 'change time',
									}}
									InputProps={{
										endAdornment: (
											<InputAdornment position='end'>
												<IconButton>
													<ScheduleIcon />
												</IconButton>
											</InputAdornment>
										),
									}}
								/>
                
                <TimePicker
									margin='normal'
									label='End Time'
									value={endTime}
									className={classes.label}
									format='HH:mm:ss'
									onClick={() => setEndTime(new Date())}
									onChange={handleEndTimeChange}
									KeyboardButtonProps={{
										'aria-label': 'change time',
									}}
									InputProps={{
										endAdornment: (
											<InputAdornment position='end'>
												<IconButton>
													<ScheduleIcon />
												</IconButton>
											</InputAdornment>
										),
									}}
								/>
                {/* <KeyboardTimePicker
                  className={classes.label}
                  margin="normal"
                  id="end-time"
                  label="End Time"
                  ampm={false}
                  views={["hours", "minutes", "seconds"]}
                  format="HH:mm:ss"
                  value={endTime}
                  onChange={handleEndTimeChange}
                  KeyboardButtonProps={{
                    "aria-label": "change time",
                  }}
                /> */}
                <FormControl component="fieldset">
                  <RadioGroup
                    className={classes.radio}
                    aria-label="radiotype"
                    name="radiotype1"
                    value={radioValue}
                    onChange={handleRadioChange}
                  >
                    <FormControlLabel
                      checked={radioValue === "Lecture"}
                      value="Lecture"
                      control={<GreenRadio />}
                      label="Lecture"
                    />
                    <FormControlLabel
                      checked={radioValue === "Break"}
                      value="Break"
                      control={<GreenRadio />}
                      label="Break"
                    />
                  </RadioGroup>
                </FormControl>
                {radioValue === "Break" ? (
                  <FormControl className={classes.formControl}>
                    <InputLabel
                      className={classes.label}
                      id="demo-simple-select-label"
                    >
                      Break
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={breakfast}
                      onChange={handleSelectChange}
                    >
                      <MenuItem value="Break">Break</MenuItem>
                      <MenuItem value="BreakFast">Breakfast</MenuItem>
                    </Select>
                  </FormControl>
                ) : (
                  <>
                    <FormControl className={classes.formControl}>
                      <InputLabel
                        className={classes.label}
                        id="demo-simple-select-label"
                      >
                        Monday
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="monday-simple-select"
                        value={monday}
                        onChange={handleMondayChange}
                      >
                        <MenuItem value="no lecture">No Lecture</MenuItem>
                        {data.map((item) => (
                          <MenuItem value={item.id}>{item.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <InputLabel
                        className={classes.label}
                        id="demo-simple-select-label"
                      >
                        Tuesday
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="tuesday-simple-select"
                        value={tuesday}
                        onChange={handleTuesdayChange}
                      >
                        <MenuItem value="no lecture">No Lecture</MenuItem>
                        {data.map((item) => (
                          <MenuItem value={item.id}>{item.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <InputLabel
                        className={classes.label}
                        id="demo-simple-select-label"
                      >
                        Wednesday
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="wednesday-simple-select"
                        value={wednesday}
                        onChange={handleWednesdayChange}
                      >
                        <MenuItem value="no lecture">No Lecture</MenuItem>
                        {data.map((item) => (
                          <MenuItem value={item.id}>{item.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <InputLabel
                        className={classes.label}
                        id="demo-simple-select-label"
                      >
                        Thursday
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="thursday-simple-select"
                        value={thursday}
                        onChange={handleThursdayChange}
                      >
                        <MenuItem value="no lecture">No Lecture</MenuItem>
                        {data.map((item) => (
                          <MenuItem value={item.id}>{item.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <InputLabel
                        className={classes.label}
                        id="demo-simple-select-label"
                      >
                        Friday
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="friday-simple-select"
                        value={friday}
                        onChange={handleFridayChange}
                      >
                        <MenuItem value="no lecture">No Lecture</MenuItem>
                        {data.map((item) => (
                          <MenuItem value={item.id}>{item.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <InputLabel
                        className={classes.label}
                        id="demo-simple-select-label"
                      >
                        Saturday
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="saturday-simple-select"
                        value={saturday}
                        onChange={handleSaturdayChange}
                      >
                        <MenuItem value="no lecture">No Lecture</MenuItem>
                        {data.map((item) => (
                          <MenuItem value={item.id}>{item.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </>
                )}
              </form>
              {/* </Grid> */}
            </MuiPickersUtilsProvider>
          </div>
          {edit ? (
            <DialogActions classes={{ root: classes.dialogActionsContainer }}>
              {AddSubjectsLoading ? (
                <Spinner />
              ) : (
                <Button
                  color="primary"
                  autoFocus
                  variant="contained"
                  className={classes.button}
                  onClick={handleSave}
                >
                  Update
                </Button>
              )}
            </DialogActions>
          ) : (
            <DialogActions classes={{ root: classes.dialogActionsContainer }}>
              {AddSubjectsLoading ? (
                <Spinner />
              ) : (
                <Button
                  color="primary"
                  autoFocus
                  variant="contained"
                  className={classes.button}
                  onClick={handleSave}
                >
                  Save
                </Button>
              )}
            </DialogActions>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

const mapStateToProps = ({ Attendence }) => {
  const {
    weekly_timetable_subjects = [],
    weeklyTimeTableSubjectsLoading,
    add_subjects_or_time = [],
    addSubjectsOrTimeLoading,
    get_week_filter_using_all = [],
  } = Attendence;
  return {
    data: weekly_timetable_subjects,
    loading: weeklyTimeTableSubjectsLoading,
    addSubjectsOrTimeData: add_subjects_or_time,
    AddSubjectsLoading: addSubjectsOrTimeLoading,
    TimeTable: get_week_filter_using_all,
  };
};

export default connect(mapStateToProps, {
  weeklyTimeTableSubject,
  addSubjectsOrTime,
  getWeekFilterUsingALL,
  updateDataSubjectId,
})(LectureBreak);
