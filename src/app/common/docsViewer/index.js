import React,{useState} from 'react'
import { makeStyles } from '@material-ui/styles'
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import DownloadSVG from '../../../assets/images/assignment/download.svg'
import { saveAs } from 'file-saver';
import Dialog from '@material-ui/core/Dialog'
import { IconButton, Typography } from '@material-ui/core'
import { colors } from '../ui/appStyles'

const useStyle = makeStyles(() => ({
	filesViewer:{

	},
	listOfFiles:{
		marginTop: '10px',
		display: 'flex',
		flexWrap: 'wrap',
	},
	chip:{
		borderRadius: '25px',
		backgroundColor: colors.background,
		display: 'inline-flex',
		marginTop: '10px',
		'& button':{
			padding: '10px',
			margin: 'auto 0px',
			'&:hover':{
				backgroundColor: 'transparent',
			}
		}
	},
	chipText:{
		margin: 'auto 10px',
		cursor: 'pointer',
	}
}))

const DocsViewer = (props) =>{
    const { data } = props
    const classes = useStyle()
	const [ fileViewModel, setFileViewModel ] =useState(false)
	const [ fileIndex, setFileIndex ] = useState(0)
	const REACT_APP_BACKEND_IMAGE_URL = process.env.REACT_APP_BACKEND_IMAGE_URL

    const FilesViewer = () => {
		const files= data;
		const docs = [{
			uri: `${REACT_APP_BACKEND_IMAGE_URL}${files[fileIndex].doc_path}${files[fileIndex].doc_name}`,
			fileType: files[fileIndex].doc_name.split('.').pop(),
		}]
		return (
			<div 
				className={classes.filesViewer}
			>
				<DocViewer
					documents={docs}
					pluginRenderers={DocViewerRenderers}
				/>
			</div>
		)
	}
        
	const listOfFiles = data.map((file,index)=>{
		return (
			<div className={classes.chip}>
				<Typography
					variant="subtitle2"
					className={classes.chipText}
					onClick={()=>handleModelOpen(index)}
				>
					{file.doc_name}	
				</Typography>
				<IconButton
					onClick={()=>handleDownload(`${REACT_APP_BACKEND_IMAGE_URL}${file.doc_path}${file.doc_name}`,file.doc_name)}
					disableRipple={true}
					disableFocusRipple={true}
				>
					<img src={DownloadSVG} />
				</IconButton>
			</div>
		)
	})

    const handleDownload = (link,name) =>{
		saveAs(link,name)
	}

	const handleModelOpen = (index) =>{
		setFileViewModel(true)
		setFileIndex(index)
	}
	const handleModelClose = () =>{
		setFileViewModel(false)
	}

    return(
        <>
            <div 
                className={classes.listOfFiles}
            >
                {listOfFiles}
            </div>
            <Dialog
                open={fileViewModel}
                onClose={handleModelClose}
                fullWidth={true}
            >
                <FilesViewer/>
            </Dialog>
        </>
    )
}

export default DocsViewer;