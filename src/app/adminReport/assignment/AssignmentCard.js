import React, { useState, useEffect } from 'react'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import * as moment from 'moment'
import InfoIcon from '../../../assets/images/diary/library/Info.svg'
import DownloadSVG from '../../../assets/images/assignment/download.svg'
import { connect } from 'react-redux'
import { CircularProgress } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import LinearProgress from '@material-ui/core/LinearProgress'
import { SnackBarRef } from '../../../SnackBar'
import Confirm from '../../common/confirm'
import { deleteReport, downloadReport } from '../../redux/actions/report.action'
import Popover from '@material-ui/core/Popover'
import Axios from 'axios'
import { downloadReportEndpoint } from '../../redux/api/endpoint-constants'

const useStyle = makeStyles((theme) => ({
  message: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Avenir Book',
    padding: '20px',
  },
  span: {
    textTransform: 'capitalize',
  },
  card: {
    // width: '100%',
    margin: '20px 20px 0 20px',
  },
  Del_img: {
    cursor: 'pointer',
    marginLeft: '20px',
  },
  downloadBtn: {
    width: '19px',
    height: '19px',
    transform: 'translateY(4px)',
    cursor: 'pointer',
    // marginTop: '-3px',
    marginLeft: '20px',
  },
  infoBtn: {
    width: '25px',
    height: '23px',
    transform: 'translateY(4px)',
    cursor: 'pointer',
    marginLeft: '5px',
    marginTop: '-4px',
  },
  cardContent: {
    padding: '20px !important',
    overflow: 'auto',
    // margin: '10px',
  },
  textAlignRight: {
    // fontStyle: 'normal',
    textAlign: 'right',
    color: '#AEAEB2',
    fontSize: 14,
    fontFamily: 'Avenir Book',
  },
  imgDiv: {
    display: 'flex',
    justifyContent: 'flex-end',
    // margin: "-2px 0",
    transform: 'translateY(5px)',
    color: '#AEAEB2',
  },
  circularProgress: {
    display: 'flex',
    justifyContent: 'center',
    margin: '8px',
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
  iconContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
  popoverMessage: {
    display: 'flex',
    flexDirection: 'column',
    padding: '12px 12px 0 12px',
  },
  popoverLabel: {
    fontFamily: 'Avenir Medium',
    fontSize: 14,
    color: '#000000',
  },
  popoverText: {
    fontFamily: 'Avenir Book',
    fontSize: 14,
    color: '#000000',
    marginBottom: '12px',
  },
}))

function AssignmentCard(props) {
  const classes = useStyle()
  const [open, setOpen] = useState(false)
  const [id, setId] = useState('')
  const [refetch, setRefetch] = useState(false)
  const [info, setItem] = useState({})
  const [anchorEl, setAnchorEl] = React.useState(null)
  const history = useHistory()
  const { data, loading } = props

  const handleClickDel = (id) => {
    setOpen(true)
    setId(id)
  }

  const handleCloseNO = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (refetch) {
      props.fetchAssignment(1)
    }
  }, [refetch])
  const handleSuccess = () => {
    SnackBarRef.open('', true, 'Report deleted successfully')
    props.setAssignmentData([])
    props.setInfo({})
    props.setLoader(true)
    setRefetch(Math.random())
    setOpen(false)
  }
  const handleFail = (error) => {
    console.log('error', error)
    if (error) {
      SnackBarRef.open('', false, error.message)
    }
  }
  const handleDelete = () => {
    props.deleteReport(id, handleSuccess, handleFail)
  }

//  download report
  const downloadReport = (id) => {
    const params = {}
    const token = localStorage.getItem('srmToken')
    Axios({
      url: `${downloadReportEndpoint}/${id}?get_type=assignment&get_report=sheet`,
      method: 'GET',
      params,
      responseType: 'blob',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log('response :>> ', response)
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'assignment.xlsx')
        document.body.appendChild(link)
        link.click()
        // exportSuccess()
      })
      .catch(() => {
        // exportFail()
      })
  }

  // popover
  const infoOnHover = (item) => {
    setItem(item)
  }
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const openInfo = Boolean(anchorEl)

  return (
    <>
      <Confirm
        open={open}
        handleClose={handleCloseNO}
        onhandleDelete={handleDelete}
        loading={props.deleteLoading}
      />

      {!data.length && !loading ? (
        <Typography className={classes.message}>
          No assignment report available yet!
        </Typography>
      ) : (
        ''
      )}
      {data.map((item) => {
        return (
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Grid container>
                <Grid item xs={8}>
                  <span
                    onClick={() =>
                      history.push(`/assignment-report/details/${item.id}`)
                    }
                  >
                    {item.title ? (
                      <Typography className={classes.title}>
                        {item.title}
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
              <Grid container className={classes.iconContainer}>
                <div className={`${classes.imgDiv}`}>
                  <img
                    src={InfoIcon}
                    className={classes.infoBtn}
                    onMouseEnter={(e) => {
                      handlePopoverOpen(e)
                      infoOnHover(item)
                    }}
                    onMouseLeave={handlePopoverClose}
                  />
                  <img
                    src={DownloadSVG}
                    className={classes.downloadBtn}
                    onClick={() => downloadReport(item.id)}
                  />
                  <div
                    className={classes.Del_img}
                    onClick={() => handleClickDel(item.id)}
                  >
                    <DeleteOutlineOutlinedIcon fontSize={'medium'} />
                  </div>
                </div>
              </Grid>
            </CardContent>
          </Card>
        )
      })}
      {loading ? (
        <div className={classes.circularProgress}>
          <CircularProgress color="primary" size={30} />
        </div>
      ) : (
        ''
      )}
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={openInfo}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <div className={classes.popoverMessage}>
          <Typography className={classes.popoverLabel}>From Date:</Typography>
          <Typography className={classes.popoverText}>
            {moment(info.from_date).format('DD MMMM YYYY')}
          </Typography>
          <Typography className={classes.popoverLabel}>To Date:</Typography>
          <Typography className={classes.popoverText}>
            {moment(info.to_date).format('DD MMMM YYYY')}
          </Typography>
        </div>
      </Popover>
    </>
  )
}

const mapStateToProps = (state) => {
  const { deleteReportLoading } = state.Report
  const userInfo = state.auth.userInfo || {}
  const userClasses = userInfo.user_classes || {}
  return {
    deleteLoading: deleteReportLoading,
    selectedRole: state.auth.selectedRole,
    school_id: userClasses.school_id,
  }
}

export default connect(mapStateToProps, { deleteReport, downloadReport })(
  AssignmentCard,
)
