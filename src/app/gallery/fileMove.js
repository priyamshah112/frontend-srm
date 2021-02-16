import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import BackIcon from '../../assets/images/Back.svg'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import InfiniteScroll from 'react-infinite-scroll-component'
import Grid from '@material-ui/core/Grid'
import PhotoCheckList from './components/photoCheckList'
import GalleryService from './GalleryService'
import GridCard from './components/gridCard'

const useStyles = makeStyles((theme) => ({
	
	gridContainer: {
		height: '100%',
		width: '100%',
	},	
	loading: {
		width: '100%',
		height: '100px',
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
	snackBar: {
		'&.MuiSnackbar-root': {
			zIndex: theme.zIndex.drawer + 1,
			maxWidth: '400px',
		},
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
}))

const FileMove = () => {
	const classes = useStyles()
	const history = useHistory()
	const { location } = history
	const [openSnackbar, setOpenSnackbar] = useState(false)
	const [ move, setMove ] = useState(true)    
	const [loading, setLoading] = useState(true)
	const [ mounted, setMounted ] = useState(false)
	const [folders, setFolders ] = useState([])
	const [folderHasMore, setFolderHasMore] = useState(true)
	const [folderCurrentPage, setFolderCurrentPage] = useState(1)
	const [folderViewData, setFolderViewData ] = useState([])
	const [ checkedImages, setCheckedImages ] = useState([])
	const token = localStorage.getItem('srmToken')

	useEffect(() => {
		if(!mounted){
			fetchImages()
			setMounted(true)
		}
	},[])
	 const fetchImages = async() =>{
		setLoading(true)
		try {
			const response = await GalleryService.fetchImageByFolder(
				token,
				location.state.folderID,
				folderCurrentPage,
			)
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
		}
		setLoading(false)
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

    const fetchFolderImagesOnScroll = async () => {
		try {
			const response = await GalleryService.fetchImageByFolder(
				token,
				location.state.folderID,
				folderCurrentPage,
			)
			setLoading(false)
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
	
	const handleSnackbarClose = () => {
		setOpenSnackbar(false)
	}
	const handleFolderSelected = async(id) =>{
		console.log("LIST of image",checkedImages,id)
		try {
			const response = await GalleryService.moveImagesToFolder(
				token,
				{'folder_id':id,'images':checkedImages},
			)
			if (response.status === 200) {
				setOpenSnackbar(true)
				history.push({pathname:'/gallery',state:{
					'folderID':location.state.folderID,
					'folderDetail': location.state.folderDetail,
					'folderView': true,
				}})

			}
		} catch (e) {
			console.log(e)
		}

	}
	const handleMoveto = (item) =>{
		if(checkedImages.length > 0){			
			fetchFolders()
			setMove(item)
		}
		else{
			alert("Select atleast one image to move")
		}
	}
	const handleBack = () =>{
		if(move){
			history.push({pathname:'/gallery',state:{
				'folderID':location.state.folderID,
				'folderDetail': location.state.folderDetail,
				'folderView': true,
			}})
		}
		else{
			setMove(true)
		}
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
					<span className='headerTitle'>{ move ? 'Move' : 'Move to'} </span>
				</Typography>
			</div>
			{				   
				loading ? (
                    <>
                        <br />
                        <div className={classes.loading}>
                            <CircularProgress color='primary' size={30} />
                        </div>
                        <br />
                    </>
                ):(
					<InfiniteScroll
						dataLength={folderViewData.length}
						next={fetchFolderImagesOnScroll}
						hasMore={ folderHasMore}
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
						move ? 
							folderViewData.length > 0 ? (
								<PhotoCheckList data={folderViewData} onHandleMoveto={handleMoveto} checkedImages={checkedImages} onCheckedImages={setCheckedImages} />    
							)
							: (
							<div className={classes.emptyView}>
								<Typography>You don't have any Image.</Typography>
							</div>
							)
						: (
							folders.length > 0 ? (
								<Grid container className={classes.gridContainer}>
									{										
										folders.map((item,index) => (
											<GridCard 									
												onhandleSelectFolder={handleFolderSelected} 
												item={item} 
												hideMoreOption={true} 
											/>
										))
									}
								</Grid>
								):(
								<div className={classes.emptyView}>
									<Typography>You don't have any Folder.</Typography>
								</div>
							)	
						)
					}
					</InfiniteScroll>
				)
			}
			
			<Snackbar
				open={openSnackbar}
				autoHideDuration={5000}
				onClose={handleSnackbarClose}
			>
				<Alert onClose={handleSnackbarClose} severity='success'>
					File moved successfully !!
				</Alert>
			</Snackbar>
		</div>
	)
}


export default FileMove;
