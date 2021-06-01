import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import PhotoList from './photoList'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Typography from '@material-ui/core/Typography'
import InfiniteScroll from 'react-infinite-scroll-component'
import GalleryService from '../GalleryService'
import CircularProgress from '@material-ui/core/CircularProgress'
import GridCard from './gridCard'
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'
import { Dialog, DialogTitle, DialogContent,DialogActions, FormControl, TextField } from '@material-ui/core'
import AlertPop from '../snackBar'
import Confirm from '../confirm'

const useStyles = makeStyles((theme) => ({
    
	chip: {
		margin: theme.spacing(0.5),
	},
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
	modelConatiner:{
		'& .MuiDialog-paperScrollPaper':{
			minWidth: '400px'
		}
	},
	title:{
		padding: '20px',
		'& h2':{
			fontSize: '18px',
		}
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
}))

const FolderView = (props) =>{
	// console.log("FolderView",props)
	const { folderView, selectedFolder, navigation, reload } = props
	const classes = useStyles()
	const [ mounted, setMounted ] = useState(false)
	const [ navLoading, setNavLoading ] = useState(false)
	const role = JSON.parse(localStorage.getItem('srmSelectedRole'))
	let token = localStorage.getItem('srmToken')
	if (role === 'parent') {
		token = localStorage.getItem('srmSelected_Child_token')
	} 
	const [ loading, setLoading ] = useState(true)
	const [ folders, setFolders ] = useState([])
	const [ folderHasMore, setFolderHasMore ] = useState(true)
	const [ folderCurrentPage, setFolderCurrentPage] = useState(1)
	const [ folderViewData, setFolderViewData ] = useState([])
	const [ editFolderId, setEditFolderId ] = useState(null)
	const [ editFolderName, setEditFolderName ] = useState('')
	const [ openModel, setOpenModel] = useState(false)
	const [ shareFolderId, setShareFolderId ] = useState(null)
	const [ shareFolderName, setShareFolderName ] = useState('')
	const [ openShareModel, setOpenShareModel ] = useState(false)
	const [ selectedClassList, setSelectedClassList ] = useState([])
	const [ snackBarStatus, setSnackBarStatus ] = useState('')
	const [ snackBarMsg, setSnackBarMsg ] = useState('')
	const [ openSnackbar, setOpenSnackbar] = useState(false)
	const [ classList, setClassList ] = useState({})
	const [ classNameList, setClassNameList ] = useState([])
	const [ openConfirmModel, setOpenConfirmModel ] = useState(false)
	const [ deleteFolder, setDeleteFolder ] = useState({})
    
    useEffect(() => {				
		if(!mounted){	
			fetchFolders()
			if(navigation){
				setNavLoading(true)
				handleSelectFolder(navigation.folderID,navigation.folderDetail)
			}
			fetchClasses()
			setMounted(true)
		}
	},[])
	useEffect(()=>{
		if(reload){
			fetchFolders()
			props.onReload(false)
		}
	},[reload])

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

	const fetchClasses = async() =>{
		try{
			const res = await GalleryService.fetchClasses(token)
			if(res.status === 200){
				let initialClassList = {}	
				res.data.data.forEach((item) => {
					initialClassList[item.id] = item.class_name
				})	
				setClassList({...initialClassList})
				setClassNameList([...Object.values(initialClassList)])
			}

		}catch(e){
			console.log(e)
		}
	}
    const fetchFolderImagesOnScroll = async() => {
		try {
			const response = await GalleryService.fetchImageByFolder(
				token,
				selectedFolder,
				folderCurrentPage,
			)
			setLoading(false)
			props.onFolderView(true)
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

    const handleSelectFolder = async(id,name) => {
		setLoading(true)
		props.onSelectFolder(id)
		props.onFolderDetail(name)
		try {
			const response = await GalleryService.fetchImageByFolder(
				token,
				id,
				folderCurrentPage,
			)
			props.onFolderView(true)
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
		setNavLoading(false)
	}
	const handleChangeInput = (event) => {
		setEditFolderName(event.target.value)
	}
	const handleRenameFolder = async() =>{
		try {
			const response = await GalleryService.renameFolder(
				token,
				{ 
					folder_id: editFolderId,
					folder_name: editFolderName,
				 }
			)
			if(response.status === 200){
				setSnackBarStatus('success')
				setSnackBarMsg('Folder Renamed Successfully')
				setOpenSnackbar(true)
				props.onReload(true)
			}
		} catch (e) {
			setSnackBarStatus('error')
			setSnackBarMsg('Something Went Wrong, While Renaming Folder !! ')
			setOpenSnackbar(true)
			console.log(e)
		}
		setOpenModel(false)
	}	
	const handleShareFolder = async() => {
		let classMapping = []
		let isSelectAll = selectedClassList.find(
			(classname) => classname === 'All'
		)
		if (isSelectAll) {
			classMapping = [...Object.keys(classList)]
		} else {
			selectedClassList.forEach((classnames) => {
				classMapping.push(
					parseInt(
						Object.keys(classList).find(
							(id) =>  classList[id] === classnames
						)
					)
				)
			})
		}
		try{
			const res = await GalleryService.shareto(token,shareFolderId,{
				classes: classMapping
			})
			if(res.status === 200){
				setSelectedClassList([])
				setSnackBarStatus('success')
				setSnackBarMsg('Folder Shared Successfully')
				setOpenSnackbar(true)
			}
			
		}catch(e){
			setSnackBarStatus('error')
			setSnackBarMsg('Something Went Wrong, While Sharing Folder !!')
			setOpenSnackbar(true)
			console.log(e)
		}
		setOpenShareModel(false)
	}
	const handleFolderModel = () =>{
		setOpenModel(true)
	}
	const handleClose = () =>{
		setOpenModel(false)
		setEditFolderName('')
	}
	const handleShareModel = () =>{
		setOpenShareModel(true)
	}
	const handleShareClose = () =>{
		setOpenShareModel(false)
		setSelectedClassList([])
	}
	const handleSelectClass = (event) => {
		setSelectedClassList(event.target.value)
	}
	const hanldeDeleteClass = (value) => {
		setSelectedClassList(selectedClassList.filter((classname) => classname !== value))
	}
	const handleDeleteFolder = async() =>{	
		try {
			const res = await GalleryService.deleteFolder(
				token,
				deleteFolder.id,
			)
			if(res.status === 200){
				setOpenConfirmModel(false)
				setFolders(folders.filter((folder) => folder !== deleteFolder))
				setSnackBarStatus('success')
				setSnackBarMsg('Folder Deleted Successfully')
				setOpenSnackbar(true)
			}
		} catch (e) {
			setSnackBarStatus('error')
			setSnackBarMsg('Something Went Wrong, While Deleting Folder !!')
			setOpenSnackbar(true)
			console.log(e)
		}
	}
	const handleDeleteImage = async(item) => {
		try {
			const response = await GalleryService.deleteImage(token, item.id)
			if (response.status === 200) {				
				setFolderViewData(folderViewData.filter((image) => image !== item))
				setSnackBarStatus('success')
				setSnackBarMsg('Image Deleted Successfully')
				setOpenSnackbar(true)
			}
		} catch (e) {
			console.log(e)
			setSnackBarStatus('error')
			setSnackBarMsg('Something Went Wrong, While deleting Image !!')
			setOpenSnackbar(true)
		}
	}
	const handleOpenConfirm = (item) =>{
		setDeleteFolder(item)
		setOpenConfirmModel(true)
	}
	const handleCloseConfirm = () =>{
		setOpenConfirmModel(false)
	}
    return (
        <>
			<Dialog open={openModel} onClose={handleClose} aria-labelledby="form-dialog-title" className={classes.modelConatiner}>
				<DialogTitle id="form-dialog-title" className={classes.title}>Rename Folder</DialogTitle>
				<DialogContent className={classes.content}>
					<FormControl className={classes.formControl}>						
						<TextField 					
							id='folder_name'
							name='folder_name'
							className={classes.inputBorder}
							value={editFolderName}
							onChange={handleChangeInput}
							required={true}
							label='Folder Name'
						/>
					</FormControl>
				</DialogContent>
				<DialogActions className={classes.actions}>
					<Button	
						variant='contained' 
						onClick={handleRenameFolder} 
						color="primary"
						disableRipple 
						disableElevation
							>
						Rename
					</Button>
				</DialogActions>
				</Dialog>
			<Dialog open={openShareModel} onClose={handleShareClose} aria-labelledby="form-dialog-title" className={classes.modelConatiner}>
				<DialogTitle id="form-dialog-title" className={classes.title}>Share with</DialogTitle>
				<DialogContent className={classes.content}>
					<FormControl className={classes.formControl}>
						<InputLabel>Select classes</InputLabel>
						<Select
							labelId='demo-mutiple-chip-label'
							id='demo-mutiple-chip'
							value={selectedClassList}
							multiple
							onChange={handleSelectClass}
							input={<Input id='select-multiple-chip' />}
							MenuProps={{
								PaperProps: {
									style: {
										maxHeight: '300px',
									},
								},
								anchorOrigin: {
									vertical: 'bottom',
									horizontal: 'center',
								},
								transformOrigin: {
									vertical: 'top',
									horizontal: 'center',
								},
								getContentAnchorEl: null,
							}}
							renderValue={(selected) => {
								return (
									<div className={classes.chips}>
										{selected.map((value) => (
											<Chip
												onDelete={() => hanldeDeleteClass(value)}
												onMouseDown={(event) => {
													event.stopPropagation()
												}}
												key={value}
												label={value}
												className={classes.chip}
											/>
										))}
									</div>
								)
							}}
						>
							<MenuItem value='All' >All</MenuItem>
							{classNameList.map((item) => (
								<MenuItem key={item} value={item}>
									{item}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</DialogContent>
				<DialogActions className={classes.actions}>
					<Button	
						variant='contained' 
						onClick={handleShareFolder} 
						color="primary"
						disableRipple 
						disableElevation
					>
						Share
					</Button>
				</DialogActions>
				</Dialog>
			
            {                
                loading || navLoading ? (
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
							folders.length > 0 || folderView? 
								!folderView ? (
									<Grid container className={classes.gridContainer}>
										{										
											folders.map((item,index) => (
												<GridCard 
													onhandleSelectFolder={handleSelectFolder} 
													item={item} 
													hideMoreOption={false}
													onhandleModel={handleFolderModel} 
													editFolderId={editFolderId} 
													onEditFolderId={setEditFolderId} 
													editFolderName={editFolderName} 
													onEditFolderName={setEditFolderName}
													onhandleShareModel={handleShareModel} 
													shareFolderId={shareFolderId} 
													onShareFolderId={setShareFolderId} 
													shareFolderName={shareFolderName} 
													onShareFolderName={setShareFolderName} 
													deleteFolder={handleOpenConfirm} />	
											))
										}
									</Grid>
                                ) : folderViewData.length > 0 ? (
										<PhotoList 
											data={folderViewData} 
											hideDeleteOption={false} 
											onhandleDeleteImage={handleDeleteImage} 
										/>    
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
			<Confirm 
				open={openConfirmModel} 
				handleClose={handleCloseConfirm} 
				onhandleDeleteFolder={handleDeleteFolder}
			/> 
			<AlertPop 
				openSnackbar={openSnackbar} 
				onOpenSnackBar={setOpenSnackbar} 
				status={snackBarStatus} 
				msg={snackBarMsg}
			/>          
        </>
    )
}

export default FolderView;