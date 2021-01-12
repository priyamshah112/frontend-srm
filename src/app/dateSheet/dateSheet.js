import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { connect } from 'react-redux'
import TeacherDateSheet from './teacher/teacherDateSheet'
import StudentDateSheet from './students/studentDateSheet'
const useStyles = makeStyles((theme) => ({
	container: {
		width: '100%',
		backgroundColor: theme.palette.mainBackground,
		height: '100%',
		marign: '0',
		padding: '0',
		overflow: 'auto',
	},
}))

const DateSheet = (props) => {
	const classes = useStyles()
	const selectedRole = props.selectedRole

	return (
		<div className={classes.container}>
			{selectedRole === 'teacher' || selectedRole === 'admin' ? (
				<TeacherDateSheet />
			) : (
				''
			)}
			{selectedRole === 'student' || selectedRole === 'parent' ? (
				<StudentDateSheet />
			) : (
				''
			)}
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		selectedRole: state.auth.selectedRole,
	}
}

export default connect(mapStateToProps)(DateSheet)
