import React, { useState } from 'react'
import useStyles from '../styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Grid from '@material-ui/core/Grid'
import DateFnsUtils from '@date-io/date-fns'
import {
	MuiPickersUtilsProvider,	DateTimePicker,
} from '@material-ui/pickers'
import { IconButton, InputAdornment } from '@material-ui/core'
import EventIcon from '@material-ui/icons/Event'

const PublishLaterButton = (props) => {
	const classes = useStyles()
	const { publishDate, handlePublishDate,handlePublishLater,validation,disabled } = props
	const [open, setOpen] = useState(false)

	const handleSubmitDate = () => {
		handlePublishLater()
		handleClose()
	}

	const handleOpen = () =>{
		if(validation()){
			setOpen(true)
		}
	}
	const handleClose = () =>{
		setOpen(false)
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
					<div className={classes.dateTimeContainer}>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<Grid container justify='space-around'>
								<DateTimePicker
									variant='dialog'
									value={publishDate}
									onChange={(dateTime) => {
										handlePublishDate(dateTime.toISOString())
									}}
									label='Publish Date and Time '
									minDate={new Date()}
									format='yyyy/MM/dd hh:mm a'
									InputProps={{
										endAdornment: (
											<InputAdornment position='end'>
												<IconButton>
													<EventIcon />
												</IconButton>
											</InputAdornment>
										)
									}}
									classes={{ root : classes.toolbar}}
								/>
							</Grid>
						</MuiPickersUtilsProvider>
					</div>
				</DialogContent>
				<DialogActions classes={{ root: classes.dialogActionsContainer }}>
					<Button
						color='primary'
						variant='outlined'
						onClick={handleClose}
						className={classes.button}
					>
						Cancel
					</Button>
					<Button
						color='primary'
						autoFocus
						variant='contained'
						className={classes.button}
						onClick={handleSubmitDate}
					>
						Publish
					</Button>
				</DialogActions>
			</Dialog>
			<Button
				id='publishLaterBtn'
				variant='contained'
				onClick={handleOpen}
				className={`${classes.publishBtn} ${classes.publishLaterBtn}`}
				disableElevation
				disabled={ disabled ? disabled : false}
			>
				Publish Later
			</Button>
		</>
	)
}

export default PublishLaterButton
