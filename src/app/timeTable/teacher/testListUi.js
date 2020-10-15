import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
// import medal from '../../assets/images/Medal.png'
import Grid from '@material-ui/core/Grid';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Typography from '@material-ui/core/Typography';
import EditLogo from '../../../assets/images/Edit.svg';
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';



import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';








const useStyles = makeStyles((theme) => ({


    root: {
        flexGrow: 1,
        marginTop: '30px'

    },
    containergrid:{
        minWidth:'100%',
        [theme.breakpoints.down('lg',"xl")]: {
        maxWidth:"55%"
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
            width:"50%"
          },
      },
      datepicker:{
        width:"30%",
        padding:"0",
        [theme.breakpoints.down('xs')]: {
            width:"50%"
          },
      }
}));

export default function TestListUi(props) {
    const classes = useStyles();
    const [ediTest, setEditTest] = useState(false)
    const [forwardTick,setForwardTick] = useState("none")

    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const edittimetable = () => {
        setEditTest(true)
    }
    const editSubTestTimetick=()=>{
        setEditTest(false)
        setForwardTick("")
    }
    const forwardtickButton=()=>{
        setEditTest(true)

    }


    return (
        <div>
            {ediTest === false ?

                <Grid container spacing={3} style={{ marginTop: "20px", paddingLeft: '15px', paddingRight: '15px' }}>

                    <Grid item xs={12} style={{ textAlign: 'center', paddingTop: "0" }}>
                        <div style={{ float: 'left' }}>
                            <ArrowBackIosIcon fontSize="small" onClick={props.backTick} style={{ float: 'left' }}></ArrowBackIosIcon>
                        </div>
                        <div style={{ float: 'right', display:forwardTick}}>
                            <ArrowForwardIosIcon style={{ float: 'right', display:forwardTick}} fontSize="small" onClick={forwardtickButton}></ArrowForwardIosIcon>
                        </div>
                        <Typography>Test List</Typography>
                        


                    </Grid>

                    <Grid item xs={12} lg={6} style={{ marginTop: "20px" }}>
                        <div style={{ background: "#FFFFFF 0% 0% no-repeat padding-box" }}>
                            <Grid xs={12}>
                                <Typography display="" align="center" gutterBottom className={classes.paper}>
                                    <span style={{}}>Math</span>
                                    <span style={{ float: 'right', marginRight: "10px", marginTop: '2px' }} onClick={edittimetable}> <img src={EditLogo} alt="editLogo" /></span>
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
                                    <Typography>15-12-2020</Typography>
                                </Grid>
                                <Grid item xs={4} className={classes.dataList}>
                                    <Typography>

                                    </Typography>
                                </Grid>
                                <Grid item xs={4} className={classes.dataList} style={{ borderRight: "0" }}>
                                    <Typography>12.20 PM</Typography>
                                </Grid>

                            </Grid>
                        </div>
                    </Grid>
                </Grid> :
                <Grid container spacing={3} style={{ marginTop: "20px", paddingLeft: '15px', paddingRight: '15px' }}>
                    <Grid item xs={12} style={{ textAlign: 'center', paddingTop: "0" }}>
                        <div style={{ float: 'left' }}>
                            <ArrowBackIosIcon fontSize="small" onClick={editSubTestTimetick}></ArrowBackIosIcon>
                        </div>
                        <Typography>Test List</Typography>
                    </Grid>
                    <Grid item xs={12} >
                        <Grid container style={{ color: '#FFFFFF'}} className={classes.containergrid} >
                            <Grid item xs={12} className={classes.headingList} style={{ borderTopLeftRadius: '5px',borderTopRightRadius :"5px" }}>
                                <Typography>Exam Date</Typography>
                            </Grid>
                            <Grid item xs={12} style={{textAlign:'center',background:'#FFFFFF',borderBottomRightRadius: '5px',borderBottomLeftRadius:'5px' }}>
                                <Typography >
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <Grid container justify="space-around">

                                            <KeyboardDatePicker
                                            className={classes.datepicker}
                                                margin="normal"
                                                id="date-picker-dialog"
                                                // label="Date picker dialog"
                                                format="MM/dd/yyyy"
                                                value={selectedDate}
                                                onChange={handleDateChange}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                                InputProps={{
                                                    disableUnderline: true,
                                                   }}
                                                 
                                            />

                                        </Grid>
                                    </MuiPickersUtilsProvider>
                                </Typography>
                            </Grid>

                        </Grid>

                    </Grid>
                    <Grid item xs={12}>
                        <Grid container style={{ color: '#FFFFFF' }} className={classes.containergrid}>
                            <Grid item xs={12} className={classes.headingList} style={{ borderTopLeftRadius: '5px',borderTopRightRadius :"5px"}}>
                                <Typography>Exam Date</Typography>
                            </Grid>
                            <Grid item xs={12} style={{  textAlign:'center',background:'#FFFFFF',borderBottomRightRadius: '5px',borderBottomLeftRadius:'5px' }}>
                                <Typography style={{textAlign:'center'}}>
                                    <form className={classes.container} noValidate>
                                        <TextField
                                            id="time"
                                            type="time"
                                            defaultValue="07:30"
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            inputProps={{
                                                step: 300, // 5 min
                                            }}
                                            InputProps={{
                                                disableUnderline: true,
                                               }}

                                        />
                                    </form>
                                </Typography>
                            </Grid>

                        </Grid>

                    </Grid>
                    <Grid item xs={12}>
                        <Grid container style={{ color: '#FFFFFF' }} className={classes.containergrid}>
                            <Grid item xs={12} className={classes.headingList} style={{ borderTopLeftRadius: '5px',borderTopRightRadius :"5px" }}>
                                <Typography>Exam Date</Typography>
                            </Grid>
                            <Grid item xs={12} style={{ textAlign:'center',background:'#FFFFFF' ,borderBottomRightRadius: '5px',borderBottomLeftRadius:'5px' }}>
                                <Typography>
                                    <form className={classes.container} noValidate>
                                        <TextField
                                            id="time"
                                            type="time"
                                            defaultValue="07:30"
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            inputProps={{
                                                step: 300, // 5 min
                                            }}
                                            InputProps={{
                                                disableUnderline: true,
                                               }}
                                        />
                                    </form>
                                </Typography>
                            </Grid>

                        </Grid>

                    </Grid>
                    <Grid item xs={12} style={{ textAlign: 'center', paddingTop: "0",marginTop:"5px" }}>
                        
                        <Typography>
                        <Button variant="contained" color="primary" style={{width:'40%'}}>Submit</Button>

                        </Typography>
                    </Grid>


                </Grid>

            }




        </div>

    );
}
