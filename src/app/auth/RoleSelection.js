import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActionArea from '@material-ui/core/CardActionArea'
import { makeStyles } from '@material-ui/core/styles'
import ParentText from '../../assets/images/login/parentText.svg'
import TeacherText from '../../assets/images/login/teacherText.svg'
import AdminText from '../../assets/images/login/AdminText.svg'
import TeacherImg from '../../assets/images/login/Teacher.svg'
import ParentImg from '../../assets/images/login/Parent.svg'
import AdminImg from '../../assets/images/login/Admin.svg'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import * as actions from './store/actions'

const useStyles = makeStyles((theme) => ({
	mainContent: { width: '100%', justifyContent: 'center', display: 'flex' },
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

const RoleSelection = (props) => {
	const classes = useStyles()
	const { open, handleClose } = props

	const definedRoles = [
		{
			roleName: 'teacher',
			roleDisplayText: 'TEACHER',
			maleImageSrc: '',
			femaleImageSrc: TeacherImg,
			textBackgroundSrc: TeacherText,
		},
		{
			roleName: 'parent',
			roleDisplayText: 'PARENT',
			maleImageSrc: '',
			femaleImageSrc: ParentImg,
			textBackgroundSrc: ParentText,
		},
		{
			roleName: 'admin',
			roleDisplayText: 'ADMIN',
			maleImageSrc: '',
			femaleImageSrc: AdminImg,
			textBackgroundSrc: AdminText,
		},
	]

	const renderContent = (
		<div className={classes.roleContainer}>
			<div>
				<Typography>LOGO</Typography>
			</div>
			<div style={{ marginTop: '48px' }}>
				<Typography className={classes.roleSelectionHeading}>
					WHO ARE YOU?
				</Typography>
			</div>
			<div className={classes.cardContainer}>
				{props.userInfo.roles.map((role) => {
					let userRole = definedRoles.find((x) => x.roleName === role.name)
					console.log('Name of user Role', userRole, userRole.roleName)
					return (
						<div key={role.name}>
							<Card className={classes.card}>
								<CardActionArea
									onClick={() => props.onRoleSelection(role.name)}
								>
									<CardContent classes={{ root: classes.cardContentRoot }}>
										<div className={classes.cardContent}>
											<div>
												<img
													src={`${userRole.femaleImageSrc}`}
													alt='Teacher'
													className={classes.avatar}
												/>
											</div>
											<div
												className={classes.avatarTextContainer}
												style={{
													backgroundImage: `url(${userRole.textBackgroundSrc})`,
												}}
											>
												<Typography className={classes.avatarText}>
													{userRole.roleDisplayText}
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
		<Dialog open={open} onClose={handleClose} maxWidth={'xs'} fullWidth={false}>
			<DialogContent>
				<div>
					<div
						className={classes.mainContent}
						style={{ width: '100%', justifyContent: 'center', display: 'flex' }}
					>
						{renderContent}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}

const mapStateToProps = (state) => {
	return {
		userInfo: state.auth.userInfo,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onRoleSelection: (role) => dispatch(actions.authRoleSelection(role)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(RoleSelection)
