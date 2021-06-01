import React from 'react'
import useStyle from '../styles'
import Button from '@material-ui/core/Button'

const CancelButton = (props) =>{
    const { handleCancel } = props
	const classes = useStyle()

    return (
        <Button
            id='cancelBtn'
            variant='contained'
            onClick={handleCancel}
            className={`${classes.publishBtn} ${classes.publishLaterBtn}`}
            disableElevation
        >
            Cancel
        </Button>
    )
}

export default CancelButton;