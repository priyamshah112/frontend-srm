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
import Input from '@material-ui/core/Input'
import Chip from '@material-ui/core/Chip'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import DateFnsUtils from '@date-io/date-fns'
import { CircularProgress, IconButton } from '@material-ui/core'
import { useHistory, useParams, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import HomeworkService from '../../Assignment/HomeworkService'
import { SnackBarRef } from '../../../SnackBar'
import BackdropLoader from '../../common/ui/backdropLoader/BackdropLoader'
import Autocomplete from '@material-ui/lab/Autocomplete'
import NotificationService from '../../notification/NotificationService'
import ReportService from '../../report/ReportService'
import { putPayment } from '../../redux/actions/report.action'
import * as moment from 'moment'

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
    width: '100%',
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
  className: {
    fontWeight: '300',
    fontSize: '15px',
    color: '#8E8E93',
  },
}))

function CreatePayment(props) {
  const classes = useStyle()
  const history = useHistory()
  const location = useLocation()
  const { id } = useParams()
  const [level, setLevel] = useState('school')
  const [title, setTitle] = useState('')
  const [classState, setClassState] = useState([])
  const [mappedClass, setMappedClass] = useState([])
  const [classesId, setClass] = useState([])
  const [classLoading, setClassLoading] = useState(true)
  const [fromDate, setFromDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [openUserSearch, setOpenUserSearch] = useState(false)
  const [userList, setUserList] = useState([])
  const [userIdList, setUserId] = useState([])
  const [searchData, setSearchData] = useState([])
  const [error, setError] = useState(false)
  const loadingUsers = openUserSearch && searchData.length === 0
  const { school_id, loading } = props
  const token = localStorage.getItem('srmToken')

  const handleSelectLevel = (event) => {
    setLevel(event.target.value)
    setError(false)
  }
  const validForm = () => {
    if (level === 'school') {
      if (!title) {
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
    } else if (level === 'class') {
      if (!title) {
        setError(`A Mandatory field isn't filled!`)
      } else if (!fromDate) {
        setError(`A Mandatory field isn't filled!`)
      } else if (!endDate) {
        setError(`A Mandatory field isn't filled!`)
      } else if (endDate.getTime() < fromDate.getTime()) {
        setError('End date should be greater then from date')
      } else if (!classState.length) {
        setError(`A Mandatory field isn't filled!`)
      } else {
        return true
      }
    } else if (level === 'student') {
      if (!title) {
        setError(`A Mandatory field isn't filled!`)
      } else if (!fromDate) {
        setError(`A Mandatory field isn't filled!`)
      } else if (!endDate) {
        setError(`A Mandatory field isn't filled!`)
      } else if (endDate.getTime() < fromDate.getTime()) {
        setError('End date should be greater then from date')
      } else if (!userList.length) {
        setError(`A Mandatory field isn't filled!`)
      } else {
        return true
      }
    }
  }

  const handleSelectClass = (event) => {
    setClassState(event.target.value)
    setError(false)
  }
  const hanldeDeleteClass = (value) => {
    setClassState(classState.filter((classname) => classname !== value))
  }
  useEffect(() => {
    const fetchClasses = async () => {
      const classesResponse = await HomeworkService.fetchClasses(token)
      //   setClassUpdate(classesResponse.data.data)
      setClassLoading(false)
      console.log('classesResponse', classesResponse)
      let initialClassState = {}
      classesResponse.data.data.forEach((className) => {
        initialClassState[className.id] = className.class_name
      })

      setClass({ ...initialClassState })
    }
    if (
      location.pathname === `/payment-report/edit/${id}` ||
      location.pathname === `/payment-report/edit/${id}`
    ) {
      fetchClasses()
    }
  }, [])
  const classStateNames = ['All', ...Object.values(classesId)]

  const handleClassId = () => {
    // let classMapping = { class: [] };
    let classMapping = []
    let isSelectAll = classState.find((classname) => classname === 'All')
    if (isSelectAll) {
      classMapping = [...Object.keys(classesId)]
    } else {
      classState.forEach((classnames) => {
        classMapping.push(
          parseInt(
            Object.keys(classesId).find(
              (classId) => classesId[classId] === classnames,
            ),
          ),
        )
      })
    }
    setMappedClass(classMapping)
  }
  useEffect(() => {
    handleClassId()
  }, [classState])

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

  // handle search user in student level
  const callSearchAPI = async (event) => {
    if (event.target.value && event.target.value.length % 3 === 0) {
      try {
        const response = await ReportService.searchUser(
          event.target.value,
          token,
        )
        setSearchData(response.data.data)
      } catch (e) {
        console.log(e)
      }
    }
  }
  const handleSearchChange = (event, value) => {
    console.log('value :>> ', value)
    setUserList(value)
    setError(false)
  }
  useEffect(() => {
    let userId = []
    if (userList.length) {
      userList.map((item) => {
        userId.push(item.id)
      })
    }
    setUserId(userId)
  }, [userList])

  // handle save

  const onSuccess = () => {
    SnackBarRef.open('', true, 'Payment report created successfully')
    history.push(`/payment-report`)
  }
  const onFail = (error) => {
    console.log('error', error)
    if (error) {
      SnackBarRef.open('', false, error.message)
    }
  }
  const handleSave = (event) => {
    event.preventDefault()
    const schoolLevelData = {
      title: title,
      from_date: moment(fromDate).format('YYYY-MM-DD'),
      to_date: moment(endDate).format('YYYY-MM-DD'),
      type: 'payment',
      payment_level: 'school',
      school_id: school_id,
    }
    const classLevelData = {
      title: title,
      from_date: moment(fromDate).format('YYYY-MM-DD'),
      to_date: moment(endDate).format('YYYY-MM-DD'),
      type: 'payment',
      payment_level: 'class',
      class_mapping: mappedClass,
      school_id: school_id,
    }
    const studentLevelData = {
      title: title,
      from_date: moment(fromDate).format('YYYY-MM-DD'),
      to_date: moment(endDate).format('YYYY-MM-DD'),
      type: 'payment',
      payment_level: 'student',
      inviduals_user: userIdList,
      school_id: school_id,
    }
    if (validForm()) {
      const putData =
        level === 'school'
          ? schoolLevelData
          : level === 'class'
          ? classLevelData
          : studentLevelData

      props.putPayment(id, putData, onSuccess, onFail)
    }
  }

  return classLoading ? (
    <BackdropLoader open={classLoading} />
  ) : (
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
            history.push('/payment-report')
          }}
        />
        <Typography
          variant="h5"
          className={`${classes.themeColor} ${classes.titleText}`}
          style={{ fontSize: 18 }}
        >
          Create Payment Report
        </Typography>
      </div>
      <Box className={`${classes.margin} ${classes.sideMargins}`}>
        <FormControl
          style={{ width: '50%' }}
          className={`${classes.fieldStyle}`}
        >
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={level}
            onChange={handleSelectLevel}
          >
            <MenuItem value="school">School Level</MenuItem>
            <MenuItem value="class">Class Level</MenuItem>
            <MenuItem value="student">Student Level</MenuItem>
          </Select>
        </FormControl>
      </Box>
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
        {level === 'student' ? (
          <Box className={`${classes.margin} ${classes.sideMargins}`}>
            <FormControl className={classes.fieldStyle}>
              <Autocomplete
                multiple
                open={openUserSearch}
                onOpen={() => {
                  setOpenUserSearch(true)
                }}
                onClose={() => {
                  setOpenUserSearch(false)
                }}
                onBlur={() => setSearchData([])}
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
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option.fullName}
                      size="small"
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderOption={(option) => {
                  console.log('option :>> ', option)
                  return (
                    <div className={classes.optionContainer}>
                      <Typography className={classes.optionTitle}>
                        {`${option.firstname} ${option.lastname} - ${option.roles[0].name}`}
                      </Typography>
                      {option.user_classes && option.user_classes.classes_data && (
                        <Typography>
                          <span className={classes.className}>
                            Class: {option.user_classes.classes_data.class_name}
                          </span>
                        </Typography>
                      )}
                      <Typography>
                        <span className={classes.className}>
                          {' '}
                          Username: {option.username}
                        </span>
                      </Typography>
                    </div>
                  )
                }}
              />
            </FormControl>
          </Box>
        ) : (
          ''
        )}
        {level === 'class' ? (
          <Box className={`${classes.margin} ${classes.sideMargins}`}>
            <FormControl className={classes.fieldStyle}>
              <InputLabel>Select Class</InputLabel>
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
                      maxHeight: '300px',
                    },
                  },
                  anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                  },
                  transformOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                  },
                  getContentAnchorEl: null,
                }}
                renderValue={(selected) => {
                  return (
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                      {selected.map((value) => (
                        <Chip
                          onDelete={() => hanldeDeleteClass(value)}
                          onMouseDown={(event) => {
                            event.stopPropagation()
                          }}
                          key={value}
                          label={value}
                          className={classes.chip}
                        />
                      ))}
                    </div>
                  )
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
        ) : (
          ''
        )}
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
  const { putPaymentLoading } = state.Report
  const userInfo = state.auth.userInfo || {}
  const userClasses = userInfo.user_classes || {}
  return {
    loading: putPaymentLoading,
    selectedRole: state.auth.selectedRole,
    school_id: userClasses.school_id,
  }
}

export default connect(mapStateToProps, { putPayment })(CreatePayment)
