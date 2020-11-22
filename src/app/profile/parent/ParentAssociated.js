import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import ProfileCard from '../ProfileCard'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
	profileContainer: {
		width: '95%',
		margin: '0 auto',
	},
	profile: {
		textAlign: 'right',
	},
	profilePictureDiv: {
		width: '50px',
		height: '50px',
		borderRadius: '50%',
		marginLeft: 'auto',
		border: '1px solid',
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
		color: `${theme.palette.common.srmBastille}`,
		fontWeight: 500,
		opacity: 1,
	},
	capitalize: {
		textTransform: 'capitalize',
	},
	lightText: {
		color: `${theme.palette.common.srmBastille}`,
		fontSize: '14px',
		fontStyle: 'normal',
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
const ParentAssociated = (props) => {
	const classes = useStyles()
	const associatedAccounts = props.associatedAccounts
	return (
		<>
			<div className={classes.profileContainer}>
				<ProfileCard title='Associated Accounts'>
					{associatedAccounts.map((accounts, index) => {
						return (
							<div className={classes.TopContent} key={index}>
								<Grid container>
									<Grid item xs={8}>
										<Grid container>
											<div className={classes.mainDiv}>
												<div className={classes.contentDiv}>
													<Typography className={`${classes.normalText}`}>
														{accounts.parents_data.firstname}{' '}
														{accounts.parents_data.lastname}
													</Typography>
												</div>
											</div>
										</Grid>
										<Grid container>
											<div className={classes.mainDiv}>
												<div className={classes.contentDiv}>
													<Typography className={`${classes.lightText}`}>
														<span className={classes.capitalize}>
															{accounts.relation_type}
														</span>
													</Typography>
												</div>
											</div>
										</Grid>
									</Grid>
									<Grid item xs={4}>
										<div className={classes.profile}>
											<div
												className={classes.profilePictureDiv}
												style={{
													backgroundImage: `url(${accounts.parents_data['thumbnail']})`,
													'background-repeat': 'no-repeat',
													'background-size': 'cover',
													'background-position': 'center',
												}}
											></div>
										</div>
									</Grid>
								</Grid>
							</div>
						)
					})}
				</ProfileCard>
			</div>
		</>
	)
}

export default ParentAssociated
