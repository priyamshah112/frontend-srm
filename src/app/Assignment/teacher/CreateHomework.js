import React, { useState, useEffect } from 'react'
import 'date-fns'
import { useHistory, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'
import DateFnsUtils from '@date-io/date-fns'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers'
import EventIcon from '@material-ui/icons/Event'
import BackIcon from '../../../assets/images/Back.svg'
import RichTextEditor from '../../../shared/richTextEditor'
import BackdropLoader from '../../common/ui/backdropLoader/BackdropLoader'
import PublishLater from './PublishLater'
import HomeworkService from '../HomeworkService'
import moment from 'moment'
import { IconButton } from '@material-ui/core'

const useStyle = makeStyles((theme) => ({
	formStyle: {
		margin: 'auto',
		width: '95%',
		backgroundColor: 'white',
		justifyContent: 'center',
		textAlign: 'center',
		borderRadius: '5px',
	},
	backImg: {
		float: 'left',
		transform: 'translate(0px, 7px)',
		cursor: 'pointer',
	},
	adornmentColor: {
		color: 'rgba(0, 0, 0, 0.54)',
	},
	themeColor: {
		color: `${theme.palette.common.deluge}`,
		padding: 0,
		margin: 0,
	},
	errorColor: {
		color: 'red',
	},
	titleText: {
		textAlign: 'center',
		margin: 'auto',
		fontFamily: 'Avenir Medium',
		fontize: '1.2rem',
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
	inputBorder: {
		height: '50px',
	},
	datePicker: {
		width: '100%',
		[theme.breakpoints.down('xs')]: {
			width: '100%',
		},
	},
	paper: {
		display: 'flex',
		minHeight: '40px',
		backgroundColor: 'none',
		justifyContent: 'left',
		flexWrap: 'wrap',
		listStyle: 'none',
		border: `1px solid ${theme.palette.common.deluge}`,
		padding: theme.spacing(0.5),
		margin: 'auto',
	},

	showIn: {
		paddingTop: '5px',
	},

	paperShowIn: {
		display: 'flex',
		minHeight: '40px',
		backgroundColor: 'none',
		justifyContent: 'left',
		flexWrap: 'wrap',
		listStyle: 'none',

		padding: theme.spacing(0.5),
		margin: 'auto',
	},
	chip: {
		margin: theme.spacing(0.5),
	},
	paperBoxShadow: {
		boxShadow: `2px 2px 2px 0 #E5E5EA`,
	},
	textAlignLeft: {
		textAlign: 'left',
		color: 'rgba(0, 0, 0, 0.54)',
	},
	contentCenter: {
		justifyContent: 'left',
	},
	chips: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	chip: {
		margin: 2,
	},
	publishBtns: {
		textAlign: 'right',
		justifyContent: 'right',
	},

	sideMargins: {
		marginLeft: '20px',
		marginRight: '20px',
	},
	sideMarginright: {
		marginRight: '50px',
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
}))

const CreateHomework = (props) => {
	const classes = useStyle()
	const history = useHistory()
	const { id } = useParams()

	const [openPubLater, setOpenPubLater] = useState(false)
	const [eventDate, setEventDate] = useState(null)
	const [title, setTitle] = useState('')
	const [summary, setSummary] = useState('')
	const [description, setDescription] = useState('')
	const [errMessage, setError] = useState('')
	const [submissionDate, setSubmissionDate] = useState(null)
	const [classState, setClassState] = useState([])

	const classStateNames = ['Select All', ...Object.values(props.classState)]

	let saveDataApi
	useEffect(() => {
		let isFormLoading = true
		// give first api call to create

		// api call to save
		const fetchDraft = async () => {
			try {
				const response = await HomeworkService.fetchDraftHomework(
					{ id },
					props.token
				)
				if (response.status === 200) {
					if (isFormLoading) {
						let tempClassCheckState = []
						response.data.data.class_mapping.class.forEach((classId) => {
							tempClassCheckState.push(props.classState[classId])
						})
						setClassState([...tempClassCheckState])
						setDescription(
							response.data.data.main_content
								? response.data.data.main_content
								: ''
						)
						setTitle(response.data.data.title ? response.data.data.title : '')
						setSubmissionDate(
							response.data.data.submission_date
								? new Date(response.data.data.submission_date)
								: new Date()
						)
					}
				}
			} catch (e) {
				console.log(e)
			}
		}
		fetchDraft()
		return () => {
			isFormLoading = false
		}
	}, [])
	const handleSelectClass = (event) => {
		setClassState(event.target.value)
	}

	const saveDetails = async (isBack) => {
		try {
			let classMapping = { class: [] }
			let isSelectAll = classState.find(
				(classname) => classname === 'Select All'
			)
			if (isSelectAll) {
				classMapping.class = [...Object.keys(props.classState)]
			} else {
				classState.forEach((classnames) => {
					classMapping.class.push(
						parseInt(
							Object.keys(props.classState).find(
								(classId) => props.classState[classId] === classnames
							)
						)
					)
				})
			}
			let submissionData = {}
			if (submissionDate) {
				submissionData = {
					title: title,
					main_content: description,
					submission_date: submissionDate.toISOString(),
					published_to: classMapping,
				}
			} else {
				submissionData = {
					title: title,
					main_content: description,
					published_to: classMapping,
				}
			}

			const response = await HomeworkService.saveHomework(
				{ id },
				submissionData,
				props.token
			)
			if (response.status === 200) {
				console.log('Saved')
			}
		} catch (e) {
			console.log(e)
		}
		if (isBack) {
			history.push('/assignment')
		}
	}

	useEffect(() => {
		saveDataApi = setInterval(() => {
			saveDetails(false)
		}, 10000)
		return () => clearInterval(saveDataApi)
	}, [title, description, submissionDate, classState])

	const handleChangeInput = (event) => {
		let name = event.target.name
		if (name === 'title') {
			setTitle(event.target.value)
		} else {
			setSummary(event.target.value)
		}
	}

	const hanldeDeleteClass = (value) => {
		setClassState(classState.filter((classname) => classname !== value))
	}

	const handleDescription = (data) => {
		setDescription(data)
	}
	const handleOpenPubLater = (event) => {
		if (moment(submissionDate).isAfter(new Date())) {
			if (title === '' || submissionDate === null) {
				setError('Fill All Data !')
			} else {
				setOpenPubLater(true)
			}
		} else {
			setError('Check submission date')
		}
	}

	const handleClosePubLater = () => {
		setOpenPubLater(false)
	}

	const publishData = async (publisedDate, status) => {
		try {
			let classMapping = { class: [] }
			let isSelectAll = classState.find(
				(classname) => classname === 'Select All'
			)
			if (isSelectAll) {
				classMapping.class = [...Object.keys(props.classState)]
			} else {
				classState.forEach((classnames) => {
					classMapping.class.push(
						parseInt(
							Object.keys(props.classState).find(
								(classId) => props.classState[classId] === classnames
							)
						)
					)
				})
			}

			const response = await HomeworkService.publishHomework(
				{ id },
				{
					title: title,
					main_content: description,
					status: status,
					published_to: classMapping,
					published_date: publisedDate,
					submission_date: submissionDate.toISOString(),
				},
				props.token
			)
			if (response.status === 200) {
				console.log('Published')
				history.replace('/assignment')
			}
		} catch (e) {
			console.log(e)
		}
	}

	const handlesubmissionDate = (date) => {
		setSubmissionDate(date)
	}

	const handleBack = (event) => {
		saveDetails(true)
	}

	const handlePublishLater = (laterEventDate) => {
		const status = 'active'
		publishData(laterEventDate.toISOString(), status)
	}

	const submitForm = async (event) => {
		event.preventDefault()
		if (moment(submissionDate).isAfter(new Date())) {
			if (title === '' || submissionDate === null) {
				setError('Fill All Data !')
			} else {
				clearInterval(saveDataApi)
				const status = 'published'
				publishData(new Date().toISOString(), status)
			}
		} else {
			setError('Check submission date')
		}
	}

	return (
		<>
			<div>
				<form className={classes.formStyle} onSubmit={submitForm}>
					<Box className={`${classes.margin} ${classes.sideMargins}`} pt={4}>
						<div>
							<img
								src={BackIcon}
								alt='Back'
								className={classes.backImg}
								onClick={handleBack}
							/>
							<Typography
								variant='h5'
								className={`${classes.themeColor} ${classes.titleText}`}
							>
								Create Homework
							</Typography>
						</div>
					</Box>
					{errMessage ? (
						<Box className={classes.margin} pt={2}>
							<div>
								<Typography className={`${classes.errorColor}`}>
									{errMessage}
								</Typography>
							</div>
						</Box>
					) : (
						''
					)}
					<Box className={`${classes.margin} ${classes.sideMargins}`}>
						<FormControl className={classes.fieldStyle}>
							<TextField
								id='title'
								name='title'
								className={classes.inputBorder}
								value={title}
								onChange={handleChangeInput}
								required={true}
								label='Title'
							/>
						</FormControl>
					</Box>
					<Box className={`${classes.margin} ${classes.sideMargins}`}>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<Grid container className={classes.fieldStyle}>
								<Grid item xs={12}>
									<DateTimePicker
										id='submission_date'
										label='Submission Date'
										variant='dialog'
										minDate={new Date()}
										format='yyyy/MM/dd hh:mm a'
										value={submissionDate}
										onChange={handlesubmissionDate}
										InputProps={{
											endAdornment: (
												<InputAdornment position='end'>
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
						<FormControl className={classes.fieldStyle}>
							<InputLabel>Select classes</InputLabel>
							<Select
								labelId='demo-mutiple-chip-label'
								id='demo-mutiple-chip'
								value={classState}
								multiple
								onChange={handleSelectClass}
								input={<Input id='select-multiple-chip' />}
								MenuProps={{
									PaperProps: {
										style: {
											maxHeight: '300px',
										},
									},
									anchorOrigin: {
										vertical: 'bottom',
										horizontal: 'center',
									},
									transformOrigin: {
										vertical: 'top',
										horizontal: 'center',
									},
									getContentAnchorEl: null,
								}}
								renderValue={(selected) => {
									return (
										<div className={classes.chips}>
											{selected.map((value) => (
												<Chip
													onDelete={() => hanldeDeleteClass(value)}
													onMouseDown={(event) => {
														event.stopPropagation()
													}}
													key={value}
													label={value}
													className={classes.chip}
												/>
											))}
										</div>
									)
								}}
							>
								{classStateNames.map((classname) => (
									<MenuItem key={classname} value={classname}>
										{classname}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Box>
					<Box className={`${classes.margin} ${classes.sideMargins}`}>
						<Grid className={classes.fieldStyle}>
							<Typography className={classes.textAlignLeft}>
								Description
							</Typography>
							<RichTextEditor
								handleDescription={handleDescription}
								value={description}
								token={props.token}
							/>
						</Grid>
					</Box>
					<Box className={`${classes.margin} ${classes.sideMargins}`}>
						<Grid
							container
							className={classes.fieldStyle}
							direction='row-reverse'
						>
							<Grid item sm={6} xs={12} className={classes.publishBtns}>
								<Button
									id='publishLaterBtn'
									variant='contained'
									onClick={handleOpenPubLater}
									className={`${
										classes.fieldStyle
									} ${'publishBtn'} ${'publishLaterBtn'}`}
									disableElevation
								>
									Publish Later
								</Button>
								<Button
									id='publishBtn'
									variant='contained'
									className={`${classes.fieldStyle} ${'publishBtn'}`}
									color='primary'
									type='submit'
									disableElevation
								>
									Publish Now
								</Button>
							</Grid>
							<Grid item sm={6} xs={12} className={classes.textAlignLeft}>
								<br />
								<br />
							</Grid>

							<br />
							<br />
							<br />
						</Grid>
					</Box>
				</form>
			</div>
			<br />
			<br />
			{openPubLater ? (
				<PublishLater
					open={openPubLater}
					submissionDate={submissionDate}
					handleClose={handleClosePubLater}
					handlePublishLater={handlePublishLater}
				/>
			) : (
				''
			)}
			<BackdropLoader open={props.openLoader} />
		</>
	)
}

const mapStateToProps = (state) => {
	return {
		token: state.auth.token,
	}
}

export default connect(mapStateToProps)(CreateHomework)
