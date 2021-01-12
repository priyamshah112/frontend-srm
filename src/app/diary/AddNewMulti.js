import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import DateFnsUtils from "@date-io/date-fns";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import EventIcon from "@material-ui/icons/Event";
import BackIcon from "../../assets/images/Back.svg";
// import RichTextEditor from '../../../shared/richTextEditor'
// import BackdropLoader from '../../common/ui/backdropLoader/BackdropLoader'
import { connect } from "react-redux";
import { getClasses } from "../redux/actions/attendence.action";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import { IconButton } from "@material-ui/core";

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

  sideMargins: {
    marginLeft: "20px",
    marginRight: "20px",
  },
  sideMarginright: {
    marginRight: "50px",
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

function AddNewMulti(props) {
  const classes = useStyle();
  const [errMessage, setError] = useState("");
  const [title, setTitle] = useState("");
  const [classState, setClassState] = useState([]);
  const [gradeState, setGradeState] = useState([]);
  const { data = [], classesLoading } = props;
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null);
  const classStateNames = ["Select All", "All Teachers"];

  const gradeStateNames = [
    "Kindergarden",
    "Primary School",
    "Secondary School",
  ];

  data.map((item) => {
    classStateNames.push(item.class_name);
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    props.getClasses();
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleDate = (date) => {
    setDate(date);
  };
  const handleBack = (event) => {
    // saveDetails(true)
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

  const handleSelectGrade = (event) => {
    setGradeState(event.target.value);
  };
  const hanldeDeleteGrade = (value) => {
    setGradeState(gradeState.filter((grade) => grade !== value));
  };

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
              Create New Diary Entry
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
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container className={classes.fieldStyle}>
              <Grid item xs={12}>
                <DateTimePicker
                  id="date"
                  label="Date"
                  variant="dialog"
                  minDate={new Date()}
                  format="yyyy/MM/dd hh:mm a"
                  value={date}
                  onChange={handleDate}
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
            <InputLabel>Grade</InputLabel>
            <Select
              labelId="demo-mutiple-chip-label"
              id="demo-mutiple-chip"
              value={gradeState}
              multiple
              onChange={handleSelectGrade}
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
                        onDelete={() => hanldeDeleteGrade(value)}
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
              {gradeStateNames.map((gradename) => (
                <MenuItem key={gradename} value={gradename}>
                  {gradename}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box className={`${classes.margin} ${classes.sideMargins}`}>
          <Grid className={classes.fieldStyle}>
            <Typography className={classes.textAlignLeft}>
              Description
            </Typography>
            <TextField
              className={classes.textArea}
              id="outlined-multiline-static"
              label=""
              multiline
              rows={5}
              placeholder="Description"
              value={description}
              onChange={handleDescription}
              variant="outlined"
            />
          </Grid>
        </Box>
        <Box className={`${classes.margin} ${classes.sideMargins}`}>
          <Grid
            container
            className={classes.fieldStyle}
            direction="row-reverse"
          >
            <Grid item sm={6} xs={12} className={classes.publishBtns}>
              
              <Button
                id="publishBtn"
                variant="contained"
                className={`${classes.fieldStyle} ${"publishBtn"}`}
                color="primary"
                type="submit"
                disableElevation
              >
                 Save
              </Button>
            </Grid>
            <Grid item sm={6} xs={12} className={classes.textAlignLeft}>
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

export default connect(mapStateToProps, { getClasses })(AddNewMulti);
