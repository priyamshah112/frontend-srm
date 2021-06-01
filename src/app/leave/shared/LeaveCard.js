import React from 'react'
import { makeStyles, Box, Typography, Grid } from '@material-ui/core'
import Moment from 'react-moment'
import CloseIcon from '@material-ui/icons/Close'
import { colors } from '../../common/ui/appStyles'

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: 'none',
    borderRadius: '5px',
    marginTop: '20px',
    padding: '20px',
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    width: 'calc(100% - 40px)',
    margin: '0 auto',
  },
  leftColumn: {
    textAlign: 'justify',
  },
  leaveReason: {
    'white-space': 'pre-wrap',
  },
  leaveDate: {
    fontFamily: 'Avenir Medium',
    fontSize: '14px',
    color: '#1C1C1E',
    paddingBottom: '10px',
  },
  leaveDetails: {
    color: colors.lightGrey,
  },
  pb10: {
    paddingBottom: '10px',
  },
  rightColumn: {
    paddingTop: '15px',
    textAlign: 'right',
  },
  PENDING: {
    marginBottom: '4px',
    paddingTop: '4px',
  },
  SEEN: {
    color: '#40BD13',
  },
  APPROVED: {
    color: '#40BD13',
  },
  CANCELLED: {
    color: '#D92424',
  },
  REJECTED: {
    color: '#D92424',
  },
  statusText: {
    fontSize: '14px',
    paddingTop: '8px',
  },
  cancelBtnIcon: {
    fontSize: '18px',
    marginRight: '16px',
    backgroundColor: '#fff',
    borderRadius: '50%',
    border: '1px solid red',
    marginTop: '-12px',
    color: '#D92424',
  },
}))

const LeaveStatus = (props) => {
  const classes = useStyles()
  const { status } = props

  const normalizeStatus = (status) => {
    const temp = status.toLowerCase()
    return temp.charAt(0).toUpperCase() + temp.slice(1)
  }

  return (
    <Typography className={`${classes[status]} ${classes.statusText}`}>
      {normalizeStatus(status)}
    </Typography>
  )
}

const LeaveCard = (props) => {
  const classes = useStyles()
  const { leave, cancelBtnHandler } = props

  return (
    <Grid container className={classes.root}>
      <Grid item xs={9} className={classes.leftColumn}>
        <Box className={classes.leaveReason}>
          <Typography className={classes.leaveDate}>
            <Moment format="D MMM YYYY">{leave.start_date}</Moment>
            &nbsp; &nbsp; -&nbsp; &nbsp;
            <Moment format="D MMM YYYY">{leave.end_date}</Moment>
          </Typography>
          <Box className={classes.leaveDetails}>
            {leave.full_day ? (
              <Typography variant="subtitle2" className={classes.pb10}>
                Full Day
              </Typography>
            ) : leave.half_day_half === 0 ? (
              <Typography variant="subtitle2">Half day - First Half</Typography>
            ) : (
              <Typography variant="subtitle2">
                Half day - Second Half
              </Typography>
            )}
            <Typography variant="subtitle2">Reason - {leave.reason}</Typography>
          </Box>
        </Box>
      </Grid>

      <Grid item xs={3} className={classes.rightColumn}>
        {leave.leave_status === 'PENDING' ? (
          <CloseIcon
            color="action"
            className={classes.cancelBtnIcon}
            style={{ cursor: cancelBtnHandler ? 'pointer' : 'unset' }}
            onClick={(_event) => cancelBtnHandler(leave.leave_code)}
            value={leave.leave_code}
          />
        ) : null}
        <LeaveStatus status={leave.leave_status} />
      </Grid>
    </Grid>
  )
}

export default LeaveCard
