import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { IconButton, Typography, makeStyles, Grid } from '@material-ui/core'
import { useTheme } from '@material-ui/styles'
import * as actions from './store/action'
import NotificationService from './NotificationService'
import ReadIcon from '../../assets/images/notifications/read.svg'
import UnReadIcon from '../../assets/images/notifications/unread.svg'
import { paths } from '../../Constants/Routes'

const useStyles = makeStyles((theme) => ({
	card: {
		boxShadow: 'none',
		background: '#FFFFFF 0% 0% no-repeat padding-box',
		borderRadius: '10px',
		marginTop: '10px',
		marginBottom: '10px',
	},
	cardHeader: {
		padding: '15px 20px 0 20px',
	},
	iconButtonRoot: {
		padding: '8px',
	},
	titleIconSpan: {
		marginRight: '8px',
	},
	titleIcon: {
		transform: 'translateY(3px)',
	},
	cardTitle: {
		fontSize: '16px',
		fontStyle: 'normal',
		fontWeight: 500,
		cursor: 'pointer',
		'&:hover': {
			textDecoration: 'underline',
		},
	},
	cardActions: {
		padding: '0 20px 20px 20px',
	},
	cardContent: {
		padding: '5px 20px 20px 20px',
		'&:last-child': {
			paddingBottom: '20px',
		},
	},
	menuItem: {
		paddingLeft: '10px',
		paddingRight: '10px',
		colour: '#1C1C1E',
	},
	borderBottomDiv: {
		width: '90%',
		height: '30px',
		margin: 'auto',
		marginTop: '5px',
		borderBottom: '1px solid #D1D1D6',
	},
	borderBottomLastDiv: {
		width: '90%',
		height: '30px',
		margin: 'auto',
		marginTop: '5px',
	},
	menuTopItemMargin: {
		marginTop: '5px',
	},
	menuItemRoot: {
		padding: 0,
	},
	menuContainer: {
		backgroundColor: theme.palette.common.darkGray,
		color: 'black',
		minWidth: '150px',
		'&.MuiPaper-rounded': {
			boxShadow: '0px 6px 6px #00000029',
		},
		[theme.breakpoints.down('md')]: {
			minWidth: '150px',
		},
		[theme.breakpoints.down('sm')]: {
			minWidth: '150px',
		},
	},
	menuList: {
		width: '100% !important',
		padding: 0,
	},
	contentStyle: {
		color: `${theme.palette.common.lightFont}`,
		fontSize: '14px',
		fontStyle: 'normal',
	},
	readClass: {
		textAlign: 'right',
	},
	payBtn: {
		width: '113px',
		height: '36px',
	},
}))

