import React, { Fragment, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import Typography from '@material-ui/core/Typography'
import EditLogo from '../../../assets/images/Edit.svg'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import TimetableService from '../timeTableService'
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
import EventIcon from '@material-ui/icons/Event'
import {
	MuiPickersUtilsProvider,
	TimePicker,
	DatePicker,
} from '@material-ui/pickers'

const useStyles = makeStyles((theme) => ({
	grid1: {
		paddingLeft: '12px',
		paddingTop: '30px',
	},
	grid2: {
		textAlign: 'center',
		paddingTop: '0',
	},
	grid3: {
		paddingLeft: '12px',
	},
	grid4: {
		borderRight: '0',
		borderBottomLeftRadius: '5px',
	},
	grid5: {
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
		marginBottom: '50px',
	},
	grid10: {
		textAlign: 'right',
		paddingTop: '20px',
		marginBottom: '50px',
	},
	floatLeft: {
		float: 'left',
	},
	ArrowBackIosIcon: {
		float: 'left',
		cursor: 'pointer',
		fontSize: '1.1rem',
	},
	tablestyle: {
		padding: '2%',
	},
	displayPadding: {
		display: '',
		paddingLeft: '5px',
		paddingRight: '5px',
	},
	spanStyle: {
		float: 'right',
		marginRight: '10px',
		marginTop: '2px',
		cursor: 'pointer',
	},
	span2: {
		float: 'right',
		marginRight: '10px',
		marginTop: '2px',
		cursor: 'pointer',
	},
	span3: {
		float: 'right',
		marginRight: '10px',
		marginTop: '2px',
		cursor: 'pointer',
	},
	span4: {
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
		background: 'white',
		padding: '0px',
		borderBottomRightRadius: '5px',
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
		fonTize: '1rem',
		fontFamily: 'Avenir Medium',
		fontWeight: '400',
		lineHeight: '1.5',
		marginBottom: '0',
	},
	subjectname: {
		fontSize: '1rem',
		fontFamily: 'Avenir Medium',
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

	subcategory: {
		marginBottom: '15px',
		textAlign: 'left',
		textAlign: 'center',
		borderRadius: '5px',
		paddingLeft: '12px',
		float: 'left',
		fonTize: '1rem',
		fontFamily: 'Avenir Medium',
		fontWeight: '400',
		lineHeight: '1.5',
		width: '100%',
		textTransform: 'uppercase',
		marginTop: '25px',
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
		font: 'normal normal medium 14px/19px Avenir',
		borderBottom: '1px solid lightgrey ',
		borderRight: '1px solid lightgrey',
		color: '#FFFFFF',
	},
	headingList1: {
		textAlign: 'center',
		font: 'normal normal medium 14px/19px Avenir',
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
	const classes = useStyles()
	const token = localStorage.getItem('srmToken')
	const [open, setOpen] = React.useState(false)
	const [modal_sub, setmodal_sub] = React.useState('')
	const [eventDate, setEventDate] = useState(null)
	const [start_time, setstart_time] = useState(null)
	const [end_time, setend_time] = useState(null)
	const [selected_sub, setselected_sub] = useState(null)
	const [modify_sub, setmodify_sub] = useState(false)

	const handleEventDate = (date) => {
		setEventDate(date)
	}

	const handlestart_time = (date) => {
		setstart_time(date)
	}
	const handleend_time = (date) => {
		setend_time(date)
	}

	const handleClickOpen = (sub, modify) => {
		if (modify) {
			setmodify_sub(modify)
			setEventDate(sub.timeTable[0].date)

			let d = new Date()
			let [hours, minutes, seconds] = sub.timeTable[0].start_time.split(':')
			d.setHours(+hours)
			d.setMinutes(minutes)
			d.setSeconds(seconds)
			setstart_time(d)
			let e = new Date()
			let [hours_1, minutes_1, seconds_1] = sub.timeTable[0].end_time.split(':')
			e.setHours(+hours_1)
			e.setMinutes(minutes_1)
			e.setSeconds(seconds_1)
			setend_time(e)
		}
		setmodal_sub(sub.name)
		setselected_sub(sub)
		setOpen(true)
	}
	const handleClose = () => {
		setOpen(false)
	}

	const publish_timetable = async () => {
		if (Array.isArray(props.TimeTableData) && props.TimeTableData.length) {
			var obj_post = {
				class_id: props.testData.class_id,
				test_id: props.testData.id,
				status: 'published',
				subject: [],
			}
			props.TimeTableData.forEach((ele) => {
				obj_post.subject.push({
					subject_id: ele.subject_id,
					subject_name: ele.subject_name,
					timeData: [
						{
							date: ele.date,
							start_time: ele.start_time,
							end_time: ele.end_time,
						},
					],
				})
			})

			const id = props.examTimeTable[0].id
			const res = await TimetableService.put_subject(token, id, obj_post)
			if (res.status === 200) {
			} else {
			}
			props.double_sublistBacktick()
		} else {
			alert('Please create aTime Table first')
		}
	}

	const check_put_post_data = async () => {
		setOpen(false)
		if (eventDate === null || start_time === null || end_time === null) {
			alert('Please fill entire details')
		} else {
			if (
				end_time < start_time ||
				end_time.toLocaleTimeString() == start_time.toLocaleTimeString()
			) {
				alert('End Time cannot be greater than Start Time')
			} else {
				if (Array.isArray(props.examTimeTable) && props.examTimeTable.length) {
					var obj_post = {
						class_id: props.testData.class_id,
						test_id: props.testData.id,
						status: 'draft',
						subject: [],
					}

					if (modify_sub) {
						if (
							Array.isArray(props.TimeTableData) &&
							props.TimeTableData.length
						) {
							props.TimeTableData.forEach((ele) => {
								if (ele.subject_id === selected_sub.id) {
									if (eventDate instanceof Date) {
										obj_post.subject.push({
											subject_id: selected_sub.id,
											subject_name: selected_sub.name,
											timeData: [
												{
													date: eventDate.toLocaleDateString(),
													start_time: start_time.toLocaleTimeString(),
													end_time: end_time.toLocaleTimeString(),
												},
											],
										})
									} else {
										obj_post.subject.push({
											subject_id: selected_sub.id,
											subject_name: selected_sub.name,
											timeData: [
												{
													date: eventDate,
													start_time: start_time.toLocaleTimeString(),
													end_time: end_time.toLocaleTimeString(),
												},
											],
										})
									}
								} else {
									obj_post.subject.push({
										subject_id: ele.subject_id,
										subject_name: ele.subject_name,
										timeData: [
											{
												date: ele.date,
												start_time: ele.start_time,
												end_time: ele.end_time,
											},
										],
									})
								}
							})
						}
						const id = props.examTimeTable[0].id
						const res = await TimetableService.put_subject(token, id, obj_post)
						if (res.status === 200) {
						} else {
						}
					} else {
						if (
							Array.isArray(props.TimeTableData) &&
							props.TimeTableData.length
						) {
							props.TimeTableData.forEach((ele) => {
								obj_post.subject.push({
									subject_id: ele.subject_id,
									subject_name: ele.subject_name,
									timeData: [
										{
											date: ele.date,
											start_time: ele.start_time,
											end_time: ele.end_time,
										},
									],
								})
							})
						}

						obj_post.subject.push({
							subject_id: selected_sub.id,
							subject_name: selected_sub.name,
							timeData: [
								{
									date: eventDate.toLocaleDateString(),
									start_time: start_time.toLocaleTimeString(),
									end_time: end_time.toLocaleTimeString(),
								},
							],
						})
						const id = props.examTimeTable[0].id
						const res = await TimetableService.put_subject(token, id, obj_post)
						if (res.status === 200) {
						} else {
						}
					}
				} else {
					var obj_post = {
						class_id: props.testData.class_id,
						test_id: props.testData.id,
						status: 'draft',
						subject: [
							{
								subject_id: selected_sub.id,
								subject_name: selected_sub.name,
								timeData: [
									{
										date: eventDate.toLocaleDateString(),
										start_time: start_time.toLocaleTimeString(),
										end_time: end_time.toLocaleTimeString(),
									},
								],
							},
						],
					}
					const res = await TimetableService.post_subject(token, obj_post)
					if (res.status === true) {
					} else {
					}
				}
				props.double_sublistBacktick()
			}
		}
	}

	return (
		<Fragment>
			<div>
				<Dialog
					onClose={handleClose}
					aria-labelledby='customized-dialog-title'
					open={open}
				>
					<DialogTitle id='customized-dialog-title' onClose={handleClose}>
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
							<Grid item xs={12}>
								<TimePicker
									margin='normal'
									label='Start Time'
									value={start_time}
									onClick={() => setstart_time(new Date())}
									onChange={handlestart_time}
									KeyboardButtonProps={{
										'aria-label': 'change time',
									}}
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
							<Grid item xs={12}>
								<TimePicker
									margin='normal'
									label='End Time'
									value={end_time}
									onChange={handleend_time}
									KeyboardButtonProps={{
										'aria-label': 'change time',
									}}
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
						</MuiPickersUtilsProvider>
					</DialogContent>
					<DialogActions>
						<Button autoFocus onClick={check_put_post_data} color='primary'>
							Save
						</Button>
					</DialogActions>
				</Dialog>
				<Grid container className={classes.grid1} spacing={3}>
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
							&nbsp;-&nbsp;Timetable
						</Typography>
					</Grid>
				</Grid>

				{props.subjectCategList.map((items, index) => {
					return (
						<div className={classes.displayPadding}>
							<Grid className={classes.grid3} item xs={12}>
								<Typography className={classes.subcategory}>
									{items.categoryName}
								</Typography>
							</Grid>
							<Grid container spacing={3}>
								{items.subjectList.map((sub) => {
									return (
										<Grid
											container
											className={classes.tablestyle}
											lg={6}
											md={12}
											sm={6}
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
														{sub.name}
													</span>

													{props.examTimeTable !== null ? (
														props.examTimeTable[0].status === 'published' ? (
															<span></span>
														) : Object.keys(sub.timeTable).length === 0 ? (
															<span
																className={classes.spanStyle}
																onClick={() => handleClickOpen(sub, false)}
															>
																{' '}
																<img src={EditLogo} alt='editLogo' />
															</span>
														) : (
															<span
																className={classes.span2}
																onClick={() => handleClickOpen(sub, true)}
															>
																{' '}
																<img src={EditLogo} alt='editLogo' />
															</span>
														)
													) : Object.keys(sub.timeTable).length === 0 ? (
														<span
															className={classes.span3}
															onClick={() => handleClickOpen(sub, false)}
														>
															{' '}
															<img src={EditLogo} alt='editLogo' />
														</span>
													) : (
														<span
															className={classes.span4}
															onClick={() => handleClickOpen(sub, true)}
														>
															{' '}
															<img src={EditLogo} alt='editLogo' />
														</span>
													)}
												</Typography>
											</Grid>
											<Grid items lg={12} sm={12} xs={12}>
												<Grid container lg={12} sm={12} xs={12}>
													<Grid item xs={4} className={classes.headingList}>
														<Typography className={classes.timetableheading}>
															Exam Date
														</Typography>
													</Grid>
													<Grid item xs={4} className={classes.headingList}>
														<Typography className={classes.timetableheading}>
															Start Time
														</Typography>
													</Grid>
													<Grid item xs={4} className={classes.headingList}>
														<Typography className={classes.timetableheading}>
															End Time
														</Typography>
													</Grid>
												</Grid>
												{Object.keys(sub.timeTable).length === 0 ? (
													<Grid container lg={12} sm={12} xs={12}>
														<Grid container spacing={0}>
															<Grid
																item
																lg={4}
																md={4}
																sm={4}
																xs={4}
																className={`${classes.headingList1} ${classes.grid4}`}
															>
																<Typography className={classes.typographyStyle}>
																	-
																</Typography>
															</Grid>
															<Grid
																item
																lg={4}
																md={4}
																sm={4}
																xs={4}
																className={`${classes.headingList1} ${classes.borderLeft}`}
															>
																<Typography className={classes.typography2}>
																	-
																</Typography>
															</Grid>
															<Grid
																item
																lg={4}
																md={4}
																sm={4}
																xs={4}
																className={`${classes.headingList1} ${classes.grid5}`}
															>
																<Typography className={classes.typography3}>
																	-
																</Typography>
															</Grid>
														</Grid>
													</Grid>
												) : (
													<Grid container lg={12} sm={12} xs={12}>
														<Grid container spacing={0}>
															<Grid
																item
																lg={4}
																md={4}
																sm={4}
																xs={4}
																className={`${classes.headingList1} ${classes.grid6}`}
															>
																<Typography className={classes.typography4}>
																	{sub.timeTable[0].date}
																</Typography>
															</Grid>
															<Grid
																item
																lg={4}
																md={4}
																sm={4}
																xs={4}
																className={`${classes.headingList1} ${classes.grid7}`}
															>
																<Typography className={classes.typography5}>
																	{sub.timeTable[0].start_time}
																</Typography>
															</Grid>
															<Grid
																item
																lg={4}
																md={4}
																sm={4}
																xs={4}
																className={`${classes.headingList1} ${classes.grid8}`}
															>
																<Typography className={classes.typography6}>
																	{sub.timeTable[0].end_time}
																</Typography>
															</Grid>
														</Grid>
													</Grid>
												)}
											</Grid>
										</Grid>
									)
								})}
							</Grid>
						</div>
					)
				})}
				<br />
				<br />

				{props.examTimeTable !== null ? (
					props.examTimeTable[0].status === 'published' ? (
						<span></span>
					) : (
						<Grid item xs={12} className={classes.grid9}>
							<Typography>
								<Button
									variant='contained'
									onClick={publish_timetable}
									className={classes.typography7}
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
								variant='contained'
								onClick={publish_timetable}
								className={classes.typography8}
							>
								Publish Now
							</Button>
						</Typography>
					</Grid>
				)}
			</div>
		</Fragment>
	)
}
export default TestSubjectPage
