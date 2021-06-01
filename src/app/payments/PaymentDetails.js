import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import {
  Typography,
  makeStyles,
  Grid,
  Button,
  CircularProgress,
} from '@material-ui/core'
import { useTheme } from '@material-ui/styles'
import NumberFormat from 'react-number-format'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import PaymentService from './PaymentService'
import GreenTick from '../../assets/images/greenTick.svg'
import BackIcon from '../../assets/images/Back.svg'
import CommentSection from './teacher/CommentSec'
import DownloadSVG from '../../assets/images/assignment/download.svg'
import { useReactToPrint } from 'react-to-print'
import Receipt from './Reciept'

const REACT_APP_RAZORPAY_KEY_ID = process.env.REACT_APP_RAZERPAY_KEY_ID

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles((theme) => ({
  hr: {
    marginBottom: '0px',
    color: '#8E8E93',
    fontFamily: 'Avenir Book',
  },
  sectionContainer: {
    padding: '20px',
    [theme.breakpoints.down('sm')]: {
      padding: '20px',
    },
  },
  descriptionContent: {
    fontFamily: 'Avenir Book',
    fontSize: 14,
    color: '#1C1C1E',
  },
  gridContainer: {
    // paddingTop: '8px',
    fontFamily: 'Avenir Book',
    fontSize: 14,
    color: '#1C1C1E',
  },
  buttonContainer: {
    width: '100%',
    paddingTop: '20px',
    '& .MuiButton-root': {
      textTransform: 'capitalize',
    },
  },
  button: {
    width: '100%',
  },
  card: {
    boxShadow: 'none',
    background: '#FFFFFF 0% 0% no-repeat padding-box',
    borderRadius: '10px',
    margin: '20px',
  },
  mainHeader: {
    width: '100%',
    paddingBottom: '20px',
  },
  mainHeadertext: {
    width: '100%',
    textAlign: 'center',
  },
  backImg: {
    // paddingLeft: "15px",
    paddingTop: '5px',
    cursor: 'pointer',
  },
  card: {
    boxShadow: 'none',
    background: '#FFFFFF 0% 0% no-repeat padding-box',
    borderRadius: '10px',
    // marginTop: "20px",
  },
  cardHeader: {
    padding: '15px 20px 0 20px',
  },
  iconButtonRoot: {
    padding: '8px',
  },
  titleIconSpan: {
    marginRight: '8px',
  },
  titleIcon: {
    transform: 'translateY(3px)',
  },
  greentick: {
    padding: '15px 5px 0px 0px',
  },
  cardTitle: {
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 500,
    fontFamily: 'Avenir Heavy',
  },
  cardActions: {
    padding: '0 20px 20px 20px',
  },
  cardContent: {
    padding: '5px 20px 20px 20px',
    '&:last-child': {
      paddingBottom: '20px',
    },
  },
  menuItem: {
    paddingLeft: '10px',
    paddingRight: '10px',
    colour: '#1C1C1E',
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
  menuTopItemMargin: {
    marginTop: '5px',
  },
  menuItemRoot: {
    padding: 0,
  },
  menuContainer: {
    backgroundColor: theme.palette.common.darkGray,
    color: 'black',
    minWidth: '150px',
    '&.MuiPaper-rounded': {
      boxShadow: '0px 6px 6px #00000029',
    },
    [theme.breakpoints.down('md')]: {
      minWidth: '150px',
    },
    [theme.breakpoints.down('sm')]: {
      minWidth: '150px',
    },
  },
  menuList: {
    width: '100% !important',
    padding: 0,
  },
  contentStyle: {
    color: `${theme.palette.common.lightFont}`,
    fontSize: '14px',
    fontStyle: 'normal',
  },
  readClass: {
    textAlign: 'right',
    width: '100%',
    paddingTop: '12px',
  },
  amount: {
    color: '#AEAEB2',
    fontFamily: 'Avenir Book',
    fontSize: 14,
    marginhTop: '12px',
  },
  circularProgress: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '85%',
  },
  download: {
    textAlign: 'right',
    cursor: 'pointer',
  },
  print: {
    display: 'none',
  },
  title: {
    fontFamily: 'Avenir Medium',
    fontSize: 18,
  },
}))

