import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import { useHistory, useLocation } from 'react-router-dom'
import * as moment from 'moment'
import EditIcon from '../../../assets/images/Edit.svg'
import InfoIcon from '../../../assets/images/assignment/info.svg'
// import testImg from "../../assets/images/home/testImg.png";
import HomeworkService from '../HomeworkService'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import { Confirm, CardCS, Container, BackHeader, ThikLoader, EmptyData, DocsViewer } from '../../common'
import { colors } from '../../common/ui/appStyles'
import SubmissionCard from '../components/submissionCard'
import { paths } from '../../../Constants/Routes'

const useStyle = makeStyles((theme) => ({
	typography: {
		margin: '16px 0',
	},
    cardContainer:{
        paddingTop: '10px', 
    },
	pb20:{
		paddingBottom: '20px',
	},
	editBtn: {
		marginLeft: 'auto',
		cursor: 'pointer',
	},
	infoBtn:{
		cursor: 'pointer',
		width: '30px',
		height: '30px',

	},
	labelText: {
		fontStyle: 'normal',
		color: '#8E8E93',
	},
    mainContent:{
		color: '#8E8E93',
        wordBreak: 'break-word',
        marginTop: '0px',
        marginBottom: '20px',
    },
	editBtn: {
		width: '17px',
		height: '17px',
		paddingLeft: '10px',
		transform: 'translateY(4px)',
		cursor: 'pointer',
	},
	textAlignRight: {
		textAlign: 'right',
		color: '#AEAEB2',
	},
	imgGrid: {
		position: 'relative',
	},
	imgDiv: {
		bottom: '0px',
		right: '35px',
		position: 'absolute',
	},
	imgDiv_del: {
		bottom: 0,
		right: 0,
		position: 'absolute',
		transform: 'translateY(7px)',
		cursor: 'pointer',
		color: '#b7b7bb',
		'& svg':{			
			width: '25px',
			height: '23px',
		}
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
}))

const TeacherSelectHomework = () => {
	const classes = useStyle()
	const history = useHistory()
    const location = useLocation()
	const [ isLoading, setLoading ] = useState(true)
	const [open, setOpen] = useState(false)
	const token = localStorage.getItem('srmToken')
	const role = JSON.parse(localStorage.getItem('srmSelectedRole'))
	const [ homework, setHomework ]	= useState(null)
	const {
		id,
		status,
		title,
		main_content,
		submission_date,
		homework_submission,
		created_at,
		subject
	} = homework ? homework : {}


	useEffect(()=>{
		fetchData()
	},[])

	const fetchData = async() =>{
		setLoading(true)
		let params = {}
		if(role === 'parent'){
			params = {
				current_role: 'parent'
			}
		}
		try{
			const res = await HomeworkService.fetchSingleHomework(
				location.state.homework_id,
				params,
				token
			)
			if(res.status === 200){
				setHomework(res.data.data.homework)
			}
		}
		catch(e){
			console.log(e)
		}
		setLoading(false)
	}

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleCloseNO = () => {
		setOpen(false)
	}
	const handleCloseYES = () => {
		handledeleteHomework()
		setOpen(false)
	}

	const handleEditHomework = () => {
		history.push(`/create-homework/${id}`)
	}
	const handledeleteHomework = async () => {
		try {
			console.log(id, token)
			const response = await HomeworkService.deleteHomework(id, token)
			console.log(response)
			if (response.status === 200) {
				console.log('Successfully Deleted')
				// props.deleteHomework(id);
				// window.location.reload()
			} else {
				console.log('Failed to delete')
			}
		} catch (error) {
			console.log(error)
		}
	}
	

	return (
		<>
		{
			isLoading ? 
				<ThikLoader />
			:	
				<Container>
					<BackHeader handleBack={()=>history.goBack()} title="Assignment Details" />
					<Confirm 
						open={open} 
						handleClose={handleCloseNO} 
						onhandleDelete={handleCloseYES}
					/> 
					<Grid
						container
						direction='row'
						justify='center'
						alignContent='center'
						className={classes.cardContainer}
					>
						<CardCS>
							<Grid container className={classes.pb20}>
								<Grid item xs={8}>
								{title || subject ? (
									<Typography 
										variant='subtitle1'
									>
										 {title ? title : null} {title && subject ? '-' : null} {subject ? subject.name : null}
									</Typography>
								) : (
									<Typography 
										variant='subtitle1'
									>
										N/A
									</Typography>
								)}
								</Grid>
								<Grid item xs={4}>
									<Typography
										className={`${classes.textAlignRight}`}
										variant='subtitle2'
									>
										Created at: {moment(created_at).format('DD MMM YY')}
									</Typography>
								</Grid>
							</Grid>
							<Grid container>
								<Grid item xs={8}>
									<Typography className={classes.mainContent} variant='subtitle2'>
										{main_content ? (
											<div dangerouslySetInnerHTML={{ __html: main_content }} />
										) : 'N/A'}
									</Typography>
								</Grid>
								<Grid item xs={4} className={classes.imgGrid}>
									<Typography
										className={`${classes.labelText} ${classes.textAlignRight}`}
										variant='subtitle2'
									>
										Status : <span className={`${classes.span}`}>{status}</span>
									</Typography>
									{status !== 'published' ? (
											<>
												<div
													className={`${classes.imgDiv} ${classes.textAlignRight}`}
												>
													<img
														src={EditIcon}
														className={classes.editBtn}
														onClick={handleEditHomework}
													/>
												</div>
												<div
													className={`${classes.imgDiv_del}`}
													// onClick={()=>handledeleteHomework(id)}
													onClick={handleClickOpen}
												>
													<DeleteOutlineOutlinedIcon fontSize={'medium'} />
												</div>
											</>
										) : (
											<div
												className={`${classes.imgDiv_del} ${classes.textAlignRight}`}
											>
												<img
													src={InfoIcon}
													className={classes.infoBtn}
													onClick={()=>history.push({pathname: `${paths.ASSIGNMENT}/${location.state.homework_id}`,state:{homework_id:location.state.homework_id}})}
												/>
											</div>
										)}										
								</Grid>
								<Grid item xs={12}> 
									{
										homework.teacher_document.length > 0 && homework.teacher_document ?
											<DocsViewer data={homework.teacher_document} />
										: null
									}
								</Grid>
							</Grid>
						</CardCS>
					</Grid>
					{status === 'published' ? 
							<Typography 
								variant="h2"
								className={classes.sub}
							>
								Submissions
							</Typography>
						: null
					}	
					{
						status === 'published' ?
							homework_submission ?  		
								<Grid container style={{display:'border-box'}}>
									{
										homework_submission.map((item,index)=>(							
											<Grid item xs={6} className={(index+1)%2 === 1 ? classes.grid1 : classes.grid2}>
												<SubmissionCard item={item} />
											</Grid>
										))
									}
								</Grid>				
							: <EmptyData>No Record</EmptyData> 
						: null
					}
					
				</Container>
		}
		</>
	)
}

export default TeacherSelectHomework
