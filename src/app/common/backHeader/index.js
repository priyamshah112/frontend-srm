import React from 'react'
import useStyles from './styles'
import {Box, Typography} from '@material-ui/core'
import BackIcon from '../../../assets/images/Back.svg'

const BackHeader = (props) =>{
    const classes = useStyles()
    return(
        <Box>
            <div>
                <img
                    src={BackIcon}
                    alt='Back'
                    className={classes.backImg}
                    onClick={props.handleBack}
                />
                <Typography
                    variant='h2'
                    className={classes.titleText}
                >
                    {props.title}
                </Typography>
            </div>
        </Box>
    )
}

export default BackHeader;