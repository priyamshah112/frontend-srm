import React, { useState } from 'react'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import BackIcon from '../../../assets/images/Back.svg'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import { useHistory, useParams } from 'react-router-dom'
import EventIcon from '@material-ui/icons/Event'
import InputAdornment from '@material-ui/core/InputAdornment'
import DateFnsUtils from '@date-io/date-fns'
import { IconButton } from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { withStyles } from '@material-ui/core/styles'

const useStyle = makeStyles((theme) => ({
	formStyle: {
		margin: 'auto',
		width: '95%',
		backgroundColor: 'white',
		justifyContent: 'center',
		textAlign: 'left',
		marginBottom: '90px',
		borderRadius: '5px',
	},
	formDiv: {
		height: '100vh',
		overflow: 'auto',
	},
	margin: {
		marginTop: '30px',
		[theme.breakpoints.down('xs')]: {
			marginTop: '10px',
		},
		'& .publishBtn': {
			borderRadius: '3px',
			width: 'inherit',
			margin: 0,
			[theme.breakpoints.down('xs')]: {
				marginTop: '10px',
				marginRight: 0,
				width: '100%',
			},
		},
		'& .publishLaterBtn': {
			backgroundColor: `${theme.palette.common.white}`,
			border: `1px solid ${theme.palette.common.adornment}`,
			marginRight: '5px',
		},
	},
	sideMargins: {
		marginLeft: '20px',
		marginRight: '20px',
	},
	backImg: {
		float: 'left',
		// transform: 'translateY(7px)',
		cursor: 'pointer',
		position: 'absolute',
		left: '20px',
	},
	themeColor: {
		color: `${theme.palette.common.deluge}`,
		padding: 0,
		margin: 0,
		fontFamily: 'Avenir',
		fontSize: 14,
	},
	titleText: {
		fontFamily: 'Avenir Medium',
		fontize: '1.2rem',
		color: '#1C1C1E',
	},
	inputBorder: {
		height: '50px',
	},
	fieldStyle: {
		width: '100%',
		margin: 'auto',
		fontFamily: 'Avenir Book',
		fontSize: ' 1rem',
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
	datePicker: {
		width: '100%',
		[theme.breakpoints.down('xs')]: {
			width: '100%',
		},
	},
	textAlignLeft: {
		textAlign: 'left',
		color: 'rgba(0, 0, 0, 0.54)',
	},
	textArea: {
		width: '100%',
	},
	radioBtn: {
		display: 'flex',
		flexDirection: 'row',
		fontFamily: 'Avenir',
		fontSize: 14,
	},
	headingDiv: {
		margin: '20px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	publishBtns: {
		textAlign: 'right',
		justifyContent: 'right',
	},
}))

const GreenRadio = withStyles({
	root: {
		'&$checked': {
			color: '#7B72AF',
		},
	},
	checked: {},
})((props) => <Radio color='default' {...props} />)

// eslint-disable-next-line import/no-anonymous-default-export
export default function NewDiaryEntry() {
	const classes = useStyle()
	const [checkbox, setCheckbox] = useState(true)
	const [title, setTitle] = useState('')
	const [eventDate, setEventDate] = useState(null)
	const [description, setDescription] = useState('')
	const [value, setValue] = useState('general diary')

	const submitForm = async (event) => {
		event.preventDefault()
	}

	const handleCheckboxChange = (event) => {
		setCheckbox(event.target.checked)
	}
	const handleChangeTitle = (event) => {
		setTitle(event.target.value)
	}
	const handleEventDate = (date) => {
		setEventDate(date)
	}
	const handleDescription = (e) => {
		setDescription(e.target.value)
		console.log('description', e.target.value)
	}
	const handleRadioChange = (e) => {
		setValue(e.target.value)
	}

	return (
		<div className={classes.formDiv}>
			<div className={classes.headingDiv}>
				<img
					src={BackIcon}
					alt='Back'
					className={classes.backImg}
					onClick={() => {
						// saveDetails()
						// history.push('/news')
					}}
				/>
				<Typography
					variant='h5'
					className={`${classes.themeColor} ${classes.titleText}`}
				>
					Create New Diary Entry
				</Typography>
			</div>
			<form className={classes.formStyle} onSubmit={submitForm}>
				{
					// {errMessage ? (
					// 	<Box className={classes.margin} pt={2}>
					// 		<div>
					// 			<Typography className={`${classes.errorColor}`}>
					// 				{errMessage}
					// 			</Typography>
					// 		</div>
					// 	</Box>
					// ) : (
					// 	''
					// )}
				}
				<Box className={`${classes.margin} ${classes.sideMargins}`}>
					<FormControl className={classes.fieldStyle}>
						<TextField
							label='Title'
							id='title'
							name='title'
							className={classes.inputBorder}
							value={title}
							onChange={handleChangeTitle}
							required={true}
						/>
					</FormControl>
				</Box>
				<Box className={`${classes.margin} ${classes.sideMargins}`}>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<Grid container className={classes.fieldStyle}>
							<Grid item xs={12}>
								<DatePicker
									id='eventDate'
									label='Date'
									variant='dialog'
									minDate={new Date()}
									format='MM/dd/yyyy'
									value={eventDate}
									onChange={handleEventDate}
									InputProps={{
										endAdornment: (
											<InputAdornment position='end'>
												<IconButton>
													<EventIcon />
												</IconButton>
											</InputAdornment>
										),
									}}
									className={classes.datePicker}
								/>
							</Grid>
						</Grid>
					</MuiPickersUtilsProvider>
				</Box>
				<Box className={`${classes.margin} ${classes.sideMargins}`}>
					<Grid className={classes.fieldStyle}>
						<FormControl component='fieldset'>
							<RadioGroup
								aria-label='radio'
								name='radio1'
								// className={classes.radioBtn}
								value={value}
								style={{
									display: 'flex',
									flexDirection: 'row',
									textAlign: 'left',
									fontFamily: 'Avenir',
									fontSize: 14,
								}}
								onChange={handleRadioChange}
							>
								<FormControlLabel
									value='general diary'
									control={<GreenRadio />}
									label='General Diary'
								/>

								<FormControlLabel
									value='teacher observation'
									control={<GreenRadio />}
									label='Teacher'
								/>

								<FormControlLabel
									value='late coming'
									control={<GreenRadio />}
									label='Late Coming'
								/>
							</RadioGroup>
						</FormControl>
					</Grid>
				</Box>
				<Box className={`${classes.margin} ${classes.sideMargins}`}>
					<Grid className={classes.fieldStyle}>
						<Typography className={classes.textAlignLeft}>
							Description
						</Typography>
						<TextField
							className={classes.textArea}
							id='outlined-multiline-static'
							label=''
							multiline
							rows={5}
							placeholder='Description'
							value={description}
							onChange={handleDescription}
							variant='outlined'
						/>
					</Grid>
				</Box>
				<Box className={`${classes.margin} ${classes.sideMargins}`}>
					<Grid container className={classes.fieldStyle} direction='row'>
						<Grid item sm={10} xs={12} className={classes.textAlignLeft}>
							<FormGroup>
								<FormControlLabel
									style={{
										marginLeft: '-9px',
										marginRight: '-11px',
										flexDirection: 'row',
									}}
									value='acknowledgement required'
									control={<Checkbox checked={checkbox} color='primary' />}
									label='Acknowledgement Required'
									labelPlacement='start'
									onChange={handleCheckboxChange}
								/>
							</FormGroup>
						</Grid>
						<Grid item sm={2} xs={12} className={classes.publishBtns}>
							<Button
								id='publishBtn'
								variant='contained'
								className={`${classes.fieldStyle} ${'publishBtn'}`}
								color='primary'
								type='submit'
								disableElevation
							>
								Save
							</Button>
						</Grid>
						<br />
						<br />
						<br />
					</Grid>
				</Box>
			</form>
		</div>
	)
}
