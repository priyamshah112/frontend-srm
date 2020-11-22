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
}))

const ImportExport = (props) => {
	const [openSnackbar, setOpenSnackbar] = useState(false)
	const [snackbar, setSnackbar] = useState({})
	const [loading, setLoading] = useState(false)

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
		const params = {
			from_date: props.from_date,
			to_date: props.to_date,
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

	return (
		<div className={classes.topButton}>
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
				onClick={onExport}
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
