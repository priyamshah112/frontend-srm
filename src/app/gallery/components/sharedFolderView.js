import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import PhotoList from './photoList'
import Typography from '@material-ui/core/Typography'
import InfiniteScroll from 'react-infinite-scroll-component'
import GalleryService from '../GalleryService'
import CircularProgress from '@material-ui/core/CircularProgress'
import GridCard from './gridCard'

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
}))

const SharedFolderView = (props) =>{
	// console.log("FolderView",props)
	const { folderView, selectedFolder, navigation } = props
	const classes = useStyles()
	const [ mounted, setMounted ] = useState(false)
    const token = props.token    
	const [loading, setLoading] = useState(false)
	const [folders, setFolders ] = useState([])
	const [folderHasMore, setFolderHasMore] = useState(true)
	const [folderCurrentPage, setFolderCurrentPage] = useState(1)
	const [folderViewData, setFolderViewData ] = useState([])
    
    useEffect(() => {
        console.log("StatusMounted",mounted,navigation)
		if(!mounted){
			fetchFolders()
			if(navigation){
				handleSelectFolder(navigation.folderID,navigation.folderDetail)
			}
			setMounted(true)
		}
    },[])

    const fetchFolders = async() => {
		setLoading(true)
		try {
			const res = await GalleryService.fetchSharedFolders(token);
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
    const fetchFolderImagesOnScroll = async() => {
		try {
			const response = await GalleryService.fetchSharedImageByFolder(
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
		props.onSelectFolder(id)
		props.onFolderDetail(name)
		try {
			const response = await GalleryService.fetchSharedImageByFolder(
				token,
				id,
				folderCurrentPage,
			)
			setLoading(false)
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
			// setLoading(false)
		}
	}
    return (
        <>
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
											<GridCard 
												onhandleSelectFolder={handleSelectFolder} 
												item={item} 
												hideMoreOption={true}  />	
                                        ))
                                    }
                                </Grid>
                                ) : folderViewData.length > 0 ? (
                                        <PhotoList data={folderViewData} hideDeleteOption={true}/>    
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
        </>
    )
}

export default SharedFolderView;