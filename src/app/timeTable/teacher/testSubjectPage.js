import React, { Fragment, useEffect, useState } from "react";
import Grid from '@material-ui/core/Grid';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Typography from '@material-ui/core/Typography';
import EditLogo from '../../../assets/images/Edit.svg';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';





const useStyles = makeStyles((theme) => ({

    form: {
        "& > *": {
            margin: theme.spacing(2),
            width: "25ch",
        },
        textAlign: "center",
        fontFamily: 'Avenir Medium',
        fontSize: '1rem'

    },
    root: {
        flexGrow: 1,

    },

    subcategory: {
        marginTop: "30px",
        marginBottom: "25px",
        textAlign: "left",
        padding: "5px",
        background: "#7b72af",
        fontSize: "20px",
        color: "white",
        border: "2px sold lightgrey",
        borderRadius: "5px",
        width: "50%",
        paddingLeft: "12px"
    },
    paper: {
        textAlign: '',
        margin: '0',
        height: "auto",
        boxShadow: "none",
        padding: "10px",
        background: "#FFFFFF",
        borderBottom: '2px solid grey',
        borderTopRightRadius: '5px',
        borderTopLeftRadius: '5px'
    },
    headingList: {
        background: "#7b72af", padding: '5px', textAlign: 'center',
        font: "normal normal medium 14px/19px Avenir",
        borderBottom: "1px solid lightgrey ",
        borderRight: "1px solid lightgrey",
        color: "#FFFFFF"

    },
    headingList1: {
         textAlign: 'center',
        font: "normal normal medium 14px/19px Avenir",
        borderBottom: "1px solid lightgrey ",
        borderRight: "1px solid lightgrey",
        background: "#FFFFFF",
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
    const [editTimeTableUI, setEditTimeTableUI] = useState(false);
    const [timetableinput, setTimetableinput] = useState();
    const [hideforwardsubjectick, setHideforwardsubjectick] = useState("none");
    const [formData, setFormData] = useState({
        date: '',
        start_time: '',
        end_time: ''
    })



    useEffect(() => {
        console.log(props.ClassID)
        console.log(props.testID)

    }, [])
    const handlechange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })

    }
    const handleSubmit = (e) => {
        const submitformdata = {
            date: formData.date,
            start_time: formData.start_time,
            end_time: formData.end_time

        }
        console.log(submitformdata)
    }
    const editTimeTableClick = (e, timeTables) => {
        if (timeTables.length) {
            const timetabledata = timeTables[0];
            setFormData({
                date: timetabledata.date,
                start_time: timetabledata.start_time,
                end_time: timetabledata.end_time
            })
            setEditTimeTableUI(true)
            setTimetableinput(timetabledata)
        }
    }
    const timetableInputbacktik = () => {
        setEditTimeTableUI(false)
        setHideforwardsubjectick("")

    }
    const forwardsubjecttick = () => {
        setEditTimeTableUI(true)

    }
    return (
        <Fragment>
            {editTimeTableUI === false ?
            <div>
                <Grid container spacing={3} style={{ paddingLeft: '12px',paddingTop:'30px' }}>

                    <Grid item xs={12} style={{ textAlign: 'center', paddingTop: "0" }}>
                        <div style={{ float: 'left' }}>
                            <ArrowBackIosIcon fontSize="small" style={{ float: 'left' }} onClick={props.sublistBacktick}></ArrowBackIosIcon>
                        </div>
                        <div style={{ float: 'right' }}>
                            <ArrowForwardIosIcon style={{ float: 'right', display: hideforwardsubjectick }} onClick={forwardsubjecttick} fontSize="small" ></ArrowForwardIosIcon>
                        </div>
                        <Typography>Test List</Typography>
                    </Grid>
                </Grid>

                    {props.subjectCategList.map((items, index) => {
                        return (
                            <div style={{display: '', paddingLeft: '50px', paddingRight: '50px'}}>
                                <Grid item xs={12} style={{ paddingLeft: '12px' }}>
                                    <Typography className={classes.subcategory} style={{ marginTop: '25px', marginBottom: '25px', textAlign: 'center' }}>{items.categoryName}</Typography>
                                </Grid>
                                {items.subjectList.map((sub) => {
                                    return <Grid container className={classes.tablestyle} lg={12} sm={12} xs={12} style={{ padding: '2%' }}>
                                        <Grid lg={12} sm={12} xs={12}>
                                            <Typography display="" align="center" gutterBottom className={classes.paper} >
                                                {(sub.editable ? <span>P</span> : '')}
                                                <span style={{}}>{sub.name}</span>
                                                <span disable={sub.editable} style={{ float: 'right', marginRight: "10px", marginTop: '2px' }} onClick={(e) => editTimeTableClick(e, sub.timeTable)}> <img src={EditLogo} alt="editLogo" /></span>
                                            </Typography>
                                        </Grid>
                                        <Grid items lg={12} sm={12} xs={12}>
                                            <Grid container lg={12} sm={12} xs={12} >
                                                <Grid item xs={4} className={classes.headingList} style={{}}>
                                                    <Typography>Exam Date</Typography>
                                                </Grid>
                                                <Grid item xs={4} className={classes.headingList} >
                                                    <Typography>Start Time</Typography>

                                                </Grid>
                                                <Grid item xs={4} className={classes.headingList} style={{}}>
                                                    <Typography>End Time</Typography>
                                                </Grid>
                                            </Grid>
                                            {sub.timeTable.map((timeTable) => {
                                                return <Grid container lg={12} sm={12} xs={12} >
                                            <Grid item xs={4} className={classes.headingList1} style={{ borderRight: '0',borderBottomLeftRadius:'5px'}}>
                                                        <Typography style={{ background: '#FFFFFF', padding: '10px' }}>{timeTable.date}</Typography>
                                                    </Grid>
                                                    <Grid item xs={4} className={classes.headingList1} style={{borderLeft:'1px solid lightgrey'}}>
                                                        <Typography style={{ background: '#FFFFFF', padding: '10px' }}>
                                                            {timeTable.start_time}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={4} className={classes.headingList1} style={{borderRight: '0',borderBottomRightRadius:'5px'}}>
                                                        <Typography style={{ background: '#FFFFFF', padding: '10px' }}>{timeTable.end_time}</Typography>
                                                    </Grid>

                                                </Grid>
                                            })
                                            }
                                        </Grid>
                                    </Grid>

                                })}
                            </div>
                        )


                    })}
                    <Grid item xs={12} style={{ textAlign: 'right', paddingTop: "20px", marginBottom: '50px' }}>

                        <Typography>
                            <Button variant="contained" style={{ background: '#7b72af', color: '#FFFFFF' }}>
                                Publish Now
                                </Button>
                        </Typography>
                    </Grid>

                </div> :
                <Container>
                    <Grid container spacing={3} style={{ marginTop: "20px", paddingLeft: '15px', paddingRight: '15px', marginBottom: '20px' }}>

                        <Grid item xs={12} style={{ textAlign: 'center', paddingTop: "0" }}>
                            <div style={{ float: 'left' }}>
                                <ArrowBackIosIcon fontSize="small" onClick={timetableInputbacktik} style={{ float: 'left' }}></ArrowBackIosIcon>
                            </div>

                            <Typography>Test List</Typography>
                        </Grid>
                    </Grid>
                    <form className={classes.form} noValidate autoComplete="off" >
                        <Typography style={{ margin: 'auto' }}>{timetableinput.subject_name}</Typography>
                        <TextField id="filled-basic" type="date" variant="outlined" name="date" value={formData.date} onChange={handlechange} /><br></br>
                        <TextField id="filled-basic" type="time" variant="outlined" name="start_time" value={formData.start_time} onChange={handlechange} /><br></br>
                        <TextField id="filled-basic" type="time" variant="outlined" name="end_time" value={formData.end_time} onChange={handlechange} /><br></br>
                        <Button variant="contained" color="primary" onClick={handleSubmit}>Save</Button>

                    </form>
                </Container>
            }

        </Fragment>
    )
}
export default TestSubjectPage;




