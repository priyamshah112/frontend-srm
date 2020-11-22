import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import { DialogTitle, Typography } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(() => ({
	dateTimeContainer: {
		minWidth: '200px',

		'& .MuiInput-underline:before': {
			borderBottom: '2px solid #eaeaea',
		},
		'& .MuiInput-underline:hover:not(.Mui-disabled):before': {
			borderBottom: '2px solid #7B72AF',
			transitionProperty: 'border-bottom-color',
			transitionDuration: '500ms',
			transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
		},
	},
	success: {
		color: 'green',
	},
	dialogActionsContainer: {
		'&.MuiDialogActions-root': {
			justifyContent: 'center',
			textAlign: 'center',
			marginBottom: '10px',
			display: 'block',
		},
	},
	button: {
		minWidth: '80px',
		textTransform: 'none',
	},
}))

const SuccessDialog = (props) => {
	const classes = useStyles()
	const { open, msg, ...other } = props
	const history = useHistory()
	const handleSubmit = (event) => {
		history.push('/')
	}

	return (
		<>
			<Dialog open={open} maxWidth={'sm'} fullWidth={false}>
				<DialogTitle id='customized-dialog-title'>Message</DialogTitle>
				<DialogContent dividers>
					<Typography className={classes.success}>{msg}</Typography>
				</DialogContent>
				<DialogActions classes={{ root: classes.dialogActionsContainer }}>
					<Button
						color='primary'
						autoFocus
						variant='contained'
						className={classes.button}
						onClick={handleSubmit}
						disableElevation
					>
						Go to Login Page
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default SuccessDialog
