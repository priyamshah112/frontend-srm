import React, { useState } from 'react'
import 'date-fns'
import { makeStyles } from '@material-ui/styles'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Grid from '@material-ui/core/Grid'
import DateFnsUtils from '@date-io/date-fns'
import {
	MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import { CircularProgress, IconButton, InputAdornment } from '@material-ui/core'
import PublishIcon from '@material-ui/icons/Publish'
import { connect } from 'react-redux'

const useStyles = makeStyles((theme) => ({
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
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	span: {
		fontFamily: 'Avenir medium',
		fontSize: 14,
	},
}))

const PublishBtn = (props) => {
	const { loading } = props
	const class_id = props.class_id
	const classes = useStyles()

	console.log('class_id', class_id)

	const handleSuccess = () => {
		// SnackBarRef.open('', true, 'Week Timetable saved successfully')
		props.close()
	}

	const handlePublish = () => {
		props.handlePublishNow()
	}

	return (
		<>
			<Dialog
				open={props.open}
				onClose={props.close}
				maxWidth={'sm'}
				fullWidth={false}
			>
				<DialogContent>
					<div className={classes.dateTimeContainer}>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<Grid
								className={classes.dialogContent}
								container
								justify='space-around'
							>
								{/* <span>
									<IconButton>
										<PublishIcon fontSize='large' />
									</IconButton>
								</span> */}
								<span className={classes.span}>Publish Now?</span>
							</Grid>
						</MuiPickersUtilsProvider>
					</div>
				</DialogContent>
				<DialogActions classes={{ root: classes.dialogActionsContainer }}>
					<Button
						color='primary'
						variant='outlined'
						onClick={props.close}
						className={classes.button}
					>
						Cancel
					</Button>
					<Button
						color='primary'
						autoFocus
						variant='contained'
						className={classes.button}
						onClick={handlePublish}
					>
						Publish
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

const mapStateToProps = ({ Attendence }) => {
	const {
		
	} = Attendence
	return {
		
	}
}

export default connect(mapStateToProps, {
	
})(PublishBtn)
