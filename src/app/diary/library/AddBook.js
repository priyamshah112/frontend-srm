import React, { useState, useEffect } from 'react'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import BackIcon from '../../../assets/images/Back.svg'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import EventIcon from '@material-ui/icons/Event'
import InputAdornment from '@material-ui/core/InputAdornment'
import DateFnsUtils from '@date-io/date-fns'
import { CircularProgress, IconButton } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { useHistory, useParams } from 'react-router-dom'
import { putLibrary } from '../../redux/actions/attendence.action'
import { getLibraryInfoById } from '../../redux/actions/attendence.action'
import { searchBook } from '../../redux/actions/attendence.action'
import { connect } from 'react-redux'
import { SnackBarRef } from '../../../SnackBar'
import * as moment from 'moment'
import BackdropLoader from '../../common/ui/backdropLoader/BackdropLoader'
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete'
const filter = createFilterOptions()

const useStyle = makeStyles((theme) => ({
  errorColor: {
    color: 'red',
    textAlign: 'center',
    paddingTop: '10px',
  },
  formStyle: {
    margin: '20px',
    backgroundColor: 'white',
    justifyContent: 'center',
    textAlign: 'right',
    borderRadius: '5px',
  },
  formDiv: {
    height: '100vh',
    overflow: 'auto',
  },
  margin: {
    marginTop: '30px',
    [theme.breakpoints.down('xs')]: {
      marginTop: '10px',
    },
    '& .publishBtn': {
      borderRadius: '3px',
      width: 'inherit',
      margin: 0,
      width: 130,
      height: 40,
      [theme.breakpoints.down('xs')]: {
        marginTop: '10px',
        marginRight: 0,
        width: '100%',
      },
    },
    '& .publishLaterBtn': {
      backgroundColor: `${theme.palette.common.white}`,
      border: `1px solid ${theme.palette.common.adornment}`,
      marginRight: '5px',
    },
  },
  sideMargins: {
    marginLeft: '20px',
    marginRight: '20px',
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
    fontize: 18,
    color: '#1C1C1E',
  },
  inputBorder: {
    height: '50px',
  },
  fieldStyle: {
    width: '100%',
    margin: 'auto',
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
  },
  datePicker: {
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  textAlignLeft: {
    textAlign: 'left',
    color: 'rgba(0, 0, 0, 0.54)',
  },
  textArea: {
    width: '100%',
    border: '1px solid rgb(200,200,200',
  },
  radioBtn: {
    display: 'flex',
    flexDirection: 'row',
    fontFamily: 'Avenir',
    fontSize: 14,
  },
  headingDiv: {
    margin: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  publishBtns: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& .MuiButton-root': {
      textTransform: 'capitalize',
    },
  },
  renderOption: {
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: "space-between",
    width: '100%',
    paddingTop: '13px',
    paddingBottom: '8px',
  },
  optionContainer: {
    display: 'flex',
  },
}))

