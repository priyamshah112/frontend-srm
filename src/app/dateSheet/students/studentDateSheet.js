import React, { Fragment, useEffect, useState } from 'react'
import DateSheetService from '../dateSheetService'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper'
import sheet from '../../../assets/images/dateSheet/sheet.svg'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TestSubjectPage from './testSubjectPage'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({
	container: {
		width: '100%',
		backgroundColor: theme.palette.mainBackground,
		margin: '0',
		overflowY: 'auto',
		padding: '24px',
		boxSizing: 'border-box',
	},
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

	backarrowbutton: {
		color: 'black',
		fontSize: '1.1rem',
	},
	root: {
		root: {
			flexGrow: 1,
		},
	},
	loading: {
		width: '100%',
		textAlign: 'center',
		paddingTop: '8px',
		fontSize: '20px',
	},
	header: {
		display: 'inline block',
	},
	header_title:{
		fonTize: '1rem',
		fontFamily: 'Avenir Book',
		fontWeight: '400',
		color: '#1C1C1E',
		textAlign: 'center',

	},
	Grid: {
		marginTop: '12px',
		marginBottom: '20px',
	},
	typography: {
		color: '#1C1C1E',
		font: 'normal normal medium 18px/25px Avenir',
		letterSpacing: '0px',
	},
	textAlign: {
		textAlign: 'center',
	},
	overflow: {
		marginBottom: '50px',
		overflow: 'auto',
	},
	float: {
		float: 'left',
	},
	CircularProgress: {
		position: 'absolute',
		left: '50%',
		top: '50%',
		zIndex: '1',
	},
	typography:{
		fontSize: '14px',
		fontFamily: 'Avenir Medium',
	}
}))
const StudentDateSheet = (props) => {
	const classes = useStyles()
	let token = localStorage.getItem('srmToken');
	if (props.selectedRole === 'parent') {
		token = localStorage.getItem('srmSelected_Child_token')
	}
	const [mounted,setMounted] = useState(false)
	const [ClassTermList, SetClassTermList] = useState(null)
	const [classList, setClassList] = useState([])
	const [classID, setClassID] = useState(null)
	const [classDetail, setClassDetail] = useState('')
	const [testID, setTestID] = useState()
	const [subPageUI, setSubPageUI] = useState(false)
	const [datesheetist, setDatesheetist] = useState(null)
	const [datesheetLoading, setDatesheetLoading] = useState(false)
	const [datesheetDataTable, setDatesheetDataTable] = useState([])
	const [testData, setTestData] = useState({})
	const [selected_test, setselected_test] = useState({})
	const [isLoading, setLoading] = useState(true)
	const [classLoading,setClassLoading] = useState(false)


	const fetchTermList = async (class_id) => {
		setLoading(true)
		const res = await DateSheetService.getClassTermList(token, class_id)
		if (res.status === 200) {
			const data = res.data.data
			SetClassTermList(data)
		}
		setLoading(false)
	}

	const fetchdatesheet = async (testid) => {
		setDatesheetLoading(true)
		const res = await DateSheetService.getDatesheetList(
			token,
			testid.id,
			testid.class_id,
		)

		if (res.status === 200) {
			console.log("datesheetrr",res)
			setDatesheetist(res.data.data.datesheet)
			setDatesheetDataTable(res.data.data.datesheet_data_table)	
		}		
		setDatesheetLoading(false)
	}

	const fetchClasses = async () => {
		try{
			const response = await DateSheetService.fetchClasses(token)
			if (response.status === 200) {
				if (response.data.status == 'success') {
					let data = response.data.data[0]
					setClassID(data.id) 
					setClassDetail(data.class_name) 
					fetchTermList(data.id)
				}
			}
						
		} catch (e) {
			console.log(e)
		}
	}
	useEffect(() => {
		if(!mounted){			
			if (classID === '' || classID === null) {
				fetchClasses()
			}
			setMounted(true)
		}
	})

	const clickTest = (e, testid) => {
		e.preventDefault()
		setTestData(testid)
		setTestID(testid.id)
		fetchdatesheet(testid)
		setselected_test(testid)
		setSubPageUI(true)
	}
	const sublistBacktick = () => {
		setSubPageUI(false)
	}
	return (
		<div className={classes.container}>			
				{ !subPageUI ? (
					<>		
						<div className={classes.header}>
							<div className={classes.filterForm}>
								<Typography className={classes.header_title}>
									Term Selection
								</Typography>					
							</div>
						</div>
						<Grid container spacing={3} className={classes.Grid}>
							{ClassTermList !== null && !isLoading ? ClassTermList.map((item, index) => {
								return (
									<Grid item xs={6} sm={4} lg={3} xl={3}>
										<Paper
											className={classes.paper}
											key={index}
											onClick={(e) => clickTest(e, item)}
										>
											<img style={{'marginLeft':'-15px'}}
												src={sheet}
												alt='shhet'
												maxwidth='59px'
												maxheight='78px'
											/>
											<Typography
												className={classes.typography}
												style={{
													color: '#1C1C1E',
													font: 'normal normal medium 18px/25px Avenir',
													letterSpacing: '0px',
												}}
											>
												{item.name}
											</Typography>
										</Paper>
									</Grid>
								)
							})
							: isLoading ? (							
								<div className={classes.loading}>
									<CircularProgress color='primary' size={30} />
								</div>
							): 'No date sheet available yet!'
							} 
						</Grid>
					</>
					) : (
					<TestSubjectPage
						testID={testID}
						testData={testData}
						classID={classID}
						classDetail={classDetail}
						refeshDatesheet={fetchdatesheet}
						sublistBacktick={sublistBacktick}
						DateSheetData={datesheetist}
						datesheetDataTable={datesheetDataTable}
						loading={datesheetLoading}
					/>
				)
			}
		</div>
	)
}
const mapStateToProps = (state) => {
	return {
		selectedRole: state.auth.selectedRole,
	}
}

export default connect(mapStateToProps)(StudentDateSheet)