import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import List from '@material-ui/icons/List'
import Folder from '@material-ui/icons/Folder'
import CreateNewFolder from '@material-ui/icons/CreateNewFolder'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import Lightbox from 'react-image-lightbox'
import InfiniteScroll from 'react-infinite-scroll-component'
import CircularProgress from '@material-ui/core/CircularProgress'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import GalleryService from './GalleryService'
import { Dialog, DialogTitle, DialogContent,DialogActions, FormControl, TextField ,Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'

const REACT_APP_BACKEND_IMAGE_URL = process.env.REACT_APP_BACKEND_IMAGE_URL

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
	gridContainer: {
		height: '100%',
		width: '100%',
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
	gridList: {
		width: '100%',
		height: '100%',
	},
	titleBar: {
		background:
			'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
			'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
	},
	icon: {
		color: theme.palette.common.quartz,
	},
	image: {
		width: '100%',
		height: '100%',
	},
	iconButton: {
		'&.MuiIconButton-root': {
			backgroundColor: 'transparent',
		},
	},
	lightBoxContainer: {
		zIndex: 1800,
	},
	loading: {
		width: '100%',
		textAlign: 'center',
		paddingTop: '8px',
		fontSize: '20px',
	},
	emptyView: {
		width: '100%',
		textAlign: 'center',
		paddingTop: '100px',
		fontSize: '20px',
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
	zIndex: {
		zIndex: 1800,
	},
	img_container:{
		width: '100px',
		height: '100px',
		margin: 'auto',
	},
	folderIcon:{
		width: '100%',
		height: '100%'
	},
	modelConatiner:{
		'& .MuiDialog-paperScrollPaper':{
			minWidth: '400px'
		}
	},
	folderName:{
		fontSize: 14,
		fontFamily: 'Avenir Book',
		textAlign: 'center',
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
	}



}))

