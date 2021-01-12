import React, { useState, useEffect } from 'react'
import { IconButton } from '@material-ui/core'
import PlanningService from '../PlanningService'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import { useHistory } from 'react-router-dom'
import CreateTwoToneIcon from '@material-ui/icons/CreateTwoTone'
import Delete from '@material-ui/icons/Delete'
import { makeStyles } from '@material-ui/styles'
import EditIcon from '../../../assets/images/Edit.svg'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'

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
		float: 'right',
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
	const history = useHistory()
	const {planningDetails,title,get_by} = props
	const [open, setOpen] = useState(false)
	const [planningID,setPlanningID] = useState(null)
	// console.log("PlanningDetail",props)
	const handleDailogClickOpen = () => {
		setOpen(true)
	}
	const deleteRow = async () => {
		try {
			const token = localStorage.getItem('srmToken')
			const response = await PlanningService.deletePlanning(token,planningID)
			if (response.status === 200) {
				console.log('deleted')
			}
		} catch (e) {
			console.log(e)
		}		
		history.push({pathname:`/planning`,state: {
			'classListUi': true,
			'classID': props.class_id,
			'classDetail' : props.class_detail,
		}})
	}
	const handleCloseNO = () => {
		setOpen(false)
	}
	const handleCloseYES = () => {
		deleteRow(planningID)
		setOpen(false)
	}
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
				<TableCell align='left' width='20%'>
					<div className={classes.div}>
						<IconButton
							aria-label='edit'
							onClick={(event) => {
								history.push({pathname:`/create-planning/${row.id}`,state:{
									'class_id': props.class_id,
									'class_detail': props.class_detail,
								}})
							}}
						>
							<CreateTwoToneIcon color='primary' />
						</IconButton>
						<IconButton
							aria-label='delete'
							onClick={(event) => {
								setPlanningID(row.id)
								handleDailogClickOpen()
							}}
						>
							<Delete color='primary' />
						</IconButton>
					</div>
				</TableCell>
			</TableRow>
		)
	})

	const fetchPlanning = () => {
		if (planningDetails.length > 0) {
			return (
				<TableContainer>
					
					<Dialog
						open={open}
						onClose={handleCloseNO}
						aria-labelledby='alert-dialog-title'
						aria-describedby='alert-dialog-description'
					>
						<DialogTitle id='alert-dialog-title'>
							{'Are you sure you want to delete?'}
						</DialogTitle>
						<DialogActions>
							<Button onClick={handleCloseNO} color='primary' autoFocus>
								NO
							</Button>
							<Button onClick={handleCloseYES} color='primary'>
								YES
							</Button>
						</DialogActions>
					</Dialog>
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

