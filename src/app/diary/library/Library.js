import 'date-fns'
import React, { useState, useEffect } from 'react'
import AddIcon from '../../../assets/images/Filled Add.svg'
import MenuItem from '@material-ui/core/MenuItem'
import { IconButton, Typography, makeStyles } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import AddBook from './AddBook'
import LibraryCard from './LibraryCard'

const useStyles = makeStyles((theme) => ({
	sectionContainer: {
		height: '100%',
		width: '100%',
	},
	header: {
		position: 'relative',
		display: 'flex',
		flexDirection: 'row',
		paddingRight: '15px',
		paddingLeft: '15px',
		paddingTop: '10px',
		textAlign: 'left',
		justifyContent: 'center',
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
	themeColor: {
		// color: `${theme.palette.common.deluge}`,
		padding: 0,
		marginTop: '15px',
	},
	titleText: {
		fontFamily: 'Avenir Medium',
		// fontize: '1rem',
		fontSize: 18,
		color: '#1C1C1E',
	},
}))

export default function Library(props) {
	const classes = useStyles()
	const [open, setOpen] = useState(false)

	const handleAddBook = () => {
		setOpen(!open)
	}

	return (
		<>
			{open ? (
				<AddBook close={handleAddBook} />
			) : (
				<div className={classes.sectionContainer}>
					<div className={classes.header}>
						<div style={{ zIndex: '1' }}>
							<Typography
								variant='h5'
								className={`${classes.themeColor} ${classes.titleText}`}
							>
								Library
							</Typography>
						</div>
						<div className={classes.addNew} onClick={handleAddBook}>
							<img src={AddIcon} alt='add' />
							<Typography className='new'>Add Book</Typography>
						</div>
					</div>
					<LibraryCard />
				</div>
			)}
		</>
	)
}
