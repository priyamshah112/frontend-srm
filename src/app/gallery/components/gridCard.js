import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import FolderIcon from '../../../assets/images/gallery/FolderIcon.svg'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import MoreVert from '@material-ui/icons/MoreVert'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import EditIcon from '../../../assets/images/gallery/EditIcon.svg'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import DeleteIcon from '../../../assets/images/gallery/DeleteIcon.svg'
import ShareIcon from '../../../assets/images/gallery/ShareIcon.svg'

const useStyles = makeStyles((theme) => ({
	folderName:{
		fontSize: 14,
		fontFamily: 'Avenir Book',
		textAlign: 'center',
		paddingBottom: 20,
		textTransform: 'capitalize',
	},
	gridCard:{
        padding: 10,
    },
    whiteCard:{
		position: 'relative',
        boxSizing: 'border-box',
		cursor: 'pointer',
        width: '100%',
        height: '100%',
		backgroundColor: '#fff',
    },
	img_container:{
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		paddingTop: 20,
		paddingBottom: 10, 
	},
	folderIcon:{
		width: '55px',
		height: '55px',
	},
	moreIcon:{
		'&:hover':{
			backgroundColor: 'transparent',
		}
    },
    moreIconContainer:{
		position: 'absolute',
		top: -5,
		right: -5,
    },
    menuContainer: {
		color: 'black',
        minWidth: '150px',
        paddingTop: '5px',
        paddingBottom: '5px',
		'&.MuiPaper-rounded': {
			boxShadow: '0px 6px 6px #00000029',
		},
		[theme.breakpoints.down('md')]: {
			minWidth: '100px',
		},
		[theme.breakpoints.down('sm')]: {
			minWidth: '100px',
		},
    },
    menuItem:{
		paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
    },
	menuList: {
        width: '100% !important',
        padding: 0,
    },
    menuIcons:{
        minWidth: '25px',
        marginRight: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    },
    typography:{
        fontFamily: 'Avenir Book',
        fontSize: 14,
    }
}))
const GridCard = (props) =>{
    const { item, hideMoreOption, selectedRole } = props
	const classes = useStyles()
    const [ anchorEl, setAnchorEl ] = useState(null)
    const token = localStorage.getItem('srmToken')

    const handleClick = (e) =>{
        setAnchorEl(e.currentTarget)
    }
    const handleClose = () =>{
        setAnchorEl(null)
    }
    const handleSelect = () =>{
        props.onhandleSelectFolder(item.id,item.name)
    }
    const handleSelectMenu = async(e) =>{
        let key = e.currentTarget.getAttribute('value');
        handleClose()
        switch(key){
            case 'Edit':
                props.onEditFolderId(item.id)
                props.onEditFolderName(item.name)
                props.onhandleModel()
                return null
            case 'Share':
                props.onShareFolderId(item.id)
                props.onShareFolderName(item.name)
                props.onhandleShareModel()
                return null
            case 'Delete':
                props.deleteFolder(item)   
                return null      
        }
    }
    return (
        <Grid 
            item 
            xs={6} 
            sm={3}
            className={classes.gridCard}
        >
            <div className={classes.whiteCard}>
                <div onClick={handleSelect}>															
                    <div className={classes.img_container}>
                        <img src={FolderIcon} className={classes.folderIcon} alt='Folder' />
                    </div>
                    <Typography className={classes.folderName}>
                        {item.name}
                    </Typography>
                </div>	
                {
                    !hideMoreOption ? (
                        <div className={classes.moreIconContainer}>												
                            <IconButton 
                                color='primary'														
                                aria-label='more'
                                aria-controls='long-menu'
                                aria-haspopup='true'
                                onClick={handleClick}
                                disableRipple={true}
                                disableFocusRipple={true}
                                className={classes.moreIcon}
                            >
                                <MoreVert/>
                            </IconButton>
                            <Menu
                                id='long-menu'
                                anchorEl={anchorEl}
                                classes={{ paper: classes.menuContainer, list: classes.menuList }}
                                keepMounted
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 0,
                                    horizontal: 5,
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >													
                                <MenuItem value={'Edit'} onClick={handleSelectMenu} className={classes.menuItem}>
                                    <ListItemIcon className={classes.menuIcons}>
                                        <img src={EditIcon} fontSize="small" />
                                    </ListItemIcon>
                                    <Typography className={classes.typography}>Edit</Typography>
                                </MenuItem>
                                {
                                    selectedRole === 'teacher' || selectedRole === 'admin' ?
                                    (
                                    <MenuItem value={'Share'} onClick={handleSelectMenu} className={classes.menuItem}>
                                        <ListItemIcon className={classes.menuIcons}>
                                            <img src={ShareIcon} fontSize="small" />
                                        </ListItemIcon>
                                        <Typography className={classes.typography}>Share</Typography>
                                    </MenuItem>
                                    ): null
                                }
                                <MenuItem value={'Delete'} onClick={handleSelectMenu} className={classes.menuItem}>
                                    <ListItemIcon className={classes.menuIcons}>
                                        <img src={DeleteIcon} fontSize="small" />
                                    </ListItemIcon>
                                    <Typography className={classes.typography}>Delete</Typography>
                                </MenuItem>
                            </Menu>
                        </div>
                    ): null
                }
            </div>
        </Grid>
    )
}

const mapStateToProps = (state) => {
	return {
		selectedRole: state.auth.selectedRole,
	}
}
export default connect(mapStateToProps)(GridCard)