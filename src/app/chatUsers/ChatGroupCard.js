import React from 'react'
import { useHistory } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import * as moment from 'moment'
import { Typography, makeStyles, Grid } from '@material-ui/core'
import EditIcon from '../../assets/images/Edit.svg'

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
}))

const ChatGroupCard = (props) => {
	const classes = useStyles()
	const history = useHistory()

	const handleEdit = () => {
		history.push(`/create-notification/${props.notification.id}`)
	}
	return (
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
								<span
									className={`${classes.titleIconSpan} ${classes.editIconSpan}`}
								>
									<img
										src={EditIcon}
										className={`${classes.titleIcon}`}
										onClick={handleEdit}
									/>
								</span>
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
								history.push(`/notifications/${props.notification.id}?cby=true`)
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
	)
}

export default ChatGroupCard
