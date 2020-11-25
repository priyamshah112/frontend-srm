import React, { useEffect, useState } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import './Attendance.css'
import AttendanceDot from '../components/attendanceDot'
import TableTopHead from '../components/tableTopHeader'
import AttendanceFilter from './filters'
import {
	getAttendence,
	updateAddendance,
} from '../../redux/actions/attendence.action'
import CircularProgress from '@material-ui/core/CircularProgress'
import {
	weekStartDate,
	getWeekDates,
	getNextWeekStartDate,
	getPreviousWeekStartDate,
	currentMonth,
	currentMonth_formatted,
	getMonth,
	isFutureDate,
	getWeekEndDate,
} from '../../../shared/datediff'
import { formatAttendanceData } from '../../../shared/filter'
import AttendanceFooter from '../components/attendanceFooter'
import moment from 'moment'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
	container: {
		width: '100%',
		backgroundColor: theme.palette.mainBackground,
		height: '100%',
		marign: '0',
		padding: '0',
		display: 'flex',
		flexDirection: 'column',
	},
	content: {
		flexGrow: '1',
		display: 'flex',
		flexDirection: 'column',
		minHeight: '0',
		padding: '0 20px 20px 20px',
	},
	panel: {
		flexGrow: '1',
		overflow: 'auto',
		minHeight: '100%',
		scrollbarWidth: 'none',
		'&::-webkit-scrollbar': {
			display: 'none',
		},
	},
	marginTop: {
		marginTop: '20px',
	},
	middlePanelRow: {
		marginTop: '20px',
		backgroundColor: '#e6e6e6',
		borderRadius: '10px',
		display: 'block',
	},
	table: {
		minWidth: 700,
	},
	tableTitle: {
		backgroundColor: 'white !important',
		color: 'var(--unnamed-color-1c1c1e)',
		textAlign: 'center',
		font: 'normal normal normal 14px/21px Avenir',
		letterSpacing: '-0.22px',
		color: '#1C1C1E !important',
		opacity: '1',
	},
	tableNameColumn: {
		textAlign: 'center',
		font: 'normal normal normal 12px/16px Avenir',
		letterSpacing: '0px',
		color: '#808082',
		opacity: '1',
	},
	tableNoColumn: {
		textAlign: 'center',
		font: 'normal normal normal 12px/16px Avenir',
		letterSpacing: '0px',
		color: '#808082',
		opacity: '1',
	},
	emptyData: {
		padding: '50px 20px',
	},
	loadingView: {
		height: '150px',
	},
	loader: {
		position: 'absolute',
		left: '30px',
		right: '50px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '150px',
	},
	dot: {
		cursor: 'pointer',
	},
}))

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow)

