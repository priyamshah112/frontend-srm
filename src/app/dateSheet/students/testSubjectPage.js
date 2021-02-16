import React, { Fragment, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import DateSheetService from '../dateSheetService'
import '../../../assets/css/form.css'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

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
		paddingLeft: '12px',
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
		marginBottom: '50px',
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
		fontSize: '16px',
		fontFamily: 'Avenir Book',
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
	empty:{
		textAlign:"center",
		padding: '20px',
		paddingLeft: '38px',
		'& p':{
			fontSize: '0.8rem'
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


const TestSubjectPage = (props) => {
	const { testData,DateSheetData,datesheetDataTable,loading,classID } = props
	const classes = useStyles()
	const token = localStorage.getItem('srmToken')

	return (
		<Fragment>
			<div>
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
				
			</div>
		</Fragment>
	)
}
export default TestSubjectPage
