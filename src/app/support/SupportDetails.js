import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import {
	Typography,
	CardContent,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	CircularProgress,
	Backdrop,
	Snackbar,
} from '@material-ui/core'
import Card from '@material-ui/core/Card'
import { useHistory } from 'react-router-dom'
import BackIcon from '../../assets/images/Back.svg'
import { connect } from 'react-redux'
import moment from 'moment'
import { ticketStatus } from './SupportCard'
import SupportApprove from './admin/SupportApprove'
import {
	getSingleCategory,
	updateSupport,
} from '../redux/actions/support.action'
import Alert from '@material-ui/lab/Alert'

const useStyle = makeStyles((theme) => ({
	container: {
		width: '100%',
		backgroundColor: theme.palette.mainBackground,
		height: '100%',
		marign: '0',
		padding: '0',
		overflowY: 'auto',
		'&::-webkit-scrollbar': {
			width: 0,
		},
	},
	supportContainer: {
		width: '95%',
		height: '100%',
		margin: '0 auto',
	},
	card: {
		marginTop: '20px',
		boxShadow: 'none',
		borderRadius: '10px',
	},
	Header: {
		textAlign: 'center',
	},
	labelText: {
		fontSize: '14px',
		fontStyle: 'normal',
		color: `${theme.palette.common.blackRussian}`,
		opacity: 0.5,
	},
	backImg: {
		float: 'left',
		cursor: 'pointer',
		transform: 'translateY(5px)',
	},
	marginT30: {
		marginTop: '30px',
	},
	mainSection: {
		display: 'flex',
		[theme.breakpoints.down('xs')]: {
			display: 'block',
		},
	},
	contentSection: {
		width: `calc(100% - 150px)`,
		[theme.breakpoints.down('xs')]: {
			width: '100%',
		},
	},
	subContentSection: {
		width: '150px',
		marginLeft: 'auto',
		textAlign: 'right',
		[theme.breakpoints.down('xs')]: {
			margin: 0,
			textAlign: 'left',
		},
	},
	highlightedText: {
		fontSize: '14px',
		fontStyle: 'normal',
		color: `${theme.palette.common.blackRussian}`,
		fontWeight: 500,
		opacity: 1,
	},
	normalText: {
		fontSize: '14px',
		fontStyle: 'normal',
		color: `${theme.palette.common.blackRussian}`,
		opacity: 1,
	},
	cardContent: {
		padding: '30px 20px 34px !important',
	},
	textAlignRight: {
		textAlign: 'right',
	},
	selectDiv: {
		width: '100%',
	},
	formControl: {
		width: '100%',
	},
	detailsSection: {
		marginTop: '20px',
	},
	loading: {
		display: 'flex',
		justifyContent: 'center',
		paddingTop: '40px',
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: `#fff`,
	},
	display: {
		display: 'flex',
	},
	div: {
		width: 'max-content',
		marginLeft: 'auto',
	},
}))

