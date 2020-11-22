import React, { useEffect } from 'react'
import { getClasses } from '../../../redux/actions/attendence.action'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

const useStyle = makeStyles((theme) => ({
	categoryClass: {
		'& span': {
			textAlign: 'left',
		},
	},

	categorySelect: {
		textAlign: 'left',
	},
}))

const ClassesDropdown = (props) => {
	const { data = [], loading } = props
	const classes = useStyle()

	useEffect(() => {
		fetchData()
	}, [])

	useEffect(() => {
		if (data.length && !props.value) {
			props.onChange(data[0].id)
		}
	}, [loading])

	const fetchData = () => {
		props.getClasses()
	}

	const handleClassChange = (event) => {
		props.onChange && props.onChange(event.target.value)
	}

	const renderData = () =>
		data.map((item) => <MenuItem value={item.id}>{item.class_name}</MenuItem>)

	return (
		<Select
			labelId='Categories'
			id='demo-simple-select-helper'
			value={props.value}
			onChange={handleClassChange}
			className={classes.categoryClass}
			classes={{ select: classes.categorySelect }}
		>
			{loading ? (
				<MenuItem disabled value=''>
					Loading...
				</MenuItem>
			) : null}
			{renderData()}
		</Select>
	)
}

const mapStateToProps = ({ Attendence }) => {
	const { classes = [], classesLoading } = Attendence
	return {
		data: classes,
		loading: classesLoading,
	}
}

export default connect(mapStateToProps, { getClasses })(ClassesDropdown)
