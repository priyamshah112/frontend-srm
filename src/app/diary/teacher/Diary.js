import 'date-fns'
import React, { useState, useEffect } from 'react'
import AddIcon from '../../../assets/images/Filled Add.svg'
import MenuItem from '@material-ui/core/MenuItem'
import { IconButton, Typography, makeStyles } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import TabBar from '../TabBar'
import NewDiaryEntry from './NewDiaryEntry'

const useStyles = makeStyles((theme) => ({
	datePicker: {
		width: '25%',
		paddingRight: '10px',
	},
	sectionContainer: {
		height: '100%',
		width: '100%',
	},
	formControl: {
		marginTop: '15px',
		marginRight: '15px',
		width: '169px',
	},

	header: {
		position: 'relative',
		display: 'flex',
		flexDirection: 'row',
		paddingRight: '15px',
		paddingLeft: '15px',
		paddingTop: '10px',
		textAlign: 'left',
	},
	cardBoxPadding: {
		padding: '0px 24px 24px 24px',
		[theme.breakpoints.down('sm')]: {
			padding: '16px',
		},
	},
	addNew: {
		color: theme.palette.common.deluge,
		position: 'absolute',
		right: 0,
		marginTop: '15px',
		marginRight: '15px',
		cursor: 'pointer',
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
	loading: {
		width: '100%',
		textAlign: 'center',
		paddingTop: '8px',
		fontSize: '20px',
	},
	iconButtonRoot: {
		padding: '8px',
	},
	menuContainer: {
		backgroundColor: theme.palette.common.darkGray,
		color: 'black',
		minWidth: '150px',
		'&.MuiPaper-rounded': {
			boxShadow: '0px 6px 6px #00000029',
		},
		[theme.breakpoints.down('md')]: {
			minWidth: '150px',
		},
		[theme.breakpoints.down('sm')]: {
			minWidth: '150px',
		},
	},
	menuList: {
		width: '100% !important',
		padding: 0,
	},
	menuItemRoot: {
		padding: 0,
	},
	menuItem: {
		paddingLeft: '10px',
		paddingRight: '10px',
		colour: '#1C1C1E',
	},
	menuTopItemMargin: {
		marginTop: '5px',
	},
	borderBottomDiv: {
		width: '90%',
		height: '30px',
		margin: 'auto',
		marginTop: '5px',
		borderBottom: '1px solid #D1D1D6',
	},
	borderBottomLastDiv: {
		width: '90%',
		height: '30px',
		margin: 'auto',
		marginTop: '5px',
	},
}))

export default function Home(props) {
	const classes = useStyles()
	const [anchorEl, setAnchorEl] = useState(null)
	const [menuVal, setMenuVal] = useState('General Diary Entry')
	const [open, setOpen] = useState(false)

	const handleClose = (event) => {
		const updatedStatus = event.currentTarget.getAttribute('value')
		setAnchorEl(null)
	}
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}
	const handleMenuChange = (e) => {
		setMenuVal(e.target.value)
	}

	const handleNew = () => {
		setOpen(true)
	}

	return (
		<>
			{open ? (
				<NewDiaryEntry />
			) : (
				<div className={classes.sectionContainer}>
					<TabBar />
					<div className={classes.header}>
						<div style={{ zIndex: '1' }}>
							<FormControl className={classes.formControl}>
								<Select
									labelId='demo-simple-select-label'
									id='demo-simple-select'
									value={menuVal}
									onChange={handleMenuChange}
									classes={{
										paper: classes.menuContainer,
										list: classes.menuList,
									}}
								>
									<MenuItem value='General Diary Entry'>
										General Diary Entry
									</MenuItem>
									<MenuItem value='Teacher Observation'>
										Teacher Observation
									</MenuItem>
									<MenuItem value='Late Coming'>Late Coming</MenuItem>
								</Select>
							</FormControl>
						</div>
						<div className={classes.addNew} onClick={handleNew}>
							<img src={AddIcon} alt='add' />
							<Typography className='new'>New</Typography>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
