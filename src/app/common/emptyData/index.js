import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles(() => ({	
	emptyView: {
		width: '100%',
		textAlign: 'center',
		paddingTop: '100px',
		fontSize: '20px',
	},
}))

const EmptyData = (props) =>{
    const classes = useStyles()
    return (        
        <div className={classes.emptyView}>
            <Typography>{props.children}</Typography>
        </div>
    )
}

export default EmptyData;
