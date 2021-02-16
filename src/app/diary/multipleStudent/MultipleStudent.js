import React, { useState, useEffect } from "react";
import AddIcon from "../../../assets/images/Filled Add.svg";
import MenuItem from "@material-ui/core/MenuItem";
import { IconButton, Typography, makeStyles } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MultiStudentCard from "./MultiStudentCard";
import { connect } from "react-redux";
import { postDiaryMultiple } from "../../redux/actions/attendence.action";
import BackdropLoader from "../../common/ui/backdropLoader/BackdropLoader";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: "8px",
    marginRight: "15px",
    width: "169px",
    position: "absolute",
    left: "20px",
  },

  header: {
    // position: "relative",
    display: "flex",
    flexDirection: "row",
    paddingRight: "20px",
    paddingLeft: "20px",
    paddingTop: "20px",
    // textAlign: "left",
    justifyContent: "center",
  },

  addNew: {
    color: theme.palette.common.deluge,
    position: "absolute",
    right: "20px",
    // marginTop: "15px",
    // marginRight: "20px",
    cursor: "pointer",
    "& .new": {
      float: "right",
      fontSize: "14px",
      padding: "5px",
    },
    "& img": {
      margin: "5px",
      height: "20px",
      cursor: "pointer",
    },
  },

  menuContainer: {
    backgroundColor: theme.palette.common.darkGray,
    color: "black",
    minWidth: "150px",
    "&.MuiPaper-rounded": {
      boxShadow: "0px 6px 6px #00000029",
    },
    [theme.breakpoints.down("md")]: {
      minWidth: "150px",
    },
    [theme.breakpoints.down("sm")]: {
      minWidth: "150px",
    },
  },
  menuList: {
    width: "100% !important",
    padding: 0,
  },
  home: {
    // marginRight: "100px",
    fontFamily: "Avenir medium",
    fontSize: 18,
  },
  fieldStyle: {
    width: "185px",
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
    ".MuiInputBase-input": {
      color: "#eaeaea",
    },
  },
}));

function MultipleStudent(props) {
  const classes = useStyles();
  const history = useHistory();
  const [menuVal, setMenuVal] = useState("general");
  const { loading, selectedRole } = props;

  const handleSuccess = (result) => {
    history.push(`/multiple-student/edit/${result.data.id}`);
  };
  const handleNewOpen = () => {
    props.postDiaryMultiple(handleSuccess);
  };
  const handleMenuChange = (e) => {
    setMenuVal(e.target.value);
  };

  return (
    <>
      {loading ? (
        <BackdropLoader open={loading} />
      ) : (
        <>
          <div className={classes.header}>
            {/* <div style={{ zIndex: "1" }}>
              <FormControl className={classes.fieldStyle}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={menuVal}
                  onChange={handleMenuChange}
                  classes={{
                    paper: classes.menuContainer,
                    list: classes.menuList,
                  }}
                >
                  <MenuItem value="general">General Diary Entry</MenuItem>
                  <MenuItem value="teacher">Teacher Observation</MenuItem>
                  <MenuItem value="late">Late Coming</MenuItem>
                </Select>
              </FormControl>
            </div> */}
            <div className={classes.home}>Home</div>
            <div className={classes.addNew} onClick={handleNewOpen}>
              <img src={AddIcon} alt="add" />
              <Typography className="new">New</Typography>
            </div>
          </div>
          <MultiStudentCard />
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  const { postDiaryMultipleLoading, classesLoading } = state.Attendence;
  const userInfo = state.auth.userInfo || {};
  const userClasses = userInfo.user_classes || {};
  return {
    loading: postDiaryMultipleLoading,
    classesLoading: classesLoading,
    selectedRole: state.auth.selectedRole,
    school_id: userClasses.school_id,
  };
};

export default connect(mapStateToProps, {
  postDiaryMultiple,
})(MultipleStudent);
