import React, { Fragment, useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
// import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles'
import TimetableService from '../timeTableService'
import { CircularProgress, Typography } from '@material-ui/core'

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
	loading: {
		width: '100%',
		textAlign: 'center',
		paddingTop: '8px',
		fontSize: '20px',
	},
	headingtest_1: {
		fonTize: '1rem',
		fontFamily: 'Avenir Medium',
		fontWeight: '400',
		lineHeight: '1.5',
		paddingLeft: '25px',
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
		// padding: "5px",
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
	const [formData, setFormData] = useState({
		date: '',
		start_time: '',
		end_time: '',
	})

	const [examTimeTable, setExamTimeTable] = useState([])
	const [subjectCategList, setSubjectCategList] = useState([])
	const [isLoading, setIsLoading] = useState(true)

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
			setIsLoading(false)
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
			{isLoading ? (
				<>
					<br />
					<div className={classes.loading}>
						<CircularProgress color='primary' size={30} />
					</div>
					<br />
				</>
			) : (
				<div>
					<Grid container spacing={3} style={{}}>
						<Grid item xs={12} style={{ paddingLeft: '12px' }}>
							<Grid
								item
								xs={12}
								style={{ textAlign: 'center', paddingTop: '0' }}
							>
								<div style={{ float: 'left' }}>
									<ArrowBackIosIcon
										style={{
											float: 'left',
											cursor: 'pointer',
											fontSize: '1.2rem',
										}}
										onClick={props.sublistBacktick}
									></ArrowBackIosIcon>
								</div>

								<Typography
									className={classes.headingtest}
									style={{ marginTop: '15px' }}
								>
									{props.testID.name}&nbsp;-&nbsp;Timetable
								</Typography>
							</Grid>
						</Grid>
					</Grid>
					{examTimeTable.length ? (
						<div>
							{/* {subjectCategList.map((items, index) => {
                            return (
                                <div >
                                    <Grid item xs={12} style={{ paddingLeft: '12px' }}>
                                        <Typography  className={classes.subcategory} style={{ marginTop: '25px', textAlign: 'center' }}>{items.categoryName}</Typography>
                                    </Grid>
                                    {items.subjectList.map((sub) => {
                                        return <Grid container lg={12} sm={12} xs={12} style={{ padding: '2%' }}>
                                            <Grid lg={12} sm={12} xs={12}>
                                                <Typography display="" align="center" gutterBottom className={classes.paper} >
                                                    <span className={classes.subjectname}>{sub.name}</span>
                                                </Typography>
                                            </Grid>
                                            <Grid items lg={12} sm={12} xs={12}>
                                                <Grid container lg={12} sm={12} xs={12} >
                                                    <Grid item xs={4} className={classes.headingList} style={{}}>
                                                        <Typography className={classes.timetableheading}>Exam Date</Typography>
                                                    </Grid>
                                                    <Grid item xs={4} className={classes.headingList} >
                                                        <Typography className={classes.timetableheading}>Start Time</Typography>

                                                    </Grid>
                                                    <Grid item xs={4} className={classes.headingList}>
                                                        <Typography className={classes.timetableheading}>End Time</Typography>
                                                    </Grid>
                                                </Grid>
                                                {sub.timeTable.map((timeTable) => {
                                                    return <Grid container lg={12} sm={12} xs={12} >
                                                        <Grid item xs={4} className={classes.headingList1} style={{ borderRight: '0',borderBottomLeftRadius:'5px'
 }}>
                                                            <Typography style={{ background: '#FFFFFF' }}>{timeTable.date}</Typography>
                                                        </Grid>
                                                        <Grid item xs={4} className={classes.headingList1} style={{borderLeft:'1px solid lightgrey'}}>
                                                            <Typography>
                                                                {timeTable.start_time}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={4} className={classes.headingList1} style={{borderRight: '0',borderBottomRightRadius:'5px'}}>
                                                            <Typography>{timeTable.end_time}</Typography>
                                                        </Grid>

                                                    </Grid>
                                                })
                                                }
                                            </Grid>
                                        </Grid>

                                    })}
                                </div>
                            )


                        })}
                     */}
							{subjectCategList.map((items, index) => {
								return (
									<div
										style={{
											display: '',
											paddingLeft: '5px',
											paddingRight: '5px',
										}}
									>
										<Grid item xs={12} style={{ paddingLeft: '12px' }}>
											<Typography
												className={classes.subcategory}
												style={{ marginTop: '25px', textAlign: 'center' }}
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
														style={{ padding: '2%' }}
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
																<Grid
																	item
																	xs={4}
																	className={classes.headingList}
																	style={{}}
																>
																	<Typography
																		className={classes.timetableheading}
																	>
																		Exam Date
																	</Typography>
																</Grid>
																<Grid
																	item
																	xs={4}
																	className={classes.headingList}
																>
																	<Typography
																		className={classes.timetableheading}
																	>
																		Start Time
																	</Typography>
																</Grid>
																<Grid
																	item
																	xs={4}
																	className={classes.headingList}
																	style={{}}
																>
																	<Typography
																		className={classes.timetableheading}
																	>
																		End Time
																	</Typography>
																</Grid>
															</Grid>

															{
																// sub.timeTable.map((timeTable) => {
																//     return (

																Object.keys(sub.timeTable).length === 0 ? (
																	<Grid container lg={12} sm={12} xs={12}>
																		<Grid container spacing={0}>
																			<Grid
																				item
																				lg={4}
																				md={4}
																				sm={4}
																				xs={4}
																				className={classes.headingList1}
																				style={{
																					borderRight: '0',
																					borderBottomLeftRadius: '5px',
																				}}
																			>
																				{/* <Typography >1</Typography> */}

																				<Typography
																					style={{
																						background: 'white',
																						padding: '0px',
																						borderBottomLeftRadius: '5px',
																					}}
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
																				className={classes.headingList1}
																				style={{
																					borderLeft: '1px solid lightgrey',
																				}}
																			>
																				<Typography
																					style={{
																						background: 'white',
																						padding: '0px',
																					}}
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
																				className={classes.headingList1}
																				style={{
																					borderRight: '0',
																					borderBottomRightRadius: '5px',
																				}}
																			>
																				<Typography
																					style={{
																						background: 'white',
																						padding: '0px',
																						borderBottomRightRadius: '5px',
																					}}
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
																				className={classes.headingList1}
																				style={{
																					borderRight: '0',
																					borderBottomLeftRadius: '5px',
																				}}
																			>
																				{/* <Typography >1</Typography> */}

																				<Typography
																					style={{
																						background: 'white',
																						padding: '0px',
																						borderBottomLeftRadius: '5px',
																					}}
																				>
																					{sub.timeTable[0].date}
																				</Typography>
																			</Grid>
																			<Grid
																				item
																				lg={4}
																				md={4}
																				sm={4}
																				xs={4}
																				className={classes.headingList1}
																				style={{
																					borderLeft: '1px solid lightgrey',
																				}}
																			>
																				<Typography
																					style={{
																						background: 'white',
																						padding: '0px',
																					}}
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
																				className={classes.headingList1}
																				style={{
																					borderRight: '0',
																					borderBottomRightRadius: '5px',
																				}}
																			>
																				<Typography
																					style={{
																						background: 'white',
																						padding: '0px',
																						borderBottomRightRadius: '5px',
																					}}
																				>
																					{sub.timeTable[0].end_time}
																				</Typography>
																			</Grid>
																		</Grid>
																	</Grid>
																)

																//     )
																// })
															}
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
						<Typography
							className={classes.headingtest_1}
							style={{ marginTop: '70px', textAlign: 'center' }}
						>
							No TimeTable Created Yet!
						</Typography>
					)}
				</div>
			)}
		</Fragment>
	)
}
export default TestSubjectPage
