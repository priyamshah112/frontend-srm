import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import * as moment from "moment";
import Reminder from "./Reminder";
import HomeService from "../HomeSerivce";
import { dateDiff } from "../../../shared/datediff";
import remindersvg from "../../../assets/images/home/reminder.svg";
// import testImg from "../../assets/images/home/testImg.png";

const useStyle = makeStyles((theme) => ({
  card: {
    width: "100%",
    margin: "auto",
    marginTop: "20px",
    borderRadius: "10px",
    boxShadow: "none",
  },
  reminder: {
    float: "right",
    padding: "2px",
  },
  cardContent: {
    padding: "16px 16px 16px 16px",
  },
  contentMargin: {
    marginTop: "16px",
  },
  cardHeader: {
    width: "100%",
  },
  title: {
    fontWeight: "bold",
    fontStyle: "normal",
    fontSize: "14px",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  announcementText: {
    fontStyle: "normal",
    fontSize: "14px",
  },
  announcementImg: {
    justifyContent: "center",
    textAlign: "center",
    "& img": {
      maxWidth: "100%",
      border: `1px solid ${theme.palette.common.deluge}`,
      borderRadius: "4px",
    },
  },
}));

const AnnouncementCard = (props) => {
  const classes = useStyle();
  const history = useHistory();
  const [openReminder, setOpenReminder] = useState(false);
  const [reminderDays, setReminderDays] = useState(null);
  const [reminderIcon, setReminderIcon] = useState(true);
  const [entityReminderDate, setEntityReminderDate] = useState(null);
  const [reminderId, setReminderId] = useState(null);
  // const [announcementShow, setShow] = useState(false);
  // useEffect(() => {
  //   if (announcementShow) {
  //     announceShow();
  //   }
  // }, [announcementShow]);

  useEffect(() => {
    const fetchReminder = async () => {
      try {
        const response = await HomeService.fetchReminder(
          props.token,
          "news",
          props.announcement.id
        );
        if (response.data.data) {
          setEntityReminderDate(response.data.data.entity_date);
          setReminderId(response.data.data.id);
        }
      } catch (e) {
        console.log(e);
      }
    };
    if (props.announcement.event_date) {
      const response = dateDiff(props.announcement.event_date);
      if (!response) {
        setReminderIcon(false);
      }
    } else {
      setReminderIcon(false);
    }

    fetchReminder();
  }, []);

  const handleReminderOpen = () => {
    const response = dateDiff(props.announcement.event_date);
    if (response) {
      setOpenReminder(true);
      setReminderDays(response);
    }
  };
  const handleReminderClose = async (checkboxes) => {
    setOpenReminder(false);
    try {
      if (
        checkboxes.oneDayBefore === false &&
        checkboxes.twoDayBefore === false &&
        !checkboxes.threeDayBefore
      ) {
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
        if (entityReminderDate) {
          const response = await HomeService.updateReminder(
            {
              entity_id: props.announcement.id,
              entity_date: entityDate,
              entity_type: "news",
            },
            props.token,
            reminderId
          );
          setEntityReminderDate({ ...response.data.data.entity_date });
        } else {
          const response = await HomeService.setReminder(
            {
              entity_id: props.announcement.id,
              entity_date: entityDate,
              entity_type: "news",
            },
            props.token
          );
          setEntityReminderDate({ ...response.data.data.entity_date });
        }
      }
      // const response =await HomeService.setReminder()
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Grid
        container
        direction="row"
        justify="center"
        alignContent="center"
        className={classes.cardContainer}
      >
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <div className={classes.cardHeader}>
              {/* <Link
                to={{
                  pathname: `/news/${props.announcement.id}`,
                  announcementData: props.announcement,
                }}
              >
                {props.announcement.title}
              </Link> */}

              {reminderIcon ? (
                <img
                  className={classes.reminder}
                  src={remindersvg}
                  alt="reminder"
                  onClick={handleReminderOpen}
                ></img>
              ) : (
                ""
              )}
              <Typography
                variant="h6"
                className={classes.title}
                onClick={() => {
                  history.push(`/news/${props.announcement.id}`);
                }}
              >
                {props.announcement.title}
                {props.announcement.event_date
                  ? ":" + props.announcement.event_date
                  : ""}
              </Typography>
            </div>

            {/* Conditional rendering of Grid based on availablity image */}

            {props.announcement.media_url && (
              <Grid
                container
                direction="row"
                className={`${classes.announcementImg} ${classes.contentMargin}`}
              >
                <img
                  src={props.announcement.media_url}
                  alt="Announcement"
                ></img>
              </Grid>
            )}
            <Grid container direction="row" className={classes.contentMargin}>
              <Typography className={classes.announcementText}>
                {props.announcement.summary}
                <br />
                <br />
                {`Published Date:${props.announcement.published_date}`}
              </Typography>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      {openReminder ? (
        <Reminder
          open={openReminder}
          onClose={handleReminderClose}
          days={reminderDays}
          id={props.announcement.id}
          eventDate={props.announcement.event_date}
          entityDate={entityReminderDate}
        />
      ) : (
        ""
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};
export default connect(mapStateToProps)(AnnouncementCard);
