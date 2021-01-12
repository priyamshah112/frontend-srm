import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import BackIcon from "../../assets/images/Back.svg";
import { connect } from "react-redux";
import { getClasses } from "../redux/actions/attendence.action";
import Input from "@material-ui/core/Input";
import Chip from "@material-ui/core/Chip";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import DosaImg from "./images/Dosa.jpg";
import MasalaDosaImg from "./images/Masala-Dosa.jpg";
import ChickenTikka from "./images/Chicken-Tikka-Masala.jpg";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyle = makeStyles((theme) => ({
  formStyle: {
    margin: "auto",
    width: "95%",
    marginBottom: "85px",
    backgroundColor: "white",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: "5px",
  },
  backImg: {
    float: "left",
    transform: "translate(0px, 7px)",
    cursor: "pointer",
  },
  adornmentColor: {
    color: "rgba(0, 0, 0, 0.54)",
  },
  themeColor: {
    color: `${theme.palette.common.deluge}`,
    padding: 0,
    margin: 0,
  },
  errorColor: {
    color: "red",
  },
  titleText: {
    textAlign: "center",
    margin: "auto",
    fontFamily: "Avenir Medium",
    fontize: "1.2rem",
    color: "#1C1C1E",
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
  snackBar: {
    "&.MuiSnackbar-root": {
      zIndex: theme.zIndex.drawer + 1,
      maxWidth: "400px",
    },
  },
  previewChip: {
    minWidth: 300,
    maxWidth: 400,
  },
  inputBorder: {
    height: "50px",
  },
  datePicker: {
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  paper: {
    display: "flex",
    minHeight: "40px",
    backgroundColor: "none",
    justifyContent: "left",
    flexWrap: "wrap",
    listStyle: "none",
    border: `1px solid ${theme.palette.common.deluge}`,
    padding: theme.spacing(0.5),
    margin: "auto",
  },

  showIn: {
    paddingTop: "5px",
  },
  textArea: {
    width: "100%",
  },
  paperShowIn: {
    display: "flex",
    minHeight: "40px",
    backgroundColor: "none",
    justifyContent: "left",
    flexWrap: "wrap",
    listStyle: "none",

    padding: theme.spacing(0.5),
    margin: "auto",
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  paperBoxShadow: {
    boxShadow: `2px 2px 2px 0 #E5E5EA`,
  },
  textAlignLeft: {
    textAlign: "left",
    color: "rgba(0, 0, 0, 0.54)",
  },
  contentCenter: {
    justifyContent: "left",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  publishBtns: {
    textAlign: "right",
    justifyContent: "right",
  },
  menuItem: {
    textAlign: "left",
    color: "rgba(0, 0, 0, 0.54)",
  },
  sideMargins: {
    marginLeft: "20px",
    marginRight: "20px",
  },
  formControl: {
    width: "100%",
  },
  sideMarginright: {
    marginRight: "50px",
  },
  radio: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  dropzone: {
    border: "solid !important",
    minHeight: "0px !important",
    width: "150px !important",
  },
  margin: {
    marginTop: "30px",
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
  circle: {
    padding: "4px",
    borderRadius: "50%",
    width: "3px",
    height: "2px",
    marginTop: "5px",
    marginRight: "4px",
  },
  circleRed: {
    backgroundColor: "#f44336",
  },
  circleGreen: {
    backgroundColor: "#14ee14",
  },
  red: {
    color: "#f44336",
  },
  green: {
    color: "#14ee14",
  },
  heading: {
    fontFamily: "Avenir medium",
    fontSize: 14,
    width: "20%",
    display: "flex",
    marginLeft: "15px",
  },
  renderOption: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    paddingTop: "13px",
    paddingBottom: "8px",
  },
  optionHeading: {
    fontFamily: "Avenir medium",
    fontSize: 14,
  },
  optionPrice: {
    fontFamily: "Avenir book",
    fontSize: 14,
    width: "20%",
    textAlign: "center",
    // position: "absolute",
    // right: "0",
  },
  optionContainer: {
    display: "flex",
    width: "80%",
  },
}));

function AddMenu(props) {
  const classes = useStyle();
  const [errMessage, setError] = useState("");
  const [title, setTitle] = useState("");
  const [day, setDay] = useState("Select Day");
  const [classState, setClassState] = useState([]);
  const { data = [], classesLoading } = props;
  const [dishes, setDishes] = useState([]);

  const classStateNames = ["All"];
  data.map((item) => {
    classStateNames.push(item.class_name);
  });

  const handleChangeDay = (e) => {
    setDay(e.target.value);
  };

  const handleBack = () => {
    props.close();
  };
  const handleChangeInput = (event) => {
    setTitle(event.target.name);
  };
  const handleSelectClass = (event) => {
    setClassState(event.target.value);
  };
  const hanldeDeleteClass = (value) => {
    setClassState(classState.filter((classname) => classname !== value));
  };
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    props.getClasses();
  };

  const handleSelectDishes = (event) => {
    setDishes(event.target.value);
  };
  const hanldeDeleteDishes = (value) => {
    setDishes(dishes.filter((grade) => grade !== value));
  };

  // const dishesNames = ["Sada Dosa", "Masala Dosa", "Chicken Tikka Masala"];

  const dummyData = [
    {
      heading: "Sada Dosa",
      type: "Veg",
      image: MasalaDosaImg,
      desc: "Sada Dosa with Sambhar, Chutney and Bhaji.",
      price: "100",
    },
    {
      heading: "Chiken Tikka",
      type: "Non Veg",
      image: ChickenTikka,
      desc: "Sada Dosa with Sambhar, Chutney and Bhaji.",
      price: "100",
    },
    {
      heading: "Rava Dosa",
      type: "Veg",
      image: DosaImg,
      desc: "Sada Dosa with Sambhar, Chutney and Bhaji.",
      price: "150",
    },
    {
      heading: "Special Dosa",
      type: "Veg",
      image: MasalaDosaImg,
      desc: "Sada Dosa with Sambhar, Chutney and Bhaji.",
      price: "100",
    },
    {
      heading: "Sada Roti",
      type: "Veg",
      image: DosaImg,
      desc: "Sada Dosa with Sambhar, Chutney and Bhaji.",
      price: "300",
    },
    {
      heading: "Chicken Tikka Masala",
      type: "Non Veg",
      image: ChickenTikka,
      desc: "Sada Dosa with Sambhar, Chutney and Bhaji.",
      price: "200",
    },
  ];

  return (
    <div>
      <form className={classes.formStyle}>
        <Box className={`${classes.margin} ${classes.sideMargins}`} pt={4}>
          <div>
            <img
              src={BackIcon}
              alt="Back"
              className={classes.backImg}
              onClick={handleBack}
            />
            <Typography
              variant="h5"
              className={`${classes.themeColor} ${classes.titleText}`}
            >
              Create Menu
            </Typography>
          </div>
        </Box>
        {errMessage ? (
          <Box className={classes.margin} pt={2}>
            <div>
              <Typography className={`${classes.errorColor}`}>
                {errMessage}
              </Typography>
            </div>
          </Box>
        ) : (
          ""
        )}
        <Box className={`${classes.margin} ${classes.sideMargins}`}>
          <FormControl className={classes.fieldStyle}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={day}
              className={classes.menuItem}
              onChange={handleChangeDay}
            >
              <MenuItem value="Select Day">Select Day</MenuItem>
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Monday">Monday</MenuItem>
              <MenuItem value="Tuesday">Tuesday</MenuItem>
              <MenuItem value="Wednesday">Wednesday</MenuItem>
              <MenuItem value="Thursday">Thursday</MenuItem>
              <MenuItem value="Friday">Friday</MenuItem>
              <MenuItem value="Saturday">Saturday</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box className={`${classes.margin} ${classes.sideMargins}`}>
          <FormControl className={classes.fieldStyle}>
            <TextField
              id="title"
              name="title"
              className={classes.inputBorder}
              value={title}
              onChange={handleChangeInput}
              required={true}
              label="Title"
            />
          </FormControl>
        </Box>

        <Box className={`${classes.margin} ${classes.sideMargins}`}>
          <FormControl className={classes.fieldStyle}>
            <InputLabel>Show In</InputLabel>
            <Select
              labelId="demo-mutiple-chip-label"
              id="demo-mutiple-chip"
              value={classState}
              multiple
              onChange={handleSelectClass}
              input={<Input id="select-multiple-chip" />}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: "300px",
                  },
                },
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "center",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "center",
                },
                getContentAnchorEl: null,
              }}
              renderValue={(selected) => {
                return (
                  <div className={classes.chips}>
                    {selected.map((value) => (
                      <Chip
                        onDelete={() => hanldeDeleteClass(value)}
                        onMouseDown={(event) => {
                          event.stopPropagation();
                        }}
                        key={value}
                        label={value}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                );
              }}
            >
              {classStateNames.map((classname) => (
                <MenuItem key={classname} value={classname}>
                  {classname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box className={`${classes.margin} ${classes.sideMargins}`}>
          <FormControl className={classes.fieldStyle}>
            <Autocomplete
              multiple
              id="tags-standard"
              options={dummyData}
              getOptionLabel={(option) => option.heading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Select Dishes"
                />
              )}
              renderOption={(option) => (
                <div className={classes.renderOption}>
                  <div
                    className={classes.optionContainer}
                    // style={{ display: "flex", width: "80%" }}
                  >
                    <div style={{ width: "15%" }}>
                      <img width="40px" height="30px" src={option.image} />
                    </div>
                    <div className={classes.optionHeading}>
                      {option.heading}
                    </div>
                    <div
                      className={
                        option.type === "Veg"
                          ? `${classes.green} ${classes.heading}`
                          : `${classes.red} ${classes.heading}`
                      }
                    >
                      <div
                        className={
                          option.type === "Veg"
                            ? `${classes.circleGreen} ${classes.circle}`
                            : `${classes.circleRed} ${classes.circle}`
                        }
                      ></div>
                      {option.type}
                    </div>
                  </div>
                  <div className={classes.optionPrice}>
                    Price - ₹{option.price}/-
                  </div>
                </div>
              )}
            />
          </FormControl>
        </Box>
        <Box className={`${classes.margin} ${classes.sideMargins}`}>
          <Grid
            container
            className={classes.fieldStyle}
            direction="row-reverse"
          >
            <Grid item sm={8} xs={12} className={classes.publishBtns}>
              <Button
                id="publishLaterBtn"
                variant="contained"
                // onClick={handleOpenPubLater}
                className={`${
                  classes.fieldStyle
                } ${"publishBtn"} ${"publishLaterBtn"}`}
                disableElevation
              >
                Publish Later
              </Button>
              <Button
                id="publishBtn"
                variant="contained"
                className={`${classes.fieldStyle} ${"publishBtn"}`}
                color="primary"
                type="submit"
                disableElevation
              >
                Publish Now
              </Button>
            </Grid>
            <Grid item sm={4} xs={12} className={classes.textAlignLeft}>
              <br />
              <br />
            </Grid>

            <br />
            <br />
            <br />
          </Grid>
        </Box>
      </form>
    </div>
  );
}

const mapStateToProps = ({ Attendence }) => {
  const { classes = [], classesLoading } = Attendence;
  return {
    data: classes,
    loading: classesLoading,
  };
};

export default connect(mapStateToProps, { getClasses })(AddMenu);
