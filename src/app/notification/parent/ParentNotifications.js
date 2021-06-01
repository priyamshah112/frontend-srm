import 'date-fns'
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'
import { Typography } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import InfiniteScroll from 'react-infinite-scroll-component'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import NotificationCard from '../NotificationCard'
import NotificationService from '../NotificationService'

const useStyles = makeStyles((theme) => ({
	infiniteContainer:{
		display: 'grid',
	},
	datePicker: {
		width: '25%',
		paddingRight: '10px',
	},
	sectionContainer: {
		height: '100%',
		width: '100%',
		overflow: 'auto',
		padding: '20px',
		boxSizing: 'border-box'
	},

	header: {
		paddingRight: '15px',
		paddingLeft: '15px',
		paddingTop: '10px',
		textAlign: 'right',
	},
	filterHeader: {
		width: '100%',
		paddingBottom: '10px',
	},
	selectFiler: {
		color: `${theme.palette.common.adornment}`,
		fontSize: '15px',
		'&:before': {
			borderColor: `${theme.palette.common.adornment}`,
		},
		'& .MuiInputBase-input': {
			paddingBottom: '3px',
		},
	},
	formControl: {
		width: '110px',
		whiteSpace: 'nowrap',
	},
	cardBoxPadding: {
		padding: '0px',
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
}))

const ParentNotification = (props) => {
	const classes = useStyles()
	const [hasMore, setHasMore] = useState(true)
	const [currentPage, setCurrentPage] = useState(1)
	const [notifications, setNotifications] = useState([])
	const [filter, setFilter] = useState('All')
	const [loading, setLoading] = useState(true)				
	const token = localStorage.getItem('srmToken')
	const selectedRole = JSON.parse(localStorage.getItem('srmSelectedRole'))
	let srmSelectedChild = null
	let srmChild = null
	
	if(selectedRole === 'parent'){
		srmSelectedChild = localStorage.getItem('srmSelected_Child')
		srmChild = JSON.parse(localStorage.getItem('srmChild_dict'))
	}

	let content

	useEffect(() => {
		let isNotificationLoading = true
		const fetchNotification = async () => {
			let params = {
				current_role: selectedRole,
				created_by: false,
				page: currentPage,					
				status: filter.toLowerCase()
			}

			if(selectedRole === 'parent'){
				params = {
					...params,
					student_id: srmChild[srmSelectedChild].userDetails.id || null,
				}
			}
			try {
				const response = await NotificationService.fetchNotification(
					token,
					params
				)
				setLoading(false)
				if (response.status === 200) {
					if (isNotificationLoading) {
						if (
							response.data.data.last_page === response.data.data.current_page
						) {
							setHasMore(false)
							setNotifications([...response.data.data.data])
						} else {
							setCurrentPage(currentPage + 1)
							setNotifications([...response.data.data.data])
						}
					}
				}
			} catch (e) {
				console.log(e)
				setLoading(false)
			}
		}
		fetchNotification()
		return () => {
			isNotificationLoading = false
		}
	}, [])

	const fetchNotifcationOnScroll = async () => {
		let params = {
			current_role: selectedRole,
			created_by: false,
			page: currentPage,					
			status: filter.toLowerCase()
		}

		if(selectedRole === 'parent'){
			params = {
				...params,
				student_id: srmChild[srmSelectedChild].userDetails.id || null,
			}
		}
		try {
			const response = await NotificationService.fetchNotification(
				props.token,
				params,
			)
			if (response.status === 200) {
				if (response.data.data.last_page === response.data.data.current_page) {
					setHasMore(false)
					setNotifications([...notifications, ...response.data.data.data])
				} else {
					setCurrentPage(currentPage + 1)
					setNotifications([...notifications, ...response.data.data.data])
				}
			}
		} catch (e) {
			console.log(e)
		}
	}
	const handleFilterChange = async (event) => {
		if (event.target.value !== filter) {			
			setCurrentPage(1)
			setFilter(event.target.value)

			let params = {
				current_role: selectedRole,
				created_by: false,
				page: 1,					
				status: event.target.value.toLowerCase()
			}

			if(selectedRole === 'parent'){
				params = {
					...params,
					student_id: srmChild[srmSelectedChild].userDetails.id || null,
				}
			}

			try {

				const token = localStorage.getItem('srmToken')
				const selectedRole = localStorage.getItem('srmSelectedRole')
				const response = await NotificationService.fetchNotification(
					token,
					params,
					
				)
				if (response.status === 200) {
					if (
						response.data.data.last_page === response.data.data.current_page
					) {
						setHasMore(false)
						setNotifications([...response.data.data.data])
					} else {
						setCurrentPage(currentPage + 1)
						setNotifications([...response.data.data.data])
					}
				}
			} catch (e) {
				console.log(e)
			}
		}
	}

	const handleRemoveNotifcation = (id) => {
		setNotifications([
			...notifications.filter((notification) => notification.id !== id),
		])
	}

	content = notifications.map((notification) => (
		<NotificationCard
			key={notification.id}
			notification={notification}
			handleRemoveNotifcation={handleRemoveNotifcation}
		/>
	))

	return (
		<div className={classes.sectionContainer} id='scrollable'>
			<div className={classes.filterHeader}>
				<FormControl className={classes.formControl}>
					<Select
						labelId='Filter'
						id='demo-simple-select'
						value={filter}
						onChange={handleFilterChange}
						className={classes.selectFiler}
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
						<MenuItem value={'All'}>All</MenuItem>
						<MenuItem value={'Archive'}>Archived</MenuItem>
						<MenuItem value={'Read'}>Read</MenuItem>
						<MenuItem value={'Unread'}>Unread</MenuItem>
					</Select>
				</FormControl>
			</div>

			<Box className={classes.cardBoxPadding}>
				<InfiniteScroll
					dataLength={notifications.length}
					next={fetchNotifcationOnScroll}
					hasMore={hasMore}
					loader={
						<>
							<div className={classes.loading}>
								<CircularProgress color='primary' size={30} />
							</div>
							<br />
						</>
					}
					scrollableTarget='scrollable'
					scrollThreshold={0.2}
					className={classes.infiniteContainer}
				>
					{loading ? (
						<>
							<br />
							<div className={classes.loading}>
								<CircularProgress color='primary' size={30} />
							</div>
							<br />
						</>
					) : null}
					{!loading && !notifications.length ? (
						<div className={classes.emptyView}>
							<Typography>No notifications available</Typography>
						</div>
					) : null}
					{content}
				</InfiniteScroll>
			</Box>
			<br />
			<br />
			<br />
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		selectedRole: state.auth.selectedRole,
		token: state.auth.token,
	}
}

export default connect(mapStateToProps)(ParentNotification)
