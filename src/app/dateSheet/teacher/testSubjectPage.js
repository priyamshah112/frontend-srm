import React, { Fragment, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import EditLogo from '../../../assets/images/Edit.svg'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import DateSheetService from '../dateSheetService'
import '../../../assets/css/form.css'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { withStyles } from '@material-ui/core/styles'
import DateFnsUtils from '@date-io/date-fns'
import InputAdornment from '@material-ui/core/InputAdornment'
import CircularProgress from '@material-ui/core/CircularProgress'
import EventIcon from '@material-ui/icons/Event'
import ScheduleIcon from '@material-ui/icons/Schedule'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import PublishLater from '../../newsAnnouncement/teacher/PublishLater'

import {
	MuiPickersUtilsProvider,
	TimePicker,
	DatePicker,
} from '@material-ui/pickers'

const useStyles = makeStyles((theme) => ({
	
	loading: {
		width: '100%',
		textAlign: 'center',
		paddingTop: '8px',
		fontSize: '20px',
	},	
	width: {
		width: '100%',
	},
	grid1: {},
	grid2: {
		textAlign: 'center',
		paddingTop: '0',
	},
	grid3: {
		paddingLeft: '10px',
	},
	grid4: {
		borderRight: '0',
		borderBottomLeftRadius: '5px',
	},
	grid5: {
		padding: '10px',
		borderRight: '0',
		borderBottomRightRadius: '5px',
	},
	grid6: {
		borderRight: '0',
		borderBottomLeftRadius: '5px',
	},
	grid7: {
		borderLeft: '1px solid lightgrey',
	},
	grid8: {
		borderRight: '0',
		borderBottomRightRadius: '5px',
	},
	grid9: {
		textAlign: 'right',
		paddingTop: '20px',
		paddingBottom: '20px',
	},
	grid10: {
		textAlign: 'right',
		paddingTop: '20px',
		marginBottom: '50px',
	},
	floatLeft: {
		float: 'left',
		height: '100%',
		display: 'flex',
		alignItems: 'center',
	},
	ArrowBackIosIcon: {
		float: 'left',
		cursor: 'pointer',
		fontSize: '18px',
		fontFamilt: 'Avenir Book',
		opacity: '0.7',
	},
	tablestyle: {
		paddingTop: '10px',
		paddingBottom: '10px',
	},
	displayPadding: {
		paddingTop: '10px',
		paddingBottom: '50px',
	},
	span2: {
		float: 'right',
		marginRight: '10px',
		marginTop: '2px',
		cursor: 'pointer',
	},
	typographyStyle: {
		background: 'white',
		padding: '0px',
		borderBottomLeftRadius: '5px',
	},
	borderLeft: {
		borderLeft: '1px solid lightgrey',
	},
	typography2: {
		background: 'white',
		padding: '0px',
	},
	typography3: {
		whiteSpace: 'pre-wrap',
		background: 'white',
		padding: '0px',
		borderBottomRightRadius: '5px',
		fontSize: '14px',
		fontFamily: 'Avenir Book'
	},
	typography4: {
		background: 'white',
		padding: '0px',
		borderBottomLeftRadius: '5px',
	},
	typography5: {
		background: 'white',
		padding: '0px',
	},
	typography6: {
		background: 'white',
		padding: '0px',
		borderBottomRightRadius: '5px',
	},

	typography7: {
		background: '#7b72af',
		color: '#FFFFFF',
	},
	typography8: {
		background: '#7b72af',
		color: '#FFFFFF',
	},
	timetableheading: {
		fontSize: '1rem,',
		fontFamily: 'Avenir Medium',
		fontWeight: '400',
		lineHeight: 1.5,
	},
	textField: {
		width: '222px',
		border: '1 px solid ',
		padding: '6px',
	},
	time: {
		fontSize: '1rem',
		fontFamily: 'Avenir Medium',
		fontWeight: '400',
		lineHeight: '1.5',
	},
	headingtest: {
		fontSize: '18px',
		fontFamily: 'Avenir Medium',
		lineHeight: '1.5',
		marginBottom: '0',
	},
	subjectname: {
		fontSize: '14px',
		fontFamily: 'Avenir Book',
		fontWeight: '400',
		lineHeight: '1.5',
	},
	form: {
		'& > *': {
			margin: theme.spacing(2),
			width: '25ch',
		},
		textAlign: 'center',
		fontFamily: 'Avenir Medium',
		fontSize: '1rem',
	},
	root: {
		flexGrow: 1,
	},
	paper: {
		textAlign: '',
		margin: '0',
		height: 'auto',
		boxShadow: 'none',
		padding: '10px',
		background: '#FFFFFF',
		borderBottom: '2px solid grey',
		borderTopRightRadius: '5px',
		borderTopLeftRadius: '5px',
	},
	headingList: {
		background: '#7b72af',
		padding: '5px',
		textAlign: 'center',
		fontSize: '14px',
		fontFamily: 'Avenir Medium',
		borderBottom: '1px solid lightgrey ',
		borderRight: '1px solid lightgrey',
		color: '#FFFFFF',
	},
	headingList1: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderBottom: '1px solid lightgrey ',
		borderRight: '1px solid lightgrey',
		background: '#FFFFFF',
		color: '#000000',
	},
	dataList: {
		textAlign: 'center',
		padding: '8px',
		border: '1px solid white',
		borderRight: '1px solid #707070',
	},

	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: '25%',
		[theme.breakpoints.down('xs')]: {
			width: '50%',
		},
	},
	datepicker: {
		width: '30%',
		padding: '0',
		[theme.breakpoints.down('xs')]: {
			width: '50%',
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
	margin: {
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
	empty:{
		textAlign:"center",
		padding: '20px',
		paddingLeft: '38px',
		'& p':{
			fontSize: '0.8rem'
		}
	},
	model:{
		'& .MuiPaper-root':{
			minWidth: '390px',
		}
	},
	model_title:{
		'& h6':{
			fontSize: '14px',
			fontFamily: 'Avenir Medium',
		}		
	},
	modelStyle:{
		width: '100%',
		'& input':{
			fontSize: '14px',
			fontFamily: 'Avenir Book',
		}
	},
	textField:{
		'& textarea':{
			fontSize: '14px',
			fontFamily: 'Avenir Book',
			padding: '10px'
		}
	}
}))

const styles = (theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(2),
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
})

const DialogTitle = withStyles(styles)((props) => {
	const { children, classes, onClose, ...other } = props
	return (
		<MuiDialogTitle disableTypography className={classes.root} {...other}>
			<Typography variant='h6'>{children}</Typography>
			{onClose ? (
				<IconButton
					aria-label='close'
					className={classes.closeButton}
					onClick={onClose}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	)
})

const DialogContent = withStyles((theme) => ({
	root: {
		padding: theme.spacing(2),
	},
}))(MuiDialogContent)

const DialogActions = withStyles((theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(1),
	},
}))(MuiDialogActions)

const TestSubjectPage = (props) => {
	const { testData,DateSheetData,datesheetDataTable,loading,classID } = props
	const classes = useStyles()
	const token = localStorage.getItem('srmToken')
	const [open, setOpen] = React.useState(false)	
	const [openErrorSnackbar, setErrorOpenSnackbar] = useState(false)
	const [openSuccessSnackbar, setSuccessOpenSnackbar] = useState(false)
	const [ errorMsg, setErrorMsg ]= useState('')
	const [ successMsg, setSuccessMsg ]= useState('')
	const [modal_sub, setmodal_sub] = React.useState('')
	const [eventDate, setEventDate] = useState(null)
	const [start_time, setstart_time] = useState(null)
	const [end_time, setend_time] = useState(null)
	const [chapterContent, setChapterContent] = useState('')
	const [selected_sub, setselected_sub] = useState(null)
	const [modify_sub, setmodify_sub] = useState(false)
	const [openPubLater, setOpenPubLater] = useState(false)

	const handleEventDate = (date) => {
		setEventDate(date)
	}

	const handlestart_time = (date) => {
		setstart_time(date)
	}
	const handleend_time = (date) => {
		setend_time(date)
	}
	const handleChapterChange = (e) =>{
		setChapterContent(e.target.value)
	}
	const handleClickOpen = (sub, modify) => {
		if (modify) {
			setmodify_sub(modify)
			let startTime = new Date() 
			let endTime = new Date()
			if(sub.start_time !== null){				
				let [hours_1, minutes_1, seconds_1] = sub.start_time.split(':')
				startTime.setHours(hours_1)
				startTime.setMinutes(minutes_1)
				startTime.setSeconds(seconds_1)
			}
			if(sub.end_time !== null){				
				let [hours_1, minutes_1, seconds_1] = sub.end_time.split(':')
				endTime.setHours(hours_1)
				endTime.setMinutes(minutes_1)
				endTime.setSeconds(seconds_1)
			}

			setEventDate(sub.date !== null ? new Date(sub.date) : new Date())
			setstart_time(startTime)
			setend_time(endTime)
		}
		setmodal_sub(sub.subject_name)
		setChapterContent(sub.chapters)
		setselected_sub(sub)
		setOpen(true)
	}
	const handleClose = () => {
		setOpen(false)
	}

	const publish_datesheet = async () => {
		if (DateSheetData !== null && datesheetDataTable.length > 0){
			const res = await DateSheetService.publishLater(token,DateSheetData.id,classID,{'status':'published'})
			if (res.status === 200) {
				setSuccessMsg("Published Successfully !!")
				setSuccessOpenSnackbar(true)				
				props.refeshDatesheet(testData)
			} else {
				setErrorMsg("Failed to publish")
				setErrorOpenSnackbar(true)
			}
		} else {
			setErrorMsg('Please Create A Time Table first')
			setErrorOpenSnackbar(true)
		}
	}
	const handleOpenPubLater = ()=>{
		if (DateSheetData === null || datesheetDataTable.length <= 0){
			setErrorMsg('Please Create A Time Table first')
			setErrorOpenSnackbar(true)
		}else{
			setOpenPubLater(true)	
		}
	}

	const handleClosePubLater = () => {
		setOpenPubLater(false)
	}
	const publish_datesheet_later = async (date) => {
		const res = await DateSheetService.publish(
			token,
			DateSheetData.id,
			classID,
			{
				'status':'active',
				'published_date': date
			})
		if (res.status === 200) {
			setOpenPubLater(false)
			setSuccessMsg("Publish Later Successfully !!")
			setSuccessOpenSnackbar(true)				
			props.refeshDatesheet(testData)
		} else {
			setErrorMsg("Failed to publish")
			setErrorOpenSnackbar(true)
		}
	}

	const check_put_post_data = async () => {		
		setOpen(false)
		if (eventDate === null || start_time === null || end_time === null) {
			setErrorMsg('Please fill entire details')
			setErrorOpenSnackbar(true)
		} else {
			if ( end_time <= start_time ) {
				setErrorMsg('End Time cannot be greater than Start Time or equal')
				setErrorOpenSnackbar(true)
			} else {
				let data = {
					'date':eventDate.toLocaleDateString(),
					'start_time':start_time.toLocaleTimeString(),
					'end_time':end_time.toLocaleTimeString(),
					'chapters':chapterContent
				}
				console.log(data)
				const res = await DateSheetService.put_subject(token,selected_sub.id,classID,data)
				if (res.status === 200) {
					setSuccessMsg('Date Sheet Updated Successfully !!')					
					setSuccessOpenSnackbar(true)
					props.refeshDatesheet(testData)
				}
				else{
					setErrorMsg('Something went wrong!! Please try again.')
					setErrorOpenSnackbar(true)
				}
			}
		}
	}
	const handleErrorSnackbarClose = () => {
		setErrorOpenSnackbar(false)
	}
	const handleSuccessSnackbarClose = () => {
		setSuccessOpenSnackbar(false)
	}
	return (
		<Fragment>
			<div>
				<Dialog
					onClose={handleClose}
					aria-labelledby='customized-dialog-title'
					open={open}
					className={classes.model}
				>
					<DialogTitle id='customized-dialog-title' 
					className={classes.model_title}
					onClose={handleClose}>
						{modal_sub}
					</DialogTitle>
					<DialogContent dividers>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<Grid container className={classes.fieldStyle}>
								<Grid item xs={12}>
									<DatePicker
										id='eventDate'
										label='Exam Date'
										variant='dialog'
										className={classes.modelStyle}
										minDate={new Date()}
										format='yyyy-MM-dd'
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
									/>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<TimePicker
									margin='normal'
									label='Start Time'
									value={start_time}
									className={classes.modelStyle}
									format='HH:mm:ss'
									onClick={() => setstart_time(new Date())}
									onChange={handlestart_time}
									KeyboardButtonProps={{
										'aria-label': 'change time',
									}}
									InputProps={{
										endAdornment: (
											<InputAdornment position='end'>
												<IconButton>
													<ScheduleIcon />
												</IconButton>
											</InputAdornment>
										),
									}}
								/>
							</Grid>
							<Grid item xs={12}>
								<TimePicker
									margin='normal'
									label='End Time'
									format='HH:mm:ss'
									className={classes.modelStyle}
									value={end_time}
									onChange={handleend_time}
									KeyboardButtonProps={{
										'aria-label': 'change time',
									}}
									InputProps={{
										endAdornment: (
											<InputAdornment position='end'>
												<IconButton>
													<ScheduleIcon />
												</IconButton>
											</InputAdornment>
										),
									}}
								/>
							</Grid>
							<Grid item xs={12}>
								<FormControl 
									className={classes.width}
								>
									<TextField
										id='filled-helperText'
										label="Chapters"
										className={classes.textField}
										multiline
										rows={5}
										defaultValue={chapterContent}
										onChange={handleChapterChange}
									/>	
								</FormControl>
							</Grid>
						</MuiPickersUtilsProvider>
					</DialogContent>
					<DialogActions>
						<Button 
							autoFocus 
							onClick={check_put_post_data} 
							color='primary'
							variant='contained'
							disableRipple={true}
							disableElevation
						>
							Save
						</Button>
					</DialogActions>
				</Dialog>
				<Grid container className={classes.grid1}>
					<Grid className={classes.grid2} item xs={12}>
						<div className={classes.floatLeft}>
							<ArrowBackIosIcon
								className={classes.ArrowBackIosIcon}
								fontSize='small'
								onClick={props.sublistBacktick}
							></ArrowBackIosIcon>
						</div>

						<Typography className={classes.headingtest}>
							{props.classDetail}&nbsp;-&nbsp;{props.testData.name}
							&nbsp;-&nbsp;DateSheet
						</Typography>
					</Grid>
				</Grid>

				{ DateSheetData !== null && !loading ? 
						 (
							<div className={classes.displayPadding}>								
								{ datesheetDataTable.length > 0 ?
									datesheetDataTable.map((item,index)=>{ return (
										<Grid container key={index+""+item.id}>
											<Grid
												container
												className={classes.tablestyle}
												md={12}
												xs={12}
											>
												<Grid lg={12} sm={12} xs={12}>
													<Typography
														display=''
														align='center'
														gutterBottom
														className={classes.paper}
													>
														<span className={classes.subjectname}>
															{item.subject_planning_classes.name}
														</span>
														{
															DateSheetData.status === 'published' ? (
																<span></span>
															) : (
																<span
																	className={classes.span2}
																	onClick={() => handleClickOpen(item, true)}
																>
																	{' '}
																	<img src={EditLogo} alt='editLogo' />
																</span>
															)
														}
													</Typography>
												</Grid>
												<Grid items lg={12} sm={12} xs={12}>
													<Grid container lg={12} sm={12} xs={12}>
														<Grid item xs={2} className={classes.headingList}>
															<Typography className={classes.timetableheading}>
																Exam Date
															</Typography>
														</Grid>
														<Grid item xs={2} className={classes.headingList}>
															<Typography className={classes.timetableheading}>
																Start Time
															</Typography>
														</Grid>
														<Grid item xs={2} className={classes.headingList}>
															<Typography className={classes.timetableheading}>
																End Time
															</Typography>
														</Grid>
														<Grid item xs={6} className={classes.headingList}>
															<Typography className={classes.timetableheading}>
																Chapters
															</Typography>
														</Grid>
													</Grid>
													<Grid container lg={12} sm={12} xs={12}>
														<Grid container spacing={0}>
															<Grid
																item
																lg={2}
																md={2}
																sm={2}
																xs={2}
																className={`${classes.headingList1} ${classes.grid4}`}
															>
																<Typography className={classes.typography3}>
																	{item.date !== null ? item.date : "-"}
																</Typography>
															</Grid>
															<Grid
																item
																lg={2}
																md={2}
																sm={2}
																xs={2}
																className={`${classes.headingList1} ${classes.borderLeft}`}
															>
																<Typography className={classes.typography3}>
																	{item.start_time !== null ? item.start_time : "-"}
																</Typography>
															</Grid>
															<Grid
																item
																lg={2}
																md={2}
																sm={2}
																xs={2}
																className={`${classes.headingList1} ${classes.grid5}`}
															>
																<Typography className={classes.typography3}>
																	{item.end_time !== null ? item.end_time : "-"}
																</Typography>
															</Grid>
															<Grid
																item
																lg={6}
																md={6}
																sm={6}
																xs={6}
																className={`${classes.headingList1} ${classes.grid5}`}
															>
																<Typography className={classes.typography3}>
																	{item.chapters !== null ? item.chapters : "-"}
																</Typography>
															</Grid>
														</Grid>
													</Grid>
												</Grid>
											</Grid>
												
										</Grid>
									)}):(
										<div className={classes.empty}>
											<Typography>No Date Sheet Available Yet!</Typography>
										</div>	
									)
								}
								{DateSheetData.status !== null ? (
								DateSheetData.status === 'published' || DateSheetData.status === 'active'  ? null :  (
									<Grid item xs={12} className={classes.grid9}>
										<Typography className={classes.margin}>
											<Button
												id='publishLaterBtn'
												variant='contained'
												onClick={handleOpenPubLater}
												className={`${
													classes.fieldStyle
												} ${'publishBtn'} ${'publishLaterBtn'}`}
												disableRipple
												disableElevation
											>
												Publish Later
											</Button>
											<Button
												variant='contained'
												onClick={publish_datesheet}
												className={`${classes.fieldStyle} ${'publishBtn'}`}
												color='primary'
												disableRipple
												disableElevation
											>
												Publish Now
											</Button>
										</Typography>
									</Grid>
								)
							) : (
								<Grid item xs={12} className={classes.grid10}>
									<Typography>
										<Button
											id='publishLaterBtn'
											variant='contained'
											onClick={handleOpenPubLater}
											className={`${
												classes.fieldStyle
											} ${'publishBtn'} ${'publishLaterBtn'}`}
											disableRipple
											disableElevation
										>
											Publish Later
										</Button>
										<Button
											variant='contained'
											onClick={publish_datesheet}
											className={`${classes.fieldStyle} ${'publishBtn'}`}
											color='primary'
											disableRipple
											disableElevation
										>
											Publish Now
										</Button>
									</Typography>
								</Grid>
							)}
							</div>
						)
				: loading ? (						
					<div className={classes.loading}>
						<CircularProgress color='primary' size={30} />
					</div>
				) : (
					<div className={classes.empty}>
						<Typography>No Date Sheet Available Yet!</Typography>
					</div>	
				)
			}
			
			<Snackbar
				open={openErrorSnackbar}
				autoHideDuration={5000}
				onClose={handleErrorSnackbarClose}
			>
				<Alert onClose={handleErrorSnackbarClose} severity='error'>					
					{errorMsg}
				</Alert>
			</Snackbar>	
			<Snackbar
				open={openSuccessSnackbar}
				autoHideDuration={5000}
				onClose={handleSuccessSnackbarClose}
			>
				<Alert onClose={handleSuccessSnackbarClose} severity='success'>
					{successMsg}
				</Alert>
			</Snackbar>	
			{openPubLater ? (
				<PublishLater
					open={openPubLater}
					handleClose={handleClosePubLater}
					handlePublishLater={publish_datesheet_later}
				/>
			) : (
				''
			)}
			</div>
		</Fragment>
	)
}
export default TestSubjectPage
