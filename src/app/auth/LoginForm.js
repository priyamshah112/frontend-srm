import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import { connect } from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import AuthContainer from './AuthContainer'
import * as actions from './store/actions'
import phoneSvg from '../../assets/images/Desktop Phone number.svg'
import passwordSvg from '../../assets/images/Desktop Password.svg'
import BackdropLoader from '../common/ui/backdropLoader/BackdropLoader'
import { IconButton } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

function Alert(props) {
	return <MuiAlert elevation={6} variant='filled' {...props} />
}

const useStyle = makeStyles(() => ({
	formStyle: {
		margin: 'auto',
		width: '100%',
		justifyContent: 'center',
		textAlign: 'center',
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
	},

	fgtPass: {
		marginBottom: '15px',
		marginTop: '30px',
		cursor: 'pointer',
		'& a': {
			color: '#707070',
			textDecoration: 'none',
		},
		'& a:hover': {
			textDecoration: 'underline',
		},
		'@media (max-width:400px)': {
			marginTop: '10px',
			marginBottom: 0,
		},
	},
	margin: {
		marginTop: '30px',
		'@media (max-width:400px)': {
			marginTop: '10px',
		},

		'& .loginBtn': {
			borderRadius: '6px',
		},
	},
	error: {
		color: 'red',
	},
}))

const LoginForm = (props) => {
	const classes = useStyle()
	const history = useHistory()
	const [isDisable, setDisable] = useState(true)
	const [user, setUser] = useState('')
	const [password, setPassword] = useState('')
	const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false)
	const [snackbarmsg, setSnackbarmsg] = useState('')
	const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false)
	const [showPassword, setShowPassword] = useState(false)

	const submitForm = (event) => {
		event.preventDefault()
		props.onLoginSubmit(user, password)
	}

	useEffect(() => {
		let queryString = props.history.location.search
		let params = new URLSearchParams(queryString)
		let fgtpass = params.get('fgtpass')
		let register = params.get('register')
		console.log(params.get('register'))
		if (fgtpass !== null) {
			if (fgtpass === 'true') {
				setSnackbarmsg('Password updated successfully')
				setSuccessSnackbarOpen(true)
			}
			if (fgtpass === 'false') {
				setSnackbarmsg('Failed to update the password')
				setErrorSnackbarOpen(true)
			}
		}
		if (register !== null) {
			if (register === 'true') {
				setSnackbarmsg('User registered successfully')
				setSuccessSnackbarOpen(true)
			}
			if (register === 'false') {
				setSnackbarmsg('User registration failed')
				setErrorSnackbarOpen(true)
			}
		}
	}, [])

	useEffect(() => {
		if (user.length > 0 && password.length > 0) {
			setDisable(false)
		} else {
			setDisable(true)
		}
	}, [user, password])

	const validate = (event) => {
		let name = event.target.name
		if (name === 'user') {
			setUser(event.target.value)
		}
		if (name === 'password') {
			setPassword(event.target.value)
		}
	}

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword)
	}

	const handleForgotPassword = (event) => {
		event.preventDefault()
		history.push('/changepwdotp')
	}

	const handleRegistration = (event) => {
		event.preventDefault()
		history.push('/register')
	}

	const handleSnackbarClose = (reason) => {
		if (reason === 'clickaway') {
			return
		}
		setSuccessSnackbarOpen(false)
		setErrorSnackbarOpen(false)
	}

	let errorDesc = ''
	if (props.error) {
		errorDesc = <Typography className={classes.error}>{props.error}</Typography>
	}

	return (
		<AuthContainer title='LOGIN'>
			<div>
				<Box className={classes.boxMargin}></Box>

				<form className={classes.formStyle} onSubmit={submitForm}>
					<Box className={classes.margin}>
						{errorDesc}
						<FormControl className={classes.fieldStyle}>
							<Input
								id='user'
								name='user'
								className={classes.inputBorder}
								type='text'
								value={user}
								onChange={validate}
								placeholder='Email, Phone or User ID'
								startAdornment={
									<InputAdornment position='start'>
										<img src={phoneSvg} width='40px' alt='Phone SVG' />
									</InputAdornment>
								}
							/>
						</FormControl>
					</Box>
					<Box className={classes.margin}>
						<FormControl className={classes.fieldStyle}>
							<Input
								id='password'
								name='password'
								className={classes.inputBorder}
								type={showPassword ? 'text' : 'password'}
								value={password}
								onChange={validate}
								placeholder='Enter Password'
								startAdornment={
									<InputAdornment position='start'>
										<img src={passwordSvg} width='40px' alt='Phone SVG' />
									</InputAdornment>
								}
								endAdornment={
									<InputAdornment position='end'>
										<IconButton
											aria-label='toggle password visibility'
											onClick={handleClickShowPassword}
										>
											{showPassword ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								}
							/>
						</FormControl>
					</Box>
					<Box className={classes.margin}>
						<Button
							id='loginBtn'
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
					<Box className={`${classes.Margin} ${classes.fgtPass}`}>
						<Link onClick={handleForgotPassword}>
							<Typography>Forgot Password?</Typography>
						</Link>
					</Box>
					<Box className={`${classes.Margin} ${classes.fgtPass}`}>
						<Link onClick={handleRegistration}>
							<Typography>User Registration</Typography>
						</Link>
					</Box>
				</form>
			</div>
			<BackdropLoader open={props.loading} />
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
		</AuthContainer>
	)
}

const mapStateToProps = (state) => {
	return {
		error: state.auth.error,
		loading: state.auth.loading,
		isAuthenticated: state.auth.token !== null,
		redirectUrl: state.auth.redirectUrl,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onLoginSubmit: (userId, password) =>
			dispatch(actions.authUser(userId, password)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
