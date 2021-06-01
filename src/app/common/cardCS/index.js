import React from 'react'
import useStyle from './styles'
import Card from '@material-ui/core/Card'

const CardCS = (props) =>{
    const { style } = props
    const classes = useStyle()
    return (
        <Card className={classes.card} style={style ? style : null}>
            {props.children}
        </Card>
    )
}

export default CardCS;