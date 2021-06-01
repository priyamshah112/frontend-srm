import React, { useState, useEffect } from 'react'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import BackIcon from '../../../assets/images/Back.svg'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Input from '@material-ui/core/Input'
import Chip from '@material-ui/core/Chip'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import { CircularProgress } from '@material-ui/core'
import { useHistory, useParams, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import HomeworkService from '../../Assignment/HomeworkService'
import { SnackBarRef } from '../../../SnackBar'
import BackdropLoader from '../../common/ui/backdropLoader/BackdropLoader'
import { getByMonth } from '../../redux/actions/attendence.action'
import { putAttendance } from '../../redux/actions/report.action'

const useStyle = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
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

function CreateAssignment(props) {
  const classes = useStyle()
  const history = useHistory()
  const location = useLocation()
  const { id } = useParams()
  const [title, setTitle] = useState('')
  const [classState, setClassState] = useState([])
  const [mappedClass, setMappedClass] = useState([])
  const [classesId, setClass] = useState([])
  const [classLoading, setClassLoading] = useState(true)
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [error, setError] = useState(false)
  const token = localStorage.getItem('srmToken')
  const { data, monthLoading, loading, school_id } = props

  const now = new Date().getUTCFullYear()
  const selectYear = Array(now - (now - 3))
    .fill('')
    .map((v, idx) => now - idx)

  const validForm = () => {
    if (!title) {
      setError(`A Mandatory field isn't filled!`)
    } else if (!classState.length) {
      setError(`A Mandatory field isn't filled!`)
    } else if (!month) {
      setError(`A Mandatory field isn't filled!`)
    } else if (!year) {
      setError(`A Mandatory field isn't filled!`)
    } else {
      return true
    }
  }

  const fetchMonth = () => {
    props.getByMonth()
  }
  useEffect(() => {
    fetchMonth()
  }, [])

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
      location.pathname === `/attendance-report/edit/${id}` ||
      location.pathname === `/attendance-report/edit/${id}`
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
  const handleChangeMonth = (event) => {
    setMonth(event.target.value)
  }
  const handleChangeYear = (event) => {
    setYear(event.target.value)
    setError(false)
  }

  // handle save
  const onSuccess = () => {
    SnackBarRef.open('', true, 'Attendance report created successfully')
    history.push(`/attendance-report`)
  }
  const onFail = (error) => {
    console.log('error', error)
    if (error) {
      SnackBarRef.open('', false, error.message)
    }
  }
  const handleSave = (event) => {
    event.preventDefault()
    const putData = {
      title: title,
      class_mapping: mappedClass,
      month: month,
      year: year,
      type: 'attendance',
      school_id: school_id,
    }
    props.putAttendance(id, putData, onSuccess, onFail)
  }

  return monthLoading || classLoading ? (
    <BackdropLoader open={monthLoading || classLoading ? true : false} />
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
            history.goBack()
          }}
        />
        <Typography
          variant="h5"
          className={`${classes.themeColor} ${classes.titleText}`}
          style={{ fontSize: 18 }}
        >
          Create Assignment Report
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
        <Box className={`${classes.margin} ${classes.sideMargins}`}>
          <FormControl className={classes.fieldStyle}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Month
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={month}
              onChange={handleChangeMonth}
              // autoWidth
              style={{ textAlign: 'left' }}
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
            >
              {data.map((month) => (
                <MenuItem value={month.id}>{month.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box className={`${classes.margin} ${classes.sideMargins}`}>
          <FormControl className={classes.fieldStyle}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Year
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={year}
              onChange={handleChangeYear}
              // autoWidth
              style={{ textAlign: 'left' }}
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
            >
              {selectYear.map((years) => (
                <MenuItem value={years}>{years}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
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
  const { getByMonth = [], getByMonthLoading } = state.Attendence
  const { putAttendanceLoading } = state.Report
  const userInfo = state.auth.userInfo || {}
  const userClasses = userInfo.user_classes || {}
  return {
    data: getByMonth,
    monthLoading: getByMonthLoading,
    loading: putAttendanceLoading,
    selectedRole: state.auth.selectedRole,
    school_id: userClasses.school_id,
  }
}

export default connect(mapStateToProps, { getByMonth, putAttendance })(
  CreateAssignment,
)
