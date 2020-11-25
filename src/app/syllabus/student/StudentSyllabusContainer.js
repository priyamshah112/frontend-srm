import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { connect } from 'react-redux'
import SyllabusService from '../SyllabusService'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { CircularProgress } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
	container: {
		width: '100%',
		backgroundColor: theme.palette.mainBackground,
		height: '100%',

		padding: '0',
		overflowY: 'auto',
	},
	detailsHeader: {
		borderLeft: '1px solid rgba(224, 224, 224, 1)',
	},
	selectHeader: {
		width: '100%',
	},
	select: {
		width: '25%',
	},
	loading: {
		width: '100%',
		textAlign: 'center',
		paddingTop: '8px',
		fontSize: '20px',
	},
	emptyView: {
		width: '100%',
		textAlign: 'center',
		paddingTop: '100px',
		fontSize: '20px',
	},
	description: {
		'white-space': 'pre-wrap',
	},
	div: {
		margin: 20,
	},
	marginRight: {
		marginRight: '5%',
	},
}))

const StudentSyllabus = (props) => {
	const [syllabus, setSyllabus] = useState(null)
	const [isLoading, setLoading] = useState(true)
	const [subject, setSubject] = useState('') //Choose Subject ID
	const [subjects, setSubjects] = useState(null) //subjects ARRAY
	const [classList, setClasses] = useState(null)
	const [classID, setClass] = useState('')
	var role = String(JSON.parse(localStorage.getItem('srmSelectedRole')))
	var string1 = 'parent'
	if (String(role) === String(string1)) {
		var token = localStorage.getItem('srmSelected_Child_token')
	} else {
		var token = localStorage.getItem('srmToken')
	}

	const handleChange = (event) => {
		setSubject(event.target.value)
		setLoading(true)
	}

	const fetchClassSyllabus = async (subject_id, class_id) => {
		const response = await SyllabusService.getSyllabusByParams(
			token,
			class_id,
			subject_id
		)
		if (response.status === 200) {
			if (response.data.data.length === 0) {
				setSyllabus(null)
			} else {
				setSyllabus(response.data.data)
			}

			setLoading(false)
		}
	}

	const fetchClasses = async () => {
		const response = await SyllabusService.fetchClasses(token)
		if (response.status === 200) {
			if (response.data.status == 'success') {
				let tempClassList = {}
				response.data.data.forEach((classDetails) => {
					tempClassList[classDetails.id] = classDetails
				})
				if (classID === '') {
					setClass(response.data.data[0].id)
				}
				setClasses({ ...tempClassList })
			}
		}
	}

	useEffect(() => {
		let isMounted = true
		if (isMounted) {
			if (classID !== '' && subject !== '') {
				fetchClassSyllabus(subject, classID)
			}
		}
		return () => {
			isMounted = false
		}
	}, [classID, subject])

	useEffect(() => {
		if (classID !== '' && classList !== null) {
			let tempSubjectList = {}
			classList[classID].subject_lists.forEach((subject) => {
				tempSubjectList[subject.subject_id] = subject
			})
			if (subject === '') {
				setSubject(classList[classID].subject_lists[0].subject_id)
			}
			setSubjects({ ...tempSubjectList })
		}
	}, [classID, classList])

	useEffect(() => {
		if (classList == null) {
			fetchClasses()
		}
	}, [])

	const classes = useStyles()
	const table =
		!isLoading && syllabus ? (
			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label='spanning table'>
					<TableHead>
						<TableRow>
							<TableCell align='center' width='15%'>
								<Typography variant='subtitle1'>
									<b>Term</b>
								</Typography>
							</TableCell>
							<TableCell
								align='center'
								width='85%'
								colSpan={2}
								className={classes.detailsHeader}
							>
								<Typography variant='subtitle1'>
									<b>Details</b>
								</Typography>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{syllabus != null
							? syllabus.map((chapter, index) => (
									<TableRow key={index}>
										<TableCell
											component='th'
											align='center'
											scope='row'
											width='15%'
										>
											<Typography variant='subtitle1'>
												Term {chapter.chapters.term}
											</Typography>
										</TableCell>
										<TableCell
											align='left'
											width='25%'
											className={classes.detailsHeader}
										>
											<Typography variant='subtitle1' gutterBottom>
												Chapter {chapter.chapters.chapter}
											</Typography>
										</TableCell>
										<TableCell align='left' width='60%'>
											<Typography
												variant='subtitle1'
												className={classes.description}
												gutterBottom
											>
												{chapter.main_content}
											</Typography>
										</TableCell>
									</TableRow>
							  ))
							: null}
					</TableBody>
				</Table>
			</TableContainer>
		) : null
	return (
		<div className={classes.container}>
			<div className={classes.div}>
				<Select
					labelId='demo-simple-select-label'
					id='demo-simple-select'
					value={subject}
					onChange={handleChange}
					className={`${classes.select} ${classes.marginRight}`}
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
				>
					{subjects !== null
						? Object.keys(subjects).map(function (key, index) {
								return (
									<MenuItem key={index} value={subjects[key].subject_id}>
										{subjects[key].subject_data.name}
									</MenuItem>
								)
						  })
						: null}
				</Select>
				<br />
				<br />
				{table}
				{isLoading ? (
					<div className={classes.loading}>
						<CircularProgress color='primary' size={30} />
					</div>
				) : null}
				{!isLoading && !syllabus ? (
					<div className={classes.emptyView}>
						<Typography>You don't have any syllabus.</Typography>
					</div>
				) : null}
			</div>
		</div>
	)
}
const mapStateToProps = (state) => {
	return {
		selectedRole: state.auth.selectedRole,
	}
}

export default connect(mapStateToProps)(StudentSyllabus)
