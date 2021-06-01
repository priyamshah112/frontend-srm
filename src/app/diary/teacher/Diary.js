import 'date-fns'
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import TabBar from '../TabBar'
import StudentImage2 from '../../lunch/images/dummy.png'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import { CircularProgress, FormControl } from '@material-ui/core'
import ClassesDropdown from '../../common/ui/classesDropdown'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import SearchIcon from '@material-ui/icons/Search'
import InputAdornment from '@material-ui/core/InputAdornment'
import { IconButton } from '@material-ui/core'
import { connect } from 'react-redux'
import { classStudentList } from '../../redux/actions/attendence.action'
import { useHistory } from 'react-router-dom'
import Spinner from '../../common/ui/spinner/Spinner'
import StudentDiary from '../StudentDiary'

const useStyles = makeStyles((theme) => ({
  datePicker: {
    width: '25%',
    paddingRight: '10px',
  },
  sectionContainer: {
    marginBottom: '85px',
    width: '100%',
  },

  cardBoxPadding: {
    padding: '0px 24px 24px 24px',
    [theme.breakpoints.down('sm')]: {
      padding: '16px',
    },
  },
  addNew: {
    color: theme.palette.common.deluge,
    position: 'absolute',
    right: 0,
    marginTop: '15px',
    marginRight: '15px',
    cursor: 'pointer',
    '& .new': {
      float: 'right',
      fontSize: '14px',
      padding: '5px',
    },
    '& img': {
      margin: '5px',
      height: '20px',
      cursor: 'pointer',
    },
  },
  loading: {
    width: '100%',
    textAlign: 'center',
    paddingTop: '8px',
    fontSize: '20px',
  },
  iconButtonRoot: {
    padding: '8px',
  },

  menuItemRoot: {
    padding: 0,
  },
  menuItem: {
    paddingLeft: '10px',
    paddingRight: '10px',
    colour: '#1C1C1E',
  },
  menuTopItemMargin: {
    marginTop: '5px',
  },
  borderBottomDiv: {
    width: '90%',
    height: '30px',
    margin: 'auto',
    marginTop: '5px',
    borderBottom: '1px solid #D1D1D6',
  },
  borderBottomLastDiv: {
    width: '90%',
    height: '30px',
    margin: 'auto',
    marginTop: '5px',
  },
  root: {
    margin: '20px',
    display: 'flex',
    cursor: 'pointer',
    // justifyContent: "space-between",
  },
  stuName: {
    fontFamily: 'Avenir medium',
    fontSize: 18,
    marginTop: '12px',
    marginLeft: '10px',
  },
  stuClass: {
    fontFamily: 'Avenir medium',
    fontSize: 14,
    position: 'absolute',
    marginTop: '31px',
    right: '41px',
  },
  Avatar: {
    margin: '20px 0 20px 20px',
  },
  dropdown: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '30px 20px 20px 20px',
    flexDirection: 'row-reverse',
  },
  header: {
    display: 'inline block',
  },
  fieldStyle: {
    width: '250px',
    marginleft: '15px',
    marginTop: '-16px',
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
  },
  fieldStyleClass: {
    width: '170px',
    marginleft: '15px',
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
  },
  circularProgress: {
    display: 'flex',
    justifyContent: 'center',
    padding: '20px',
  },
  message: {
    fontFamily: 'Avenir book',
    fontSize: 14,
    textAlign: 'center',
    margin: '20px',
  },
}))

