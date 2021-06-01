import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer'
import Dialog from '@material-ui/core/Dialog'
import { IconButton, Typography } from '@material-ui/core'
import { colors } from '../common/ui/appStyles'
import { Confirm } from '../common/index'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'

const useStyle = makeStyles(() => ({
  filesViewer: {},
  listOfFiles: {
    marginTop: '10px',
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    borderRadius: '25px',
    backgroundColor: colors.background,
    display: 'inline-flex',
    marginTop: '10px',
    '& button': {
      padding: '10px',
      margin: 'auto 0px',
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
  },
  chipText: {
    margin: 'auto 10px',
    cursor: 'pointer',
  },
  deleteBtn: {
    color: '#b7b7bb',
  },
}))

const DocsDeleteViewer = (props) => {
  const { data } = props
  const classes = useStyle()
  const [fileViewModel, setFileViewModel] = useState(false)
  const [fileIndex, setFileIndex] = useState(0)
  const [selectedFileId, setSelectedFileId] = useState(null)
  const [open, setOpen] = useState(false)
  const REACT_APP_BACKEND_IMAGE_URL = process.env.REACT_APP_BACKEND_IMAGE_URL

  
  const FilesViewer = () => {
    const files = data
    const docs = [
      {
        uri: `${REACT_APP_BACKEND_IMAGE_URL}${files[fileIndex].img_path}${files[fileIndex].img_name}`,
        fileType: files[fileIndex].img_name.split('.').pop(),
      },
    ]
    return (
      <div className={classes.filesViewer}>
        <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />
      </div>
    )
  }

  const listOfFiles = data.map((file, index) => {
      console.log('file delete viewer :>> ', file);
    return (
      <div className={classes.chip}>
        <Typography
          variant="subtitle2"
          className={classes.chipText}
          onClick={() => handleModelOpen(index)}
        >
          {file.img_name}
        </Typography>
        <IconButton
          onClick={() => {
            setSelectedFileId(file.id)
            setOpen(true)
          }}
          className={classes.deleteBtn}
          disableRipple={true}
          disableFocusRipple={true}
        >
          <DeleteOutlineOutlinedIcon fontSize={'medium'} />
        </IconButton>
      </div>
    )
  })

  const handleModelOpen = (index) => {
    setFileViewModel(true)
    setFileIndex(index)
  }
  const handleModelClose = () => {
    setFileViewModel(false)
  }
  const handleCloseNO = () => {
    setOpen(false)
  }
  const handleCloseYES = () => {
    props.handleDelete(selectedFileId)
    setOpen(false)
  }

  return (
    <>
      <Confirm
        open={open}
        handleClose={handleCloseNO}
        onhandleDelete={handleCloseYES}
      />
      <div className={classes.listOfFiles}>{listOfFiles}</div>
      <Dialog open={fileViewModel} onClose={handleModelClose} fullWidth={true}>
        <FilesViewer />
      </Dialog>
    </>
  )
}

export default DocsDeleteViewer
