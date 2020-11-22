import React, { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/styles'
import MuiAlert from '@material-ui/lab/Alert'
import { Typography, Snackbar, Dialog, DialogContent } from '@material-ui/core'
import ProfileService from './ProfileService'
import phoneIcon from '../../assets/images/profile/Email.svg'

function Alert(props) {
	return <MuiAlert elevation={6} variant='filled' {...props} />
}

const useStyle = makeStyles((theme) => ({
	dialogPaper: {
		width: '300px',
	},
	cardHeader: {
		textAlign: 'left',
	},
	profileTitle: {
		display: 'inline',
		marginLeft: '5px',
		fontWeight: 500,
		fontSize: '14px',
		textTransform: 'uppercase',
	},
	iconStyle: {
		width: '19px',
		height: '19px',
		transform: 'translateY(4px)',
	},
	formStyle: {
		margin: 'auto',
		width: '100%',
		justifyContent: 'center',
		textAlign: 'center',
		paddingBttom: '20px',
	},
	boxMargin: {
		marginTop: '30px',
		'@media (max-width:400px)': {
			marginTop: '10px',
		},
	},
	fieldStyle: {
		width: '100%',
		margin: 'auto',
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
	dataContentRoot: {
		padding: '24px',
	},
	errorColor: {
		color: 'red',
	},
	inputBorder: {
		height: '50px',
		'& span': {
			paddingLeft: '10px',
		},
	},
	margin: {
		marginTop: '10px',
		'@media (max-width:400px)': {
			marginTop: '10px',
		},

		'& .loginBtn': {
			borderRadius: '6px',
			marginBotton: '10px',
		},
	},
	reOtp: {
		color: `${theme.palette.common.deluge}`,
		cursor: 'pointer',
		'&:hover': {
			textDecoration: 'underline',
		},
	},
}))

const ChangeEmailOtp = (props) => {
	const classes = useStyle()
	const otp_ref = useRef(null)
	let [isDisable, setdisable] = useState(true)
	let [otp, setotp] = useState('')
	const [otpSubmit, setOtpSubmit] = useState(false)
	const [pwdToken, setPwdToken] = useState('')
	const history = useHistory()
	const [errMessage, setError] = useState('')
	const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false)
	const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false)
	const [snackbarMessage, setSnackbarMessage] = useState('')
	const [otpToken, setOtpToken] = useState(props.token)

	async function getOtpFunction() {
		try {
			console.log('Regenerate OTP for: ', props.user)
			const response = await ProfileService.sendOtp({
				username: props.user,
				send_direct: 'true',
				user_id: props.userId,
			})
			if (response.status === 200) {
				console.log('OTP Sent Successfully')
				setOtpToken(response.data.data.access_token)
				setSnackbarMessage(response.data.message)
				setSuccessSnackbarOpen(true)
			}
		} catch (error) {
			console.log(error)
			setSnackbarMessage('Failed to send OTP')
			setErrorSnackbarOpen(true)
		}
	}

	async function updateEmailFunction() {
		try {
			console.log('Regenerate OTP for: ', props.user)
			const token = localStorage.getItem('srmToken')

			const response = await ProfileService.updateEmail(
				token,
				props.editableId,
				{
					email: props.user,
					is_primary: 'false',
				}
			)
			if (response.status === 200) {
				history.push('/profile')
				props.onClose()
			}
		} catch (error) {
			console.log(error)
		}
	}

	async function postEmailFunction() {
		try {
			const token = localStorage.getItem('srmToken')

			const response = await ProfileService.postEmail(token, {
				user_id: props.userId,
				email: props.user,
				is_primary: 'false',
			})
			console.log('Response', response)
			if (response.status === 200) {
				history.push('/profile')
				props.onClose()
			}
		} catch (error) {
			console.log(error)
		}
	}

	async function validateOtpFunction() {
		try {
			props.handleLoading(true)
			const response = await ProfileService.otpValidate(otpToken, { otp: otp })
			props.handleLoading(false)
			if (response.status === 200) {
				setPwdToken(response.data.data.token)
				setOtpSubmit(true)
				console.log(props.editableId, 'To be edit')
				if (props.editableId) {
					updateEmailFunction()
				} else {
					postEmailFunction()
				}
			}
		} catch (error) {
			setError('OTP is not correct')
			props.handleLoading(false)
		}
	}
	const submitForm = (event) => {
		event.preventDefault()
		console.log('OTP Submited')
		setdisable(true)
		validateOtpFunction()
	}

	const handleReOtp = () => {
		getOtpFunction()
	}

	const validate = (event) => {
		let name = event.target.name
		setError('')
		const otp_re = /^[0-9]{6}$/gm
		if (name === 'otp') {
			setotp((otp = event.target.value))
		}
		if (otp_re.test(otp)) {
			setdisable(false)
		} else {
			setdisable(true)
		}
	}

	const handleSnackbarClose = (reason) => {
		if (reason === 'clickaway') {
			return
		}

		setSuccessSnackbarOpen(false)
		setErrorSnackbarOpen(false)
	}

	return (
		<>
			<Dialog
				open={props.open}
				onClose={props.onClose}
				maxWidth={'xs'}
				fullWidth={false}
				classes={{ paper: classes.dialogPaper }}
			>
				<DialogContent classes={{ root: classes.dataContentRoot }}>
					<div className={classes.cardHeader}>
						<img src={phoneIcon} className={classes.iconStyle} />
						<Typography className={classes.profileTitle}>
							Change Email Address
						</Typography>
					</div>
					<Typography className={`${classes.errorColor}`}>
						{errMessage}
					</Typography>
					<form className={classes.formStyle} onSubmit={submitForm}>
						<Box className={classes.margin}>
							<FormControl className={classes.fieldStyle}>
								<Input
									id='otp'
									ref={otp_ref}
									name='otp'
									className={classes.inputBorder}
									type='text'
									onChange={validate}
									placeholder='Enter OTP'
								/>
							</FormControl>
						</Box>
						<Box className={classes.margin}>
							<Button
								id='otpSubmit'
								type='submit'
								variant='contained'
								className={`${classes.fieldStyle} ${'loginBtn'}`}
								color='primary'
								disabled={isDisable}
								disableElevation
							>
								SUBMIT
							</Button>
						</Box>
						<Box className={classes.margin}>
							<Button
								id='phoneSubmit'
								type='submit'
								variant='outlined'
								className={`${classes.fieldStyle} ${'loginBtn'}`}
								color='oulined'
								disableElevation
								onClick={(event) => {
									props.onClose()
								}}
							>
								Cancel
							</Button>
						</Box>
						<Box className={classes.margin}>
							<Typography>
								<span className={classes.reOtp} onClick={handleReOtp}>
									Re-Generate OTP
								</span>
							</Typography>
						</Box>
					</form>
				</DialogContent>
			</Dialog>
			<Snackbar
				open={successSnackbarOpen}
				autoHideDuration={6000}
				onClose={handleSnackbarClose}
			>
				<Alert onClose={handleSnackbarClose} severity='success'>
					{snackbarMessage}
				</Alert>
			</Snackbar>
			<Snackbar
				open={errorSnackbarOpen}
				autoHideDuration={6000}
				onClose={handleSnackbarClose}
			>
				<Alert onClose={handleSnackbarClose} severity='error'>
					{snackbarMessage}
				</Alert>
			</Snackbar>
		</>
	)
}

export default ChangeEmailOtp
