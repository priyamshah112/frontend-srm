import React, { useState, useEffect } from "react";
import "date-fns";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import BackIcon from "../../assets/images/Back.svg";
import RichTextEditor from "../../shared/richTextEditor";
import SelectCategory from "./components/selectCategory";
import { CircularProgress } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import {
  getSingleSupport,
  postSupport,
  updateSupport,
} from "../redux/actions/support.action";

const useStyle = makeStyles((theme) => ({
  Formcontainer: {
    width: "100%",
    backgroundColor: theme.palette.mainBackground,
    height: "100%",
    marign: "0",
    padding: "0",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: 0,
    },
  },
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
    paddingLeft: "10px",
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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: `#fff`,
  },
}));

let saveDataApi;

const CreateSupport = (props) => {
  const classes = useStyle();
  const history = useHistory();
  const { id } = useParams();

  console.log("CreateSupport id", id);

  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [errMessage, setError] = useState("");
  const [category, setCategory] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbar, setSnackbar] = useState({});
  const [ticketId, setTicketId] = useState(id);

  useEffect(() => {
    if (id) {
      getData(id);
    }
  }, []);

  // const initSupport = () => {
  //   props.postSupport({}, initiSuccess, () => {}, false);
  // };

  const initiSuccess = (d = {}) => {
    const { data = {} } = d;
    setTicketId(data.id);
  };

  const getData = () => {
    props.getSingleSupport(id, onSupportData);
  };

  const onSupportData = (d = {}) => {
    const { data = {} } = d;
    setSubject(data.subject || "");
    setDescription(data.description || "");
    setCategory(data.category_id || "");
  };

  useEffect(() => {
    setError("");
  }, [category, subject, description]);

  const handleChangeInput = (event) => {
    const value = event.target.value;
    setSubject(value);
  };

  const handleDescription = (data) => {
    setDescription(data);
  };

  const isValid = () => {
    if (!subject.trim()) {
      setError("Please Enter Valid Subject.");
      return false;
    }
    if (!category) {
      setError("Please Select Category");
      return false;
    }
    if (!description.trim()) {
      setError("Please Enter Description");
      return false;
    }
    return true;
  };

  useEffect(() => {
    saveDataApi = setInterval(() => {
      saveDetails();
    }, 10000);
    return () => clearInterval(saveDataApi);
  }, [subject, description, category]);

  const saveDetails = (status="draft", loading = false) => {
    const data = {
      subject: subject.trim(),
      category_id: category,
      description: description.trim(),
    };

    if(!category) return;

    if (status) {
      data.status = status;
    }

    if (ticketId) {
      props.updateSupport(
        data,
        ticketId,
        (d) => onSuccess(d, loading),
        (err) => onFail(err, loading),
        loading
      );
    } else if (!ticketId && !props.postLoading) {
      props.postSupport(
        data,
        (d) => onSuccess(d, loading),
        (err) => onFail(err, loading),
        loading
      );
    }
  };

  const submitForm = (event) => {
    event.preventDefault();

    if (!isValid()) {
      return;
    }
    clearInterval(saveDataApi);
    saveDetails("submitted", true);
    console.log("Form Submitted");
  };

  const onSuccess = (d = {}, loading) => {
    const { data = {} } = d;
    if (loading) {
      showSnackbar({ type: "success", message: "Support Ticket Submitted!" });
      goBack();
    } else if (!ticketId) {
      setTicketId(data.id);
    }
  };

  const onFail = (err = {}, loading) => {
    if (loading) showSnackbar({ message: err.message });
  };

  const showSnackbar = (d) => {
    setOpenSnackbar(true);
    setSnackbar(d);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const goBack = () => {
    saveDetails();
    history.replace("/support");
  };

  console.log("CreateSupport render", { ticketId, id, props });

  return (
    <>
      <div className={classes.Formcontainer}>
        <form className={classes.formStyle} onSubmit={submitForm}>
          <Box className={classes.margin} pt={2}>
            <div>
              <img
                src={BackIcon}
                alt="Back"
                className={classes.backImg}
                onClick={goBack}
              />
              <Typography
                variant="h5"
                className={`${classes.themeColor} ${classes.titleText}`}
              >
                Create Ticket
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
                id="subject"
                name="subject"
                label="Subject"
                className={classes.inputBorder}
                value={subject}
                onChange={handleChangeInput}
                required={true}
              />
            </FormControl>
          </Box>
          <Box className={classes.margin}>
            <FormControl className={classes.fieldStyle}>
              <InputLabel>Categories</InputLabel>
              <SelectCategory value={category} onChange={setCategory} />
            </FormControl>
            {props.categoryLoading && (
              <CircularProgress color="primary" size={30} />
            )}
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
                  id="publishBtn"
                  variant="contained"
                  className={`${classes.fieldStyle} ${"publishBtn"}`}
                  color="primary"
                  // onClick={handlePublish}
                  type="submit"
                  disableElevation
                >
                  Submit
                </Button>
              </Grid>
              <Grid item sm={4} xs={12} className={classes.textAlignLeft}>
                <Button
                  id="cancelBtn"
                  variant="contained"
                  onClick={() => {
                    history.replace("/support");
                  }}
                  className={`${
                    classes.fieldStyle
                  } ${"publishBtn"} ${"publishLaterBtn"}`}
                  disableElevation
                >
                  Cancel
                </Button>
                <Backdrop
                  open={props.postLoading || props.singleSupportLoading}
                  className={classes.backdrop}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
              </Grid>
            </Grid>
            <Snackbar
              open={openSnackbar}
              autoHideDuration={5000}
              onClose={handleSnackbarClose}
            >
              <Alert
                onClose={handleSnackbarClose}
                severity={snackbar.type || "error"}
              >
                {snackbar.message || "Something went wrong!! Please try again."}
              </Alert>
            </Snackbar>
          </Box>
          <br />
        </form>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </>
  );
};

const mapStateToProps = ({ auth, Supports }) => {
  const { token } = auth;
  const {
    categoryLoading,
    postSupportLoading,
    singleSupportLoading,
    updateSupportLoading,
  } = Supports;
  return {
    token,
    categoryLoading,
    postLoading: postSupportLoading || updateSupportLoading,
    singleSupportLoading,
  };
};

export default connect(mapStateToProps, {
  postSupport,
  getSingleSupport,
  updateSupport,
})(CreateSupport);
