import React from 'react'
import { CardCS } from '../../common'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { colors } from '../../common/ui/appStyles'
import * as moment from 'moment'

const useStyles = makeStyles(() => ({
    cardContainer:{
        display: 'flex',
        alignItems: 'center',
    },
    avatar:{
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        marginRight: '20px',
    },
    name:{
        width: '100%',
    },
    seen:{
        width: '100%',
        textAlign: 'right',
        color: colors.lightGrey,
    },
}))

const SeenContainerCard = (props) =>{
    const { item } = props
    const classes = useStyles()
    return(
        <CardCS style={{borderRadius: '10px'}}>
            <div className={classes.cardContainer}>
                <img 
                    src={item.thumbnail} 
                    className={classes.avatar}
                />
                <Typography
                    variant="h6"
                    className={classes.name}
                >
                    {item.firstname} {item.lastname}
                </Typography>
                <Typography 
                    variant="subtitle2"
                    className={classes.seen}
                >
                    Seen: {moment(item.seen_time).format('DD/MM/YY hh:mm A')}
                 </Typography> 
            </div>
        </CardCS>
    )
}

export default SeenContainerCard;