import React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import { useHistory } from 'react-router-dom'
import * as moment from 'moment'
import { CardCS } from '../../common'
import { paths } from '../../../Constants/Routes'
import { colors } from '../../common/ui/appStyles'

const useStyle = makeStyles((theme) => ({
	typography: {
		margin: '16px 0',
	},
	title:{
		cursor: 'pointer',
	},
	pb20:{
		paddingBottom: '20px',
	},
	duedate: {
		textAlign: 'right',
		color: colors.lightBlack2,
	},	
    status:{
        width: '100%',
        textAlign: 'right',
    },
}))

const HomeworkCard = (props) => {
	const classes = useStyle()
	const history = useHistory()
	const {
		title,
		submission_date,
		submission_status,
		subject
	} = props.homework

	return (
		<>
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
						<Grid item xs={6}>
							<Typography
								className={`${classes.duedate}`}
								variant='h6'
							>
								Due Date: {moment(submission_date).format('DD/MM/YY hh:mm A')}
							</Typography>
						</Grid>
					</Grid>
					<Typography 
						variant="subtitle2"
						className={classes.status}
						style={{color: submission_status === 'pending' ? colors.lightGrey : colors.tint}}
					>
						{submission_status}
					</Typography> 
				</CardCS>
			</Grid>
		</>
	)
}

export default HomeworkCard
