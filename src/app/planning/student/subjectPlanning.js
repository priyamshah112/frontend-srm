import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(() => ({
	tableCell: {
		borderLeft: '1px solid rgba(224, 224, 224, 1)',
	},
	title:{
		fontSize: '0.9rem',
		fontWeight: 'bold',
	},
	typography: {
		'white-space': 'pre-wrap',
	},
	div: {
		display: 'flex',
		alignItems: 'center',
	},
	grid: {
		paddingBottom: 20,
	},
	button: {
		width: '70%',
	},
}))

const SubjectPlanning = (props) => {
	const classes = useStyles()
	const {planningDetails,title,get_by} = props
	let content = planningDetails.map((row, index) => {
		return (
			<TableRow key={index}>
				<TableCell align='left' width='65%' className={classes.tableCell}>
					<Typography variant='h6' component="h2" className={classes.title} gutterBottom>
						{get_by === 'subject'? row.month.name+" - "+row.term_plan.name :null}
						{get_by === 'term' || get_by === 'month'  ? row.subject_planning_classes.name :null}
					</Typography>
					<Typography
						variant='subtitle1'
						className={classes.typography}
						gutterBottom
					>
						{row.chapters}
					</Typography>
				</TableCell>
			</TableRow>
		)
	})

	const fetchPlanning = () => {
		if (planningDetails.length > 0) {
			return (
				<TableContainer>					
					<Table aria-label='spanning table'>
						<TableHead>
							<TableRow>
								<TableCell
									align='center'
									width='100%'
									colSpan={2}
									className={classes.tableCell}
								>
									<Typography variant='subtitle1'>
										<b>{title}</b>
									</Typography>
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>{content}</TableBody>
					</Table>
				</TableContainer>
			)
		} else {
			return (
				<div>
					<Table aria-label='spanning table'>
						<TableHead>
							<TableRow>
								<TableCell
									align='center'
									width='100%'
									className={classes.tableCell}
								>
									<Typography variant='subtitle1'>
										<b>{title}</b>
									</Typography>
								</TableCell>
							</TableRow>
						</TableHead>					
						<TableBody>
							<TableRow>
								<TableCell align='left' width='65%' className={classes.tableCell}>
									<Typography
										variant='subtitle1'
										className={classes.typography}
										gutterBottom
									>
										No Chapters
									</Typography>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</div>
			)
		}
	}
	const tableData = fetchPlanning()

	return tableData
}
export default SubjectPlanning

