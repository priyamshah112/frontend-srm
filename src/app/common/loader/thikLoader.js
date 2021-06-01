import React from 'react'
import { makeStyles } from '@material-ui/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({    
	loder: {
		display: 'flex',
		'& > * + *': {
			marginLeft: theme.spacing(2),
		},
		background: 'lightgrey',
		height: '100%',
	},
	CircularProgress: {
		position: 'absolute',
		left: '50%',
		top: '50%',
		zIndex: '1',
	},
}))

const ThikLoader = () =>{
    const classes = useStyles()
    return(
        <div className={classes.loder}>
            <CircularProgress
                color='primary'
                thickness={5}
                className={classes.CircularProgress}
            />
        </div>
    )
}

export default ThikLoader;