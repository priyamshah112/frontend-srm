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
import { useHistory, useParams } from 'react-router-dom'
import EventIcon from '@material-ui/icons/Event'
import InputAdornment from '@material-ui/core/InputAdornment'
import DateFnsUtils from '@date-io/date-fns'
import { IconButton } from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { withStyles } from '@material-ui/core/styles'
import { individualDiaryPut } from '../../redux/actions/attendence.action'
import { individualDiaryPutForParent } from '../../redux/actions/attendence.action'
import { getDetailsById } from '../../redux/actions/attendence.action'
import { getDetailsByIdParent } from '../../redux/actions/attendence.action'
import CircularProgress from '@material-ui/core/CircularProgress'
import { connect } from 'react-redux'
import { SnackBarRef } from '../../../SnackBar'
import BackdropLoader from '../../common/ui/backdropLoader/BackdropLoader'
import * as moment from 'moment'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import AddNewMulti from '../multipleStudent/AddNewMulti'

const useStyle = makeStyles((theme) => ({
  errorColor: {
    color: 'red',
    textAlign: 'center',
  },
  formStyle: {
    margin: '0 20px',
    backgroundColor: 'white',
    justifyContent: 'center',
    textAlign: 'left',
    marginBottom: '90px',
    borderRadius: '5px',
  },
  formDiv: {},
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
  sideMargins: {
    marginLeft: '20px',
    marginRight: '20px',
  },
  backImg: {
    float: 'left',
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
    fontize: '1.2rem',
    color: '#1C1C1E',
  },
  inputBorder: {
    height: '50px',
    '& .MuiFormLabel-root': {
      fontFamily: 'Avenir Book',
      color: '#707070',
      fontSize: 14,
    },
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
    '& .MuiSelect-selectMenu': {
      color: '#707070',
      fontFamily: 'Avenir Book',
      fontSize: 14,
    },
  },
  fieldStyleDropdown: {
    // width: '100%',
    // margin: 'auto',
    position: 'absolute',
    top: 18,
    right: 0,
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
    '& .MuiSelect-selectMenu': {
      color: '#1C1C1E',
      fontFamily: 'Avenir Medium',
      fontSize: 18,
    },
  },
  datePicker: {
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    '& .MuiFormLabel-root': {
      fontFamily: 'Avenir Book',
      color: '#707070',
      fontSize: 14,
    },
  },
  textAlignLeft: {
    textAlign: 'left',
    color: 'rgba(0, 0, 0, 0.54)',
  },
  textArea: {
    width: '100%',
  },
  radioBtn: {
    display: 'flex',
    flexDirection: 'row',
    fontFamily: 'Avenir',
    fontSize: 14,
  },
  headingDiv: {
    margin: '20px 20px 30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  publishBtns: {
    textAlign: 'right',
    justifyContent: 'right',
    '& .MuiButton-root': {
      textTransform: 'capitalize',
    },
  },
  paddingTop: {
    paddingTop: '40px',
  },
  radio: {
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'left',

    '& .MuiTypography-body1': {
      fontFamily: 'Avenir Book',
      color: '#707070',
      fontSize: 14,
    },
  },
  checkBox: {
    marginLeft: '-9px',
    marginRight: '-11px',
    flexDirection: 'row',
    '& .MuiTypography-body1': {
      fontFamily: 'Avenir Book',
      color: '#707070',
      fontSize: 14,
    },
  },
  dropdown: {
    position: 'absolute',
    right: '20px',
  },
}))

