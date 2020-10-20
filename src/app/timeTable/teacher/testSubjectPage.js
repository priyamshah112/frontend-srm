import React, { Fragment, useState } from "react";
import Grid from '@material-ui/core/Grid';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Typography from '@material-ui/core/Typography';
import EditLogo from '../../../assets/images/Edit.svg';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import TimetableService from '../timeTableService';
import '../../../assets/css/form.css';






const useStyles = makeStyles((theme) => ({

    timetableheading: {
        fontSize: "1rem,",
        fontFamily: "Avenir Medium",
        fontWeight: "400",
        lineHeight: 1.5,
    },
    textField: {
        width: "222px",
        border: "1 px solid ",
        padding: "6px"
    },
    time: {
        fontSize: "1rem",
        fontFamily: "Avenir Medium",
        fontWeight: "400",
        lineHeight: "1.5",
    },
    headingtest: {
        fonTize: "1rem",
        fontFamily: "Avenir Medium",
        fontWeight: "400",
        lineHeight: "1.5",
        marginBottom: "0"
    },
    subjectname: {
        fontSize: "1rem",
        fontFamily: "Avenir Medium",
        fontWeight: "400",
        lineHeight: "1.5",
    },
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
        marginBottom: "15px",
        textAlign: "left",
        padding: "5px",
        borderRadius: "5px",
        paddingLeft: "12px",
        float: "left",
        fonTize: "1rem",
        fontFamily: "Avenir Medium",
        fontWeight: "400",
        lineHeight: "1.5",
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
        // borderBottom: "1px solid lightgrey ",
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
    },
}));
const TestSubjectPage = (props) => {
    const classes = useStyles();
    const token = localStorage.getItem("srmToken");
    const [editTimeTableUI, setEditTimeTableUI] = useState(false);
    const [timetableinput, setTimetableinput] = useState();
    const [timetapledata, settimeTableDat] = useState();
    const [hideforwardsubjectick, setHideforwardsubjectick] = useState("none");
    const [formwithoutdata, setFormwithoutdata] = useState(false);
    const [subjectList, setSubjectList] = useState([]);
    const [subjectId, setSubjectId] = useState([]);
    const [formData, setFormData] = useState({
        date: '',
        start_time: '',
        end_time: ''
    })
    const [exam_time_tableID, setExam_time_tableID] = useState();
    const [errors, setErrors] = useState({});



    const fetchTestSublistWithTime = async (exam_time_tableID) => {
        const res = await TimetableService.putTestSubjectDate(token, exam_time_tableID)
        if (res.status === 200) {

        }
    }
    const postsubjectestdata = async (data) => {
        let status = "draft"
        const res = await TimetableService.posTestsubjectData(token, props.testData.class_id, props.testData.id, status, data)
        if (res.status === 200) {

        }
        else {
            console.log('error post')
        }
    }


    const handlechange = (e) => {


        const { name, value } = e.target
        setFormData({ [name]: value })

    }




    const handleSubmit = (e) => {
        if (validation(formData)) {
            if (timetapledata.timeTable.length) {
                // [put]
                console.log("put");
                const data = {
                    "class_id": props.ClassID,
                    "test_id": props.testID,
                    "status": 'published',
                    "subject": [],

                };
                subjectList.forEach(ele => {
                    if (ele.id === subjectId) {
                        if (ele.timeTable.length) {
                            data.subject.push({
                                "subject_id": ele.id,
                                "subject_name": ele.name,
                                "timeData":
                                    [{
                                        "date": formData.date,
                                        "start_time": formData.start_time,
                                        "end_time": formData.end_time
                                    }]
                            });
                            data.status = ele.timeTable[0].status;
                        }

                    } else if (ele.timeTable.length) {
                        data.subject.push({
                            "subject_id": ele.id,
                            "subject_name": ele.name,
                            "timeData":
                                [{
                                    "date": ele.timeTable[0].date,
                                    "start_time": ele.timeTable[0].start_time,
                                    "end_time": ele.timeTable[0].end_time
                                }]
                        })
                    }

                });
                fetchTestSublistWithTime()

                console.log("put data", data);
                fetchTestSublistWithTime(exam_time_tableID)

            } else {
                // [post]
                const data = {
                    date: formData.date,
                    start_time: formData.start_time,
                    end_time: formData.end_time
                }
                postsubjectestdata(data)
                console.log(data)
            }
        }
        else {
            const data = {
                date: formData.date,
                start_time: formData.start_time,
                end_time: formData.end_time
            }
        }
    }

    const validation = (formData) => {
        let fields = formData;
        let errors = {};
        let formIsValid = true;
        if (!fields["date"]) {
            formIsValid = false;
            errors["date"] = "*Please enter Date.";
        }
        if (!fields["start_time"]) {
            formIsValid = false;
            errors["start_time"] = "*Please enter Start tIME.";
        }
        if (!fields["end_time"]) {
            formIsValid = false;
            errors["end_time"] = "*Please enter your End Time.";
        }
        setErrors(errors);
        return formIsValid;

    }



    const editTimeTableClick = (e, timeTables, subList) => {
        e.preventDefault();
        if (timeTables.timeTable.length) {
            setExam_time_tableID(timeTables.timeTable[0].exam_time_table_id)
            // console.log(timeTables.timeTable[0].exam_time_table_id)

        }
        console.log(props.testData) //testdata list when we click on specific testlist

        settimeTableDat(timeTables);
        setSubjectList(subList); //array
        setSubjectId(timeTables.id); //integer
        if (timeTables.timeTable.length) {
            setFormData({
                date: timeTables.timeTable[0].date,
                start_time: timeTables.timeTable[0].start_time,
                end_time: timeTables.timeTable[0].end_time
            })
            setEditTimeTableUI(true)
        }
        if (timeTables.timeTable.length === 0) {
            setFormwithoutdata(true)
            setEditTimeTableUI(true)

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
                    <Grid container spacing={3} style={{ paddingLeft: '12px', paddingTop: '30px' }}>

                        <Grid item xs={12} style={{ textAlign: 'center', paddingTop: "0" }}>
                            <div style={{ float: 'left' }}>
                                <ArrowBackIosIcon fontSize="small" style={{ float: 'left', cursor: "pointer", fontSize: '1.1rem' }} onClick={props.sublistBacktick}></ArrowBackIosIcon>
                            </div>
                            <div style={{ float: 'right' }}>
                                <ArrowForwardIosIcon style={{ float: 'right', fontSize: '1.1rem', display: hideforwardsubjectick, cursor: "pointer" }} onClick={forwardsubjecttick} fontSize="small" ></ArrowForwardIosIcon>
                            </div>
                            <Typography className={classes.headingtest}>Test List</Typography>
                        </Grid>
                    </Grid>

                    {props.subjectCategList.map((items, index) => {
                        return (
                            <div style={{ display: '', paddingLeft: '50px', paddingRight: '50px' }}>
                                <Grid item xs={12} style={{ paddingLeft: '12px' }}>
                                    <Typography className={classes.subcategory} style={{ marginTop: '25px', textAlign: 'center' }}>{items.categoryName}</Typography>
                                </Grid>
                                {items.subjectList.map((sub) => {
                                    return <Grid container className={classes.tablestyle} lg={12} sm={12} xs={12} style={{ padding: '2%' }}>
                                        <Grid lg={12} sm={12} xs={12}>
                                            <Typography display="" align="center" gutterBottom className={classes.paper} >
                                                {/* {(sub.editable ?<span   style={{ float: 'right', marginRight: "10px", marginTop: '2px',cursor:"pointer" }} onClick={(e) => editTimeTableClick(e, sub.timeTable)}> <img src={EditLogo} alt="editLogo" /></span> :
                                                <span   style={{ float: 'right', marginRight: "10px", marginTop: '2px',cursor:"pointer" }} onClick={(e) => editTimeTableClick(e, sub.timeTable)}> <img src={EditLogo} alt="editLogo" /></span>
                                                 )}  */}
                                                <span className={classes.subjectname}>{sub.name}</span>
                                                <span style={{ float: 'right', marginRight: "10px", marginTop: '2px', cursor: "pointer" }} onClick={(e) => editTimeTableClick(e, sub, items.subjectList)}> <img src={EditLogo} alt="editLogo" /></span>

                                            </Typography>
                                        </Grid>
                                        <Grid items lg={12} sm={12} xs={12}>
                                            <Grid container lg={12} sm={12} xs={12} >
                                                <Grid item xs={4} className={classes.headingList} style={{}}>
                                                    <Typography className={classes.timetableheading}>Exam Date</Typography>
                                                </Grid>
                                                <Grid item xs={4} className={classes.headingList} >
                                                    <Typography className={classes.timetableheading}>Start Time</Typography>

                                                </Grid>
                                                <Grid item xs={4} className={classes.headingList} style={{}}>
                                                    <Typography className={classes.timetableheading}>End Time</Typography>
                                                </Grid>
                                            </Grid>

                                            {
                                                sub.timeTable.map((timeTable) => {
                                                    return <Grid container lg={12} sm={12} xs={12} >
                                                        <Grid item xs={4} className={classes.headingList1} style={{ borderRight: '0', borderBottomLeftRadius: '5px' }}>
                                                            <Typography style={{ background: '#FFFFFF', padding: '10px', borderBottomLeftRadius: "5px" }}>{timeTable.date}</Typography>
                                                        </Grid>
                                                        <Grid item xs={4} className={classes.headingList1} style={{ borderLeft: '1px solid lightgrey' }}>
                                                            <Typography style={{ background: '#FFFFFF', padding: '10px' }}>
                                                                {timeTable.start_time}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={4} className={classes.headingList1} style={{ borderRight: '0', borderBottomRightRadius: '5px' }}>
                                                            <Typography style={{ background: '#FFFFFF', padding: '10px', borderBottomRightRadius: '5px' }}>{timeTable.end_time}</Typography>
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
                                <ArrowBackIosIcon fontSize="small" onClick={timetableInputbacktik} style={{ float: 'left', fontSize: '1.1rem' }}></ArrowBackIosIcon>
                            </div>

                            <Typography className={classes.headingtest}>Test List</Typography>
                        </Grid>
                    </Grid>
                    <form className={classes.form} noValidate autoComplete="off" style={{ display: 'block' }} >
                        {/* <Typography className={classes.headingtest} style={{ margin: 'auto' }}>{timetableinput.subject_name}</Typography> */}
                        <TextField id="filled-basic" type="date" variant="outlined" name="date" value={formData.date} onChange={handlechange} /><br></br>
                        <TextField
                            id="time"
                            type="time"
                            defaultValue="14:30"
                            className={classes.textField}
                            value={formData.start_time}
                            onChange={handlechange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300, // 5 min
                                classes: {
                                    notchedOutline: classes.notchedOutline,
                                }
                            }}

                        /><br></br>
                        <TextField
                            id="time"
                            type="time"
                            border
                            defaultValue="02:30"
                            value={formData.end_time}
                            onChange={handlechange}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300, // 5 min
                            }}


                        /><br></br>
                        <Button variant="contained" color="primary" onClick={handleSubmit}>Save</Button>

                    </form>



                </Container>
            }

        </Fragment>
    )
}
export default TestSubjectPage;




