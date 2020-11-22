import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { connect } from 'react-redux'
import ParentNotifications from './parent/ParentNotifications'
import TeacherNotifications from './teacher/TeacherNotifications'

const useStyles = makeStyles((theme) => ({
	notificationRoot: {
		height: '100%',
	},
}))

const Notification = (props) => {
	const classes = useStyles()
	const selectedRole = JSON.parse(localStorage.getItem('srmSelectedRole'))

	return (
		<div className={classes.notificationRoot}>
			{selectedRole === 'teacher' || selectedRole === 'admin' ? (
				<TeacherNotifications />
			) : (
				<ParentNotifications />
			)}
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		selectedRole: state.auth.selectedRole,
		token: state.auth.token,
	}
}
export default connect(mapStateToProps)(Notification)