const NotificationCard = (props) => {
	const classes = useStyles()
	const theme = useTheme()
	const history = useHistory()
	const [anchorEl, setAnchorEl] = useState(null)
	const [status, setStatus] = useState(props.notification.status)

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = async (event) => {
		const updatedStatus = event.currentTarget.getAttribute('value')
		setAnchorEl(null)
		if(updatedStatus !== null){
			try {
				const token = localStorage.getItem('srmToken')
				const response = await NotificationService.updateStatus(
					props.notification.notify_status_id,
					updatedStatus,
					token
				)
	
				if (response.status === 200) {
					if (updatedStatus === 'read' && status !== 'read') {
						if (props.notificationCount !== 0) {
							props.subNotificationCount()
						}
						setStatus('read')
					} else if (updatedStatus === 'unread' && status !== 'unread') {
						props.addNotificationCount()
						setStatus('unread')
					} else if (updatedStatus === 'deleted' && status !== 'deleted') {
						if (props.notificationCount !== 0) {
							props.subNotificationCount()
						}
						props.handleRemoveNotifcation(props.notification.id)
						setStatus('deleted')
					} else if (updatedStatus === 'archive' && status !== 'archive') {
						if (props.notificationCount !== 0) {
							props.subNotificationCount()
						}
						props.handleRemoveNotifcation(props.notification.id)
						setStatus('archive')
					} else {
						console.log()
					}
					// code here
					props.changestatus_handeler('', true)
				}
			} catch (e) {
				console.log(e)
			}			
		}
	}

	const hanldeDetails = async () => {
		try {
			if (props.notification.status === 'unread') {
				const token = localStorage.getItem('srmToken')
				const response = await NotificationService.updateStatus(
					props.notification.notify_status_id,
					'read',
					token
				)
			}
			if (props.notificationCount !== 0) {
				props.subNotificationCount()
			}
			history.push(`${paths.NOTIFICATIONS}/${props.notification.id}`)
		} catch (e) {
			console.log(e)
		}
	}
	return (
		<Card className={classes.card}>
			<CardHeader
				className={classes.cardHeader}
				action={
					<>
						<IconButton
							aria-label='more'
							aria-controls='long-menu'
							aria-haspopup='true'
							onClick={handleClick}
							classes={{ root: classes.iconButtonRoot }}
						>
							<MoreVertIcon />
						</IconButton>
						<Menu
							id='long-menu'
							anchorEl={anchorEl}
							classes={{ paper: classes.menuContainer, list: classes.menuList }}
							elevation={0}
							keepMounted
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorEl)}
							onClose={handleClose}
						>
							<MenuItem
								onClick={handleClose}
								classes={{ root: classes.menuItemRoot }}
								disableGutters
								className={`${classes.menuItem} ${classes.menuTopItemMargin} `}
								value={'archive'}
							>
								<div className={classes.borderBottomDiv}>
									<Typography variant='body2'>Archive</Typography>
								</div>
							</MenuItem>
							<MenuItem
								onClick={handleClose}
								disableGutters
								classes={{ root: classes.menuItemRoot }}
								className={classes.menuItem}
								value={'deleted'}
							>
								<div className={classes.borderBottomDiv}>
									<Typography variant='body2'>Delete</Typography>
								</div>
							</MenuItem>
							<MenuItem
								onClick={handleClose}
								disableGutters
								classes={{ root: classes.menuItemRoot }}
								className={classes.menuItem}
								value={'read'}
							>
								<div className={classes.borderBottomDiv}>
									<Typography variant='body2'>Mark As Read</Typography>
								</div>
							</MenuItem>
							<MenuItem
								onClick={handleClose}
								disableGutters
								classes={{ root: classes.menuItemRoot }}
								className={classes.menuItem}
								value={'unread'}
							>
								<div className={classes.borderBottomLastDiv}>
									<Typography variant='body2'> Mark As Unread</Typography>
								</div>
							</MenuItem>
						</Menu>
					</>
				}
				title={
					<>
						{status === 'read' || status === 'archived' ? (
							<Typography
								className={classes.cardTitle}
								style={{ color: theme.palette.common.lightFont }}
								onClick={hanldeDetails}
							>
								{props.notification.data.title}
							</Typography>
						) : (
							<Typography className={classes.cardTitle} onClick={hanldeDetails}>
								{props.notification.data.title}
							</Typography>
						)}
					</>
				}
			/>
			<CardContent classes={{ root: classes.cardContent }}>
				<Grid container>
					<Grid item xs={11}>
						<Typography className={classes.contentStyle}>
							{props.notification.data.summary}
						</Typography>
					</Grid>
					<Grid item xs={1} className={classes.readClass}>
						{status === 'unread' ? (
							<img src={UnReadIcon} alt='unread' />
						) : status === 'read' ? (
							<img src={ReadIcon} alt='read' />
						) : (
							''
						)}
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	)
}
const mapStateToProps = (state) => {
	return {
		selectedRole: state.auth.selectedRole,
		token: state.auth.token,
		notificationCount: state.notification.notificationCount,
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		addNotificationCount: () => dispatch(actions.addNotificationCount()),
		subNotificationCount: () => dispatch(actions.subNotificationCount()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationCard)
