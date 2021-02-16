import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import GalleryService from '../GalleryService'
import Lightbox from 'react-image-lightbox'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import IconButton from '@material-ui/core/IconButton'

const REACT_APP_BACKEND_IMAGE_URL = process.env.REACT_APP_BACKEND_IMAGE_URL
const useStyles = makeStyles((theme) => ({
	gridList: {
		width: '100%',
		height: '100%',
		padding: 10,
		boxSizing: 'border-box',
	},
	image: {
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
	lightBoxContainer: {
		zIndex: 1800,
	},	
	zIndex: {
		zIndex: 1800,
	},
}))
const PhotoList = (props) => {  
    
    const {data,hideDeleteOption} = props    
	const classes = useStyles()
	const matches = useMediaQuery('(max-width:400px)')
    const [photoIndex, setPhotoIndex] = useState(0)
	const [openLightbox, setOpenLightBox] = useState(false)
	const token = localStorage.getItem('srmToken')
    
    const handleOpenLightbox = (index) => {
		setOpenLightBox(true)
		setPhotoIndex(index)
    }
    
    return (
        <>
            <GridList
                cellHeight={200}
                spacing={2}
                cols={matches ? 3 : 4}
                className={classes.gridList}
                >
                    {data.map((tile, index) => {
                        return (
                            <GridListTile
                                key={tile.id}
                                style={{ listStyleType: 'none' }}
                                cols={1}
                            >
                                <img
                                    src={`${REACT_APP_BACKEND_IMAGE_URL}/${tile.folder.folder_path}/${tile.folder.name}/${tile.img_name}`}
                                    alt={tile.img_name}
                                    resizeMode='contain'
                                    className={classes.image}
                                    onClick={() => handleOpenLightbox(index)}
                                />
                               { !hideDeleteOption ? ( 
							   		<GridListTileBar
										title={''}
										titlePosition='bottom'
										actionIcon={
											<IconButton
												className={classes.icon}
												onClick={() => props.onhandleDeleteImage(tile)}
											>
												<DeleteOutlineOutlinedIcon />
											</IconButton>
										}
										actionPosition='right'
										className={classes.titleBar}
									/>
									): null
								}
                            </GridListTile>
                        )
                    })}
                </GridList>

            {openLightbox && (
				<div className={classes.zIndex}>
					<Lightbox
						mainSrc={`${REACT_APP_BACKEND_IMAGE_URL}/${data[photoIndex].folder.folder_path}/${data[photoIndex].folder.name}/${data[photoIndex].img_name}`}
						nextSrc={`${REACT_APP_BACKEND_IMAGE_URL}/${
							data[(photoIndex + 1) % data.length].folder.folder_path
						}/${data[(photoIndex + 1) % data.length].folder.name}/${data[(photoIndex + 1) % data.length].img_name}`}
						prevSrc={`${REACT_APP_BACKEND_IMAGE_URL}/${
							data[(photoIndex + data.length - 1) % data.length].folder.folder_path
						}/${data[(photoIndex + data.length - 1) % data.length].folder.name}/${
							data[(photoIndex + data.length - 1) % data.length]
								.img_name
						}`}
						onCloseRequest={() => setOpenLightBox(false)}
						onMovePrevRequest={() =>
							setPhotoIndex(
								(photoIndex + data.length - 1) % data.length
							)
						}
						onMoveNextRequest={() =>
							setPhotoIndex((photoIndex + 1) % data.length)
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

export default PhotoList;