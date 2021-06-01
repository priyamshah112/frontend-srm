import React from 'react'
import useStyle from './styles'

const Container = (props) =>{
    const classes = useStyle()
    return (
		<div className={classes.sectionContainer}>
            {props.children}
        </div>
    )
}

export default Container;