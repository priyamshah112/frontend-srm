import React, { useState, useEffect } from 'react'
import 'date-fns'
import { useHistory, useParams, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Autocomplete from '@material-ui/lab/Autocomplete'
import BackIcon from '../../../assets/images/Back.svg'
import RichTextEditor from '../../../shared/richTextEditor'
import NumberFormatCustom from '../../../shared/NumberFormatCustom'
import HomeworkService from '../../Assignment/HomeworkService'
import NotificationService from '../../notification/NotificationService'
import BackdropLoader from '../../common/ui/backdropLoader/BackdropLoader'
import { putPayment } from '../../redux/actions/payment.action'
import { getPaymentById } from '../../redux/actions/payment.action'
import { SnackBarRef } from '../../../SnackBar'
import PublishLater from './PublishLater'
import '../../../assets/css/form.css'

const useStyle = makeStyles((theme) => ({
  formStyle: {
    margin: '20px',
    backgroundColor: 'white',
    borderRadius: '5px',
  },
  backImg: {
    float: 'left',
    transform: 'translateY(7px)',
    cursor: 'pointer',
  },
  sideMargins: {
    marginLeft: '20px',
    marginRight: '20px',
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
  fieldStyle: {
    width: '100%',
    margin: 'auto',
    fontFamily: 'Avenir Book',
    fontSize: 14,
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
      //   color: "#AEAEB2",
    },
    '& .MuiInputBase-root': {
      fontSize: 14,
      //   color: "#1C1C1E",
    },
  },
  inputBorder: {
    height: '50px',
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  textAlignLeft: {
    textAlign: 'left',
    color: '#AEAEB2',
    fontFamily: 'Avenir Book',
    fontSize: 14,
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
      marginRight: '20px',
    },
  },
  optionContainer: {
    borderBottom: '1px solid #DCDCE0',
    width: '100%',
  },
  optionBody: {
    color: 'rgba(0, 0, 0, 0.54)',
  },
  titleText: {
    fontFamily: 'Avenir Medium',
    color: '#1C1C1E',
    textAlign: 'center',
    fontSize: 18,
    '& .MuiTypography-body1': {
      fontize: 18,
    },
  },
  header: {
    paddingTop: '20px',
  },
  renderOption: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
}))

const CreateNotification = (props) => {
  console.log(props)
  const classes = useStyle()
  const history = useHistory()
  const { id } = useParams()
  const { loading } = props
  const location = useLocation()
  const [openPubLater, setOpenPubLater] = useState(false)
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [description, setDescription] = useState('')
  const [errMessage, setError] = useState('')
  const [payment, setPayment] = useState('0')
  const [classState, setClassState] = useState([])
  const [classesId, setClass] = useState([])
  const [mappedClass, setMappedClass] = useState([])
  const [classId, setClassId] = useState('')
  const [repeat, setRepeat] = useState('')
  const [reminder, setReminder] = useState('')
  const [openUserSearch, setOpenUserSearch] = useState(false)
  const [openExcludeUserSearch, setOpenExcludeUserSearch] = useState(false)
  const [userList, setUserList] = useState([])
  const [userIdList, setUserIdList] = useState([])
  const [excludeUserList, setExcludeUserList] = useState([])
  const [excludeUserIdList, setExcludeIdList] = useState({})
  const [searchData, setSearchData] = useState([])
  const [parent, setParent] = useState(false)
  const [parentUpdate, setParentUpdate] = useState(false)
  const [teacher, setTeacher] = useState(false)
  const [teacherUpdate, setTeacherUpdate] = useState(false)
  const [classLoading, setClassLoading] = useState(false)
  const [update, setUpdate] = useState(false)
  const [classUpdate, setClassUpdate] = useState({})
  const [classIdUpdate, setClassIdUpdate] = useState([])
  const [putLoading, setPutLoading] = useState(false)
  const loadingUsers = openUserSearch && searchData.length === 0
  const loadingExcludeUsers = openExcludeUserSearch && searchData.length === 0
  let saveDataApi

  console.log('classUpdate :>> ', classUpdate)

  const validForm = () => {
    if (!title) {
      setError(`A Mandatory field isn't filled!`)
    } else if (!summary) {
      setError(`A Mandatory field isn't filled!`)
    } else if (!payment) {
      setError(`A Mandatory field isn't filled!`)
    } else if (!classState[0] && !userList[0]) {
      setError(`A Mandatory field isn't filled!`)
    } else {
      return true
    }
  }
  const onSuccess = (result) => {
    console.log('result :>> ', result)
    if (result) {
      setTitle(result.data.data.title)
      setSummary(result.data.data.summary)
      setPayment(result.data.data.payment / 100)
      setDescription(result.data.data.main_content)
      setRepeat(result.data.repeat)
      setReminder(result.data.reminder)
      setParentUpdate(result.data.class_mapping.parents)
      setTeacherUpdate(result.data.class_mapping.teachers)
      setClassIdUpdate(result.data.class_mapping.class)
      setUserIdList(result.data.class_mapping.individual_users)
    }
  }
  useEffect(() => {
    let className = []
    if (classUpdate && classIdUpdate.length) {
      const classesUpdate = classUpdate.data || []
      console.log('classIdUpdate :>> ', classIdUpdate)
      classIdUpdate.map((id) => {
        let obj = classesUpdate.find((o) => o.id === id)
        console.log('className obj :>> ', obj)
        if (obj) {
          className.push(obj.class_name)
        }
      })
      if (parentUpdate) {
        className.push('All Parents')
      }
      if (teacherUpdate) {
        className.push('All Teachers')
      }
      console.log('className :>> ', className)
      setClassState(className)
    }
  }, [classUpdate, classIdUpdate])
  const fetchData = () => {
    props.getPaymentById(id, onSuccess)
  }
  useEffect(() => {
    fetchData()
  }, [])
  console.log('mappedClass :>> ', mappedClass, mappedClass)
  const classStateNames = [
    'All Teachers',
    'All Parents',
    'Select All',
    ...Object.values(classesId),
  ]
  useEffect(() => {
    const fetchClasses = async () => {
      setClassLoading(true)
      const classesResponse = await HomeworkService.fetchClasses(props.token)
      setClassUpdate(classesResponse.data)
      setClassLoading(false)
      console.log('classesResponse', classesResponse)
      let initialClassState = {}
      classesResponse.data.data.forEach((className) => {
        initialClassState[className.id] = className.class_name
      })

      setClass({ ...initialClassState })
    }
    if (
      location.pathname === `/create-payment/edit/${id}` ||
      location.pathname === `/create-payment/edit/${id}`
    ) {
      fetchClasses()
    }
  }, [])
  const handleClassId = () => {
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
  useEffect(() => {
    if (mappedClass) {
      const array = []
      mappedClass.map((item, index) => {
        if (item) {
          array.push(item)
        }
      })
      console.log('classId', classId)
      setClassId(array)
    }
  }, [mappedClass])
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

  const callSearchAPI = async (event) => {
    if (event.target.value && event.target.value.length % 3 === 0) {
      try {
        const response = await NotificationService.searchUser(
          event.target.value,
          props.token,
        )
        setSearchData(response.data.data)
      } catch (e) {
        console.log(e)
      }
    }
  }
  const styleOptions = (option) => {
    console.log('option :>> ', option)
    let roles = option.roles || []
    console.log('roles option :>> ', roles)
    if (roles.length !== 0) {
      return (
        <div className={classes.optionContainer}>
          <Typography className={classes.optionTitle}>
            {`${option.firstname} ${option.lastname} - ${option.roles[0].name}`}
          </Typography>

          {option.user_classes ? (
            option.user_classes.classes_data ? (
              <>
                <Typography className={classes.optionBody}>
                  {option.user_classes.classes_data.class_name}
                </Typography>
              </>
            ) : (
              ''
            )
          ) : (
            ''
          )}
          <Typography className={classes.optionBody}>
            {option.username}
          </Typography>
        </div>
      )
    } else {
      return option.username
    }
  }

  useEffect(() => {
    if (userList.length) {
      let userId = []
      userList.map((item) => {
        let user = {
          id: item.id,
          role: item.name,
        }
        userId.push(user)
      })
      setUserIdList(userId)
    }
    if (excludeUserList.length) {
      let userId = []
      excludeUserList.map((item) => {
        userId.push(item.id)
      })
      console.log('userId2', userId)
      setExcludeIdList(userId)
    }
  }, [userList, excludeUserList])

  const handleChangeInput = (event) => {
    let name = event.target.name
    if (name === 'title') {
      setTitle(event.target.value)
      setError(false)
    } else {
      setSummary(event.target.value)
      setError(false)
    }
  }

  const handleSelectClass = (event) => {
    setClassState(event.target.value)
    setError(false)
  }
  const hanldeDeleteClass = (value) => {
    setClassState(classState.filter((classname) => classname !== value))
  }

  const handleDescription = (data) => {
    setDescription(data)
    setError(false)
  }

  const handleChangePayment = (event) => {
    setPayment(event.target.value)
    setError(false)
  }

  const handleSearchChange = (event, value) => {
    setUserList(value)
    setError(false)
  }
  const handleExcludeChange = (event, value) => {
    setExcludeUserList(value)
    setError(false)
  }
  const handleChangeRepeat = (e) => {
    setRepeat(e.target.value)
    setError(false)
  }
  const handleChangeReminder = (e) => {
    setReminder(e.target.value)
    setError(false)
  }

  const saveDetails = (isBack) => {
    const putData = {
      type: 'payment',
      data: {
        title: title,
        summary: summary,
        main_content: description,
        payment: payment * 100,
      },
      published_to: {
        individual_users: userIdList,
        class: classId,
        parents: parent,
        teachers: teacher,
      },
      notify_status: 'draft',
      excluded_user_id: excludeUserIdList,
      reminder: reminder,
      repeat: repeat,
    }
    props.putPayment(id, putData)
    if (isBack) {
      history.push(`/create-payment`)
    }
  }
  useEffect(() => {
    if (update && !classLoading && !loading) {
      saveDetails(false)
    }
  }, [update])

  useEffect(() => {
    saveDataApi = setInterval(() => {
      setUpdate(Math.random())
    }, 10000)
    return () => clearInterval(saveDataApi)
  }, [
    description,
    summary,
    title,
    classState,
    userList,
    excludeUserList,
    reminder,
    repeat,
    payment,
  ])

  const handleSuccess = () => {
    SnackBarRef.open('', true, 'Payment created successfully')
    history.push(`/create-payment`)
    setPutLoading(false)
  }
  const handleFail = (error) => {
    console.log('error', error)
    if (error) {
      SnackBarRef.open('', false, error.message)
    }
    setPutLoading(false)
  }
  const handlePublish = (e) => {
    e.preventDefault()
    if (validForm()) {
      setPutLoading(true)
      const putData = {
        type: 'payment',
        data: {
          title: title,
          summary: summary,
          main_content: description,
          payment: payment * 100,
        },
        published_to: {
          individual_users: userIdList,
          class: classId,
          parents: parent,
          teachers: teacher,
        },
        notify_status: 'published',
        excluded_user_id: excludeUserIdList,
        reminder: reminder,
        repeat: repeat,
      }
      console.log('publishData', putData)
      props.putPayment(id, putData, handleSuccess, handleFail)
    }
  }

  const handleOpenPubLater = () => {
    if (validForm()) {
      setOpenPubLater(true)
    }
  }
  const hanldeClosePubLater = () => {
    setOpenPubLater(false)
  }
  const handlePublishLater = (selectedDate) => {
    // e.preventDefault()
    console.log('selectedDate', selectedDate)
    setPutLoading(true)
    const putData = {
      type: 'payment',
      data: {
        title: title,
        summary: summary,
        main_content: description,
        payment: payment * 100,
      },
      published_to: {
        individual_users: userIdList,
        class: classId,
        parents: parent,
        teachers: teacher,
      },
      notify_status: 'active',
      published_date: selectedDate,
      excluded_user_id: excludeUserIdList,
      reminder: reminder,
      repeat: repeat,
    }
    console.log('publishData', putData)
    if (selectedDate) {
      props.putPayment(id, putData, handleSuccess, handleFail)
    }
  }

  return (
    <>
      <PublishLater
        open={openPubLater}
        handleClose={hanldeClosePubLater}
        handlePublishLater={handlePublishLater}
      />
      {classLoading ? (
        <BackdropLoader open={classLoading} />
      ) : (
        <div style={{ marginBottom: '50px' }}>
          <div style={{ margin: '20px' }}>
            <img
              src={BackIcon}
              alt="Back"
              className={classes.backImg}
              onClick={() => {
                saveDetails(true)
              }}
            />
            <Typography
              className={`${classes.themeColor} ${classes.titleText}`}
            >
              Create Payment
            </Typography>
          </div>
          <form className={classes.formStyle}>
            {errMessage ? (
              <Box pt={2}>
                <div>
                  <Typography className={`${classes.errorColor}`}>
                    {errMessage}
                  </Typography>
                </div>
              </Box>
            ) : (
              ''
            )}
            <Box className={` ${classes.sideMargins}`}>
              <FormControl
                className={classes.fieldStyle}
                style={{ marginTop: '30px' }}
              >
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
            <Box className={`${classes.margin} ${classes.sideMargins}`}>
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
            <Box className={`${classes.margin} ${classes.sideMargins}`}>
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
                  renderOption={(option) => (
                    <div className={classes.renderOption}>
                      <div>
                        <Typography>{option.username} </Typography>
                        {'   '}
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <Typography>{option.name} </Typography>
                      </div>
                    </div>
                  )}
                />
              </FormControl>
            </Box>
            <Box className={`${classes.margin} ${classes.sideMargins}`}>
              <FormControl className={classes.fieldStyle}>
                <Autocomplete
                  multiple
                  open={openExcludeUserSearch}
                  onOpen={() => {
                    setOpenExcludeUserSearch(true)
                  }}
                  onClose={() => {
                    setOpenExcludeUserSearch(false)
                  }}
                  onBlur={() => setSearchData([])}
                  value={excludeUserList}
                  id="tags-standard"
                  options={searchData}
                  loading={loadingExcludeUsers}
                  onChange={handleExcludeChange}
                  onInputChange={callSearchAPI}
                  getOptionLabel={(option) => option.username}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="Exclude users"
                    />
                  )}
                  renderOption={(option) => (
                    <div className={classes.renderOption}>
                      <div>
                        <Typography>{option.username} </Typography>
                        {'   '}
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <Typography>{option.name} </Typography>
                      </div>
                    </div>
                  )}
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
                <InputLabel>Reminder Duration (in days)</InputLabel>
                <Select
                  labelId="demo-mutiple-chip-label"
                  id="demo-mutiple-chip"
                  value={reminder}
                  onChange={handleChangeReminder}
                >
                  <MenuItem value="5">5</MenuItem>
                  <MenuItem value="15">15</MenuItem>
                  <MenuItem value="30">30</MenuItem>
                  <MenuItem value="90">90</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box className={`${classes.margin} ${classes.sideMargins}`}>
              <FormControl className={classes.fieldStyle}>
                <InputLabel>Repeat</InputLabel>
                <Select
                  labelId="demo-mutiple-chip-label"
                  id="demo-mutiple-chip"
                  value={repeat}
                  onChange={handleChangeRepeat}
                >
                  <MenuItem value="monthly">Monthly</MenuItem>
                  <MenuItem value="quarterly">Quarterly</MenuItem>
                  <MenuItem value="half-yearly">Half Yearly</MenuItem>
                  <MenuItem value="full-yearly">Full Yearly</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box className={`${classes.margin} ${classes.sideMargins}`}>
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
            <Box className={`${classes.margin} ${classes.sideMargins}`}>
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
                    } ${'publishBtn'} ${'publishLaterBtn'}`}
                    disableElevation
                  >
                    Publish Later
                  </Button>
                  <Button
                    id="publishBtn"
                    variant="contained"
                    className={`${classes.fieldStyle} ${'publishBtn'}`}
                    color="primary"
                    type="submit"
                    onClick={handlePublish}
                    disableElevation
                  >
                    Publish Now
                  </Button>
                </Grid>
                <Grid
                  item
                  sm={4}
                  xs={12}
                  className={classes.textAlignLeft}
                ></Grid>
                <br />
                <br />
                <br />
              </Grid>
            </Box>
          </form>
        </div>
      )}
      <br />
      <br />
    </>
  )
}

const mapStateToProps = (state) => {
  const { putPayment, putPaymentLoading, getPaymentByIdLoading } = state.Payment
  return {
    loading: getPaymentByIdLoading,
    token: state.auth.token,
  }
}

export default connect(mapStateToProps, { putPayment, getPaymentById })(
  CreateNotification,
)
