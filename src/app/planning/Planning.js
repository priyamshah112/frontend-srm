import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { useLocation, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import Box from '@material-ui/core/Grid'
import TeacherPlanning from './teacher/classDropDownList'
import StudentPlanning from './student/StudentPlanningContainer'
import BackdropLoader from '../common/ui/backdropLoader/BackdropLoader'
import CreatePlanning from './teacher/createPlanning'

const useStyles = makeStyles((theme) => ({
	container: {
		width: '100%',
		backgroundColor: theme.palette.mainBackground,
		height: '100%',
		margin: '0',
		padding: '0',
		overflowY: 'auto',
	},
}))

const Planning = (props) => {
	const classes = useStyles()
	const location = useLocation()
	const params = useParams()
	const [classState, setClassState] = useState(null)
	const [isLoading,setIsLoading] = useState(false)
	const [openLoader, setOpenLoader] = useState(false)
	const selectedRole = props.selectedRole
	return (
		<div className={classes.container}>
			{location.pathname === '/planning' ? (
				selectedRole === 'parent' || selectedRole === 'student' ? (
					<StudentPlanning />
				) : (
					<TeacherPlanning back={location.state} />
				)
			): location.pathname === `/create-planning/${params.id}` &&
				isLoading === false ? (
				<Box p={3}>
					<CreatePlanning/>
					<br />
					<br />
					<br />
				</Box>
			) : (
				<BackdropLoader open={isLoading} />
			)}
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		selectedRole: state.auth.selectedRole,
	}
}

export default connect(mapStateToProps)(Planning)
