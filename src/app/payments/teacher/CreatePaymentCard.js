import React, { useState, useEffect } from 'react'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import * as moment from 'moment'
import EditIcon from '../../../assets/images/Edit.svg'
import { getPayment } from '../../redux/actions/payment.action'
import { removePayment } from '../../redux/actions/payment.action'
import { connect } from 'react-redux'
import { CircularProgress } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { SnackBarRef } from '../../../SnackBar'
import Confirm from '../../common/confirm'

const useStyle = makeStyles((theme) => ({
  loader: {
    textAlign: 'center',
    width: '100%',
  },
  message: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Avenir Book',
  },
  messageDiv: {
    padding: '20px',
  },
  span: {
    textTransform: 'capitalize',
  },
  typography: {
    cursor: 'pointer',
  },
  card: {
    width: '100%',
    margin: '0 20px 20px 20px',
  },
  editBtn: {
    marginLeft: 'auto',
    cursor: 'pointer',
  },
  labelText: {
    fontStyle: 'normal',
    color: '#1C1C1E',
    fontSize: 14,
    fontFamily: 'Avenir Book',
    // marginBottom: "12px",
  },
  Del_img: {
    cursor: 'pointer',
    marginLeft: '10px',
  },
  editBtn: {
    width: '19px',
    height: '19px',
    transform: 'translateY(4px)',
    cursor: 'pointer',
    marginTop: '-3px',
  },
  cardContent: {
    padding: '20px !important',
    overflow: 'auto',
  },
  textAlignRight: {
    fontStyle: 'normal',
    textAlign: 'right',
    color: '#AEAEB2',
    fontSize: 14,
    fontFamily: 'Avenir Book',
  },
  imgDiv: {
    display: 'flex',
    justifyContent: 'flex-end',
    transform: 'translateY(5px)',
    color: '#AEAEB2',
    paddingTop: '12px',
  },
  circularProgress: {
    display: 'flex',
    padding: '20px',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Avenir Heavy',
    fontSize: 14,
    color: '#1C1C1E',
    paddingBottom: '12px',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  infiniteScroll: {
    width: '100%',
    // display: "flex",
    paddingBottom: '80px',
  },
}))

function CreatePaymentCard(props) {
  const classes = useStyle()
  const { data, loading, paginationInfo, hasMore, delLoading } = props
  const history = useHistory()
  const [open, setOpen] = useState(false)
  const [id, setId] = useState('')

  let paymentData = props.paymentData || []

  const handleClickDel = (id) => {
    setOpen(true)
    setId(id)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const onSuccess = () => {
    SnackBarRef.open('', true, 'Payment deleted successfully')
    props.setData({})
    props.setPayment([])
    props.setLoader(true)
    props.setRefetch(Math.random())
    handleClose()
  }
  const onFail = (error) => {
    console.log('error', error)
    if (error) {
      SnackBarRef.open('', false, error.message)
    }
  }
  const handleDelete = () => {
    props.removePayment(id, onSuccess, onFail)
  }

  return (
    <>
      <Confirm
        open={open}
        handleClose={handleClose}
        onhandleDelete={handleDelete}
        loading={delLoading}
      />

      {paymentData.length ? (
        <Grid container direction="row" justify="center" alignContent="center">
          {paymentData.map((item) => (
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Grid container>
                  <Grid item xs={8}>
                    <span
                      onClick={() =>
                        history.push(
                          `/create-payment/payment-details/${item.id}`,
                        )
                      }
                    >
                      {item.data.title ? (
                        <Typography className={classes.title}>
                          {item.data.title}
                        </Typography>
                      ) : (
                        <Typography className={classes.title}>N/A</Typography>
                      )}
                    </span>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography className={`${classes.textAlignRight}`}>
                      {moment(item.created_at).format('DD MMM, hh:mm A')}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={8}>
                    <Typography className={classes.labelText}>
                      <Typography
                        className={`${classes.typography}`}
                      ></Typography>
                      {item.data.summary}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography className={`${classes.textAlignRight}`}>
                      <span className={`${classes.span}`}>
                        {item.notify_status}
                      </span>
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} className={classes.imgGrid}>
                    {item.notify_status === 'published' ||
                    item.notify_status === 'active' ? (
                      ''
                    ) : (
                      <div className={`${classes.imgDiv}`}>
                        <img
                          src={EditIcon}
                          className={classes.editBtn}
                          onClick={() =>
                            history.push(`/create-payment/edit/${item.id}`)
                          }
                        />
                        <div
                          className={classes.Del_img}
                          onClick={() => handleClickDel(item.id)}
                        >
                          <DeleteOutlineOutlinedIcon fontSize={'medium'} />
                        </div>
                      </div>
                    )}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Grid>
      ) : !props.loader ? (
        <Typography className={classes.message}>
          No payment available yet!
        </Typography>
      ) : (
        ''
      )}
      {props.loader ? (
        <div className={classes.loader}>
          <CircularProgress color="primary" size={30} />
        </div>
      ) : (
        ''
      )}
    </>
  )
}

const mapStateToProps = (state) => {
  const {
    getPayment,
    getPaymentLoading,
    hasMore,
    getPaymentInfo,
    deleteLoading,
  } = state.Payment
  const userInfo = state.auth.userInfo || {}
  const userClasses = userInfo.user_classes || {}
  return {
    data: getPaymentInfo,
    loading: getPaymentLoading,
    delLoading: deleteLoading,
    paginationInfo: getPayment,
    selectedRole: state.auth.selectedRole,
    school_id: userClasses.school_id,
    hasMore: hasMore,
  }
}

export default connect(mapStateToProps, { getPayment, removePayment })(
  CreatePaymentCard,
)
