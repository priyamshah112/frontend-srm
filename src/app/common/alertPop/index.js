import React from 'react'
import { Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'

const AlertPop = (props) =>{
    const { openSnackbar,status,msg } = props;
	const handleSnackbarClose = () => {
		props.onOpenSnackBar(false)
	}
    return(
        <Snackbar
            open={openSnackbar}
            autoHideDuration={5000}
            onClose={handleSnackbarClose}
        >
            <Alert onClose={handleSnackbarClose} severity={status}>
                {msg}
            </Alert>
        </Snackbar>
    )
}

export default AlertPop;