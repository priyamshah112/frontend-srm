import React, { useState } from 'react'
import { connect } from 'react-redux'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/styles'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import NotificationService from '../../notification/NotificationService'

const AutoComplete = withStyles({
	option: {
		'&.MuiAutocomplete-option': {
			borderColor: 'purple',
			borderBottom: '1px solid #d3d3d3',
		},
	},
	listbox: {
		'&.MuiAutocomplete-listbox': {
			padding: '0px',
		},
	},
})(Autocomplete)

const useStyle = makeStyles((theme) => ({
	searchContainer: {
		height: '80%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		[theme.breakpoints.down('xs')]: {
			marginTop: '10px',
		},
	},
	fieldStyle: {
		width: '50%',
		margin: 'auto',
		'& .MuiInput-underline:before': {
			borderBottom: '2px solid #eaeaea',
		},
		'& .MuiInput-underline:hover:not(.Mui-disabled):before': {
			borderBottom: '2px solid #7B72AF',
			transitionProperty: 'border-bottom-color',
			transitionDuration: '500ms',
			transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
		},
	},
	optionContainer: {
		width: '100%',
	},
	className: {
		fontWeight: '300',
		fontSize: '15px',
		color: '#8E8E93',
	},
}))

const StudentSearch = (props) => {
	const classes = useStyle()
	const [searchData, setSearchData] = useState([])
	const [openUserSearch, setOpenUserSearch] = useState(false)
	const loadingUsers = openUserSearch && searchData.length === 0

	const suggestions = {
		options: searchData,
		getOptionLabel: (option) => option.username,
	}

	const fetchSearchAPI = async (event) => {
		if (event.target.value) {
			if (event.target.value && event.target.value.length % 2 === 0) {
				try {
					const response = await NotificationService.searchUser(
						event.target.value,
						props.token
					)
					const dataExits =
						response &&
						response.data &&
						response.data.data[0] &&
						response.data.data[0].roles[0]
					if (dataExits) {
						setSearchData([...response.data.data])
					}
				} catch (e) {
					console.log(e)
				}
			}
		}
	}

	const onChange = (value) => {
		if (value) {
			props.getSearch(value)
		}
	}

	const styleOptions = (option) => {
		if (
			option.roles &&
			option.roles.length !== 0 &&
			option.roles[0].name.toLowerCase() == 'student'
		) {
			return (
				<div className={classes.optionContainer}>
					<Typography className={classes.optionTitle}>
						{`${option.firstname} ${option.lastname} - ${option.roles[0].name}`}
					</Typography>
					{option.user_classes && option.user_classes.classes_data && (
						<Typography>
							<span className={classes.className}>
								{option.user_classes.classes_data.class_name}
							</span>
						</Typography>
					)}
					<Typography>
						<span className={classes.className}> {option.username}</span>
					</Typography>
				</div>
			)
		} else {
			return option.username
		}
	}

	return (
		<div className={classes.searchContainer}>
			<div className={classes.fieldStyle}>
				<AutoComplete
					{...suggestions}
					open={openUserSearch}
					onOpen={() => {
						setOpenUserSearch(true)
					}}
					onClose={() => {
						setOpenUserSearch(false)
					}}
					id='select-on-focus'
					loading={loadingUsers}
					selectOnFocus
					onInputChange={fetchSearchAPI}
					onChange={onChange}
					renderInput={(params) => (
						<TextField
							{...params}
							variant='standard'
							label='Search - Name / User ID'
						/>
					)}
					renderOption={(option) => styleOptions(option)}
				/>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		token: state.auth.token,
	}
}
export default connect(mapStateToProps)(StudentSearch)
