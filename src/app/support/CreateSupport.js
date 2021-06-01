import React, { useState, useEffect } from 'react'
import 'date-fns'
import { useHistory, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import InputLabel from '@material-ui/core/InputLabel'
import BackIcon from '../../assets/images/Back.svg'
import RichTextEditor from '../../shared/richTextEditor'
import SelectCategory from './components/selectCategory'
import { CircularProgress } from '@material-ui/core'
import Backdrop from '@material-ui/core/Backdrop'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import {
	getSingleSupport,
	postSupport,
	updateSupport,
} from '../redux/actions/support.action'

const useStyle = makeStyles((theme) => ({
	Formcontainer: {
		boxSizing: 'border-box',
		width: '100%',
		backgroundColor: theme.palette.mainBackground,
		height: '100%',
		padding: '20px',
		marginBottom: '100px',
		'&::-webkit-scrollbar': {
			width: 0,
		},
	},
	formStyle: {
		width: '100%',
		backgroundColor: 'white',
		borderRadius: '5px',
	},
	header:{
		padding: '20px',
		paddingBottom: '0px'		
	},
	backImg: {
		float: 'left',
		cursor: 'pointer',
	},
	adornmentColor: {
		color: 'rgba(0, 0, 0, 0.54)',
	},
	themeColor: {
		color: '#1C1C1E',
	},
	errorColor: {
		color: 'red',
	},
	titleText: {
		textAlign: 'center',	
		fontFamily: 'Avenir Medium',
		fontSize: '18px',
	},
	fieldStyle: {
		width: '100%',
		fontFamily: 'Avenir Book',
		fontSize: ' 1rem',
		boxSizing:'border-box',
		paddingTop: 10,
		paddingBottom: 10,
		paddingRight: 20,
		paddingLeft: 20,
		'& .publishBtn': {
			borderRadius: '3px',
			width: '120px',
			textTransform: 'none',
		},
		'& .MuiInputBase-root':{
			margin: '0px',
		},
		'& .MuiInput-underline:before': {
			borderBottom: '2px solid #eaeaea',
		},
		'& .MuiInput-underline:hover:not(.Mui-disabled):before': {
			borderBottom: '2px solid #7B72AF',
			transitionProperty: 'border-bottom-color',
			transitionDuration: '500ms',
			transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
		},
		'& .tox-tinymce':{
			height: '350px !important',
		}		
	},
	datePicker: {
		width: '100%',
	},

	textAlignLeft: {
		textAlign: 'left',
		color: 'rgba(0, 0, 0, 0.54)',
	},
	contentCenter: {
		justifyContent: 'center',
	},
	chips: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	chip: {
		margin: 2,
	},
	publishBtns: {
		width: '120px',
		textAlign: 'right',
		justifyContent: 'right',
	},
	margin: {
		
		'& .publishLaterBtn': {
			backgroundColor: `${theme.palette.common.white}`,
			border: `1px solid ${theme.palette.common.adornment}`,
			marginRight: '5px',
		},
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: `#fff`,
	},
	richTextEditor:{
		height: '350px',
	},
	width:{
		width: '100%',
	},
	formControl:{
		boxSizing: 'border-box',
		width: '100%',
		paddingTop: 5,
		paddingBottom: 5,
		paddingRight: 20,
		paddingLeft: 20,
	},
	description:{
		paddingTop: 12,
	}
}))

let saveDataApi

const CreateSupport = (props) => {
	const classes = useStyle()
	const history = useHistory()
	const { id } = useParams()

	// console.log('CreateSupport id', id)

	const [subject, setSubject] = useState('')
	const [description, setDescription] = useState('')
	const [errMessage, setError] = useState('')
	const [category, setCategory] = useState('')
	const [openSnackbar, setOpenSnackbar] = useState(false)
	const [snackbar, setSnackbar] = useState({})
	const [ticketId, setTicketId] = useState(id)

	useEffect(() => {
		if (id) {
			getData(id)
		}
	}, [])

	const getData = () => {
		props.getSingleSupport(id, onSupportData)
	}

	const onSupportData = (d = {}) => {
		const { data = {} } = d
		setSubject(data.subject || '')
		setDescription(data.description || '')
		setCategory(data.category_id || '')
	}

	useEffect(() => {
		setError('')
	}, [category, subject, description])

	const handleChangeInput = (event) => {
		const value = event.target.value
		setSubject(value)
	}

	const handleDescription = (id) => {
		setDescription(id)
	}

	const handleChangeCategory = (id) => {
		setCategory(id)
	}

	useEffect(() => {
		if (!ticketId && category) {
			saveDetails()
		}
	}, [category])

	const isValid = () => {
		if (!subject.trim()) {
			setError('Please Enter Valid Subject.')
			return false
		}
		if (!category) {
			setError('Please Select Category')
			return false
		}
		if (!description.trim()) {
			setError('Please Enter Description')
			return false
		}
		return true
	}

	// useEffect(() => {
	// 	saveDataApi = setInterval(() => {
	// 		saveDetails()
	// 	}, 10000)
	// 	return () => clearInterval(saveDataApi)
	// }, [subject, description, category])

	const saveDetails = (status, loading = false) => {
		const data = {
			subject: subject.trim(),
			category_id: category,
			description: description.trim(),
		}

		if (!category && props.postLoading) return

		if (status) {
			data.status = status
		}

		if (ticketId) {
			props.updateSupport(
				data,
				ticketId,
				(d) => onSuccess(d, loading),
				(err) => onFail(err, loading),
				loading
			)
		} else if (!ticketId && !props.postLoading) {
			props.postSupport(
				data,
				(d) => onSuccess(d, loading),
				(err) => onFail(err, loading),
				true
			)
		}
	}

	const submitForm = (event) => {
		event.preventDefault()

		if (!isValid()) {
			return
		}
		clearInterval(saveDataApi)
		saveDetails('submitted', true)
		console.log('Form Submitted')
	}

	const onSuccess = (d = {}, loading) => {
		const { data = {} } = d
		if (loading) {
			showSnackbar({ type: 'success', message: 'Support Ticket Submitted!' })
			goBack()
		} else if (!ticketId) {
			setTicketId(data.id)
		}
	}

	const onFail = (err = {}, loading) => {
		if (loading) showSnackbar({ message: err.message })
	}

	const showSnackbar = (d) => {
		setOpenSnackbar(true)
		setSnackbar(d)
	}

	const handleSnackbarClose = () => {
		setOpenSnackbar(false)
	}

	const goBack = () => {
		// saveDetails()
		history.replace('/support')
	}

	// console.log('CreateSupport render', { ticketId, id, props })

	return (
		<>
			<div className={classes.Formcontainer}>
				<form className={classes.formStyle} onSubmit={submitForm}>
					<div className={classes.header} pt={2}>
							<img
								src={BackIcon}
								alt='Back'
								className={classes.backImg}
								onClick={goBack}
							/>
							<Typography
								variant='h5'
								className={`${classes.themeColor} ${classes.titleText}`}
							>
								Create Ticket
							</Typography>
					</div>
					{errMessage ? (
						<Typography className={`${classes.errorColor}`}>
							{errMessage}
						</Typography>
					) : (
						''
					)}
					<FormControl 
						className={classes.formControl}
					>
						<TextField
							id='subject'
							name='subject'
							label='Subject'
							value={subject}
							onChange={handleChangeInput}
							required={true}
						/>
					</FormControl>
					<div className={classes.formControl}>
						<FormControl className={classes.width}>
							<InputLabel className={classes.textAlignLeft}>
								Categories
							</InputLabel>					
							<SelectCategory
								value={category}
								onChange={handleChangeCategory}
							/>
						</FormControl>
					</div>
					
					<Grid className={classes.fieldStyle}>
						<Typography className={`${classes.textAlignLeft}  ${classes.description}`}>
							Description
						</Typography>
						<RichTextEditor
							handleDescription={handleDescription}
							value={description}
							token={props.token}
							style={{'height': '350px'}}
						/>
					</Grid>
					<Grid
						container
						className={classes.fieldStyle}
						direction='row-reverse'
					>
						<Grid item sm={8} xs={12} className={classes.publishBtns}>
							<Button
								id='publishBtn'
								variant='contained'
								className={`${classes.fieldStyle} ${'publishBtn'}`}
								color='primary'
								type='submit'
								disableElevation
							>
								Submit
							</Button>
						</Grid>
						<Grid item sm={4} xs={12} className={classes.textAlignLeft}>
							{/* <Button
								id='cancelBtn'
								variant='contained'
								onClick={() => {
									history.replace('/support')
								}}
								className={`${
									classes.fieldStyle
								} ${'publishBtn'} ${'publishLaterBtn'}`}
								disableElevation
							>
								Cancel
							</Button> */}
							<Backdrop
								open={props.postLoading || props.singleSupportLoading}
								className={classes.backdrop}
							>
								<CircularProgress color='inherit' />
							</Backdrop>
						</Grid>
					</Grid>
					<Snackbar
						open={openSnackbar}
						autoHideDuration={5000}
						onClose={handleSnackbarClose}
					>
						<Alert
							onClose={handleSnackbarClose}
							severity={snackbar.type || 'error'}
						>
							{snackbar.message || 'Something went wrong!! Please try again.'}
						</Alert>
					</Snackbar>
				</form>
			</div>
		</>
	)
}

const mapStateToProps = ({ auth, Supports }) => {
	const { token } = auth
	const {
		categoryLoading,
		postSupportLoading,
		singleSupportLoading,
		updateSupportLoading,
	} = Supports
	return {
		token,
		categoryLoading,
		postLoading: postSupportLoading || updateSupportLoading,
		singleSupportLoading,
	}
}

export default connect(mapStateToProps, {
	postSupport,
	getSingleSupport,
	updateSupport,
})(CreateSupport)