const TeacherAttendanceContainer = (props) => {
	var monthNames = [
		'JAN',
		'FEB',
		'MAR',
		'APR',
		'MAY',
		'JUNE',
		'JULY',
		'AUG',
		'SEP',
		'OCT',
		'NOV',
		'DEC',
	]
	const [attendence, setAttendence] = useState([])
	const [class_id, setClassId] = useState('')
	const [subject_id, setSubjectId] = useState('')
	const [weekStart, setWeekStart] = useState(weekStartDate)
	const [selectedMonth, setSelectedMonth] = useState(currentMonth)
	const [error, setError] = useState('')
	const [headerdate, setheaderdate] = useState(currentMonth_formatted)
	const [aError, setAError] = useState({})
	const [updateLoading, setUpdateLoading] = useState(false)
	const [nextpage, setnextpage] = useState(false)
	const { loading } = props
	const classes = useStyles()
	const from_date = moment(weekStart).format('YYYY-MM-DD')
	const to_date = moment(getWeekEndDate(weekStart)).format('YYYY-MM-DD')

	useEffect(() => {
		if (class_id && subject_id) {
			fetchAttendence()
		}
	}, [class_id, subject_id, weekStart])

	const change_header_date = (month) => {
		const header_date_1 = month.split('-')
		console.log(header_date_1)
		const final_header_date =
			monthNames[header_date_1[1] - 1] + "'" + header_date_1[0].slice(2, 4)
		console.log(final_header_date)
		setheaderdate(final_header_date)
	}
	const fetchAttendence = () => {
		const params = {
			class_id,
			subject_id,
			current_role: props.selectedRole,
			from_date,
			to_date,
		}
		props.getAttendence(params, onGet, onFail)
	}

	const onGet = (d = {}) => {
		const { data = {} } = d
		const atData = formatAttendanceData(data)
		setAttendence(atData)
	}

	const onFail = (err = {}) => {
		setError(err.message)
	}

	const weekData = getWeekDates(weekStart)

	const onPrevious = () => {
		const startDate = getPreviousWeekStartDate(weekStart)
		setWeekStart(startDate)
		setSelectedMonth(getMonth(startDate))
		change_header_date(getMonth(startDate))
		setnextpage(true)
	}

	const onNext = () => {
		if (
			moment(weekStart).format('YYYY-MM-DD') ===
			moment(weekStartDate).format('YYYY-MM-DD')
		) {
			setnextpage(false)
			return
		}
		const startDate = getNextWeekStartDate(weekStart)
		setWeekStart(startDate)
		setSelectedMonth(getMonth(startDate))
		change_header_date(getMonth(startDate))

		if (
			moment(startDate).format('YYYY-MM-DD') ===
			moment(weekStartDate).format('YYYY-MM-DD')
		) {
			setnextpage(false)
		}
	}

	const getAttendanceDates = (dates = []) => {
		const weekDates = weekData.map((item) => item.date)
		const newDates = weekDates.map((attendance_date) => {
			return { attendance_date }
		})

		if (dates.length) {
			dates.map((d) => {
				const indexOf = weekDates.indexOf(d.attendance_date)
				if (indexOf !== -1) {
					newDates.splice(indexOf, 1, d)
				}
			})
		}

		return newDates
	}

	const changeAttendanceStatus = (d = {}, rowIndex, dateIndex) => {
		const path = `${rowIndex}${dateIndex}`
		setUpdateLoading(path)
		setAError({ ...aError, [path]: false })
		const attendanceStatus = {
			present: 'absent',
			absent: 'holiday',
			holiday: 'present',
		}

		const data = {
			user_id: d.user_id,
			class_id: d.class_id,
			attendance_date: d.attendance_date,
			subject_id,
			status: attendanceStatus[d.status] || 'absent',
		}
		props.updateAddendance(
			data,
			d.id,
			(d) => onUpdateSuccess(d, rowIndex),
			(e) => onUpdateFail(e, path)
		)
	}

	const onUpdateSuccess = (d = {}, rowIndex) => {
		const { data = {} } = d
		setUpdateLoading(false)
		updateStatus(data, rowIndex)
	}

	const onUpdateFail = (e = {}, path) => {
		setAError({ ...aError, [path]: 'Update Error' })
		setUpdateLoading(false)
	}

	const getIsLoading = (rI, dI) => {
		if (updateLoading === false) return false
		return `${rI}${dI}` === updateLoading
	}

	const getIsError = (rI, dI) => {
		const ePath = `${rI}${dI}`
		return aError[ePath]
	}

	const updateStatus = (d = {}, rowIndex) => {
		const aData = [...attendence]
		const dates = aData[rowIndex].dates || []
		dates.map((date) => {
			if (date.attendance_date === d.attendance_date) {
				date.status = d.status
			}
		})

		aData[rowIndex].dates = dates
		setAttendence(aData)
	}

	const renderDots = (row = {}, rowIndex) => {
		const { dates = [] } = row
		const datesData = getAttendanceDates(dates)
		const userData = {
			class_id: row.class_id,
			roll_no: row.roll_no,
			user_id: row.user_id,
		}

		return datesData.map((date, dateIndex) => {
			const isFuture = isFutureDate(date.attendance_date)
			const isLoading = getIsLoading(rowIndex, dateIndex)
			const isError = getIsError(rowIndex, dateIndex)

			return (
				<AttendanceDot
					loading={isLoading}
					error={isError}
					className={classes.dot}
					onClick={() =>
						changeAttendanceStatus(
							{ ...userData, ...date },
							rowIndex,
							dateIndex
						)
					}
					status={isFuture ? '' : date.status}
				/>
			)
		})
	}

	const onChangeClass = (id) => {
		setClassId(id)
		setSubjectId('')
	}

	return (
		<div className={classes.container}>
			<Grid container className={classes.content}>
				<Grid item sm={12} className={classes.panel}>
					<AttendanceFilter
						class_id={class_id}
						setClassId={onChangeClass}
						subject_id={subject_id}
						setSubjectId={setSubjectId}
						from_date={from_date}
						to_date={to_date}
					/>

					<TableContainer component={Paper}>
						<TableTopHead
							onNext={onNext}
							onPrevious={onPrevious}
							isnext={nextpage}
							selectedMonth={headerdate}
						/>
						<Table aria-label='customized table'>
							<TableHead>
								<TableRow className='tableRowHeader'>
									<StyledTableCell className={classes.tableTitle}>
										Roll No
									</StyledTableCell>
									<StyledTableCell
										className={classes.tableTitle}
										align='center'
									>
										Name
									</StyledTableCell>
									{weekData.map((d) => (
										<StyledTableCell
											className={classes.tableTitle}
											align='center'
										>
											<p>{d.day.date_day}</p>
											<span>({d.day.day_sort})</span>
										</StyledTableCell>
									))}
								</TableRow>
							</TableHead>
							{loading ? (
								<div className={classes.loadingView}>
									<div className={classes.loader}>
										<CircularProgress center alignCenter />
									</div>
								</div>
							) : (
								<TableBody>
									{attendence.length ? (
										attendence.map((row, rowIndex) => (
											<StyledTableRow key={rowIndex} className='statusTable'>
												<StyledTableCell className={classes.tableNoColumn}>
													{row.roll_no}
												</StyledTableCell>
												<StyledTableCell
													component='th'
													scope='row'
													className={classes.tableNameColumn}
												>
													{`${row.firsname} ${row.lastname}`}
												</StyledTableCell>
												{renderDots(row, rowIndex)}
											</StyledTableRow>
										))
									) : (
										<div className={classes.loadingView}>
											<div className={classes.loader}>
												<Typography>Attendance Data Not Available</Typography>
											</div>
										</div>
									)}
								</TableBody>
							)}
						</Table>
						<AttendanceFooter />
					</TableContainer>
				</Grid>
			</Grid>
		</div>
	)
}

const mapStateToProps = ({ auth, Attendence }) => {
	const { classesLoading, attendenceLoading, singleClassLoading } = Attendence
	return {
		selectedRole: auth.selectedRole,
		loading: attendenceLoading || classesLoading || singleClassLoading,
	}
}

export default connect(mapStateToProps, {
	getAttendence,
	updateAddendance,
})(TeacherAttendanceContainer)
