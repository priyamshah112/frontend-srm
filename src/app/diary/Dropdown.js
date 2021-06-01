import 'date-fns'
import React, { useState, useEffect } from 'react'
import { FormControl } from '@material-ui/core'
import ClassesDropdown from '../common/ui/classesDropdown'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import { connect } from 'react-redux'
import { classStudentList } from '../redux/actions/attendence.action'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  dropdown: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
    flexDirection: 'row-reverse',
  },
  fieldStyle: {
    width: '240px',
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
    width: '180px',
    // marginTop: '15px',
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
  autocomplete: {
    '& .MuiInputBase-input': {
      color: '#1C1C1C',
    },
  },
}))

const Dropdown = (props) => {
  const history = useHistory()
  const classes = useStyles()
  const [class_id, setClassId] = useState('')
  const [name, setClassName] = useState('')
  const [username, setUsername] = useState('')
  const { studentList, studentListLoading, school_id, selectedRole } = props
  const studentClass = localStorage.getItem('studentClass')
  const selectedUser = localStorage.getItem('selectedStudentName')

  let url
  if (window) {
    url = window.location.href
  }
  let searchStringProfile = false
  let searchStringDiary = false
  let searchStringLibrary = false
  let searchStringLeave = false
  useEffect(() => {
    searchStringProfile = url.includes('/student-profile')
    searchStringDiary = url.includes('/diary')
    searchStringLibrary = url.includes('/library')
    searchStringLeave = url.includes('/student-leave')
  })

  const onChangeClass = (id, classname) => {
    setClassId(id)
    setClassName(classname.class_name)
  }

  useEffect(() => {
    if (studentClass) {
      setClassId(studentClass)
    }
  }, [])
  const fetchData = () => {
    props.classStudentList(class_id, username)
  }
  useEffect(() => {
    if (class_id) {
      fetchData()
    }
  }, [class_id])

  useEffect(() => {
    if (username) {
      if (searchStringLibrary) {
        history.push(`/library/${username.user_id}`)
      } else if (searchStringLeave) {
        history.push(`/student-leave/${username.user_id}`)
      } else if (searchStringProfile) {
        history.push(`/student-profile/${username.user_id}`)
      } else if (searchStringDiary) {
        history.push(`/diary/${username.user_id}/tab/0`)
      }
      localStorage.setItem('selectedStudent', username.user_id)
      localStorage.setItem('selectedStudentName', username.fullName)
      localStorage.setItem('studentClass', username.user_classes.class_id)
    }
  })
  return (
    <div className={classes.dropdown}>
      <FormControl className={`${classes.fieldStyle}`}>
        <Autocomplete
          className={classes.autocomplete}
          value={username}
          onChange={(event, newValue) => {
            setUsername(newValue)
          }}
          options={studentList}
          getOptionLabel={(option) => option.fullName}
          id="include-input-in-list"
          includeInputInList
          loading={studentListLoading}
          renderInput={(params) => (
            <TextField
              {...params}
              margin="normal"
              placeholder={
                selectedUser ? selectedUser : 'Search - Name / User ID'
              }
            />
          )}
        />
      </FormControl>
      <FormControl className={classes.fieldStyleClass}>
        <ClassesDropdown
          label="Class"
          onChange={onChangeClass}
          value={class_id}
        />
      </FormControl>
    </div>
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
})(Dropdown)
