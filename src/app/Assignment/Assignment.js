import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import HomeworkSection from './teacher/HomeworkSection'
import Box from '@material-ui/core/Grid'
import CreateHomework from './teacher/CreateHomework'
import StudentHomework from './student/HomeworkSection'

const useStyles = makeStyles((theme) => ({
	container: {
		width: '100%',
		backgroundColor: theme.palette.mainBackground,
		height: '100%',
		marign: '0',
		padding: '0',
		overflowY: 'auto',
		'&::-webkit-scrollbar': {
			display: 'none',
		},
	},
	content: {
		flexGrow: '1',
		display: 'flex',
		flexDirection: 'column',
		minHeight: '0',
		padding: '0 20px 20px 20px',
	},
	studentDiv: {
		width: '95%',
		margin: 'auto',
	},
	panel: {
		flexGrow: '1',
		overflow: 'auto',
		minHeight: '100%',
		scrollbarWidth: 'none',
		'&::-webkit-scrollbar': {
			display: 'none',
		},
	},
}))

const Homework = (props) => {
	const classes = useStyles()
	const location = useLocation()
	const { id } = useParams()
	const selectedRole = props.selectedRole

	return (
		<div className={classes.container} id='scrollable'>
			{location.pathname === '/assignment' ? (
				selectedRole === 'student' || selectedRole === 'parent' ? 
					<StudentHomework />
				: <HomeworkSection />
			) : location.pathname === `/create-homework/${id}` &&
				<Box p={3}>
					<CreateHomework />
					<br />
					<br />
					<br />
				</Box>
			}
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		token: state.auth.token,
		selectedRole: state.auth.selectedRole,
	}
}

export default connect(mapStateToProps)(Homework)
