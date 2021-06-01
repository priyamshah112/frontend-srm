import React from 'react'
import { Card } from '../../common'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { colors } from '../../common/ui/appStyles'
import { paths } from '../../../Constants/Routes'
import { useHistory } from 'react-router-dom'

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
        cursor: 'pointer',
    },
    seen:{
        width: '100%',
        textAlign: 'right',
    },
}))

const SubmissionCard = (props) =>{
    const { item } = props
    const classes = useStyles()
    const history = useHistory()
    return(
        <Card>
            <div className={classes.cardContainer}>
                {
                    item.student.thumbnail ? 
                        <img 
                            src={item.student.thumbnail} 
                            className={classes.avatar}
                        />
                    : null
                }
                <Typography
                    variant="h6"
                    className={classes.name}
                    onClick={()=>history.push({pathname:`${paths.ASSIGNMENT}${paths.DETAILS}`,
                        state:{
                            homework_id: item.homework_id,
                            student_id: item.student_id,
                        }})}
                >
                    {item.student.firstname} {item.student.lastname}
                </Typography>
                <Typography 
                    variant="subtitle2"
                    className={classes.seen}
                    style={{color: item.submission_status === 'pending' ? colors.lightGrey : colors.tint}}
                >
                    {item.submission_status}
                 </Typography> 
            </div>
        </Card>
    )
}

export default SubmissionCard;