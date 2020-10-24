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
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import DateFnsUtils from "@date-io/date-fns";
import InputAdornment from "@material-ui/core/InputAdornment";
import EventIcon from "@material-ui/icons/Event";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
    KeyboardTimePicker,
    DatePicker,
  } from "@material-ui/pickers";



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
        // paddingLeft:"45%",
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
        // padding: "5px",
        textAlign:"center",
        borderRadius: "5px",
        paddingLeft: "12px",
        float: "left",
        fonTize: "1rem",
        fontFamily: "Avenir Medium",
        fontWeight: "400",
        lineHeight: "1.5",
        width:"100%",
        textTransform: 'uppercase',

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
        color:"#000000"
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
    fieldStyle: {
        width: "100%",
        margin: "auto",
        "& .MuiInput-underline:before": {
          borderBottom: "2px solid #eaeaea",
        },
        "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
          borderBottom: "2px solid #7B72AF",
          transitionProperty: "border-bottom-color",
          transitionDuration: "500ms",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        },
      },
}));


const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });
  
  const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);
  
  const DialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);
  
  
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
    const [open, setOpen] = React.useState(false);
    const [modal_sub, setmodal_sub] = React.useState('');
    const [eventDate, setEventDate] = useState(null);
    const [start_time, setstart_time] = useState(null);
    const [end_time, setend_time] = useState(null);
    const [selected_sub, setselected_sub] = useState(null);
    const [modify_sub, setmodify_sub] = useState(false);




    const handleEventDate = (date) => {
        setEventDate(date);
      };

    const handlestart_time = (date) => {
        setstart_time(date);
    };const handleend_time = (date) => {
        setend_time(date);
    };
      
    const handleClickOpen = (sub,modify) => {
                if (modify){
                                setmodify_sub(modify);
                                // console.log(sub.timeTable[0].date);
                                setEventDate(sub.timeTable[0].date);

                                let d = new Date();
                                let [hours, minutes, seconds] = sub.timeTable[0].start_time.split(':'); 
                                d.setHours(+hours); 
                                d.setMinutes(minutes); 
                                d.setSeconds(seconds);
                                console.log(d.toString());

                            // console.log(sub.timeTable[0].start_time);
                            setstart_time(d);
                                let e = new Date(); 
                                let [hours_1, minutes_1, seconds_1] = sub.timeTable[0].end_time.split(':'); 
                                e.setHours(+hours_1); 
                                e.setMinutes(minutes_1); 
                                e.setSeconds(seconds_1);
                                console.log(d.toString());
                            // console.log(sub.timeTable[0].end_time);
                            setend_time(e);
                }
      setmodal_sub(sub.name);
      console.log("subbb",sub);
      

      setselected_sub(sub);
      setOpen(true);

    };
    const handleClose = () => {
      setOpen(false);
    };

    const publish_timetable = async () =>{

        if (Array.isArray(props.TimeTableData) && props.TimeTableData.length) {
            console.log("publish");
            
            var obj_post={
                "class_id":props.testData.class_id,
                "test_id":props.testData.id,
                "status":"published",
                "subject":[]
            };
                props.TimeTableData.forEach(ele => {
                
                    obj_post.subject.push({
                            "subject_id": ele.subject_id,
                            "subject_name": ele.subject_name,
                            "timeData":
                                [{
                                    "date": ele.date,
                                    "start_time": ele.start_time,
                                    "end_time": ele.end_time
                                }]
                        });
                        // data.status = ele.timeTable[0].status;
                    });
                const id=props.examTimeTable[0].id;
                console.log(id);
                const res = await TimetableService.put_subject(token,id,obj_post);
                console.log(res);
                console.log(res.data.data);
    
                    if (res.status === 200) {
                        console.log("put success");
                    }
                    else {
                        console.log('error post')
                    }
        props.double_sublistBacktick();
            
        }
        else{
            console.log("cannot be published");
            alert("Please create aTime Table first");
            
        }
    };
    
    
    const check_put_post_data = async () => {
        setOpen(false);

        if (eventDate===null || start_time===null || end_time === null ){
            alert("Please fill entire details");
        }
        else{
            console.log(eventDate);
            console.log(start_time);
            console.log(end_time);
            console.log(props.examTimeTable);
            console.log(props.TimeTableData);

            // if (Array.isArray(props.examTimeTable) && props.examTimeTable.length) {
            if ((Array.isArray(props.examTimeTable) && props.examTimeTable.length)) {

                console.log("put");
                var obj_post={
                    "class_id":props.testData.class_id,
                    "test_id":props.testData.id,
                    "status":"draft",
                    "subject":[]
                };
                
                if(modify_sub){

                    if(Array.isArray(props.TimeTableData) && props.TimeTableData.length)
                            {
                                props.TimeTableData.forEach(ele => {
                                    if (ele.subject_id === selected_sub.id){
                                        if((eventDate instanceof Date))
                                        {
                                            obj_post.subject.push({
                                                "subject_id": selected_sub.id,
                                                "subject_name": selected_sub.name,
                                                "timeData":
                                                    [{
                                                        "date":eventDate.toLocaleDateString(),
                                                        "start_time":start_time.toLocaleTimeString(),
                                                        "end_time":end_time.toLocaleTimeString()
                                                    }]
                                            });
                                        }
                                        else{
                                            obj_post.subject.push({
                                                "subject_id": selected_sub.id,
                                                "subject_name": selected_sub.name,
                                                "timeData":
                                                    [{
                                                        "date":eventDate,
                                                        "start_time":start_time.toLocaleTimeString(),
                                                        "end_time":end_time.toLocaleTimeString()
                                                    }]
                                            });
                                        }
                                           
                                    }
                                    else{
                                        obj_post.subject.push({
                                            "subject_id": ele.subject_id,
                                            "subject_name": ele.subject_name,
                                            "timeData":
                                                [{
                                                    "date": ele.date,
                                                    "start_time": ele.start_time,
                                                    "end_time": ele.end_time
                                                }]
                                        });
                                    }
                                    
                                        // data.status = ele.timeTable[0].status;
                                    });
                        }
                            const id=props.examTimeTable[0].id;
                            console.log(id);
                            const res = await TimetableService.put_subject(token,id,obj_post);
                            console.log(res);
                            console.log(res.data.data);
                
                                if (res.status === 200) {
                                    console.log("put success");
                                }
                                else {
                                    console.log('error post')
                                }
                }
                else{
                    if(Array.isArray(props.TimeTableData) && props.TimeTableData.length)
                            {
                                props.TimeTableData.forEach(ele => {
                                
                                    obj_post.subject.push({
                                            "subject_id": ele.subject_id,
                                            "subject_name": ele.subject_name,
                                            "timeData":
                                                [{
                                                    "date": ele.date,
                                                    "start_time": ele.start_time,
                                                    "end_time": ele.end_time
                                                }]
                                        });
                                        // data.status = ele.timeTable[0].status;
                                    });
                            }
                                
                                    obj_post.subject.push({
                                        "subject_id": selected_sub.id,
                                        "subject_name": selected_sub.name,
                                        "timeData":
                                            [{
                                                "date":eventDate.toLocaleDateString(),
                                                "start_time":start_time.toLocaleTimeString(),
                                                "end_time":end_time.toLocaleTimeString()
                                            }]
                                    });
                            console.log(obj_post);
                            // {
                            //     "subject_id":selected_sub.id,
                            //     "subject_name":selected_sub.name,
                            //     "timeData":
                            //     [
                            //         {
                            //             "date":eventDate.toLocaleDateString(),
                            //             "start_time":start_time.toLocaleTimeString(),
                            //             "end_time":end_time.toLocaleTimeString()
                            //         }
                            //     ]
                            // }
                            const id=props.examTimeTable[0].id;
                            console.log(id);
                            const res = await TimetableService.put_subject(token,id,obj_post);
                            console.log(res);
                            console.log(res.data.data);
                
                                if (res.status === 200) {
                                    console.log("put success");
                                }
                                else {
                                    console.log('error post')
                                }
                }
                            
    
            }else{
    
                console.log("empty-post");
                var obj_post={
                    "class_id":props.testData.class_id,
                    "test_id":props.testData.id,
                    "status":"draft",
                    "subject":
                            [{
                                "subject_id":selected_sub.id,
                                "subject_name":selected_sub.name,
                                "timeData":
                                [
                                    {
                                        "date":eventDate.toLocaleDateString(),
                                        "start_time":start_time.toLocaleTimeString(),
                                        "end_time":end_time.toLocaleTimeString()
                                    }
                                ]
                            }]
                };
                console.log(obj_post);
                // console.log(start_time.toLocaleTimeString());
                // console.log(end_time.toLocaleTimeString());
                // console.log(eventDate.toLocaleDateString());
    
                const res = await TimetableService.post_subject(token,obj_post);
                console.log(res);
                console.log(res.data.data);
    
                    if (res.status === true) {
                        console.log("post success");
                    }
                    else {
                        console.log('error post')
                    }
            }
            props.double_sublistBacktick();
        }
        
    }


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
    // console.log("sub list",props.subjectCategList);
    console.log("test data",props.testData);
    // console.log("TimeTableData",props.TimeTableData);
    // console.log("examTimeTable",props.examTimeTable);


    return (
        <Fragment>
            {editTimeTableUI === false ?
                <div>
                    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                                {modal_sub}
                            </DialogTitle>
                                <DialogContent dividers>
                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                    <Grid container className={classes.fieldStyle}>
                                                    <Grid item xs={12}>
                                                        <DatePicker
                                                        id="eventDate"
                                                        label="Exam Date"
                                                        variant="dialog"
                                                        minDate={new Date()}
                                                        format="MM/dd/yyyy"
                                                        value={eventDate}
                                                        onChange={handleEventDate}
                                                        InputProps={{
                                                            endAdornment: (
                                                            <InputAdornment position="end">
                                                                <IconButton>
                                                                <EventIcon />
                                                                </IconButton>
                                                            </InputAdornment>
                                                            ),
                                                        }}
                                                        className={classes.datePicker}
                                                        />
                                                    </Grid>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <KeyboardTimePicker
                                                        margin="normal"
                                                        label="Start Time"
                                                        value={start_time}
                                                        onChange={handlestart_time}
                                                        KeyboardButtonProps={{
                                                            'aria-label': 'change time',
                                                        }}
                                                        />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                        <KeyboardTimePicker
                                                        margin="normal"
                                                        label="End Time"
                                                        value={end_time}
                                                        onChange={handleend_time}
                                                        KeyboardButtonProps={{
                                                            'aria-label': 'change time',
                                                        }}
                                                        />
                                                        </Grid>
                                                </MuiPickersUtilsProvider>

                                </DialogContent>
                            <DialogActions>
                        <Button autoFocus onClick={check_put_post_data} color="primary">
                            Save
                        </Button>
                        </DialogActions>
                    </Dialog>

                    <Grid container spacing={3} style={{ paddingLeft: '12px', paddingTop: '30px' }}>

                        <Grid item xs={12} style={{ textAlign: 'center', paddingTop: "0" }}>
                            <div style={{ float: 'left' }}>
                                <ArrowBackIosIcon fontSize="small" style={{ float: 'left', cursor: "pointer", fontSize: '1.1rem' }} onClick={props.sublistBacktick}></ArrowBackIosIcon>
                            </div>
                            {/* <div style={{ float: 'right' }}>
                                <ArrowForwardIosIcon style={{ float: 'right', fontSize: '1.1rem', display: hideforwardsubjectick, cursor: "pointer" }} onClick={forwardsubjecttick} fontSize="small" ></ArrowForwardIosIcon>
                            </div> */}
                            <Typography className={classes.headingtest}>{props.classDetail}&nbsp;-&nbsp;{props.testData.name}&nbsp;-&nbsp;Timetable</Typography>
                        </Grid>
                    </Grid>

                    {props.subjectCategList.map((items, index) => {
                        return (
                            <div style={{ display: '', paddingLeft: '5px', paddingRight: '5px' }}>
                                <Grid item xs={12} style={{ paddingLeft: '12px' }}>
                                    <Typography className={classes.subcategory} style={{ marginTop: '25px', textAlign: 'center' }}>{items.categoryName}</Typography>
                                </Grid>
                                <Grid container spacing={3}>
                                {items.subjectList.map((sub) => {
                                    return <Grid container className={classes.tablestyle} lg={6} md={12} sm={6} xs={12} style={{ padding: '2%' }}>
                                        <Grid lg={12} sm={12} xs={12}>
                                            <Typography display="" align="center" gutterBottom className={classes.paper} >
                                                {/* {(sub.editable ?<span   style={{ float: 'right', marginRight: "10px", marginTop: '2px',cursor:"pointer" }} onClick={(e) => editTimeTableClick(e, sub.timeTable)}> <img src={EditLogo} alt="editLogo" /></span> :
                                                <span   style={{ float: 'right', marginRight: "10px", marginTop: '2px',cursor:"pointer" }} onClick={(e) => editTimeTableClick(e, sub.timeTable)}> <img src={EditLogo} alt="editLogo" /></span>
                                                 )}  */}
                                                <span className={classes.subjectname}>{sub.name}</span>
                                                {/* <span style={{ float: 'right', marginRight: "10px", marginTop: '2px', cursor: "pointer" }} onClick={(e) => editTimeTableClick(e, sub, items.subjectList)}> <img src={EditLogo} alt="editLogo" /></span> */}
                                                
                                                {props.examTimeTable !==null?
                                                (
                                                    props.examTimeTable[0].status==='published'?
                                                    (<span></span>)
                                                    :
                                                    ((Object.keys(sub.timeTable).length === 0)?
                                                    <span style={{ float: 'right', marginRight: "10px", marginTop: '2px', cursor: "pointer" }} onClick={()=>handleClickOpen(sub,false)}> <img src={EditLogo} alt="editLogo" /></span>
                                                    :
                                                    <span style={{ float: 'right', marginRight: "10px", marginTop: '2px', cursor: "pointer" }} onClick={()=>handleClickOpen(sub,true)}> <img src={EditLogo} alt="editLogo" /></span>
                                                    )

                                                )
                                                :
                                                ((Object.keys(sub.timeTable).length === 0)?
                                                    <span style={{ float: 'right', marginRight: "10px", marginTop: '2px', cursor: "pointer" }} onClick={()=>handleClickOpen(sub,false)}> <img src={EditLogo} alt="editLogo" /></span>
                                                    :
                                                    <span style={{ float: 'right', marginRight: "10px", marginTop: '2px', cursor: "pointer" }} onClick={()=>handleClickOpen(sub,true)}> <img src={EditLogo} alt="editLogo" /></span>
                                                    )
                                                }
                                              
                                                


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
                                                // sub.timeTable.map((timeTable) => {
                                                //     return (

                                                    (Object.keys(sub.timeTable).length === 0)?
                                                            <Grid container lg={12} sm={12} xs={12} >
                                                                <Grid container spacing={0}>

                                                                <Grid item lg={4} md={4} sm={4} xs={4} className={classes.headingList1} style={{ borderRight: '0', borderBottomLeftRadius: '5px' }}>
                                                                {/* <Typography >1</Typography> */}

                                                                    
                                                            <Typography style={{ background: 'white', padding: '0px', borderBottomLeftRadius: "5px" }}>-</Typography>
                                                                    
                                                                </Grid>
                                                                <Grid item lg={4} md={4} sm={4} xs={4} className={classes.headingList1} style={{ borderLeft: '1px solid lightgrey' }}>
                                    
                                                                    <Typography style={{ background: 'white', padding: '0px' }}>
                                                                        -
                                                                    </Typography>
                                                                    
                                                                </Grid>
                                                                <Grid item lg={4} md={4} sm={4} xs={4} className={classes.headingList1} style={{ borderRight: '0', borderBottomRightRadius: '5px' }}>
                                                                
                                                                    <Typography style={{  background: 'white', padding: '0px', borderBottomRightRadius: '5px' }}>-</Typography>
                                                                    
                                                                    </Grid>
                                                                    </Grid>

                                                            </Grid>
                                                            
                                                            :
                                                            <Grid container lg={12} sm={12} xs={12} >
                                                                <Grid container spacing={0}>

                                                                <Grid item lg={4} md={4} sm={4} xs={4} className={classes.headingList1} style={{ borderRight: '0', borderBottomLeftRadius: '5px' }}>
                                                                {/* <Typography >1</Typography> */}

                                                                    
                                                            <Typography style={{ background: 'white', padding: '0px', borderBottomLeftRadius: "5px" }}>{sub.timeTable[0].date}</Typography>
                                                                    
                                                                </Grid>
                                                                <Grid item lg={4} md={4} sm={4} xs={4} className={classes.headingList1} style={{ borderLeft: '1px solid lightgrey' }}>
                                    
                                                                    <Typography style={{ background: 'white', padding: '0px' }}>
                                                                        {sub.timeTable[0].start_time}
                                                                    </Typography>
                                                                    
                                                                </Grid>
                                                                <Grid item lg={4} md={4} sm={4} xs={4} className={classes.headingList1} style={{ borderRight: '0', borderBottomRightRadius: '5px' }}>
                                                                
                                                                    <Typography style={{  background: 'white', padding: '0px', borderBottomRightRadius: '5px' }}>{sub.timeTable[0].end_time}</Typography>
                                                                    
                                                                    </Grid>
                                                                    </Grid>

                                                            </Grid>
                                                            
                                                //     )
                                                // })


                                            }
                                        </Grid>
                                    </Grid>

                                })}
                                </Grid>
                            </div>
                        )


                    })}
                    <br/>
                    <br/>

                                                {props.examTimeTable !==null?
                                                (
                                                    props.examTimeTable[0].status==='published'?
                                                    (<span></span>)
                                                    :
                                                    (<Grid item xs={12} style={{ textAlign: 'right', paddingTop: "20px", marginBottom: '50px' }}>
                                                    <Typography>
                                                        <Button variant="contained" onClick={publish_timetable} style={{ background: '#7b72af', color: '#FFFFFF' }}>
                                                            Publish Now
                                                            </Button>
                                                    </Typography>
                                                </Grid>)

                                                )
                                                :
                                                (<Grid item xs={12} style={{ textAlign: 'right', paddingTop: "20px", marginBottom: '50px' }}>
                                                <Typography>
                                                    <Button variant="contained" onClick={publish_timetable} style={{ background: '#7b72af', color: '#FFFFFF' }}>
                                                        Publish Now
                                                        </Button>
                                                </Typography>
                                            </Grid>)
                                                }
                                                {/* {props.examTimeTable[0].status==='published'?
                                                    (<span></span>)
                                                    :
                                                    (
                                                    <Grid item xs={12} style={{ textAlign: 'right', paddingTop: "20px", marginBottom: '50px' }}>
                                                        <Typography>
                                                            <Button variant="contained" onClick={publish_timetable} style={{ background: '#7b72af', color: '#FFFFFF' }}>
                                                                Publish Now
                                                                </Button>
                                                        </Typography>
                                                    </Grid>
                                                    )
                                                } */}
                    {/* <Grid item xs={12} style={{ textAlign: 'right', paddingTop: "20px", marginBottom: '50px' }}>

                        <Typography>
                            <Button variant="contained" style={{ background: '#7b72af', color: '#FFFFFF' }}>
                                Publish Now
                                </Button>
                        </Typography>
                    </Grid> */}

                </div> :
                <Container>
                    <Grid container spacing={3} style={{ marginTop: "20px", paddingLeft: '15px', paddingRight: '15px', marginBottom: '20px' }}>

                        <Grid item xs={12} style={{ textAlign: 'center', paddingTop: "0" }}>
                            <div style={{ float: 'left' }}>
                                <ArrowBackIosIcon fontSize="small" onClick={timetableInputbacktik} style={{ float: 'left', fontSize: '1.1rem' }}></ArrowBackIosIcon>
                            </div>

                            <Typography className={classes.headingtest}>{props.classDetail}&nbsp;-&nbsp;{props.testData.name}&nbsp;-&nbsp;Timetable</Typography>
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




