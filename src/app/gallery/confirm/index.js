import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(() => ({
	popContainer: {
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

const Confirm = (props) => {
	const classes = useStyles()
	const { open, handleClose, onhandleDeleteFolder } = props

	return (
		<>
			<Dialog
				open={open}
				onClose={handleClose}
				maxWidth={'sm'}
				fullWidth={false}
			>
				<DialogContent>
					<div className={classes.popContainer}>
						<div className={classes.dialogContent}>
							<Typography className={classes.confirmationText}>
							Are you sure you want to delete?
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
						onClick={onhandleDeleteFolder}
						color='primary'
						autoFocus
						variant='contained'
						className={classes.button}						
						disableElevation
						disableRipple
					>
						Yes
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}


export default Confirm;
