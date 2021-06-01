import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { DropzoneArea } from 'material-ui-dropzone'
import { FormControl  } from '@material-ui/core'
import { colors,fonts } from '../../common/ui/appStyles'

const useStyle = makeStyles((theme) => ({
	droparea: {
		width: '100%',
		marginTop: '20px',
		'& .MuiInputBase-root': {
			color: 'rgba(0, 0, 0, 0.54)',
		},
		'& .MuiDropzoneArea-root':{
			border: `1px solid ${colors.border}`,
			minHeight: 'auto',
		},
		'& .MuiDropzoneArea-text':{
			marginTop: '20px',
			marginBottom: '20px',
			fontSize: '14px',
			color: colors.lightBlack,
			fontFamily: fonts.avenirBook,
		},
		'& .MuiDropzoneArea-icon':{
			color: colors.lightGrey,
			width: '30px',
			height: '30px',
			marginBottom: '20px',
		}
	},
	snackBar: {
		'&.MuiSnackbar-root': {
			zIndex: theme.zIndex.drawer + 1,
			maxWidth: '400px',
		},
	},
	previewChip: {
		minWidth: 160,
		maxWidth: 210,
	},
}))

const DropArea = (props) =>{
    const classes = useStyle()
    return(
        <FormControl className={classes.droparea}>
            <DropzoneArea
                onChange={props.handleChange}
                alertSnackbarProps={{
                    anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
                    classes: { root: classes.snackBar },
                    autoHideDuration: 3000,
                }}
                maxFileSize={10000000}
                filesLimit={10}
                showPreviews={true}
                showPreviewsInDropzone={false}
                useChipsForPreview
                previewGridProps={{ container: { spacing: 1, direction: 'row' } }}
                previewChipProps={{ classes: { root: classes.previewChip } }}
                previewText='Selected files'
                dropzoneText='Drag and drop a file (max 10 MB each) here or click'
            />
        </FormControl>
    )
}

export default DropArea;