import React,{useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckBox from '@material-ui/icons/CheckBox'
const REACT_APP_BACKEND_IMAGE_URL = process.env.REACT_APP_BACKEND_IMAGE_URL
const useStyles = makeStyles((theme) => ({    
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
}))

const GridListTileCard = (props) =>{
    const {tile,index} = props
    const classes = useStyles()
    const [checked,setChecked] = useState(false)

    const handleChecked = () =>{
        setChecked(!checked)
        if(checked){
            props.onhandleUncheckImage(tile.id)
        }else{
            props.onhandleCheckImage(tile.id)
        }
    }
    return (
        <>
            <img
                src={`${REACT_APP_BACKEND_IMAGE_URL}/${tile.folder.folder_path}/${tile.folder.name}/${tile.img_name}`}
                alt={tile.img_name}
                resizeMode='contain'
                className={classes.image}
                onClick={() => props.onhandleOpenLightbox(index)}
            />
            <GridListTileBar
                title={''}
                titlePosition='bottom'
                actionIcon={
                    <IconButton
                        className={classes.icon}
                        onClick={handleChecked}
                    >
                        { checked ? <CheckBox /> : <CheckBoxOutlineBlank /> }
                    </IconButton>
                }
                actionPosition='right'
                className={classes.titleBar}
            />
        </>
    )
}

export default GridListTileCard;