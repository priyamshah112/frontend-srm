import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import StudentProfileCard from '../StudentProfileCard'
import { Typography } from '@material-ui/core'
import userIcon from '../../../assets/images/profile/User.svg'
import phoneIcon from '../../../assets/images/profile/Phone number.svg'
import emailIcon from '../../../assets/images/profile/Email.svg'

const useStyles = makeStyles((theme) => ({
	profileContainer: {
		width: '95%',
		margin: '0 auto',
	},
	mainDiv: {
		display: 'flex',
		width: '100%',
		[theme.breakpoints.down('xs')]: {
			display: 'block',
			width: '100%',
		},
	},
	contentDiv: {
		width: '100%',

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
	detailsSpan: {
		paddingLeft: '30px',
	},
	detailsStyle: {
		paddingLeft: '10px',
	},
	iconStyle: {
		height: '14px',
	},
	mainMarginTop: {
		marginTop: '10px',
	},
}))
const StudentPhone = (props) => {
	const classes = useStyles()
	const gender = props.gender
	const userPhones = props.userPhones[0]
	const userEmails = props.userEmails[0]
	console.log('UserPhones from phone', userPhones)
	console.log('UserEmails from phone', userEmails)

	return (
		<>
			<div className={classes.profileContainer}>
				<StudentProfileCard title='Contact Details'>
					<Grid container>
						<div className={classes.mainDiv}>
							<div className={classes.contentDiv}>
								<Typography className={` ${classes.margin5}`}>
									<span>
										<img src={userIcon} />
										<span className={classes.detailsStyle}>{gender}</span>
									</span>
								</Typography>
							</div>
						</div>
					</Grid>
					<Grid container>
						<div className={classes.mainDiv}>
							<div className={classes.contentDiv}>
								<Grid container>
									{userPhones
										? userPhones.map((phone) => {
												return (
													<Grid sm={6} xs={6}>
														<Typography className={` ${classes.margin5}`}>
															<span>
																<img
																	src={phoneIcon}
																	className={classes.iconStyle}
																/>
																<span className={classes.detailsStyle}>
																	{phone['phone_number']}
																</span>
															</span>
														</Typography>
													</Grid>
												)
										  })
										: ''}
								</Grid>
								<Grid container>
									{userEmails
										? userEmails.map((email) => {
												return (
													<Grid sm={6} xs={6}>
														<Typography className={` ${classes.margin5}`}>
															<span>
																<img
																	src={emailIcon}
																	className={classes.iconStyle}
																/>
																<span className={classes.detailsStyle}>
																	{email['email']}
																</span>
															</span>
														</Typography>
													</Grid>
												)
										  })
										: ''}
								</Grid>
							</div>
						</div>
					</Grid>
				</StudentProfileCard>
			</div>
		</>
	)
}

export default StudentPhone
