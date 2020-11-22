import React, { Fragment, useEffect, useState } from 'react'
import TimetableService from '../timeTableService'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import medal from '../../../assets/images/Medal.png'
import { Container } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TestSubjectPage from './testSubjectPage'

const useStyles = makeStyles((theme) => ({
	headingtest: {
		fonTize: '1rem',
		fontFamily: 'Avenir Medium',
		fontWeight: '400',
		lineHeight: '1.5',
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
	grid: {
		marginTop: '8px',
		marginBottom: '15px',
		justifyContent: 'center',
	},
	Typography: {
		textAlign: 'center',
		paddingRight: '20px',
	},
	padding: {
		padding: '20px',
	},
	typographyStyle: {
		color: '#1C1C1E',
		font: 'normal normal medium 18px/25px Avenir',
		letterSpacing: '0px',
	},
	marginBottom: {
		marginBottom: '100px',
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
	const [ClassTestList, SetClassTestList] = useState(null)
	const [testID, setTestID] = useState()
	const [subPageUI, setSubPageUI] = useState(false)
	const [TimeTableData, setTimeTableData] = useState(null)
	const [subjectDetail, setSubjectDeatil] = useState()
	const [examTimeTable, setExamTimeTable] = useState(null)
	const [subCatgarray, setSubCatgarray] = useState(null)

	const fetchClassTestList = async () => {
		const res = await TimetableService.getStudentTestList(token, props.classID)
		if (res.status === 200) {
			const data = res.data.data.data
			SetClassTestList(data)
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
					<Grid container spacing={12} className={classes.grid}>
						<Typography
							className={`${classes.headingtest} ${classes.Typography}`}
						>
							Test List
						</Typography>
					</Grid>

					<Grid container spacing={3} className={classes.padding}>
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
												<Typography className={classes.typographyStyle}>
													{ClassTestList[key].name}
												</Typography>
											</Paper>
										</Grid>
									)
							  })
							: null}
					</Grid>
				</div>
			) : (
				<Container className={classes.marginBottom}>
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
