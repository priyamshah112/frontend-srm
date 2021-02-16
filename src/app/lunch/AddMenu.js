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
import { lunchMenuGetByWeek } from "../redux/actions/attendence.action";
import { lunchMenuAll } from "../redux/actions/attendence.action";
import { lunchMenuGetByDish } from "../redux/actions/attendence.action";
import { lunchMenuPublishNow } from "../redux/actions/attendence.action";
// import { lunchMenuSearch } from "../redux/actions/attendence.action";
import HomeworkService from "../Assignment/HomeworkService";
import Input from "@material-ui/core/Input";
import Chip from "@material-ui/core/Chip";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Autocomplete from "@material-ui/lab/Autocomplete";
import PublishBtn from "./PublishBtn";
import PublishLater from "./PublishLtr";
import { SnackBarRef } from "../../SnackBar";
import { CircularProgress } from "@material-ui/core";
import BackdropLoader from "../common/ui/backdropLoader/BackdropLoader";
import { useLocation, useParams } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  formStyle: {
    margin: "20px",
    marginBottom: "85px",
    paddingTop: "20px",
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
    marginTop: "20px",
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
  headingMargin: {
    margin: "20px",
  },
}));

function AddMenu(props) {
  const IMAGE_BASE_URL = process.env.REACT_APP_BACKEND_IMAGE_URL;
  const classes = useStyle();
  const [errMessage, setError] = useState("");
  const [dishId, setDishId] = useState([]);
  const [title, setTitle] = useState("");
  const [day, setDay] = useState("Select Day");
  const [classState, setClassState] = useState([]);
  const [classesId, setClass] = useState([]);
  const [mappedClass, setMappedClass] = useState([]);
  const [classUpdate, setClassUpdate] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);
  const [publishLoading, setPublishLoading] = useState(false);
  const [classesLoading, setClassesLoading] = useState(false)
  const [update, setUpdate] = useState(false);
  let saveDataApi;

  const [loader, setLoader] = useState(false);
  const {
    menuId,
    edit,
    updateDay,
    updateTitle,
    updateClasses,
    updateDish,
  } = props;

  console.log("updateDayTitle", typeof updateClasses, updateClasses);
  const {
    data = [],
    class_id,
    school_id,
    dishListData,
    dishListLoading,
    weekday,
    weekdayLoading,
  } = props;

  console.log("class_id", class_id);

  const [open, setOpen] = useState(false);
  const [openPubLtr, setOpenPubLater] = useState(false);

  const lunch_menu_id = props.lunchMenuId;
  const location = useLocation();

  const handleUpdateClass = () => {
    console.log("handleUpdate");
    let array = [];
    let classes = [];
    updateClasses.map((item) => {
      if (classUpdate.data) {
        let findClassName = classUpdate.data.data.find(
          (classes) => classes.id == item
        );
        array.push(findClassName);
      }
    });
    setUpdateLoading(false);
    array.map((classname) => {
      classes.push(classname.class_name);
    });
    setClassState(classes);
  };

  useEffect(() => {
    if (classUpdate && edit) {
      handleUpdateClass();
    }
  }, [classUpdate]);

  useEffect(() => {
    const fetchClasses = async () => {
      setClassesLoading(true);
      const classesResponse = await HomeworkService.fetchClasses(props.token);
      setClassesLoading(false);
      setClassUpdate(classesResponse);
      let initialClassState = {};
      classesResponse.data.data.forEach((className) => {
        initialClassState[className.id] = className.class_name;
      });

      console.log("classesResponse", classesResponse);

      setClass({ ...initialClassState });
    };
    if (location.pathname === `/lunch` || location.pathname === `/menu`) {
      fetchClasses();
    }
  }, []);
  const classStateNames = ["All", ...Object.values(classesId)];

  console.log("classStateNames", classStateNames, Object.values(classesId));

  useEffect(() => {
    if (edit) {
      setDishId(updateDish);
      setTitle(updateTitle);
      setDay(updateDay);
      // setUpdateLoading(true)
    }
  }, []);

  const validForm = () => {
    if (day === "Select Day" && !title && !dishId[0] && !classState[0]) {
      setError("All field are mandatory ");
    } else if (day === "Select Day" && !title && !dishId[0]) {
      setError("All field are mandatory ");
    } else if (!title && !dishId[0] && !classState[0]) {
      setError("All field are mandatory ");
    } else if (day === "Select Day" && !title && !classState[0]) {
      setError("All field are mandatory ");
    } else if (day === "Select Day" && !dishId[0] && !classState[0]) {
      setError("All field are mandatory ");
    } else if (day === "Select Day" && !title) {
      setError("All field are mandatory ");
    } else if (!title && !dishId[0]) {
      setError("All field are mandatory ");
    } else if (!dishId[0] && !classState[0]) {
      setError("All field are mandatory ");
    } else if (day === "Select Day" && !classState[0]) {
      setError("All field are mandatory ");
    } else if (day === "Select Day") {
      setError("All field are mandatory ");
    } else if (!title) {
      setError("All field are mandatory ");
    } else if (!dishId[0]) {
      setError("All field are mandatory ");
    } else if (!classState[0]) {
      setError("All field are mandatory ");
    } else {
      return true;
    }
  };

  const handlePubNowOpen = (e) => {
    e.preventDefault();
    if (validForm()) {
      setOpen(true);
    }
  };
  const handlePubNowClose = () => {
    setOpen(false);
  };
  const handleOpenPubLater = () => {
    if (validForm()) {
      setOpenPubLater(true);
    }
  };
  const handleClosePubLater = () => {
    setOpenPubLater(false);
  };

  const handleChangeDay = (e) => {
    setDay(e.target.value);
    setError("");
  };

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

  const handleClassId = () => {
    let classMapping = { class: [] };
    let isSelectAll = classState.find((classname) => classname === "All");
    if (isSelectAll) {
      classMapping.class = [...Object.keys(classesId)];
      console.log("classMapping", classMapping.class);
    } else {
      classState.forEach((classnames) => {
        classMapping.class.push(
          parseInt(
            Object.keys(classesId).find(
              (classId) => classesId[classId] === classnames
            )
          )
        );
      });
    }
    setMappedClass(classMapping);
  };

  console.log("mappedClass", mappedClass);

  useEffect(() => {
    handleClassId();
  }, [classState]);

  const handleSubmit = (status, selectedDate) => {
    setPublishLoading(true);
    setOpenPubLater(false);
    let lunchDishId = [];
    dishId.map((item) => {
      lunchDishId.push(item.id);
    });
    const publishData = {
      name: title,
      lunch_dish_id: lunchDishId,
      weekday_id: day === "Select Day" ? "" : day,
      school_id: school_id,
      published_to: mappedClass,
      status: status,
      published_date: selectedDate ? selectedDate : time,
    };
    if (edit) {
      props.lunchMenuPublishNow(
        lunch_menu_id,
        publishData,
        handleSuccess,
        handleFail
      );
    } else {
      props.lunchMenuPublishNow(
        lunch_menu_id,
        publishData,
        handleSuccess,
        handleFail
      );
    }
  };

  const handleSuccessPublish = (isBack) => {
    if (isBack) {
      props.lunchMenuAll(school_id, class_id);
    }
  };

  const saveDetails = (isBack) => {
    if (day !== "Select Day" && title && classState) {
      let lunchDishId = [];
      dishId.map((item) => {
        lunchDishId.push(item.id);
      });
      const publishData = {
        name: title,
        lunch_dish_id: lunchDishId,
        weekday_id: day === "Select Day" ? "" : day,
        school_id: school_id,
        published_to: mappedClass,
        status: "draft",
      };
      props.lunchMenuPublishNow(lunch_menu_id, publishData, () =>
        handleSuccessPublish(isBack)
      );
    }
    if (isBack) {
      props.close();
    }
  };

  useEffect(() => {
    if (update) {
      saveDetails(false);
    }
  }, [update]);

  useEffect(() => {
    if (!dishListLoading && !weekdayLoading && !classesLoading) {
      saveDataApi = setInterval(() => {
        setUpdate(Math.random());
      }, 10000);
    }
    return () => clearInterval(saveDataApi);
  }, [day, title, classState, dishId]);

  const handleBack = () => {
    setLoader(true);
    saveDetails(true);
  };

  const handleChangeInput = (event) => {
    setTitle(event.target.value);
    setError("");
  };
  console.log(title);
  const handleSelectClass = (event) => {
    setClassState(event.target.value);
    setError("");
  };
  const hanldeDeleteClass = (value) => {
    setClassState(classState.filter((classname) => classname !== value));
  };

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    props.getClasses();
    props.lunchMenuGetByDish(school_id);
    props.lunchMenuGetByWeek();
  };

  const handleSuccess = () => {
    if (edit) {
      SnackBarRef.open("", true, "Menu updated successfully");
      props.close();
    } else {
      SnackBarRef.open("", true, "Menu created successfully");
      props.close();
    }
    handlePubNowClose();
    props.lunchMenuAll(school_id, class_id);
    setLoader(false);
    setPublishLoading(false);
  };
  const handleFail = (error) => {
    handlePubNowClose();
    console.log("error", error);
    if (error) {
      SnackBarRef.open("", false, error.message);
    }
    setPublishLoading(false);
  };

  const handlePublishNow = () => {
    setOpen(false);
    clearInterval(saveDataApi);
    handleSubmit("published");
  };

  const handlePubLater = (selectedDate) => {
    handleSubmit("active", selectedDate);
    clearInterval(saveDataApi);
  };

  const handleDishId = (option) => {
    let index = null;
    let optionId = option.id;
    dishId.map((p, i) => {
      if (p.id === optionId) {
        index = i;
      }
    });
    if (index != null) {
      dishId.splice(index, 1);
    } else {
      dishId.push(option);
    }
    setDishId(dishId);
  };
  const handleRemove = (option) => {
    let index = null;
    let optionId = option ? option.id : "";
    const array = [...dishId];
    array.map((p, i) => {
      let id = p ? p.id : "";
      if (id === optionId) {
        index = i;
      }
    });
    if (index != null) {
      array.splice(index, 1);
    }
    setDishId(array);
  };

  return (
    <>
      {dishListLoading || weekdayLoading || classesLoading ? (
        <BackdropLoader
          open={
            dishListLoading || weekdayLoading || classesLoading ? true : false
          }
        />
      ) : (
        <>
          {updateLoading ? (
            <BackdropLoader open={updateLoading} />
          ) : (
            <>
              {openPubLtr ? (
                <PublishLater
                  handlePublish={handlePubLater}
                  open={handleOpenPubLater}
                  handleClose={handleClosePubLater}
                />
              ) : (
                ""
              )}
              {open ? (
                <PublishBtn
                  handlePublishNow={handlePublishNow}
                  open={open}
                  close={handlePubNowClose}
                />
              ) : (
                ""
              )}
              <div className={classes.headingMargin}>
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
                  {edit ? "Update Menu" : "Create Menu"}
                </Typography>
              </div>
              {/* </Box> */}
              <form className={classes.formStyle}>
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
                      {weekdayLoading ? (
                        <MenuItem value="Select Day">Loading...</MenuItem>
                      ) : (
                        <MenuItem value="Select Day">Select Day</MenuItem>
                      )}
                      {weekday.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
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
                      label="Title"
                    />
                  </FormControl>
                </Box>

                <Box className={`${classes.margin} ${classes.sideMargins}`}>
                  <FormControl className={classes.fieldStyle}>
                    <InputLabel>Select classes</InputLabel>
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
                      options={dishListData}
                      defaultValue={updateDish}
                      value={dishId}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          label="Select Dishes"
                        />
                      )}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            {...getTagProps({ index })}
                            onDelete={() => handleRemove(option)}
                            label={option ? option.name : ""}
                          />
                        ))
                      }
                      renderOption={(option) => (
                        <div
                          onClick={() => handleDishId(option)}
                          className={classes.renderOption}
                        >
                          <div className={classes.optionContainer}>
                            <div style={{ width: "15%" }}>
                              <img
                                width="40px"
                                height="30px"
                                src={
                                  option.lunch_images[0]
                                    ? `${IMAGE_BASE_URL}/${option.lunch_images[0].img_path}/${option.lunch_images[0].img_name}`
                                    : ""
                                }
                              />
                            </div>
                            <div className={classes.optionHeading}>
                              {option.name}
                            </div>
                            <div
                              className={
                                option.status === "Veg"
                                  ? `${classes.green} ${classes.heading}`
                                  : `${classes.red} ${classes.heading}`
                              }
                            >
                              <div
                                className={
                                  option.status === "Veg"
                                    ? `${classes.circleGreen} ${classes.circle}`
                                    : `${classes.circleRed} ${classes.circle}`
                                }
                              ></div>
                              {option.status === "Veg" ? "Veg" : "Non Veg"}
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
                    {publishLoading ? (
                      <CircularProgress />
                    ) : (
                      <Grid item sm={8} xs={12} className={classes.publishBtns}>
                        <Button
                          id="publishLaterBtn"
                          variant="contained"
                          onClick={handleOpenPubLater}
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
                          onClick={handlePubNowOpen}
                          disableElevation
                        >
                          Publish Now
                        </Button>
                      </Grid>
                    )}
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
            </>
          )}
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  const {
    classes = [],
    lunchMenuGetByDish = [],
    lunchMenuGetByWeek = [],
    lunchMenuGetByDishLoading,
    lunchMenuGetByWeekLoading,
    lunchMenuPublishNowLoading,
  } = state.Attendence;
  return {
    dishListData: lunchMenuGetByDish,
    dishListLoading: lunchMenuGetByDishLoading,
    weekday: lunchMenuGetByWeek,
    weekdayLoading: lunchMenuGetByWeekLoading,
    publishLoading: lunchMenuPublishNowLoading,
    data: classes,
    token: state.auth.token,
    school_id: state.auth.userInfo.user_classes.school_id,
  };
};

export default connect(mapStateToProps, {
  getClasses,
  // lunchMenuSearch,
  lunchMenuGetByDish,
  lunchMenuGetByWeek,
  lunchMenuPublishNow,
  lunchMenuAll,
})(AddMenu);
