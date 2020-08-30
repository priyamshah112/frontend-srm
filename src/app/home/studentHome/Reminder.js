import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import * as moment from "moment";
import HomeService from "../HomeSerivce";
import close from "../../../assets/images/home/Close.svg";

const useStyles = makeStyles((theme) => ({
  closeButton: {
    float: "right",
    padding: "10px",
    cursor: "pointer",
  },
  title: {
    paddinLeft: "10px",
    paddingTop: "10px",
  },
  dialogHeader: {
    padding: "10px",
    borderBottom: "1px solid #E5E5EA",
  },
  checkForm: {
    padding: "10px",
  },
  checkbox: {
    float: "right",
  },
  label: {
    paddinLeft: "10px",
    paddingTop: "10px",
  },
}));

const Reminder = (props) => {
  const classes = useStyles();
  const { open, onClose, days } = props;

  const [checkboxes, setCheckBoxes] = useState({
    oneDayBefore: false,
    twoDayBefore: false,
    threeDayBefore: days === 3 ? false : undefined,
  });

  useEffect(() => {
    if (props.entityDate !== null) {
      let tempCheckBoxes = { ...checkboxes };
      if (props.entityDate["1_day_before"]) {
        tempCheckBoxes.oneDayBefore = true;
      }
      if (props.entityDate["2_day_before"]) {
        tempCheckBoxes.twoDayBefore = true;
      }
      if (
        props.entityDate["3_day_before"] &&
        checkboxes.threeDayBefore !== undefined
      ) {
        tempCheckBoxes.threeDayBefore = true;
      }
      setCheckBoxes({ ...checkboxes, ...tempCheckBoxes });
    }
  }, []);

  const handleReminderClose = async () => {
    try {
      if (
        checkboxes.oneDayBefore === false &&
        checkboxes.twoDayBefore === false &&
        !checkboxes.threeDayBefore
      ) {
        onClose({ ...checkboxes });
      } else {
        let entityDate = {};
        if (checkboxes.oneDayBefore === true) {
          entityDate["1_day_before"] = moment(props.eventDate)
            .subtract(1, "days")
            .format("YYYY-MM-DD");
        }
        if (checkboxes.twoDayBefore === true) {
          entityDate["2_day_before"] = moment(props.eventDate)
            .subtract(2, "days")
            .format("YYYY-MM-DD");
        }
        if (checkboxes.threeDayBefore === true) {
          entityDate["3_day_before"] = moment(props.eventDate)
            .subtract(3, "days")
            .format("YYYY-MM-DD");
        }
        console.log(checkboxes, entityDate);
        const response = await HomeService.setReminder(
          { entity_id: props.id, entity_date: entityDate, entity_type: "news" },
          props.token
        );
        onClose({ ...checkboxes });
      }
      // const response =await HomeService.setReminder()
    } catch (e) {
      console.log(e);
    }
  };

  const handleCheck = (event) => {
    setCheckBoxes({ ...checkboxes, [event.target.name]: event.target.checked });
  };
  return (
    <Dialog
      onClose={handleReminderClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      className={classes.dialog}
      fullWidth={true}
      maxWidth={"xs"}
    >
      <div className={classes.dialogHeader}>
        <img
          src={close}
          alt="close"
          className={classes.closeButton}
          onClick={handleReminderClose}
        />
        <Typography className="title" variant="h6">
          Remind me
        </Typography>
      </div>
      <div className={classes.checkForm}>
        <Checkbox
          className={classes.checkbox}
          checked={checkboxes.oneDayBefore}
          onChange={handleCheck}
          color="primary"
          name="oneDayBefore"
        />
        <Typography className={classes.label}>1 day before</Typography>

        <br />
        <Checkbox
          className={classes.checkbox}
          checked={checkboxes.twoDayBefore}
          onChange={handleCheck}
          color="primary"
          name="twoDayBefore"
        />

        <Typography className={classes.label}>2 day before</Typography>
        <br />

        {checkboxes.threeDayBefore !== undefined ? (
          <>
            <Checkbox
              className={classes.checkbox}
              checked={checkboxes.threeDayBefore}
              onChange={handleCheck}
              color="primary"
              name="threeDayBefore"
            />
            <Typography className={classes.label}>3 day before</Typography>
          </>
        ) : (
          ""
        )}
      </div>
    </Dialog>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(Reminder);
