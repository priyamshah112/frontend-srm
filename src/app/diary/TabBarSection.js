import 'date-fns'
import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import AddIcon from '../../assets/images/Filled Add.svg'
import GreenTick from '../../assets/images/diary/GreenTick.svg'
import GrayTick from '../../assets/images/diary/GrayTick.svg'
import MenuItem from '@material-ui/core/MenuItem'
import { Typography, makeStyles, CircularProgress } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { individualDiaryPost } from '../redux/actions/attendence.action'
import { individualDiaryPostParent } from '../redux/actions/attendence.action'
import { byTeacherDiary } from '../redux/actions/attendence.action'
import { byParentDiary } from '../redux/actions/attendence.action'
import { forParentDiary } from '../redux/actions/attendence.action'
import { forTeacherDiary } from '../redux/actions/attendence.action'
import { diaryDelete } from '../redux/actions/attendence.action'
import { putAcknowledgement } from '../redux/actions/attendence.action'
import { putAcknowledgementParent } from '../redux/actions/attendence.action'
import BackdropLoader from '../common/ui/backdropLoader/BackdropLoader'
import EditIcon from '../../assets/images/Edit.svg'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import * as moment from 'moment'
import { SnackBarRef } from '../../SnackBar'
import InfoIcon from '../../assets/images/diary/library/Info.svg'
import Popover from '@material-ui/core/Popover'
import ReadIcon from '../../assets/images/notifications/read.svg'
import UnReadIcon from '../../assets/images/notifications/unread.svg'
import Confirm from '../common/confirm'
import Dropdown from './Dropdown'

const useStyles = makeStyles((theme) => ({
  popoverMeassage: {
    display: 'flex',
    fontFamily: 'Avenir medium',
    fontSize: 20,
  },
  popoverTextName: {
    fontFamily: 'Avenir Roman',
    fontSize: 14,
    color: '#1C1C1E',
  },
  popoverTextDate: {
    fontFamily: 'Avenir Roman',
    fontSize: 14,
    marginLeft: '30px',
    color: '#1C1C1E',
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  datePicker: {
    width: '25%',
    paddingRight: '10px',
  },
  sectionContainer: {
   
  },

  header: {
    overflow: 'auto',
    padding: '0 20px 20px',
  },
  header2: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'left',
  },
  cardBoxPadding: {
    padding: '0px 24px 24px 24px',
    [theme.breakpoints.down('sm')]: {
      padding: '16px',
    },
  },
  addNew: {
    color: theme.palette.common.deluge,

    marginTop: '15px',
    // marginRight: "15px",
    cursor: 'pointer',
    '& .new': {
      float: 'right',
      fontSize: '14px',
      padding: '5px',
    },
    '& img': {
      margin: '5px',
      height: '20px',
      cursor: 'pointer',
    },
  },
  loading: {
    width: '100%',
    textAlign: 'center',
    paddingTop: '8px',
    fontSize: '20px',
  },
  fieldStyle: {
    width: '180px',
    marginleft: '15px',
    marginTop: '15px',
    marginRight: '15px',
    fontFamily: 'Avenir Book',
    fontSize: ' 1rem',
    '& .MuiInput-underline:before': {
      borderBottom: '2px solid #eaeaea',
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: '2px solid #7B72AF',
      transitionProperty: 'border-bottom-color',
      transitionDuration: '500ms',
      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    '& .MuiInputBase-input': {
      color: '#707076',
    },
  },
  menuList: {
    width: '100% !important',
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
  card: {
    // width: "100%",
    marginTop: '20px',
  },
  cardForTeacher: {
    margin: '20px 0',
  },
  cardContent: {
    padding: '20px !important',
    overflow: 'auto',
    // margin: '10px',
  },
  textAlignRight: {
    textAlign: 'right',
    color: '#AEAEB2',
  },
  labelText: {
    fontStyle: 'normal',
    color: '#AEAEB2',
    fontSize: '14px !important',
    fontFamily: 'Avenir Roman',
    marginBottom: '12px',
  },

  typography: {
    fontFamily: 'Avenir book',
    fontSize: 14,
    cursor: 'pointer',
    color: '#AEAEB2',
  },
  span: {
    textTransform: 'capitalize',
  },
  imgDiv: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '-2px 0',
    transform: 'translateY(5px)',
    color: '#AEAEB2',
  },
  editBtn: {
    width: '19px',
    height: '19px',
    transform: 'translateY(4px)',
    cursor: 'pointer',
    marginTop: '-3px',
  },
  Del_img: {
    cursor: 'pointer',
    marginLeft: '10px',
  },
  circularProgress: {
    textAlign: 'center',
    padding: '8px',
  },
  acknowledgement: {
    cursor: 'pointer',
    paddingBottom: '7px',
  },
  message: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Avenir Book',
    padding: '20px',
  },
  title: {
    fontFamily: 'Avenir heavy',
    fontSize: 14,
  },
  ackMessage: {
    fontFamily: 'Avenir Roman',
    fontSize: 14,
    color: '#1C1C1E',
  },
  forDiv: {
    padding: '0 20px',
  },
}))

