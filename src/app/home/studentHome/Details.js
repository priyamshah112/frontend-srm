import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { CardHeader, CardActions, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import * as moment from "moment";
import { dateDiff } from "../../../shared/datediff";
import remindersvg from "../../../assets/images/home/reminder.svg";
import HomeService from "../HomeSerivce";
import Reminder from "./Reminder";
const useStyle = makeStyles((theme) => ({
  cardContainer: {
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  card: {
    width: "95%",
    margin: "auto",
    marginTop: "20px",
    borderRadius: "10px",
    boxShadow: "none",
  },
  reminder: {
    // width: "100%",
    // textAlign: "right",
  },
  contentMargin: {
    marginTop: "16px",
  },
  title: {
    fontWeight: 600,
    fontStyle: "normal",
    // fontSize: '14px',
  },
  media: {
    "& img": {
      margin: "auto",
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
  descriptionContent: {
    width: "100%",
    margin: "auto",
  },

  NewsHeader: {
    [theme.breakpoints.down("sm")]: {
      padding: "8px 16px 8px 16px !important",
      "& span": {
        fontSize: "16px",
      },
    },
  },
  publishDate: {
    fontSize: "14px",
    color: "#6C757D",
  },
  cardContent: {
    padding: "0px 16px 0px 16px",
  },
  statusText: {
    fontStyle: "normal",
    textTransform: "uppercase",

    paddingRight: "5px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "13px",
    },
  },
  cardActionStyle: {
    padding: "8px 16px 8px 16px",
    color: "#6C757D",
  },
  contentCenter: {
    textAlign: "right",
    height: "50%",

    "& img": {
      marginTop: "25px",
      width: "25px",
      cursor: "pointer",

      [theme.breakpoints.down("xs")]: {
        marginTop: "10px",
      },
    },
    [theme.breakpoints.down("xs")]: {
      textAlign: "right",
    },
  },
  editBtn: {
    marginLeft: "auto",
    cursor: "pointer",
  },
}));

const Details = (props) => {
  const classes = useStyle();
  const history = useHistory();
  const statusColors = {
    draft: "red",
    published: "#7B72AF",
    active: "green",
  };
  const [details, setDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [openReminder, setOpenReminder] = useState(false);
  const [reminderDays, setReminderDays] = useState(null);
  const [reminderIcon, setReminderIcon] = useState(true);
  const [entityReminderDate, setEntityReminderDate] = useState(null);
  const [reminderId, setReminderId] = useState(null);
  const selectedRole = props.selectedRole;

  async function getNewsDetails(newsId) {
    try {
      const token = localStorage.getItem("srmToken");
      const response = await HomeService.fetchAnnouncementDetail(newsId, token);
      if (response.status === 200) {
        setDetails(response.data.data);
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    getNewsDetails(props.newsId);
  }, []);

  useEffect(() => {
    const fetchReminder = async () => {
      try {
        const response = await HomeService.fetchReminder(
          props.token,
          "news",
          details.id
        );
        if (response.data.data) {
          setEntityReminderDate(response.data.data.entity_date);
          setReminderId(response.data.data.id);
        }
      } catch (e) {
        console.log(e);
      }
    };
    if (details.event_date && props.userId !== details.created_by) {
      const response = dateDiff(details.event_date);

      if (!response) {
        setReminderIcon(false);
      } else {
        setReminderIcon(true);
      }
      fetchReminder();
    } else {
      setReminderIcon(false);
    }
  }, [details]);

  const handleReminderOpen = () => {
    const response = dateDiff(details.event_date);
    if (response) {
      setOpenReminder(true);
      setReminderDays(response);
    }
  };
  const handleReminderClose = async (checkboxes) => {
    setOpenReminder(false);
    try {
      let entityDate = {};

      if (checkboxes.oneDayBefore === true) {
        entityDate["1_day_before"] = moment(details.event_date)
          .subtract(1, "days")
          .format("YYYY-MM-DD");
      }
      if (checkboxes.twoDayBefore === true) {
        entityDate["2_day_before"] = moment(details.event_date)
          .subtract(2, "days")
          .format("YYYY-MM-DD");
      }
      if (checkboxes.threeDayBefore === true) {
        entityDate["3_day_before"] = moment(details.event_date)
          .subtract(3, "days")
          .format("YYYY-MM-DD");
      }
      if (entityReminderDate) {
        const response = await HomeService.updateReminder(
          {
            entity_id: details.id,
            entity_date:
              Object.keys(entityDate).length === 0 ? null : entityDate,
            entity_type: "news",
          },
          props.token,
          reminderId
        );
        if (response.status === 200) {
          setEntityReminderDate({ ...response.data.data.entity_date });
        }
      } else {
        if (Object.keys(entityDate).length !== 0) {
          const response = await HomeService.setReminder(
            {
              entity_id: details.id,
              entity_date: entityDate,
              entity_type: "news",
            },
            props.token
          );
          if (response.status === 200) {
            console.log(response.data);
            setEntityReminderDate({ ...entityDate });
            setReminderId(response.data.Reminder_id);
          }
        }
      }

      // const response =await HomeService.setReminder()
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      {!isLoading ? (
        <>
          <Grid
            container
            direction="row"
            justify="center"
            alignContent="center"
            className={classes.cardContainer}
          >
            <Card className={classes.card}>
              <CardHeader
                className={classes.NewsHeader}
                action={
                  <>
                    {details.status === "published" && reminderIcon ? (
                      <div className={classes.reminder}>
                        <img
                          style={{ cursor: "pointer" }}
                          src={remindersvg}
                          alt="reminder"
                          onClick={handleReminderOpen}
                        ></img>
                      </div>
                    ) : (
                      ""
                    )}
                  </>
                }
                title={
                  <span>
                    {details.title ? details.title : "N/A"}{" "}
                    {selectedRole === "teacher" ? (
                      <Typography
                        style={{
                          color: statusColors[details.status],
                        }}
                        className={classes.statusText}
                      >
                        {details.status}
                      </Typography>
                    ) : (
                      ""
                    )}
                  </span>
                }
                subheader={
                  <span className={classes.publishDate}>
                    {`Event Date: ${moment(details.event_date).format(
                      "DD MMM YYYY"
                    )}`}
                  </span>
                }
              />
              <CardContent className={classes.cardContent}>
                {/* Conditional rendering of Grid based on availablity image */}
                <Grid container direction="row">
                  <Typography
                    className={`${classes.title} ${classes.description}`}
                  >
                    Summary
                  </Typography>
                  <br />
                </Grid>
                <Grid
                  container
                  direction="row"
                  className={classes.contentMargin}
                >
                  <Typography className={classes.announcementText}>
                    {details.summary}
                  </Typography>
                </Grid>
                <hr />
                <Grid container direction="row">
                  <Typography
                    className={`${classes.title} ${classes.description}`}
                  >
                    Description
                    <br />
                  </Typography>
                  {details.main_content ? (
                    <div
                      className={classes.descriptionContent}
                      dangerouslySetInnerHTML={{ __html: details.main_content }}
                    />
                  ) : (
                    <Typography className={classes.title}>
                      {": No description provided"}
                    </Typography>
                  )}
                </Grid>
                <Typography className={classes.publishDate}>
                  <br />
                  {`Published Date: ${moment(details.published_date).format(
                    "DD MMM YYYY"
                  )}`}
                </Typography>
              </CardContent>
              {selectedRole === "teacher" && details.status !== "published" ? (
                <CardActions>
                  <Button
                    color="primary"
                    variant="contained"
                    disableElevation
                    onClick={(event) => {
                      history.push(`/create-announcement/${details.id}`);
                    }}
                  >
                    Edit
                  </Button>
                </CardActions>
              ) : (
                ""
              )}
            </Card>
          </Grid>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          {openReminder ? (
            <Reminder
              open={openReminder}
              onClose={handleReminderClose}
              days={reminderDays}
              id={details.id}
              eventDate={details.event_date}
              entityDate={entityReminderDate}
            />
          ) : (
            ""
          )}
        </>
      ) : (
        ""
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedRole: state.auth.selectedRole,
    userId: state.auth.userInfo.id,
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(Details);
