import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import List from '@material-ui/icons/List'
import Folder from '@material-ui/icons/Folder'
import AddIcon from '../../assets/images/Filled Add.svg'
import FileMoveIcon from '../../assets/images/gallery/FileMoveIcon.svg'
import BackIcon from '../../assets/images/Back.svg'
import GalleryService from './GalleryService'
import { Dialog, DialogTitle, DialogContent,DialogActions, FormControl, TextField } from '@material-ui/core'
import FolderView from './components/folderView'
import GridView from './components/gridView' 
import AlertPop from './snackBar'


const useStyles = makeStyles((theme) => ({
	':root':{
		'--makeStyles-mainContainer-23': {
			overflow:'hidden'
		},
	},
	root: {
		width: '100%',		
		height: 'calc(100% - 130px)',
		overflow: 'auto',
		display: 'flex',
		'& .infinite-scroll-component__outerdiv':{
			width: '100%',
		}
	},

	headingContainer: {
		display: 'flex',
		alignItems: 'right',
		justifyContent: 'center',
		'& div': {
			margin: '3px',
		},
	},
	headingText: {
		fontWeight: 500,
		fontSize: '0.875rem',
		fontStyle: 'normal',
		color: theme.palette.common.bastille,
		marginLeft: '2px',
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
		padding: 10,
		textTransform: 'captilize',
		'& .headerTitle':{
			marginLeft: 134,
			[theme.breakpoints.down('xs')]: {
				marginLeft: '30px',
			},
		}

	},
	iconButton: {
		'&.MuiIconButton-root': {
			backgroundColor: 'transparent',
		},
	},	
	div: { margin: '10px', backgroundColor: 'transparent'},
	divStyle: {
		textAlign: 'right',
	},
	marginBottom: {
		marginBottom: '5px',
	},
	loadingDiv: {
		width: '100%',
		textAlign: 'center',
		marginTop: '8px',
	},
	listStyleType: {
		listStyleType: 'none',
	},
	modelConatiner:{
		'& .MuiDialog-paperScrollPaper':{
			minWidth: '400px'
		}
	},
	title:{
		padding: 20,
	},
	content:{
		paddingTop: 0,
		paddingLeft: 20,
		paddingRight: 20,
		paddingBottom: 10
	},
	actions:{
		padding: 20,
	},
	formControl: {
		width: '100%',
	},
	addNew: {
		color: theme.palette.common.deluge,
		float: 'right',
		cursor: 'pointer',
		padding: 12,
		display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'center',
		'& .new': {
			float: 'right',
			fontSize: '14px',
			padding: '0px 5px',
			fontWeight: 500,
		},
		'& img': {
			height: '20px',
			cursor: 'pointer',
		},
	},
	uploadButton:{
		padding: 0,
		float: 'right',
		'&.MuiIconButton-root': {
			backgroundColor: 'transparent',
		},
	},
	moreButton:{
		color: '#2C2C2E',
		float: 'right',
		cursor: 'pointer',
		paddingRight: 10,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		'& .move': {
			float: 'right',
			fontSize: '14px',
			padding: '0px 5px',
			fontWeight: 500,
		},
		'& img': {
			height: '23px',
			cursor: 'pointer',
		},
	}


}))

