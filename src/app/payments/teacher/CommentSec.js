import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import { Typography, makeStyles, Grid, Button } from '@material-ui/core'
import { useTheme } from '@material-ui/styles'
import { getComments } from '../../redux/actions/payment.action'
import { postComments } from '../../redux/actions/payment.action'
import { CircularProgress } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import * as moment from 'moment'

const useStyles = makeStyles((theme) => ({
  message: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Avenir Book',
    padding: '20px',
    // width: "100%",
  },
  loading: {
    width: '100%',
    textAlign: 'center',
    paddingTop: '8px',
  },
  hr: {
    marginBottom: '0px',
    color: '#AEAEB2',
    fontFamily: 'Avenir Book',
  },
  sectionContainer: {
    padding: '0px 20px 20px 20px',
    [theme.breakpoints.down('sm')]: {
      //   padding: "20px",
    },
    height: '100%',
    overflow: 'auto',
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
  card: {
    boxShadow: 'none',
    background: '#FFFFFF 0% 0% no-repeat padding-box',
    borderRadius: '10px',
    // marginTop: "20px",
    overflow: 'auto',
    height: '400px',
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
    // marginBottom: "12px",
  },
  cardContent: {
    padding: '0 20px 0 20px',
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
    width: '70%',
    // marginRight: "20px",
    // marginTop: "12px",
  },
  textAlignRight: {
    fontSize: 14,
    fontFamily: 'Avenir Book',
    color: '#AEAEB2',
    textAlign: 'right',
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
    '& .PrivateNotchedOutline-root': {
      borderWidth: 0,
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
  margin: {
    // marginTop: "15px",
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
  commentText: {
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'space-between',
  },
  commentCard: {
    marginTop: '20px',
    padding: '20px',
  },
  padding: {
    paddingTop: '12px',
  },
  commentContainer: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  errMessage: {
    textAlign: 'center',
    color: 'red',
    marginBottom: '20px',
  },
  hide: {
    display: 'none',
  },
  loader: {
    textAlign: 'center',
    width: '100%',
    margin: '8px',
  },
}))

const CommentSection = (props) => {
  const classes = useStyles()
  const history = useHistory()
  const { id } = useParams()
  const [error, setError] = useState('')
  const [commentText, setComments] = useState('')
  const [comments, setCommentData] = useState([])
  const [data, setData] = useState({})
  const [loader, setLoader] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const { loading, commentLoading } = props
  const [refetch, setRefetch] = useState(false)
  const token = localStorage.getItem('srmToken')

  // console.log("data :>> ", data);
  // const comments = data.data || [];
  const handleSuccess = (result) => {
    if (result) {
      setLoader(false)
      setCommentData([...comments, ...result.data.data])
      setData(result.data)
      console.log('result', result.data)
    }
  }
  const handleFail = (error) => {
    console.log('error', error)
    setLoader(false)
  }
  const fetchComments = (currentPage) => {
    props.getComments(id, currentPage, token, handleSuccess, handleFail)
  }

  useEffect(() => {
    fetchComments(1)
  }, [])
  const handleLoadMore = (e) => {
    console.log('event', e)
    console.log('data.current_page :>> ', data.current_page, data.last_page)
    // console.log("clientHeigh :>> ", e.target.clientHeigh);
    // console.log("scrollTop :>> ", e.target.scrollTop);
    // console.log("scrollHeight :>> ", e.target.scrollHeight);
    let bottom =
      e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop < 20
    console.log('bottom :>> ', bottom)
    if (data.last_page > currentPage) {
      if (bottom && !loader) {
        console.log('data :>> ', data)
        let page = currentPage + 1
        fetchComments(page)
        setLoader(true)
        setCurrentPage(page)
      }
    }
  }

  const handleComments = (e) => {
    setComments(e.target.value)
    setError('')
  }
  useEffect(() => {
    if (refetch) {
      fetchComments(1)
    }
  }, [refetch])
  const refetchComments = () => {
    setCommentData([])
    setRefetch(Math.random())
  }
  const onSuccess = () => {
    setLoader(true)
    refetchComments()
    setComments('')
  }
  const handlePublish = () => {
    if (commentText) {
      const comment = {
        comment: commentText,
      }
      props.postComments(id, comment, token, onSuccess)
    } else {
      setError('Add comment!')
    }
  }
  return (
    <>
      <div className={classes.sectionContainer}>
        <Card onScroll={handleLoadMore} className={classes.card}>
          <CardHeader
            className={classes.cardHeader}
            title={
              <>
                <Typography className={classes.cardTitle}>
                  Comment Section
                </Typography>
              </>
            }
          />
          {!comments.length && !loader ? (
            <Typography className={classes.message}>
              No comments available yet!
            </Typography>
          ) : (
            ''
          )}
          {comments.map((item, index) => (
            <CardContent classes={{ root: classes.cardContent }}>
              <div className={classes.commentContainer}>
                <div className={classes.commentText}>
                  <Typography className={classes.cardContentText}>
                    {item.comment}
                  </Typography>
                </div>
                <div className={classes.commentText}>
                  <Typography className={`${classes.textAlignRight}`}>
                    {item.commentator.fullName}
                  </Typography>
                  <Typography
                    className={`${classes.textAlignRight} ${classes.padding}`}
                  >
                    {moment(item.created_at).format('DD MMM YYYY, hh:mm A')}
                  </Typography>
                </div>
              </div>
              <hr
                className={`${classes.hr} ${
                  index === comments.length - 1 ? classes.hide : ''
                }`}
              />
            </CardContent>
          ))}
          {loader ? (
            <div className={classes.loader}>
              <CircularProgress color="primary" size={30} />
            </div>
          ) : (
            ''
          )}
        </Card>
        <Card className={classes.commentCard}>
          {error ? (
            <Typography className={classes.errMessage}>{error}</Typography>
          ) : (
            ''
          )}
          <Box className={`${classes.margin}`}>
            <FormControl className={classes.fieldStyle}>
              <TextField
                className={classes.textArea}
                id="outlined-multiline-static"
                label=""
                multiline
                rows={5}
                placeholder="Add comment"
                value={commentText}
                onChange={handleComments}
                variant="outlined"
              />
            </FormControl>
          </Box>
        </Card>
        <Grid container style={{ marginTop: '20px' }}>
          <Grid item xs={9}></Grid>
          <Grid item xs={3} style={{ textAlign: 'right' }}>
            {commentLoading ? (
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
                Comment
              </Button>
            )}
          </Grid>
        </Grid>
        <br />
        <br />
        <br />
      </div>
    </>
  )
}
const mapStateToProps = (state) => {
  const { getComments, getCommentsLoading, postCommentsLoading } = state.Payment
  return {
    data: getComments,
    loading: getCommentsLoading,
    commentLoading: postCommentsLoading,
    selectedRole: state.auth.selectedRole,
    token: state.auth.token,
  }
}

export default connect(mapStateToProps, { getComments, postComments })(
  CommentSection,
)
