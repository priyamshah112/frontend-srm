import React, { useState, useEffect } from 'react'
// import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import LinearProgress from '@material-ui/core/LinearProgress'
import { CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import * as moment from 'moment'
import EditIcon from '../../../assets/images/Edit.svg'
import ReturnIcon from '../../../assets/images/diary/library/Return.svg'
import { getLibraryInfo } from '../../redux/actions/attendence.action'
import { studentLibraryInfo } from '../../redux/actions/attendence.action'
import { putReturnLibrary } from '../../redux/actions/attendence.action'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

const useStyle = makeStyles((theme) => ({
  cardContainer: {
    paddingBottom: '85px',
  },
  span: {
    textTransform: 'capitalize',
  },
  typography: {
    margin: '10px 0',
  },
  card: {
    width: '100%',
    marginTop: '20px',
    marginLeft: '20px',
    marginRight: '20px',
  },
  editBtn: {
    marginLeft: 'auto',
    cursor: 'pointer',
  },
  labelText: {
    fontStyle: 'normal',
    color: '#1C1C1E',
    fontSize: 14,
  },
  editBtn: {
    width: '19px',
    height: '19px',
    paddingLeft: '10px',
    transform: 'translateY(4px)',
    cursor: 'pointer',
  },
  cardContent: {
    padding: '20px 20px !important',
    overflow: 'auto',
    // margin: "10px",
  },
  textAlignRight: {
    textAlign: 'right',
    color: '#AEAEB2',
    fontSize: 14,
    fontFamily: 'Avenir Roman',
  },
  imgGrid: {
    position: 'relative',
    paddingTop: '8px',
  },
  imgDiv: {
    display: 'flex',
    justifyContent: 'flex-end',
    bottom: '0px',
    right: '35px',
    // position: "absolute",
    // margin: "16px 0",
  },
  returned: {
    color: '#40BD13',
  },
  borrowed: {
    color: '#3076A1',
  },
  red: {
    color: '#D92424',
  },
  bookName: {
    fontFamily: 'Avenir heavy',
    fontSize: 14,
  },
  CircularProgress: {
    margin: '30px',
  },
  message: {
    fontFamily: 'Avenir book',
    fontSize: 14,
    margin: '20px',
  },
  returnIcon: {
    color: '#7B72AF',
    display: 'flex',
    justifyContent: 'center',
  },
  popContainer: {
    minWidth: '200px',
  },
  dialogActionsContainer: {
    '&.MuiDialogActions-root': {
      justifyContent: 'center',
      marginBottom: '10px',
    },
  },
  button: {
    minWidth: '80px',
    textTransform: 'none',
  },
  confirmationText: {
    fontWeight: 500,
    fontSize: '1rem',
    color: '#000000',
  },
  dialogContent: {
    textAlign: 'center',
  },
  imgContainer: {
    textAlign: 'center',
    paddingBottom: '5px',
  },
  img: {
    filter: 'hue-rotate(180deg)',
  },
}))

function LibraryCard(props) {
  const student_id = props.studentId
  const history = useHistory()
  const classes = useStyle()
  const [id, setId] = useState('')
  const [endDate, setEndDate] = useState('')
  const [studentId, setStudentId] = useState('')
  const [openReturn, setOpenReturn] = useState(false)
  const { library, dataLoading } = props

  const handleCloseReturn = () => {
    setOpenReturn(false)
  }

  const handleOpenReturn = (id, endDate, student_id) => {
    setOpenReturn(true)
    setId(id)
    setEndDate(moment(endDate).format('YYYY-MM-DD'))
    setStudentId(student_id)
  }
 
  const handleReturnSuccess = () => {
    props.setData([])
    props.setInfo({})
    props.setRefetch(Math.random())
    handleCloseReturn()
  }
  const handleReturn = () => {
    const putData = {
      student_id: studentId,
      end_date: endDate,
      return_status: 'returned',
    }
    props.putReturnLibrary(id, putData, handleReturnSuccess)
  }

  return (
    <>
      <Dialog
        open={openReturn}
        onClose={handleCloseReturn}
        maxWidth={'sm'}
        fullWidth={false}
      >
        <DialogContent>
          <div className={classes.imgContainer}>
            <img
              className={classes.img}
              src={ReturnIcon}
              width="24"
              height="24"
            />
          </div>
          <div className={classes.popContainer}>
            <div className={classes.dialogContent}>
              <Typography className={classes.confirmationText}>
                Do you want to mark this book as returned?
              </Typography>
            </div>
          </div>
        </DialogContent>
        <DialogActions classes={{ root: classes.dialogActionsContainer }}>
          <Button
            onClick={handleCloseReturn}
            color="primary"
            variant="outlined"
            className={classes.button}
          >
            No
          </Button>
          <Button
            onClick={handleReturn}
            color="primary"
            autoFocus
            variant="contained"
            className={classes.button}
            disableElevation
            disableRipple
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Grid
        container
        direction="row"
        justify="center"
        alignContent="center"
        className={classes.cardContainer}
      >
        {!library.length && !dataLoading ? (
          <Typography className={classes.message}>
            No records available!
          </Typography>
        ) : (
          ''
        )}
        {library.map((item) => (
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Grid container>
                <Grid item xs={7}>
                  <span style={{ display: 'flex' }}>
                    {item.book_name ? (
                      <Typography className={classes.bookName} variant="body1">
                        {item.book_name}
                      </Typography>
                    ) : (
                      <Typography variant="body1">N/A</Typography>
                    )}
                  </span>
                </Grid>
                <Grid item xs={5}>
                  <Typography
                    className={`${classes.textAlignRight}`}
                    variant="body2"
                  >
                    Created at:{' '}
                    {moment(item.created_at).format('DD MMM, hh:mm A')}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={8}>
                  <Typography className={classes.labelText} variant="body2">
                    <Typography
                      className={`${classes.typography}`}
                      variant="body2"
                    ></Typography>
                    {moment(item.from_date).format('DD MMM YY hh:mm A')} -{' '}
                    {moment(item.end_date).format('DD MMM YY hh:mm A')}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={4}
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                  }}
                >
                  <Typography
                    className={`${classes.labelText} ${classes.textAlignRight}`}
                    variant="body2"
                  >
                    {item.return_status === 'returned' ? (
                      <span className={`${classes.span} ${classes.returned}`}>
                        {item.return_status}
                      </span>
                    ) : (
                      ''
                    )}
                    {item.return_status === 'borrowed' ? (
                      <span className={`${classes.span} ${classes.borrowed}`}>
                        {item.return_status}
                      </span>
                    ) : (
                      ''
                    )}
                    {item.return_status === 'Overdue by 6 days' ? (
                      <span className={`${classes.span} ${classes.red}`}>
                        {item.return_status}
                      </span>
                    ) : (
                      ''
                    )}
                    {item.return_status === 'Late Returned' ? (
                      <span className={`${classes.span} ${classes.red}`}>
                        {item.return_status}
                      </span>
                    ) : (
                      ''
                    )}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container>
                {props.selectedRole === 'teacher' ||
                props.selectedRole === 'admin' ? (
                  <Grid item xs={12} className={classes.imgGrid}>
                    {item.return_status === 'borrowed' ? (
                      <div
                        className={`${classes.imgDiv} ${classes.textAlignRight}`}
                      >
                        <img
                          onClick={() => {
                            handleOpenReturn(
                              item.id,
                              item.end_date,
                              item.student_id,
                            )
                          }}
                          src={ReturnIcon}
                          className={classes.editBtn}
                        />
                        <img
                          onClick={() =>
                            history.push(
                              `/library/${student_id}/edit/${item.id}`,
                            )
                          }
                          src={EditIcon}
                          className={classes.editBtn}
                        />
                      </div>
                    ) : (
                      ''
                    )}

                    {item.return_status === 'Overdue by 6 days' ? (
                      <div
                        className={`${classes.imgDiv} ${classes.textAlignRight}`}
                      >
                        <img src={EditIcon} className={classes.editBtn} />
                      </div>
                    ) : (
                      ''
                    )}
                    {item.return_status === 'returned' ? (
                      <div
                        className={`${classes.imgDiv} ${classes.textAlignRight}`}
                      >
                        <Typography
                          className={`${classes.textAlignRight}`}
                          variant="body2"
                        >
                          Return Date:{' '}
                          {moment(item.updated_at).format('DD MMM YY hh:mm A')}
                        </Typography>
                      </div>
                    ) : (
                      ''
                    )}
                  </Grid>
                ) : (
                  <Grid item xs={12} className={classes.imgGrid}>
                    {item.return_status === 'returned' ? (
                      <div
                        className={`${classes.imgDiv} ${classes.textAlignRight}`}
                      >
                        <Typography
                          className={`${classes.textAlignRight}`}
                          variant="body2"
                        >
                          Return Date:{' '}
                          {moment(item.updated_at).format('DD MMM YY hh:mm A')}
                        </Typography>
                      </div>
                    ) : (
                      ''
                    )}
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </Card>
        ))}
        {dataLoading ? (
          <div className={classes.CircularProgress}>
            <CircularProgress color="primary" size={30} />
          </div>
        ) : (
          ''
        )}
      </Grid>
    </>
  )
}

const mapStateToProps = (state) => {
  const {
    getLibraryInfo,
    getLibraryInfoLoading,
    putReturnLibraryLoading,
  } = state.Attendence
  const userInfo = state.auth.userInfo || {}
  const userClasses = userInfo.user_classes || {}
  return {
    putReturnLoading: putReturnLibraryLoading,
    selectedRole: state.auth.selectedRole,
    school_id: userClasses.school_id,
  }
}

export default connect(mapStateToProps, {
  getLibraryInfo,
  studentLibraryInfo,
  putReturnLibrary,
})(LibraryCard)
