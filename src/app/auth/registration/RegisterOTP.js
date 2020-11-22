import React, { useState, useRef } from 'react'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/styles'
import MuiAlert from '@material-ui/lab/Alert'
import AuthContainer from '../AuthContainer'
import RegisterService from './RegisterService'
import RegisterPwd from './RegisterPwd'
import phoneSvg from '../../../assets/images/Desktop Phone number.svg'
import { Typography, Snackbar } from '@material-ui/core'

function Alert(props) {
	return <MuiAlert elevation={6} variant='filled' {...props} />
}

const useStyle = makeStyles((theme) => ({
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
		width: '80%',
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
	inputBorder: {
		height: '50px',
		'& span': {
			paddingLeft: '10px',
		},
	},
	errorColor: {
		color: 'red',
	},
	successColor: {
		color: 'green',
	},
	margin: {
		marginTop: '30px',
		'@media (max-width:400px)': {
			marginTop: '10px',
		},

		'& .loginBtn': {
			borderRadius: '6px',
			marginTop: '10px',
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

const RegisterOTP = (props) => {
	const classes = useStyle()
	const otp_ref = useRef(null)
	let [isDisable, setdisable] = useState(true)
	let [otp, setotp] = useState('')
	const [otpSubmit, setOtpSubmit] = useState(false)
	const [pwdToken, setPwdToken] = useState('')
	const [errMessage, setError] = useState('')
	const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false)
	const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false)
	const [snackbarMessage, setSnackbarMessage] = useState('')
	const [otpToken, setOtpToken] = useState(props.token)

	async function getOtpFunction() {
		try {
			console.log('Re generate Otp for: ', props.user, props.school)
			const response = await RegisterService.sendOtp(
				{ username: props.user },
				props.school
			)
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

	async function validateOtpFunction() {
		try {
			props.handleLoading(true)
			const response = await RegisterService.otpValidate(otpToken, {
				otp: otp,
			})
			props.handleLoading(false)
			if (response.status === 200) {
				setPwdToken(response.data.data.token)
				setOtpSubmit(true)
			}
		} catch (error) {
			setError('OTP is not correct')
			props.handleLoading(false)
		}
	}

	const submitForm = (event) => {
		event.preventDefault()
		console.log('OTP Submited')
		validateOtpFunction()
	}

	const handleReOtp = (event) => {
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
			{otpSubmit ? (
				<RegisterPwd token={pwdToken} />
			) : (
				<AuthContainer title='Register'>
					<div>
						<Box className={classes.boxMargin}></Box>
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
										startAdornment={
											<InputAdornment position='start'>
												<img src={phoneSvg} width='40px' alt='Phone SVG' />
											</InputAdornment>
										}
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
								<Typography>
									<span className={classes.reOtp} onClick={handleReOtp}>
										Re-Generate OTP
									</span>
								</Typography>
							</Box>
						</form>
					</div>
				</AuthContainer>
			)}
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

export default RegisterOTP
