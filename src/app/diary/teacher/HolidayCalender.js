import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid, FormControl } from '@material-ui/core'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import HolidayCard from './HolidayCard'

const useStyles = makeStyles((theme) => ({
	container: {
		margin: '15px',
	},
	sectionContainer: {
		height: '100%',
		width: '100%',
	},
	header: {
		display: 'inline block',
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
		width: '25%',
	},
	head: {
		margin: '20px',
		position: 'relative',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		// backgroundColor: 'red',
	},
	heading1: {
		fontSize: '18px',
		fontFamily: 'Avenir medium',
		textAlign: 'center',
	},
	heading: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		textAlign: 'center',
		fontFamily: 'Avenir',
	},
	menuItem: {
		paddingLeft: '5px',
	},
	monthsLabel: {
		fontSize: '14px',
		fontFamily: 'Avenir heavy',
		margin: '10px',
		textTransform: 'capitalize',
	},
}))

export default function HolidayCalendrer(props) {
	const classes = useStyles()
	const [months, setMonths] = useState('all')

	const handleChange = (event) => {
		setMonths(event.target.value)
	}

	return (
		<>
			<div className={classes.container}>
				<div className={classes.head}>
					<div className={classes.heading}>
						<span className={classes.heading1}>Holidays</span>
					</div>
				</div>

				<div className={classes.sectionContainer}>
					<div className={classes.header}>
						<div className={classes.filterForm}>
							<FormControl className={classes.formControl}>
								<Select
									labelId='demo-simple-select-label'
									id='demo-simple-select'
									value={months}
									className={classes.menuItem}
									onChange={handleChange}
								>
									<MenuItem value='all'>All</MenuItem>
									<MenuItem value='january'>January</MenuItem>
									<MenuItem value='february'>February</MenuItem>
									<MenuItem value='march'>March</MenuItem>
									<MenuItem value='april'>April</MenuItem>
									<MenuItem value='may'>May</MenuItem>
									<MenuItem value='june'>June</MenuItem>
									<MenuItem value='july'>July</MenuItem>
									<MenuItem value='august'>August</MenuItem>
									<MenuItem value='september'>September</MenuItem>
									<MenuItem value='october'>October</MenuItem>
									<MenuItem value='november'>November</MenuItem>
									<MenuItem value='december'>December</MenuItem>
								</Select>
							</FormControl>
							<div className={classes.monthsLabel}>{months}</div>
						</div>
					</div>
				</div>
				<HolidayCard />
			</div>
		</>
	)
}
