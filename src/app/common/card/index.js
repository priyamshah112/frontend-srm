import React from 'react'
import useStyle from './styles'

const Card = (props) =>{
    const classes = useStyle()
    return (
        <div className={classes.card}>
            {props.children}
        </div>
    )
}

export default Card;