const PaymentDetails = (props) => {
  const classes = useStyles()
  const theme = useTheme()
  const history = useHistory()
  const { id, selectedTab } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  //   const [dataLoading, setLoading] = useState(false);
  const [payment, setPayment] = useState(null)
  const [successPayment, setSuccessPayment] = useState(false)
  const [failurePayment, setFailurePayment] = useState(false)
  const { selectedRole } = props

  const fetchDetails = async () => {
    try {
      const token = localStorage.getItem('srmToken')
      const response = await PaymentService.fetchPaymentById(token, id)
      if (response.status === 200) {
        setPayment(response.data.data)
      }
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    fetchDetails()
  }, [])
  useEffect(() => {
    if (payment) {
      setIsLoading(false)
    }
  }, [payment])

  const handlePay = async (event) => {
    try {
      event.preventDefault()
      const token = localStorage.getItem('srmToken')
      const response = await PaymentService.fetchOrderId(
        token,
        payment.notification_id,
        payment.id,
        payment.amount_due,
      )

      if (response.status === 200) {
        console.log(response.data.data.razorpay_order_id)
        const options = {
          key: REACT_APP_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
          amount: payment.amount_due, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: 'INR',
          name: 'SRM',
          description: 'Test Transaction',
          order_id: response.data.data.razorpay_order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          handler: async (response) => {
            console.log('response :>> ', response)
            try {
              const statusResponse = await PaymentService.verifySignature(
                token,
                {
                  mode: 'Online Paid',
                  amount_paid: payment.amount_due,
                  remarks: '',
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,

                  id: payment.id,
                  // notification_id: payment.notification_id,
                },
                id,
                selectedRole,
              )

              if (statusResponse.status === 200) {
                setSuccessPayment(true)
                fetchDetails()
              }
            } catch (e) {
              console.log(e)
            }
          },
          theme: {
            color: '#7B72AF',
          },
        }

        const razerPay = new window.Razorpay(options)
        razerPay.on('payment.failed', function (response) {
          console.log(response.error)
          setFailurePayment(true)
        })
        razerPay.open()
      }
    } catch (e) {
      console.log(e)
    }
  }

  const handdleSuccessClose = () => {
    setSuccessPayment(false)
    setFailurePayment(false)
  }

  // save pdf
  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })
  return (
    <>
      {payment ? (
        <div className={classes.print}>
          <div ref={componentRef}>
            <Receipt receipt={payment} />
          </div>
        </div>
      ) : (
        ''
      )}

      {!isLoading ? (
        <>
          <div className={classes.sectionContainer}>
            <>
              <div className={classes.mainHeader}>
                <Grid container>
                  <Grid item xs={1}>
                    <img
                      src={BackIcon}
                      alt="Back"
                      className={classes.backImg}
                      onClick={() => {
                        history.push(`/payments/tab/${selectedTab}`)
                      }}
                    />
                  </Grid>
                  <Grid item xs={10}>
                    <div className={classes.mainHeadertext}>
                      <Typography className={classes.title}>
                        Payment Details
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={1} className={classes.download}>
                    {payment.status === '1' ? (
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
                  action={
                    <>
                      {payment.status === '1' ? (
                        <img
                          src={GreenTick}
                          alt="done"
                          className={classes.greentick}
                        />
                      ) : (
                        ''
                      )}
                    </>
                  }
                  title={
                    <>
                      <Typography className={classes.cardTitle}>
                        {payment.payment_title}
                      </Typography>
                    </>
                  }
                />
                <CardContent classes={{ root: classes.cardContent }}>
                  <Grid
                    container
                    direction="row"
                    className={classes.gridContainer}
                  >
                    <div
                      className={`${classes.descriptionContent}`}
                      dangerouslySetInnerHTML={{
                        __html: payment.main_content,
                      }}
                    />
                  </Grid>

                  <hr className={classes.hr} />
                  <Grid container direction="row">
                    <div className={classes.readClass}>
                      {payment.status == 1 ? (
                        <Typography variant="body2" className={classes.amount}>
                          {'Amount Paid: '}
                          <span>&#8377;</span>

                          <span>&nbsp;</span>
                          <NumberFormat
                            value={parseInt(payment.amount_paid) / 100}
                            displayType={'text'}
                            thousandSeparator={true}
                            thousandsGroupStyle="lakh"
                          />
                        </Typography>
                      ) : (
                        <Typography variant="body2" className={classes.amount}>
                          {'Amount Due: '}
                          <span>&#8377;</span>

                          <span>&nbsp;</span>
                          <NumberFormat
                            value={parseInt(payment.amount_due) / 100}
                            displayType={'text'}
                            thousandSeparator={true}
                            thousandsGroupStyle="lakh"
                          />
                        </Typography>
                      )}
                    </div>
                  </Grid>
                </CardContent>
              </Card>
              {payment.status !== '1' ? (
                <div className={classes.buttonContainer}>
                  <Button
                    color="primary"
                    variant="contained"
                    className={classes.button}
                    onClick={handlePay}
                  >
                    Pay
                  </Button>
                </div>
              ) : (
                ''
              )}
            </>
          </div>
          <CommentSection />
        </>
      ) : (
        <div className={classes.circularProgress}>
          <CircularProgress />
        </div>
      )}
      <Snackbar
        open={successPayment}
        onClose={handdleSuccessClose}
        autoHideDuration={4000}
      >
        <Alert severity="success" onClose={handdleSuccessClose}>
          Payment Successful
        </Alert>
      </Snackbar>
      <Snackbar
        open={failurePayment}
        onClose={handdleSuccessClose}
        autoHideDuration={4000}
      >
        <Alert severity="error" onClose={handdleSuccessClose}>
          Payment Unsuccessfull
        </Alert>
      </Snackbar>
    </>
  )
}
const mapStateToProps = (state) => {
  return {
    selectedRole: state.auth.selectedRole,
    token: state.auth.token,
  }
}

export default connect(mapStateToProps)(PaymentDetails)
