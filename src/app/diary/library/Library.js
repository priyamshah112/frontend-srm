import 'date-fns'
import React, { useState, useEffect } from 'react'
import AddIcon from '../../../assets/images/Filled Add.svg'
import { IconButton, Typography, makeStyles } from '@material-ui/core'
import LibraryCard from './LibraryCard'
import { postLibrary } from '../../redux/actions/attendence.action'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import BackdropLoader from '../../common/ui/backdropLoader/BackdropLoader'
import { getLibraryInfo } from '../../redux/actions/attendence.action'
import { studentLibraryInfo } from '../../redux/actions/attendence.action'
import BackIcon from '../../../assets/images/Back.svg'
import Dropdown from '../Dropdown'

const useStyles = makeStyles((theme) => ({
  selectStudent: {
    fontFamily: 'Avenir book',
    fontSize: 14,
    margin: '20px',
    textAlign: 'center',
  },
  dropdownContainer: {
    marginRight: '20px',
    marginLeft: '20px',
  },
  sectionContainer: {
    height: '100%',
    width: '100%',
    overflow: 'auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  addNew: {
    color: theme.palette.common.deluge,
    display: 'flex',
    marginRight: '15px',
    marginTop: '15px',
    justifyContent: 'flex-end',
    '& .new': {
      float: 'right',
      fontSize: '14px',
      padding: '5px 5px 0 5px',
    },
    '& img': {
      margin: '5px 5px 0 5px',
      height: '20px',
      cursor: 'pointer',
    },
  },
  cursor: {
    cursor: 'pointer',
  },
  titleText: {
    fontFamily: 'Avenir Medium',
    fontSize: 18,
    color: '#1C1C1E',
  },
  backImg: {
    float: 'left',
    cursor: 'pointer',
    position: 'absolute',
    left: '16px',
    top: '18px',
  },
}))

function Library(props) {
  const classes = useStyles()
  const history = useHistory()
  const { studentId } = useParams()
  const [data, setData] = useState([])
  const [dataLoading, setLoading] = useState(false)
  const [paginationInfo, setInfo] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [refetch, setRefetch] = useState(false)

  const { selectedRole } = props
  const studentName = localStorage.getItem('selectedStudentName')
  const selectedStudent = localStorage.getItem('selectedStudent')

  const handleSuccess = (result) => {
    history.push(`/library/${studentId}/edit/${result.data.id}`)
  }
  const handleAddBook = () => {
    props.postLibrary(
      {
        school_id: props.school_id,
      },
      handleSuccess,
    )
  }

  useEffect(() => {
    if (refetch) {
      fetchData(1)
    }
  }, [refetch])

  const onSuccess = (result) => {
    // console.log('result :>> ', result)
    // console.log('result :>> ', result.data.library)
    if (result) {
      setLoading(false)
      setData([...data, ...result.data.library.data])
      setInfo(result.data.library)
    }
  }

  const fetchData = (currentPage) => {
    setLoading(true)
    if (
      (selectedRole === 'teacher' || selectedRole === 'admin') &&
      selectedStudent
    ) {
      props.getLibraryInfo(currentPage, studentId, onSuccess)
    } else if (selectedRole === 'parent' || selectedRole === 'student') {
      props.studentLibraryInfo(currentPage, onSuccess)
    }
  }
  useEffect(() => {
    fetchData(1)
  }, [])
  const handleLoadMore = (e) => {
    let bottom =
      e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop < 20
    console.log('bottom :>> ', bottom)
    if (paginationInfo.last_page > currentPage) {
      if (bottom && !dataLoading) {
        let page = currentPage + 1
        fetchData(page)
        setLoading(true)
        setCurrentPage(page)
      }
    }
  }

  return (
    <>
      {props.dataLoading ? (
        <BackdropLoader open={props.dataLoading} />
      ) : (
        <div onScroll={handleLoadMore} className={classes.sectionContainer}>
          <div className={classes.header}>
            <div style={{ textAlign: 'center', paddingTop: '20px' }}>
              <Typography
                variant="h5"
                className={`${classes.themeColor} ${classes.titleText}`}
              >
                Library
              </Typography>
            </div>
          </div>
          {selectedRole === 'teacher' || selectedRole === 'admin' ? (
            <div className={classes.dropdownContainer}>
              <Dropdown />
            </div>
          ) : (
            ''
          )}
          {(selectedRole === 'teacher' || selectedRole === 'admin') &&
          !selectedStudent ? (
            <Typography className={classes.selectStudent}>
              Please select student first!
            </Typography>
          ) : (
            <>
              {props.selectedRole === 'admin' ||
              props.selectedRole === 'teacher' ? (
                <div className={classes.addNew}>
                  <div className={classes.cursor} onClick={handleAddBook}>
                    <img src={AddIcon} alt="add" />
                    <Typography className="new">Add Book</Typography>
                  </div>
                </div>
              ) : (
                ''
              )}

              <LibraryCard
                setRefetch={setRefetch}
                setData={setData}
                setInfo={setInfo}
                library={data}
                dataLoading={dataLoading}
                studentId={studentId}
              />
            </>
          )}
        </div>
      )}
    </>
  )
}

const mapStateToProps = (state) => {
  const { postLibrary, postLibraryLoading } = state.Attendence
  const userInfo = state.auth.userInfo || {}
  const userClasses = userInfo.user_classes || {}
  return {
    data: postLibrary,
    dataLoading: postLibraryLoading,
    selectedRole: state.auth.selectedRole,
    school_id: userClasses.school_id,
  }
}

export default connect(mapStateToProps, {
  postLibrary,
  getLibraryInfo,
  studentLibraryInfo,
})(Library)