function AddBook(props) {
  const classes = useStyle()
  const history = useHistory()
  const { studentId, id } = useParams()
  const [bookName, setBookName] = useState('')
  const [fromDate, setFromDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [loading, setLoading] = useState(false)
  const { bookList, bookLoading } = props
  const [value, setValue] = React.useState(null)
  const [error, setError] = useState('')

  if (fromDate) {
    console.log('fromData :>> ', fromDate.getDate())
  }
  if (endDate) {
    console.log('fromData endDate :>> ', endDate.getDate())
  }

  const validForm = () => {
    if (!bookName) {
      setError(`A Mandatory field isn't filled!`)
    } else if (!fromDate) {
      setError(`A Mandatory field isn't filled!`)
    } else if (!endDate) {
      setError(`A Mandatory field isn't filled!`)
    } else if (endDate.getTime() < fromDate.getTime()) {
      setError('End date should be greater then from date')
    } else {
      return true
    }
  }

  const handleEditSuccess = (result) => {
    console.log('result', result)
    setValue(result.data.book_name)
    setFromDate(result.data.from_date)
    setEndDate(result.data.end_date)
  }
  const fetchData = () => {
    props.getLibraryInfoById(id, studentId, handleEditSuccess)
    props.searchBook(bookName)
  }
  useEffect(() => {
    fetchData()
  }, [studentId])

  const handleSuccess = () => {
    history.push(`/library/${studentId}`)
    SnackBarRef.open('', true, 'Book added successfully')

    setLoading(false)
  }
  const handleFail = (error) => {
    if (error) {
      SnackBarRef.open('', false, error.message)
    }
    setLoading(false)
  }

  const handleSave = (event) => {
    event.preventDefault()
    if (validForm()) {
      setLoading(true)
      const fromTime = moment(fromDate).format('YYYY-MM-DD')
      const endTime = moment(endDate).format('YYYY-MM-DD')
      const putData = {
        student_id: studentId,
        book_name: bookName,
        from_date: fromTime,
        end_date: endTime,
        return_status: 'borrowed',
      }
      props.putLibrary(id, putData, handleSuccess, handleFail)
    }
  }

  const handleFromDate = (date) => {
    setFromDate(date)
    setError(false)
  }
  const handleEndDate = (date) => {
    setEndDate(date)
    setError(false)
  }

  return (
    <>
      {props.dataLoading ? (
        <BackdropLoader open={props.dataLoading} />
      ) : (
        <div className={classes.formDiv}>
          <div
            className={classes.headingDiv}
            style={{
              margin: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={BackIcon}
              alt="Back"
              className={classes.backImg}
              onClick={() => {
                history.goBack()
              }}
            />
            <Typography
              variant="h5"
              className={`${classes.themeColor} ${classes.titleText}`}
              style={{ fontSize: 18 }}
            >
              Add New Book
            </Typography>
          </div>
          <form className={classes.formStyle}>
            {error ? (
              <Box className={classes.margin} pt={2}>
                <div>
                  <Typography className={`${classes.errorColor}`}>
                    {error}
                  </Typography>
                </div>
              </Box>
            ) : (
              ''
            )}

            <Box className={` ${classes.sideMargins}`}>
              <FormControl className={classes.fieldStyle}>
                <Autocomplete
                  style={{ paddingTop: '20px' }}
                  value={value}
                  onChange={(event, newValue) => {
                    setError(false)
                    if (typeof newValue === 'string') {
                      setValue({
                        title: newValue,
                      })
                    } else if (newValue && newValue.inputValue) {
                      // Create a new value from the user input
                      setValue({
                        title: newValue.inputValue,
                      })
                    } else {
                      setValue(newValue)
                    }
                    if (newValue) {
                      setBookName(newValue.book_name)
                    }
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params)

                    // Suggest the creation of a new value
                    if (params.inputValue !== '') {
                      filtered.push({
                        inputValue: params.inputValue,
                        title: `Add "${params.inputValue}"`,
                      })
                    }

                    return filtered
                  }}
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  id="free-solo-with-text-demo"
                  options={bookList}
                  getOptionLabel={(option) => {
                    if (typeof option === 'string') {
                      return option
                    }
                    if (option.inputValue) {
                      return option.inputValue
                    }
                    return option.book_name
                  }}
                  renderOption={(option) => (
                    <div
                      style={{
                        width: '100%',
                        fontFamily: 'Avenir book',
                        fontSize: 14,
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          paddingTop: '5px',
                        }}
                      >
                        <div
                          style={{ fontSize: 18, fontFamily: 'Avenir medium' }}
                        >
                          {option.book_name}
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                          }}
                        >
                          {option.category}
                        </div>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          paddingTop: '5px',
                        }}
                      >
                        <div>{option.author_name}</div>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                          }}
                        >
                          {option.publisher}
                        </div>
                      </div>
                      <div
                        style={{ paddingTop: '5px' }}
                        className={classes.optionContainer}
                      >
                        <div>{option.ISBN}</div>
                      </div>
                    </div>
                  )}
                  // style={{ width: 300 }}
                  freeSolo
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Book Name"
                      variant="standard"
                    />
                  )}
                />
              </FormControl>
            </Box>
            <Box className={`${classes.margin} ${classes.sideMargins}`}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container className={classes.fieldStyle}>
                  <Grid item xs={12}>
                    <DatePicker
                      id="fromDate"
                      label="From Date"
                      variant="dialog"
                      minDate={new Date()}
                      format="MM/dd/yyyy"
                      value={fromDate}
                      onChange={handleFromDate}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton>
                              <EventIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      className={classes.datePicker}
                    />
                  </Grid>
                </Grid>
              </MuiPickersUtilsProvider>
            </Box>
            <Box className={`${classes.margin} ${classes.sideMargins}`}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container className={classes.fieldStyle}>
                  <Grid item xs={12}>
                    <DatePicker
                      id="endDate"
                      label="End Date"
                      variant="dialog"
                      minDate={new Date()}
                      format="MM/dd/yyyy"
                      value={endDate}
                      onChange={handleEndDate}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton>
                              <EventIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      className={classes.datePicker}
                    />
                  </Grid>
                </Grid>
              </MuiPickersUtilsProvider>
            </Box>
            <Box className={`${classes.margin} ${classes.sideMargins}`}>
              <Grid
                container
                className={classes.fieldStyle}
                direction="row-reverse"
              >
                <Grid item sm={3} xs={12} className={classes.publishBtns}>
                  {loading ? (
                    <CircularProgress />
                  ) : (
                    <Button
                      style={{ textTransform: 'capitalize' }}
                      id="publishBtn"
                      variant="contained"
                      className={`${classes.fieldStyle} ${'publishBtn'}`}
                      color="primary"
                      type="submit"
                      onClick={handleSave}
                      disableElevation
                    >
                      Add
                    </Button>
                  )}
                </Grid>
                <Grid
                  item
                  sm={9}
                  xs={12}
                  className={classes.textAlignLeft}
                ></Grid>
                <br />
                <br />
                <br />
              </Grid>
            </Box>
          </form>
        </div>
      )}
    </>
  )
}

const mapStateToProps = (state) => {
  const {
    getLibraryInfoById,
    getLibraryInfoByIdLoading,
    searchBook,
    searchBookLoading,
  } = state.Attendence
  const userInfo = state.auth.userInfo || {}
  const userClasses = userInfo.user_classes || {}
  return {
    bookList: searchBook,
    bookLoading: searchBookLoading,
    data: getLibraryInfoById,
    dataLoading: getLibraryInfoByIdLoading,
    selectedRole: state.auth.selectedRole,
    school_id: userClasses.school_id,
  }
}

export default connect(mapStateToProps, {
  putLibrary,
  getLibraryInfoById,
  searchBook,
})(AddBook)

// renderInput={(params) => (
//   <TextField
//     {...params}
//     label="Book Name"
//     variant="standard"
//     InputProps={{
//       endAdornment: (
//         <InputAdornment position="end">
//           <IconButton>
//             <SearchIcon />
//           </IconButton>
//         </InputAdornment>
//       ),
//     }}
//   />
// )}
