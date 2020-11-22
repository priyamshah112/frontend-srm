import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import StudentProfileCard from '../StudentProfileCard'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
	profileContainer: {
		width: '95%',
		margin: '0 auto',
	},
	mainDiv: {
		display: 'flex',
		[theme.breakpoints.down('xs')]: {
			display: 'block',
			width: '100%',
		},
	},
	contentDiv: {
		[theme.breakpoints.down('xs')]: {
			display: 'inline-block',
		},
	},
	labelText: {
		fontSize: '14px',
		fontStyle: 'normal',
		color: `${theme.palette.common.blackRussian}`,
		opacity: 0.5,
	},
	normalText: {
		fontSize: '14px',
		fontStyle: 'normal',
		color: `${theme.palette.common.blackRussian}`,
		fontWeight: 500,
		opacity: 1,
	},
	margin5: {
		marginLeft: '5px',
	},
	mainMarginLeft: {
		marginLeft: '30px',
		[theme.breakpoints.down('xs')]: {
			marginLeft: 0,
		},
	},
	mainMarginTop: {
		marginTop: '10px',
	},
}))
const StudentAddress = (props) => {
	const classes = useStyles()
	const address = props.address
	return (
		<>
			<div className={classes.profileContainer}>
				<StudentProfileCard title='Address'>
					<Grid container>
						<div className={classes.mainDiv}>
							<div className={classes.contentDiv}>
								{address ? (
									<Typography className={`${classes.normalText}`}>
										{address.address_line1 ? `${address.address_line1},` : ''}{' '}
										{address.address_line2 ? `${address.address_line2},` : ''}{' '}
										{address.address_line3 ? `${address.address_line3},` : ''}{' '}
										{address.city_id}, {address.state_id}, {address.country_id}{' '}
										- {address.pincode}
									</Typography>
								) : (
									''
								)}
							</div>
						</div>
					</Grid>
				</StudentProfileCard>
			</div>
		</>
	)
}

export default StudentAddress
