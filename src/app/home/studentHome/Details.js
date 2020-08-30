import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { CardHeader, CardActions, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
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
    fontWeight: "bold",
    fontStyle: "normal",
    fontSize: "14px",
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
  const selectedRole = props.selectedRole;

  async function getNewsDetails(newsId) {
    try {
      const token = localStorage.getItem("srmToken");
      const response = await HomeService.fetchAnnouncementDetail(newsId, token);

      setDetails(response.data.data);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    if (details.event_date && props.userId !== details.created_by) {
      const response = dateDiff(details.event_date);

      if (!response) {
        setReminderIcon(false);
      } else {
        setReminderIcon(true);
      }
    } else {
      setReminderIcon(false);
    }
  }, [details]);

  useEffect(() => {
    getNewsDetails(props.newsId);
  }, []);

  const handleReminderOpen = () => {
    const response = dateDiff(details.event_date);
    if (response) {
      setOpenReminder(true);
      setReminderDays(response);
    }
  };
  const handleReminderClose = (checkboxes) => {
    console.log(checkboxes);
    setOpenReminder(false);
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
                    {`Event Date: ${details.event_date}`}
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
                  {`Published Date: ${details.published_date}`}
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
  };
};

export default connect(mapStateToProps)(Details);
