import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import { getCategory } from '../../redux/actions/support.action'

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

const SelectCategory = (props) => {
	const { data = [], loading } = props

	const classes = useStyle()
	useEffect(() => {
		fetchData()
	}, [])

	const fetchData = () => {
		props.getCategory()
	}

	const handleCategoryChange = (event) => {
		props.onChange && props.onChange(event.target.value)
	}

	const renderData = () =>
		data.map((item) => (
			<MenuItem value={item.id}>{item.category_name}</MenuItem>
		))

	return (
		<>
			<Select
				labelId='Categories'
				id='demo-simple-select-helper'
				value={props.value}
				onChange={handleCategoryChange}
				className={classes.categoryClass}
				classes={{ select: classes.categorySelect }}
			>
				{renderData()}
			</Select>
		</>
	)
}

const mapStateToProps = ({ Supports }) => {
	const { categories = [], categoryLoading } = Supports
	return {
		data: categories,
		loading: categoryLoading,
	}
}

export default connect(mapStateToProps, { getCategory })(SelectCategory)
