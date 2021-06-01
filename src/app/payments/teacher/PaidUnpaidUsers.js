import React, { useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import StudentImage from '../../lunch/images/dummy.png'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import { useHistory, useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { paidUsers } from '../../redux/actions/payment.action'
import { unpaidUsers } from '../../redux/actions/payment.action'
import { CircularProgress } from '@material-ui/core'
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
  rootCard: {
    margin: '20px 0 20px 0',
    display: 'flex',
    justifyContent: 'space-between',
    cursor: 'pointer',
  },
  Avatar: {
    margin: '20px 0 20px 20px',
    width: 50,
    height: 50,
  },
  name: {
    fontFamily: 'Avenir Medium',
    fontSize: 14,
    color: '#1C1C1E',
    marginBottom: '12px',
    marginLeft: '10px',
  },
  className: {
    fontFamily: 'Avenir Book',
    fontSize: 14,
    color: '#1C1C1E',
    marginLeft: '10px',
  },
  stuName: {
    fontFamily: 'Avenir Book',
    fontSize: 14,
    marginTop: '-32px',
    color: '#1C1C1E',
    marginLeft: '10px',
  },
  borderLeft: {
    borderLeft: '1px solid #AEAEB2',
    height: '54px',
    textAlign: 'center',
  },
  created_at: {
    fontFamily: 'Avenir Book',
    fontSize: 14,
    color: '#AEAEB2',
    marginBottom: '12px',
  },
  paymentStatus: {
    fontFamily: 'Avenir Book',
    fontSize: 14,
    color: '#7B72AF',
  },
  borderRight: {
    '& .MuiTab-wrapper': {
      borderRight: '1px solid  #aeaeb2',
    },
  },
  nameContainer: {
    display: 'flex',
    width: '60%',
    '& .MuiCardContent-root': {
      padding: '20px 20px 20px 0',
    },
  },
  cardContent: {
    display: 'flex',
    alignItems: 'center',
  },
  textAlignRight: {
    width: '30%',
    textAlign: 'right',
  },
  circularProgress: {
    margin: '20px',
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
    fontFamily: 'Avenir Book',
    fontSize: 14,
    margin: '20px',
  },
}))

const PaidUnpaidUsers = (props) => {
  const classes = useStyles()
  const history = useHistory()
  const { id } = useParams()
  const { paid, paidLoading, unpaid, unpaidLoading } = props
  console.log('paid, unpaid :>> ', paid, unpaid)

  const userData = props.value ? unpaid : paid
  console.log('userData :>> ', userData)
  const fetchData = () => {
    if (props.value) {
      props.unpaidUsers(id)
    } else {
      props.paidUsers(id)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      {userData.length || paidLoading || unpaidLoading ? (
        ''
      ) : props.value ? (
        <Typography className={classes.message}>
          No unpaid users available!
        </Typography>
      ) : (
        <Typography className={classes.message}>
          No paid users available yet!
        </Typography>
      )}
      {paidLoading || unpaidLoading ? (
        <div className={classes.circularProgress}>
          <CircularProgress />
        </div>
      ) : (
        <>
          {userData.map((item) => (
            <Card
              className={classes.rootCard}
              onClick={() => history.push(`/create-payment/payment/${item.id}`)}
            >
              <Avatar
                className={classes.Avatar}
                alt="Student image"
                src={item.user.thumbnail ? item.user.thumbnail : StudentImage}
              />
              <div className={classes.nameContainer}>
                <CardContent>
                  <Typography className={classes.name}>
                    {item.user.fullName}
                  </Typography>
                  <Typography className={classes.className}>
                    {item.user_class.className}
                  </Typography>
                </CardContent>
                {/*<CardContent className={classes.cardContent}>
                  <div className={`${classes.borderLeft}`}></div>
                  <Typography className={classes.stuName}>mahendra</Typography>
          </CardContent>*/}
              </div>
              <CardContent className={classes.textAlignRight}>
                {!props.value ? (
                  <>
                    <Typography className={classes.created_at}>
                      {moment(item.paid_date).format('DD/MM/YY hh:mm A')}
                    </Typography>
                    <Typography className={classes.paymentStatus}>
                      {item.mode}
                    </Typography>
                  </>
                ) : (
                  ''
                )}
              </CardContent>
            </Card>
          ))}
        </>
      )}
    </>
  )
}

const mapStateToProps = (state) => {
  const {
    paidUsers,
    paidUsersLoading,
    unpaidUsers,
    unpaidUsersLoading,
  } = state.Payment
  const userInfo = state.auth.userInfo || {}
  const userClasses = userInfo.user_classes || {}
  return {
    paid: paidUsers,
    paidLoading: paidUsersLoading,
    unpaid: unpaidUsers,
    unpaidLoading: unpaidUsersLoading,
    selectedRole: state.auth.selectedRole,
    school_id: userClasses.school_id,
  }
}

export default connect(mapStateToProps, { paidUsers, unpaidUsers })(
  PaidUnpaidUsers,
)
