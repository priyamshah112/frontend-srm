import React, { useState, useEffect, Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Select from '@material-ui/core/Select'
import TimetableService from '../timeTableService'
import MenuItem from '@material-ui/core/MenuItem'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Container } from '@material-ui/core'
import ClassTestList from './ClassTestList'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'

const useStyles = makeStyles((theme) => ({
	loder: {
		display: 'flex',
		'& > * + *': {
			marginLeft: theme.spacing(2),
		},
		background: 'lightgrey',
		height: '100%',
	},
	textList: {
		position: '',
		marginTop: '30px',
	},
	container: {
		display: 'table-cell',
		textAlign: 'center',
		verticalAlign: 'middle',
	},
	grid: {
		display: 'table',
		height: '80vh',
		width: '100%',
		margin: 'auto',
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: '50%',
	},
	CircularProgress: {
		position: 'absolute',
		left: '50%',
		top: '50%',
		zIndex: '1',
	},
}))

const TeacherTimeTable = () => {
	const classes = useStyles()
	const token = localStorage.getItem('srmToken')
	const [classList, setClassList] = useState(null)
	const [isLoading, setLoading] = useState(true)
	const [classListUi, setClassListUi] = useState(false)
	const [classID, setClassID] = useState()
	const [classDetail, setClassDetail] = useState()

	const fetchClass = async (isMounted) => {
		const response = await TimetableService.getClass(token)

		if (response.status === 200) {
			const data = response.data.data
			setClassList(data)
			setLoading(false)
		}
	}
	useEffect((e) => {
		fetchClass()
	}, [])

	const clickMenuItem = (e, classid) => {
		e.preventDefault()
		setClassID(classid.id)
		setClassListUi(true)
		setClassDetail(classid.class_name)
	}

	return (
		<Fragment>
			{isLoading === true ? (
				<div className={classes.loder}>
					<CircularProgress
						color='primary'
						thickness={5}
						className={classes.CircularProgress}
					/>
				</div>
			) : (
				<div>
					{classListUi === false ? (
						<div className={classes.grid}>
							<div item className={classes.container}>
								<FormControl className={classes.formControl}>
									<InputLabel htmlFor='grouped-select'>Class</InputLabel>
									<Select
										defaultValue=''
										id='grouped-select'
										className={classes.root}
									>
										<MenuItem value=''>Class</MenuItem>
										{classList != null
											? Object.keys(classList).map(function (key, index) {
													return (
														<MenuItem
															key={index}
															name={classList[key].class_name}
															value={classList[key].class_name}
															onClick={(e) => clickMenuItem(e, classList[key])}
														>
															{classList[key].class_name}
														</MenuItem>
													)
											  })
											: null}
									</Select>
								</FormControl>
							</div>
						</div>
					) : (
						<Container>
							<ClassTestList classID={classID} classDetail={classDetail} />
						</Container>
					)}
				</div>
			)}
		</Fragment>
	)
}
export default TeacherTimeTable