const GalleryIndex = (props) => {
	const classes = useStyles()
	const history = useHistory()
	const matches = useMediaQuery('(max-width:400px)')
	const [ mounted, setMounted ] = useState(false)
	const [isGridView,setIsGridView] = useState(true)
	const [openModel, setOpenModel] = useState(false)
	const [openLightbox, setOpenLightBox] = useState(false)
	const [photoIndex, setPhotoIndex] = useState(0)
	const [hasMore, setHasMore] = useState(true)
	const [currentPage, setCurrentPage] = useState(1)
	const [folderHasMore, setFolderHasMore] = useState(true)
	const [folderCurrentPage, setFolderCurrentPage] = useState(1)
	const [tileData, setTileData] = useState([])
	const [folderViewData, setFolderViewData ] = useState([])
	const [folderView, setFolderView ] = useState(false)
	const [folders, setFolders ] = useState([])
	const [loading, setLoading] = useState(true)
	const [ folderName, setFolderName ] = useState('')
	const [openSnackbar, setOpenSnackbar] = useState(false)
	const token = localStorage.getItem('srmToken')
	const [selectedFolder,setSelectedFolder] = useState(null)

	useEffect(() => {
		if(!mounted){
			fetchImages()
			setMounted(true)
		}
	}, [])
	
	const fetchImages = async () => {
		try {
			const response = await GalleryService.fetchImages(
				token,
				currentPage
			)
			setLoading(false)
			if (response.status === 200) {
				setTileData([...tileData, ...response.data.data.data])
				if (
					response.data.data.current_page !== response.data.data.last_page
				) {
					setCurrentPage(currentPage + 1)
				} else {
					setHasMore(false)
				}
			}
		} catch (e) {
			console.log(e)
			setLoading(false)
		}
	}

	const fetchFolders = async() =>{
		setLoading(true)
		try {
			const res = await GalleryService.fetchFolders(token);
			if(res.status === 200){
				console.log(res);
				setFolders(res.data.data)
			}

		}
		catch (e){
			console.log(e)
		}
		setLoading(false)
	}
	const handleFileUpload = () => {
		history.push('/gallery/upload')
	}

	const handleGridView = () => {
		setIsGridView(true)		
		setFolderView(false)
	}
	
	const handleFolderView = () => {
		setFolderView(false)
		setIsGridView(false)
		setFolderCurrentPage(1)
		fetchFolders()
	}

	const handleSelectFolder = async(id) => {
		setSelectedFolder(id)
		try {
			const response = await GalleryService.fetchImageByFolder(
				token,
				id,
				folderCurrentPage,
			)
			setLoading(false)
			setFolderView(true)
			if (response.status === 200) {
				setFolderViewData(response.data.data.data)
				if (
					response.data.data.current_page !== response.data.data.last_page
				) {
					setFolderCurrentPage(folderCurrentPage + 1)
				} else {
					setFolderHasMore(false)
				}
			}
		} catch (e) {
			console.log(e)
			setLoading(false)
		}
	}
	const handleOpenLightbox = (index) => {
		setOpenLightBox(true)
		setPhotoIndex(index)
	}
	const handleDeleteImage = async (id) => {
		try {
			const response = await GalleryService.deleteImage(token, id)
			if (response.status === 200) {
				setTileData(
					tileData.filter((tile) => {
						return tile.id !== id
					})
				)
			}
		} catch (e) {
			console.log(e)
		}
	}
	const fetchImagesOnScroll = async () => {
		try {
			const response = await GalleryService.fetchImages(
				token,
				currentPage
			)
			console.log(response)
			if (response.status === 200) {
				setTileData([...tileData, ...response.data.data.data])
				if (response.data.data.current_page !== response.data.data.last_page) {
					setCurrentPage(currentPage + 1)
				} else {
					setHasMore(false)
				}
			}
		} catch (e) {
			console.log(e)
		}
	}
	const fetchFolderImagesOnScroll = async () => {
		try {
			const response = await GalleryService.fetchImageByFolder(
				token,
				selectedFolder,
				folderCurrentPage,
			)
			setLoading(false)
			setFolderView(true)
			if (response.status === 200) {
				setFolderViewData([...folderViewData, ...response.data.data.data])
				if (response.data.data.current_page !== response.data.data.last_page){
					setFolderCurrentPage(folderCurrentPage + 1)
				}else {
					setFolderHasMore(false)
				}
			}
		} catch (e) {
			console.log(e)
		}
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
	const handleSnackbarClose = () => {
		setOpenSnackbar(false)
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
				handleFolderView()
			}
		} catch (e) {
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
					<IconButton 
						color='primary'
						classes={{ root: classes.iconButton }}
						onClick={handleFolderModel}
					>
						<CreateNewFolder/>
					</IconButton>
					<IconButton
						color='primary'
						aria-label='upload picture'
						component='span'
						disableRipple
						disableFocusRipple
						classes={{ root: classes.iconButton }}
						onClick={handleFileUpload}
						style={{ float: 'right' }}
					>
						<PhotoCamera />
						<Typography className={classes.headingText}>Upload</Typography>
					</IconButton>
				</div>				
				<div  className={classes.root} id='scrollable'>
					{
						loading ? (
							<>
								<br />
								<div className={classes.loading}>
									<CircularProgress color='primary' size={30} />
								</div>
								<br />
							</>
						) 
						: isGridView ? 
							tileData.length > 0 ? (
								<InfiniteScroll
									dataLength={tileData.length}
									next={fetchImagesOnScroll}
									hasMore={hasMore}
									style={{ overflow: 'hidden'}}
									loader={
										<>
											<div
												className={classes.loading}
												style={{
													width: '100%',
													textAlign: 'center',
													marginTop: '8px',
												}}
											>
												<CircularProgress color='primary' size={30} />
											</div>
											<br />
										</>
									}
									scrollableTarget='scrollable'
									scrollThreshold={0.5}
								>
									<GridList
										cellHeight={200}
										spacing={2}
										cols={matches ? 3 : 4}
										className={classes.gridList}
									>
										{tileData.map((tile, index) => {
											return (
												<GridListTile
													key={tile.id}
													style={{ listStyleType: 'none' }}
													cols={1}
												>
													<img
														src={`${REACT_APP_BACKEND_IMAGE_URL}/${tile.img_path}/${tile.img_name}`}
														alt={tile.img_name}
														resizeMode='contain'
														className={classes.image}
														onClick={() => handleOpenLightbox(index)}
													/>
													<GridListTileBar
														title={''}
														titlePosition='bottom'
														actionIcon={
															<IconButton
																className={classes.icon}
																onClick={() => handleDeleteImage(tile.id)}
															>
																<DeleteOutlineOutlinedIcon />
															</IconButton>
														}
														actionPosition='right'
														className={classes.titleBar}
													/>
												</GridListTile>
											)
										})}
									</GridList>
								</InfiniteScroll>
							)
							:(
								<div className={classes.emptyView}>
									<Typography>You don't have any Image.</Typography>
								</div>
							)
						:(
							<InfiniteScroll
								dataLength={folderViewData.length}
								next={fetchFolderImagesOnScroll}
								hasMore={ folderView ? folderHasMore : false}
								style={{ overflow: 'hidden'}}
								loader={
									<>
										<div
											className={classes.loading}
											style={{
												width: '100%',
												textAlign: 'center',
												marginTop: '8px',
											}}
										>
											<CircularProgress color='primary' size={30} />
										</div>
										<br />
									</>
								}
								scrollableTarget='scrollable'
								scrollThreshold={0.5}
							>
								{
									folders.length > 0 ? !folderView ? (
										<Grid container className={classes.gridContainer}>
											{										
												folders.map((item,index) => (
													<Grid 
														item 
														xs={3} 
														sm={3}
														onClick={()=>{handleSelectFolder(item.id)}}
													>
														<div className={classes.img_container}>
															<Folder color="primary" className={classes.folderIcon} />
														</div>
														<Typography className={classes.folderName}>{item.name}</Typography>
													</Grid>
												))
											}
										</Grid>
										) : folderViewData.length > 0 ? (
											<GridList
												cellHeight={200}
												spacing={2}
												cols={matches ? 3 : 4}
												className={classes.gridList}
												>
													{folderViewData.map((tile, index) => {
														return (
															<GridListTile
																key={tile.id}
																style={{ listStyleType: 'none' }}
																cols={1}
															>
																<img
																	src={`${REACT_APP_BACKEND_IMAGE_URL}/${tile.img_path}/${tile.img_name}`}
																	alt={tile.img_name}
																	resizeMode='contain'
																	className={classes.image}
																	onClick={() => handleOpenLightbox(index)}
																/>
																<GridListTileBar
																	title={''}
																	titlePosition='bottom'
																	actionIcon={
																		<IconButton
																			className={classes.icon}
																			onClick={() => handleDeleteImage(tile.id)}
																		>
																			<DeleteOutlineOutlinedIcon />
																		</IconButton>
																	}
																	actionPosition='right'
																	className={classes.titleBar}
																/>
															</GridListTile>
														)
													})}
												</GridList>
										)
										: (
											<div className={classes.emptyView}>
												<Typography>You don't have any Image.</Typography>
											</div>
											)
									: (
										<div className={classes.emptyView}>
											<Typography>You don't have any Folder.</Typography>
										</div>
									)
								}
							</InfiniteScroll>
						)
					}
				</div>
			</div>

			{openLightbox && (
				<div className={classes.zIndex}>
					<Lightbox
						mainSrc={`${REACT_APP_BACKEND_IMAGE_URL}/${tileData[photoIndex].img_path}/${tileData[photoIndex].img_name}`}
						nextSrc={`${REACT_APP_BACKEND_IMAGE_URL}/${
							tileData[(photoIndex + 1) % tileData.length].img_path
						}/${tileData[(photoIndex + 1) % tileData.length].img_name}`}
						prevSrc={`${REACT_APP_BACKEND_IMAGE_URL}/${
							tileData[(photoIndex + tileData.length - 1) % tileData.length]
								.img_path
						}/${
							tileData[(photoIndex + tileData.length - 1) % tileData.length]
								.img_name
						}`}
						onCloseRequest={() => setOpenLightBox(false)}
						onMovePrevRequest={() =>
							setPhotoIndex(
								(photoIndex + tileData.length - 1) % tileData.length
							)
						}
						onMoveNextRequest={() =>
							setPhotoIndex((photoIndex + 1) % tileData.length)
						}
						reactModalStyle={{
							overlay: {
								zIndex: 1800,
							},
						}}
					/>
				</div>
			)}
			
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
		token: state.auth.token,
	}
}

export default connect(mapStateToProps)(GalleryIndex)
