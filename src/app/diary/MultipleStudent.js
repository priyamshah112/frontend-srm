import React, { useState } from "react";
import AddIcon from "../../assets/images/Filled Add.svg";
import MenuItem from "@material-ui/core/MenuItem";
import { IconButton, Typography, makeStyles } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import AddNewMulti from "./AddNewMulti";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: "15px",
    marginRight: "15px",
    width: "169px",
    position: "absolute",
    left: "16px",
  },

  header: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    paddingRight: "15px",
    paddingLeft: "15px",
    paddingTop: "10px",
    textAlign: "left",
    justifyContent: "center",
  },

  addNew: {
    color: theme.palette.common.deluge,
    position: "absolute",
    right: 0,
    marginTop: "15px",
    marginRight: "15px",
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
    marginTop: "15px",
    fontFamily: "Avenir medium",
    fontSize: 18,
  },
}));

function MultipleStudent() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [menuVal, setMenuVal] = useState("General Diary Entry");

  const handleNew = () => {
    setOpen(true);
  };
  const handleMenuChange = (e) => {
    setMenuVal(e.target.value);
  };

  return (
    <>
      {open ? (
        <AddNewMulti />
      ) : (
        <div className={classes.header}>
          <div style={{ zIndex: "1" }}>
            <FormControl className={classes.formControl}>
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
                <MenuItem value="General Diary Entry">
                  General Diary Entry
                </MenuItem>
                <MenuItem value="Teacher Observation">
                  Teacher Observation
                </MenuItem>
                <MenuItem value="Late Coming">Late Coming</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className={classes.home}>Home</div>
          <div className={classes.addNew} onClick={handleNew}>
            <img src={AddIcon} alt="add" />
            <Typography className="new">New</Typography>
          </div>
        </div>
      )}
    </>
  );
}

export default MultipleStudent;
