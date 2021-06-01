import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/styles'
import { FormControl, Button } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import { useHistory, useLocation } from 'react-router-dom'
import * as moment from 'moment'
import HomeworkService from '../HomeworkService'
import { CardCS, Container, BackHeader, ThikLoader, EmptyData, DropArea, DocsViewer } from '../../common'
import { colors } from '../../common/ui/appStyles'
import RichTextEditor from '../../../shared/richTextEditor'
import { paths } from '../../../Constants/Routes'

const useStyle = makeStyles(() => ({
    cardContainer:{
        paddingTop: '10px', 
    },
	typography: {
		margin: '16px 0',
	},
	title:{
		cursor: 'pointer',
	},
	pb20:{
		paddingBottom: '20px',
	},
	mt20:{
		marginTop: '20px',
	},
	duedate: {
		textAlign: 'right',
		color: colors.lightBlack2,
	},
    mainContent:{
        color: colors.lightBlack2,
        wordBreak: 'break-word',
        '& p':{
            margin: '0px !important',
        }
    },
    relative:{
        position: 'relative',
    },
    seen:{
        position: 'absolute',
        right: '0px',
        bottom: '0px',
        color: colors.lightGrey,
    },
	sub:{	
		padding: '10px 0px',	
		color: colors.lightBlack,
	},
	grid1:{
        padding: '10px 10px 10px 0px',
    },
    grid2:{
        padding: '10px 0px 10px 10px',
    },
	answer:{
		color: colors.lightBlack, 
	},
	main_content:{
		marginTop: '20px',
		color: colors.lightBlack, 
	},
	formcontrol: {
		width: '100%',
		marginTop: '20px',
		'& .MuiInputBase-root': {
			color: 'rgba(0, 0, 0, 0.54)',
		},
	},	
	saveBtn: {
		width: '100%',
		marginTop: '20px',
		'& Button': {
			width: '130px',
			marginLeft: 'calc(100% - 130px)',
		},
	},
}))

