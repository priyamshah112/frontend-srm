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

import Autocomplete from "@material-ui/lab/Autocomplete";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import BackIcon from "../../../assets/images/Back.svg";
import RichTextEditor from "../../../shared/richTextEditor";
import PublishLater from "../../newsAnnouncement/teacher/PublishLater";
import NumberFormatCustom from "../../../shared/NumberFormatCustom";
import NotificationService from "../NotificationService";
const useStyle = makeStyles((theme) => ({
  formStyle: {
    margin: "auto",
    width: "95%",
    backgroundColor: "white",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: "5px",
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
    width: "90%",
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
  optionContainer: {
    borderBottom: "1px solid #DCDCE0",
    width: "100%",
  },
  optionBody: {
    color: "rgba(0, 0, 0, 0.54)",
  },
}));

const CreateNotification = (props) => {
  const classes = useStyle();
  const history = useHistory();
  const { id } = useParams();

  const [openPubLater, setOpenPubLater] = useState(false);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [errMessage, setError] = useState("");
  const [category, setCategory] = useState("");
  const [payment, setPayment] = useState("");
  const [openPayment, setOpenPayment] = useState(false);
  const [classState, setClassState] = useState([]);
  const [openUserSearch, setOpenUserSearch] = useState(false);
  const [userList, setUserList] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const loadingUsers = openUserSearch && searchData.length === 0;
  const classStateNames = [
    "All Teacher",
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
        const response = await NotificationService.fetchDraftNotification(
          id,
          props.token
        );

        if (response.status === 200) {
          if (isFormLoading) {
            let tempClassCheckState = {};
            console.log(response);
            if (response.data.data.notification_lists.class_mapping) {
              if (response.data.data.notification_lists.class_mapping.parents) {
                setClassState(["All Parents", ...classState]);
              }
              if (
                response.data.data.notification_lists.class_mapping.teachers
              ) {
                setClassState(["All Teachers", ...classState]);
              }
              if (response.data.data.notification_lists.class_mapping.class) {
                response.data.data.notification_lists.class_mapping.class.forEach(
                  (classId) => {
                    setClassState((classState) => [
                      ...classState,
                      `Class ${classId}`,
                    ]);
                  }
                );
              }
            }
            setUserList([...response.data.data.users_list]);

            setDescription(
              response.data.data.notification_lists.data.main_content
                ? response.data.data.notification_lists.data.main_content
                : ""
            );
            setTitle(
              response.data.data.notification_lists.data.title
                ? response.data.data.notification_lists.data.title
                : ""
            );
            setSummary(
              response.data.data.notification_lists.data.summary
                ? response.data.data.notification_lists.data.summary
                : ""
            );

            setCategory(
              response.data.data.notification_lists.type
                ? response.data.data.notification_lists.type
                : ""
            );
          }
          setSearchData([...response.data.data.users_list]);
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
      if (userList.length !== 0) {
        classMapping.individual_users = [];
        userList.forEach((user) => {
          classMapping.individual_users.push(user.id || user.user_id);
        });
      }
      let payload = {
        type: category,
        data: {
          title,
          summary,
          main_content: description,
        },
        published_to: classMapping,
      };
      if (category === "payment") {
        payload = {
          ...payload,
          data: { title, summary, main_content: description, payment },
        };
      }
      const response = await NotificationService.saveNotification(
        id,
        payload,
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
  }, [title, description, summary, classState, category, userList, payment]);

  const styleOptions = (option) => {
    if (option.roles.length !== 0) {
      return (
        <div className={classes.optionContainer}>
          <Typography className={classes.optionTitle}>
            {`${option.firstname} ${option.lastname} - ${option.roles[0].name}`}
          </Typography>

          {option.user_classes ? (
            option.classes_data ? (
              <>
                <Typography className={classes.optionBody}>
                  {option.user_classes.classes_data.class_name}
                </Typography>
              </>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          <Typography className={classes.optionBody}>
            {option.username}
          </Typography>
        </div>
      );
    } else {
      return option.username;
    }
  };
  const handleChangeInput = (event) => {
    let name = event.target.name;
    if (name === "title") {
      setTitle(event.target.value);
    } else {
      setSummary(event.target.value);
    }
  };

  const handleSelectClass = (event) => {
    setClassState(event.target.value);
  };

  const handleDescription = (data) => {
    setDescription(data);
  };

  const handleCategoryChange = (event) => {
    if (event.target.value === "payment") {
      setOpenPayment(true);
    } else {
      setOpenPayment(false);
      setPayment("");
    }
    setCategory(event.target.value);
  };

  const handleChangePayment = (event) => {
    setPayment(event.target.value);
  };

  const handleSearchChange = (event, value) => {
    setUserList(value);
  };

  const callSearchAPI = async (event) => {
    if (event.target.value && event.target.value.length % 3 === 0) {
      try {
        const response = await NotificationService.searchUser(
          event.target.value,
          props.token
        );
        setSearchData([...searchData, ...response.data.data]);
      } catch (e) {
        console.log(e);
      }
    }
  };

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

  const publishData = async (publisedDate, status) => {
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

      if (userList.length !== 0) {
        classMapping.individual_users = [];
        userList.forEach((user) => {
          classMapping.individual_users.push(user.id);
        });
      }
      let payload = {
        type: category,
        data: {
          title,
          summary,
          main_content: description,
        },
        notify_status: status,
        published_date: publisedDate,

        published_to: classMapping,
      };
      if (category === "payment") {
        payload = {
          ...payload,
          data: { title, summary, main_content: description, payment },
        };
      }

      const response = await NotificationService.saveNotification(
        id,
        payload,
        props.token
      );
      if (response.status === 200) {
        console.log(response);
        history.replace("/notifications");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handlePublishLater = (laterEventDate) => {
    clearInterval(saveDataApi);

    const status = "active";

    publishData(laterEventDate.toISOString(), status);
  };
  const submitForm = async (event) => {
    event.preventDefault();
    clearInterval(saveDataApi);

    const status = "published";
    publishData(new Date().toISOString(), status);
  };

  return (
    <>
      <div>
        <form className={classes.formStyle} onSubmit={submitForm}>
          <Box className={`${classes.margin} ${classes.fieldStyle}`} pt={2}>
            <div>
              <img
                src={BackIcon}
                alt="Back"
                className={classes.backImg}
                onClick={() => {
                  saveDetails();
                  history.push("/notifications");
                }}
              />
              <Typography
                variant="h5"
                className={`${classes.themeColor} ${classes.titleText}`}
              >
                Create Notification
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
          <Box className={classes.margin}>
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
          <Box className={classes.margin}>
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
          <Box className={classes.margin}>
            <FormControl className={classes.fieldStyle}>
              <InputLabel>Categories</InputLabel>
              <Select
                labelId="demo-mutiple-chip-label"
                id="demo-mutiple-chip"
                value={category}
                onChange={handleCategoryChange}
                input={<Input id="select-multiple-chip" />}
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
              >
                {categoryValues.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          {openPayment ? (
            <Box className={classes.margin}>
              <FormControl className={classes.fieldStyle}>
                <TextField
                  id="payment"
                  name="payment"
                  label="Amount"
                  className={classes.inputBorder}
                  value={payment}
                  onChange={handleChangePayment}
                  required={true}
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                  }}
                />
              </FormControl>
            </Box>
          ) : (
            ""
          )}
          <Box className={classes.margin}>
            <FormControl className={classes.fieldStyle}>
              <Autocomplete
                multiple
                open={openUserSearch}
                onOpen={() => {
                  setOpenUserSearch(true);
                }}
                onClose={() => {
                  setOpenUserSearch(false);
                }}
                value={userList}
                id="tags-standard"
                options={searchData}
                loading={loadingUsers}
                onChange={handleSearchChange}
                onInputChange={callSearchAPI}
                getOptionLabel={(option) => option.username}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Search users"
                  />
                )}
                renderOption={(option) => styleOptions(option)}
                // renderGroup={(option) => option.username}
              />
            </FormControl>
          </Box>

          <Box className={classes.margin}>
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

          <Box className={classes.margin}>
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
          <Box className={classes.margin}>
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
      </div>
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

export default connect(mapStateToProps)(CreateNotification);
