import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import BackIcon from '../../../assets/images/Back.svg'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import { useHistory, useParams, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import * as moment from 'moment'
import { CircularProgress } from '@material-ui/core'
import DownloadSVG from '../../../assets/images/assignment/download.svg'
import AttendanceTable from './Table'
import {
  getReportById,
  downloadReport,
} from '../../redux/actions/report.action'
import Axios from 'axios'
import { downloadReportEndpoint } from '../../redux/api/endpoint-constants'

const useStyle = makeStyles((theme) => ({
  card: {
    marginBottom: '20px',
    padding: '0 20px 20px',
    margin: '0 20px',
    '& .MuiCardContent-root': {
      padding: '20px 0',
    },
    '& .MuiTableCell-root': {
      fontFamily: 'Avenir Medium',
      fontSize: 14,
      borderBottom: 'none',
    },
    '& .MuiPaper-elevation1': {
      boxShadow: 'none',
    },
  },
  sectionContainer: {
    flexWrap: 'wrap',
    // margin: '20px',
    marginBottom: '60px',
    height: '100vh',
    overflow: 'auto',
  },
  headingDiv: {
    margin: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backImg: {
    // float: 'left',
    // transform: 'translateY(7px)',
    cursor: 'pointer',
    // position: 'absolute',
    // left: '20px',
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
  circularProgress: {
    textAlign: 'center',
    marginTop: '8px',
  },
  title: {
    fontFamily: 'Avenir Heavy',
    fontSize: 14,
    color: '#2C2C2E',
    paddingBottom: '12px',
    textAlign: 'center',
  },
  downloadBtn: {
    // position: 'absolute',
    // right: '20px',
    cursor: 'pointer',
  },
  rowDiv: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  headText: {
    fontFamily: 'Avenir Medium',
    fontSize: 14,
    color: '#1C1C1E',
  },
  text: {
    width: '85%',
    marginBottom: '12px',
  },
  font: {
    fontFamily: 'Avenir Book',
    fontSize: 14,
    color: '#1C1C1E',
  },
}))

function AttendanceDetails(props) {
  const classes = useStyle()
  const { id } = useParams()
  const history = useHistory()
  const [reportLoading, setLoading] = useState(false)
  // const { selectedRole, data, loading } = props
  // const report = data.report || []
  const [data, setData] = useState({})
  const [report, setReport] = useState([])
  const [paginationInfo, setInfo] = useState({})
  const [loading, setLoader] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const month =
    data.month == 1
      ? 'January'
      : data.month == 2
      ? 'February'
      : data.month == 3
      ? 'March'
      : data.month == 4
      ? 'April'
      : data.month == 5
      ? 'May'
      : data.month == 6
      ? 'June'
      : data.month == 7
      ? 'July'
      : data.month == 8
      ? 'August'
      : data.month == 9
      ? 'September'
      : data.month == 10
      ? 'October'
      : data.month == 11
      ? 'November'
      : data.month == 12
      ? 'December'
      : ''

  const onSuccess = (result) => {
    if (result) {
      console.log('result :>> ', result)
      setLoader(false)
      setInfo(result.data.report)
      setData(result.data)
      setReport([...report, ...result.data.report.data])
    }
  }
  const fetchAttendanceDetails = (currentPage) => {
    setLoader(true)
    props.getReportById(id, 'attendance', currentPage, onSuccess)
  }
  useEffect(() => {
    fetchAttendanceDetails(1)
  }, [])

  // download report
  const downloadReport = () => {
    const params = {}
    const token = localStorage.getItem('srmToken')
    Axios({
      url: `${downloadReportEndpoint}/${id}?get_type=attendance&get_report=sheet`,
      method: 'GET',
      params,
      responseType: 'blob',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        setLoading(false)
        console.log('response :>> ', response)
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'attendance.xlsx')
        document.body.appendChild(link)
        link.click()
        // exportSuccess()
      })
      .catch(() => {
        // exportFail()
        setLoading(false)
      })
  }

  //   pagination function
  const handleLoadMore = (e) => {
    let bottom =
      e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop < 20
    console.log('bottom :>> ', bottom)
    if (paginationInfo.last_page > currentPage) {
      if (bottom && !loading) {
        let page = currentPage + 1
        fetchAttendanceDetails(page)
        setLoader(true)
        setCurrentPage(page)
      }
    }
  }

  return (
    <>
      <div onScroll={handleLoadMore} className={classes.sectionContainer}>
        <div className={classes.headingDiv}>
          <img
            src={BackIcon}
            alt="Back"
            className={classes.backImg}
            onClick={() => {
              history.push({
                pathname: `/attendance-report`,
              })
            }}
          />
          <Typography
            style={{ fontSize: 18 }}
            className={`${classes.themeColor} ${classes.titleText}`}
          >
            Attendance Report Details
          </Typography>
          {reportLoading ? (
            <div className={classes.downloadBtn}>
              <CircularProgress color="primary" size={20} />
            </div>
          ) : (
            <img
              src={DownloadSVG}
              className={classes.downloadBtn}
              onClick={downloadReport}
            />
          )}
        </div>

        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Grid container>
              <Grid item xs={12}>
                <span>
                  <Typography className={classes.title}>
                    {data.title}
                  </Typography>
                </span>
              </Grid>
            </Grid>
            <div className={classes.rowDiv}>
              <Typography className={classes.headText}>Class:</Typography>
              <div className={`${classes.text} ${classes.font}`}>
                {report.length ? report[0].class : ''}
              </div>
            </div>
            <div className={classes.rowDiv}>
              <Typography className={classes.headText}>For:</Typography>
              <div className={`${classes.text} ${classes.font}`}>
                {month} {data.year}
              </div>
            </div>
          </CardContent>
          <AttendanceTable report={report} loading={loading} />
          {loading ? (
            <div className={classes.circularProgress}>
              <CircularProgress color="primary" size={30} />
            </div>
          ) : (
            ''
          )}
        </Card>
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  const {
    getReportById,
    getReportByIdLoading,
    downloadReportLoading,
  } = state.Report
  const userInfo = state.auth.userInfo || {}
  const userClasses = userInfo.user_classes || {}
  return {
    reportLoading: downloadReportLoading,
    data: getReportById,
    loading: getReportByIdLoading,
    selectedRole: state.auth.selectedRole,
    school_id: userClasses.school_id,
  }
}

export default connect(mapStateToProps, { getReportById, downloadReport })(
  AttendanceDetails,
)
