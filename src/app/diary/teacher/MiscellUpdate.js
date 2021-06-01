import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import BackIcon from '../../../assets/images/Back.svg'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import { connect } from 'react-redux'
import { updateMiscellaneous } from '../../redux/actions/attendence.action'
import { getMiscellaneous } from '../../redux/actions/attendence.action'
import { useHistory, useParams } from 'react-router-dom'
import BackdropLoader from '../../common/ui/backdropLoader/BackdropLoader'
import { SnackBarRef } from '../../../SnackBar'
import CircularProgress from '@material-ui/core/CircularProgress'
import * as moment from 'moment'
import RichTextEditor from '../../../shared/richTextEditor'

const useStyle = makeStyles((theme) => ({
  root: {
    // minWidth: 275,
    margin: '20px',
  },
  title: {
    fontSize: 14,
    fontFamily: 'Avenir medium',
    lineHeight: '30px',
    margin: '10px',
  },
  pos: {
    marginBottom: 12,
  },
  sectionContainer: {
    width: '100%',
    flexWrap: 'wrap',
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
  textArea: {
    width: '100%',
  },
  editBtn: {
    marginLeft: 'auto',
    cursor: 'pointer',
  },
  textAlignRight: {
    textAlign: 'right',
    color: '#AEAEB2',
    fontSize: '0.85rem',
  },
  imgDiv: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
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
  fieldStyleText: {
    width: '100%',
    margin: '0 10px 28px 10px',
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
  margin: {
    // marginTop: "10px",
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
      marginRight: '5px',
    },
  },
  marginText: {
    marginTop: '10px',
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
      marginRight: '5px',
    },
  },
  sideMargins: {
    // marginLeft: "20px",
    marginRight: '10px',
    display: 'flex',
    justifyContent: 'flex-end',
    '& .MuiButton-root': {
      textTransform: 'capitalize',
    },
  },
  sideMarginsText: {
    // marginLeft: "20px",
    // marginRight: "20px",
    display: 'flex',
    justifyContent: 'flex-end',
  },
  textAlignLeft: {
    textAlign: 'left',
    color: 'rgba(0, 0, 0, 0.54)',
  },
}))

function MiscellUpdate(props) {
  const classes = useStyle()
  const { id } = useParams()
  const history = useHistory()
  const [description, setDescription] = useState('')
  const [publishLoading, setPublishLoading] = useState(false)
  const [miscData, setMiscData] = useState({})
  const { getLoading, school_id, selectedRole } = props
  let saveDataApi

  const handleDescription = (data) => {
    console.log('description :>> ', data)
    setDescription(data)
  }

  console.log('description test :>> ', description)

  const handleSuccess = () => {
    SnackBarRef.open('', true, 'Updated successfully')
    history.replace(`/miscellaneous/${id}`)
    setPublishLoading(false)
  }
  const handleFail = (error) => {
    console.log('error', error)
    if (error) {
      SnackBarRef.open('', false, error.message)
    }
  }
  const getSuccess = (result) => {
    console.log('result :>> ', result)
    if (result) {
      setMiscData(result.data)
      setDescription(result.data.description)
    }
  }
  const fetchData = () => {
    props.getMiscellaneous(id, selectedRole, getSuccess)
  }
  useEffect(() => {
    fetchData()
  }, [])

  const handlePublish = () => {
    console.log('description put :>> ', description)
    setPublishLoading(true)
    clearInterval(saveDataApi)
    let time = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
    const updateData = {
      name: miscData.name,
      school_id: school_id,
      description: description,
      status: 'published',
      published_date: time,
    }
    props.updateMiscellaneous(
      id,
      selectedRole,
      updateData,
      handleSuccess,
      handleFail,
    )
  }
  const onSuccess = () => {
    history.push(`/miscellaneous/${id}`)
  }
  const saveDetails = (isBack) => {
    console.log('description put :>> ', description)
    let time = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
    const updateData = {
      name: miscData.name,
      school_id: school_id,
      description: description,
      status: 'draft',
      published_date: time,
    }

    if (isBack) {
      props.updateMiscellaneous(id, selectedRole, updateData, onSuccess)
    } else {
      props.updateMiscellaneous(id, selectedRole, updateData)
    }
  }

  const handleBack = () => {
    saveDetails(true)
  }

  useEffect(() => {
    saveDataApi = setInterval(() => {
      saveDetails(false)
    }, 10000)
    return () => clearInterval(saveDataApi)
  }, [description])

  return getLoading ? (
    <BackdropLoader open={getLoading} />
  ) : (
    <>
      <div className={classes.sectionContainer}>
        <div className={classes.headingDiv}>
          <img
            src={BackIcon}
            alt="Back"
            className={classes.backImg}
            onClick={() => {
              handleBack()
              // history.replace(`/miscellaneous/${id}`);
            }}
          />
          <Typography
            style={{ fontSize: 18 }}
            className={`${classes.themeColor} ${classes.titleText}`}
          >
            {miscData.name === 'prayer'
              ? 'Prayer'
              : miscData.name === 'vijayi'
              ? 'Vijayi Vishwa Tiranga Pyara'
              : miscData.name === 'national'
              ? 'National Pledge'
              : miscData.name === 'jaya'
              ? 'Jaya Bharat Jananiya'
              : miscData.name === 'saare'
              ? 'National Anthem'
              : miscData.name === 'rules'
              ? 'School Rules and Other Info'
              : ''}
          </Typography>
        </div>
        <Card className={classes.root}>
          <CardContent>
            <Box className={`${classes.marginText} ${classes.sideMarginsText}`}>
              <Grid className={classes.fieldStyleText}>
                <RichTextEditor
                  handleDescription={handleDescription}
                  value={description}
                  token={props.token}
                />
              </Grid>
            </Box>
            <Box className={`${classes.margin} ${classes.sideMargins}`}>
              {publishLoading ? (
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
                  Publish
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  const {
    updateMiscellaneous = [],
    updateMiscellaneousLoading,
    getMiscellaneous = [],
    getMiscellaneousLoading,
  } = state.Attendence
  const userInfo = state.auth.userInfo || {}
  const userClasses = userInfo.user_classes || {}
  return {
    miscData: getMiscellaneous,
    getLoading: getMiscellaneousLoading,
    loading: updateMiscellaneousLoading,
    school_id: userClasses.school_id,
    token: state.auth.token,
    selectedRole: state.auth.selectedRole,
  }
}

export default connect(mapStateToProps, {
  updateMiscellaneous,
  getMiscellaneous,
})(MiscellUpdate)
