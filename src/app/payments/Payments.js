import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { AppBar, Tabs, Tab, Box } from '@material-ui/core'
import PaymentSection from './PaymentsSection'

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
			{value === index && <Box>{children}</Box>}
		</div>
	)
}

function a11yProps(index) {
	return {
		id: `full-width-tab-${index}`,
		'aria-controls': `full-width-tabpanel-${index}`,
	}
}

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

	eventsTab: {
		padding: '6px 0',
		borderBottom: '1px solid #aeaeb2',

		'@media (min-width: 600px)': {
			minWidth: '100px',
		},
		'& .MuiTab-wrapper': {
			height: '30px',
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '11px',
		},
	},
	tabBar: {
		backgroundColor: theme.palette.mainBackground,
		color: theme.palette.common.deluge,
		boxShadow: 'none',
	},
	borderRight: {
		'& .MuiTab-wrapper': {
			borderRight: '1px solid  #aeaeb2',
		},
	},
}))
const Payments = () => {
	const classes = useStyles()
	const [value, setValue] = useState(0)

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}
	return (
		<div className={classes.container}>
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
						label='all'
						{...a11yProps(0)}
						className={`${classes.eventsTab} ${classes.borderRight}`}
					/>
					<Tab
						label='open'
						{...a11yProps(1)}
						className={`${classes.eventsTab} ${classes.borderRight}`}
					/>
					<Tab label='close' {...a11yProps(2)} className={classes.eventsTab} />
				</Tabs>
			</AppBar>
			<TabPanel value={value} index={0}>
				<PaymentSection key={0} />
			</TabPanel>
			<TabPanel value={value} index={1}>
				<PaymentSection key={1} filter={0} />
			</TabPanel>
			<TabPanel value={value} index={2}>
				<PaymentSection key={2} filter={1} />
			</TabPanel>
		</div>
	)
}

export default Payments
