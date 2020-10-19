import React, { Fragment, useEffect, useState } from "react";
import TimetableService from '../timeTableService';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import medal from '../../../assets/images/Medal.png'
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Typography from '@material-ui/core/Typography';
import TestSubjectPage from './testSubjectPage';
import { Link } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';




const useStyles = makeStyles((theme) => ({
    card: {
        width: '30%',
    },
    paper: {
        // padding: theme.spacing(2),
        // textAlign: 'center',
        // marginTop: "20px",
        // border: "1px solid #7b72af",
        // marginRight: "0",
        // marginBottom: '20px',
        // maxHeight: "128px",
        // maxWidth: "138px",
        // opacity: 1
        padding: theme.spacing(2),
        textAlign: 'center',
        cursor:'pointer'



    },
    
    backarrowbutton:{
        color:"black",
    },
    root: {
        // display: 'flex',
        // flexWrap: 'wrap',
        // justifyContent: 'space-around',
        // overflow: 'hidden',
        root: {
            flexGrow: 1,
        },

    },
    // gridList: {
    //     width: "90%",
    //     minHeight: 450,
    //     marginTop: '50px'

    // },
    // icon: {
    //     color: 'rgba(255, 255, 255, 0.54)',
    // },
}));
const ClassTestList = (props) => {
    const classes = useStyles();
    const token = localStorage.getItem("srmToken");
    const [ClassTestList, SetClassTestList] = useState(null);
    const [testID, setTestID] = useState();
    const [ClassID, setClassID] = useState(props.classID);
    const [subPageUI, setSubPageUI] = useState(false);
    const [emptyTimeTable, setEmptyTimeTable] = useState("");
    const [TimeTableData, setTimeTableData] = useState(null);
    const [forwardsublistT, setforwardsublistT] = useState("none")
    const [subjectCategList, setSubjectCategList] = useState([]);
    const fetchClassTestList = async () => {
        const res = await TimetableService.getClassTestList(token, props.classID)
        if (res.status === 200) {
            const data = res.data.data.data;
            SetClassTestList(data);
        }
    }
    const formateSubjectCategory = (data) => {
        let subjectTimeTable = [];
        let examTimeTable = data.data.examTimeTable;
        let subjectDetails = data.data.subjectDetails;
        for (let dt of examTimeTable) {
            Array.prototype.push.apply(subjectTimeTable, dt.timetable_data);
        }
        let categorySubject = [];
        for (let key in subjectDetails) {
            let categoryName = key;
            let tmpCategorySubject = {
                categoryName: categoryName,
                subjectList: [],
            };
            for (let sub of subjectDetails[key]) {
                let timeTable = subjectTimeTable.filter((ele) => ele.subject_id === sub.id);
                const pTimeTable = timeTable.filter((ele) => ele.status === 'published');
                let editable = true;
                if (pTimeTable.length) {
                    editable = false;
                }
                let subjectDetails = {
                    timeTable: timeTable,
                    editable: editable,
                    ...sub,
                };
                tmpCategorySubject.subjectList.push(subjectDetails);
            }
            categorySubject.push(tmpCategorySubject);
        }
        return categorySubject;
    }

    const fetchTestSublistWithTime = async (testid) => {
        const res = await TimetableService.getTestSbjectList(token, testid.class_id, testid.id)

        if (res.status === 200) {
            let subjectCategList = formateSubjectCategory(res.data);
            // console.log(subjectCategList);
            setSubjectCategList(subjectCategList);


            let data = res.data.data.examTimeTable;
            if (Array.isArray(data) && data.length) {
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
            }

        }


    }

    useEffect(() => {
        fetchClassTestList()
    }, [])
    const clickTest = (e, testid) => {
        setTestID(testid.id)
        fetchTestSublistWithTime(testid)
        setSubPageUI(true)


    }
    const sublistBacktick = () => {
        setSubPageUI(false)
    }
    const forwardtestListbacktick = () => {
        setSubPageUI(true)
        setforwardsublistT('')

    }
    return (
        <Fragment>
            {subPageUI === false ?
                <div>

                    <Grid container spacing={12} style={{ marginTop: '15px', marginBottom: '15px' }}>

                        <Grid item xs={12} style={{ textAlign: 'center' }}>
                            <div style={{ float: 'left' }}>
                                <Link to='/timetableclasslist'>
                                    <ArrowBackIosIcon fontSize="small" className={classes.backarrowbutton}  ></ArrowBackIosIcon>
                                </Link>
                            </div>
                            <div style={{ float: 'right', display: forwardsublistT }} onClick={forwardtestListbacktick}><ArrowForwardIosIcon fontSize="small" ></ArrowForwardIosIcon></div>
                            <Typography >Test List</Typography>

                        </Grid>
                    </Grid>


                    <Grid container spacing={3}>

                        {ClassTestList != null ?
                            Object.keys(ClassTestList).map((key, index) => {
                                return (
                                    <Grid item xs={12} lg={4} sm={6} md={6} xl={3}>
                                        <Paper className={classes.paper} key={index} onClick={(e) => clickTest(e, ClassTestList[key])}>
                                            
                                            <img src={medal} alt="medalavt" maxwidth='59px' maxheight="78px" />
                                            <Typography style={{ color: '#1C1C1E', font: 'normal normal medium 18px/25px Avenir', letterSpacing: "0px" }}>{ClassTestList[key].name}</Typography>

                                        </Paper>

                                    </Grid>


                                )
                            }) : null}
                    </Grid>


                </div> :

                <Container style={{ marginBottom: '50px', overflow: 'auto' }}>
                    <TestSubjectPage 
                    testID={testID}
                        ClassID={ClassID}
                        sublistBacktick={sublistBacktick}
                        TimeTableData={TimeTableData}
                        forwardsublistT={forwardsublistT}

                        subjectCategList={subjectCategList} />
                </Container>
            }

        </Fragment >
    )
}
export default ClassTestList;