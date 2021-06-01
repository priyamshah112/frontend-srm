import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import BackIcon from '../../../assets/images/Back.svg'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import MultiDiaryTabs from './MultiDiaryTabs'
import { useHistory, useParams, useLocation } from 'react-router-dom'
import { diarySeenUnseen } from '../../redux/actions/attendence.action'
import { connect } from 'react-redux'
import * as moment from 'moment'
import { CircularProgress } from '@material-ui/core'

const useStyle = makeStyles((theme) => ({
  card: {
    marginBottom: '20px',
  },
  sectionContainer: {
    flexWrap: 'wrap',
    margin: '20px',
    marginBottom: '85px',
  },
  headingDiv: {
    margin: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backImg: {
    float: 'left',
    // transform: 'translateY(7px)',
    cursor: 'pointer',
    position: 'absolute',
    left: '20px',
  },
  themeColor: {
    color: `${theme.palette.common.deluge}`,
    padding: 0,
    margin: 0,
    fontFamily: 'Avenir',
    fontSize: 14,
  },
  titleText: {
    fontFamily: 'Avenir Medium',
    color: '#1C1C1E',
  },

  textAlignRight: {
    fontStyle: 'normal',
    textAlign: 'right',
    color: '#AEAEB2',
    fontSize: 14,
    fontFamily: 'Avenir Roman',
  },
  imgDiv: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
  },
  labelText: {
    fontStyle: 'normal',
    color: '#1C1C1E',
    fontSize: 14,
    fontFamily: 'Avenir Book',
    // marginBottom: "12px",
    lineHeight: '19px',
  },
  span: {
    textTransform: 'uppercase',
  },
  circularProgress: {
    display: 'flex',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Avenir Heavy',
    fontSize: 14,
    color: '#2C2C2E',
    paddingBottom: '12px',
  },
}))

function MultiDiaryDetails(props) {
  const classes = useStyle()
  const { id, student_id, selectedTab } = useParams()
  const history = useHistory()
  const { data, dataLoading, selectedRole } = props
  const diary = data.diary || {}

  const fetchData = () => {
    props.diarySeenUnseen(id, selectedRole)
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      {dataLoading ? (
        <div className={classes.circularProgress}>
          <CircularProgress />
        </div>
      ) : (
        <div className={classes.sectionContainer}>
          <div className={classes.headingDiv}>
            <img
              src={BackIcon}
              alt="Back"
              className={classes.backImg}
              onClick={() => {
                history.push({
                  pathname: `/diary/${student_id}/tab/${selectedTab}`,
                })
              }}
            />
            <Typography
              style={{ fontSize: 18 }}
              className={`${classes.themeColor} ${classes.titleText}`}
            >
              Diary Details
            </Typography>
          </div>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Grid container>
                <Grid item xs={8}>
                  <span>
                    <Typography className={classes.title}>
                      {diary.title}
                    </Typography>
                  </span>
                </Grid>
                <Grid item xs={4}>
                  <Typography className={`${classes.textAlignRight}`}>
                    {moment(diary.created_at).format('DD MMM,hh:mm A')}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={8}></Grid>
                <Grid item xs={4}>
                  <Typography className={` ${classes.textAlignRight}`}>
                    <span className={`${classes.span}`}>{diary.status}</span>
                  </Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={8}>
                  <Typography className={classes.labelText}>
                    <Typography></Typography>
                    {diary.description}
                  </Typography>
                </Grid>
                <Grid item xs={4}></Grid>
              </Grid>
            </CardContent>
          </Card>
          <MultiDiaryTabs
            seenUsers={data.seen_users}
            unseenUsers={data.unseen_users}
          />
        </div>
      )}
    </>
  )
}

const mapStateToProps = (state) => {
  const { diarySeenUnseen = [], diarySeenUnseenLoading } = state.Attendence
  const userInfo = state.auth.userInfo || {}
  const userClasses = userInfo.user_classes || {}
  return {
    data: diarySeenUnseen,
    dataLoading: diarySeenUnseenLoading,
    selectedRole: state.auth.selectedRole,
    school_id: userClasses.school_id,
  }
}

export default connect(mapStateToProps, {
  diarySeenUnseen,
})(MultiDiaryDetails)
