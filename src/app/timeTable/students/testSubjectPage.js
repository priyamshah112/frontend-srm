import React, { Fragment, useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import TimetableService from '../timeTableService'

const useStyles = makeStyles((theme) => ({
	timetableheading: {
		fontSize: '1rem,',
		fontFamily: 'Avenir Medium',
		fontWeight: '400',
		lineHeight: 1.5,
	},
	headingtest: {
		fonTize: '1rem',
		fontFamily: 'Avenir Medium',
		fontWeight: '400',
		lineHeight: '1.5',
	},
	headingtest_1: {
		fonTize: '1rem',
		fontFamily: 'Avenir Medium',
		fontWeight: '400',
		lineHeight: '1.5',
		paddingLeft: '25px',
		marginTop: '70px',
		textAlign: 'center',
	},
	subjectname: {
		fontSize: '1rem',
		fontFamily: 'Avenir Medium',
		fontWeight: '400',
		lineHeight: '1.5',
	},
	root: {
		flexGrow: 1,
	},
	paper2: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
	paper1: {
		padding: theme.spacing(1),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
	subcategory: {
		marginTop: '30px',
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
	},
	div: {
		float: 'left',
	},
	root: {
		flexGrow: 1,
		marginTop: '30px',
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
		padding: '5px',
		textAlign: 'center',
		font: 'normal normal medium 14px/19px Avenir',
		borderBottom: '1px solid lightgrey ',
		borderRight: '1px solid lightgrey',
		background: '#FFFFFF',
	},
	paddingLeft: {
		paddingLeft: '12px',
	},
	grid: {
		textAlign: 'center',
		paddingTop: '0',
	},
	ArrowBackIosIcon: {
		float: 'left',
		cursor: 'pointer',
		fontSize: '1.2rem',
	},
	marginTop: {
		marginTop: '15px',
	},
	divStyle: {
		display: '',
		paddingLeft: '5px',
		paddingRight: '5px',
	},
	typographyStyle: {
		marginTop: '25px',
		textAlign: 'center',
	},
	padding: {
		padding: '2%',
	},
	gridStyle: {
		borderRight: '0',
		borderBottomLeftRadius: '5px',
	},
	typographStyle: {
		background: 'white',
		padding: '0px',
		borderBottomLeftRadius: '5px',
	},
	styleGrid: {
		borderLeft: '1px solid lightgrey',
	},
	paddingBG: {
		background: 'white',
		padding: '0px',
	},
	borderRadius: {
		borderRight: '0',
		borderBottomLeftRadius: '5px',
	},
	borderRight: {
		borderRight: '0',
		borderBottomRightRadius: '5px',
	},
	borderBottomRightRadius: {
		background: 'white',
		padding: '0px',
		borderBottomRightRadius: '5px',
	},
	backgroundPadding: {
		background: 'white',
		padding: '0px',
	},
	borederBG: {
		background: 'white',
		padding: '0px',
		borderBottomLeftRadius: '5px',
	},
	background: {
		background: 'white',
		padding: '0px',
		borderBottomRightRadius: '5px',
	},
	borderLeft: {
		borderLeft: '1px solid lightgrey',
	},
	borderBottomRight: {
		borderRight: '0',
		borderBottomRightRadius: '5px',
	},
}))
const TestSubjectPage = (props) => {
	const classes = useStyles()
	var role = String(JSON.parse(localStorage.getItem('srmSelectedRole')))
	var string1 = 'parent'
	if (String(role) === String(string1)) {
		var token = localStorage.getItem('srmSelected_Child_token')
	} else {
		var token = localStorage.getItem('srmToken')
	}

	const [examTimeTable, setExamTimeTable] = useState([])
	const [subjectCategList, setSubjectCategList] = useState([])

	const formateSubjectCategory = (data) => {
		let subjectTimeTable = []
		let examTimeTable = data.data.examTimeTable.filter(
			(ele) => ele.status === 'published'
		)
		let subjectDetails = data.data.subjectDetails
		for (let dt of examTimeTable) {
			Array.prototype.push.apply(subjectTimeTable, dt.timetable_data)
		}
		let categorySubject = []
		for (let key in subjectDetails) {
			let categoryName = key
			let tmpCategorySubject = {
				categoryName: categoryName,
				subjectList: [],
			}
			for (let sub of subjectDetails[key]) {
				let timeTable = subjectTimeTable.filter(
					(ele) => ele.subject_id === sub.id
				)
				let subjectDetails = {
					timeTable: timeTable,
					...sub,
				}
				tmpCategorySubject.subjectList.push(subjectDetails)
			}
			categorySubject.push(tmpCategorySubject)
		}
		return categorySubject
	}

	const fetchTestSublistWithTime = async (testid) => {
		const res = await TimetableService.getExamTestSubList(
			token,
			testid.class_id,
			testid.id
		)
		if (res.status === 200) {
			let subjectCategList = formateSubjectCategory(res.data)
			setSubjectCategList(subjectCategList)
			setExamTimeTable(
				res.data.data.examTimeTable.filter((ele) => ele.status === 'published')
			)
		}
	}

	useEffect(() => {
		fetchTestSublistWithTime(props.testID)
	}, [])

	console.log(props.testID)
	console.log(props.subCatgarray)
	console.log(props.examTimeTable)
	console.log(props.TimeTableData)

	return (
		<Fragment>
			<div>
				<Grid container spacing={3}>
					<Grid item xs={12} className={classes.paddingLeft}>
						<Grid item xs={12} className={classes.grid}>
							<div classsName={classes.div}>
								<ArrowBackIosIcon
									className={classes.ArrowBackIosIcon}
									onClick={props.sublistBacktick}
								></ArrowBackIosIcon>
							</div>

							<Typography
								className={`${classes.headingtest} ${classes.marginTop}`}
							>
								{props.testID.name}&nbsp;-&nbsp;Timetable
							</Typography>
						</Grid>
					</Grid>
				</Grid>
				{examTimeTable.length ? (
					<div>
						{subjectCategList.map((items, index) => {
							return (
								<div className={classes.divStyle}>
									<Grid item xs={12} className={classes.paddingLeft}>
										<Typography
											className={`${classes.subcategory} ${classes.typographyStyle}`}
										>
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
													className={classes.padding}
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
														</Typography>
													</Grid>
													<Grid items lg={12} sm={12} xs={12}>
														<Grid container lg={12} sm={12} xs={12}>
															<Grid item xs={4} className={classes.headingList}>
																<Typography
																	className={classes.timetableheading}
																>
																	Exam Date
																</Typography>
															</Grid>
															<Grid item xs={4} className={classes.headingList}>
																<Typography
																	className={classes.timetableheading}
																>
																	Start Time
																</Typography>
															</Grid>
															<Grid item xs={4} className={classes.headingList}>
																<Typography
																	className={classes.timetableheading}
																>
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
																		className={`${classes.headingList1} ${classes.gridStyle}`}
																	>
																		<Typography
																			className={classes.typographStyle}
																		>
																			-
																		</Typography>
																	</Grid>
																	<Grid
																		item
																		lg={4}
																		md={4}
																		sm={4}
																		xs={4}
																		className={`${classes.headingList1} ${classes.styleGrid}`}
																	>
																		<Typography className={classes.paddingBG}>
																			-
																		</Typography>
																	</Grid>
																	<Grid
																		item
																		lg={4}
																		md={4}
																		sm={4}
																		xs={4}
																		className={`${classes.headingList1} ${classes.borderRight}`}
																	>
																		<Typography
																			className={
																				classes.borderBottomRightRadius
																			}
																		>
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
																		className={`${classes.headingList1} ${classes.borderRadius}`}
																	>
																		<Typography className={classes.borederBG}>
																			{sub.timeTable[0].date}
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
																		<Typography
																			className={classes.backgroundPadding}
																		>
																			{sub.timeTable[0].start_time}
																		</Typography>
																	</Grid>
																	<Grid
																		item
																		lg={4}
																		md={4}
																		sm={4}
																		xs={4}
																		className={`${classes.headingList1} ${classes.borderBottomRight}`}
																	>
																		<Typography className={classes.background}>
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
					</div>
				) : (
					<Typography className={classes.headingtest_1}>
						No TimeTable Created Yet!
					</Typography>
				)}
			</div>
		</Fragment>
	)
}
export default TestSubjectPage
