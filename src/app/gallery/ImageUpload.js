import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { DropzoneArea } from 'material-ui-dropzone'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import GalleryService from './GalleryService'
import Backdrop from '@material-ui/core/Backdrop'
import BackIcon from '../../assets/images/Back.svg'
import CircularProgress from '@material-ui/core/CircularProgress'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import imageCompression from 'browser-image-compression'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { collapseToast } from 'react-toastify'

const useStyles = makeStyles((theme) => ({
	snackBar: {
		'&.MuiSnackbar-root': {
			zIndex: theme.zIndex.drawer + 1,
			maxWidth: '400px',
		},
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: `#fff`,
	},
	previewChip: {
		minWidth: 160,
		maxWidth: 210,
	},
	sideMargins: {
		marginLeft: '20px',
		marginRight: '20px',
	},
	div: { margin: '10px' },
	publishBtns: {
		textAlign: 'right',
		justifyContent: 'right',
	},
	fieldStyle: {
		width: '100%',
		margin: 'auto',
		fontFamily: 'Avenir Book',
		fontSize: ' 1rem',
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
	margin: {
		marginTop: '30px',
		[theme.breakpoints.down('xs')]: {
			marginTop: '10px',
		},
		'& .publishBtn': {
			borderRadius: '3px',
			width: 'inherit',
			margin: 0,
			[theme.breakpoints.down('xs')]: {
				marginTop: '10px',
				marginRight: 0,
				width: '100%',
			},
		},
		'& .publishLaterBtn': {
			backgroundColor: `${theme.palette.common.white}`,
			border: `1px solid ${theme.palette.common.adornment}`,
			marginRight: '5px',
		},
	},
	folderSelect:{
		paddingTop: 20,
	},	
	CircularProgress: {
		position: 'absolute',
		left: '50%',
		top: '50%',
		zIndex: '1',
	},
	backImg: {
		float: 'left',
		transform: 'translate(0px, 4px)',
		cursor: 'pointer',
	},	
	header: {
		display: 'inline block',
	},
	header_title:{
		fonTize: '1rem',
		fontFamily: 'Avenir Medium',
		fontWeight: '400',
		color: '#1C1C1E',
		textAlign: 'center',
		padding: 12,
		textTransform: 'captilize',
		'& .headerTitle':{
			marginLeft: 10,
		}

	},		
	saveBtn:{
		width: '100%',
		padding: 10,
		paddingTop: 20,
		boxSizing: 'border-box',
		'& Button':{
			float: 'right',
		}
	},
}))

const ImageUpload = (props) => {
	const classes = useStyles()
	const history = useHistory()
	const { location } = history
	const [fileList, setFileList] = useState([])
	const [isUploading, setIsUploading] = useState(false)
	const [openSnackbar, setOpenSnackbar] = useState(false)
	const role = JSON.parse(localStorage.getItem('srmSelectedRole'))
	let token = localStorage.getItem('srmToken')
	if (role === 'parent') {
		token = localStorage.getItem('srmSelected_Child_token')
	}



	const handleChange = (files) => {
		setFileList(files)
	}
	const toBase64 = (file) =>
		new Promise((resolve, reject) => {
			const reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onload = () => resolve(reader.result)
			reader.onerror = (error) => reject(error)
		})

	const handleUpload = async () => {
		setIsUploading(true)

		const options = {
			maxSizeMB: 0.5,
			useWebWorker: true,
		}
		for (var image in fileList) {
			try {
				console.log(fileList[image])
				const compressedImage = await imageCompression(fileList[image], options)

				const imageString = await toBase64(compressedImage)

				const response = await GalleryService.uploadImage(
					{ 
						img_name: imageString,
						folder_id: location.state.folderID
					 },
					token
				)
				console.log(response)
			} catch (e) {
				setOpenSnackbar(true)
				console.log(e)
			}
		}
		setIsUploading(false)
		handleBack()
	}
	const handleSnackbarClose = () => {
		setOpenSnackbar(false)
	}

	const handleBack = () =>{
		history.push({pathname:'/gallery',state:{
			'folderID':location.state.folderID,
			'folderDetail': location.state.folderDetail,
			'folderView': true,
		}})
	}
	return (
		<div
			style={{
				margin: '10px',
				backgroundColor: 'transparent',
				overflow: 'hidden'
			}}
		>		
			<div className={classes.header}>
				<Typography className={classes.header_title}>
					<img
						src={BackIcon}
						alt='Back'
						className={classes.backImg}
						onClick={handleBack}
					/>
					<span className="headerTitle">{location.state.folderDetail}</span>
				</Typography>
			</div>
			<div className={classes.div}>
				<div>
					<DropzoneArea
						onChange={handleChange}
						alertSnackbarProps={{
							anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
							classes: { root: classes.snackBar },
							autoHideDuration: 3000,
						}}
						acceptedFiles={['image/*']}
						maxFileSize={10000000}
						filesLimit={10}
						showPreviews={true}
						showPreviewsInDropzone={false}
						useChipsForPreview
						previewGridProps={{ container: { spacing: 1, direction: 'row' } }}
						previewChipProps={{ classes: { root: classes.previewChip } }}
						previewText='Selected files'
						dropzoneText='Drag and drop a file (max 10 MB each) here or click'
					/>
				</div>
				<div className={classes.saveBtn}>
					<Button
						id='publishBtn'
						variant='contained'
						color='primary'
						onClick={handleUpload}
						disabled={fileList.length === 0}
					>
						Upload
					</Button>						
				</div>	

				<Backdrop open={isUploading} className={classes.backdrop}>
					<CircularProgress color='inherit' />
				</Backdrop>
			</div>
			<Snackbar
				open={openSnackbar}
				autoHideDuration={5000}
				onClose={handleSnackbarClose}
			>
				<Alert onClose={handleSnackbarClose} severity='error'>
					Something went wrong!! Please try again.
				</Alert>
			</Snackbar>
		</div>
	)
}
const mapStateToProps = (state) => {
	return {
		selectedRole: state.auth.selectedRole,
		token: state.auth.token,
	}
}

export default connect(mapStateToProps)(ImageUpload)
