import 'date-fns'
import React, { useState, useEffect } from 'react'
import AddIcon from '../../../assets/images/Filled Add.svg'
import { IconButton, Typography, makeStyles } from '@material-ui/core'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import BackdropLoader from '../../common/ui/backdropLoader/BackdropLoader'
import AssignmentCard from './AssignmentCard'
import { postReport } from '../../redux/actions/report.action'
import { getReport } from '../../redux/actions/report.action'

const useStyles = makeStyles((theme) => ({
  sectionContainer: {
    height: '100%',
    // width: '100%',
    overflow: 'auto',
    marginBottom: '80px',
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
}))

function Assignment(props) {
  const classes = useStyles()
  const history = useHistory()
  const [assignmentData, setAssignmentData] = useState([])
  const [paginationInfo, setInfo] = useState({})
  const [loader, setLoader] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const { selectedRole, loading } = props

  const onSuccess = (result) => {
    history.push(`/assignment-report/edit/${result.data.id}`)
  }
  const handleNew = () => {
    props.postReport(onSuccess)
  }

  const handleSuccess = (result) => {
    setLoader(false)
    console.log('result :>> ', result)
    if (result) {
      setAssignmentData([...assignmentData, ...result.data.assignment.data])
      setInfo(result.data.assignment)
    }
  }
  const fail = (e) => {
    setLoader(false)
  }
  const fetchAssignment = (currentPage) => {
    props.getReport('assignment', currentPage, handleSuccess, fail)
  }
  useEffect(() => {
    fetchAssignment(1)
  }, [])

  //   pagination function

  const handleLoadMore = (e) => {
    let bottom =
      e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop < 20
    console.log('bottom :>> ', bottom)
    if (paginationInfo.last_page > currentPage) {
      if (bottom && !loader) {
        let page = currentPage + 1
        fetchAssignment(page)
        setLoader(true)
        setCurrentPage(page)
      }
    }
  }

  return (
    <>
      {loading ? (
        <BackdropLoader open={loading} />
      ) : (
        <div onScroll={handleLoadMore} className={classes.sectionContainer}>
          <div className={classes.header}>
            <div style={{ textAlign: 'center', paddingTop: '20px' }}>
              <Typography
                className={`${classes.themeColor} ${classes.titleText}`}
              >
                Assignment Report
              </Typography>
            </div>
          </div>
          <div className={classes.addNew}>
            <div className={classes.cursor} onClick={handleNew}>
              <img src={AddIcon} alt="add" />
              <Typography className="new">New</Typography>
            </div>
          </div>
          <AssignmentCard
            data={assignmentData}
            loading={loader}
            setAssignmentData={setAssignmentData}
            setInfo={setInfo}
            setLoader={setLoader}
            fetchAssignment={fetchAssignment}
          />
        </div>
      )}
    </>
  )
}

const mapStateToProps = (state) => {
  const { postReportLoading } = state.Report
  const userInfo = state.auth.userInfo || {}
  const userClasses = userInfo.user_classes || {}
  return {
    loading: postReportLoading,
    selectedRole: state.auth.selectedRole,
    school_id: userClasses.school_id,
  }
}

export default connect(mapStateToProps, { postReport, getReport })(Assignment)
