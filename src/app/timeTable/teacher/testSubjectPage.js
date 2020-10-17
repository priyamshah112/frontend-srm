import React, { Fragment, useEffect, useState } from "react";
import Grid from '@material-ui/core/Grid';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Typography from '@material-ui/core/Typography';
import EditLogo from '../../../assets/images/Edit.svg';
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { makeStyles } from '@material-ui/core/styles';
import TimetableService from '../timeTableService';
import { Container } from '@material-ui/core';





const useStyles = makeStyles((theme) => ({

    form: {
        "& > *": {
            margin: theme.spacing(2),
            width: "25ch",
        },
        textAlign: "center",
    },
    root: {
        flexGrow: 1,
        marginTop: '30px'

    },
    containergrid: {
        minWidth: '100%',
        [theme.breakpoints.down('lg', "xl")]: {
            maxWidth: "55%"
        },
        textAlign: "-webkit-center",

    },
    paper: {
        // padding: theme.spacing(2),
        textAlign: '',
        height: "auto",
        background: "none",
        boxShadow: "none",
        padding: "10px",
    },
    headingList: {
        background: "#7b72af", borderRight: "1px solid #707070", padding: '5px', textAlign: 'center',
        font: "normal normal medium 14px/19px Avenir"

    },
    dataList: {
        textAlign: "center",
        padding: '8px', border: "1px solid white"
        , borderRight: "1px solid #707070"
    },

    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "25%",
        [theme.breakpoints.down('xs')]: {
            width: "50%"
        },
    },
    datepicker: {
        width: "30%",
        padding: "0",
        [theme.breakpoints.down('xs')]: {
            width: "50%"
        },
    }
}));
const TestSubjectPage = (props) => {
    const classes = useStyles();
    const token = localStorage.getItem("srmToken");
    const [examTimeTable, setExamTimeTable] = useState();
    const [emptyTimeTable, setEmptyTimeTable] = useState("");
    const [TimeTableData, setTimeTableData] = useState(null);
    const [editTimeTableUI, setEditTimeTableUI] = useState(false);
    const [timetableinput, setTimetableinput] = useState();
    const [hideforwardsubjectick,setHideforwardsubjectick] = useState("none");
    const [formData,setFormData] = useState({
            date:'',
            start_time:'',
            end_time:''
    })



    useEffect(() => {
        console.log(props.ClassID)
        console.log(props.testID)

    })
    const handlechange=(e)=>{
        const {name, value} = e.target
        setFormData({...formData, [name]: value})

    }
    const handleSubmit=(e)=>{
        const submitformdata={
            date:timetableinput.date,
            start_time:timetableinput.start_time,
            end_time:timetableinput.end_time
        }
        console.log(submitformdata)
    }
    const editTimeTableClick = (e, timetabledata) => {
        setFormData({date:timetabledata.date,
        start_time:timetabledata.start_time,
        end_time:timetabledata.end_time
    })
        setEditTimeTableUI(true)
        setTimetableinput(timetabledata)

    }
    const timetableInputbacktik=()=>{
        setEditTimeTableUI(false)
        setHideforwardsubjectick("")

    }
    const forwardsubjecttick=()=>{
        setEditTimeTableUI(true)

    }
    return (
        <Fragment>
            {editTimeTableUI === false ?
                <Grid container spacing={3} style={{ marginTop: "20px", paddingLeft: '15px', paddingRight: '15px' }}>

                    <Grid item xs={12} style={{ textAlign: 'center', paddingTop: "0" }}>
                        <div style={{ float: 'left' }}>
                            <ArrowBackIosIcon fontSize="small" style={ {float: 'left'}} onClick={props.sublistBacktick}></ArrowBackIosIcon>
                        </div>
                        <div style={{ float: 'right' }}>
                            <ArrowForwardIosIcon style={{ float: 'right',display:hideforwardsubjectick }} onClick={forwardsubjecttick} fontSize="small" ></ArrowForwardIosIcon>
                        </div>
                        <Typography>Test List</Typography>
                    </Grid>
                    {props.TimeTableData !== null ?
                        Object.keys(props.TimeTableData).map((key, index) => {
                            return <Grid key={index} item xs={12} lg={6} style={{ marginTop: "20px" }}>
                                <div style={{ background: "#FFFFFF 0% 0% no-repeat padding-box" }}>
                                    <Grid xs={12}>
                                        <Typography display="" align="center" gutterBottom className={classes.paper}>
                                            <span style={{}}>{props.TimeTableData[key].subject_name}</span>
                                            <span style={{ float: 'right', marginRight: "10px", marginTop: '2px' }} onClick={(e) => editTimeTableClick(e, props.TimeTableData[key])}> <img src={EditLogo} alt="editLogo" /></span>
                                        </Typography>

                                    </Grid>

                                    <Grid container style={{ color: '#FFFFFF' }}>
                                        <Grid item xs={4} className={classes.headingList} style={{ borderTopLeftRadius: '5px' }}>
                                            <Typography>Exam Date</Typography>
                                        </Grid>
                                        <Grid item xs={4} className={classes.headingList} >
                                            <Typography>Start Time</Typography>

                                        </Grid>
                                        <Grid item xs={4} className={classes.headingList} style={{ borderTopRightRadius: '5px', borderRight: '0' }}>
                                            <Typography>End Time</Typography>

                                        </Grid>

                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={4} className={classes.dataList}>
                                            <Typography>{props.TimeTableData[key].date}</Typography>
                                        </Grid>
                                        <Grid item xs={4} className={classes.dataList}>
                                            <Typography>
                                                {props.TimeTableData[key].start_time}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4} className={classes.dataList} style={{ borderRight: "0" }}>
                                            <Typography>{props.TimeTableData[key].end_time}</Typography>
                                        </Grid>

                                    </Grid>
                                </div>
                            </Grid>
                        }) :
                        <Container > 
                                 <Typography style={{textAlign:'center'}}><h1>timetable_data is empty</h1></Typography>
                        </Container>}
                </Grid> :
                <Container>
                    <Grid container spacing={3} style={{ marginTop: "20px", paddingLeft: '15px', paddingRight: '15px',marginBottom:'20px' }}>

                        <Grid item xs={12} style={{ textAlign: 'center', paddingTop: "0" }}>
                            <div style={{ float: 'left' }}>
                                <ArrowBackIosIcon fontSize="small" onClick={timetableInputbacktik} style={{ float: 'left' }}></ArrowBackIosIcon>
                            </div>

                            <Typography>Test List</Typography>
                        </Grid>
                    </Grid>
                    <form className={classes.form} noValidate autoComplete="off" >
                        <Typography style={{margin:'auto'}}>{timetableinput.subject_name}</Typography>
                        <TextField id="filled-basic" type="date" variant="outlined" name="date"  value={formData.date} onChange={handlechange}  /><br></br>
                        <TextField id="filled-basic" type="time" variant="outlined" name="start_time"  value={formData.start_time}onChange={handlechange} /><br></br>
                        <TextField id="filled-basic" type="time" variant="outlined" name="end_time"  value={formData.end_time} onChange={handlechange}/><br></br>
                        <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>

                    </form>
                </Container>
            }

        </Fragment>
    )
}
export default TestSubjectPage;