import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import PlanningService from '../PlanningService'
import TextField from '@material-ui/core/TextField'
import RichTextEditor from '../../../shared/richTextEditor'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import { useParams,useLocation, useHistory } from 'react-router-dom'
import Dropdown from '../dropdown'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import BackIcon from '../../../assets/images/Back.svg'
import Typography from '@material-ui/core/Typography'
import { Fragment } from 'react'
import { CircularProgress } from '@material-ui/core'
import { TramOutlined } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
	container: {
		width: '100%',
		backgroundColor: theme.palette.mainBackground,
		height: '100%',
		marign: '0',
		padding: '0',
		overflowY: 'auto',
	},
	subjectTitle: {
		marginBottom: '20px',
	},
	loading: {
		width: '100%',
		textAlign: 'center',
		paddingTop: '8px',
		fontSize: '20px',
	},
	fieldStyle: {
		width: '100%',
		marginBottom: '30px',
		'& .MuiInputBase-root': {
			color: 'rgba(0, 0, 0, 0.54)',
		},
	},
	inputBorder: {
		height: '50px',
	},
	div: {
		margin: 20,
		background: '#fff',
		padding: 20,
	},
	select: {
		width: '100%',
	},
	width: {
		width: '100%',
	},
	button: {
		marginRight: 20,
	},
	saveBtn:{
		width: '100%',
		'& Button':{
			marginLeft: 'calc(100% - 66px)',
		}
	},
	header: {
		paddingRight: '20px',
		paddingLeft: '20px',
		marginTop: '5px',
		paddingTop: '10px',
		display: 'inline block',
	},
	backImg: {
		float: 'left',
		transform: 'translate(0px, 4px)',
		cursor: 'pointer',
	},
	header_title:{
		fonTize: '1rem',
		fontFamily: 'Avenir Medium',
		fontWeight: '400',
		color: '#1C1C1E',
		textAlign: 'center',

	},
	style: {
		fonTize: '1rem',
		fontFamily: 'Avenir Medium',
		fontWeight: '400',
		color: '#1C1C1E',
		textAlign: 'center',
	},
	CircularProgress: {
		position: 'absolute',
		left: '50%',
		top: '50%',
		zIndex: '1',
	},
	
}))

