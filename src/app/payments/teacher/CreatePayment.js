import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import AddIcon from '../../../assets/images/Filled Add.svg'
import { CircularProgress, Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import CreatePaymentCard from './CreatePaymentCard'
import { useHistory } from 'react-router-dom'
import { postPayment } from '../../redux/actions/payment.action'
import BackdropLoader from '../../common/ui/backdropLoader/BackdropLoader'

const useStyles = makeStyles((theme) => ({
  container: {
    // margin: "15px",
    height: '100%',
    overflow: 'auto',
    paddingBottom: '50px',
    display: 'flex',
    flexDirection: 'column',
  },
  addNew: {
    color: theme.palette.common.deluge,
    float: 'right',
    cursor: 'pointer',
    marginRight: '15px',
    // width: "70px",
    // position: "absolute",
    // right: 0,
    // top: "70px",
    paddingBottom: '20px',
    '& .new': {
      float: 'right',
      fontSize: '14px',
      padding: '5px 5px 0 5px',
      fontWeight: 500,
    },
    '& img': {
      margin: '5px 5px 0 5px',
      height: '20px',
      cursor: 'pointer',
    },
  },
  head: {
    margin: '20px 20px 15px 20px',
    textAlign: 'center',
  },
  heading1: {
    fontSize: '18px',
    fontFamily: 'Avenir medium',
  },
}))

function CreatePayment(props) {
  const classes = useStyles()
  const history = useHistory()
  const { selectedRole, loading } = props
  const [data, setData] = useState({})
  const [paymentData, setPayment] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loader, setLoader] = useState(true)
  const [refetch, setRefetch] = useState(false)
  const baseUrl = process.env.REACT_APP_BACKEND_API_URL
  const token = localStorage.getItem('srmToken')

  console.log('paymentData :>> ', paymentData)
  const onSuccess = (result) => {
    history.push(`/create-payment/edit/${result.data.id}`)
  }
  const handleAdd = () => {
    props.postPayment(onSuccess)
  }
  const fetchData = (currentPage) => {
    fetch(
      `${baseUrl}/paymentNotifications?current_role=${selectedRole}&page=${currentPage}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then((res) => {
        console.log('inter request', res)
        if (res.ok) {
          return res.json()
        } else {
          return Promise.reject({
            status: res.status,
            statusText: res.statusText,
          })
        }
      })
      .then((res) => {
        console.log('inter response', res)
        setLoader(false)
        setPayment([...paymentData, ...res.data.data])
        setData(res.data)
        console.log('res :>> ', res)
      })
      .catch((err) => console.log(err.statusText))
  }
  useEffect(() => {
    fetchData(1)
  }, [])
  useEffect(() => {
    if (refetch) {
      fetchData(1)
    }
  }, [refetch])
  const handleLoadMore = (e) => {
    // console.log("clientHeigh :>> ", e.target.clientHeigh);
    // console.log('scrollTop :>> ', e.target.scrollTop)
    // console.log("scrollHeight :>> ", e.target.scrollHeight);
    let bottom =
      e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop < 20
    // console.log('bottom :>> ', bottom)
    if (data.last_page > currentPage) {
      if (bottom && !loader) {
        let page = currentPage + 1
        fetchData(page)
        setLoader(true)
        setCurrentPage(page)
      }
    }
  }
  // scroll above

  return (
    <>
      {loading ? (
        <BackdropLoader open={loading} />
      ) : (
        <div className={classes.container} onScroll={handleLoadMore}>
          <div className={classes.head}>
            <span className={classes.heading1}>Create Payment</span>
          </div>
          {selectedRole === 'teacher' || selectedRole === 'admin' ? (
            <div>
              <div className={classes.addNew} onClick={handleAdd}>
                <img src={AddIcon} alt="add" />
                <Typography className="new">New</Typography>
              </div>
            </div>
          ) : (
            ''
          )}
          <CreatePaymentCard
            setData={setData}
            setPayment={setPayment}
            setRefetch={setRefetch}
            setLoader={setLoader}
            paymentData={paymentData}
            loader={loader}
          />
        </div>
      )}
    </>
  )
}

const mapStateToProps = (state) => {
  const { postPayment, postPaymentLoading } = state.Payment
  return {
    loading: postPaymentLoading,
    selectedRole: state.auth.selectedRole,
  }
}

export default connect(mapStateToProps, { postPayment })(CreatePayment)
