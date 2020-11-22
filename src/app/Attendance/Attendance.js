import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import TeacherAttendanceContainer from './teacherAttendance/TeacherAttendanceContainer'
import ParentAttendanceContainer from './parentAttendance/ParentAttendanceContainer'

const useStyles = makeStyles((theme) => ({
	attendanceRoot: {
		height: '100%',
	},
}))

const Attendance = (props) => {
	const classes = useStyles()
	const selectedRole = props.selectedRole

	return (
		<div className={classes.attendanceRoot}>
			{selectedRole === 'teacher' || selectedRole === 'admin' ? (
				<TeacherAttendanceContainer />
			) : (
				<ParentAttendanceContainer />
			)}
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		selectedRole: state.auth.selectedRole,
	}
}

export default connect(mapStateToProps)(Attendance)