const TecherGallery = (props) => {
	const classes = useStyles()
	const history = useHistory()
	const { location } = history
	let token = localStorage.getItem('srmToken');
	const [isGridView,setIsGridView] = useState(false)
	const [reload, setReload] = useState(false) 
	const [openModel, setOpenModel] = useState(false)
	const [ snackBarStatus, setSnackBarStatus ] = useState('')
	const [ snackBarMsg, setSnackBarMsg ] = useState('')
	const [openSnackbar, setOpenSnackbar] = useState(false)
	const [ folderName, setFolderName ] = useState('')
	const [folderDetail, setFolderDetail ] = useState(location.state ? location.state.folderDetail : '')
	const [selectedFolder,setSelectedFolder] = useState(location.state ? location.state.folderID : null)
	const [folderView, setFolderView ] = useState(location.state ? location.state.folderView : false)

	
	const handleFileUpload = () => {
		history.push({pathname:'/gallery/upload',state:{'folderID':selectedFolder,'folderDetail':folderDetail}})
	}
	const handleFileMove = () => {
		history.push({pathname:'/gallery/move',state:{'folderID':selectedFolder,'folderDetail':folderDetail}})
	}

	const handleGridView = () => {
		setIsGridView(true)		
		setFolderView(false)
	}
	
	const handleFolderView = () => {
		setFolderView(false)
		setIsGridView(false)
	}	
	
	const handleFolderModel = () =>{
		setOpenModel(true)
	}
	const handleClose = () =>{
		setOpenModel(false)
	}
	const handleChangeInput = (event) => {
		setFolderName(event.target.value)
	}
	const handleCreateFolder = async() =>{
		try {
			const response = await GalleryService.createFolder(
				{ 
					folder_name: folderName
				 },
				props.token
			)
			if(response.status === 200){
				setReload(true)
				setFolderName('')
				handleFolderView()
				setSnackBarStatus('success')
				setSnackBarMsg('Folder Created Successfully')
				setOpenSnackbar(true)
			}
		} catch (e) {
			setSnackBarStatus('error')
			setSnackBarMsg('Something went wrong !!')
			setOpenSnackbar(true)
			console.log(e)
		}
		setOpenModel(false)
	}

	
	return (
		<>
			<Dialog open={openModel} onClose={handleClose} aria-labelledby="form-dialog-title" className={classes.modelConatiner}>
				<DialogTitle id="form-dialog-title" className={classes.title}>Create Folder</DialogTitle>
				<DialogContent className={classes.content}>
					<FormControl className={classes.formControl}>						
						<TextField 					
							id='folder_name'
							name='folder_name'
							className={classes.inputBorder}
							value={folderName}
							onChange={handleChangeInput}
							required={true}
							label='Folder Name'
						/>
					</FormControl>
				</DialogContent>
				<DialogActions className={classes.actions}>
					<Button	variant='contained' onClick={handleCreateFolder} color="primary">
						Save
					</Button>
				</DialogActions>
				</Dialog>

			<div
				style={{
					margin: '10px',
					backgroundColor: 'transparent',
					height: '100%',
					overflow: 'hidden'
				}}
			>
					{
						folderView ? (
							<div className={classes.header}>
								<Typography className={classes.header_title}>
									<img
										src={BackIcon}
										alt='Back'
										className={classes.backImg}
										onClick={handleFolderView}
									/>
									<span className='headerTitle'>{folderDetail}</span>
									<IconButton
										color='primary'
										aria-label='upload picture'
										component='span'
										disableRipple
										disableFocusRipple
										className={classes.uploadButton}
										onClick={handleFileUpload}
									>
										<PhotoCamera />
										<Typography className={classes.headingText}>Upload</Typography>
									</IconButton>
									<div className={classes.moreButton} onClick={handleFileMove}>
										<img src={FileMoveIcon} alt='FileMoveIcon' />
										<Typography className='move'>Move</Typography>
									</div>	
								</Typography>
							</div>
						)
						:(							
							<div>
								<IconButton 
									color='primary'
									classes={{ root: classes.iconButton }}
									onClick={
										handleGridView
									}
								>
									<List/>
								</IconButton>
								<IconButton 
									color='primary'
									classes={{ root: classes.iconButton }}
									onClick={handleFolderView}
								>
									<Folder/>
								</IconButton>					
								<div className={classes.addNew} onClick={handleFolderModel}>
									<img src={AddIcon} alt='add' />
									<Typography className='new'>New</Typography>
								</div>
							</div>
						)
					}						
				<div  className={classes.root} id='scrollable'>
					{
						isGridView ? (
								<GridView />
							)
							:(
								<FolderView 
									token={token} 
									folderView={folderView} 
									reload={reload} 
									onReload={setReload} 
									onFolderDetail={setFolderDetail} 
									onFolderView={setFolderView} 
									selectedFolder={selectedFolder} 
									onSelectFolder={setSelectedFolder} 
									navigation={location.state}
								/>
						)
					}
				</div>
			</div>			
			
			<AlertPop 
				openSnackbar={openSnackbar} 
				onOpenSnackBar={setOpenSnackbar} 
				status={snackBarStatus} 
				msg={snackBarMsg}
			/>
		</>
	)
}

const mapStateToProps = (state) => {
	return {
		selectedRole: state.auth.selectedRole,
		token: state.auth.token,
	}
}

export default connect(mapStateToProps)(TecherGallery)
