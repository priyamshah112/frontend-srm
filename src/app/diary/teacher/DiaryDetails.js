import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import BackIcon from "../../../assets/images/Back.svg";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { getDetailsById } from "../../redux/actions/attendence.action";
import { getDetailsByIdParent } from "../../redux/actions/attendence.action";
import { connect } from "react-redux";
import * as moment from "moment";
import { CircularProgress } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  card: {
    marginBottom: "20px",
  },
  sectionContainer: {
    flexWrap: "wrap",
    margin: "20px",
    marginBottom: "85px",
  },
  headingDiv: {
    margin: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  backImg: {
    float: "left",
    // transform: 'translateY(7px)',
    cursor: "pointer",
    position: "absolute",
    left: "20px",
  },
  themeColor: {
    color: `${theme.palette.common.deluge}`,
    padding: 0,
    margin: 0,
    fontFamily: "Avenir",
    fontSize: 14,
  },
  titleText: {
    fontFamily: "Avenir Medium",
    color: "#1C1C1E",
  },

  textAlignRight: {
    textAlign: "right",
    color: "#AEAEB2",
    fontSize: "0.85rem",
  },
  imgDiv: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
  },
  typography: {
    marginTop: "5px",
    // cursor: "pointer",
    color: "black",
  },
  labelText: {
    fontStyle: "normal",
    color: "#8E8E93",
    fontSize: ".8rem",
  },
  span: {
    textTransform: "uppercase",
  },
  circularProgress: {
    display: "flex",
    height: "70%",
    justifyContent: "center",
    alignItems: "center",
  },
}));

function DiaryDetails(props) {
  const classes = useStyle();
  const { student_id, id } = useParams();
  const history = useHistory();
  const { data, dataLoading, selectedRole } = props;
  const token = localStorage.getItem("srmToken");
  const diary = data.diary || {};
  console.log("data", data, id);

  const fetchData = () => {
    if (selectedRole === "parent") {
      const myStorage = window.localStorage;
      const srmSelectedChild = myStorage.srmSelected_Child;
      const srmChild = myStorage.srmChild_dict;
      var srmChildArray = new Function("return [" + srmChild + "];")();
      const stuId = srmChildArray[0][srmSelectedChild].userDetails.id;

      props.getDetailsByIdParent(id, selectedRole, stuId,token);
    } else if (selectedRole === "teacher" || selectedRole === "parent") {
      props.getDetailsById(id, selectedRole, student_id);
    } else {
      const myStorage = window.localStorage;
      const srmUserInfo = myStorage.srmUserInfo;
      var obj = JSON.parse(srmUserInfo);
      const stuId = obj.id;
      console.log("srmUserInfo", obj, stuId);
      props.getDetailsById(id, selectedRole, stuId);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {dataLoading ? (
        <div className={classes.circularProgress}>
          <CircularProgress />
        </div>
      ) : (
        <div className={classes.sectionContainer}>
          <div className={classes.headingDiv}>
            <img
              src={BackIcon}
              alt="Back"
              className={classes.backImg}
              onClick={() => {
                // history.push(`/diary/${student_id}`)
                history.goBack();
              }}
            />
            <Typography
              style={{ fontSize: 18 }}
              className={`${classes.themeColor} ${classes.titleText}`}
            >
              Diary Details
            </Typography>
          </div>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Grid container>
                <Grid item xs={8}>
                  <span>
                    <Typography variant="body1">{diary.title}</Typography>
                  </span>
                </Grid>
                <Grid item xs={4}>
                  <Typography
                    className={`${classes.textAlignRight}`}
                    variant="body2"
                  >
                    {moment(diary.created_at).format("DD MMM YY")}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={8}></Grid>
                <Grid item xs={4}>
                  <Typography
                    className={`${classes.labelText} ${classes.textAlignRight}`}
                    variant="body2"
                  >
                    <span className={`${classes.span}`}>{diary.status}</span>
                  </Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={8}>
                  <Typography className={classes.labelText} variant="body2">
                    <Typography
                      className={`${classes.typography}`}
                      variant="body2"
                    >
                      {diary.description}
                    </Typography>
                  </Typography>
                </Grid>
                <Grid item xs={4}></Grid>
              </Grid>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  const { getDetailsById = [], getDetailsByIdLoading } = state.Attendence;
  const userInfo = state.auth.userInfo || {};
  const userClasses = userInfo.user_classes || {};
  return {
    data: getDetailsById,
    dataLoading: getDetailsByIdLoading,
    selectedRole: state.auth.selectedRole,
    school_id: userClasses.school_id,
  };
};

export default connect(mapStateToProps, {
  getDetailsById,
  getDetailsByIdParent,
})(DiaryDetails);
