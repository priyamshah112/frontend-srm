import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Typography } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'
import PaymentCard from './PaymentCard'
import PaymentService from './PaymentService'
import { connect } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  message: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Avenir Book',
    padding: '20px',
  },
  sectionContainer: {
    overflow: 'auto',
    padding: '0 20px 20px 20px',
  },
  cardBoxPadding: {
    overflow: 'auto',
    padding: '20px 20px 0 20px',
    [theme.breakpoints.down('sm')]: {
      padding: '16px',
    },
  },
  loading: {
    textAlign: 'center',
    padding: '8px',
  },
  emptyView: {
    width: '100%',
    textAlign: 'center',
    paddingTop: '100px',
    fontSize: '20px',
  },
}))
const PaymentSection = (props) => {
  const classes = useStyles()
  const [payments, setPayments] = useState([])
  const [paginationInfo, setInfo] = useState({})
  const [loader, setLoader] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [height, setHeight] = useState({})
  const [student_id, setStudentId] = useState('')
  const { selectedRole } = props

  useEffect(() => {
    if (selectedRole === 'parent') {
      const srmSelectedChild = localStorage.getItem('srmSelected_Child')

      const srmChild = localStorage.getItem('srmChild_dict')
      var srmChildArray = new Function('return [' + srmChild + '];')()
      const stuId = srmChildArray[0][srmSelectedChild] || {}
      const studId = stuId.userDetails || {}
      const studeId = studId.id
      console.log(
        'object :>> ',
        srmSelectedChild,
        srmChild,
        srmChildArray,
        stuId,
        studeId,
      )
      setStudentId(studeId)
    }
  }, [])

  console.log('student_id :>> ', student_id)

  useEffect(() => {
    if (window) {
      let height = window.innerHeight
      console.log('height :>> ', height)
      setHeight(height)
    }
  }, [])

  const fetchPayments = async (currentPage) => {
    try {
      setLoader(true)
      const token = localStorage.getItem('srmToken')

      if (selectedRole === 'parent') {
        const srmSelectedChild = localStorage.getItem('srmSelected_Child')
        const srmChild = localStorage.getItem('srmChild_dict')
        var srmChildArray = new Function('return [' + srmChild + '];')()
        const stuId = srmChildArray[0][srmSelectedChild] || {}
        const studId = stuId.userDetails || {}
        const studeId = studId.id

        const response = await PaymentService.fetchPaymentsParent(
          token,
          currentPage,
          selectedRole,
          props.status,
          studeId,
        )
        if (response.status === 200) {
          setLoader(false)
          setPayments([...payments, ...response.data.data.data])
          setInfo(response.data.data)
        }
      } else if (selectedRole === 'teacher' || selectedRole === 'admin') {
        const response = await PaymentService.fetchPayments(
          token,
          currentPage,
          selectedRole,
          props.status,
        )
        if (response.status === 200) {
          setLoader(false)
          setPayments([...payments, ...response.data.data.data])
          setInfo(response.data.data)
        }
      }
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    fetchPayments(1)
  }, [])
  const handleLoadMore = (e) => {
    let bottom =
      e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop < 20
    // console.log('bottom :>> ', bottom)
    if (paginationInfo.last_page > currentPage) {
      if (bottom && !loader) {
        let page = currentPage + 1
        fetchPayments(page)
        setLoader(true)
        setCurrentPage(page)
      }
    }
  }
  // scroll above

  let content = payments.map((payment) => (
    <PaymentCard
      selectedTab={props.selectedTab}
      payments={payment}
      key={payment.id}
    />
  ))
  return (
    <div
      className={classes.sectionContainer}
      style={{ height: height }}
      onScroll={handleLoadMore}
      id="scrollable"
    >
      {!payments.length ? (
        !loader ? (
          <div>
            <Typography className={classes.message}>
              Don't have any Payments.
            </Typography>
          </div>
        ) : (
          ''
        )
      ) : (
        content
      )}
      {loader ? (
        <div className={classes.loading}>
          <CircularProgress color="primary" size={30} />
        </div>
      ) : (
        ''
      )}
      <br />
      <br />
      <br />
    </div>
  )
}
const mapStateToProps = (state) => {
  const userInfo = state.auth.userInfo || {}
  const userClasses = userInfo.user_classes || {}
  return {
    selectedRole: state.auth.selectedRole,
    school_id: userClasses.school_id,
  }
}

export default connect(mapStateToProps, {})(PaymentSection)