const GreenRadio = withStyles({
  root: {
    '&$checked': {
      color: '#7B72AF',
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />)

function NewDiaryEntry(props) {
  const classes = useStyle()
  const { id, student_id } = useParams()
  const history = useHistory()
  const [acknowledgement, setAcknowledgement] = useState(true)
  const [title, setTitle] = useState('')
  const [eventDate, setEventDate] = useState(null)
  const [time, setTime] = useState('')
  const [description, setDescription] = useState('')
  const [diaryStatus, setDiaryStatus] = useState('general')
  const [putLoading, setPutLoading] = useState(false)
  const [update, setUpdate] = useState(false)
  const [role, setRole] = useState(false)
  const [error, setError] = useState('')
  const [menuVal, setMenuVal] = useState('individual')
  const [back, setBack] = useState(false)
  const [putBack, setPutBack] = useState(false)
  const { school_id, selectedRole, data, dataLoading } = props
  const token = localStorage.getItem('srmToken')
  let saveDataApi
  const diary = data.diary || {}

  const myStorage = window.localStorage
  const srmSelectedChild = myStorage.srmSelected_Child
  const srmChild = myStorage.srmChild_dict
  var srmChildArray = new Function('return [' + srmChild + '];')()
  const stuId = srmChildArray[0][srmSelectedChild].userDetails.id

  const validForm = () => {
    if (!title && !eventDate && !description) {
      setError(`A Mandatory field isn't filled!`)
    } else if (!title && !eventDate) {
      setError(`A Mandatory field isn't filled!`)
    } else if (!eventDate && !description) {
      setError(`A Mandatory field isn't filled!`)
    } else if (!title && !description) {
      setError(`A Mandatory field isn't filled!`)
    } else if (!title) {
      setError(`A Mandatory field isn't filled!`)
    } else if (!eventDate) {
      setError(`A Mandatory field isn't filled!`)
    } else if (!description) {
      setError(`A Mandatory field isn't filled!`)
    } else {
      return true
    }
  }

  useEffect(() => {
    if (selectedRole === 'parent') {
      setRole(true)
    }
  }, [selectedRole])
  useEffect(() => {
    if (eventDate) {
      const d = new Date(eventDate)
      const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
      const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d)
      const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
      let time = ye + '-' + mo + '-' + da
      setTime(time)
    }
  }, [eventDate])

  const handleGetSuccess = (result) => {
    setTitle(result.data.diary.title)
    setEventDate(result.data.diary.date)
    if (result.data.diary.acknowledgement === '0') {
      setAcknowledgement(false)
    } else {
      setAcknowledgement(true)
    }
    setDescription(result.data.diary.description)
    if (result.data.diary.diary_status) {
      setDiaryStatus(result.data.diary.diary_status)
    } else {
      setDiaryStatus('general')
    }
    if (result.data.diary.diary === 'individual') {
      setMenuVal('individual')
    } else if (result.data.diary.diary === 'multiple') {
      setMenuVal('multiple')
    }
  }
  const fetchData = () => {
    if (selectedRole === 'parent') {
      props.getDetailsByIdParent(id, selectedRole, stuId, token)
    } else {
      props.getDetailsById(id, selectedRole, student_id, handleGetSuccess)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  const handleCheckboxChange = (event) => {
    setAcknowledgement(event.target.checked)
  }
  const handleChangeTitle = (event) => {
    setTitle(event.target.value)
    setError(false)
  }
  const handleEventDate = (date) => {
    setEventDate(date)
    setError(false)
  }
  const handleDescription = (e) => {
    setDescription(e.target.value)
    setError(false)
  }
  const handleRadioChange = (e) => {
    setDiaryStatus(e.target.value)
    console.log('diaryStatus', e.target.value)
  }
  const handleBack = () => {
    if (menuVal === 'individual') {
      saveDetails(true)
    } else if (menuVal === 'multiple') {
      console.log('back multi')
      setBack(Math.random)
    }
    // setPutBack(true)
  }
  console.log('back :>> ', back)
  const onSuccess = (isBack) => {
    setPutBack(false)
    if (isBack) {
      if (props.selectedRole === 'teacher' || props.selectedRole === 'admin') {
        history.push(`/diary/${student_id}/tab/0`)
      } else {
        history.push(`/diary/tab/0`)
      }
    }
  }
  const saveDetails = (isBack) => {
    const putData = {
      title: title,
      school_id: school_id,
      diary_status: diaryStatus,
      description: description,
      date: time,
      acknowledgement: acknowledgement,
      student_id: student_id,
    }
    const putDataParent = {
      title: title,
      school_id: school_id,
      diary_status: diaryStatus,
      description: description,
      date: time,
      acknowledgement: acknowledgement,
      student_id: stuId,
    }
    if (role) {
      props.individualDiaryPutForParent(
        id,
        selectedRole,
        putDataParent,
        stuId,
        token,
        () => onSuccess(isBack),
      )
    } else {
      props.individualDiaryPut(id, selectedRole, student_id, putData, () =>
        onSuccess(isBack),
      )
    }
  }
  useEffect(() => {
    if (update && menuVal === 'individual') {
      saveDetails(false)
    }
  }, [update])

  useEffect(() => {
    saveDataApi = setInterval(() => {
      setUpdate(Math.random())
    }, 10000)
    return () => clearInterval(saveDataApi)
  }, [description, title, eventDate, acknowledgement, diaryStatus])

  const handleSuccess = () => {
    SnackBarRef.open('', true, 'Diary created successfully')
    if (props.selectedRole === 'parent') {
      history.push('/diary/tab/0')
    } else {
      history.push(`/diary/${student_id}/tab/0`)
    }
    setPutLoading(false)
  }
  const handleFail = (error) => {
    console.log('error', error)
    if (error) {
      SnackBarRef.open('', false, error.message)
    }
    setPutLoading(false)
  }

  const handleSave = (e) => {
    e.preventDefault()
    clearInterval(saveDataApi)
    console.log('validForm', validForm())
    if (validForm()) {
      setPutLoading(true)
      let publishedDate = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
      const putData = {
        title: title,
        school_id: school_id,
        diary_status: diaryStatus,
        description: description,
        date: time,
        acknowledgement: acknowledgement,
        student_id: student_id,
        status: 'published',
        published_date: publishedDate,
      }
      const putDataParent = {
        title: title,
        school_id: school_id,
        diary_status: diaryStatus,
        description: description,
        date: time,
        acknowledgement: acknowledgement,
        student_id: stuId,
        status: 'published',
        published_date: publishedDate,
      }
      if (role) {
        props.individualDiaryPutForParent(
          id,
          selectedRole,
          putDataParent,
          stuId,
          token,
          handleSuccess,
          handleFail,
        )
      } else {
        props.individualDiaryPut(
          id,
          selectedRole,
          student_id,
          putData,
          handleSuccess,
          handleFail,
        )
      }
    }
  }
  const handleMenuChange = (e) => {
    setMenuVal(e.target.value)
  }

  return (
    <>
      {dataLoading || putBack ? (
        <BackdropLoader open={dataLoading || putBack ? true : false} />
      ) : (
        <div className={classes.formDiv}>
          <div className={classes.headingDiv}>
            <img
              src={BackIcon}
              alt="Back"
              className={classes.backImg}
              onClick={handleBack}
            />
            <Typography
              variant="h5"
              style={{ fontSize: 18 }}
              className={`${classes.themeColor} ${classes.titleText}`}
            >
              Create New Diary Entry
            </Typography>

            {selectedRole === 'teacher' || selectedRole === 'admin' ? (
              <FormControl className={classes.fieldStyleDropdown}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  className={classes.dropdown}
                  value={menuVal}
                  onChange={handleMenuChange}
                  classes={{
                    paper: classes.menuContainer,
                    list: classes.menuList,
                  }}
                >
                  <MenuItem value="individual">Individual Diary</MenuItem>
                  <MenuItem value="multiple">Multiple Diary</MenuItem>
                </Select>
              </FormControl>
            ) : (
              ''
            )}
          </div>
          <form className={classes.formStyle}>
            {error ? (
              <Box className={classes.margin} pt={2}>
                <div>
                  <Typography className={`${classes.errorColor}`}>
                    {error}
                  </Typography>
                </div>
              </Box>
            ) : (
              ''
            )}

            {menuVal === 'individual' ? (
              <>
                <Box className={`${classes.margin} ${classes.sideMargins}`}>
                  <FormControl
                    className={`${classes.fieldStyle} ${classes.paddingTop}`}
                  >
                    <TextField
                      label="Title"
                      id="title"
                      name="title"
                      className={classes.inputBorder}
                      value={title}
                      onChange={handleChangeTitle}
                      required={true}
                    />
                  </FormControl>
                </Box>
                <Box className={`${classes.margin} ${classes.sideMargins}`}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container className={classes.fieldStyle}>
                      <Grid item xs={12}>
                        <DatePicker
                          id="eventDate"
                          label="Date"
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
                {selectedRole === 'teacher' || selectedRole === 'admin' ? (
                  <Box className={`${classes.margin} ${classes.sideMargins}`}>
                    <Grid className={classes.fieldStyle}>
                      <FormControl component="fieldset">
                        <RadioGroup
                          aria-label="radio"
                          name="radio1"
                          // className={classes.radioBtn}
                          value={diaryStatus}
                          className={classes.radio}
                          onChange={handleRadioChange}
                        >
                          <FormControlLabel
                            value="general"
                            control={<GreenRadio />}
                            label="General Diary"
                          />
                          <FormControlLabel
                            value="teacher"
                            control={<GreenRadio />}
                            label="Teacher's Observation"
                          />
                          <FormControlLabel
                            value="late"
                            control={<GreenRadio />}
                            label="Late Coming"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  </Box>
                ) : (
                  ''
                )}
                <Box className={`${classes.margin} ${classes.sideMargins}`}>
                  <Grid className={classes.fieldStyle}>
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
                    direction="row"
                  >
                    <Grid
                      item
                      sm={10}
                      xs={12}
                      className={classes.textAlignLeft}
                    >
                      <FormGroup>
                        <FormControlLabel
                          className={classes.checkBox}
                          value="acknowledgement required"
                          control={
                            <Checkbox
                              checked={acknowledgement}
                              color="primary"
                            />
                          }
                          label="Acknowledgement Required"
                          labelPlacement="start"
                          onChange={handleCheckboxChange}
                        />
                      </FormGroup>
                    </Grid>
                    <Grid item sm={2} xs={12} className={classes.publishBtns}>
                      {putLoading ? (
                        <CircularProgress />
                      ) : (
                        <Button
                          id="publishBtn"
                          variant="contained"
                          className={`${classes.fieldStyle} ${'publishBtn'}`}
                          color="primary"
                          type="submit"
                          onClick={handleSave}
                          disableElevation
                        >
                          Save
                        </Button>
                      )}
                    </Grid>
                    <br />
                    <br />
                    <br />
                  </Grid>
                </Box>
              </>
            ) : (
              <AddNewMulti
                setPutBack={setPutBack}
                menuVal={menuVal}
                setError={setError}
                back={back}
              />
            )}
          </form>
        </div>
      )}
    </>
  )
}

const mapStateToProps = (state) => {
  const {
    individualDiaryPutLoading,
    getDetailsById = [],
    getDetailsByIdLoading,
  } = state.Attendence
  const userInfo = state.auth.userInfo || {}
  const userClasses = userInfo.user_classes || {}
  return {
    data: getDetailsById,
    dataLoading: getDetailsByIdLoading,
    putLoading: individualDiaryPutLoading,
    school_id: userClasses.school_id,
    selectedRole: state.auth.selectedRole,
  }
}

export default connect(mapStateToProps, {
  individualDiaryPut,
  individualDiaryPutForParent,
  getDetailsById,
  getDetailsByIdParent,
})(NewDiaryEntry)
