import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import { Typography, makeStyles, Grid, Button } from '@material-ui/core'
import { useTheme } from '@material-ui/styles'
import NumberFormat from 'react-number-format'
import BackIcon from '../../../assets/images/Back.svg'
import TabBar from './TabBar'
import { getPaymentById } from '../../redux/actions/payment.action'
import { CircularProgress } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  hr: {
    marginBottom: '0px',
    color: '#AEAEB2',
    fontFamily: 'Avenir Book',
  },
  sectionContainer: {
    padding: '20px 20px 65px 20px',
  },
  descriptionContent: {
    color: '#1C1C1E',
    fontFamily: 'Avenir Book',
    fontSize: 14,
  },
  gridContainer: {
    paddingTop: '8px',
  },
  buttonContainer: {
    width: '100%',
    paddingTop: '15px',
  },
  button: {
    width: '100%',
  },
  card: {
    boxShadow: 'none',
    background: '#FFFFFF 0% 0% no-repeat padding-box',
    borderRadius: '10px',
    // margin: "20px",
  },
  mainHeader: {
    width: '100%',
    paddingTop: '15px',
  },
  mainHeadertext: {
    fontSize: 18,
    fontFamily: 'Avenir Medium',
    width: '100%',
    textAlign: 'center',
    color: '#1C1C1E',
  },
  backImg: {
    paddingLeft: '15px',
    paddingTop: '5px',
    cursor: 'pointer',
    width: 10,
    height: 18,
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
    fontFamily: 'Avenir Heavy',
    fontWeight: 500,
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
  },
  amount: {
    color: '#AEAEB2',
    fontFamily: 'Avenir Book',
    fontSize: 14,
  },
  CircularProgress: {
    margin: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '85%',
  },
}))

const PaymentDetails = (props) => {
  const classes = useStyles()
  const theme = useTheme()
  const history = useHistory()
  const { id } = useParams()
  const { data, loading } = props
  // const [isLoading, setIsLoading] = useState(true);
  // const [payment, setPayment] = useState(null);
  // const [successPayment, setSuccessPayment] = useState(false);
  // const [failurePayment, setFailurePayment] = useState(false);

  const paymentById = data.data || {}
  console.log('data :>> ', data)
  const fetchData = () => {
    props.getPaymentById(id)
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      {loading ? (
        <div className={classes.CircularProgress}>
          <CircularProgress />
        </div>
      ) : (
        <div className={classes.sectionContainer}>
          <Card className={classes.card}>
            <div className={classes.mainHeader}>
              <Grid container>
                <Grid item xs={1}>
                  <img
                    src={BackIcon}
                    alt="Back"
                    className={classes.backImg}
                    onClick={() => {
                      history.push('/create-payment')
                    }}
                  />
                </Grid>
                <Grid item xs={10}>
                  <div className={classes.mainHeadertext}>
                    <Typography>Payment Details</Typography>
                  </div>
                </Grid>
                <Grid item xs={1}></Grid>
              </Grid>
            </div>
            <CardHeader
              className={classes.cardHeader}
              title={
                <>
                  <Typography className={classes.cardTitle}>
                    {paymentById ? paymentById.title : ''}
                  </Typography>
                </>
              }
            />
            <CardContent classes={{ root: classes.cardContent }}>
              <Grid container direction="row" className={classes.gridContainer}>
                <div
                  className={`${classes.descriptionContent}`}
                  dangerouslySetInnerHTML={{
                    __html: paymentById ? paymentById.main_content : '',
                  }}
                />
              </Grid>

              <hr className={classes.hr} />
              <Grid container direction="row" className={classes.gridContainer}>
                <div className={classes.readClass}>
                  <Typography className={classes.amount}>
                    {'Amount: '}
                    <span>&#8377;</span>

                    <span>&nbsp;</span>
                    <NumberFormat
                      value={
                        paymentById ? parseInt(paymentById.payment) / 100 : ''
                      }
                      displayType={'text'}
                      thousandSeparator={true}
                      thousandsGroupStyle="lakh"
                    />
                  </Typography>
                </div>
              </Grid>
            </CardContent>
          </Card>
          <TabBar />
        </div>
      )}
    </>
  )
}
const mapStateToProps = (state) => {
  const { getPaymentById, getPaymentByIdLoading } = state.Payment
  return {
    data: getPaymentById,
    loading: getPaymentByIdLoading,
    selectedRole: state.auth.selectedRole,
    token: state.auth.token,
  }
}

export default connect(mapStateToProps, { getPaymentById })(PaymentDetails)
