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
import PaymentTable from './Table'
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
    cursor: 'pointer',
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

function PaymentDetails(props) {
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

  console.log('report :>> ', report)

  const onSuccess = (result) => {
    if (result) {
      console.log('result :>> ', result)
      setLoader(false)
      setInfo(result.data.report)
      setData(result.data)
      setReport([...report, ...result.data.report.data])
    }
  }
  const fetchPaymentDetails = (currentPage) => {
    setLoader(true)
    props.getReportById(id, 'payment', currentPage, onSuccess)
  }
  useEffect(() => {
    fetchPaymentDetails(1)
  }, [])

  // download report
  const downloadReport = () => {
    const params = {}
    const token = localStorage.getItem('srmToken')
    Axios({
      url: `${downloadReportEndpoint}/${id}?get_type=payment&get_report=sheet`,
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
        link.setAttribute('download', 'payment.xlsx')
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
        fetchPaymentDetails(page)
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
                pathname: `/payment-report`,
              })
            }}
          />
          <Typography
            style={{ fontSize: 18 }}
            className={`${classes.themeColor} ${classes.titleText}`}
          >
            Payment Report Details
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
              <Typography className={classes.headText}>From Date:</Typography>
              <div className={`${classes.text} ${classes.font}`}>
                {moment(data.from_date).format('DD MMMM YYYY')}
              </div>
            </div>
            <div className={classes.rowDiv}>
              <Typography className={classes.headText}>To Date:</Typography>
              <div className={`${classes.text} ${classes.font}`}>
                {moment(data.to_date).format('DD MMMM YYYY')}
              </div>
            </div>
          </CardContent>
          <PaymentTable report={report} loading={loading} />
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
  PaymentDetails,
)
