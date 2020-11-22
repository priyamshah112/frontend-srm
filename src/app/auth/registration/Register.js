import React, { useState, useEffect } from 'react'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/styles'
import AuthContainer from '../AuthContainer'
import RegisterOTP from './RegisterOTP'
import RegisterService from './RegisterService'
import phoneSvg from '../../../assets/images/Desktop Phone number.svg'
import { Typography, InputLabel, MenuItem, Select } from '@material-ui/core'
import BackdropLoader from '../../common/ui/backdropLoader/BackdropLoader'
import { useHistory, Link } from 'react-router-dom'

const useStyle = makeStyles((theme) => ({
	formStyle: {
		margin: 'auto',
		width: '100%',
		justifyContent: 'center',
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
	selectStyle: {
		textAlign: 'left',
	},

	login: {
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
}))

const Register = () => {
	const classes = useStyle()
	const history = useHistory()
	const [schools, setSchools] = useState([])
	const [userSubmit, setUserSubmit] = useState(false)
	const [user, setUser] = useState('')
	const [isPhone, setIsPhone] = useState(false)
	const [token, setToken] = useState('')
	const [errMessage, setError] = useState('')
	const [isLoading, setLoading] = useState(false)
	const [selectedSchool, setSelectedSchool] = useState('')

	useEffect(() => {
		let isPageLoading = true
		const getSchools = async () => {
			console.log('in here')

			const response = await RegisterService.fetchSchools()
			console.log('Response', response)
			if (isPageLoading) {
				setSchools(response.data.data)
			}
		}
		getSchools()
		return () => {
			isPageLoading = false
		}
	}, [])

	async function getOtpFunction(userData) {
		try {
			console.log('Send OTP Function for user: ', userData)
			handleLoading(true)
			const response = await RegisterService.sendOtp(
				{ username: userData },
				parseInt(selectedSchool)
			)
			console.log('OTP is: ', response.data.data.otp)
			setToken(response.data.data.access_token)
			handleLoading(false)

			if (response.status === 200) {
				console.log('OTP Sent Successfully')
				setUserSubmit(true)
			} else if (response.status === 422) {
				console.log(response)
				setError(response.data.data.message)
			} else {
				console.log('Error')
				setError('User not found')
			}
		} catch (error) {
			console.log(error)
			if (error.response.status === 422) {
				setError(error.response.data.message)
			}
			handleLoading(false)
		}
	}

	const submitForm = (event) => {
		event.preventDefault()
		if (user === '' || selectedSchool === '') {
			setError('Fill all data')
		} else {
			getOtpFunction(user)
		}
	}

	const handleSchool = (event) => {
		setError('')
		setSelectedSchool(event.target.value)
	}

	const handleLoading = (load) => {
		setLoading(load)
	}

	const handleLogin = () => {
		history.push('/login')
	}

	const handleForm = (event) => {
		setError('')
		setUser(event.target.value)
	}

	useEffect(() => {
		if (isPhone) {
			getOtpFunction(user)
		}
	}, [isPhone])

	const renderOtp = (
		<>
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
									id='username'
									name='username'
									className={classes.inputBorder}
									type='text'
									onChange={handleForm}
									placeholder='Enter Username'
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
								<InputLabel id='school-select'>Select School</InputLabel>
								<Select
									labelId='school-select'
									id='school-select'
									value={selectedSchool}
									className={classes.selectStyle}
									onChange={handleSchool}
								>
									{schools.map((school) => {
										return (
											<MenuItem key={school.id} value={school.id}>
												{school.name}
											</MenuItem>
										)
									})}
								</Select>
							</FormControl>
						</Box>

						<Box className={classes.margin}>
							<Button
								id='phoneSubmit'
								type='submit'
								variant='contained'
								className={`${classes.fieldStyle} ${'loginBtn'}`}
								color='primary'
								disableElevation
							>
								SUBMIT
							</Button>
						</Box>

						<Box className={`${classes.Margin} ${classes.login}`}>
							<Link onClick={handleLogin}>
								<Typography>Already Registered ? Login</Typography>
							</Link>
						</Box>
					</form>
				</div>
			</AuthContainer>
		</>
	)

	return (
		<>
			{userSubmit ? (
				<RegisterOTP
					user={user}
					school={parseInt(selectedSchool)}
					handleLoading={handleLoading}
					token={token}
				/>
			) : (
				renderOtp
			)}
			<BackdropLoader open={isLoading} />
		</>
	)
}

export default Register
