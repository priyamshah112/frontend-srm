import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import Lightbox from 'react-image-lightbox'
import InfiniteScroll from 'react-infinite-scroll-component'
import CircularProgress from '@material-ui/core/CircularProgress'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import GalleryService from './GalleryService'

const REACT_APP_BACKEND_IMAGE_URL = process.env.REACT_APP_BACKEND_IMAGE_URL

const useStyles = makeStyles((theme) => ({
	':root':{
		'--makeStyles-mainContainer-23': {
			overflow:'hidden'
		},
	},
	root: {
		height: '100%',
		width: '100%',
		overflow: 'hidden'
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
}))

const GalleryIndex = (props) => {
	const classes = useStyles()
	const history = useHistory()
	const matches = useMediaQuery('(max-width:400px)')

	const [openLightbox, setOpenLightBox] = useState(false)
	const [photoIndex, setPhotoIndex] = useState(0)
	const [hasMore, setHasMore] = useState(true)
	const [currentPage, setCurrentPage] = useState(1)
	const [tileData, setTileData] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		let changeImages = true
		const fetchImages = async () => {
			try {
				const response = await GalleryService.fetchImages(
					props.token,
					currentPage
				)
				setLoading(false)
				if (response.status === 200 && changeImages) {
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
		fetchImages()

		return () => {
			changeImages = false
		}
	}, [])
	const handleFileUpload = () => {
		history.push('/gallery/upload')
	}

	const handleOpenLightbox = (index) => {
		setOpenLightBox(true)
		setPhotoIndex(index)
	}
	const handleDeleteImage = async (id) => {
		try {
			const response = await GalleryService.deleteImage(props.token, id)
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
				props.token,
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
				<div style={{ textAlign: 'right' }}>
					<IconButton
						color='primary'
						aria-label='upload picture'
						component='span'
						disableRipple
						disableFocusRipple
						classes={{ root: classes.iconButton }}
						onClick={handleFileUpload}
					>
						<PhotoCamera />
						<Typography className={classes.headingText}>Upload</Typography>
					</IconButton>
				</div>
				<div style={{ marginBottom: '5px' }}></div>
				<div  className={classes.root} id='scrollable'>
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
						{loading ? (
							<>
								<br />
								<div className={classes.loading}>
									<CircularProgress color='primary' size={30} />
								</div>
								<br />
							</>
						) : null}
						{!loading && !tileData.length ? (
							<div className={classes.emptyView}>
								<Typography>You don't have any Image.</Typography>
							</div>
						) : null}
					</InfiniteScroll>
					<br />
					<br /> <br /> <br />
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
