import React, { useState, useEffect } from "react";
import "date-fns";
import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
  DateTimePicker,
} from "@material-ui/pickers";
import { IconButton, InputAdornment } from "@material-ui/core";
import EventIcon from "@material-ui/icons/Event";
import { connect } from "react-redux";
import { getWeekFilterUsingALL } from "../../redux/actions/attendence.action";
import { publishLtrWeeklyTimeTable } from "../../redux/actions/attendence.action";
import { SnackBarRef } from "../../../SnackBar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  dateTimeContainer: {
    minWidth: "200px",

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
      justifyContent: "center",
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
  dialogContent: {
    textAlign: "center",
  },
  errorColor: {
    color: "red",
  },
}));

const PublishLater = (props) => {
  const { loading } = props;
  const class_id = props.class_id;
  const classes = useStyles();
  const { open, handleClose } = props;
  const [selectedDate, setSelectedDateChange] = useState(null);
  const [errMessage, setError] = useState("");

  console.log('class_id', class_id)

  const handleSuccess = () => {
    // SnackBarRef.open('', true, 'Week Timetable saved successfully')
    props.handleClose();
    props.getWeekFilterUsingALL(class_id);
  };

  const handleFail = (error) => {
    SnackBarRef.open("", false, "Some error occured");
  };

  useEffect(() => {
	console.log("selectedDate", time);
	setError(false)
  }, [selectedDate]);

  let date = selectedDate ? selectedDate : new Date();
  let currentTime = new Date(date);
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  let seconds = currentTime.getSeconds();
  let day = currentTime.getDate();
  let month = currentTime.getMonth();
  let year = currentTime.getFullYear();
  day = (day < 10 ? "0" : "") + day;
  month = parseInt(month) + 1;
  month = (month < 10 ? "0" : "") + month;
  hours = (hours < 10 ? "0" : "") + hours;
  minutes = (minutes < 10 ? "0" : "") + minutes;
  seconds = (seconds < 10 ? "0" : "") + seconds;

  let time =
    year +
    "-" +
    month +
    "-" +
    day +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;

  const handlePublishLtr = () => {
    if (selectedDate) {
      const data = {
        status: "active",
        published_date: time,
      };
      props.publishLtrWeeklyTimeTable(
        class_id,
        data,
        handleSuccess,
        handleFail
      );
    } else {
      setError("Please select date");
    }
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={"sm"}
        fullWidth={false}
      >
        <DialogContent>
          <div className={classes.dateTimeContainer}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">
                <DateTimePicker
                  variant="dialog"
                  value={selectedDate}
                  onChange={(dateTime) => {
                    setSelectedDateChange(dateTime);
                  }}
                  label="Publish Date and Time "
                  minDate={new Date()}
                  // maxDate={submissionDate}
                  format="yyyy/MM/dd hh:mm a"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <EventIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </div>
		  {errMessage ? (
              <Box className={classes.margin} pt={2}>
                <div>
                  <Typography className={`${classes.errorColor}`}>
                    {errMessage}
                  </Typography>
                </div>
              </Box>
            ) : (
              ""
            )}
        </DialogContent>
        <DialogActions classes={{ root: classes.dialogActionsContainer }}>
          <Button
            color="primary"
            variant="outlined"
            onClick={handleClose}
            className={classes.button}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            autoFocus
            variant="contained"
            className={classes.button}
            onClick={handlePublishLtr}
          >
            Publish
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const mapStateToProps = ({ Attendence }) => {
  const {
    get_week_filter_using_all = [],
    publishWeeklyTimeTableLoading,
  } = Attendence;
  return {
    loading: publishWeeklyTimeTableLoading,
    data: get_week_filter_using_all,
  };
};

export default connect(mapStateToProps, {
  publishLtrWeeklyTimeTable,
  getWeekFilterUsingALL,
})(PublishLater);
