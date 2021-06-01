import React, { useState, useEffect } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'
import DateFnsUtils from '@date-io/date-fns'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import EventIcon from '@material-ui/icons/Event'
import BackIcon from '../../../assets/images/Back.svg'
import { connect } from 'react-redux'
import { schoolGrade } from '../../redux/actions/attendence.action'
import { diarySeenUnseen } from '../../redux/actions/attendence.action'
import { putDiaryMultiple } from '../../redux/actions/attendence.action'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import { CircularProgress, IconButton } from '@material-ui/core'
import { useHistory, useParams, useLocation } from 'react-router-dom'
import HomeworkService from '../../Assignment/HomeworkService'
import BackdropLoader from '../../common/ui/backdropLoader/BackdropLoader'
import { SnackBarRef } from '../../../SnackBar'
import * as moment from 'moment'

const useStyle = makeStyles((theme) => ({
  formStyle: {
    // margin: "20px",
    // width: "95%",
    marginBottom: '85px',
    backgroundColor: 'white',
    // justifyContent: "center",
    // textAlign: "center",
    borderRadius: '5px',
  },
  backImg: {
    float: 'left',
    transform: 'translate(0px, 7px)',
    cursor: 'pointer',
  },
  adornmentColor: {
    color: 'rgba(0, 0, 0, 0.54)',
  },
  themeColor: {
    color: `${theme.palette.common.deluge}`,
    padding: 0,
    margin: 0,
  },
  errorColor: {
    color: 'red',
    textAlign: 'center',
    marginTop: '10px',
  },
  titleText: {
    textAlign: 'center',
    margin: 'auto',
    fontFamily: 'Avenir Medium',
    fontize: '1.2rem',
    color: '#1C1C1E',
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
  inputBorder: {
    // height: "50px",
    // marginTop: "20px",
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

  showIn: {
    paddingTop: '5px',
  },
  textArea: {
    width: '100%',
  },
  paperShowIn: {
    display: 'flex',
    minHeight: '40px',
    backgroundColor: 'none',
    justifyContent: 'left',
    flexWrap: 'wrap',
    listStyle: 'none',

    padding: theme.spacing(0.5),
    margin: 'auto',
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  paperBoxShadow: {
    boxShadow: `2px 2px 2px 0 #E5E5EA`,
  },
  textAlignLeft: {
    textAlign: 'left',
    color: 'rgba(0, 0, 0, 0.54)',
  },
  contentCenter: {
    justifyContent: 'left',
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
    '& .MuiButton-root': {
      textTransform: 'capitalize',
    },
  },

  sideMargins: {
    marginLeft: '20px',
    marginRight: '20px',
  },
  sideMarginright: {
    marginRight: '50px',
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
  header: {
    margin: '20px',
  },
}))

function AddNewMulti(props) {
  const classes = useStyle()
  const { id, student_id } = useParams()
  const history = useHistory()
  const [errMessage, setError] = useState('')
  const [title, setTitle] = useState('')
  const [classState, setClassState] = useState([])
  const [classUpdate, setClassUpdate] = useState([])
  const [classesId, setClass] = useState([])
  const [mappedClass, setMappedClass] = useState([])
  const [gradeState, setGradeState] = useState([])
  const [gradeStateId, setGradeStateId] = useState([])
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(null)
  const [time, setTime] = useState('')
  const [apiClassId, setApiClassId] = useState([])
  const [apiGradeGroup, setApiGradeGroup] = useState([])
  const [parent, setParent] = useState(false)
  const [teacher, setTeacher] = useState(false)
  const [update, setUpdate] = useState(false)
  const [putLoading, setPutLoading] = useState(false)

  let saveDataApi
  const location = useLocation()
  console.log('classState', classState)
  const { grade, gradeLoading, classesLoading, selectedRole, school_id } = props

  const getGradeId = () => {
    let gradeId = []
    gradeState.map((item) => {
      let obj = grade.find((o) => o.name === item)
      gradeId.push(obj.id)
    })
    setGradeStateId(gradeId)
  }
  useEffect(() => {
    getGradeId()
  }, [gradeState])

  useEffect(() => {
    classState.map((item) => {
      if (item === 'All Teachers') {
        setTeacher(true)
      }
      if (item === 'All Parents') {
        setParent(true)
      }
    })
  }, [classState])
  useEffect(() => {
    const fetchClasses = async () => {
      const classesResponse = await HomeworkService.fetchClasses(props.token)
      setClassUpdate(classesResponse.data.data)
      console.log('classesResponse', classesResponse)
      let initialClassState = {}
      classesResponse.data.data.forEach((className) => {
        initialClassState[className.id] = className.class_name
      })

      setClass({ ...initialClassState })
    }
    if (
      location.pathname === `/diary/${student_id}/edit/${id}` ||
      location.pathname === `/diary/${student_id}/edit/${id}`
    ) {
      fetchClasses()
    }
  }, [])
  const classStateNames = [
    'Select All',
    'All Teachers',
    'All Parents',
    ...Object.values(classesId),
  ]

  const handleClassId = () => {
    // let classMapping = { class: [] };
    let classMapping = []
    let isSelectAll = classState.find((classname) => classname === 'Select All')
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
  console.log('classUpdate, apiclassId', apiClassId)

  const handleClassUpdate = () => {
    let className = []
    const apiClass = apiClassId.class || []
    if (apiClassId.teachers) {
      className.push('All Teachers')
    }
    if (apiClassId.parents) {
      className.push('All Parents')
    }
    apiClass.map((id) => {
      let obj = classUpdate.find((o) => o.id === id)
      if (obj) {
        className.push(obj.class_name)
      }
    })
    setClassState(className)
    console.log('className', className)
  }
  useEffect(() => {
    if (classUpdate[0] && apiClassId) {
      handleClassUpdate()
    }
  }, [classUpdate, apiClassId])

  const handleGradeUpdate = () => {
    console.log('apiGradeGroup', grade)
    let apiGrade = apiGradeGroup || []
    let gradeName = []
    apiGrade.map((id) => {
      let obj = grade.find((o) => o.id === id)
      gradeName.push(obj.name)
    })
    console.log('gradeName', gradeName)
    setGradeState(gradeName)
  }
  useEffect(() => {
    handleGradeUpdate()
  }, [apiGradeGroup, grade])

  const diarySucces = (result) => {
    console.log('result', result.data)
    setTitle(result.data.diary.title)
    setDate(result.data.diary.date)
    setDescription(result.data.diary.description)
    setApiClassId(result.data.diary.class_mapping)
    setApiGradeGroup(result.data.diary.grade_group)
    // console.log("gradrgroup",result.data.diary.grade_group )
  }
  const diaryFail = () => {}
  const fetchData = () => {
    props.schoolGrade(school_id)
    props.diarySeenUnseen(id, selectedRole, diarySucces, diaryFail)
  }
  useEffect(() => {
    fetchData()
  }, [])

  const handleDescription = (e) => {
    setDescription(e.target.value)
    props.setError(false)
  }
  const handleDate = (date) => {
    setDate(date)
    props.setError(false)
  }
  console.log('props.back :>> ', props.back)
  useEffect(() => {
    // console.log('props.back :>> ', props.back);
    if (props.back) {
      handleBack()
    }
  }, [props.back])
  const handleBack = () => {
    saveDetails(true)
  }
  const onSuccess = (isBack) => {
    props.setPutBack(false)
    if (isBack) {
      history.push(`/diary/${student_id}/tab/0`)
    }
  }
  const saveDetails = (isBack) => {
    console.log('isBack :>> ', isBack)
    let time = moment(date).format('YYYY-MM-DD')
    console.log('time', time)
    if (time === 'Invalid date') {
      time = ''
    }

    const putData = {
      title: title,
      school_id: school_id,
      description: description,
      date: time,
      published_to: {
        class: mappedClass,
        parents: parent,
        teachers: teacher,
      },
      grade_group_id: gradeStateId,
    }
    props.putDiaryMultiple(id, putData, () => onSuccess(isBack))
  }

  useEffect(() => {
    if (update && props.menuVal === 'multiple') {
      saveDetails(false)
    }
  }, [update])

  useEffect(() => {
    if (!gradeLoading && !classesLoading) {
      saveDataApi = setInterval(() => {
        setUpdate(Math.random())
      }, 10000)
    }
    return () => clearInterval(saveDataApi)
  }, [description, gradeState, title, classState, date])

  const handleChangeInput = (event) => {
    setTitle(event.target.value)
    props.setError(false)
  }
  const handleSelectClass = (event) => {
    setClassState(event.target.value)
    props.setError(false)
  }
  const hanldeDeleteClass = (value) => {
    setClassState(classState.filter((classname) => classname !== value))
  }

  const handleSelectGrade = (event) => {
    setGradeState(event.target.value)
    props.setError(false)
  }
  const hanldeDeleteGrade = (value) => {
    setGradeState(gradeState.filter((grade) => grade !== value))
  }

  const validForm = () => {
    const stat = !classState[0] && !gradeState[0]
    console.log('stat', stat)
    if (!classState[0] && !gradeState[0]) {
      props.setError(`A Mandatory field isn't filled!`)
    } else if (!title) {
      props.setError(`A Mandatory field isn't filled!`)
    } else if (!date) {
      props.setError(`A Mandatory field isn't filled!`)
    } else if (!description) {
      props.setError(`A Mandatory field isn't filled!`)
    } else {
      return true
    }
  }

  useEffect(() => {
    if (date) {
      const time = moment(date).format('YYYY-MM-DD')
      setTime(time)
    }
  }, [date])

  const handleSuccess = () => {
    SnackBarRef.open('', true, 'Diary created successfully')
    history.push(`/diary/${student_id}/tab/0`)
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
    const publishedDate = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
    if (validForm()) {
      setPutLoading(true)
      const putData = {
        title: title,
        school_id: school_id,
        description: description,
        date: time,
        published_to: {
          class: mappedClass,
          parents: parent,
          teachers: teacher,
        },
        grade_group_id: gradeStateId,
        status: 'published',
        published_date: publishedDate,
      }
      props.putDiaryMultiple(id, putData, handleSuccess, handleFail)
    }
  }

  return (
    <>
      {gradeLoading || classesLoading ? (
        <BackdropLoader open={gradeLoading || classesLoading ? true : false} />
      ) : (
        <form className={classes.formStyle}>
          {errMessage ? (
            <div>
              <Typography className={`${classes.errorColor}`}>
                {errMessage}
              </Typography>
            </div>
          ) : (
            ''
          )}
          <Box className={` ${classes.sideMargins}`}>
            <FormControl
              style={{ marginTop: '30px' }}
              className={classes.fieldStyle}
            >
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
                  <DatePicker
                    id="date"
                    label="Date"
                    variant="dialog"
                    minDate={new Date()}
                    format="yyyy/MM/dd"
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
                    <div className={classes.chips}>
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
                    <div className={classes.chips}>
                      {selected.map((value) => (
                        <Chip
                          onDelete={() => hanldeDeleteGrade(value)}
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
                {grade.map((grade) => (
                  <MenuItem key={grade.id} value={grade.name}>
                    {grade.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
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
              direction="row-reverse"
            >
              <Grid item sm={6} xs={12} className={classes.publishBtns}>
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
      )}
    </>
  )
}

const mapStateToProps = (state) => {
  const {
    classesLoading,
    schoolGrade = [],
    schoolGradeLoading,
    putDiaryMultipleLoading,
  } = state.Attendence
  const userInfo = state.auth.userInfo || {}
  const userClasses = userInfo.user_classes || {}
  return {
    grade: schoolGrade,
    gradeLoading: schoolGradeLoading,
    classesLoading: classesLoading,
    putLoading: putDiaryMultipleLoading,
    selectedRole: state.auth.selectedRole,
    school_id: userClasses.school_id,
    token: state.auth.token,
  }
}

export default connect(mapStateToProps, {
  putDiaryMultiple,
  schoolGrade,
  diarySeenUnseen,
})(AddNewMulti)
