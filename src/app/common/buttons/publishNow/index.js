import React from 'react'
import useStyle from '../styles'
import Button from '@material-ui/core/Button'

const PublishNowButton = (props) =>{
    const { disabled } = props
	const classes = useStyle()

    return (
        <Button
            id='publishBtn'
            variant='contained'
            className={classes.publishBtn}
            color='primary'
            type='submit'
            disableElevation
            disabled={ disabled ? disabled : false}
        >
            Publish Now
        </Button>
    )
}

export default PublishNowButton;