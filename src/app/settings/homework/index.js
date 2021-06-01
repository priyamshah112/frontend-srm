import React,{useState,useEffect} from 'react'
import { Grid,Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useHistory } from 'react-router-dom'
import { Card,EmptyData,Loader } from '../../common'
import SettingsService from '../settingsService'
import { paths } from '../../../Constants/Routes'
import { colors } from '../../common/ui/appStyles'

const SettingHomeWork = () =>{
    const classes = useStyles()
	const history = useHistory()
    const [ mounted, setMounted ] = useState(false)
	const [isLoading, setLoading] = useState(true)
    const [ classList, setClassList ] = useState([])
    const token = localStorage.getItem('srmToken')

    useEffect(()=>{
        if(!mounted){
            fetchClassData()
            setMounted(true)
        }
    },[])

    const fetchClassData = async() =>{
        setLoading(true)
        try{
            const res = await SettingsService.getHomeworkLimit(token)
            if(res.status === 200){
                // console.log(res)
                setClassList(res.data.data)
            }
            setLoading(false)
        }catch (e) {
            setLoading(false)
            console.log(e)
        }
    }

    return(
        <>
            <Grid container style={{display:'border-box'}}>
                {
                    isLoading ? 
                        <Loader />
                    :
                    classList.length > 0 ?
                    classList.map((a,index)=>(
                        <Grid key={`${a.id}${index}`} item xs={6} className={(index+1)%2 === 1 ? classes.grid1 : classes.grid2}>
                            <Card>
                               <Typography 
                                    onClick={() => history.push({pathname:`${paths.SETTINGS}${paths.HOMEWORK}/${a.id}`,state:{
                                        classID: a.id,
                                        className: a.class_name,
                                    }})}
                                    variant="subtitle1"
                                    className={classes.title}
                                >
                                    {a.class_name} 
                                </Typography> 
                               <Typography 
                                    variant="subtitle2"
                                    className={classes.limit}
                                >
                                    Homework Limit - {a.limit} 
                                </Typography> 
                            </Card>
                        </Grid>
                    ))
                    :
                    <EmptyData> No class assign to you </EmptyData>                    
                }
            </Grid>
        </>
    )
}

const useStyles = makeStyles(()=>({
    grid1:{
        padding: '10px 10px 10px 0px',
    },
    grid2:{
        padding: '10px 0px 10px 10px',
    },
    title:{
        cursor: 'pointer',
        paddingBottom: '20px',
    },
    limit:{
        color: colors.lightBlack,
    }
}))
export default SettingHomeWork;