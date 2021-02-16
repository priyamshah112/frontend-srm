import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import Lightbox from 'react-image-lightbox'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Button from '@material-ui/core/Button'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileCard from './gridListTileCard'

const REACT_APP_BACKEND_IMAGE_URL = process.env.REACT_APP_BACKEND_IMAGE_URL
const useStyles = makeStyles((theme) => ({
	gridList: {
		width: '100%',
		height: '100%',
		padding: 10,
		boxSizing: 'border-box',
	},	    
	lightBoxContainer: {
		zIndex: 1800,
	},	
	zIndex: {
		zIndex: 1800,
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
const PhotoCheckList = (props) => {  
    
    const {data, checkedImages} = props    
	const classes = useStyles()
	const matches = useMediaQuery('(max-width:400px)')
    const [photoIndex, setPhotoIndex] = useState(0)
	const [openLightbox, setOpenLightBox] = useState(false)
	const token = localStorage.getItem('srmToken')
    
    const handleOpenLightbox = (index) => {
		setOpenLightBox(true)
		setPhotoIndex(index)
    }
    
    const handleCheckImage = (id) => {
		props.onCheckedImages([...checkedImages,id])
    }
    const handleUnheckImage = (id) => {
		props.onCheckedImages(checkedImages.filter((classID) => classID !== id))
    }
    const handleMoveto = () =>{
		props.onHandleMoveto(false)
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
								<GridListTileCard tile={tile} index={index} onhandleCheckImage={handleCheckImage} onhandleUncheckImage={handleUnheckImage} onhandleOpenLightbox={handleOpenLightbox}/>                            
							</GridListTile>
                        )
                    })}
                </GridList>
				
				<div className={classes.saveBtn} >
				{ checkedImages.length > 0 ? (<Button 
					variant='contained'
					color='primary'
					onClick={handleMoveto}
				>
					Move to
				</Button>) : null}
				</div>

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

export default PhotoCheckList;