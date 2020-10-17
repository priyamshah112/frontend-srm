

import React, { Fragment, useEffect, useState } from "react";
import TimetableService from '../timeTableService';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Paper from '@material-ui/core/Paper';
import medal from '../../../assets/images/Medal.png'
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TestSubjectPage from './testSubjectPage';




const useStyles = makeStyles((theme) => ({
    card: {
        width: '30%',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        // height: "80px",
        // width: "75px",
        marginTop: "20px",
        border: "1px solid #7b72af",
        marginRight: "0",
        marginBottom: '20px'

    },

    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        padding:'20px'
    },
    gridList: {
        width: "80%",
        minHeight: 450,
        marginTop: '50px'

    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));
const StudentTimeTable = (props) => {
    const classes = useStyles();
    const token = localStorage.getItem("srmToken");
    const [ClassTestList, SetClassTestList] = useState(null);
    const [testID, setTestID] = useState();
    const [ClassID, setClassID] = useState(props.classID);
    const [subPageUI, setSubPageUI] = useState(false);
    const [emptyTimeTable, setEmptyTimeTable] = useState("");
    const [TimeTableData, setTimeTableData] = useState(null);
    const [editTimeTableUI, setEditTimeTableUI] = useState(false);
    const [timetableinput, setTimetableinput] = useState();
    const [backticktimetableInput,setBackticktimetableInput] = useState(false);
    const [hideforwardsubjectick,setHideforwardsubjectick] = useState("none");
    const [forwardsublistT,setforwardsublistT] = useState("none")

    const fetchClassTestList = async () => {
        const res = await TimetableService.getStudentTestList(token, props.classID)
        if (res.status === 200) {
            const data = res.data.data.data;
            SetClassTestList(data);
        }
    }

    const fetchTestSublistWithTime = async (testid) => {
        const res = await TimetableService.getExamTestSubList(token, testid.class_id,testid.id)

        if (res.status === 200) {
            let data = res.data.data.examTimeTable;
            if (Array.isArray(data) && data.length) {
                console.log('fine array')
                console.log(data)
                let data1 = res.data.data.examTimeTable[0].timetable_data

                if (Array.isArray(data1) && data1.length) {
                    // console.log(data1)
                    setTimeTableData(data1)
                }
                else {
                    setTimeTableData(null)
                }
            }
            else {
                setEmptyTimeTable('TimeTable is not avilabel ')
                // console.log('empty array');
            }

        }


    }



   


    useEffect(() => {
        fetchClassTestList()
    })
    const clickTest = (e,testid) => {
        setTestID(testid.class_id)
            fetchTestSublistWithTime(testid)
            setSubPageUI(true)
        

    }
    const sublistBacktick=()=>{
        setSubPageUI(false)
    }
    const forwardtestListbacktick=()=>{
        setSubPageUI(true)
        setforwardsublistT('')

    }
    return (
        <Fragment>
            {subPageUI===false ?
            <div>

                <Grid container spacing={12} style={{ marginTop: '15px', marginBottom: '15px' }}>

                    <Grid item xs={12} style={{ textAlign: 'center' }}>
                                                <Typography >Test List</Typography>

                    </Grid>
                    <div style={{ float: 'right' }}>
                            <ArrowForwardIosIcon style={{ float: 'right',display:hideforwardsubjectick }}  fontSize="small" ></ArrowForwardIosIcon>
                        </div>
                </Grid>

                <div className={classes.root}>

                    <Grid container spacing={5}>

                        {ClassTestList != null ?
                            Object.keys(ClassTestList).map((key, index) => {
                                return (
                                    <Grid item xs={6} lg={3} sm={4} style={{ justifyContent: 'space-between' }}>
                                        <Paper className={classes.paper} key={index} onClick={(e) => clickTest(e, ClassTestList[key])}>
                                            <div>
                                                <img src={medal} alt="medalavt" width='65%' height="50%" />
                                            </div>
                                            <Typography >{ClassTestList[key].name}</Typography>

                                        </Paper>

                                    </Grid>


                                )
                            }) : null}
                    </Grid>
                </div>

                {/*   pagination part  <GridListTile key={tile.img}>
                                 <img src={tile.img} alt={tile.title} />
                                 <GridListTileBar
                                     title={tile.title}
                                     subtitle={<span>by: {tile.author}</span>}
                                     actionIcon={
                                         <IconButton aria-label={`info about ${tile.title}`} className={classes.icon}>
                                             <InfoIcon />
                                         </IconButton>
                                     }
                                 />
                             </GridListTile> */}
            </div>
             :

            <Container>
                <TestSubjectPage testID={testID}
                 ClassID={ClassID}
                  sublistBacktick={sublistBacktick} 
                  TimeTableData={TimeTableData}
                  forwardsublistT={forwardsublistT} />
            </Container>
            }

        </Fragment >
    )
}
export default StudentTimeTable;