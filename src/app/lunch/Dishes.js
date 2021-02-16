import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import AddIcon from "../../assets/images/Filled Add.svg";
import { Typography } from "@material-ui/core";
import { connect } from "react-redux";
import AddDishes from "./AddDishes";
import DishesCard from "./DishesCard";

const useStyles = makeStyles((theme) => ({
  container: {
    // margin: "15px",
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
    // marginTop: '15px',
    // marginRight: "15px",
    cursor: "pointer",
    marginRight: "15px",
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
    width: "50%",
  },
  head: {
    margin: "20px",
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
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
  },
  heading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontFamily: "Avenir",
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

function Dishes(props) {
  const classes = useStyles();
  const [openAdd, setOpenAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  const { selectedRole } = props;

  const handleAdd = () => {
    setOpenAdd(true);
  };
  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  return (
    <>
      {openAdd ? (
        <AddDishes close={handleCloseAdd} />
      ) : (
        <div className={classes.container}>
          {edit ? (
            ""
          ) : (
            <div className={classes.head}>
              <div className={classes.heading}>
                <span className={classes.heading1}>Dishes</span>
              </div>
            </div>
          )}
          {edit?'':
          <div className={classes.sectionContainer}>
            <div className={classes.header}>
              <div className={classes.filterForm}>
                {selectedRole === "teacher" || selectedRole === "admin" ? (
                    <div className={classes.addNew} onClick={handleAdd}>
                      <img src={AddIcon} alt="add" />
                      <Typography className="new">Add Dishes</Typography>
                    </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>}
          <div>
            {selectedRole === "student" ||
            selectedRole === "teacher" ||
            selectedRole === "admin" ||
            selectedRole === "parent" ? (
              <DishesCard setEdit={setEdit} />
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    selectedRole: state.auth.selectedRole,
  };
};

export default connect(mapStateToProps)(Dishes);
