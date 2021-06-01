import React from 'react'
import { makeStyles } from '@material-ui/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles(() => ({	
	loading: {
		width: '100%',
		textAlign: 'center',
		paddingTop: '8px',
		fontSize: '20px',
	}
}))

const Loader =()=>{
    const classes = useStyles()
    return(        
        <div className={classes.loading}>
            <CircularProgress color='primary' size={30} />
        </div>
    )
}

export default Loader;