const SupportDetails = (props) => {
	const classes = useStyle()
	const history = useHistory()
	const selectedRole = props.selectedRole

	const [status, setStatus] = useState('')
	const [pendingStatus, setPendingStatus] = useState('')
	const [open, setOpen] = useState(false)
	const [openApproveDialog, setOpenApproveDialog] = useState(false)
	const [categoryName, setCategoryName] = useState('')
	const [openSnackbar, setOpenSnackbar] = useState(false)
	const [snackbar, setSnackbar] = useState({})
	const [updateStatusValue, setUpdateStatus] = useState(Math.random())

	const { data = {} } = props

	useEffect(() => {
		setStatus(pendingStatus)
	}, [updateStatusValue])

	useEffect(() => {
		setStatus(data.status)
		if (!data.category_id) return
		props.getSingleCategory(data.category_id, onGetCategory)
	}, [data])

	const onGetCategory = (d = {}) => {
		const { data = {} } = d
		console.log('onGetCategory', d)
		setCategoryName(data.category_name)
	}

	const handleChange = (event) => {
		const value = event.target.value
		setPendingStatus(value)
		if (value === 'approved') {
			setOpenApproveDialog(true)
		} else {
			updateStatus(value)
		}
	}

	const handleClose = () => {
		setOpen(false)
	}
	const handleOpen = () => {
		setOpen(true)
	}

	const handleCloseApproveDialog = () => {
		setOpenApproveDialog(false)
	}

	const handleApproveClose = () => {
		handleCloseApproveDialog()
		updateStatus(pendingStatus)
	}

	const updateStatus = (status) => {
		const data = {
			status,
		}
		props.updateSupport(data, props.id, onSuccessUpdate, onFailUpdate)
	}

	const onSuccessUpdate = () => {
		setUpdateStatus(Math.random())
		showSnackbar({ type: 'success', message: 'Status Updated' })
	}

	const onFailUpdate = (err = {}) => {
		showSnackbar({ message: err.message })
	}

	const showSnackbar = (d) => {
		setOpenSnackbar(true)
		setSnackbar(d)
	}

	const handleSnackbarClose = () => {
		setOpenSnackbar(false)
	}

	const normalData = [
		{ key: 'submitted', title: 'Submitted' },
		{ key: 'acknowledge', title: 'Acknowledged' },
		{ key: 'in-progress', title: 'InProgress' },
		{ key: 'resolved', title: 'Resolved' },
		{ key: 'canceled', title: 'Canceled' },
	]

	const addressStatus = [
		{ key: 'submitted', title: 'Submitted' },
		{ key: 'canceled', title: 'Canceled' },
		{ key: 'approved', title: 'Approved' },
	]

	const statusData = data.address_id ? addressStatus : normalData

	return (
		<>
			<div className={classes.detailsCard}>
				<Card className={classes.card}>
					<CardContent className={classes.cardContent}>
						<div className={classes.Header}>
							<div className={classes.backBtnDiv}>
								<img
									src={BackIcon}
									alt='Back'
									className={classes.backImg}
									onClick={() => {
										history.push('/support')
									}}
								/>
							</div>
							<div className={classes.ticketNumber}>
								<Typography variant='h5'>{data.code}</Typography>
							</div>
						</div>
						{props.loading ? (
							<div className={classes.loading}>
								<CircularProgress />
							</div>
						) : (
							<>
								<div className={`${classes.mainSection} ${classes.marginT30}`}>
									<div className={classes.contentSection}>
										<Typography className={classes.highlightedText}>
											{data.subject}
										</Typography>
									</div>
									<div className={classes.subContentSection}>
										<Typography className={classes.labelText}>
											{moment(data.updated_at).format('DD MMM, HH:mm A')}
										</Typography>
									</div>
								</div>

								<div className={`${classes.mainSection} ${classes.display}`}>
									{selectedRole === 'admin' ? (
										''
									) : (
										<div className={classes.contentSection}>
											<Typography className={classes.normalText}>
												Status - {ticketStatus[data.status]}
											</Typography>
										</div>
									)}
									<div
										className={`${classes.subContentSection} ${classes.div}`}
									>
										{props.categoryLoading ? (
											<CircularProgress size={20} />
										) : (
											<Typography className={classes.labelText}>
												{categoryName}
											</Typography>
										)}
									</div>
								</div>
								{selectedRole === 'admin' ? (
									<div className={classes.selectDiv}>
										<FormControl className={classes.formControl}>
											<InputLabel id='demo-controlled-open-select-label'>
												Status
											</InputLabel>
											{status ? (
												<Select
													labelId='demo-controlled-open-select-label'
													id='demo-controlled-open-select'
													open={open}
													onClose={handleClose}
													onOpen={handleOpen}
													value={status}
													onChange={handleChange}
												>
													{statusData.map((item) => (
														<MenuItem value={item.key}>{item.title}</MenuItem>
													))}
												</Select>
											) : null}
										</FormControl>
									</div>
								) : (
									''
								)}

								<div className={classes.detailsSection}>
									<Typography className={classes.normalText}>
										{data.description ? (
											<div
												dangerouslySetInnerHTML={{ __html: data.description }}
											/>
										) : null}
									</Typography>
								</div>
							</>
						)}
					</CardContent>
				</Card>
			</div>
			{openApproveDialog ? (
				<SupportApprove
					open={openApproveDialog}
					handleApproveClose={handleApproveClose}
					handleClose={handleCloseApproveDialog}
				/>
			) : (
				''
			)}
			<Backdrop open={props.updateLoading} className={classes.backdrop}>
				<CircularProgress color='inherit' />
			</Backdrop>
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
		</>
	)
}

const mapStateToProps = ({ auth, Supports }) => {
	const { singleCategoryLoading, updateSupportLoading } = Supports
	return {
		selectedRole: auth.selectedRole,
		categoryLoading: singleCategoryLoading,
		updateLoading: updateSupportLoading,
	}
}

export default connect(mapStateToProps, { getSingleCategory, updateSupport })(
	SupportDetails
)
