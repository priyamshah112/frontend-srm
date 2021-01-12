import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { makeStyles } from '@material-ui/core'
import Box from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
	sectionContainer: {
		height: '100%',
		width: '100%',
	},
	tabBar: {
		backgroundColor: theme.palette.mainBackground,
		color: theme.palette.common.deluge,
		boxShadow: 'none',
	},
	eventsTab: {
		padding: '6px 0px',
		borderBottom: '1px solid #aeaeb2',

		'& .MuiTab-wrapper': {
			height: '30px',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '11px',
		},
	},
	borderRight: {
		'& .MuiTab-wrapper': {
			borderRight: '1px solid  #aeaeb2',
		},
	},
}))

function TabPanel(props) {
	const { children, value, index, ...other } = props

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			{value === index && <Box p={4}>{children}</Box>}
		</div>
	)
}

function a11yProps(index) {
	return {
		id: `full-width-tab-${index}`,
		'aria-controls': `full-width-tabpanel-${index}`,
	}
}

export default function TabBar() {
	const classes = useStyles()

	const [value, setValue] = useState(0)

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}
	return (
		<div>
			<AppBar position='sticky' className={classes.tabBar}>
				<Tabs
					centered
					value={value}
					onChange={handleChange}
					indicatorColor='primary'
					textColor='primary'
					variant='fullWidth'
				>
					<Tab
						label='By me'
						{...a11yProps(0)}
						className={`${classes.eventsTab} ${classes.borderRight}`}
					/>
					<Tab label='For me' {...a11yProps(1)} className={classes.eventsTab} />
				</Tabs>
			</AppBar>
		</div>
	)
}
