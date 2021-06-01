import React, { useState, useEffect } from 'react'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import BackIcon from '../../../assets/images/Back.svg'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import EventIcon from '@material-ui/icons/Event'
import InputAdornment from '@material-ui/core/InputAdornment'
import DateFnsUtils from '@date-io/date-fns'
import { CircularProgress, IconButton } from '@material-ui/core'
import { useHistory, useParams, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import { SnackBarRef } from '../../../SnackBar'
import * as moment from 'moment'
import { putNews } from '../../redux/actions/report.action'
import { TitleSharp } from '@material-ui/icons'

const useStyle = makeStyles((theme) => ({
  errorColor: {
    color: 'red',
    textAlign: 'center',
    padding: '10px 0',
  },
  formStyle: {
    margin: '20px',
    backgroundColor: 'white',
    justifyContent: 'center',
    textAlign: 'right',
    borderRadius: '5px',
    paddingTop: '20px',
  },
  formDiv: {
    height: '100vh',
    overflow: 'auto',
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
      width: 130,
      height: 40,
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
  sideMargins: {
    marginLeft: '20px',
    marginRight: '20px',
  },
  sideMarginsFromDate: {
    marginLeft: '20px',
    // marginRight: '20px',
  },
  backImg: {
    float: 'left',
    // transform: 'translateY(7px)',
    cursor: 'pointer',
    position: 'absolute',
    left: '20px',
  },
  themeColor: {
    color: `${theme.palette.common.deluge}`,
    padding: 0,
    margin: 0,
    fontFamily: 'Avenir',
    fontSize: 14,
  },
  titleText: {
    fontFamily: 'Avenir Medium',
    fontize: 18,
    color: '#1C1C1E',
  },
  inputBorder: {
    height: '50px',
  },
  fieldStyle: {
    width: '100%',
    margin: 'auto',
    fontFamily: 'Avenir Book',
    fontSize: ' 1rem',
    '& .MuiInput-underline:before': {
      borderBottom: '2px solid #eaeaea',
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: '2px solid #7B72AF',
      transitionProperty: 'border-bottom-color',
      transitionDuration: '500ms',
      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    '& .MuiFormLabel-root': {
      fontFamily: 'Avenir Book',
      fontSize: 14,
      color: '#AEAEB2',
    },
  },
  datePicker: {
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  textAlignLeft: {
    textAlign: 'left',
    color: 'rgba(0, 0, 0, 0.54)',
  },
  textArea: {
    width: '100%',
    border: '1px solid rgb(200,200,200',
  },
  radioBtn: {
    display: 'flex',
    flexDirection: 'row',
    fontFamily: 'Avenir',
    fontSize: 14,
  },
  headingDiv: {
    margin: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  publishBtns: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& .MuiButton-root': {
      textTransform: 'capitalize',
    },
  },
  renderOption: {
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: "space-between",
    width: '100%',
    paddingTop: '13px',
    paddingBottom: '8px',
  },
  optionContainer: {
    display: 'flex',
  },
  dateContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  dateWidth: {
    width: '50%',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}))

function CreateNews(props) {
  const classes = useStyle()
  const history = useHistory()
  const location = useLocation()
  const { id } = useParams()
  const [title, setTitle] = useState('')
  const [fromDate, setFromDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [error, setError] = useState(false)
  const token = localStorage.getItem('srmToken')
  const { loading, school_id } = props

  const validForm = () => {
    if (!TitleSharp) {
      setError(`A Mandatory field isn't filled!`)
    } else if (!fromDate) {
      setError(`A Mandatory field isn't filled!`)
    } else if (!endDate) {
      setError(`A Mandatory field isn't filled!`)
    } else if (endDate.getTime() < fromDate.getTime()) {
      setError('End date should be greater then from date')
    } else {
      return true
    }
  }

  const handleChangeTitle = (e) => {
    setTitle(e.target.value)
    setError(false)
  }
  const handleFromDate = (date) => {
    setFromDate(date)
    setError(false)
  }
  const handleEndDate = (date) => {
    setEndDate(date)
    setError(false)
  }

  // handle save
  const onSuccess = () => {
    SnackBarRef.open('', true, 'News report created successfully')
    history.push(`/news-report`)
  }
  const onFail = (error) => {
    console.log('error', error)
    if (error) {
      SnackBarRef.open('', false, error.message)
    }
  }
  const handleSave = (event) => {
    event.preventDefault()
    if (validForm()) {
      let putData = {
        title: title,
        from_date: moment(fromDate).format('YYYY-MM-DD'),
        to_date: moment(endDate).format('YYYY-MM-DD'),
        type: 'news',
        school_id: school_id,
      }
      props.putNews(id, putData, onSuccess, onFail)
    }
  }

  return (
    <div className={classes.formDiv}>
      <div
        className={classes.headingDiv}
        style={{
          margin: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={BackIcon}
          alt="Back"
          className={classes.backImg}
          onClick={() => {
            history.goBack()
          }}
        />
        <Typography
          variant="h5"
          className={`${classes.themeColor} ${classes.titleText}`}
          style={{ fontSize: 18 }}
        >
          Create News Report
        </Typography>
      </div>
      <form className={classes.formStyle}>
        {error ? (
          <div>
            <Typography className={`${classes.errorColor}`}>{error}</Typography>
          </div>
        ) : (
          ''
        )}
        <Box className={` ${classes.sideMargins}`}>
          <FormControl className={classes.fieldStyle}>
            <TextField
              id="title"
              name="title"
              className={classes.inputBorder}
              value={title}
              onChange={handleChangeTitle}
              required={true}
              label="Title"
            />
          </FormControl>
        </Box>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box
            style={{ width: '50%' }}
            className={`${classes.margin} ${classes.sideMarginsFromDate}`}
          >
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container className={classes.fieldStyle}>
                <Grid item xs={12}>
                  <DatePicker
                    id="fromDate"
                    label="From Date"
                    variant="dialog"
                    // minDate={new Date()}
                    maxDate={new Date()}
                    format="MM/dd/yyyy"
                    value={fromDate}
                    onChange={handleFromDate}
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
          <Box
            style={{ width: '50%' }}
            className={`${classes.margin} ${classes.sideMargins}`}
          >
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container className={classes.fieldStyle}>
                <Grid item xs={12}>
                  <DatePicker
                    id="endDate"
                    label="To Date"
                    variant="dialog"
                    // minDate={new Date()}
                    maxDate={new Date()}
                    format="MM/dd/yyyy"
                    value={endDate}
                    onChange={handleEndDate}
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
        </div>
        <Box className={`${classes.margin} ${classes.sideMargins}`}>
          <Grid
            container
            className={classes.fieldStyle}
            direction="row-reverse"
          >
            <Grid item sm={3} xs={12} className={classes.publishBtns}>
              {loading ? (
                <CircularProgress />
              ) : (
                <Button
                  style={{ textTransform: 'capitalize' }}
                  id="publishBtn"
                  variant="contained"
                  className={`${classes.fieldStyle} ${'publishBtn'}`}
                  color="primary"
                  type="submit"
                  onClick={handleSave}
                  disableElevation
                >
                  Create
                </Button>
              )}
            </Grid>
            <Grid item sm={9} xs={12} className={classes.textAlignLeft}></Grid>
            <br />
            <br />
            <br />
          </Grid>
        </Box>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  const { putNewsLoading } = state.Report
  const userInfo = state.auth.userInfo || {}
  const userClasses = userInfo.user_classes || {}
  return {
    loading: putNewsLoading,
    selectedRole: state.auth.selectedRole,
    school_id: userClasses.school_id,
  }
}

export default connect(mapStateToProps, { putNews })(CreateNews)
