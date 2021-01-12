import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

const useStyle = makeStyles((theme) => ({
	categoryClass: {
		'minWidth':'200px',
		'& span': {
			textAlign: 'left',
		},
	},

	categorySelect: {
		textAlign: 'left',
	},
}))

const Dropdown = (props) => {
	const { data, loading } = props
	const classes = useStyle()
	const handleOptionChange = (event) => {
		props.onChange(event.target.value)
	}

	const renderData = () =>
		data.map((item) => <MenuItem value={item.id}>{item.name}</MenuItem>)

	return (
		<Select
			labelId='item'
			id='demo-simple-select-helper'
			value={props.value}
			onChange={handleOptionChange}
			className={classes.categoryClass}
			classes={{ select: classes.categorySelect }}
		>
			{loading ? (
				<MenuItem disabled value=''>
					Loading...
				</MenuItem>
			) : <MenuItem value={props.initialValue}>{props.initialValue}</MenuItem>}
			{loading ? null : renderData()}
		</Select>
	)
}

export default Dropdown;
