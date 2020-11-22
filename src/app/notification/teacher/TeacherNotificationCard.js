import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import * as moment from 'moment'
import {
	IconButton,
	Typography,
	makeStyles,
	Grid,
	Button,
} from '@material-ui/core'
import EditIcon from '../../../assets/images/Edit.svg'
import DoneIcon from '../../../assets/images/notifications/Done.svg'
import WarningIcon from '../../../assets/images/notifications/Warning.svg'
// import DeleteIcon from '../../../assets/images/Delete.svg';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'

import NotificationService from '../NotificationService'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'

const useStyles = makeStyles((theme) => ({
	card: {
		boxShadow: 'none',
		background: '#FFFFFF 0% 0% no-repeat padding-box',
		borderRadius: '10px',
		marginTop: '10px',
	},

	cardHeader: {
		padding: '15px 15px 0 15px',
	},
	iconButtonRoot: {
		padding: '8px',
	},
	titleIconSpan: {
		marginRight: '8px',
	},
	editIconSpan: {
		paddingLeft: '10px',
		cursor: 'pointer',
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
		padding: '10px 15px 20px 15px',
		'&:last-child': {
			paddingBottom: '20px',
		},
	},
	menuItem: {
		paddingLeft: '10px',
		paddingRight: '10px',
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
	dateStyle: {
		paddingTop: '5px',
	},
	contentStatus: {
		color: `${theme.palette.common.lightFont}`,
		fontSize: '14px',
		fontStyle: 'normal',
		marginRight: '',
	},
	readClass: {
		textAlign: 'right',
	},
	payBtn: {
		width: '113px',
		height: '36px',
	},
	deleteBtn: {
		// width: '10px',
		// height: '10px',
		// paddingLeft: '5px',
		// paddingTop:"-10px",
		// transform: 'translateY(4px)',
		cursor: 'pointer',
		// transform: "translateY(-30px)",
		// transform: "translateX(40px)",
		transform: 'translateY(5px)',
	},
}))

const TeacherNotificationCard = (props) => {
	const classes = useStyles()
	const history = useHistory()
	const [anchorEl, setAnchorEl] = useState(null)
	const [open, setOpen] = React.useState(false)

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleCloseNO = () => {
		setOpen(false)
	}
	const handleCloseYES = () => {
		handledeletenotif()
		setOpen(false)
	}
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}
	const handleEdit = () => {
		history.push(`/create-notification/${props.notification.id}`)
	}
	const handledeletenotif = async () => {
		const token = localStorage.getItem('srmToken')
		try {
			// console.log(props.notification.id,token);
			const response = await NotificationService.deleteNotification(
				props.notification.id,
				token
			)
			console.log(response)
			if (response.status === 200) {
				console.log('Successfully Deleted')
				// props.deleteHomework(id);
				window.location.reload()
			} else {
				console.log('Failed to delete')
			}
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<>
			<Dialog
				open={open}
				onClose={handleCloseNO}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>
					{'Are you sure you want to delete?'}
				</DialogTitle>
				<DialogActions>
					<Button onClick={handleCloseNO} color='primary' autoFocus>
						NO
					</Button>
					<Button onClick={handleCloseYES} color='primary'>
						YES
					</Button>
				</DialogActions>
			</Dialog>

			<Card className={classes.card}>
				<CardHeader
					className={classes.cardHeader}
					action={
						<>
							<Typography
								className={`${classes.contentStyle} ${classes.dateStyle}`}
							>
								{moment(props.notification.created_at).format('DD MMM, hh.mma')}
								{props.notification.notify_status !== 'published' ? (
									<>
										<span
											className={`${classes.titleIconSpan} ${classes.editIconSpan}`}
										>
											<img
												src={EditIcon}
												className={`${classes.titleIcon}`}
												onClick={handleEdit}
											/>
										</span>

										<span
											// onClick={()=>handledeletenotif(props.notification.id)}
											onClick={handleClickOpen}
										>
											<DeleteOutlineOutlinedIcon
												fontSize={'small'}
												className={` ${classes.deleteBtn}`}
											/>
										</span>
										{/* <img
                    src={DeleteOutlineOutlinedIcon}
                    className={`${classes.deleteBtn}`}
                    onClick={()=>handledeletenotif(props.notification.id)}
                  /> */}
									</>
								) : (
									''
								)}
							</Typography>
						</>
					}
					title={
						<>
							<Typography
								className={classes.cardTitle}
								onClick={() =>
									history.push(
										`/notifications/${props.notification.id}?cby=true`
									)
								}
							>
								{props.notification.data
									? props.notification.data.title
										? props.notification.data.title
										: 'N/A'
									: 'N/A'}
							</Typography>
						</>
					}
				/>
				<CardContent classes={{ root: classes.cardContent }}>
					<Grid container>
						<Grid item xs={10}>
							<Typography className={classes.contentStyle}>
								{props.notification.data
									? props.notification.data.summary
										? props.notification.data.summary
										: 'N/A'
									: 'N/A'}
							</Typography>
						</Grid>
						<Grid item xs={2} className={classes.readClass}>
							<Typography className={classes.contentStyle}>
								{`${props.notification.notify_status}`.toUpperCase()}
							</Typography>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</>
	)
}

export default TeacherNotificationCard
