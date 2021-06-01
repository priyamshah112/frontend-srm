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
	const { data, name, value, i } = props
	const classes = useStyle()
	const handleOptionChange = (event) => {
		props.onChange(event,i)
	}

	return (
		<Select
			labelId={props.labelId}
			id='demo-simple-select-helper'
			name={name}
			value={value}
			onChange={ e => handleOptionChange(e)}
			className={classes.categoryClass}
			classes={{ select: classes.categorySelect }}
		>   
            {
				data.map((item,index) => <MenuItem value={item.id} index={index}>{item.name}</MenuItem>)
			}
		</Select>
	)
}

export default Dropdown;
