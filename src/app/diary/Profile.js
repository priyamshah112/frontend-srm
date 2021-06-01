import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import StudentPhone from '../profile/student/StudentPhone'
import StudentAddress from '../profile/student/StudentAddress'
import StudentParents from '../profile/student/StudentParents'
import { Typography, IconButton } from '@material-ui/core'
import { connect } from 'react-redux'
import BackdropLoader from '../common/ui/backdropLoader/BackdropLoader'
import { useHistory, useParams } from 'react-router-dom'
import { diaryProfile } from '../redux/actions/attendence.action'
import StudentImage2 from '../lunch/images/dummy.png'
import BackIcon from '../../assets/images/Back.svg'
import Dropdown from './Dropdown'

const useStyles = makeStyles((theme) => ({
  selectStudent: {
    fontFamily: 'Avenir book',
    fontSize: 14,
    margin: '20px',
    textAlign: 'center',
  },
  dropdownContainer: {
    marginRight: '20px',
    marginLeft: '20px',
  },
  backImg: {
    cursor: 'pointer',
    position: 'absolute',
    left: '20px',
    top: '30px',
  },
  profileNameDiv: {
    textAlign: 'center',
    marginTop: '20px',
  },
  profilePictureDiv: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    margin: 'auto',
    border: '1px solid',
  },
  editProfile: {
    transform: 'translate(35px,75px)',
    cursor: 'pointer',
  },
  profileName: {
    fontStyle: 'normal',
    fontSize: '24px',
    fontWeight: 500,
  },
  changePwdDiv: {
    width: '95%',
    marginTop: '40px',
    margin: 'auto',
  },
  input: {
    display: 'none',
  },
  changePwd: {
    width: '100%',
    height: '50px',
    borderRadius: '5px',
    borderWidth: '2px',
    borderStyle: 'solid',
  },
  sectionContainer: {
    // height: '100%',
    // overflow: "auto",
    paddingBottom: '45px',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
}))
const Profile = (props) => {
  const classes = useStyles()
  const history = useHistory()
  const { id } = useParams()
  const [openLoader, setOpenLoader] = useState(false)
  const [userData, setUserData] = useState(null)
  const [phone, setPhone] = useState([])
  const [email, setEmail] = useState([])
  const [address, setAddress] = useState(null)
  const [parentsData, setParentsData] = useState([])
  const { selectedRole } = props
  const selectedStudent = localStorage.getItem('selectedStudent')
  let phoneArray = []
  let phoneArray2 = []
  phoneArray.push(phone)
  phoneArray2.push(phoneArray)

  console.log('Phone', phone)
  console.log('Email', email)
  console.log('phoneArray', phoneArray)

  const onSuccess = (result) => {
    setOpenLoader(false)
    console.log('result :>> ', result)
    if (result) {
      setUserData(result.data[0])
      setPhone(result.data[0].user_phones)
      setAddress(result.data[0].user_addresses)
      setParentsData(result.data[0].family_member)
    }
  }
  const fetchData = () => {
    setOpenLoader(true)
    props.diaryProfile(id, selectedRole, 'profile', onSuccess)
  }
  useEffect(() => {
    if (
      (selectedRole === 'teacher' || selectedRole === 'admin') &&
      selectedStudent
    ) {
      fetchData()
    } else if (selectedRole === 'parent' || selectedRole === 'student') {
      fetchData()
    }
  }, [])

  return (
    <>
      <div className={classes.sectionContainer}>
        {selectedRole === 'teacher' || selectedRole === 'admin' ? (
          <div className={classes.dropdownContainer}>
            <Dropdown />
          </div>
        ) : (
          ''
        )}
        {(selectedRole === 'teacher' || selectedRole === 'admin') &&
        !selectedStudent ? (
          <Typography className={classes.selectStudent}>
            Please select student first!
          </Typography>
        ) : (
          <>
            <div className={classes.container}>
              <div className={classes.profileNameDiv}>
                <div
                  className={classes.profilePictureDiv}
                  style={{
                    backgroundImage: `url(${
                      !userData
                        ? ''
                        : userData.thumbnail
                        ? userData.thumbnail
                        : StudentImage2
                    })`,
                    'background-repeat': 'no-repeat',
                    'background-size': 'cover',
                    'background-position': 'center',
                  }}
                ></div>
                <Typography className={classes.profileName}>
                  {userData ? `${userData.firstname} ${userData.lastname}` : ''}
                </Typography>
              </div>
            </div>
            <StudentPhone
              gender={userData ? userData.gender : ''}
              userPhones={phoneArray2}
              userEmails={email}
            />
            {address ? <StudentAddress address={address} /> : ''}
            <StudentParents parentsData={parentsData} />
          </>
        )}
      </div>
      <br />
      <br />

      <BackdropLoader open={openLoader} />
    </>
  )
}

const mapStateToProps = (state) => {
  const { diaryProfile, diaryProfileLoading } = state.Attendence
  return {
    userInfo: state.auth.userInfo,
    selectedRole: state.auth.selectedRole,
  }
}

export default connect(mapStateToProps, { diaryProfile })(Profile)
