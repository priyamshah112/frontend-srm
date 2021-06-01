import 'date-fns'
import React, { useState, useEffect } from 'react'
import AddIcon from '../../../assets/images/Filled Add.svg'
import { IconButton, Typography, makeStyles } from '@material-ui/core'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import BackdropLoader from '../../common/ui/backdropLoader/BackdropLoader'
import PaymentCard from './PaymentCard'
import { postReport, getReport } from '../../redux/actions/report.action'

const useStyles = makeStyles((theme) => ({
  sectionContainer: {
    height: '100%',
    width: '100%',
    overflow: 'auto',
    paddingBottom: '80px',
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

function Payment(props) {
  const classes = useStyles()
  const history = useHistory()
  const [paymentData, setPaymentData] = useState([])
  const [paginationInfo, setInfo] = useState({})
  const [loader, setLoader] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const { selectedRole, loading } = props

  const onSuccess = (result) => {
    history.push(`/payment-report/edit/${result.data.id}`)
  }
  const handleNew = () => {
    props.postReport(onSuccess)
  }

  // fetch data
  const handleSuccess = (result) => {
    setLoader(false)
    console.log('result :>> ', result)
    if (result) {
      setPaymentData([...paymentData, ...result.data.payment.data])
      setInfo(result.data.payment)
    }
  }
  const fail = (e) => {
    setLoader(false)
  }
  const fetchPayment = (currentPage) => {
    props.getReport('payment', currentPage, handleSuccess, fail)
  }
  useEffect(() => {
    fetchPayment(1)
  }, [])

  //   pagination function

  const handleLoadMore = (e) => {
    let bottom =
      e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop < 20
    console.log('bottom :>> ', bottom)
    if (paginationInfo.last_page > currentPage) {
      if (bottom && !loader) {
        let page = currentPage + 1
        fetchPayment(page)
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
                Payment Report
              </Typography>
            </div>
          </div>
          <div className={classes.addNew}>
            <div className={classes.cursor} onClick={handleNew}>
              <img src={AddIcon} alt="add" />
              <Typography className="new">New</Typography>
            </div>
          </div>
          <PaymentCard
            data={paymentData}
            loading={loader}
            setPaymentData={setPaymentData}
            setInfo={setInfo}
            setLoader={setLoader}
            fetchPayment={fetchPayment}
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

export default connect(mapStateToProps, { postReport, getReport })(Payment)
