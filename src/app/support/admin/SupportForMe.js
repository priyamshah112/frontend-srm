import React from 'react'
import { makeStyles } from '@material-ui/styles'
import SupportCard from '../SupportCard'

const useStyles = makeStyles((theme) => ({
	container: {
		width: '100%',
		backgroundColor: theme.palette.mainBackground,
		height: '100%',
		marign: '0',
		padding: '0',
		overflowY: 'auto',
		'&::-webkit-scrollbar': {
			width: 0,
		},
	},
	supportContainer: {
		width: '95%',
		margin: '0 auto',
	},
}))

const SupportForMe = (props) => {
	const classes = useStyles()
	return (
		<>
			<div className={classes.supportContainer}>
				<SupportCard />
			</div>
		</>
	)
}

export default SupportForMe
