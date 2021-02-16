import React, { useState, useEffect } from 'react'
import 'date-fns'
import { useHistory, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'
import DateFnsUtils from '@date-io/date-fns'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import EventIcon from '@material-ui/icons/Event'
import { IconButton } from '@material-ui/core'
import BackIcon from '../../../assets/images/Back.svg'
import RichTextEditor from '../../../shared/richTextEditor'
import PublishLater from './PublishLater'
import AnnouncementService from '../AnnouncementService'

const useStyle = makeStyles((theme) => ({
	formStyle: {
		margin: 'auto',
		width: '95%',
		backgroundColor: 'white',
		justifyContent: 'center',
		textAlign: 'center',
		borderRadius: '5px',
	},
	sideMargins: {
		marginLeft: '20px',
		marginRight: '20px',
	},
	backImg: {
		float: 'left',
		transform: 'translateY(7px)',
		cursor: 'pointer',
	},
	adornmentColor: {
		color: 'rgba(0, 0, 0, 0.54)',
		paddingTop: '6px',
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
		fontFamily: 'Avenir Medium',
		fontize: '1.2rem',
		color: '#1C1C1E',
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
	sideMargins: {
		marginLeft: '20px',
		marginRight: '20px',
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
		border: '1px solid #eaeaea',
		padding: theme.spacing(0.5),
		textAlign: 'left',
	},
	paperShowIn: {
		display: 'flex',
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
		paddingTop: '10px',
	},
	contentCenter: {
		justifyContent: 'center',
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
	header:{
		marginTop: '20px',
		paddingTop: '20px',
	},
	margin: {
		marginTop: '20px',
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
			marginRight: '20px',
		},
	},
}))

const CreateAnnouncement = (props) => {
	const classes = useStyle()
	const history = useHistory()
	const { id } = useParams()
	const [openPubLater, setOpenPubLater] = useState(false)
	const [eventDate, setEventDate] = useState(null)
	const [title, setTitle] = useState('')
	const [summary, setSummary] = useState('')
	const [description, setDescription] = useState('')
	const [ status, setStatus ] = useState("draft");
	const [ publishDate, setPublishedDate ] = useState(null);
	const [errMessage, setError] = useState('')
	const [category, setCategory] = useState('')
	const [selectedGrade, setSelectedGrade] = useState([])
	const [classState, setClassState] = useState([])

	const classStateNames = [
		'All Teachers',
		'All Parents',
		'Select All',
		...Object.values(props.classState),
	]

	const categoryValues = [...Object.values(props.categories)]
	const gradeNames = [...Object.values(props.grades)]
	let saveDataApi
	useEffect(() => {
		let isFormLoading = true
		// give first api call to create

		// api call to save
		const fetchDraft = async () => {
			try {
				const response = await AnnouncementService.fetchDraftAnnouncement(
					{ id },
					props.token
				)
				if (response.status === 200) {
					if (isFormLoading) {
						console.log(response)
						let tempClassCheckState = []
						if (response.data.data.class_mapping) {
							if (response.data.data.class_mapping.parents) {
								tempClassCheckState.push('All Parents')
							}
							if (response.data.data.class_mapping.teachers) {
								tempClassCheckState.push('All Teachers')
							}
							response.data.data.class_mapping.class.forEach((classId) => {
								tempClassCheckState.push(props.classState[classId])
							})
						}
						setClassState([...tempClassCheckState])
						setDescription(
							response.data.data.main_content
								? response.data.data.main_content
								: ''
						)
						setTitle(response.data.data.title ? response.data.data.title : '')
						setSummary(
							response.data.data.summary ? response.data.data.summary : ''
						)
						setEventDate(response.data.data.event_date)
						setCategory(
							props.categories[response.data.data.category_id]
								? props.categories[response.data.data.category_id]
								: ''
						)
						setStatus(response.data.data.status)
						setPublishedDate(response.data.data.published_date)
						let tempGrade = []
						if(response.data.data.grade_group){
							response.data.data.grade_group.forEach((gradeID) => {
								tempGrade.push(props.grades[gradeID])
							})
						}
						setSelectedGrade(tempGrade)
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
	const saveDetails = async () => {
		try {
			
			let gradeMapping = [];
			selectedGrade.forEach((gradeName)=>{
				gradeMapping.push(parseInt(
					Object.keys(props.grades).find(
						(id) => props.grades[id] === gradeName
					)
				))
			})
			console.log(selectedGrade)

			let classMapping = { class: [] }

			let isSelectAll = classState.find(
				(classname) => classname === 'Select All'
			)
			if (isSelectAll) {
				classMapping['teachers'] = true
				classMapping['parents'] = true
				classMapping.class = [...Object.keys(props.classState)]
			} else {
				classState.forEach((classnames) => {
					if (classnames === 'All Parents') {
						classMapping['parents'] = true
					} else if (classnames === 'All Teachers') {
						classMapping['teachers'] = true
					} else {
						classMapping.class.push(
							parseInt(
								Object.keys(props.classState).find(
									(classId) => props.classState[classId] === classnames
								)
							)
						)
					}
				})
			}

			const response = await AnnouncementService.saveAnnouncement(
				{ id },
				{
					title,
					summary,
					grade_group_id:gradeMapping,
					event_date: eventDate,
					main_content: description,
					published_to: classMapping,
					status,
					category_id: parseInt(
						Object.keys(props.categories).find(
							(category_id) => props.categories[category_id] === category
						)
					),
				},
				props.token
			)

			if (response.status === 200) {
			}
		} catch (e) {
			console.log(e)
		}
	}
	useEffect(() => {
		saveDataApi = setInterval(() => {
			saveDetails()
		}, 10000)
		return () => clearInterval(saveDataApi)
	}, [title, eventDate, description, summary,selectedGrade,classState, category])

	const handleChangeInput = (event) => {
		let name = event.target.name
		if (name === 'title') {
			setTitle(event.target.value)
		} else {
			setSummary(event.target.value)
		}
	}

	const handleEventDate = (date) => {
		setEventDate(date)
	}
	const handleSelectClass = (event) => {
		setClassState(event.target.value)
	}
	const hanldeDeleteClass = (value) => {
		setClassState(classState.filter((classname) => classname !== value))
	}

	
	const handleGradeChange = (event) => {
		console.log(event.target.value)
		setSelectedGrade(event.target.value)
	}
	const hanldeDeleteGrade = (value) => {
		setSelectedGrade(selectedGrade.filter((gradename) => gradename !== value))
	}

	const handleDescription = (data) => {
		setDescription(data)
	}
	const handleCategoryChange = (event) => {
		setCategory(event.target.value)
	}

	const handleOpenPubLater = (event) => {
		if (classState.length === 0 || title === '' || summary === '') {
			setError('Fill All Data !')
		} else {
			setOpenPubLater(true)
		}
	}

	const handleClosePubLater = () => {
		setOpenPubLater(false)
	}

	const publishData = async (date, status, mediaURL) => {
		try {
			let classMapping = { class: [] }
			let gradeMapping = [];
			selectedGrade.forEach((gradeName)=>{
				gradeMapping.push(parseInt(
					Object.keys(props.grades).find(
						(id) => props.grades[id] === gradeName
					)
				))
			})
			let isSelectAll = classState.find(
				(classname) => classname === 'Select All'
			)
			if (isSelectAll) {
				classMapping['teachers'] = true
				classMapping['parents'] = true
				classMapping.class = [...Object.keys(props.classState)]
			} else {
				classState.forEach((classnames) => {
					if (classnames === 'All Parents') {
						classMapping['parents'] = true
					} else if (classnames === 'All Teachers') {
						classMapping['teachers'] = true
					} else {
						classMapping.class.push(
							parseInt(
								Object.keys(props.classState).find(
									(classId) => props.classState[classId] === classnames
								)
							)
						)
					}
				})
			}

			const response = await AnnouncementService.publishAnnouncement(
				{ id },
				{
					title,
					summary,
					status,
					grade_group_id: gradeMapping,
					event_date: eventDate,
					main_content: description,
					published_date: date,
					published_to: classMapping,
					media_url: mediaURL,
					category_id: parseInt(
						Object.keys(props.categories).find(
							(category_id) => props.categories[category_id] === category
						)
					),
				},
				props.token
			)
			if (response.status === 200) {
				history.replace('/news')
			}
		} catch (e) {
			console.log(e)
		}
	}
	const handlePublishLater = () => {
		clearInterval(saveDataApi)
		let mediaUrlContainer = document.createElement('div')
		mediaUrlContainer.innerHTML = description
		let mediaURL = null
		if (mediaUrlContainer.getElementsByTagName('img').length > 0) {
			mediaURL = mediaUrlContainer.getElementsByTagName('img')[0].src
		}

		const status = 'active'

		publishData(publishDate ,status, mediaURL)
	}
	const submitForm = async (event) => {
		event.preventDefault()
		clearInterval(saveDataApi)
		let mediaUrlContainer = document.createElement('div')
		mediaUrlContainer.innerHTML = description
		let mediaURL = null
		if (mediaUrlContainer.getElementsByTagName('img').length > 0) {
			mediaURL = mediaUrlContainer.getElementsByTagName('img')[0].src
		}

		const status = 'published'

		publishData(new Date().toISOString(), status, mediaURL)
	}

	return (
		<>
			<form className={classes.formStyle} onSubmit={submitForm}>
				<Box className={`${classes.header} ${classes.sideMargins}`} >
					<div>
						<img
							src={BackIcon}
							alt='Back'
							className={classes.backImg}
							onClick={async() => {
								await saveDetails()
								history.push('/news')
							}}
						/>
						<Typography
							variant='h5'
							className={`${classes.themeColor} ${classes.titleText}`}
						>
							Create Announcement
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
							label='Title'
							id='title'
							name='title'
							className={classes.inputBorder}
							value={title}
							onChange={handleChangeInput}
							required={true}
						/>
					</FormControl>
				</Box>
				<Box className={`${classes.margin} ${classes.sideMargins}`}>
					<FormControl className={classes.fieldStyle}>
						<TextField
							id='summary'
							name='summary'
							label='Summary'
							className={classes.inputBorder}
							value={summary}
							onChange={handleChangeInput}
							required={true}
						/>
					</FormControl>
				</Box>
				<Box className={`${classes.margin} ${classes.sideMargins}`}>
					<FormControl className={classes.fieldStyle}>
						<InputLabel>Categories</InputLabel>
						<Select
							labelId='demo-mutiple-chip-label'
							id='demo-mutiple-chip'
							value={category}
							required
							onChange={handleCategoryChange}
							input={<Input id='select-multiple-chip' />}
							MenuProps={{
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
										<Chip
											key={selected}
											label={selected}
											className={classes.chip}
										/>
									</div>
								)
							}}
						>
							{categoryValues.map((category) => (
								<MenuItem key={category} value={category}>
									{category}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Box>
				<Box className={`${classes.margin} ${classes.sideMargins}`}>
					<FormControl className={classes.fieldStyle}>
						<InputLabel>Select grade</InputLabel>
						<Select
							labelId='demo-mutiple-chip-label'
							id='demo-mutiple-chip'
							value={selectedGrade}
							multiple
							onChange={handleGradeChange}
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
												onDelete={() => hanldeDeleteGrade(value)}
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
							{gradeNames.map((gradename) => (
								<MenuItem key={gradename} value={gradename}>
									{gradename}
								</MenuItem>
							))}
						</Select>
					</FormControl>
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
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<Grid container className={classes.fieldStyle}>
							<Grid item xs={12}>
								<DatePicker
									id='eventDate'
									label='Event Date'
									variant='dialog'
									minDate={new Date()}
									format='MM/dd/yyyy'
									value={eventDate}
									onChange={handleEventDate}
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
						<Grid item sm={8} xs={12} className={classes.publishBtns}>
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
						<br />
						<br />
						<br />
					</Grid>
				</Box>
			</form>
			<br />
			<br />
			{openPubLater ? (
				<PublishLater
					open={openPubLater}
					publishDate={publishDate}
					handleClose={handleClosePubLater}
					handlePublishDate={setPublishedDate}
					handlePublishLater={handlePublishLater}
				/>
			) : (
				''
			)}
		</>
	)
}

const mapStateToProps = (state) => {
	return {
		token: state.auth.token,
	}
}

export default connect(mapStateToProps)(CreateAnnouncement)
