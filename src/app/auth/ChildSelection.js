import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActionArea from '@material-ui/core/CardActionArea'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'

const useStyles = makeStyles((theme) => ({
	mainContent: { width: '100%', justifyContent: 'center', display: 'flex' },
	div: { marginTop: '48px' },
	avatar: {
		width: '95px',
		height: '98px',
		[theme.breakpoints.down('md')]: {
			width: '65px',
			height: '68px',
		},
		[theme.breakpoints.down('sm')]: {
			height: '67px',
		},
	},

	cardContainer: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
		marginTop: '20px',
		width: '100%',

		'& div': {
			margin: '5px',
		},
	},
	roleContainer: {
		textAlign: 'center',
	},

	card: {
		backgroundColor: theme.palette.roleCards.roleCardUnselected,
		'&:hover': {
			backgroundColor: theme.palette.roleCards.roleCardSelected,
		},
	},
	media: {
		marginTop: '5px',
	},
	cardContent: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
		flexDirection: 'column',
	},
	cardContentRoot: {
		'&.MuiCardContent-root': {
			padding: 0,
			height: '180px',
			width: '147px',
		},
		[theme.breakpoints.down('md')]: {
			'&.MuiCardContent-root': {
				padding: 0,
				height: '120px',
				width: '87px',
			},
		},
		[theme.breakpoints.down('sm')]: {
			'&.MuiCardContent-root': {
				padding: 0,
				height: '120px',
				width: '87px',
			},
		},
	},
	roleSelectionHeading: {
		fontWeight: 900,
		color: theme.palette.common.deluge,
		fontSize: '1.375rem',
		[theme.breakpoints.down('md')]: {
			fontSize: '1rem',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '0.85rem',
		},
	},
	avatarTextContainer: {
		height: '67px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		[theme.breakpoints.down('md')]: {
			height: '27px',
		},
		[theme.breakpoints.down('sm')]: {
			height: '27px',
		},
	},
	avatarText: {
		fontWeight: 500,
		fontStyle: 'italic',
		fontSize: '1.375rem',
		color: theme.palette.common.deluge,
		[theme.breakpoints.down('md')]: {
			fontSize: '1rem',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '0.85rem',
		},
	},
}))

const ChildSelection = (props) => {
	const classes = useStyles()
	const { open, handleClose } = props

	const renderContent = (
		<div className={classes.roleContainer}>
			<div>
				<Typography>LOGO</Typography>
			</div>
			<div className={classes.div}>
				<Typography className={classes.roleSelectionHeading}>
					Which child do you want to select?
				</Typography>
			</div>
			<div className={classes.cardContainer}>
				{props.data.map((child) => {
					return (
						<div key={child.userDetails.username}>
							<Card className={classes.card}>
								<CardActionArea onClick={() => props.change_child(child)}>
									<CardContent classes={{ root: classes.cardContentRoot }}>
										<div className={classes.cardContent}>
											<div>
												<img
													src={`${child.userDetails.thumbnail}`}
													alt={`${child.userDetails.firstname}`}
													className={classes.avatar}
												/>
											</div>
											<div className={classes.avatarTextContainer}>
												<Typography className={classes.avatarText}>
													{child.userDetails.firstname}
												</Typography>
											</div>
										</div>
									</CardContent>
								</CardActionArea>
							</Card>
						</div>
					)
				})}
			</div>
		</div>
	)

	return (
		<Dialog
			open={open}
			onClose={() => handleClose(false)}
			maxWidth={'xs'}
			fullWidth={false}
		>
			<DialogContent>
				<div>
					<div className={classes.mainContent}>{renderContent}</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}

const mapStateToProps = (state) => {
	return {}
}

const mapDispatchToProps = (dispatch) => {
	return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ChildSelection)
