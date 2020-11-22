import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import StudentPhone from './StudentPhone'
import StudentAddress from './StudentAddress'
import StudentParents from './StudentParents'
import {
	Typography,
	Button,
	Snackbar,
	IconButton,
	Input,
} from '@material-ui/core'
import editButtonIcon from '../../../assets/images/Edit Button.svg'
import MuiAlert from '@material-ui/lab/Alert'
import ChangePassword from '../ChangePassword'
import { connect } from 'react-redux'
import ProfileService from '../ProfileService'
import BackdropLoader from '../../common/ui/backdropLoader/BackdropLoader'
import { useHistory } from 'react-router-dom'

function Alert(props) {
	return <MuiAlert elevation={6} variant='filled' {...props} />
}

const useStyles = makeStyles((theme) => ({
	profileNameDiv: {
		textAlign: 'center',
		marginTop: '30px',
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
}))
const StudentProfile = (props) => {
	const classes = useStyles()
	const history = useHistory()
	const [openChangePass, setOpenChanegPass] = useState(false)
	const [openLoader, setOpenLoader] = useState(true)
	const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false)
	const [snackbarmsg, setSnackbarmsg] = useState('')
	const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false)
	const [userData, setUserData] = useState(null)
	const [userPic, setUserPic] = useState(null)
	const [phone, setPhone] = useState([])
	const [email, setEmail] = useState([])
	const [address, setAddress] = useState(null)
	const [parentsData, setParentsData] = useState([])
	const [parentId, setParentId] = useState([])
	const [newUserPic, setNewUserPic] = useState('')

	const userInfo = props.userInfo

	useEffect(() => {
		let isLoading = true

		const getUser = async () => {
			try {
				const token = localStorage.getItem('srmToken')
				const response = await ProfileService.fetchuser(token, userInfo['id'])
				if (response.status === 200) {
					if (isLoading) {
						setUserData(response.data.data)
						setUserPic(response.data.data.user_details['thumbnail'])
					}
				}
			} catch (error) {
				console.log(error)
			}
		}

		const getAddress = async () => {
			try {
				const token = localStorage.getItem('srmToken')
				const response = await ProfileService.fetchAddress(token)
				console.log('response', response.data.data[0]['address_line1'])
				if (response.status === 200) {
					if (isLoading) {
						setAddress(response.data.data[0])
					}
				}
			} catch (error) {
				console.log(error)
			}
		}

		const getParents = async () => {
			try {
				const token = localStorage.getItem('srmToken')
				const response = await ProfileService.fetchParents(
					token,
					userInfo['username']
				)
				if (response.status === 200) {
					if (isLoading) {
						let temp = []
						let tempId = []
						response.data.data.map((parents) => {
							temp.push(parents)
							tempId.push(parents.parents_data['id'])
						})
						setParentsData(temp)
						setParentId(tempId)
					}
				} else {
					console.log('Error')
				}
			} catch (error) {
				console.log(error)
			}
			setOpenLoader(false)
		}

		getUser()
		getParents()
		getAddress()
		return () => {
			isLoading = false
		}
	}, [])

	useEffect(() => {
		const getUserPhones = async (id) => {
			try {
				const token = localStorage.getItem('srmToken')
				const response = await ProfileService.fetchUserPhones(token, id)
				if (response.status === 200) {
					let temp = phone
					response.data.data.map((parent_data) => {
						temp.push(parent_data)
					})
					setPhone([temp])
				} else {
					console.log('Error')
				}
			} catch (error) {
				console.log(error)
			}
		}
		const getUserEmails = async (id) => {
			try {
				const token = localStorage.getItem('srmToken')
				const response = await ProfileService.fetchUserEmails(token, id)
				if (response.status === 200) {
					let temp = email
					response.data.data.map((parent_data) => {
						temp.push(parent_data)
					})
					setEmail([temp])
				} else {
					console.log('Error')
				}
			} catch (error) {
				console.log(error)
			}
		}

		if (parentId.length !== 0) {
			parentId.map((id) => {
				getUserPhones(id)
				getUserEmails(id)
			})
		}
	}, [parentId])

	const updateProfilePic = async () => {
		const toBase64 = (file) =>
			new Promise((resolve, reject) => {
				const reader = new FileReader()
				reader.readAsDataURL(file)
				reader.onload = () => resolve(reader.result)
				reader.onerror = (error) => reject(error)
			})
		const imageString = await toBase64(newUserPic)
		try {
			const token = localStorage.getItem('srmToken')
			const response = await ProfileService.updateUserPic(
				token,
				userInfo['id'],
				{
					thumbnail: imageString,
				}
			)
			if (response.status === 200) {
				history.push('/profile')
			}
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		if (newUserPic) {
			updateProfilePic()
		}
	}, [newUserPic])

	const handleChangeProfilePic = (event) => {
		setNewUserPic(event.target.files[0])
	}

	const handleSnackbar = (success, message, error) => {
		setSuccessSnackbarOpen(success)
		setSnackbarmsg(message)
		setErrorSnackbarOpen(error)
	}

	const changePassClose = () => {
		setOpenChanegPass(false)
	}

	const handleSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return
		}
		setSuccessSnackbarOpen(false)
		setErrorSnackbarOpen(false)
	}

	console.log('Phone', phone)
	console.log('Email', email)

	return (
		<>
			<div>
				<div className={classes.profileNameDiv}>
					<div
						className={classes.profilePictureDiv}
						style={{
							backgroundImage: `url(${userPic})`,
							'background-repeat': 'no-repeat',
							'background-size': 'cover',
							'background-position': 'center',
						}}
					>
						<form>
							<Input
								id='icon-button-file'
								name='file'
								className={`${classes.input}`}
								type='file'
								onChange={handleChangeProfilePic}
								placeholder='Document'
								accept='image/*'
							/>
						</form>
						<label htmlFor='icon-button-file'>
							<IconButton
								color='primary'
								aria-label='upload picture'
								component='span'
								className={classes.editProfile}
							>
								<img src={editButtonIcon} alt='Edit Profile Pic' />
							</IconButton>
						</label>
					</div>
					<Typography className={classes.profileName}>
						{userData
							? `${userData.user_details['firstname']} ${userData.user_details['lastname']}`
							: ''}
					</Typography>
				</div>
				<StudentPhone
					gender={userInfo['gender']}
					userPhones={phone}
					userEmails={email}
				/>
				{address ? <StudentAddress address={address} /> : ''}
				<StudentParents parentsData={parentsData} />
				<div className={classes.changePwdDiv}>
					<Button
						variant='outlined'
						color='primary'
						className={classes.changePwd}
						onClick={(event) => {
							setOpenChanegPass(true)
						}}
					>
						Change Password
					</Button>
				</div>
			</div>
			<br />
			<br />
			{openChangePass ? (
				<ChangePassword
					open={openChangePass}
					handleClose={changePassClose}
					handleSnackbar={handleSnackbar}
				/>
			) : (
				''
			)}

			<Snackbar
				open={successSnackbarOpen}
				autoHideDuration={6000}
				onClose={handleSnackbarClose}
			>
				<Alert onClose={handleSnackbarClose} severity='success'>
					{snackbarmsg}
				</Alert>
			</Snackbar>
			<Snackbar
				open={errorSnackbarOpen}
				autoHideDuration={6000}
				onClose={handleSnackbarClose}
			>
				<Alert onClose={handleSnackbarClose} severity='error'>
					{snackbarmsg}
				</Alert>
			</Snackbar>
			<BackdropLoader open={openLoader} />
		</>
	)
}

const mapStateToProps = (state) => {
	return {
		userInfo: state.auth.userInfo,
	}
}

export default connect(mapStateToProps)(StudentProfile)
