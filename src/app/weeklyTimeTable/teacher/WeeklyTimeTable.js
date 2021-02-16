import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import AddIcon from "../../../assets/images/Filled Add.svg";
import { Typography } from "@material-ui/core";
import { Grid, FormControl } from "@material-ui/core";
import ClassesDropdown from "../../common/ui/classesDropdown";
import TimeTable from "./TimeTable";
import LectureBreak from "./LectureBreak";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: "15px",
  },
  datePicker: {
    width: "25%",
    paddingRight: "10px",
  },
  sectionContainer: {
    height: "100%",
    width: "100%",
  },

  header: {
    display: "inline block",
  },
  cardBoxPadding: {
    padding: "24px",
    [theme.breakpoints.down("sm")]: {
      padding: "16px",
    },
  },
  style: {
    fonTize: "1rem",
    fontFamily: "Avenir Medium",
    fontWeight: "400",
    color: "#1C1C1E",
    textAlign: "center",
  },
  addNew: {
    color: theme.palette.common.deluge,
    float: "right",
    marginTop: "15px",
    // marginRight: "15px",
    cursor: "pointer",
    "& .new": {
      float: "right",
      fontSize: "14px",
      padding: "5px",
      fontWeight: 500,
    },
    "& img": {
      margin: "5px",
      height: "20px",
      cursor: "pointer",
    },
  },
  InfiniteScroll: {
    overflow: "revert !important",
    "& .infinite-scroll-component": {
      overflow: "revert !important",
    },
  },
  loading: {
    width: "100%",
    textAlign: "center",
    paddingTop: "8px",
    fontSize: "20px",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    fontFamily: "Avenir Book",
    width: "50%",
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
  head: {
    margin: "20px 0 20px 50px",
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: 'red',
  },
  heading1: {
    fontSize: "18px",
    fontFamily: "Avenir medium",
    textAlign: "center",
  },
  heading2: {
    fontFamily: "Avenir medium",
    fontSize: "18px",
    color: "rgb(150, 150, 150)",
    textTransform: "capitalize",
  },
  head1: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Avenir",
    width: "93%",
  },
  head2: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    fontFamily: "Avenir",
    width: "7%",
  },
  heading21: {
    position: "absolute",
    width: "100px",
    right: 0,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
}));

function WeeklyTimeTable(props) {
  const classes = useStyles();
  const [class_id, setClassId] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [name, setClassName] = useState("");
  const [schoolId, setSchoolId] = useState("");
  const [status, setStatus] = useState("published");
  const { selectedRole } = props;
  const [length, setLength] = useState("");

  const onChangeClass = (id, classname) => {
    setClassId(id);
    setClassName(classname.class_name);
    setSchoolId(classname.school_id);
  };

  const handleAdd = () => {
    setOpenAdd(true);
  };
  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  return (
    <>
      <LectureBreak
        name={name}
        schoolId={schoolId}
        class_id={class_id}
        open={openAdd}
        close={handleCloseAdd}
      />
      <div className={classes.container}>
        <div className={classes.head}>
          <div className={classes.head1}>
            <span className={classes.heading1}>
              Weekly Time Table 2020 - 21
            </span>
          </div>
          {selectedRole === "teacher" || selectedRole === "admin" ? (
            <div className={classes.head2}>
              {length ? <span className={classes.heading2}>{status}</span> : ""}
            </div>
          ) : (
            ""
          )}
        </div>

        {selectedRole === "teacher" || selectedRole === "admin" ? (
          <div className={classes.sectionContainer}>
            <div className={classes.header}>
              <div className={classes.filterForm}>
                <FormControl className={classes.formControl}>
                  <ClassesDropdown onChange={onChangeClass} value={class_id} />
                </FormControl>
                <div className={classes.addNew} onClick={handleAdd}>
                  <img src={AddIcon} alt="add" />
                  <Typography className="new">Add Lectures/Break</Typography>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <TimeTable
          status={setStatus}
          schoolId={schoolId}
          class_id={class_id}
          name={name}
          length={setLength}
        />
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    selectedRole: state.auth.selectedRole,
  };
};

export default connect(mapStateToProps)(WeeklyTimeTable);