const StudentSelectHomework = () => {
	const classes = useStyle()
	const history = useHistory()
    const location = useLocation()
	const [ isLoading, setLoading ] = useState(true)
	const token = localStorage.getItem('srmToken')
	const [ homework, setHomework ]	= useState(null)
	const [ feedback, setFeedback ] = useState('')
	const [fileList, setFileList] = useState([])
	const [submitBtn, setSubmitBtn] = useState(false)
	const {
		id,
		main_content,
		submission_date,
		homework_submission_student,
		teacher_document,
		teacher_feedback,
		subject,
		subject_id
	} = homework ? homework : {}


	useEffect(()=>{
		fetchData()
	},[])

	useEffect(() => {
		if(!homework_submission_student){
			return
		}
		if(homework_submission_student.submission_status === 'pending'){
			let saveDataApi = setInterval(() => {
				saveFeedback(false,homework_submission_student ? homework_submission_student.status : 'draft')
			}, 10000)
			return () => clearInterval(saveDataApi)
		}
	}, [feedback, fileList])

	const fetchData = async() =>{
		setLoading(true)
		let params = {
			homework_id: location.state.homework_id,
			student_id: location.state.student_id
		}
		try{
			console.log(params)
			const res = await HomeworkService.fetchStudentSubmitted(
				params,
				token
			)
			console.log(res.data)
			if(res.status === 200){
				setHomework(res.data.data.homework)
			}
		}
		catch(e){
			console.log(e)
		}
		setLoading(false)
	}	
	const handleChange = (files) => {
		setFileList(files)
	}
	const handleFeedbackChange = (data) => {
		setFeedback(data)
	}
	const saveFeedback = async(isBack,status) => {
		setSubmitBtn(true)
		try{
			const formData = new FormData()
			for(let key in fileList){
				formData.append(`upload_document[${key}]`,fileList[key])
			}
			formData.append('subject_id',subject_id)
			formData.append('student_id',location.state.student_id)
			formData.append('homework_id',id)
			formData.append('feedback',feedback)
			formData.append('status',status)
			formData.append('class_id',teacher_feedback.class_id)
			const res = await HomeworkService.saveFeedback(token,formData)
			if(res.status === 200){
				if (isBack) {
					history.goBack()
				}
				else if(status === 'published'){
					fetchData()
				}
			}
		}
		catch(e){
			console.log(e)
		}
		setSubmitBtn(false)
	}
	const handleBack = async() =>{
		if(teacher_feedback.submission_status === 'pending'){
			await saveFeedback(true, teacher_feedback ? teacher_feedback.status : 'draft')
		}
		history.goBack()
	}

	
	return (
		<>
		{
			!homework ? null : 
			isLoading ? 
				<ThikLoader />
			:	
				<Container>
					<BackHeader handleBack={handleBack} title="Assignment Details" />
					<Grid
						container
						direction='row'
						justify='center'
						alignContent='center'
						className={classes.cardContainer}
					>
						<CardCS>
							<Grid container className={classes.pb20}>
								<Grid item xs={6}>
									<span>
										{subject ? (
											<Typography variant='subtitle1'>{subject.name} Homework</Typography>
										) : (
											<Typography variant='subtitle1'>N/A</Typography>
										)}
									</span>
								</Grid>
								<Grid item xs={6}>
                                    <Typography
                                        className={`${classes.duedate}`}
                                        variant='h6'
                                    >
                                        Due Date: {moment(submission_date).format('DD/MM/YY hh:mm A')}
                                    </Typography>
								</Grid>
							</Grid>
							<Grid container>
								<Grid item xs={6}>
									<Typography className={classes.mainContent} variant='subtitle2'>
										{main_content ? (
											<div dangerouslySetInnerHTML={{ __html: main_content }} />
										) : 'N/A'}
									</Typography>
								</Grid>
								<Grid item xs={12}>
									{
										teacher_document.length > 0 ?
											<DocsViewer data={teacher_document}/>
										: null
									}
								</Grid>
							</Grid>
						</CardCS>
					</Grid>
					{
						homework_submission_student ? 
						<CardCS>
							<Typography 
								variant="subtitle1"
								className={classes.answer}
							>
								Answer
							</Typography>		
							<Typography className={`${classes.mainContent} ${classes.mt20}`} variant='subtitle2'>
								{main_content ? (
									<div dangerouslySetInnerHTML={{ __html: homework_submission_student.main_content }} />
								) : 'N/A'}
							</Typography>
							{
								homework_submission_student.student_document.length > 0 ?
									<DocsViewer data={homework_submission_student.student_document}/>
								: null
							}
						</CardCS> : null
					}
					<CardCS>
						<Typography 
							variant="subtitle1"
							className={classes.answer}
						>
							Feedback
						</Typography>
						{
							!teacher_feedback ? null :
							teacher_feedback.status === 'published' ? 
							<>
								<Typography className={`${classes.mainContent} ${classes.mt20}`} variant='subtitle2'>
									{teacher_feedback.main_content ? (
										<div dangerouslySetInnerHTML={{ __html: teacher_feedback.main_content }} />
									) : 'N/A'}
								</Typography>
								{
									teacher_feedback.teacher_feedback_document.length > 0 ?
										<DocsViewer data={teacher_feedback.teacher_feedback_document}/>
									: null
								}
							</>
							:
							<>
								<FormControl className={classes.formcontrol}>
									<RichTextEditor
										handleDescription={handleFeedbackChange}
										placeholder='Type Here'
										value={feedback}
										token={token}
									/>
								</FormControl>
								<DropArea handleChange={handleChange}/>							
								<div className={classes.saveBtn}>
									<Button
										variant='contained'
										color='primary'
										onClick={() => {
											saveFeedback(false,'published')
											}}
										disabled={submitBtn}
									>
										Submit
									</Button>
								</div>
							</>
						}							
					</CardCS>					
				</Container>
		}
		</>
	)
}

export default StudentSelectHomework
