import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InfiniteScroll from 'react-infinite-scroll-component'
import GalleryService from '../GalleryService'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import PhotoList from './photoList'

const useStyles = makeStyles((theme) => ({
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

const SharedGridView = (props) =>{
	const classes = useStyles()
    const [tileData, setTileData] = useState([])
    const [ mounted, setMounted ] = useState(false)    
	const [loading, setLoading] = useState(false)
	const token = localStorage.getItem('srmToken')
	const [hasMore, setHasMore] = useState(true)
	const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
		if(!mounted){
			fetchImages()
			setMounted(true)
		}
    },[])
    
    const fetchImages = async () => {
		setLoading(true)
		try {
			const response = await GalleryService.fetchSharedImages(
				token,
				currentPage
			)
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
		}
		setLoading(false)
    }
    
    const fetchImagesOnScroll = async () => {
		try {
			const response = await GalleryService.fetchSharedImages(
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
    return(
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
                ): tileData.length > 0 ? (
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
						<PhotoList data={tileData} hideDeleteOption={true}/>
					</InfiniteScroll>
				)
				:(
					<div className={classes.emptyView}>
						<Typography>You don't have any Image.</Typography>
					</div>
				)
            }
        </>
    )
}

export default SharedGridView;