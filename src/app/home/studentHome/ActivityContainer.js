import React, { useState, useRef } from 'react'
import { makeStyles } from '@material-ui/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import Announcements from './Announcements'
import Homeworks from './homeWork/Homeworks'

function ElevationScroll(props) {
	const { children } = props

	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
	})

	return React.cloneElement(children, {
		elevation: trigger ? 4 : 0,
	})
}

const useStyles = makeStyles((theme) => ({
	container: {
		width: '100%',
		backgroundColor: theme.palette.mainBackground,
		height: '100%',
		marign: '0',
		padding: '0',
		overflow: 'auto',

		'&::-webkit-scrollbar': {
			width: 0,
		},
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
			{value === index && <Box p={3}>{children}</Box>}
		</div>
	)
}

function a11yProps(index) {
	return {
		id: `full-width-tab-${index}`,
		'aria-controls': `full-width-tabpanel-${index}`,
	}
}

const ActivityContainer = (props) => {
	const classes = useStyles()
	const [value, setValue] = useState(0)

	const tabref = useRef(null)

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	return (
		<div className={classes.container} ref={tabref} id='scrollable'>
			<AppBar position='sticky' className={classes.tabBar}>
				<Tabs
					centered
					value={value}
					onChange={handleChange}
					indicatorColor='primary'
					textColor='primary'
					variant='fullWidth'
					className={classes.tabs}
				>
					<Tab
						label='Events/Announcements'
						{...a11yProps(0)}
						className={`${classes.eventsTab} ${classes.borderRight}`}
					/>
					<Tab
						label='Homework'
						{...a11yProps(1)}
						className={classes.eventsTab}
					/>
				</Tabs>
			</AppBar>
			<TabPanel value={value} index={0}>
				<Announcements />
				<br />
				<br />
				<br />
			</TabPanel>

			<TabPanel value={value} index={1}>
				<Homeworks />
				<br />
				<br />
				<br />
			</TabPanel>
		</div>
	)
}

export default ActivityContainer
