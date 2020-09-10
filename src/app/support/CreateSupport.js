import React, { useState, useEffect } from 'react';
import 'date-fns';
import { useHistory, useParams } from 'react-router-dom';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
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
  KeyboardDatePicker,
} from '@material-ui/pickers';

import BackIcon from '../../assets/images/Back.svg';
import RichTextEditor from '../../shared/richTextEditor';
import { set } from 'date-fns';

const useStyle = makeStyles((theme) => ({
  Formcontainer: {
    width: '100%',
    backgroundColor: theme.palette.mainBackground,
    height: '100%',
    marign: '0',
    padding: '0',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: 0,
    },
  },
  formStyle: {
    margin: 'auto',
    width: '95%',
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
    color: 'rgba(0, 0, 0, 0.54)',
    paddingTop: '6px',
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
  categoryClass: {
    '& span': {
      textAlign: 'left',
    },
  },
  categorySelect: {
    textAlign: 'left',
  },
  textAlignLeft: {
    textAlign: 'left',
    color: 'rgba(0, 0, 0, 0.54)',
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
  publishBtns: {
    textAlign: 'right',
    justifyContent: 'right',
  },
  margin: {
    marginTop: '30px',
    [theme.breakpoints.down('xs')]: {
      marginTop: '10px',
    },
    '& .publishBtn': {
      borderRadius: '3px',
      width: 'inherit',
      margin: 0,
      [theme.breakpoints.down('xs')]: {
        marginTop: '10px',
        marginRight: 0,
        width: '100%',
      },
    },
    '& .publishLaterBtn': {
      backgroundColor: `${theme.palette.common.white}`,
      border: `1px solid ${theme.palette.common.adornment}`,
      marginRight: '5px',
    },
  },
}));

const CreateSupport = (props) => {
  const classes = useStyle();
  const history = useHistory();
  const { id } = useParams();

  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [errMessage, setError] = useState('');
  const [category, setCategory] = useState('');

  const handleChangeInput = (event) => {
    setSubject(event.target.value);
  };

  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleDescription = (data) => {
    setDescription(data);
  };

  const submitForm = (event) => {
    event.preventDefault();
    console.log('Form Submitted');
  };

  return (
    <>
      <div className={classes.Formcontainer}>
        <form className={classes.formStyle} onSubmit={submitForm}>
          <Box className={classes.margin} pt={2}>
            <div>
              <img
                src={BackIcon}
                alt='Back'
                className={classes.backImg}
                onClick={() => {
                  history.replace('/support');
                }}
              />
              <Typography
                variant='h5'
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
            ''
          )}
          <Box className={classes.margin}>
            <FormControl className={classes.fieldStyle}>
              <TextField
                id='subject'
                name='subject'
                label='Subject'
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
              <Select
                labelId='Categories'
                id='demo-simple-select-helper'
                value={category}
                onChange={handleCategory}
                className={classes.categoryClass}
                classes={{ select: classes.categorySelect }}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
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
              direction='row-reverse'
            >
              <Grid item sm={8} xs={12} className={classes.publishBtns}>
                <Button
                  id='publishBtn'
                  variant='contained'
                  className={`${classes.fieldStyle} ${'publishBtn'}`}
                  color='primary'
                  // onClick={handlePublish}
                  type='submit'
                  disableElevation
                >
                  Submit
                </Button>
              </Grid>
              <Grid item sm={4} xs={12} className={classes.textAlignLeft}>
                <Button
                  id='cancelBtn'
                  variant='contained'
                  onClick={() => {
                    history.replace('/support');
                  }}
                  className={`${
                    classes.fieldStyle
                  } ${'publishBtn'} ${'publishLaterBtn'}`}
                  disableElevation
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
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

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(CreateSupport);
