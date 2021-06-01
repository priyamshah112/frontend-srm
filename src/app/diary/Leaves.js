import React, { useState, useEffect } from 'react'
import {
  makeStyles,
  Typography,
  Box,
  CircularProgress,
} from '@material-ui/core'
import Spinner from '../leave/shared/Spinner'
import Header from '../leave/shared/Header'
import NoLeave from '../leave/shared/NoLeave'
import LeaveCard from '../leave/shared/LeaveCard'
import InfiniteScroll from 'react-infinite-scroll-component'
import LeaveService from '../leave/LeaveService'
import { useHistory, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import Dropdown from './Dropdown'
import { diaryLeave } from '../redux/actions/attendence.action'

const useStyles = makeStyles({
  selectStudent: {
    fontFamily: 'Avenir book',
    fontSize: 14,
    margin: '20px',
    textAlign: 'center',
  },
  leavesRoot: {
    maxWidth: '100%',
    // height: '100%',
    // overflow: 'auto',
    paddingBottom: '75px',
  },
  backImg: {
    float: 'left',
    cursor: 'pointer',
    position: 'absolute',
    left: '16px',
    top: '18px',
  },
  dropdownContainer: {
    marginRight: '20px',
    marginLeft: '20px',
  },
  circularProgress: {
    textAlign: 'center',
    margin: '8px',
  },
  container: {
    height: '100%',
    overflow: 'auto',
  },
})

const Leaves = (props) => {
  const classes = useStyles()
  const history = useHistory()
  const { id } = useParams()
  const [paginationInfo, setInfo] = useState({})
  const [allLeaves, setLeaves] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const selectedStudent = localStorage.getItem('selectedStudent')
  const { selectedRole } = props

  const onSuccess = (result) => {
    setLoading(false)
    console.log('result :>> ', result)
    if (result) {
      setLeaves([...allLeaves, ...result.data.data])
      setInfo(result.data)
    }
  }
  const fetchLeave = (currentPage) => {
    if (id) {
      props.diaryLeave(id, selectedRole, 'leave', currentPage, onSuccess)
    }
  }
  useEffect(() => {
    fetchLeave(1)
  }, [])

  const handleLoadMore = (e) => {
    let bottom =
      e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop < 20
    console.log('bottom :>> ', bottom)
    if (paginationInfo.last_page > currentPage) {
      if (bottom && !loading) {
        let page = currentPage + 1
        fetchLeave(page)
        setLoading(true)
        setCurrentPage(page)
      }
    }
  }

  return (
    <Box
      className={classes.container}
      id="scrollable"
      onScroll={handleLoadMore}
    >
      <Header title titleText={`Leaves`} />
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
        <div className={classes.leavesRoot}>
          {allLeaves.map((leave) => (
            <LeaveCard leave={leave} />
          ))}
          {!loading && !allLeaves.length ? <NoLeave /> : null}
          {loading ? (
            <div className={classes.circularProgress}>
              <CircularProgress color="primary" size={30} />
            </div>
          ) : (
            ''
          )}
        </div>
      )}
    </Box>
  )
}

const mapStateToProps = (state) => {
  return {
    selectedRole: state.auth.selectedRole,
  }
}

export default connect(mapStateToProps, { diaryLeave })(Leaves)
