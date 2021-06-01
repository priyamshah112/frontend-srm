import React,{useState,useEffect} from 'react'
import { Container,BackHeader,Card,ThikLoader } from '../../common';
import Dropdown from '../dropdown'
import { useHistory,useLocation } from 'react-router-dom'
import SettingsService from '../settingsService'
import { FormControl,InputLabel,Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { fonts,colors } from '../../common/ui/appStyles';

const useStyles = makeStyles(()=>({
    formControl:{
        width: '100%',
        marginTop: '20px',
    },
    label:{
        fontSize: '14px',
        fontFamily: fonts.avenirBook,
        color: colors.tint,
    },
	saveBtn: {
		width: '100%',
        paddingTop: '20px',
		'& Button': {
            width: '130px',
			marginLeft: 'calc(100% - 130px)',
		},
	},
}))
const HomeworkLimit = (props) =>{
    const classes = useStyles()  
    const history = useHistory()
    const location = useLocation()  
    const { classID, className } = location.state
    const [ mounted, setMounted ] = useState(false)
	const [isLoading, setLoading] = useState(true)
    const [ subjects, setSubjects ] = useState([])
	const [submitBtn, setSubmitBtn] = useState(false)
    const token = localStorage.getItem('srmToken')

    useEffect(()=>{
        if(!mounted){
            fetchHomeworkLimit()
            setMounted(true)
        }
    },[])
    useEffect(() => {
        const saveDataInterval = setInterval(() => {
            saveData(false);
          }, 10000);
		return () => {
            clearInterval(saveDataInterval);
        };
	}, [subjects])

    const fetchHomeworkLimit = async() =>{
        setLoading(true)
        try{
            const res = await SettingsService.getHomeworkLimitByClass(classID,token)
            if(res.status === 200){
                let temp = []
                res.data.data.forEach(item => {
                    temp = [...temp,{ 
                        subject_id: item.subject.id,
                        name:item.subject.name, 
                        subject_limit:item.subject_limit 
                    }]                
                });
                setSubjects(temp)    
            }
        }catch(e){
            console.log(e)
        }
        setLoading(false)
    }

    const saveData = async(isBack) =>{
		if(isBack){
            setSubmitBtn(true)
        }
        try{
            const res = await SettingsService.updateHomeworksLimit(classID,{subjects: subjects},token)
            if(res.status === 200 && isBack){
                history.goBack();
            }
        }   
        catch(e){
            console.log()
        }  
		if(isBack){
            setSubmitBtn(false)
        }
    }
    const handleBack = () =>{
		saveData(true)
    }
    const handleMenuChange = (e,i) =>{
        const { name, value } = e.target;
        const list = [...subjects];
        list[i].subject_limit = value;
         setSubjects(list)
    }
    return(
        <>
        {
            
            isLoading ? 
                <ThikLoader /> 
            :   
            <Container>
                <Card>
                    <BackHeader handleBack={handleBack} title={className}/>
                    {
                        subjects.length > 0 ? 
                            subjects.map((subject,index)=>{
                                return (
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id={`${subject.name}-subject`} className={classes.label}>{subject.name}</InputLabel>
                                        <Dropdown 
                                            key={subject.id}  
                                            labelId={`${subject.name}-subject`}   
                                            name={subject.name}  
                                            i={index}                
                                            data={[
                                                {id: 0,name:0},
                                                {id: 1,name:1},
                                                {id: 2,name:2},
                                                {id: 3,name:3},
                                                {id: 4,name:4},
                                                {id: 5,name:5},
                                            ]} 
                                            value={subject.subject_limit} 
                                            onChange={handleMenuChange} 
                                            loading={false} 
                                            makeDisable={true}
                                        />
                                    </FormControl>
                                )
                            })
                        : null
                    }
                    <div className={classes.saveBtn}>
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={() => saveData(true)}
                            disabled={submitBtn}
                        >
                            Save
                        </Button>
                    </div>
                </Card>
            </Container>
        }
        </>
    )
}

export default HomeworkLimit;