import React, { useState, useEffect } from 'react'
import 'date-fns'
import { useHistory, useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import DateFnsUtils from '@date-io/date-fns'
import InputLabel from '@material-ui/core/InputLabel'
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers'
import EventIcon from '@material-ui/icons/Event'
import RichTextEditor from '../../../shared/richTextEditor'
import HomeworkService from '../HomeworkService'
import moment from 'moment'
import { IconButton } from '@material-ui/core'
import { Card, DropArea, DropdownCS, BackHeader, Container, PublishLaterButton,PublishNowButton, DocsDeleteViewer, AlertPop, BackdropLoader } from '../../common'

const useStyle = makeStyles((theme) => ({
	adornmentColor: {
		color: 'rgba(0, 0, 0, 0.54)',
	},
	errorMsg: {
		color: 'red',
		textAlign: 'center'
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
	sideMarginright: {
		marginRight: '50px',
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

const CreateHomework = (props) => {
	const classes = useStyle()
	const history = useHistory()
	const { id } = useParams()
	const [ isLoading, setLoading ] = useState(true)
	const [ disable, setDisable ] = useState(false)
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [fileList, setFileList] = useState([])
	const [errMessage, setError] = useState('')
	const [submissionDate, setSubmissionDate] = useState(getSubmissionDate())
	const [ publishDate, setPublishDate ] = useState(new Date());
	const [subjectID, setSubjectID] = useState('')
	const [subjectMenu, setSubjectMenu] = useState([])
	const [subjectMenuLoading, setSubjectMenuLoading] = useState(true)
	const [classID, setClassID] = useState('')
	const [classMenu, setClassMenu] = useState([])
	const [classMenuLoading, setClassMenuLoading] = useState(true)
	const [status, setStatus] = useState('draft')
	const [documents,setDocuments] = useState([])
	const [ openSnackbar, setOpenSnackbar] = useState(false)
	const [ snackBarStatus, setSnackBarStatus ] = useState('')
	const [ snackBarMsg, setSnackBarMsg ] = useState('')
	const token = localStorage.getItem('srmToken')
	const userInfo = JSON.parse(localStorage.getItem('srmUserInfo'))

	useEffect(() => {
		fetchDraft();
	}, [id]);

	useEffect(() => {
		const saveDataApi = setInterval(() => {
			saveDetails({
				status: status,
				date: publishDate,
				isBack: false
			})
		}, 10000)
		return () => clearInterval(saveDataApi)
	}, [title,classID,subjectID, fileList ,description, status,publishDate,submissionDate])

	const fetchDraft = async () => {
		setLoading(true)
		try {
			const response = await HomeworkService.fetchDraftHomework(
				{ id },
				token
			)
			if (response.status === 200) {
				// console.log(response.data.data.homework)
				let homework = response.data.data.homework;
				setClassID(
					homework.class_mapping[0]
						? homework.class_mapping[0]
					: ''
				)
				setSubjectID(
					homework.subject_id
						? homework.subject_id
					: ''
				)
				setDescription(
					homework.main_content
						? homework.main_content
						: ''
				)
				setTitle(homework.title ? homework.title : '')
				setSubmissionDate(
					homework.submission_date
						? homework.submission_date
						: getSubmissionDate()
				)
				setPublishDate(homework.published_date ? homework.published_date : null)
				setStatus(homework.status ? homework.status : 'draft' )
				setDocuments(homework.teacher_document ? homework.teacher_document : [] )
			}
		} catch (e) {
			console.log(e)
		}
		setLoading(false)
	}

	useEffect(()=>{
		fetchClassMenus()
	},[])

	useEffect(()=>{
		if(classID !== ''){
			fetchSubjectMenus()
		}
	},[classID])

	function getSubmissionDate(){
		let d = new Date()
		if(d.getDay() === 4){
			return moment(d).add(4,'days')
		}
		else if(d.getDay() === 5){
			return moment(d).add(3,'days')
		}
		else{
			return moment(d).add(2,'days')
		}
	}
	const fetchClassMenus = async () => {
		setClassMenuLoading(true)
		try{			
			const res = await HomeworkService.fetchClasses(token)
			if(res.status === 200){
				console.log(res.data)
				setClassMenu(res.data.data)
			}
		}
		catch(e){
			console.log(e)
		}
		setClassMenuLoading(false)
	}
	const fetchSubjectMenus = async () => {
		setSubjectMenuLoading(true)
		try {
			const res = await HomeworkService.getSubjectsByClass(token, classID)
			if (res.status === 200) {
				setSubjectMenu(res.data.data)
			}
		} catch (e) {
			console.log(e)
		}
		setSubjectMenuLoading(false)
	}

	const saveDetails = async ({status,date,isBack}) => {
		if(isBack){
			setDisable(true)
		}	
		try {
			const formData = new FormData()
			for(let key in fileList){
				formData.append(`upload_document[${key}]`,fileList[key])
			}
			formData.append('title',title)
			formData.append('main_content',description)
			formData.append(`published_to`,classID)
			formData.append('subject_id',subjectID)
			formData.append('school_id',userInfo.user_classes.school_id)
			formData.append('status',status)
			if ((status === "published" && date) || (status === "active" && date)) {
				formData.append('published_date',publishDate)
				formData.append('submission_date', submissionDate)
			}
			const response = await HomeworkService.saveHomework(
				{ id },
				formData,
				token
			)
			console.log(response)
			if (response.status === 200) {
				console.log('Saved')
				if(response.data.status === "failure"){
					setSnackBarStatus('warning')
					setSnackBarMsg(response.data.message)
					setOpenSnackbar(true)
					setSubjectID('')
					setDisable(false)
					return
				}
			}
		} catch (e) {
			console.log(e)
		}
		if(isBack){
			setDisable(false)
			history.push('/assignment')
		}
	}

	const handleChangeInput = (event) => {
		let name = event.target.name
		if (name === 'title') {
			setTitle(event.target.value)
		}
	}
	const handleClassChange = (value) => {
		setSubjectID('')
		setClassID(value)
	}
	const handleSubjectChange = (value) => {
		setSubjectID(value)
	}

	const handleDescription = (data) => {
		setDescription(data)
	}

	const handlesubmissionDate = (date) => {
		setSubmissionDate(date)

	}

	const handleBack = () => {
		saveDetails({
			status: status,
			date: publishDate,
			isBack: true
		})
	}

	const handlePublishLater = () => {
		setStatus('active')
		saveDetails({
			status: 'active',
			date: publishDate,
			isBack: true
		})
	}

	const submitForm = async (event) => {
		event.preventDefault()
		if(validation()){
			let date = new Date().toISOString()
			setStatus('published')
			setPublishDate(date)
			saveDetails({
				status: 'published',
				date: date,
				isBack: true
			})
		}		
	}

	const validation = () =>{
		if (moment(submissionDate).isAfter(new Date())) {
			if (title === '' || submissionDate === null || ( description === ''  && fileList.length < 1)) {
				setError('Fill All Data !')
				return false
			}
		} else {
			setError('Check submission date')
			return false
		}
		return true
	}
	const handleQuestionDoc = (files) =>{
		console.log(files)
		setFileList(files)
	}
	const handleDeleteFile = async(id) =>{
		try{
			const res = await HomeworkService.deleteHomeworkFile(id,token)
			if(res.status === 200){				
				setSnackBarStatus('success')
				setSnackBarMsg('File Deleted Successfully')
				setOpenSnackbar(true)
				setDocuments(documents.filter((document) => document.id !== id))
			}
		}
		catch(e){
			setSnackBarStatus('error')
			setSnackBarMsg('Something Went Wrong, While Deleting File !! ')
			setOpenSnackbar(true)
			console.log(e)
		}
	}
	return (
		<Container>
			{
				isLoading ? <BackdropLoader open={true} /> : null
			}
			<Card>
				<form onSubmit={submitForm}>
					<BackHeader handleBack={handleBack} title='Create Homework'/>
					{errMessage ? (
						<Box className={classes.margin} pt={2}>
							<div>
								<Typography className={`${classes.errorMsg}`}>
									{errMessage}
								</Typography>
							</div>
						</Box>
					) : (
						''
					)}
					<Box className={classes.margin}>
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
					<Box className={classes.margin}>
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
					<Box className={classes.margin}>
						<FormControl className={classes.fieldStyle}>
							<InputLabel 
								labelId='class-label'
							>Select class</InputLabel>
							<DropdownCS
								data={classMenu}
								loading={classMenuLoading}
								labelId='class-label'
								onChange={handleClassChange}
								value={classID}
							/>
						</FormControl>
					</Box>
					<Box className={classes.margin}>
						<FormControl className={classes.fieldStyle}>
							<InputLabel 
								labelId='subject-label'
							>Select subject</InputLabel>
							<DropdownCS
								data={subjectMenu}
								loading={subjectMenuLoading}
								labelId='subject-label'
								onChange={handleSubjectChange}
								required={true}
								value={subjectID}
							/>
						</FormControl>
					</Box>
					<Box className={classes.margin}>
						<Grid className={classes.fieldStyle}>
							<Typography className={classes.textAlignLeft}>
								Questions
							</Typography>
							<RichTextEditor
								handleDescription={handleDescription}
								value={description}
								token={token}
							/>
						</Grid>
					</Box>
					<DropArea handleChange={handleQuestionDoc}/>
					{
						documents.length > 0 && documents ?
							<DocsDeleteViewer data={documents} handleDelete={handleDeleteFile}/>
						: null
					}
					<Box className={classes.margin}>
						<Grid
							container
							className={classes.fieldStyle}
							direction='row-reverse'
						>
							<Grid item xs={12} className={classes.publishBtns}>
								<PublishLaterButton
									disabled={disable}
									validation={validation}
									publishDate={publishDate}
									handlePublishDate={setPublishDate}
									handlePublishLater={handlePublishLater}
								/>
								<PublishNowButton 
									disabled={disable}
								/>
							</Grid>
						</Grid>
					</Box>
				</form>
			</Card>
			<br />
			<br />
			<AlertPop 
				openSnackbar={openSnackbar} 
				onOpenSnackBar={setOpenSnackbar} 
				status={snackBarStatus} 
				msg={snackBarMsg}
			/> 
		</Container>
	)
}

export default CreateHomework;
