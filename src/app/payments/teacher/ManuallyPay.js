import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import { Typography, makeStyles, Grid, Button } from '@material-ui/core'
import { useTheme } from '@material-ui/styles'
import NumberFormat from 'react-number-format'
import BackIcon from '../../../assets/images/Back.svg'
import { paymentById } from '../../redux/actions/payment.action'
import { postPay } from '../../redux/actions/payment.action'
import { CircularProgress } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import CommentSection from './CommentSec'
import { SnackBarRef } from '../../../SnackBar'
import DownloadSVG from '../../../assets/images/assignment/download.svg'
import { useReactToPrint } from 'react-to-print'
import Receipt from '../Reciept'

const useStyles = makeStyles((theme) => ({
  download: {
    textAlign: 'right',
    cursor: 'pointer',
  },
  print: {
    display: 'none',
  },
  sectionContainer: {
    padding: '20px',
    '& .MuiButton-root': {
      textTransform: 'capitalize',
    },
  },
  card: {
    boxShadow: 'none',
    background: '#FFFFFF 0% 0% no-repeat padding-box',
    borderRadius: '10px',
    margin: '20px',
  },
  mainHeader: {
    width: '100%',
  },
  mainHeadertext: {
    fontSize: 18,
    fontFamily: 'Avenir Medium',
    width: '100%',
    textAlign: 'center',
    color: '#1C1C1E',
  },
  backImg: {
    paddingTop: '5px',
    cursor: 'pointer',
    width: 10,
    height: 18,
  },
  card: {
    boxShadow: 'none',
    background: '#FFFFFF 0% 0% no-repeat padding-box',
    borderRadius: '10px',
    marginTop: '20px',
  },
  cardHeader: {
    padding: '20px 20px 0 20px',
  },
  cardTitle: {
    fontSize: 14,
    fontStyle: 'normal',
    fontFamily: 'Avenir Heavy',
    fontWeight: 500,
    textAlign: 'center',
  },
  cardContent: {
    padding: '0 20px 20px 20px',
    '&:last-child': {
      paddingBottom: '20px',
    },
  },
  CircularProgress: {
    margin: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '85%',
  },
  cardContentText: {
    fontFamily: 'Avenir Book',
    fontSize: 14,
    color: '#1C1C1E',
    marginRight: '20px',
    marginTop: '12px',
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
  sideMargins: {
    marginLeft: '20px',
    marginRight: '20px',
  },
  margin: {
    marginTop: '15px',
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
  textAlignLeft: {
    textAlign: 'left',
    // color: "#AEAEB2",
    fontFamily: 'Avenir Book',
    fontSize: 14,
    color: '#AEAEB2',
    marginBottom: '12px',
  },
  commentSection: {
    paddingBottom: '65px',
  },
  circularProgress: {
    textAlign: 'center',
    margin: '20px',
  },
}))

const ManuallyPay = (props) => {
  const classes = useStyles()
  const theme = useTheme()
  const history = useHistory()
  const { id } = useParams()
  const [paymentStatus, setPaymentStatus] = useState('not-paid')
  const [remarks, setRemarks] = useState('')
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)
  const { postLoading, createLoading, selectedRole } = props
  const amount = data.amount_due
  const userData = data.user || {}
  const userClass = data.user_class || {}
  console.log('data :>> ', data)

  const handleSuccess = (result) => {
    setLoading(false)
    if (result) {
      // console.log('result :>> ', result)
      setData(result.data)
    }
  }
  const handelFail = () => {
    setLoading(false)
  }
  const fetchData = () => {
    setLoading(true)
    props.paymentById(id, handleSuccess, handelFail)
  }
  useEffect(() => {
    fetchData()
  }, [])
  const handleChangeStatus = (e) => {
    setPaymentStatus(e.target.value)
  }
  const handleRemarks = (e) => {
    setRemarks(e.target.value)
  }
  const onSuccess = () => {
    SnackBarRef.open('', true, 'Payment paid successfully')
    history.push(`/create-payment/payment-details/${data.notification_id}`)
    // props.paymentById(id)
  }
  const onFail = (error) => {
    console.log('error', error)
    if (error) {
      SnackBarRef.open('', false, error.message)
    }
  }

  const handlePublish = () => {
    let postData = {
      mode: paymentStatus,
      amount_paid:
        paymentStatus === 'Half waived'
          ? amount / 2
          : paymentStatus === 'Full waived'
          ? '0'
          : amount,
      remarks: remarks,
      razorpay_payment_id: '',
      razorpay_order_id: '',
      razorpay_signature: '',
    }
    if (paymentStatus !== 'not-paid') {
      props.postPay(id, selectedRole, postData, onSuccess, onFail)
    }
  }

  // save pdf
  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  return loading ? (
    <div className={classes.circularProgress}>
      <CircularProgress />
    </div>
  ) : (
    <>
    {data && !loading ? (
      <div className={classes.print}>
        <div ref={componentRef}>
          <Receipt receipt={data} />
        </div>
      </div>
    ) : (
      ''
    )}
      <div className={classes.sectionContainer}>
        <div className={classes.mainHeader}>
          <Grid container>
            <Grid item xs={1}>
              <img
                src={BackIcon}
                alt="Back"
                className={classes.backImg}
                onClick={() => {
                  history.goBack()
                }}
              />
            </Grid>
            <Grid item xs={10}>
              <div className={classes.mainHeadertext}>
                <Typography>Payment Details</Typography>
              </div>
            </Grid>
            <Grid item xs={1} className={classes.download}>
              {data.status === '1' ? (
                <img
                  src={DownloadSVG}
                  onClick={handlePrint}
                  alt="download"
                  width="23"
                  height="24"
                />
              ) : (
                ''
              )}
            </Grid>
          </Grid>
        </div>
        <Card className={classes.card}>
          <CardHeader
            className={classes.cardHeader}
            title={
              <>
                <Typography className={classes.cardTitle}>
                  {data.payment_title}
                </Typography>
              </>
            }
          />
          <CardContent classes={{ root: classes.cardContent }}>
            <Typography className={classes.cardContentText}>
              {userData ? userData.fullName : ''}
            </Typography>
            <div style={{ display: 'flex' }}>
              {userClass.className ? (
                <Typography className={classes.cardContentText}>
                  Class - {userClass.className}
                </Typography>
              ) : (
                ''
              )}
              {data.status === '1' ? (
                <Typography className={classes.cardContentText}>
                  Amount Paid: ₹{data.amount_paid / 100}
                </Typography>
              ) : (
                <Typography className={classes.cardContentText}>
                  Amount Due: ₹{data.amount_due / 100}
                </Typography>
              )}
            </div>
            {data.status === '1' ? (
              ''
            ) : (
              <>
                <Box className={`${classes.margin}`}>
                  <FormControl className={classes.fieldStyle}>
                    <InputLabel>Payment Status</InputLabel>
                    <Select
                      labelId="demo-mutiple-chip-label"
                      id="demo-mutiple-chip"
                      value={paymentStatus}
                      onChange={handleChangeStatus}
                    >
                      <MenuItem value="not-paid">Not Paid</MenuItem>
                      <MenuItem value="Manually Paid">Manually Paid</MenuItem>
                      <MenuItem value="Online Paid">Online Paid</MenuItem>
                      <MenuItem value="Half waived">Half waived</MenuItem>
                      <MenuItem value="Full waived">Full waived</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box className={`${classes.margin}`}>
                  <FormControl className={classes.fieldStyle}>
                    <Typography className={classes.textAlignLeft}>
                      Remarks
                    </Typography>
                    <TextField
                      className={classes.textArea}
                      id="outlined-multiline-static"
                      label=""
                      multiline
                      rows={5}
                      value={remarks}
                      onChange={handleRemarks}
                      variant="outlined"
                    />
                  </FormControl>
                </Box>
              </>
            )}
          </CardContent>
        </Card>
        {data.status === '1' ? (
          ''
        ) : (
          <Grid container style={{ marginTop: '20px' }}>
            <Grid item xs={9}></Grid>
            <Grid item xs={3}>
              {postLoading || createLoading ? (
                <CircularProgress />
              ) : (
                <Button
                  id="publishBtn"
                  variant="contained"
                  className={`${classes.fieldStyle} ${'publishBtn'}`}
                  color="primary"
                  type="submit"
                  onClick={handlePublish}
                  disableElevation
                >
                  Save
                </Button>
              )}
            </Grid>
          </Grid>
        )}
      </div>
      {data ? (
        <div className={classes.commentSection}>
          <CommentSection />
        </div>
      ) : (
        ''
      )}
    </>
  )
}
const mapStateToProps = (state) => {
  const {
    paymentById,
    paymentByIdLoading,
    postPayLoading,
    createOrderLoading,
  } = state.Payment
  return {
    data: paymentById,
    loading: paymentByIdLoading,
    postLoading: postPayLoading,
    createLoading: createOrderLoading,
    selectedRole: state.auth.selectedRole,
    token: state.auth.token,
  }
}

export default connect(mapStateToProps, { paymentById, postPay })(ManuallyPay)
