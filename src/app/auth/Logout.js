import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import Typography from '@material-ui/core/Typography'
import * as actions from './store/actions'

const useStyles = makeStyles(() => ({
	logoutContainer: {
		minWidth: '200px',
	},
	dialogActionsContainer: {
		'&.MuiDialogActions-root': {
			justifyContent: 'center',
			marginBottom: '10px',
		},
	},
	button: {
		minWidth: '80px',
		textTransform: 'none',
	},
	confirmationText: {
		fontWeight: 500,
		fontSize: '1rem',
		color: '#000000',
	},
	dialogContent: {
		textAlign: 'center',
	},
}))

const Logout = (props) => {
	const classes = useStyles()
	const { onLogout, open, handleClose } = props

	const handleLogout = () => {
		onLogout(props.isAuthenticated)
	}

	return (
		<>
			<Dialog
				open={open}
				onClose={handleClose}
				maxWidth={'sm'}
				fullWidth={false}
			>
				<DialogContent>
					<div className={classes.logoutContainer}>
						<div className={classes.dialogContent}>
							<ExitToAppIcon color='primary' />
						</div>
						<div className={classes.dialogContent}>
							<Typography className={classes.confirmationText}>
								Want to logout?
							</Typography>
						</div>
					</div>
				</DialogContent>
				<DialogActions classes={{ root: classes.dialogActionsContainer }}>
					<Button
						onClick={handleClose}
						color='primary'
						variant='outlined'
						className={classes.button}
					>
						No
					</Button>
					<Button
						onClick={handleLogout}
						color='primary'
						autoFocus
						variant='contained'
						className={classes.button}
					>
						Yes
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.token !== null,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onLogout: (isAuthenticated) => dispatch(actions.logout(isAuthenticated)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)
