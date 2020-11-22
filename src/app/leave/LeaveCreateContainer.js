import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import TeacherLeave from './teacher/TeacherLeaveApply'
import StudentFLeave from './student/StudentLeaveApply'

const useStyles = makeStyles((theme) => ({
	container: {
		width: '100%',
		height: '100%',
		backgroundColor: theme.palette.mainBackground,
		margin: 0,
		padding: 0,
	},
}))

const LeaveCreateContainer = (props) => {
	const classes = useStyles()
	const selectedRole = props.selectedRole
	return (
		<>
			<div className={classes.container}>
				{selectedRole === 'teacher' || selectedRole === 'admin' ? (
					<TeacherLeave />
				) : (
					''
				)}

				{selectedRole === 'student' ? <StudentFLeave /> : ''}
			</div>
		</>
	)
}

const mapStateToProps = (state) => {
	return {
		selectedRole: state.auth.selectedRole,
	}
}

export default connect(mapStateToProps)(LeaveCreateContainer)
