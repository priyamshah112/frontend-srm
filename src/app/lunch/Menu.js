import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import AddIcon from "../../assets/images/Filled Add.svg";
import { Typography } from "@material-ui/core";
import { Grid, FormControl } from "@material-ui/core";
import { connect } from "react-redux";
import AddMenu from "./AddMenu";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import MenuCard from "./MenuCard";
import DishDetails from "./DishDetails";

const useStyles = makeStyles((theme) => ({
  container: {},
  datePicker: {
    width: "25%",
    paddingRight: "10px",
  },
  sectionContainer: {
    height: "100%",
    width: "100%",
    marginBottom: "10px",
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
    marginRight: "15px",
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
  fieldStyle: {
    width: "50%",
    marginleft: "15px",
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
  menuItem: {
    textAlign: "left",
    color: "rgba(0, 0, 0, 0.54)",
    marginLeft: "16px",
  },
  loading: {
    width: "100%",
    textAlign: "center",
    paddingTop: "8px",
    fontSize: "20px",
  },
  formControl: {
    marginLeft: "5px",
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

function Menu(props) {
  const classes = useStyles();
  const [openAdd, setOpenAdd] = useState(false);
  const [selectValue, setSelectValue] = useState("All");
  const [openDetails, setOpenDetails] = useState(false);
  const [heading, setHeading] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState([]);
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");

  const { selectedRole } = props;

  const handleAdd = () => {
    setOpenAdd(true);
  };
  const handleCloseAdd = () => {
    setOpenAdd(false);
  };
  const handleChange = (event) => {
    setSelectValue(event.target.value);
  };

  return (
    <>
      {openDetails ? (
        <DishDetails
          heading={heading}
          type={type}
          image={image}
          desc={desc}
          price={price}
          close={setOpenDetails}
        />
      ) : (
        <div>
          {openAdd ? (
            <AddMenu close={handleCloseAdd} />
          ) : (
            <div className={classes.container}>
              <div className={classes.head}>
                <div className={classes.heading}>
                  <span className={classes.heading1}>Menu</span>
                </div>
              </div>
              <div className={classes.sectionContainer}>
                <div className={classes.header}>
                  <div className={classes.filterForm}>
                    {selectedRole === "teacher" || selectedRole === "admin" ? (
                      <div className={classes.addNew} onClick={handleAdd}>
                        <img src={AddIcon} alt="add" />
                        <Typography className="new">Add</Typography>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className={classes.header}>
                  <div className={classes.filterForm}>
                    {selectedRole === "teacher" || selectedRole === "admin" ? (
                      <FormControl className={classes.fieldStyle}>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={selectValue}
                          className={classes.menuItem}
                          onChange={handleChange}
                        >
                          <MenuItem value="All">All</MenuItem>
                          <MenuItem value="Monday">Monday</MenuItem>
                          <MenuItem value="Tuesday">Tuesday</MenuItem>
                          <MenuItem value="Wednesday">Wednesday</MenuItem>
                          <MenuItem value="Thursday">Thursday</MenuItem>
                          <MenuItem value="Friday">Friday</MenuItem>
                          <MenuItem value="Saturday">Saturday</MenuItem>
                        </Select>
                      </FormControl>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              {selectedRole === "student" ||
              selectedRole === "teacher" ||
              selectedRole === "admin" ||
              selectedRole === "parent" ? (
                <MenuCard
                  heading={setHeading}
                  type={setType}
                  image={setImage}
                  desc={setDesc}
                  price={setPrice}
                  openDetails={setOpenDetails}
                />
              ) : (
                ""
              )}
            </div>
          )}
          <div></div>
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

export default connect(mapStateToProps)(Menu);
