import React,{ useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

const useStyle = makeStyles((theme) => ({
	categoryClass: {
		'minWidth':'200px',
		fontSize: '14px',
		fontFamily: 'Avenir Book',
		'& span': {
			textAlign: 'left',
		},
	},

	categorySelect: {
		textAlign: 'left',
		fontSize: '14px',
		fontFamily: 'Avenir Book',
	},
}))

const Dropdown = (props) => {
	const { data, loading } = props
	const classes = useStyle()
	const handleOptionChange = (e) => {
		props.onChange(e.target.value)
	}
	const renderData = () =>
		data.map((item) => <MenuItem value={item.id} className={classes.categorySelect}>{item.name}</MenuItem>)

	return (
		<Select
			labelId='item'
			id='demo-simple-select-helper'
			value={props.value}
			onChange={handleOptionChange}
			className={classes.categoryClass}
		>
			<MenuItem className={classes.categorySelect} value={props.initialValue} disabled>{props.initialValue}</MenuItem>
			{loading ? (
				<MenuItem disabled value=''>
					Loading...
				</MenuItem>
			) : null}
			{loading ? null : renderData()}
		</Select>
	)
}

export default Dropdown;
