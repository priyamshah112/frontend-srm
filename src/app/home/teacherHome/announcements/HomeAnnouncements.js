import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import {
  Typography,
  Box,
  Grid,
  CardContent,
  CardActions,
} from "@material-ui/core";
import Card from "@material-ui/core/Card";

import taskBookIcon from "../../../../assets/images/home/teacher/TaskBook.svg";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import * as moment from "moment";
import { useHistory } from "react-router-dom";
import HomeSerivce from "../../HomeSerivce";
import { closestIndexTo } from "date-fns/fp";

const useStyle = makeStyles((theme) => ({
  homeworkDiv: {
    height: "100%",
    display: "table",
    width: "100%",
  },
  title: {
    textTransform: "uppercase",
    fontWeight: 800,
    letterSpacing: "1px",
    color: `${theme.palette.common.bastille}`,
  },
  homeworkIcon: {
    transform: "translateY(5px)",
  },
  homeworkheader: {
    width: "100%",
    display: "table-row",
    height: "30px",
  },
  homeworks: {
    width: "100%",
    height: "100%",
    display: "table-row",
    marginTop: "10px",
  },
  cardContentStyle: {
    padding: "8px",
  },
  addhomeworkIcon: {
    float: "right",
    cursor: "pointer",
    bottom: 0,
  },
  cardTitle: {
    fontWeight: 600,
  },
  homeworkCard: {
    borderRadius: "10px",
    minHeight: "100%",
    boxShadow: "none",
    // backgroundColor: '#F7DDCC',
    "& .0": {
      color: "red",

      backgroundColor: "#F7DDCC",
    },
  },
  loading: {
    textAlign: "center",
    justifyContent: "center",
    margin: "auto",
  },

  1: {
    color: "red",
    backgroundColor: "#F8E7C1 !important",
  },
  2: {
    backgroundColor: "#D4DbD8",
  },
  CardContent: {
    padding: "0 0 0 10px !important",
    margin: "10px 0 0 0",
    height: "345px",
    overflow: "auto",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.2)",
      outline: "none",
      borderRadius: "5px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: `${theme.palette.primary.main}`,
      borderRadius: "5px",
    },
    "& .homeworkContentDiv": {
      marginTop: "10px",
    },
  },
  homeworkContentStyle: {
    cursor: "pointer",
  },
}));

const Homework = (props) => {
  const classes = useStyle();
  const history = useHistory();
  const [announcements, setAnnouncements] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    let isAnnouncementsLoading = true;
    const fetchData = async () => {
      try {
        
        const token = localStorage.getItem("srmToken");
        const response = await HomeSerivce.fetchTeacherAnnouncement(token,props.selectedRole);
        if (response.status === 200) {
          if (isAnnouncementsLoading) {
            setAnnouncements(response.data.data.data);
          }
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
    return () => {
      isAnnouncementsLoading = false;
    };
  }, []);

  const handleCreateAnnouncement = async () => {
    try {
      const token = localStorage.getItem("srmToken");
      const response = await HomeSerivce.createAnnouncement(token);
      // console.log(response);
      history.push(`/create-announcement/${response.data.news_id}`);
      // history.push(`/create-announcement/${65}`);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div className={classes.homeworkDiv}>
        <div className={classes.homeworkheader}>
          <Typography className={classes.title}>
            <img
              src={taskBookIcon}
              alt="Announcements Icon"
              className={classes.homeworkIcon}
            />
            <span className={classes.titleName}>&nbsp;Announcements</span>
            <AddCircleRoundedIcon
              color="primary"
              className={classes.addhomeworkIcon}
              onClick={handleCreateAnnouncement}
            />
          </Typography>
        </div>
        <div className={classes.homeworks}>
          <Card>
            <CardContent>
              {announcements.map((announcement, index) => {
                if (index < 3) {
                  return (
                    <div key={index}>
                      <div>
                        <Typography variant="h6">
                          {announcement.title ? announcement.title : "N/A"}
                        </Typography>
                        <Typography>
                          {announcement.summary ? announcement.summary : "N/A"}
                        </Typography>
                      </div>
                      {index < 2 ? <hr /> : ""}
                    </div>
                  );
                }
              })}
            </CardContent>
          </Card>
        </div>

        <br />
        <br />
        <br />
        <br />
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedRole: state.auth.selectedRole,
  };
};

export default connect(mapStateToProps)(Homework);
