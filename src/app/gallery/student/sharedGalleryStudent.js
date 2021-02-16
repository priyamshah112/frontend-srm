import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/icons/List'
import Folder from '@material-ui/icons/Folder'
import BackIcon from '../../../assets/images/Back.svg'
import { Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import SharedFolderView from '../components/sharedFolderView'
import SharedGridView from '../components/sharedGridView' 



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
			marginLeft: -10,
		}

	},
	iconButton: {
		'&.MuiIconButton-root': {
			backgroundColor: 'transparent',
		},
	},	
	div: { margin: '10px', backgroundColor: 'transparent', height: '100%' },
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
		'&.MuiIconButton-root': {
			backgroundColor: 'transparent',
		},
	}


}))

const SharedGalleryContainer = (props) => {
	const classes = useStyles()
	const history = useHistory()
	const { location } = history		
	let token = localStorage.getItem('srmToken');
	if (props.selectedRole === 'parent') {
		token = localStorage.getItem('srmSelected_Child_token')
	}
	const [isGridView,setIsGridView] = useState(false)
	const [openModel, setOpenModel] = useState(false)
	const [openSnackbar, setOpenSnackbar] = useState(false)
	const [ folderName, setFolderName ] = useState('')
	const [folderDetail, setFolderDetail ] = useState(location.state ? location.state.folderDetail : '')
	const [selectedFolder,setSelectedFolder] = useState(location.state ? location.state.folderID : null)
	const [folderView, setFolderView ] = useState(location.state ? location.state.folderView : false)

	const handleGridView = () => {
		setIsGridView(true)		
		setFolderView(false)
	}
	
	const handleFolderView = () => {
		setFolderView(false)
		setIsGridView(false)
	}
	const handleSnackbarClose = () => {
		setOpenSnackbar(false)
	}

	
	return (
		<>			
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
									<span className="headerTitle">{folderDetail}</span>
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
							</div>
						)
					}						
				<div  className={classes.root} id='scrollable'>
					{
						isGridView ? (
								<SharedGridView />
							)
							:(
								<SharedFolderView token={token} folderView={folderView} onFolderDetail={setFolderDetail} onFolderView={setFolderView} selectedFolder={selectedFolder} onSelectFolder={setSelectedFolder} navigation={location.state}/>
						)
					}
				</div>
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
		</>
	)
}

const mapStateToProps = (state) => {
	return {
		selectedRole: state.auth.selectedRole,
	}
}

export default connect(mapStateToProps)(SharedGalleryContainer)
