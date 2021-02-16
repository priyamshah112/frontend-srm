import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import BackIcon from "../../../assets/images/Back.svg";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import EditIcon from "../../../assets/images/Edit.svg";
import { connect } from "react-redux";
import { getMiscellaneous } from "../../redux/actions/attendence.action";
import { useHistory, useParams } from "react-router-dom";
import BackdropLoader from "../../common/ui/backdropLoader/BackdropLoader";
import MiscellUpdate from "./MiscellUpdate";

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
  message: {
    fontSize: 14,
    fontFamily: "Avenir medium",
    lineHeight: "30px",
    // margin: "10px",
    textAlign: "center",
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
    margin: "20px 22px 20px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backImg: {
    float: "left",
    // transform: 'translateY(7px)',
    cursor: "pointer",
    // position: "absolute",
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
    marginLeft: "35px",
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
  status: {
    fontFamily: "Avenir medium",
    fontSize: 18,
    textTransform: "capitalize",
    color: "rgba(0,0,0,0.54)",
  },
}));

function MiscellDetails(props) {
  const classes = useStyle();
  const { id } = useParams();
  const history = useHistory();
  const [edit, setEdit] = useState(false);
  const [description, setDescription] = useState("");
  const { data, loading } = props;

  console.log("data get", data);

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleEdit = () => {
    setEdit(true);
    setDescription(data.description);
  };

  const fetchData = () => {
    props.getMiscellaneous(id);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <BackdropLoader open={loading} />
      ) : edit ? (
        <MiscellUpdate updateData={data} edit={edit} />
      ) : (
        <div className={classes.sectionContainer}>
          <div className={classes.headingDiv}>
            <img
              src={BackIcon}
              alt="Back"
              className={classes.backImg}
              onClick={() => {
                history.replace("/miscellaneous");
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
            <Typography className={classes.status}>{data.status}</Typography>
          </div>
          <Card className={classes.root}>
            <CardContent>
              {data.description ? (
                <Typography className={classes.title} color="textSecondary">
                  {data.description}
                </Typography>
              ) : (
                <Typography className={classes.message} color="textSecondary">
                  No record found!
                </Typography>
              )}
              {props.selectedRole === "teacher" ||
              props.selectedRole === "admin" ? (
                <div
                  onClick={() => handleEdit()}
                  className={`${classes.imgDiv} ${classes.textAlignRight}`}
                >
                  <img src={EditIcon} className={classes.editBtn} />
                </div>
              ) : (
                ""
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  const { getMiscellaneous = [], getMiscellaneousLoading } = state.Attendence;
  const userInfo = state.auth.userInfo || {};
  const userClasses = userInfo.user_classes || {};
  return {
    data: getMiscellaneous,
    loading: getMiscellaneousLoading,
    school_id: userClasses.school_id,
    selectedRole: state.auth.selectedRole,
  };
};

export default connect(mapStateToProps, { getMiscellaneous })(MiscellDetails);
