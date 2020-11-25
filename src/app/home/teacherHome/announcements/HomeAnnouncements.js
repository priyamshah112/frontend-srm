import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { connect } from 'react-redux'
import { Typography, CardContent, CircularProgress } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import taskBookIcon from '../../../../assets/images/home/teacher/TaskBook.svg'
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded'
import { useHistory } from 'react-router-dom'
import HomeSerivce from '../../HomeSerivce'
import { Lang } from '../../../../Constants/Languages/English'

const useStyle = makeStyles((theme) => ({
	homeworkDiv: {
		height: '100%',
		display: 'table',
		width: '100%',
	},
	title: {
		textTransform: 'uppercase',
		fontWeight: 800,
		letterSpacing: '1px',
		color: `${theme.palette.common.bastille}`,
	},
	homeworkIcon: {
		transform: 'translateY(5px)',
	},
	homeworkheader: {
		width: '100%',
		display: 'table-row',
		height: '35px',
	},
	homeworks: {
		width: '100%',
		height: '100%',
		display: 'table-row',
		marginTop: '10px',
	},
	cardContentStyle: {
		padding: '8px',
	},
	addhomeworkIcon: {
		float: 'right',
		cursor: 'pointer',
		bottom: 0,
	},
	cardTitle: {
		fontWeight: 600,
	},
	homeworkCard: {
		borderRadius: '10px',
		minHeight: '100%',
		boxShadow: 'none',
		'& .0': {
			color: 'red',

			backgroundColor: '#F7DDCC',
		},
	},
	1: {
		color: 'red',
		backgroundColor: '#F8E7C1 !important',
	},
	2: {
		backgroundColor: '#D4DbD8',
	},
	CardContent: {
		padding: '0 0 0 10px !important',
		margin: '10px 0 0 0',
		height: '345px',
		overflow: 'auto',
		'&::-webkit-scrollbar': {
			width: '0.4em',
		},
		'&::-webkit-scrollbar-track': {
			'-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.2)',
			outline: 'none',
			borderRadius: '5px',
		},
		'&::-webkit-scrollbar-thumb': {
			backgroundColor: `${theme.palette.primary.main}`,
			borderRadius: '5px',
		},
		'& .homeworkContentDiv': {
			marginTop: '10px',
		},
	},
	viewAnnouncement: {
		cursor: 'pointer',
	},
	homeworkContentStyle: {
		cursor: 'pointer',
	},
	announcementCard: {
		boxShadow: 'none',
	},
	loading: {
		width: '100%',
		textAlign: 'center',
		padding: '50px 0px',
		fontSize: '20px',
	},
	emptyView: {
		width: '100%',
		textAlign: 'center',
		padding: '50px 0px',
		fontSize: '20px',
	},
}))

const Homework = (props) => {
	const classes = useStyle()
	const history = useHistory()
	const [announcements, setAnnouncements] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		let isAnnouncementsLoading = true
		const fetchData = async () => {
			try {
				const token = localStorage.getItem('srmToken')
				const response = await HomeSerivce.fetchTeacherAnnouncement(
					token,
					props.selectedRole
				)
				setLoading(false)
				if (response.status === 200) {
					if (isAnnouncementsLoading) {
						setAnnouncements(response.data.data.data)
					}
				}
			} catch (e) {
				setLoading(false)
				console.log(e)
			}
		}
		fetchData()
		return () => {
			isAnnouncementsLoading = false
		}
	}, [])

	const handleCreateAnnouncement = async () => {
		try {
			const token = localStorage.getItem('srmToken')
			const response = await HomeSerivce.createAnnouncement(token)
			history.push(`/create-announcement/${response.data.news_id}`)
		} catch (e) {
			console.log(e)
		}
	}

	const handleViewAnnouncement = (event, id) => {
		history.push(`/news/${id}`)
	}

	return (
		<>
			<div className={classes.homeworkDiv}>
				<div className={classes.homeworkheader}>
					<Typography className={classes.title} variant='body1'>
						<img
							src={taskBookIcon}
							alt='Announcements Icon'
							className={classes.homeworkIcon}
						/>
						<span className={classes.titleName}>
							&nbsp;{Lang.HOME.ANNOUNCEMENTS}
						</span>
						<AddCircleRoundedIcon
							color='primary'
							className={classes.addhomeworkIcon}
							onClick={handleCreateAnnouncement}
						/>
					</Typography>
				</div>
				<div className={classes.homeworks}>
					<Card className={classes.announcementCard}>
						<CardContent>
							{announcements.map((announcement, index) => {
								if (index < 3) {
									return (
										<div key={index}>
											<div
												className={classes.viewAnnouncement}
												onClick={(event) =>
													handleViewAnnouncement(event, announcement.id)
												}
											>
												<Typography variant='body1'>
													{announcement.title ? announcement.title : 'N/A'}
												</Typography>
												<Typography variant='body2'>
													{announcement.summary ? announcement.summary : 'N/A'}
												</Typography>
											</div>
											{index === announcements.length - 1 ? '' : <hr />}
										</div>
									)
								}
							})}
							{loading ? (
								<div className={classes.loading}>
									<CircularProgress color='primary' size={30} />
								</div>
							) : null}
							{!loading && !announcements.length ? (
								<div className={classes.emptyView}>
									<Typography>You don't have any announcement.</Typography>
								</div>
							) : null}
						</CardContent>
					</Card>
				</div>

				<br />
				<br />
				<br />
				<br />
			</div>
		</>
	)
}

const mapStateToProps = (state) => {
	return {
		selectedRole: state.auth.selectedRole,
	}
}

export default connect(mapStateToProps)(Homework)