const TabBarSection = (props) => {
  const classes = useStyles()
  const history = useHistory()
  const { id, selectedTab } = useParams()
  const student_id = id
  console.log('selectedTab', selectedTab)
  const selectedRole = props.selectedRole
  const [open, setOpen] = useState(false)
  const [delId, setDelId] = useState('')
  const [ackLoading, setAckLoading] = useState(false)
  const [studentId, setStudentId] = useState('')
  const [item, setItem] = useState('')
  const token = localStorage.getItem('srmToken')
  const { postLoading, deleteLoading, menuVal, handleMenuChange } = props
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [byData, setByData] = useState([])
  const [byTeacherLoading, setByLoading] = useState(true)
  const [byInfo, setByInfo] = useState({})
  const [forData, setForData] = useState([])
  const [forTeacherLoading, setForLoading] = useState(true)
  const [forInfo, setForInfo] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [currentPageFor, setCurrentPageFor] = useState(1)
  const [refetch, setRefetch] = useState(false)
  const [refetchOnDelete, setRefetchOnDelete] = useState(false)
  const [height, setHeight] = useState({})
  const [update, setUpdate] = useState(false)

  const containerDiv = useRef()
  const calculateHeight = () => {
    if (window) {
      var heights = window.innerHeight
      console.log('heights :>> ', heights)
      setHeight({
        height: heights,
        overflow: 'auto',
      })
    }
  }

  useEffect(() => {
    calculateHeight()
  }, [])
  useEffect(() => {
    if (selectedRole === 'parent') {
      const myStorage = window.localStorage
      const srmSelectedChild = myStorage.srmSelected_Child
      const srmChild = myStorage.srmChild_dict
      var srmChildArray = new Function('return [' + srmChild + '];')()
      const stuId = srmChildArray[0][srmSelectedChild] || {}
      const studId = stuId.userDetails || {}
      const studeId = studId.id
      setStudentId(studeId)
    }
  }, [studentId])

  const handlePopoverOpen = (event, i) => {
    setAnchorEl(event.currentTarget)
    setItem(i)
  }
  const handlePopoverClose = () => {
    setAnchorEl(null)
    setItem('')
  }
  const popOpen = Boolean(anchorEl)

  const handleNew = () => {
    fetchPostData()
  }

  const handleSuccess = (result) => {
    if (selectedRole === 'parent') {
      history.push(`/diary/edit/${result.data.id}`)
    } else {
      history.push(`/diary/${student_id}/edit/${result.data.id}`)
    }
  }
  const fetchPostData = () => {
    if (selectedRole === 'parent') {
      props.individualDiaryPostParent(token, handleSuccess)
    } else {
      props.individualDiaryPost(handleSuccess)
    }
  }
  const handleBySuccess = (result) => {
    console.log('result :>> ', result)
    if (result) {
      console.log('byData,byInfo :>> ', byData, byInfo)
      setByLoading(false)
      setByData([...byData, ...result.data.data])
      setByInfo(result.data)
    }
  }
  const fetchData = (currentPage) => {
    if (selectedRole === 'parent') {
      const myStorage = window.localStorage
      const srmSelectedChild = myStorage.srmSelected_Child
      const srmChild = myStorage.srmChild_dict
      var srmChildArray = new Function('return [' + srmChild + '];')()
      const stuId = srmChildArray[0][srmSelectedChild].userDetails.id
      if (props.createdBy) {
        props.byParentDiary(
          currentPage,
          menuVal,
          selectedRole,
          stuId,
          token,
          handleBySuccess,
        )
      }
    } else {
      if (props.createdBy) {
        props.byTeacherDiary(
          currentPage,
          student_id,
          menuVal,
          selectedRole,
          handleBySuccess,
        )
      }
    }
  }
  useEffect(() => {
    if (update) {
      fetchData(1)
    }
  }, [update])
  useEffect(() => {
    setByLoading(true)
    setByData([])
    setByInfo({})
    setUpdate(Math.random())
  }, [menuVal])
  const handleForSuccess = (result) => {
    console.log('result :>> ', result)
    if (result) {
      setForLoading(false)
      setForData([...forData, ...result.data.data])
      setForInfo(result.data)
    }
  }
  const fetchDataForTeacher = (currentPageFor) => {
    if (selectedRole === 'parent') {
      const myStorage = window.localStorage
      const srmSelectedChild = myStorage.srmSelected_Child
      const srmChild = myStorage.srmChild_dict
      var srmChildArray = new Function('return [' + srmChild + '];')()
      const stuId = srmChildArray[0][srmSelectedChild].userDetails.id
      if (!props.createdBy) {
        props.forParentDiary(
          currentPageFor,
          selectedRole,
          stuId,
          token,
          handleForSuccess,
        )
      }
    } else {
      if (!props.createdBy) {
        props.forTeacherDiary(
          currentPageFor,
          student_id,
          selectedRole,
          handleForSuccess,
        )
      }
    }
  }
  useEffect(() => {
    fetchDataForTeacher(1)
  }, [])

  useEffect(() => {
    if (refetchOnDelete) {
      fetchData(1)
    }
  }, [refetchOnDelete])
  const handleDeleteSuccess = () => {
    SnackBarRef.open('', true, 'Diary deleted successfully')
    setByData([])
    setByInfo({})
    setByLoading(true)
    setRefetchOnDelete(Math.random())
    setOpen(false)
  }
  const handleDeleteFail = (error) => {
    console.log('error', error)
    if (error) {
      SnackBarRef.open('', false, error.message)
    }
  }
  console.log('byData :>> ', byData)
  const handleClickDel = () => {
    props.diaryDelete(delId, handleDeleteSuccess, handleDeleteFail)
  }
  const handleOpen = (id) => {
    setOpen(true)
    setDelId(id)
  }
  const handleCloseNO = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (refetch) {
      if (selectedRole === 'parent') {
        props.forParentDiary(
          1,
          selectedRole,
          studentId,
          token,
          handleForSuccess,
        )
      } else {
        props.forTeacherDiary(1, student_id, selectedRole, handleForSuccess)
      }
    }
  }, [refetch])
  const fetchDataOnSucces = () => {
    setForLoading(true)
    setForData([])
    setCurrentPageFor(1)
    setForInfo({})
    setRefetch(Math.random())
  }
  const onSuccess = () => {
    setAckLoading(false)
    fetchDataOnSucces()
  }
  const handleAck = (putId) => {
    setAckLoading(putId)

    if (selectedRole === 'parent') {
      props.putAcknowledgementParent(putId, selectedRole, token, onSuccess)
    } else {
      props.putAcknowledgement(putId, selectedRole, onSuccess)
    }
  }
  const handleByLoadMore = (e) => {
    // console.log("event", e);
    // console.log("clientHeigh :>> ", e.target.clientHeigh);
    // console.log("scrollTop :>> ", e.target.scrollTop);
    // console.log("scrollHeight :>> ", e.target.scrollHeight);
    let bottom =
      e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop < 30
    console.log('bottom :>> ', bottom)
    if (byInfo.last_page > currentPage) {
      if (bottom && !byTeacherLoading) {
        // console.log("paginationInfo :>> ", paginationInfo);
        let page = currentPage + 1
        fetchData(page)
        setByLoading(true)
        setCurrentPage(page)
      }
    }
  }
  const handleForLoadMore = (e) => {
    // console.log("event", e);
    // console.log("clientHeigh :>> ", e.target.clientHeigh);
    // console.log("scrollTop :>> ", e.target.scrollTop);
    // console.log("scrollHeight :>> ", e.target.scrollHeight);
    let bottom =
      e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop < 30
    console.log('bottom :>> ', bottom)
    if (forInfo.last_page > currentPageFor) {
      if (bottom && !forTeacherLoading) {
        let page = currentPageFor + 1
        fetchDataForTeacher(page)
        setForLoading(true)
        setCurrentPageFor(page)
      }
    }
  }
  return (
    <>
      <Confirm
        open={open}
        handleClose={handleCloseNO}
        onhandleDelete={handleClickDel}
        loading={deleteLoading}
      />
      {postLoading ? <BackdropLoader open={postLoading} /> : ''}
      <div ref={containerDiv} className={classes.sectionContainer}>
        {props.createdBy ? (
          <div
            onScroll={handleByLoadMore}
            style={height}
            className={classes.header}
          >
            {selectedRole === 'teacher' || selectedRole === 'admin' ? (
              <Dropdown />
            ) : (
              ''
            )}

            {selectedRole === 'teacher' ||
            selectedRole === 'admin' ||
            selectedRole === 'parent' ? (
              <div className={classes.header2}>
                <div style={{ zIndex: '1' }}>
                  {props.selectedRole === 'teacher' ||
                  props.selectedRole === 'admin' ? (
                    <FormControl className={classes.fieldStyle}>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={menuVal}
                        onChange={handleMenuChange}
                        classes={{
                          paper: classes.menuContainer,
                          list: classes.menuList,
                        }}
                      >
                        <MenuItem value="general">General Diary Entry</MenuItem>
                        <MenuItem value="teacher">Teacher Observation</MenuItem>
                        <MenuItem value="late">Late Coming</MenuItem>
                      </Select>
                    </FormControl>
                  ) : (
                    ''
                  )}
                </div>
                <div className={classes.addNew} onClick={handleNew}>
                  <img src={AddIcon} alt="add" />
                  <Typography className="new">New</Typography>
                </div>
              </div>
            ) : (
              ''
            )}
            {!byData[0] && !byTeacherLoading ? (
              <Typography className={classes.message}>
                No diary record available yet!
              </Typography>
            ) : (
              ''
            )}
            {byData.map((item, index) => {
              return (
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Grid container>
                      <Grid item xs={8}>
                        <span>
                          {item.title ? (
                            <div style={{ display: 'flex' }}>
                              <Typography className={classes.title}>
                                {item.title}
                              </Typography>
                              {item.status === 'published' &&
                              item.diary === 'individual' ? (
                                <div>
                                  <Typography
                                    aria-owns={
                                      popOpen ? 'mouse-over-popover' : undefined
                                    }
                                    aria-haspopup="true"
                                    onMouseEnter={(e) =>
                                      handlePopoverOpen(e, item)
                                    }
                                    onMouseLeave={handlePopoverClose}
                                  >
                                    <img
                                      src={InfoIcon}
                                      style={{ marginLeft: '10px' }}
                                      className={classes.editBtn}
                                      // onClick={() =>
                                      // handleClick(item.return_status, item.end_date)
                                      // }
                                    />
                                  </Typography>
                                </div>
                              ) : (
                                ''
                              )}
                            </div>
                          ) : (
                            <Typography className={classes.title}>
                              N/A
                            </Typography>
                          )}
                        </span>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography
                          className={`${classes.textAlignRight} ${classes.labelText}`}
                          variant="body2"
                        >
                          {moment(item.created_at).format('DD MMM, hh:mm A')}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid
                        item
                        xs={8}
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          // console.log('selectedTab :>> ', selectedTab);
                          if (
                            props.selectedRole === 'parent' ||
                            props.selectedRole === 'student'
                          ) {
                            history.push({
                              pathname: `/diary/tab/${selectedTab}/diary-details/${item.id}`,
                            })
                          } else {
                            if (item.diary === 'individual') {
                              history.push({
                                pathname: `/diary/${student_id}/tab/${selectedTab}/diary-details/${item.id}`,
                              })
                            } else if (item.diary === 'multiple') {
                              history.push({
                                pathname: `/multiple-student/${student_id}/tab/${selectedTab}/details/${item.id}`,
                              })
                            }
                          }
                        }}
                      >
                        <Typography className={`${classes.typography}`}>
                          <Typography></Typography>
                          Click here to check more details.
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography
                          className={`${classes.labelText} ${classes.textAlignRight}`}
                          variant="body2"
                        >
                          <span className={`${classes.span}`}>
                            {item.status}
                          </span>
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={12} className={classes.imgGrid}>
                        <Typography> </Typography>
                        {item.status !== 'published' ? (
                          <div className={`${classes.imgDiv}`}>
                            <img
                              src={EditIcon}
                              className={classes.editBtn}
                              onClick={() => {
                                if (
                                  props.selectedRole === 'teacher' ||
                                  props.selectedRole === 'admin'
                                ) {
                                  history.push(
                                    `/diary/${student_id}/edit/${item.id}`,
                                  )
                                } else {
                                  history.push(`/diary/edit/${item.id}`)
                                }
                              }}
                            />
                            <div
                              className={classes.Del_img}
                              onClick={() => handleOpen(item.id)}
                            >
                              <DeleteOutlineOutlinedIcon fontSize={'medium'} />
                            </div>
                          </div>
                        ) : (
                          <div className={`${classes.imgDiv}`}>
                            {item.acknowledgement_accept_by ? (
                              <img
                                style={{
                                  textAlign: 'right',
                                  paddingBottom: '7px',
                                }}
                                src={GreenTick}
                              />
                            ) : item.updated_by ? (
                              <img
                                style={{
                                  textAlign: 'right',
                                  paddingBottom: '7px',
                                }}
                                src={ReadIcon}
                              />
                            ) : (
                              <img
                                style={{
                                  textAlign: 'right',
                                  paddingBottom: '7px',
                                }}
                                src={UnReadIcon}
                              />
                            )}
                          </div>
                        )}
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              )
            })}

            {byTeacherLoading ? (
              <div className={classes.circularProgress}>
                <CircularProgress color="primary" size={30} />
              </div>
            ) : (
              ''
            )}
          </div>
        ) : (
          <div
            onScroll={handleForLoadMore}
            style={height}
            className={classes.forDiv}
          >
            {!forData[0] && !forTeacherLoading ? (
              <Typography className={classes.message}>
                No diary record available yet!
              </Typography>
            ) : (
              ''
            )}
            {forData.map((item) => (
              <Card className={classes.cardForTeacher}>
                <CardContent className={classes.cardContent}>
                  <Grid container>
                    <Grid item xs={8}>
                      <span>
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
                      <Typography
                        className={`${classes.textAlignRight} ${classes.labelText}`}
                      >
                        {/* created_at: */}
                        {moment(item.created_at).format('DD MMM YY')}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid
                      item
                      xs={8}
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        if (
                          props.selectedRole === 'parent' ||
                          props.selectedRole === 'student'
                        ) {
                          history.push({
                            pathname: `/diary/tab/${selectedTab}/diary-details/${item.id}`,
                          })
                        } else {
                          history.push({
                            pathname: `/diary/${student_id}/tab/${selectedTab}/diary-details/${item.id}`,
                          })
                        }
                      }}
                    >
                      <Typography className={`${classes.typography}`}>
                        <Typography></Typography>
                        Click here to check more details.
                      </Typography>
                    </Grid>
                    <Grid item xs={4} style={{ textAlign: 'right' }}>
                      {ackLoading === item.id ? (
                        <CircularProgress size={30} />
                      ) : item.acknowledgement === '1' &&
                        !item.acknowledgement_accept_by ? (
                        <div
                          className={`${classes.imgDiv} ${classes.acknowledgement}`}
                          onClick={() => handleAck(item.id)}
                        >
                          <img src={GrayTick} />
                        </div>
                      ) : item.acknowledgement_accept_by ? (
                        <img src={GreenTick} />
                      ) : (
                        ''
                      )}
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={12} className={classes.imgGrid}></Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
            {forTeacherLoading ? (
              <div
                style={
                  currentPageFor === 1
                    ? { paddingTop: '20px' }
                    : { paddingTop: 0 }
                }
                className={classes.circularProgress}
              >
                <CircularProgress color="primary" size={30} />
              </div>
            ) : (
              ''
            )}
          </div>
        )}
      </div>

      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={popOpen}
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
        {item.acknowledgement_accept_by === null && item.updated_by === null ? (
          item.acknowledgement === '1' ? (
            <Typography className={classes.ackMessage}>
              No acknowledgement given yet!
            </Typography>
          ) : (
            <Typography>Not seen yet!</Typography>
          )
        ) : (
          <div className={classes.popoverMeassage}>
            <Typography className={classes.popoverTextName}>
              {item.acknowledgement_accept_by
                ? item.acknowledgement_accept_by
                : item.updated_by
                ? item.updated_by.firstname
                : ''}
            </Typography>

            {item.acknowledgement_accept_by ? (
              <Typography className={classes.popoverTextDate}>
                Acknowledged at:{' '}
                {moment(item.acknowledgement_seen).format('DD MMM, hh:mm A')}
              </Typography>
            ) : item.updated_by ? (
              <Typography className={classes.popoverTextDate}>
                Seen at: {moment(item.updated_at).format('DD MMM, hh:mm A')}
              </Typography>
            ) : (
              ''
            )}
          </div>
        )}
      </Popover>
    </>
  )
}

const mapStateToProps = (state) => {
  const {
    individualDiaryPostLoading,

    forTeacherDiary,
    forTeacherDiaryLoading,
    diaryDeleteLoading,
    putAcknowledgement,
  } = state.Attendence
  return {
    forTeacherData: forTeacherDiary,
    forTeacherLoading: forTeacherDiaryLoading,
    postLoading: individualDiaryPostLoading,
    deleteLoading: diaryDeleteLoading,
    ackLoading: putAcknowledgement,
    selectedRole: state.auth.selectedRole,
  }
}

export default connect(mapStateToProps, {
  individualDiaryPost,
  byParentDiary,
  byTeacherDiary,
  forTeacherDiary,
  forParentDiary,
  diaryDelete,
  putAcknowledgement,
  putAcknowledgementParent,
  individualDiaryPostParent,
})(TabBarSection)
