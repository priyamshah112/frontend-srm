import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Box,Grid,FormControl,Input,TextField,Button,Typography,Chip,Select,InputLabel,MenuItem } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import BackIcon from '../../../assets/images/Back.svg'
import RichTextEditor from '../../../shared/richTextEditor'
import NotificationService from '../NotificationService'
import { paths } from '../../../Constants/Routes'
import { PublishNowButton,PublishLaterButton,CancelButton } from '../../common'

const useStyle = makeStyles((theme) => ({
	formStyle: {
		margin: 'auto',
		width: '95%',
		backgroundColor: 'white',
		justifyContent: 'center',
		textAlign: 'center',
		borderRadius: '5px',
	},
	backImg: {
		float: 'left',
		transform: 'translateY(7px)',
		cursor: 'pointer',
	},
	sideMargins: {
		marginLeft: '20px',
		marginRight: '20px',
	},
	themeColor: {
		color: `${theme.palette.common.deluge}`,
		padding: 0,
		margin: 0,
	},
	errorColor: {
		color: 'red',
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
	inputBorder: {
		height: '50px',
	},
	chip: {
		margin: theme.spacing(0.5),
	},
	textAlignLeft: {
		textAlign: 'left',
		color: 'rgba(0, 0, 0, 0.54)',
	},
	chips: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	chip: {
		margin: 2,
	},
	publishBtns: {
		textAlign: 'right',
		justifyContent: 'right',
	},
	margin: {
		marginTop: '30px',
		[theme.breakpoints.down('xs')]: {
			marginTop: '10px',
		},		
	},
	optionContainer: {
		borderBottom: '1px solid #DCDCE0',
		width: '100%',
	},
	optionBody: {
		color: 'rgba(0, 0, 0, 0.54)',
	},
	titleText: {
		fontFamily: 'Avenir Medium',
		fontize: '1.2rem',
		color: '#1C1C1E',
	},
	header:{
		paddingTop: '20px',
	}
}))

const CreateNotification = (props) => {
	const classes = useStyle()
	const history = useHistory()
	const { id } = useParams()
	const [ status, setStatus ] = useState("draft");
	const [ disable, setDisable ] = useState(false)
	const [title, setTitle] = useState('')
	const [summary, setSummary] = useState('')
	const [description, setDescription] = useState('')
	const [errMessage, setError] = useState('')
	const [category, setCategory] = useState('')
	const [classState, setClassState] = useState([])
	const [classIds, setClassIds] = useState([])
	const [parent, setParent] = useState(false)
	const [teacher, setTeacher] = useState(false)
	const [openUserSearch, setOpenUserSearch] = useState(false)
	const [userList, setUserList] = useState([])
	const [searchData, setSearchData] = useState([])	
	const [ publishDate, setPublishDate ] = useState(new Date());
	const loadingUsers = openUserSearch && searchData.length === 0
	const classStateNames = [
		'All Teachers',
		'All Parents',
		'Select All',
		...Object.values(props.classState),
	]
	const categoryValues = [...Object.values(props.categories)]

	useEffect(() => {
		fetchDraft();
	  }, [id]);

	useEffect(() => {
		const saveDataApi = setInterval(() => {
			saveDetails({
				status: status,
				date: publishDate,
				isBack: false
			}
		   );
		}, 10000);
	
		return () => {
		  clearInterval(saveDataApi);
		};
	}, [title, description, summary, classState, category, userList, status, publishDate]);
	
	const fetchDraft = async () => {
		try {
			const response = await NotificationService.fetchDraftNotification(
				id,
				props.token
			)

			if (response.status === 200) {
				let tempClassCheckState = []
				if (response.data.data.class_mapping) {
					if (response.data.data.class_mapping.parents) {
						setClassState(['All Parents', ...classState])
					}
					if (
						response.data.data.class_mapping.teachers
					) {
						setClassState(['All Teachers', ...classState])
					}
					if (response.data.data.class_mapping.class) {
						response.data.data.class_mapping.class.forEach(
							(classIds) => {
								tempClassCheckState.push(props.classState[classIds])
							}
						)
						setClassState((classState) => [
							...classState,
							...tempClassCheckState,
						])
					}
				}
				// setUserList(response.data.data.class_mapping.individual_users)

				setDescription(
					response.data.data.data.main_content
						? response.data.data.data.main_content
						: ''
				)
				setTitle(
					response.data.data.data.title
						? response.data.data.data.title
						: ''
				)
				setSummary(
					response.data.data.data.summary
						? response.data.data.data.summary
						: ''
				)
				setCategory(
					response.data.data.type
						? response.data.data.type
						: ''
				)
				setStatus(response.data.data.notify_status)
				setPublishDate(response.data.data.published_date);						
			}
		} catch (e) {
			console.log(e)
		}
	}

	const handleClassId = () => {
		let tempClassIds = []	
		let tempTeacher = false
		let tempParent = false
		let isSelectAll = classState.find(
			(classname) => classname === 'Select All'
		)
		if (isSelectAll) {
			tempClassIds = [...Object.keys(props.classState)]
			tempTeacher = true
			tempParent = true
		} 
		else {
			classState.forEach((classnames) => {				
				if (classnames === 'All Teachers') {
					tempTeacher = true
				}

				if (classnames === 'All Parents') {
					tempParent = true
				}
				
				let matchedValue = Object.keys(props.classState).find(
					(classId) => props.classState[classId] === classnames
				)
				if(matchedValue){
					tempClassIds.push(parseInt(matchedValue))
				}
			})
		}
		setClassIds(tempClassIds)
		setTeacher(tempTeacher)
		setParent(tempParent)
	}



	useEffect(() => {
		handleClassId()
	}, [classState])

	const saveDetails = async ({status,date,isBack}) => {
		if(isBack){
			setDisable(true)
		}
		try {
			let tempIndividualUsers = []
			userList.map((item) => {
				let user = {
				  id: item.id,
				  role: item.name,
				}
				tempIndividualUsers.push(user)
			})

			let payload = {
				type: category,
				data: {
					title,
					summary,
					main_content: description,
				},
				published_to: {
					individual_users: tempIndividualUsers,
					class: classIds,
					parents: parent,
					teachers: teacher,
				},
			}
			
			if ((status === "published" && date) || (status === "active" && date)) {
				payload= {
					...payload,
					notify_status: status,
					published_date: date,
				}
			}
			
			const response = await NotificationService.saveNotification(
				id,
				payload,
				props.token
			)
			if (response.status === 200) {
				console.log(response)
				if(isBack){
					pushBack()
				}
			}

		} catch (e) {
			console.log(e)
		}
		if(isBack){
			setDisable(false)
		}
	}

	const styleOptions = (option) => {
		if (option.name) {
			return (
				<div className={classes.optionContainer}>
					<Typography className={classes.optionTitle}>
						{`${option.firstname} ${option.lastname} - ${option.name}`}
					</Typography>

					{option.user_classes ? (
						option.classes_data ? (
							<>
								<Typography className={classes.optionBody}>
									{option.user_classes.classes_data.class_name}
								</Typography>
							</>
						) : (
							''
						)
					) : (
						''
					)}
					<Typography className={classes.optionBody}>
						{option.username}
					</Typography>
				</div>
			)
		} else {
			return option.username
		}
	}

	const handleChangeInput = (event) => {
		let name = event.target.name
		if (name === 'title') {
			setTitle(event.target.value)
		} else {
			setSummary(event.target.value)
		}
		clearError()
	}

	const handleSelectClass = (event) => {
		setClassState(event.target.value)
	}

	const hanldeDeleteClass = (value) => {
		setClassState(classState.filter((classname) => classname !== value))
	}

	const handleDescription = (data) => {
		setDescription(data)
	}

	const handleCategoryChange = (event) => {
		let trimValue = event.target.value.toLowerCase().replace(/\s+/g, '')
		setCategory(trimValue)
	}

	const handleSearchChange = (event, value) => {
		setUserList(value)
	}

	const callSearchAPI = async (event) => {
		if (event.target.value && event.target.value.length % 3 === 0) {
			try {
				const response = await NotificationService.searchUser(
					event.target.value,
					props.token
				)
				setSearchData(response.data.data)
			} catch (e) {
				console.log(e)
			}
		}
	}

	const validation = () => {
		if ((classState.length === 0 && userList.length < 1) || title === '' || summary === '' || category === '') {
			setError('Fill All Data !')
			return false
		}
		return true
	}

	const clearError = () =>{
		setError('')
	}

	const handlePublishLater = () => {			
			setStatus('active')
			saveDetails({
				status: 'active',
				date: publishDate,
				isBack: true
			})
	}

	const submitForm = async (event) => {
		event.preventDefault()
		if(validation()){
			setStatus('published')
			let date = new Date().toISOString();
			setPublishDate(date)
			saveDetails({
				status: 'published',
				date: date,
				isBack: true
			})
		}
	}

	const handleBack = () =>{
		saveDetails({
				status: status,
				date: publishDate,
				isBack: true
		});
	}

	const pushBack = () =>{
		history.push({pathname : paths.NOTIFICATIONS,
			state: {
				tab : props.selectedTab
			}
		})
	}

	return (
		<>
			<div>
				<form className={classes.formStyle} onSubmit={submitForm}>
					<Box className={`${classes.margin}  ${classes.sideMargins} ${classes.header}`} pt={4}>
						<div>
							<img
								src={BackIcon}
								alt='Back'
								className={classes.backImg}
								onClick={ handleBack }
							/>
							<Typography
								variant='h5'
								className={`${classes.themeColor} ${classes.titleText}`}
							>
								Create Notification
							</Typography>
						</div>
					</Box>
					{errMessage ? (
						<Box className={classes.margin} pt={2}>
							<div>
								<Typography className={`${classes.errorColor}`}>
									{errMessage}
								</Typography>
							</div>
						</Box>
					) : (
						''
					)}
					<Box className={`${classes.margin} ${classes.sideMargins}`}>
						<FormControl className={classes.fieldStyle}>
							<TextField
								label='Title'
								id='title'
								name='title'
								className={classes.inputBorder}
								value={title}
								onChange={handleChangeInput}
								required={true}
							/>
						</FormControl>
					</Box>
					<Box className={`${classes.margin} ${classes.sideMargins}`}>
						<FormControl className={classes.fieldStyle}>
							<TextField
								id='summary'
								name='summary'
								label='Summary'
								className={classes.inputBorder}
								value={summary}
								onChange={handleChangeInput}
								required={true}
							/>
						</FormControl>
					</Box>
					<Box className={`${classes.margin} ${classes.sideMargins}`}>
						<FormControl className={classes.fieldStyle}>
							<InputLabel
								labelId='category-label'
							>
								Categories*
							</InputLabel>
							<Select
								labelId='category-label'
								id='demo-mutiple-chip'
								value={category}
								onChange={handleCategoryChange}
								input={<Input id='select-multiple-chip' />}
								required={true}
								renderValue={(selected) => {
									return (
										<div className={classes.chips}>
											<Chip
												key={selected}
												label={selected}
												className={classes.chip}
											/>
										</div>
									)
								}}
								MenuProps={{
									anchorOrigin: {
										vertical: 'bottom',
										horizontal: 'center',
									},
									transformOrigin: {
										vertical: 'top',
										horizontal: 'center',
									},
									getContentAnchorEl: null,
								}}
							>
								{categoryValues.map((category) => (
									<MenuItem key={category} value={category}>
										{category}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Box>
					<Box className={`${classes.margin} ${classes.sideMargins}`}>
						<FormControl className={classes.fieldStyle}>
							<Autocomplete
								multiple
								open={openUserSearch}
								onOpen={() => {
									setOpenUserSearch(true)
								}}
								onClose={() => {
									setOpenUserSearch(false)
								}}
								value={userList}
								id='tags-standard'
								options={searchData}
								loading={loadingUsers}
								onChange={handleSearchChange}
								onInputChange={callSearchAPI}
								getOptionLabel={(option) => option.username}
								renderInput={(params) => (
									<TextField
										{...params}
										variant='standard'
										label='Search users'
									/>
								)}
								renderOption={(option) => styleOptions(option)}
							/>
						</FormControl>
					</Box>

					<Box className={`${classes.margin} ${classes.sideMargins}`}>
						<FormControl className={classes.fieldStyle}>
							<InputLabel>Select classes</InputLabel>
							<Select
								labelId='demo-mutiple-chip-label'
								id='demo-mutiple-chip'
								value={classState}
								multiple
								onChange={handleSelectClass}
								input={<Input id='select-multiple-chip' />}
								MenuProps={{
									PaperProps: {
										style: {
											maxHeight: '300px',
										},
									},
									anchorOrigin: {
										vertical: 'bottom',
										horizontal: 'center',
									},
									transformOrigin: {
										vertical: 'top',
										horizontal: 'center',
									},
									getContentAnchorEl: null,
								}}
								renderValue={(selected) => {
									return (
										<div className={classes.chips}>
											{selected.map((value) => (
												<Chip
													onDelete={() => hanldeDeleteClass(value)}
													onMouseDown={(event) => {
														event.stopPropagation()
													}}
													key={value}
													label={value}
													className={classes.chip}
												/>
											))}
										</div>
									)
								}}
							>
								{classStateNames.map((classname) => (
									<MenuItem key={classname} value={classname}>
										{classname}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Box>

					<Box className={`${classes.margin} ${classes.sideMargins}`}>
						<Grid className={classes.fieldStyle}>
							<Typography className={classes.textAlignLeft}>
								Description
							</Typography>
							<RichTextEditor
								handleDescription={handleDescription}
								value={description}
								token={props.token}
							/>
						</Grid>
					</Box>
					<Box className={`${classes.margin} ${classes.sideMargins}`}>
						<Grid
							container
							className={classes.fieldStyle}
							direction='row-reverse'
						>
							<Grid item sm={8} xs={12} className={classes.publishBtns}>
								<PublishLaterButton
									disabled={disable}
									validation={validation}
									publishDate={publishDate}
									handlePublishDate={setPublishDate}
									handlePublishLater={handlePublishLater}
								/>
								<PublishNowButton 
									disabled={disable}
								/>
							</Grid>
							<Grid item sm={4} xs={12} className={classes.textAlignLeft}>
								<CancelButton 
									handleCancel={handleBack}
								/>
							</Grid>
							<br />
							<br />
							<br />
						</Grid>
					</Box>
				</form>
			</div>
			<br />
			<br />			
		</>
	)
}

const mapStateToProps = (state) => {
	return {
		token: state.auth.token,
	}
}

export default connect(mapStateToProps)(CreateNotification)
