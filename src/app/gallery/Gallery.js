import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { connect } from 'react-redux'
import TeacherGallery from './galleryTeacher'
import StudentGallery from './student'

const useStyles = makeStyles((theme) => ({
	homeRoot: {
		height: '100%',
		overflowY: 'hidden'
	},
}))

const Gallery = (props) => {
	const classes = useStyles()
	const selectedRole = props.selectedRole

	return (
		<div className={classes.homeRoot}>
			{selectedRole === 'teacher' || selectedRole === 'admin' ? (
				<TeacherGallery />
			) : (
				<StudentGallery />
			)}
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		selectedRole: state.auth.selectedRole,
	}
}
export default connect(mapStateToProps)(Gallery)
