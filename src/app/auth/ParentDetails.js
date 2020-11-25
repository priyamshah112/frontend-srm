import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import {
	DialogTitle,
	FormControl,
	FormLabel,
	RadioGroup,
	FormControlLabel,
	Radio,
} from '@material-ui/core'

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
	dialogActionsContainer: {
		'&.MuiDialogActions-root': {
			justifyContent: 'right',
			textAlign: 'right',
			marginBottom: '10px',
			display: 'block',
		},
	},
	button: {
		minWidth: '80px',
		textTransform: 'none',
	},
}))

const ParentDetails = (props) => {
	const classes = useStyles()
	const {
		user,
		parentContacts,
		open,
		setSelectedParentContact,
		handleClose,
		...other
	} = props
	const [radioValue, setValue] = useState('')
	const [isDisable, setDisable] = useState(true)

	const handleSubmit = () => {
		setSelectedParentContact(radioValue)
		handleClose()
	}

	const handleChange = (event) => {
		setValue(event.target.value)
		setDisable(false)
	}

	return (
		<>
			<Dialog
				open={open}
				onClose={handleClose}
				maxWidth={'sm'}
				fullWidth={true}
			>
				<DialogTitle id='customized-dialog-title' onClose={handleClose}>
					User ID: {user}
				</DialogTitle>
				<DialogContent dividers>
					<FormControl component='fieldset'>
						<FormLabel component='legend'>Select contact to send OTP</FormLabel>
						<RadioGroup
							aria-label='contact'
							name='contact'
							value={radioValue}
							onChange={handleChange}
						>
							{parentContacts.map((contact, index) => {
								return (
									<FormControlLabel
										key={index}
										value={contact}
										control={<Radio color='primary' />}
										label={contact}
									/>
								)
							})}
						</RadioGroup>
					</FormControl>
				</DialogContent>
				<DialogActions classes={{ root: classes.dialogActionsContainer }}>
					<Button
						color='primary'
						variant='outlined'
						onClick={handleClose}
						className={classes.button}
						disableElevation
					>
						Cancel
					</Button>
					<Button
						color='primary'
						autoFocus
						variant='contained'
						className={classes.button}
						disabled={isDisable}
						onClick={handleSubmit}
						disableElevation
					>
						Send
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default ParentDetails
