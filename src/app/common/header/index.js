import React from 'react'
import useStyle from './styles'
import Typography from '@material-ui/core/Typography'

const Header = (props) =>{
    const { style } = props
    const classes = useStyle()
    return (
        <div className={classes.header} style={style ? style : null}>
            <Typography className={classes.header_title}>
                {props.children}
            </Typography>
		</div>
    )
}

export default Header;