const CreatePlanning = () => {
	const location = useLocation()
    const searchParams = new URLSearchParams(location.search);
	const classID = location.state.class_id;
	const classDetail = location.state.class_detail;
	const params = useParams()
	const history = useHistory()
	const classes = useStyles()
	const [isLoading, setLoading] = useState(true)
	const [subjectID, setSubjectID] = useState('Subject')
	const [monthID, setMonthID] = useState('Month')
	const [termID, setTermID] = useState('Term')
	const [subjectMenu,setSubjectMenu]= useState([])
	const [termMenu,setTermMenu]= useState([])
	const [monthMenu,setMonthMenu]= useState([])
	const [subjectMenuLoading,setSubjectMenuLoading] = useState(false)
	const [termMenuLoading,setTermMenuLoading] = useState(false)
	const [monthMenuLoading,setMonthMenuLoading] = useState(false)
	const [submitBtn, setSubmitBtn] = useState(false)
	const [chapterContent, setChapterContent] = useState('')
	const token = localStorage.getItem('srmToken')

	const handleSubjectChange = (value) => {
		setSubjectID(value)
	}
	const handleTermChange = (value) => {
		setTermID(value)
	}
	const handleChapterChange = (e) => {
		setChapterContent(e.target.value)
	}	
	const handleMonthMenuChange = (value) => {
		setMonthID(value)
	}

	const fetchPlanning = async (planning_id) => {
		const response = await PlanningService.getPlanningID(
			token,
			planning_id
		)
		if (response.status === 200) {
			if (response.data.success && isLoading) {
				let data = response.data.data[0]
				console.log("getPlanID",data)
				if(data.subject_id !== null){
					setSubjectID(data.subject_id)
				}
				if(data.term_id !== null){
					setTermID(data.term_id)
				}
				if(data.month_id !== null){
					setMonthID(data.month_id)
				}
				if(data.chapter !==null){
					setChapterContent(data.chapters)
				}
			}
		}
	}
	const fetchMenuList = async(classID)=>{	
		try {	
			setSubjectMenuLoading(true)
			const subject = await PlanningService.get_by(token,classID,'subject')
			if (subject.status === 200) {
				setSubjectMenu(subject.data.data);
			}
			setSubjectMenuLoading(false)
		}
		catch(e){
			console.log(e)
			setSubjectMenuLoading(false)
		}
		try {	
			setTermMenuLoading(true)
			const term = await PlanningService.get_by(token,classID,'term')
			if (term.status === 200) {
				setTermMenu(term.data.data)
			}
			setTermMenuLoading(false)	
		}
		catch(e){
			console.log(e)
			setTermMenuLoading(false)
		}
		try {
			setMonthMenuLoading(true)
			const month = await PlanningService.get_by(token,classID,'month')
			if (month.status === 200) {
				setMonthMenu(month.data.data)
			}
			setMonthMenuLoading(false)
		}
		catch(e){
			console.log(e)
			setMonthMenuLoading(false)
		}
		setLoading(false)
	}
	const saveChapter = async () => {
		setSubmitBtn(true)
		try{
			const response = await PlanningService.savePlanning(token,params.id, {
				class_id: classID,
				term_id: termID,
				subject_id: subjectID,
				month_id: monthID,
				chapters: chapterContent,
			})
			if (response.status === 200) {
				console.log(response.data)
				if (response.data.success) {
					goBack()
				}
			}	
		} catch (e) {
			setSubmitBtn(false)
		}
	}

	const goBack = () => {
		history.push({pathname:`/planning`,state: {
			'classListUi': true,
			'classID': classID,
			'classDetail' : classDetail,
		}})
	}

	useEffect(() => {
		fetchPlanning(params.id)
		fetchMenuList(classID)
	}, [])

	return (
		<Fragment>
			{isLoading === true ? (
				<div className={classes.loder}>
					<CircularProgress
						color='primary'
						thickness={5}
						className={classes.CircularProgress}
					/>
				</div>
			) : (
				<div className={classes.container}>
					<div className={classes.header}>
						<div className={classes.filterForm}>
							<Typography className={classes.header_title}>
								<img
									src={BackIcon}
									alt='Back'
									className={classes.backImg}
									onClick={goBack}
								/>
								 {classDetail} : Term Plan
							</Typography>
							
						</div>
					</div>				
					<div className={classes.div}>
						<FormControl className={classes.fieldStyle}>
							<Dropdown data={subjectMenu} loading={subjectMenuLoading} onChange={handleSubjectChange} makeDisable={true} initialValue="Subject" value={subjectID}/>
						</FormControl>
						<FormControl className={classes.fieldStyle}>
							<Dropdown data={termMenu} loading={termMenuLoading} onChange={handleTermChange} makeDisable={true} initialValue="Term" value={termID}/>
						</FormControl>
						<FormControl className={classes.fieldStyle}>
							<Dropdown data={monthMenu} loading={monthMenuLoading} onChange={handleMonthMenuChange} makeDisable={true} initialValue="Month" value={monthID}/>
						</FormControl>
						<FormControl className={classes.fieldStyle}>
							<TextField
								id='outlined-multiline-static'
								multiline
								rows={7}
								defaultValue={chapterContent}
								variant='outlined'
								className={classes.width}
								placeholder="Chapter"
								onChange={handleChapterChange}
							/>	
						</FormControl>
						<div className={classes.saveBtn} >
							<Button 
								variant='contained'
								color='primary'
								onClick={saveChapter}
								disabled={submitBtn}
							>
								Save
							</Button>
						</div>
					</div>
				</div>
			)}
		</Fragment>
	)
}

export default CreatePlanning