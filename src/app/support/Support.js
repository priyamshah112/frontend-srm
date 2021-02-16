import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { connect } from 'react-redux'
import ParentSupport from './parent/ParentSupport'

const useStyles = makeStyles((theme) => ({
	container: {
		width: '100%',
		backgroundColor: theme.palette.mainBackground,
		height: '100%',
		padding: '0',
		overflowY: 'auto',
		'&::-webkit-scrollbar': {
			width: 0,
		},
	},
	supportContainer: {
		width: '100%',
		margin: '0 20px',
	},
}))
const Support = (props) => {
	const classes = useStyles()
	return (
		<div className={classes.container}>
			<ParentSupport />
			<br />
			<br />
			<br />
			<br />
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		selectedRole: state.auth.selectedRole,
	}
}

export default connect(mapStateToProps)(Support)
