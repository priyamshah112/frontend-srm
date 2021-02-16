import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, FormControl, Typography } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import HolidayCard from "./HolidayCard";
// import CreateHoliday from "./CreateHoliday";
// import AddIcon from "../../../assets/images/Filled Add.svg";
import { connect } from "react-redux";
import { getByMonth } from "../../redux/actions/attendence.action";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: "20px",
  },
  sectionContainer: {
    height: "100%",
    width: "100%",
  },
  header: {
    display: "inline block",
  },
  fieldStyle: {
    minWidth: 120,
    width: "25%",
    margin: "0 20px 0 0",
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
  head: {
    margin: "20px",
    display: "flex",
    justifyContent: "center",
  },
  heading1: {
    fontSize: "18px",
    fontFamily: "Avenir medium",
    textAlign: "center",
  },
  heading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontFamily: "Avenir",
  },
  menuItem: {
    paddingLeft: "5px",
  },
  monthsLabel: {
    fontSize: "14px",
    fontFamily: "Avenir heavy",
    textTransform: "capitalize",
  },
  addNew: {
    color: theme.palette.common.deluge,
    float: "right",
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
}));

function HolidayCalendrer(props) {
  const classes = useStyles();
  const [months, setMonths] = useState("all");
  const { data, loading, selectedRole } = props;

  const handleChange = (event) => {
    setMonths(event.target.value);
  };
  const fetchData = () => {
    props.getByMonth();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className={classes.container}>
        <div className={classes.head}>
          <div className={classes.heading}>
            <span className={classes.heading1}>Holidays</span>
          </div>
        </div>
        <div className={classes.sectionContainer}>
          <div className={classes.header}>
            <div className={classes.filterForm}>
              <FormControl className={classes.fieldStyle}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={months}
                  className={classes.menuItem}
                  onChange={handleChange}
                >
                  <MenuItem value="all">All</MenuItem>
                  {data.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {selectedRole === "admin" || selectedRole === "teacher" ? (
                <>
                  {/* <div className={classes.addNew} onClick={handleNewOpen}>
                      <img src={AddIcon} alt="add" />
                      <Typography className="new">Create</Typography>
                    </div> */}
                  {/* <div className={classes.monthsLabel}>{months}</div> */}
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <HolidayCard month_id={months} />
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  const { getByMonth = [], getByMonthLoading } = state.Attendence;
  const userInfo = state.auth.userInfo || {};
  const userClasses = userInfo.user_classes || {};
  return {
    data: getByMonth,
    loading: getByMonthLoading,
    // class_id: userClasses.class_id,
    school_id: userClasses.school_id,
    selectedRole: state.auth.selectedRole,
  };
};

export default connect(mapStateToProps, { getByMonth })(HolidayCalendrer);
