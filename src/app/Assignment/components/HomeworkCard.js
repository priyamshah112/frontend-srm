import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import { useHistory } from 'react-router-dom'
import * as moment from 'moment'
import EditIcon from '../../../assets/images/Edit.svg'
import InfoIcon from '../../../assets/images/assignment/info.svg'
// import testImg from "../../assets/images/home/testImg.png";
import HomeworkService from '../HomeworkService'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import { Confirm, CardCS } from '../../common'
import { paths } from '../../../Constants/Routes'

const useStyle = makeStyles((theme) => ({
	typography: {
		margin: '16px 0',
	},
	title:{
		cursor: 'pointer',
		wordBreak: 'break-word',
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
}))

const HomeworkCard = (props) => {
	const classes = useStyle()
	const history = useHistory()
	const [open, setOpen] = React.useState(false)
	const role = JSON.parse(localStorage.getItem('srmSelectedRole'))
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
	const {
		id,
		status,
		title,
		main_content,
		submission_date,
		created_at,
		subject
	} = props.homework
	// console.log(props.homework)
	const handleEditHomework = () => {
		history.push(`/create-homework/${id}`)
	}
	const handledeleteHomework = async () => {
		const token = localStorage.getItem('srmToken')
		try {
			console.log(id, token)
			const response = await HomeworkService.deleteHomework(id, token)
			console.log(response)
			if (response.status === 200) {
				console.log('Successfully Deleted')
				// props.deleteHomework(id);
				history.push('/assignment')
			} else {
				console.log('Failed to delete')
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
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
							<span>
								{title || subject ? (
									<Typography 
										variant='subtitle1'
										className={classes.title}
										onClick={()=>history.push({pathname:`${paths.ASSIGNMENT}${paths.VIEW}`,state:{homework_id: props.homework.id}})}
									>
										 {title ? title : null} {title && subject ? '-' : null} {subject ? subject.name : null}
									</Typography>
								) : (
									<Typography 
										variant='subtitle1'
										className={classes.title}
										onClick={()=>history.push({pathname:`${paths.ASSIGNMENT}${paths.VIEW}`,state:{homework_id: props.homework.id}})}
									>
										N/A
									</Typography>
								)}
							</span>
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
							<Typography
								className={`${classes.labelText}`}
								variant='subtitle2'
							>
								Status : <span className={`${classes.span}`}>{status}</span>
							</Typography>
						</Grid>
						<Grid item xs={4} className={classes.imgGrid}>
						{status !== 'published' && (role === 'admin' || role === 'teacher') ? (
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
											<DeleteOutlineOutlinedIcon fontSize='small' />
										</div>
									</>
								) : (
									<div
										className={`${classes.imgDiv_del} ${classes.textAlignRight}`}
										onClick={()=>history.push({pathname: `${paths.ASSIGNMENT}/${id}`,state:{homework_id:id}})}
									>
										<img
											src={InfoIcon}
											className={classes.infoBtn}
											// onClick={handleEditHomework}
										/>
									</div>
								)}
						</Grid>
					</Grid>
				</CardCS>
			</Grid>
		</>
	)
}

export default HomeworkCard