function Diary(props) {
  const history = useHistory()
  const classes = useStyles()
  const [class_id, setClassId] = useState('')
  const [name, setClassName] = useState('')
  const [username, setUsername] = useState('')
  const [classesLoading, setClassLoading] = useState(true)
  const { studentList, studentListLoading, school_id, selectedRole } = props
  let url
  if (window) {
    url = window.location.href
  }
  let searchStringProfile = url.includes('/student-profile')
  let searchStringDiary = url.includes('/diary')
  let searchStringLibrary = url.includes('/library')
  let searchStringLeave = url.includes('/student-leave')

  // const handleUsernameChange = (e) => {
  //   setUsername(e.target.value)
  // }

  console.log('username :>> ', username)
  console.log('studentList :>> ', studentList)
  const onChangeClass = (id, classname) => {
    setClassId(id)
    setClassName(classname.class_name)
    // setSchoolId(classname.school_id);
  }

  const fetchData = () => {
    props.classStudentList(class_id, username)
  }
  useEffect(() => {
    if (class_id) {
      fetchData()
    }
  }, [class_id])

  useEffect(() => {
    if (class_id) {
      setClassLoading(false)
    }
  }, [class_id])

  const handleDiary = (id, firstname, lastname) => {
    localStorage.setItem('selectedStudent', id)
    localStorage.setItem('selectedStudentName', firstname + ' ' + lastname)
    if (searchStringDiary) {
      history.push(`/diary/${id}`)
    } else if (searchStringProfile) {
      history.push(`/student-profile/${id}`)
    } else if (searchStringLibrary) {
      history.push(`/library/${id}`)
    } else if (searchStringLeave) {
      history.push(`/student-leave/${id}`)
    }
  }

  return (
    <>
      {selectedRole === 'teacher' || selectedRole === 'admin' ? (
        <div className={classes.sectionContainer}>
          <div className={classes.dropdown}>
            <div className={classes.header}>
              <div className={classes.filterForm}>
                <FormControl className={classes.fieldStyle}>
                  <Autocomplete
                    value={username}
                    defaultValue={username}
                    onChange={(event, newValue) => {
                      setUsername(newValue)
                    }}
                    options={studentList}
                    id="include-input-in-list"
                    includeInputInList
                    getOptionLabel={(option) => option.firstname}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Search - Name / User ID"
                        margin="normal"
                      />
                    )}
                    renderOption={(option) => {
                      return (
                        <div>
                          {option.firstname} {option.lastname}
                        </div>
                      )
                    }}
                  />
                </FormControl>
              </div>
            </div>
            <div className={classes.header}>
              <div className={classes}>
                <FormControl className={classes.fieldStyleClass}>
                  <ClassesDropdown
                    label="Class"
                    onChange={onChangeClass}
                    value={class_id}
                  />
                </FormControl>
              </div>
            </div>
          </div>
          {studentListLoading || classesLoading ? (
            <div className={classes.circularProgress}>
              <Spinner />
            </div>
          ) : studentList.length === 0 ? (
            <Typography className={classes.message}>
              No students available!
            </Typography>
          ) : (
            studentList.map((item) => (
              <Card
                className={classes.root}
                onClick={() =>
                  handleDiary(item.id, item.firstname, item.lastname)
                }
              >
                <div style={{ width: '7%' }}>
                  <Avatar
                    className={classes.Avatar}
                    alt="Student image"
                    src={item.thumbnail ? item.thumbnail : StudentImage2}
                  />
                </div>
                <div style={{ display: 'flex' }}>
                  <CardContent>
                    <Typography className={classes.stuName} variant="body2">
                      {item.firstname}
                    </Typography>
                  </CardContent>
                  <Typography
                    className={classes.stuClass}
                    variant="body2"
                    component="p"
                  >
                    Class - {name}
                  </Typography>
                </div>
              </Card>
            ))
          )}
        </div>
      ) : (
        ''
      )}
      {selectedRole === 'parent' ? <TabBar /> : ''}
      {selectedRole === 'student' ? <StudentDiary /> : ''}
    </>
  )
}

const mapStateToProps = (state) => {
  const { classStudentList = [], classStudentListLoading } = state.Attendence
  const userInfo = state.auth.userInfo || {}
  const userClasses = userInfo.user_classes || {}
  return {
    studentList: classStudentList,
    studentListLoading: classStudentListLoading,
    school_id: userClasses.school_id,
    selectedRole: state.auth.selectedRole,
  }
}

export default connect(mapStateToProps, {
  classStudentList,
})(Diary)
