import React, { Fragment, useEffect, useState } from 'react'
import TimetableService from '../timeTableService'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import medal from '../../../assets/images/Medal.png'
import { Container } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
// import Typography from '@material-ui/core/Typography';
import TestSubjectPage from './testSubjectPage'
import { CircularProgress, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
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
	card: {
		width: '30%',
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		cursor: 'pointer',
	},

	root: {
		root: {
			flexGrow: 1,
		},
	},
}))
const StudentTimeTable = (props) => {
	const classes = useStyles()
	var role = String(JSON.parse(localStorage.getItem('srmSelectedRole')))
	var string1 = 'parent'
	if (String(role) === String(string1)) {
		var token = localStorage.getItem('srmSelected_Child_token')
	} else {
		var token = localStorage.getItem('srmToken')
	}
	const [isLoading, setIsLoading] = useState(true)
	const [ClassTestList, SetClassTestList] = useState(null)
	const [testID, setTestID] = useState()
	const [ClassID, setClassID] = useState(props.classID)
	const [subPageUI, setSubPageUI] = useState(false)
	const [TimeTableData, setTimeTableData] = useState(null)
	const [subjectDetail, setSubjectDeatil] = useState()
	const [examTimeTable, setExamTimeTable] = useState(null)
	const [subCatgarray, setSubCatgarray] = useState(null)
	const [backTick, setBackTick] = useState(false)

	const fetchClassTestList = async () => {
		const res = await TimetableService.getStudentTestList(token, props.classID)
		if (res.status === 200) {
			const data = res.data.data.data
			SetClassTestList(data)
			setIsLoading(false)
		}
	}
	useEffect(() => {
		fetchClassTestList()
	}, [])

	const clickTest = (e, testid) => {
		setTestID(testid)
		setSubPageUI(true)
	}

	const sublistBacktick = (e) => {
		e.preventDefault()
		setSubPageUI(false)
	}

	return (
		<Fragment>
			{subPageUI === false ? (
				<div>
					{isLoading ? (
						<>
							<br />
							<div className={classes.loading}>
								<CircularProgress color='primary' size={30} />
							</div>
							<br />
						</>
					) : (
						<>
							<Grid
								container
								spacing={12}
								style={{
									marginTop: '8px',
									marginBottom: '15px',
									justifyContent: 'center',
								}}
							>
								<Typography
									className={classes.headingtest}
									style={{ textAlign: 'center', paddingRight: '20px' }}
								>
									Test List
								</Typography>
							</Grid>

							<Grid container spacing={3} style={{ padding: '20px' }}>
								{ClassTestList != null
									? Object.keys(ClassTestList).map((key, index) => {
											return (
												<Grid item xs={12} lg={4} sm={6} xl={3}>
													<Paper
														className={classes.paper}
														key={index}
														onClick={(e) => clickTest(e, ClassTestList[key])}
													>
														<img
															src={medal}
															alt='medalavt'
															maxwidth='59px'
															maxheight='78px'
														/>
														<Typography
															style={{
																color: '#1C1C1E',
																font: 'normal normal medium 18px/25px Avenir',
																letterSpacing: '0px',
															}}
														>
															{ClassTestList[key].name}
														</Typography>
													</Paper>
												</Grid>
											)
									  })
									: null}
							</Grid>
						</>
					)}
				</div>
			) : (
				<Container style={{ marginBottom: '100px' }}>
					<TestSubjectPage
						sublistBacktick={sublistBacktick}
						TimeTableData={TimeTableData}
						subjectDetail={subjectDetail}
						examTimeTable={examTimeTable}
						subCatgarray={subCatgarray}
						testID={testID}
						setSubPageUI={setSubPageUI}
						sublistBacktick={sublistBacktick}
					/>
				</Container>
			)}
		</Fragment>
	)
}
export default StudentTimeTable
