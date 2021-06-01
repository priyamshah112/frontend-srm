import React, { useState } from 'react'
import { CircularProgress, IconButton } from '@material-ui/core'
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom'
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { exportAttendance } from '../../redux/actions/attendence.action'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import { useHistory } from 'react-router-dom'
import Axios from 'axios'
import { exportAttendanceEndpoint } from '../../redux/api/endpoint-constants'
import axiosService from '../../redux/api/axios-service'
import { Dialog, DialogTitle, DialogContent,DialogActions, FormControl, TextField,Button } from '@material-ui/core'
import { MuiPickersUtilsProvider,DatePicker } from "@material-ui/pickers";
import InputAdornment from "@material-ui/core/InputAdornment";
import EventIcon from "@material-ui/icons/Event";
import DateFnsUtils from "@date-io/date-fns";
import moment from 'moment'
import { fonts,colors } from '../../common/ui/appStyles'

const useStyles = makeStyles((theme) => ({
	VerticalAlignTopIcon: {
		color: '#ababaf',
	},
	topButton: {
		float: 'right',
		padding: '0px 20px 0px 0px',
	},
	menuButton: {
		margin: '5px',
	},
	title:{
		padding: '20px',
		'& h2':{
			fontSize: '18px',
		}
	},
	content:{
		paddingTop: 0,
		paddingLeft: 20,
		paddingRight: 20,
		paddingBottom: 10
	},
	actions:{
		padding: '20px',
		paddingTop: '0px',
	},
	formControl: {
		width: '100%',
		paddingBottom: '20px',
	},
}))

const ImportExport = (props) => {
	const [openSnackbar, setOpenSnackbar] = useState(false)
	const [snackbar, setSnackbar] = useState({})
	const [loading, setLoading] = useState(false)
	const [fromDate,setFromDate] = useState(null)
	const [toDate,setToDate] = useState(null)
	const [ openModel, setOpenModel] = useState(false)

	const classes = useStyles()
	const history = useHistory()

	const showSnackbar = (d) => {
		setOpenSnackbar(true)
		setSnackbar(d)
	}

	const handleSnackbarClose = () => {
		setOpenSnackbar(false)
	}

	const onImport = () => {
		history.push('/attendance/upload')
	}

	const onExport = () => {
		setOpenModel(false)
		const params = {
			from_date: moment(fromDate).format('YYYY-MM-DD'),
			to_date: moment(toDate).format('YYYY-MM-DD'),
			class_id: props.class_id,
		}
		setLoading(true)
		const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL
		const token = axiosService.getAuthorizationToken()
		Axios({
			url: `${exportAttendanceEndpoint}`,
			method: 'GET',
			params,
			responseType: 'blob',
			headers: { Authorization: `Bearer ${token}` },
		})
			.then((response) => {
				setLoading(false)
				const url = window.URL.createObjectURL(new Blob([response.data]))
				const link = document.createElement('a')
				link.href = url
				link.setAttribute('download', 'attendance.xlsx')
				document.body.appendChild(link)
				link.click()
				exportSuccess()
			})
			.catch(() => {
				exportFail()
				setLoading(false)
			})
	}

	const exportSuccess = () => {
		showSnackbar({ type: 'success', message: 'Export Success!' })
	}

	const exportFail = (error = {}) => {
		showSnackbar({ message: error.message })
	}

	const handleClose = () =>{
		setOpenModel(false)
	}
	const handleFromDate = (date) => {
		setFromDate(date);
	};
	const handleToDate = (date) => {
		setToDate(date);
	};
	return (
		<div className={classes.topButton}>

			<Dialog open={openModel} onClose={handleClose} aria-labelledby="form-dialog-title" className={classes.modelConatiner}>
				<DialogTitle id="form-dialog-title" className={classes.title}>Export Attendance</DialogTitle>
				<DialogContent className={classes.content}>
					<FormControl className={classes.formControl}>					
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<DatePicker
							id="from_date"
							label="From Date"
							variant="dialog"
							format="dd/MM/yyyy"
							value={fromDate}
							onChange={handleFromDate}
							InputProps={{
								endAdornment: (
								<InputAdornment position="end">
									<IconButton>
									<EventIcon />
									</IconButton>
								</InputAdornment>
								),
							}}
							className={classes.datePicker}
							required={true}
							/>
							</MuiPickersUtilsProvider>
					</FormControl>
					<FormControl className={classes.formControl}>					
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<DatePicker
							id="to_date"
							label="To Date"
							variant="dialog"
							format="dd/MM/yyyy"
							value={toDate}
							onChange={handleToDate}
							InputProps={{
								endAdornment: (
								<InputAdornment position="end">
									<IconButton>
									<EventIcon />
									</IconButton>
								</InputAdornment>
								),
							}}
							className={classes.datePicker}
							required={true}
							/>
							</MuiPickersUtilsProvider>
					</FormControl>
				</DialogContent>
				<DialogActions className={classes.actions}>
					<Button	
						variant='contained' 
						onClick={onExport} 
						color="primary"
						disableRipple 
						disableElevation
					>
						Download
					</Button>
				</DialogActions>
			</Dialog>
			<IconButton
				color='inherit'
				aria-label='open drawer'
				edge='start'
				onClick={onImport}
				className={classes.menuButton}
			>
				<VerticalAlignTopIcon className={classes.VerticalAlignTopIcon} />
			</IconButton>
			<IconButton
				color='inherit'
				aria-label='open drawer'
				edge='start'
				onClick={setOpenModel}
				className={classes.menuButton}
			>
				{loading ? (
					<CircularProgress size={20} />
				) : (
					<VerticalAlignBottomIcon className={classes.VerticalAlignTopIcon} />
				)}
			</IconButton>
			<Snackbar
				open={openSnackbar}
				autoHideDuration={5000}
				onClose={handleSnackbarClose}
			>
				<Alert
					onClose={handleSnackbarClose}
					severity={snackbar.type || 'error'}
				>
					{snackbar.message || 'Something went wrong!! Please try again.'}
				</Alert>
			</Snackbar>

		</div>
	)
}

const mapStateToProps = ({ Attendence }) => {
	const { exportLoading, importLoading } = Attendence
	return {
		exportLoading,
		importLoading,
	}
}

export default connect(mapStateToProps, { exportAttendance })(ImportExport)
