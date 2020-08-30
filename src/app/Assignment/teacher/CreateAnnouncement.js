import React, { useState, useEffect } from 'react';
import 'date-fns';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import DateFnsUtils from '@date-io/date-fns';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import BackIcon from '../../../assets/images/Back.svg';
import RichTextEditor from '../../../shared/richTextEditor';
import PublishLater from './PublishLater';
import HomeworkService from '../HomeworkService';
import { set } from 'date-fns';

const useStyle = makeStyles((theme) => ({
  formStyle: {
    margin: 'auto',
    width: '90%',
    backgroundColor: 'white',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: '5px',
  },
  backImg: {
    float: 'left',
    paddingLeft: '10px',
    cursor: 'pointer',
  },
  adornmentColor: {
    color: `${theme.palette.common.adornment}`,
  },
  themeColor: {
    color: `${theme.palette.common.deluge}`,
    padding: 0,
    margin: 0,
  },
  errorColor: {
    color: 'red',
  },
  fieldStyle: {
    width: '90%',
    margin: 'auto',
    '& .MuiInput-underline:before': {
      borderBottom: '2px solid #eaeaea',
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: '2px solid #7B72AF',
      transitionProperty: 'border-bottom-color',
      transitionDuration: '500ms',
      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  inputBorder: {
    height: '50px',
  },
  datePicker: {
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  paper: {
    display: 'flex',
    minHeight: '40px',
    backgroundColor: 'none',
    justifyContent: 'left',
    flexWrap: 'wrap',
    listStyle: 'none',
    border: `1px solid ${theme.palette.common.deluge}`,
    padding: theme.spacing(0.5),
    margin: 'auto',
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  paperBoxShadow: {
    boxShadow: `2px 2px 2px 0 ${theme.palette.common.deluge} `,
  },
  textAlignLeft: {
    textAlign: 'left',
  },
  contentCenter: {
    justifyContent: 'center',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },

  margin: {
    marginTop: '30px',
    [theme.breakpoints.down('xs')]: {
      marginTop: '10px',
    },
    '& .publishBtn': {
      borderRadius: '3px',
      width: 'inherit',
      // opacity: '0.5',
      marginBottom: '30px',
    },
    '& .publishLaterBtn': {
      backgroundColor: `${theme.palette.common.white}`,
      border: `1px solid ${theme.palette.common.adornment}`,
      marginRight: '5px',
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
  const [submissionDate, setSubmissionDate] = useState(new Date());
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [errMessage, setError] = useState('');
  const [category, setCategory] = useState('');
  const [checkState, setCheckState] = useState({
    ...props.classState,
    'All Teachers': false,
    'All Parents': false,
    'Select All': false,
  });
  const categoryValues = [...Object.keys(props.categories)];
  const checkStateLength = [
    ...Array(Object.keys(props.classState).length).keys(),
  ];

  const [chipData, setChipData] = useState([]);
  const selectAllObj = {
    'Class 1': true,
    'Class 2': true,
    'Class 3': true,
    'Class 4': true,
    'Class 5': true,
    'Class 6': true,
    'Class 7': true,
    'Class 8': true,
    'Class 9': true,
    'Class 10': true,
    'All Teachers': true,
    'All Parents': true,
    'Select All': true,
  };

  const disSelectAllObj = {
    'Class 1': false,
    'Class 2': false,
    'Class 3': false,
    'Class 4': false,
    'Class 5': false,
    'Class 6': false,
    'Class 7': false,
    'Class 8': false,
    'Class 9': false,
    'Class 10': false,
    'All Teachers': false,
    'All Parents': false,
    'Select All': false,
  };
  let saveDataApi;
  useEffect(() => {
    let isFormLoading = true;
    // give first api call to create

    // api call to save
    const fetchDraft = async () => {
      try {
        const response = await HomeworkService.fetchDraftAnnouncement(
          { id },
          props.token
        );
        if (response.status === 200) {
          if (isFormLoading) {
            let tempClassCheckState = {};
            if (response.data.data.class_mapping) {
              if (response.data.data.class_mapping.parents) {
                tempClassCheckState['All Parents'] = true;
                setChipData([...chipData, 'All Parents']);
              }
              if (response.data.data.class_mapping.teachers) {
                tempClassCheckState['All Teachers'] = true;
                setChipData([...chipData, 'All Teachers']);
              }
              response.data.data.class_mapping.class.forEach((classId) => {
                tempClassCheckState[`Class ${classId}`] = true;

                setChipData((chipData) => [...chipData, `Class ${classId}`]);
              });
            }
            setCheckState({ ...checkState, ...tempClassCheckState });
            setDescription(
              response.data.data.main_content
                ? response.data.data.main_content
                : ''
            );
            setTitle(response.data.data.title ? response.data.data.title : '');
            setEventDate(response.data.data.submission_date);
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
  useEffect(() => {
    const saveDetails = async () => {
      try {
        let classMapping = { class: [] };
        for (var state in checkState) {
          if (
            state !== 'All Parents' &&
            state !== 'All Teachers' &&
            state !== 'Select All'
          )
            if (checkState[state] === true) {
              console.log('here', state);
              classMapping.class.push(parseInt(state.split(' ')[1]));
            }
        }
        if (checkState['All Parents'] === true) {
          classMapping['parents'] = true;
        }
        if (checkState['All Teachers'] === true) {
          classMapping['teachers'] = true;
        }

        const response = await HomeworkService.saveAnnouncement(
          { id },
          {
            title,
            submission_date: eventDate,
            main_content: description,
            published_to: classMapping,
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
    saveDataApi = setInterval(() => {
      // console.log(1);
      saveDetails(title, eventDate, description, checkState);
    }, 10000);
    return () => clearInterval(saveDataApi);
  }, [title, eventDate, description, checkState]);

  const handleChangeInput = (event) => {
    let name = event.target.name;
    if (name === 'title') {
      setTitle(event.target.value);
    } else {
      setSummary(event.target.value);
    }
  };

  const handleEventDate = (date) => {
    setEventDate(date);
  };

  const handleCheckbox = (event) => {
    let name = event.target.name;
    if (name === 'Select All') {
      if (event.target.checked) {
        setCheckState(selectAllObj);
        setChipData(Object.keys(checkState));
      } else {
        setCheckState(disSelectAllObj);
        setChipData([]);
      }
    } else {
      setCheckState({ ...checkState, [name]: event.target.checked });

      if (event.target.checked) {
        setChipData([...chipData, name]);
      } else {
        setChipData(chipData.filter((e) => e !== name));
      }
    }
  };

  const handleDescription = (data) => {
    setDescription(data);
  };
  const handleCategoryChange = (event) => {
    console.log(event.target.value);
    setCategory(event.target.value);
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
    if (chipData.length === 0 || title === '') {
      setError('Fill All Data !');
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
      for (var state in checkState) {
        if (
          state !== 'All Parents' &&
          state !== 'All Teachers' &&
          state !== 'Select All'
        )
          if (checkState[state] === true) {
            classMapping.class.push(parseInt(state.split(' ')[1]));
          }
      }
      if (checkState['All Parents'] === true) {
        classMapping['parents'] = true;
      }
      if (checkState['All Teachers'] === true) {
        classMapping['teachers'] = true;
      }

      // console.log(classMapping, title, summary, eventDate, description);
      const response = await HomeworkService.publishAnnouncement(
        { id },
        {
          title: title,
          main_content: description,
          status: status,
          published_to: classMapping,
          published_date: publisedDate,
          submission_date: submissionDate.toISOString(),
        },
        props.token
      );
      console.log(response);
      if (response.status === 200) {
        console.log('Publish');
        console.log(response);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handlesubmissionDate = (date) => {
    console.log('Submission Date', date);
    setSubmissionDate(date);
  };

  const handlePublishLater = (laterEventDate) => {
    console.log(laterEventDate.toISOString());
    const status = 'active';
    publishData(laterEventDate.toISOString(), status);
    history.goBack();
  };
  const submitForm = async (event) => {
    event.preventDefault();
    clearInterval(saveDataApi);
    const status = 'published';
    publishData(new Date().toISOString(), status);
    history.goBack();
  };

  return (
    <>
      <div>
        <form className={classes.formStyle} onSubmit={submitForm}>
          <Box className={classes.margin} pt={2}>
            <div>
              <img
                src={BackIcon}
                alt='Back'
                className={classes.backImg}
                onClick={() => {
                  history.push('/assignment');
                }}
              />
              <Typography
                variant='h5'
                className={`${classes.themeColor} ${classes.titleText}`}
              >
                Create Homework
              </Typography>
            </div>
          </Box>
          <Box className={classes.margin} pt={2}>
            <div>
              <Typography className={`${classes.errorColor}`}>
                {errMessage}
              </Typography>
            </div>
          </Box>
          <Box className={classes.margin}>
            <FormControl className={classes.fieldStyle}>
              <Input
                id='title'
                name='title'
                className={classes.inputBorder}
                value={title}
                onChange={handleChangeInput}
                required={true}
                startAdornment={
                  <InputAdornment position='start'>
                    <Typography className={classes.adornmentColor}>
                      Title
                    </Typography>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
          <Box className={classes.margin}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container className={classes.fieldStyle}>
                <Grid item sm={6} xs={12} className={classes.fieldStyle}>
                  <KeyboardDateTimePicker
                    id='eventDate'
                    label='Submission Date'
                    variant='inline'
                    minDate={new Date()}
                    format='yyyy/MM/dd hh:mm a'
                    value={submissionDate}
                    onChange={handlesubmissionDate}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                    className={classes.datePicker}
                  />
                </Grid>
              </Grid>
            </MuiPickersUtilsProvider>
          </Box>
          <Box className={classes.margin}>
            <Box
              component='ul'
              className={`${classes.paper} ${classes.fieldStyle}`}
            >
              <Typography variant='h6' p={3} className={classes.adornmentColor}>
                Show in:
              </Typography>
              {chipData.map((data, index) => {
                return (
                  <li key={index}>
                    <Chip label={data} className={classes.chip} />
                  </li>
                );
              })}
            </Box>
          </Box>
          <Box mt={1}>
            <Paper
              component='ul'
              className={`${classes.paper} ${classes.paperBoxShadow} ${classes.fieldStyle}`}
            >
              <FormControl>
                <FormGroup row className={classes.contentCenter}>
                  {checkStateLength.map((value, index) => {
                    return (
                      <FormControlLabel
                        key={value}
                        control={
                          <Checkbox
                            checked={checkState[`Class ${value + 1}`]}
                            onChange={handleCheckbox}
                            name={`Class ${value + 1}`}
                            color='primary'
                          />
                        }
                        label={`Class ${value + 1}`}
                      />
                    );
                  })}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checkState['All Teachers']}
                        onChange={handleCheckbox}
                        name='All Teachers'
                        color='primary'
                      />
                    }
                    label='All Teachers'
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checkState['All Parents']}
                        onChange={handleCheckbox}
                        name='All Parents'
                        color='primary'
                      />
                    }
                    label='All Parents'
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checkState['Select All']}
                        onChange={handleCheckbox}
                        name='Select All'
                        color='primary'
                      />
                    }
                    label='Select All'
                  />
                </FormGroup>
              </FormControl>
            </Paper>
          </Box>
          <Box className={classes.margin}>
            <Grid className={classes.fieldStyle}>
              <Typography variant='h6' className={classes.textAlignLeft}>
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
            <Grid container spacing={3} className={classes.fieldStyle}>
              <Grid item xs={6} className={classes.textAlignLeft}>
                <Button
                  id='cancelBtn'
                  variant='contained'
                  onClick={() => {
                    history.push('/assignment');
                  }}
                  className={`${
                    classes.fieldStyle
                  } ${'publishBtn'} ${'publishLaterBtn'}`}
                  disableElevation
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={6}>
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
              </Grid>
            </Grid>
          </Box>
        </form>
      </div>
      {openPubLater ? (
        <PublishLater
          open={openPubLater}
          handleClose={handleClosePubLater}
          handlePublishLater={handlePublishLater}
        />
      ) : (
        ''
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
