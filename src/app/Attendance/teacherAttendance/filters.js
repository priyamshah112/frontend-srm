import React from 'react'
import { Grid, FormControl } from '@material-ui/core'
import SubjectsDropdown from '../../common/ui/subjectsDropdown'
import ClassesDropdown from '../../common/ui/classesDropdown'
import { makeStyles } from '@material-ui/core/styles'
import ImportExport from './importExport'

const useStyles = makeStyles((theme) => ({
	topPanelRow: {
		marginTop: '20px',
	},
	panelCol: {
		width: '100%',
	},

	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	topButton: {
		float: 'right',
		padding: '0px 20px 0px 0px',
	},
	menuButton: {
		margin: '5px',
	},
}))

const AttendanceFilter = (props) => {
	const classes = useStyles()

	return (
		<Grid container className={classes.topPanelRow}>
			<Grid item xs={12} className={classes.panelCol}>
				<FormControl className={classes.formControl}>
					<ClassesDropdown onChange={props.setClassId} value={props.class_id} />
				</FormControl>
				<FormControl className={classes.formControl}>
					<SubjectsDropdown
						value={props.subject_id}
						onChange={props.setSubjectId}
						class_id={props.class_id}
					/>
				</FormControl>
				<ImportExport {...props} />
			</Grid>
		</Grid>
	)
}

export default AttendanceFilter
