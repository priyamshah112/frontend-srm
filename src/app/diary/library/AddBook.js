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
import EventIcon from '@material-ui/icons/Event'
import InputAdornment from '@material-ui/core/InputAdornment'
import DateFnsUtils from '@date-io/date-fns'
import { IconButton } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

const useStyle = makeStyles((theme) => ({
	formStyle: {
		margin: 'auto',
		width: '95%',
		backgroundColor: 'white',
		justifyContent: 'center',
		textAlign: 'left',
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
		border: '1px solid rgb(200,200,200',
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

export default function AddBook(props) {
	const classes = useStyle()
	const [title, setTitle] = useState('')
	const [fromDate, setFromDate] = useState(null)
	const [endDate, setEndDate] = useState(null)

	const submitForm = async (event) => {
		event.preventDefault()
	}
	const handleChangeTitle = (event) => {
		setTitle(event.target.value)
	}
	const handleFromDate = (date) => {
		setFromDate(date)
	}
	const handleEndDate = (date) => {
		setEndDate(date)
	}

	const onClose = () => {
		props.setOpen(false)
	}

	return (
		<div className={classes.formDiv}>
			<div
				className={classes.headingDiv}
				style={{
					margin: '20px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<img
					src={BackIcon}
					alt='Back'
					className={classes.backImg}
					onClick={() => {
						props.close()
						// saveDetails()
						// history.push('/news')
					}}
				/>
				<Typography
					variant='h5'
					className={`${classes.themeColor} ${classes.titleText}`}
				>
					Add New Book
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
							label='Book Name'
							id='bookName'
							name='book-name'
							className={classes.inputBorder}
							value={title}
							onChange={handleChangeTitle}
							required={true}
							InputProps={{
								endAdornment: (
									<InputAdornment position='end'>
										<IconButton>
											<SearchIcon fontSize='small' />
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
					</FormControl>
				</Box>
				<Box className={`${classes.margin} ${classes.sideMargins}`}>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<Grid container className={classes.fieldStyle}>
							<Grid item xs={12}>
								<DatePicker
									id='fromDate'
									label='From Date'
									variant='dialog'
									minDate={new Date()}
									format='MM/dd/yyyy'
									value={fromDate}
									onChange={handleFromDate}
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
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<Grid container className={classes.fieldStyle}>
							<Grid item xs={12}>
								<DatePicker
									id='endDate'
									label='End Date'
									variant='dialog'
									minDate={new Date()}
									format='MM/dd/yyyy'
									value={endDate}
									onChange={handleEndDate}
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
					<Grid
						container
						className={classes.fieldStyle}
						direction='row-reverse'
					>
						<Grid item sm={2} xs={12} className={classes.publishBtns}>
							<Button
								id='publishBtn'
								variant='contained'
								className={`${classes.fieldStyle} ${'publishBtn'}`}
								color='primary'
								type='submit'
								disableElevation
							>
								Add
							</Button>
						</Grid>
						<Grid item sm={10} xs={12} className={classes.textAlignLeft}></Grid>
						<br />
						<br />
						<br />
					</Grid>
				</Box>
			</form>
		</div>
	)
}
