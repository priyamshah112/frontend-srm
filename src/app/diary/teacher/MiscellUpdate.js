import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import BackIcon from "../../../assets/images/Back.svg";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { updateMiscellaneous } from "../../redux/actions/attendence.action";
import { useHistory, useParams } from "react-router-dom";
import BackdropLoader from "../../common/ui/backdropLoader/BackdropLoader";
import { SnackBarRef } from "../../../SnackBar";
import CircularProgress from '@material-ui/core/CircularProgress'
 
const useStyle = makeStyles((theme) => ({
  root: {
    // minWidth: 275,
    margin: "20px",
  },
  title: {
    fontSize: 14,
    fontFamily: "Avenir medium",
    lineHeight: "30px",
    margin: "10px",
  },
  pos: {
    marginBottom: 12,
  },
  sectionContainer: {
    width: "100%",
    flexWrap: "wrap",
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
  textArea: {
    width: "100%",
  },
  editBtn: {
    marginLeft: "auto",
    cursor: "pointer",
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
  fieldStyle: {
    width: "100%",
    margin: "auto",
    fontFamily: "Avenir Book",
    fontSize: " 1rem",
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
  fieldStyleText: {
    width: "100%",
    margin: "0 10px 28px 10px",
    fontFamily: "Avenir Book",
    fontSize: " 1rem",
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
  margin: {
    // marginTop: "10px",
    [theme.breakpoints.down("xs")]: {
      marginTop: "10px",
    },
    "& .publishBtn": {
      borderRadius: "3px",
      width: "inherit",
      margin: 0,
      [theme.breakpoints.down("xs")]: {
        marginTop: "10px",
        marginRight: 0,
        width: "100%",
      },
    },
    "& .publishLaterBtn": {
      backgroundColor: `${theme.palette.common.white}`,
      border: `1px solid ${theme.palette.common.adornment}`,
      marginRight: "5px",
    },
  },
  marginText: {
    marginTop: "10px",
    [theme.breakpoints.down("xs")]: {
      marginTop: "10px",
    },
    "& .publishBtn": {
      borderRadius: "3px",
      width: "inherit",
      margin: 0,
      [theme.breakpoints.down("xs")]: {
        marginTop: "10px",
        marginRight: 0,
        width: "100%",
      },
    },
    "& .publishLaterBtn": {
      backgroundColor: `${theme.palette.common.white}`,
      border: `1px solid ${theme.palette.common.adornment}`,
      marginRight: "5px",
    },
  },
  sideMargins: {
    // marginLeft: "20px",
    marginRight: "10px",
    display: "flex",
    justifyContent: "flex-end",
  },
  sideMarginsText: {
    // marginLeft: "20px",
    // marginRight: "20px",
    display: "flex",
    justifyContent: "flex-end",
  },
  textAlignLeft: {
    textAlign: "left",
    color: "rgba(0, 0, 0, 0.54)",
  },
}));

function MiscellUpdate(props) {
  const classes = useStyle();
  const { id } = useParams();
  const history = useHistory();
  const [description, setDescription] = useState("");
  const [publishLoading, setPublishLoading] = useState(false)
  const {loading, school_id} = props
  const data = props.updateData;
	let saveDataApi

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleSuccess = () => {
    SnackBarRef.open("", true, "Updated successfully");
    history.replace(`/miscellaneous/${id}`);
    setPublishLoading(false)
  };
  const handleFail = (error) => {
    console.log("error", error);
    if (error) {
      SnackBarRef.open("", false, error.message);
    }
  };
  useEffect(() => {
    if (props.edit) {
      setDescription(data.description);
    }
  }, []);

  let currentTime = new Date();
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  let seconds = currentTime.getSeconds();
  let date = currentTime.getDate();
  let month = currentTime.getMonth();
  let year = currentTime.getFullYear();
  month = parseInt(month) + 1;

  date = (date < 10 ? "0" : "") + date;
  month = (month < 10 ? "0" : "") + month;
  hours = (hours < 10 ? "0" : "") + hours;
  minutes = (minutes < 10 ? "0" : "") + minutes;
  seconds = (seconds < 10 ? "0" : "") + seconds;
  let time =
    year +
    "-" +
    month +
    "-" +
    date +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;

  const handlePublish = () => {
    setPublishLoading(true)
    clearInterval(saveDataApi)
    const updateData = {
      name: data.name,
      school_id: school_id,
      description: description,
      status: "published",
      published_date: time,
    };
    props.updateMiscellaneous(id, updateData, handleSuccess, handleFail);
  };

  const saveDetails = (isBack) => {
    const updateData = {
      name: data.name,
      school_id: school_id,
      description: description,
      status: "draft",
      published_date: time,
    };
    props.updateMiscellaneous(id, updateData);
    if(isBack){
      history.replace(`/miscellaneous/${id}`);

    }
  };

  const handleBack =()=>{
    saveDetails(true)
  }

  useEffect(() => {
		saveDataApi = setInterval(() => {
			saveDetails(false)
		}, 10000)
		return () => clearInterval(saveDataApi)
	}, [description])

  return (
    <>
      <div className={classes.sectionContainer}>
        <div className={classes.headingDiv}>
          <img
            src={BackIcon}
            alt="Back"
            className={classes.backImg}
            onClick={() => {
              handleBack();
              history.replace(`/miscellaneous/${id}`);
            }}
          />
          <Typography
            style={{ fontSize: 18 }}
            className={`${classes.themeColor} ${classes.titleText}`}
          >
            {data.name === "prayer"
              ? "Prayer"
              : data.name === "vijayi"
              ? "Vijayi Vishwa Tiranga Pyara"
              : data.name === "national"
              ? "National Pledge"
              : data.name === "jaya"
              ? "Jaya Bharat Jananiya"
              : data.name === "saare"
              ? "Saare Jahan Se Achcha"
              : data.name === "rules"
              ? "School Rules and Other Info"
              : ""}
          </Typography>
        </div>
        <Card className={classes.root}>
          <CardContent>
            <Box className={`${classes.marginText} ${classes.sideMarginsText}`}>
              <Grid className={classes.fieldStyleText}>
                <TextField
                  className={classes.textArea}
                  id="outlined-multiline-static"
                  label=""
                  multiline
                  rows={5}
                  rowsMax={20}
                  value={description}
                  onChange={handleDescription}
                  variant="outlined"
                />
              </Grid>
            </Box>
            <Box className={`${classes.margin} ${classes.sideMargins}`}>
              {publishLoading ? (
                <CircularProgress />
              ) : (
                <Button
                  id="publishBtn"
                  variant="contained"
                  className={`${classes.fieldStyle} ${"publishBtn"}`}
                  color="primary"
                  type="submit"
                  onClick={handlePublish}
                  disableElevation
                >
                  Publish
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  const {
    updateMiscellaneous = [],
    updateMiscellaneousLoading,
  } = state.Attendence;
  const userInfo = state.auth.userInfo || {};
  const userClasses = userInfo.user_classes || {};
  return {
    data: updateMiscellaneous,
    loading: updateMiscellaneousLoading,
    school_id: userClasses.school_id,
  };
};

export default connect(mapStateToProps, { updateMiscellaneous })(MiscellUpdate);
