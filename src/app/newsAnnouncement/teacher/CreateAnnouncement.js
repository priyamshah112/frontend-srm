import React, { useState, useEffect } from "react";
import "date-fns";
import { useHistory, useParams } from "react-router-dom";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import DateFnsUtils from "@date-io/date-fns";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  DatePicker,
} from "@material-ui/pickers";
import EventIcon from "@material-ui/icons/Event";
import { IconButton } from "@material-ui/core";

import BackIcon from "../../../assets/images/Back.svg";
import RichTextEditor from "../../../shared/richTextEditor";
import PublishLater from "./PublishLater";
import AnnouncementService from "../AnnouncementService";
import { set } from "date-fns";

const useStyle = makeStyles((theme) => ({
  formStyle: {
    margin: "auto",
    width: "95%",
    backgroundColor: "white",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: "5px",
  },
  sideMargins: {
    marginLeft: "20px",
    marginRight: "20px",
  },
  backImg: {
    float: "left",
    transform: "translateY(7px)",
    cursor: "pointer",
  },
  adornmentColor: {
    color: "rgba(0, 0, 0, 0.54)",
    paddingTop: "6px",
  },
  themeColor: {
    color: `${theme.palette.common.deluge}`,
    padding: 0,
    margin: 0,
  },
  errorColor: {
    color: "red",
  },
  fieldStyle: {
    width: "100%",
    margin: "auto",
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
  sideMargins: {
    marginLeft: "20px",
    marginRight: "20px",
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
    border: "1px solid #eaeaea",
    padding: theme.spacing(0.5),
    textAlign: "left",
  },
  paperShowIn: {
    display: "flex",
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
    justifyContent: "center",
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
}));

const CreateAnnouncement = (props) => {
  const classes = useStyle();
  const history = useHistory();
  const { id } = useParams();

  const [scheduler, setScheduler] = useState(false);
  const [openPubLater, setOpenPubLater] = useState(false);
  const [eventDate, setEventDate] = useState(null);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [errMessage, setError] = useState("");
  const [category, setCategory] = useState("");
  const [classState, setClassState] = useState([]);
  const [chipData, setChipData] = useState([]);

  const classStateNames = [
    "All Teachers",
    "All Parents",
    "Select All",
    ...Object.keys(props.classState),
  ];

  const categoryValues = [...Object.values(props.categories)];

  let saveDataApi;
  useEffect(() => {
    let isFormLoading = true;
    // give first api call to create

    // api call to save
    const fetchDraft = async () => {
      try {
        const response = await AnnouncementService.fetchDraftAnnouncement(
          { id },
          props.token
        );
        if (response.status === 200) {
          if (isFormLoading) {
            let tempClassCheckState = [];
            if (response.data.data.class_mapping) {
              if (response.data.data.class_mapping.parents) {
                console.log("parents");
                tempClassCheckState.push("All Parents");
              }
              if (response.data.data.class_mapping.teachers) {
                tempClassCheckState.push("All Teachers");
              }
              response.data.data.class_mapping.class.forEach((classId) => {
                tempClassCheckState.push(`Class ${classId}`);
              });
            }
            setClassState([...tempClassCheckState]);
            setDescription(
              response.data.data.main_content
                ? response.data.data.main_content
                : ""
            );
            setTitle(response.data.data.title ? response.data.data.title : "");
            setSummary(
              response.data.data.summary ? response.data.data.summary : ""
            );
            setEventDate(response.data.data.event_date);
            setCategory(
              props.categories[response.data.data.category_id]
                ? props.categories[response.data.data.category_id]
                : ""
            );
          }
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchDraft();
    return () => {
      isFormLoading = false;
      // clearInterval(saveDataApi);
    };
  }, []);
  const saveDetails = async () => {
    try {
      let classMapping = { class: [] };

      let isSelectAll = classState.find(
        (classname) => classname === "Select All"
      );
      if (isSelectAll) {
        classMapping["teachers"] = true;
        classMapping["paresnts"] = true;
        classMapping.class = [...Object.values(props.classState)];
      } else {
        console.log(classState);
        classState.forEach((classnames) => {
          if (classnames === "All Parents") {
            classMapping["parents"] = true;
          } else if (classnames === "All Teachers") {
            classMapping["teachers"] = true;
          } else {
            classMapping.class.push(props.classState[classnames]);
          }
        });
      }

      const response = await AnnouncementService.saveAnnouncement(
        { id },
        {
          title,
          summary,
          event_date: eventDate,
          main_content: description,
          published_to: classMapping,
          category_id: parseInt(
            Object.keys(props.categories).find(
              (category_id) => props.categories[category_id] === category
            )
          ),
        },
        props.token
      );

      if (response.status === 200) {
        console.log(response);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    saveDataApi = setInterval(() => {
      // console.log(1);
      saveDetails();
    }, 10000);
    return () => clearInterval(saveDataApi);
  }, [title, eventDate, description, summary, classState, category]);

  const handleChangeInput = (event) => {
    let name = event.target.name;
    if (name === "title") {
      setTitle(event.target.value);
    } else {
      setSummary(event.target.value);
    }
  };

  const handleEventDate = (date) => {
    setEventDate(date);
  };
  const handleSelectClass = (event) => {
    setClassState(event.target.value);
  };
  const hanldeDeleteClass = (value) => {
    setClassState(classState.filter((classname) => classname !== value));
  };

  // const handleCheckbox = (event) => {
  //   let name = event.target.name;
  //   if (name === "Select All") {
  //     if (event.target.checked) {
  //       setCheckState(selectAllObj);
  //       setChipData(Object.keys(checkState));
  //     } else {
  //       setCheckState(disSelectAllObj);
  //       setChipData([]);
  //     }
  //   } else {
  //     setCheckState({ ...checkState, [name]: event.target.checked });

  //     if (event.target.checked) {
  //       setChipData([...chipData, name]);
  //     } else {
  //       setChipData(chipData.filter((e) => e !== name));
  //     }
  //   }
  // };

  const handleDescription = (data) => {
    setDescription(data);
  };
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  // const handleClassChipDelete = (data) => {
  //   const newChipData = chipData.filter((chip) => chip !== data);
  //   setChipData([...newChipData]);
  //   setCheckState({ ...checkState, [data]: false });
  // };

  // const handlePublish = (event) => {
  //   if (
  //     chipData.length === 0 ||
  //     title === "" ||
  //     summary === "" ||
  //     eventDate === null
  //   ) {
  //     setError("Fill All Data !");
  //   } else {
  //     console.log("Submit Publish Now");
  //   }
  // };

  const handleOpenPubLater = (event) => {
    if (classState.length === 0 || title === "" || summary === "") {
      setError("Fill All Data !");
    } else {
      setOpenPubLater(true);
    }
  };

  const handleClosePubLater = () => {
    setOpenPubLater(false);
  };

  const publishData = async (publisedDate, status, mediaURL) => {
    try {
      let classMapping = { class: [] };
      let isSelectAll = classState.find(
        (classname) => classname === "Select All"
      );
      if (isSelectAll) {
        classMapping["teachers"] = true;
        classMapping["paresnts"] = true;
        classMapping.class = [...Object.values(props.classState)];
      } else {
        classState.forEach((classnames) => {
          if (classnames === "All Parents") {
            classMapping["parents"] = true;
          } else if (classnames === "All Teachers") {
            classMapping["teachers"] = true;
          } else {
            classMapping.class.push(props.classState[classnames]);
          }
        });
      }

      // console.log(classMapping, title, summary, eventDate, description);

      const response = await AnnouncementService.publishAnnouncement(
        { id },
        {
          title,
          summary,
          status,
          event_date: eventDate,
          main_content: description,
          published_date: publisedDate,
          published_to: classMapping,
          media_url: mediaURL,
          category_id: parseInt(
            Object.keys(props.categories).find(
              (category_id) => props.categories[category_id] === category
            )
          ),
        },
        props.token
      );
      if (response.status === 200) {
        history.replace("/news");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handlePublishLater = (laterEventDate) => {
    clearInterval(saveDataApi);
    let mediaUrlContainer = document.createElement("div");
    mediaUrlContainer.innerHTML = description;
    let mediaURL = null;
    if (mediaUrlContainer.getElementsByTagName("img").length > 0) {
      mediaURL = mediaUrlContainer.getElementsByTagName("img")[0].src;
    }

    const status = "active";

    publishData(laterEventDate.toISOString(), status, mediaURL);
  };
  const submitForm = async (event) => {
    event.preventDefault();
    clearInterval(saveDataApi);
    let mediaUrlContainer = document.createElement("div");
    mediaUrlContainer.innerHTML = description;
    let mediaURL = null;
    if (mediaUrlContainer.getElementsByTagName("img").length > 0) {
      mediaURL = mediaUrlContainer.getElementsByTagName("img")[0].src;
    }

    const status = "published";

    publishData(new Date().toISOString(), status, mediaURL);
  };

  return (
    <>
      <form className={classes.formStyle} onSubmit={submitForm}>
        <Box className={`${classes.margin} ${classes.sideMargins}`} pt={4}>
          <div>
            <img
              src={BackIcon}
              alt="Back"
              className={classes.backImg}
              onClick={() => {
                saveDetails();
                history.push("/news");
              }}
            />
            <Typography
              variant="h5"
              className={`${classes.themeColor} ${classes.titleText}`}
            >
              Create Announcement
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
            <TextField
              label="Title"
              id="title"
              name="title"
              className={classes.inputBorder}
              value={title}
              onChange={handleChangeInput}
              required={true}
            />
          </FormControl>
        </Box>
        <Box className={`${classes.margin} ${classes.sideMargins}`}>
          <FormControl className={classes.fieldStyle}>
            <TextField
              id="summary"
              name="summary"
              label="Summary"
              className={classes.inputBorder}
              value={summary}
              onChange={handleChangeInput}
              required={true}
            />
          </FormControl>
        </Box>
        <Box className={`${classes.margin} ${classes.sideMargins}`}>
          <FormControl className={classes.fieldStyle}>
            <InputLabel>Categories</InputLabel>
            <Select
              labelId="demo-mutiple-chip-label"
              id="demo-mutiple-chip"
              value={category}
              required
              onChange={handleCategoryChange}
              input={<Input id="select-multiple-chip" />}
              MenuProps={{
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
                    <Chip
                      key={selected}
                      label={selected}
                      className={classes.chip}
                    />
                  </div>
                );
              }}
            >
              {categoryValues.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
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
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container className={classes.fieldStyle}>
              <Grid item xs={12}>
                <DatePicker
                  id="eventDate"
                  label="Event Date"
                  variant="dialog"
                  minDate={new Date()}
                  format="MM/dd/yyyy"
                  value={eventDate}
                  onChange={handleEventDate}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <EventIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  className={classes.datePicker}
                />
              </Grid>
            </Grid>
          </MuiPickersUtilsProvider>
        </Box>
        <Box className={`${classes.margin} ${classes.sideMargins}`}>
          <Grid className={classes.fieldStyle}>
            <Typography className={classes.textAlignLeft}>
              Description
            </Typography>
            <RichTextEditor
              handleDescription={handleDescription}
              value={description}
              token={props.token}
            />
          </Grid>
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
                // onClick={handlePublish}
                type="submit"
                disableElevation
              >
                Publish Now
              </Button>
            </Grid>
            <Grid item sm={4} xs={12} className={classes.textAlignLeft}>
              <Button
                id="cancelBtn"
                variant="contained"
                onClick={() => {
                  history.push("/news");
                }}
                className={`${
                  classes.fieldStyle
                } ${"publishBtn"} ${"publishLaterBtn"}`}
                disableElevation
              >
                Cancel
              </Button>
            </Grid>
            <br />
            <br />
            <br />
            {/* <Grid item sm={6} xs={12} className={classes.publishBtns}>
                <Button
                  id='publishLaterBtn'
                  variant='contained'
                  onClick={handleOpenPubLater}
                  className={`${
                    classes.fieldStyle
                  } ${'publishBtn'} ${'publishLaterBtn'}`}
                  disableElevation
                >
                  Publish Later
                </Button>
                <Button
                  id='publishBtn'
                  variant='contained'
                  className={`${classes.fieldStyle} ${'publishBtn'}`}
                  color='primary'
                  // onClick={handlePublish}
                  type='submit'
                  disableElevation
                >
                  Publish Now
                </Button>
              </Grid> */}
          </Grid>
        </Box>
      </form>

      <br />
      <br />
      {openPubLater ? (
        <PublishLater
          open={openPubLater}
          handleClose={handleClosePubLater}
          handlePublishLater={handlePublishLater}
        />
      ) : (
        ""
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(CreateAnnouncement);
