import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import { Typography, Button } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { DropzoneArea } from 'material-ui-dropzone'
import ReportService from '../ReportService'
import Alert from '@material-ui/lab/Alert'
import BackdropLoader from '../../common/ui/backdropLoader/BackdropLoader'

const useStyles = makeStyles((theme) => ({
	container: {
		padding: '2%',
		height: '100%',
		overflowY: 'auto',
		height: '600px',
		'&:focus': {
			border: '1 px #7B72AF',
		},
	},
	navigationBack: {
		display: 'flex',
		justifyContent: 'center',
	},
	subheader: {
		flexBasis: '5%',
		display: 'flex',
		background: 'yellow',
	},
	fieldStyle: {
		width: '30%',
		marginTop: '30px',
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
	uploadWrapper: {
		marginTop: '40px',
	},
	uploadFooter: {
		marginTop: '40px',
	},
	publish: {
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'column',
		alignItems: 'flex-end',
		marginTop: '20px',
	},
	cancelBtn: {
		background: 'none',
		marginRight: '10px',
		border: '1px solid gray',
	},
	root: {
		background: '#fff',
		border: 'none',
		height: '250px',
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'column',
	},
	text: {
		background: '#fff',
		color: '1c1c1c',
		fontSize: '18px',
	},
	icon: {
		display: 'none',
	},
	errorView: {
		marginTop: '20px',
	},
}))

const ReportUpload = (props) => {
	const [isLoading, setLoading] = useState(true)
	const [allClassList, setAllClassList] = useState([])
	const [classNumber, setClassNumber] = useState(0)
	const [files, setFiles] = useState('')
	const [uploadError, setUploadError] = useState(false)
	const [uploadSucess, setUploadSucess] = useState(false)

	const token = localStorage.getItem('srmToken')

	const changeClass = (event) => {
		setClassNumber(event.target.value)
	}

	const handleChange = (files) => {
		setFiles(files)
	}

	const uploadReportCall = () => {
		setLoading(true)

		async function upload() {
			try {
				const response = await ReportService.uploadReport(token, files)

				if (response.status === 200) {
					setLoading(false)
					setUploadSucess(true)
				}
			} catch (error) {
				console.log(error)
				setLoading(false)
				setUploadError(true)
			}
		}
		upload()
	}

	useEffect(() => {
		let loading = true
		async function getAttendence() {
			try {
				const response = await ReportService.fetchStudentClass(token)

				if (response.status === 200) {
					if (loading) {
						setAllClassList(response.data.data)
						setLoading(false)
					}
				}
			} catch (error) {
				console.log(error)
				setLoading(false)
			}
		}
		getAttendence()
		return () => {
			loading = false
		}
	}, [])

	const renderUpload = () => {
		return (
			<DropzoneArea
				onChange={handleChange}
				dropzoneText='Drag file here'
				classes={{ root: classes.root, icon: classes.icon }}
				acceptedFiles={['.xlsx', '.xls', '.xlsm']}
				icon={classes.icon}
				dropzoneParagraphClass={classes.text}
				showAlerts={false}
				showFileNames={true}
			/>
		)
	}

	const renderHeader = () => {
		return (
			<Fragment>
				<div className={classes.navigationBack}>
					<Typography>Upload</Typography>
				</div>
				<Box>
					<FormControl className={classes.fieldStyle}>
						<Select
							labelId='demo-simple-select-helper-label'
							id='demo-simple-select-helper'
							value={classNumber}
							onChange={changeClass}
						>
							{allClassList.map((item, key) => {
								return (
									<MenuItem value={key} key={key}>
										{item.class_name}
									</MenuItem>
								)
							})}
						</Select>
					</FormControl>
				</Box>
			</Fragment>
		)
	}
	const renderFooter = () => {
		return (
			<div className={classes.publish}>
				<Box>
					<Button
						variant='contained'
						disableElevation
						className={classes.cancelBtn}
						onClick={() => {}}
					>
						Cancel
					</Button>
					<Button
						variant='contained'
						color='primary'
						disableElevation
						onClick={() => uploadReportCall()}
					>
						Upload
					</Button>
				</Box>
			</div>
		)
	}

	const classes = useStyles(props)
	return (
		<div className={classes.container}>
			<div>{renderHeader()}</div>
			<div className={classes.uploadWrapper}>{renderUpload()}</div>
			<div className={classes.errorView}>
				{uploadError && (
					<Alert severity='error'>Error occured while uploading report</Alert>
				)}
				{uploadSucess && (
					<Alert severity='success'>Report uploaded successfully</Alert>
				)}
			</div>
			<div className={classes.uploadFooter}>{renderFooter()}</div>

			<BackdropLoader open={isLoading} />
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		token: state.auth.token,
		userInfo: state.auth.userInfo,
	}
}

export default connect(mapStateToProps)(ReportUpload)
