import React from 'react'
import { makeStyles } from '@material-ui/styles'
import SupportCard from '../SupportCard'
import AddIcon from '../../../assets/images/Filled Add.svg'
import { Typography } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import AddCircleIcon from '@material-ui/icons/AddCircle'

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
	createHeader: {
		marginTop: '20px',
		textAlign: 'right',
		fontWeight: 500,
	},
	createTitle: {
		fontSize: '16px',
		padding: '0 10px 0 5px',
	},
	createButtonIcon: {
		height: '20px',
		transform: 'translateY(5px)',
		cursor: 'pointer',
	},
	header: {
		paddingLeft: '15px',
		paddingTop: '10px',
		textAlign: 'right',
	},
	addNew: {
		color: theme.palette.common.deluge,
		marginTop: '15px',
		'& .new': {
			float: 'right',
			fontSize: '14px',
			padding: '5px',
		},
		'& img': {
			margin: '5px',
			height: '20px',
			cursor: 'pointer',
		},
	},

	addNewDiv: {
		cursor: 'pointer',
		width: 'fit-content',
		marginLeft: 'auto',
	},
	loading: {
		width: '100%',
		textAlign: 'center',
		paddingTop: '8px',
		fontSize: '20px',
	},
}))

const SupportByMe = (props) => {
	const classes = useStyles()
	const history = useHistory()
	const handleCreateNew = (event) => {
		history.push('/support/create')
	}

	return (
		<>
			<div className={classes.supportContainer}>
				{/* <div className={classes.header}> */}
				<Typography className={classes.createHeader} color='primary'>
					<AddCircleIcon
						color='primary'
						className={classes.createButtonIcon}
						onClick={handleCreateNew}
					/>
					<span className={classes.createTitle} onClick={handleCreateNew}>
						New
					</span>
				</Typography>
				{/* <div className={classes.addNew}>
						<div onClick={handleCreateNew} className={classes.addNewDiv}>
							<img src={AddIcon} alt='add' />
							<Typography className='new'>New</Typography>
						</div>
					</div> */}
				{/* </div> */}
				<SupportCard />
			</div>
		</>
	)
}

export default SupportByMe
