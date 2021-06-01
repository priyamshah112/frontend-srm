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

const DropdownCS = (props) => {
	const { data, loading, initialValue, value, makeDisable, labelId } = props
	const classes = useStyle()
	const handleOptionChange = (event) => {
		props.onChange(event.target.value)
	}

	const renderData = () =>
		data.map((item) => <MenuItem value={item.id}>{item.name ? item.name : item.class_name }</MenuItem>)

	return (
		<Select
			labelId={labelId ? labelId : 'item'}
			id='demo-simple-select-helper'
			value={value}
			onChange={handleOptionChange}
			className={classes.categoryClass}
			classes={{ select: classes.categorySelect }}
		>   
            {initialValue ? <MenuItem value={initialValue} disabled={makeDisable}>{initialValue}</MenuItem> : null }
			{loading ? (
				<MenuItem disabled value=''>
					Loading...
				</MenuItem>
			) : null}
			{loading ? null : renderData()}
		</Select>
	)
}

export default DropdownCS;
