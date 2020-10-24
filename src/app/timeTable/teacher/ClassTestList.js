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





const useStyles = makeStyles((theme) => ({
    headingtest:{
        fonTize: "1rem",
        fontFamily: "Avenir Medium",
        fontWeight: "400",
        lineHeight: "1.5",
    },
    card: {
        width: '30%',
    },
    paper: {

        padding: theme.spacing(2),
        textAlign: 'center',
        cursor:'pointer'
    },
    
    backarrowbutton:{
        color:"black",
        fontSize:'1.1rem'
    },
    root: {
        root: {
            flexGrow: 1,
        },
    },
}));
const ClassTestList = (props) => {
    const classes = useStyles();
    const token = localStorage.getItem("srmToken");
    const [ClassTestList, SetClassTestList] = useState(null);
    const [testID, setTestID] = useState();
    // const [ClassID, setClassID] = useState();
    const [subPageUI, setSubPageUI] = useState(false);
    const [emptyTimeTable, setEmptyTimeTable] = useState("");
    const [TimeTableData, setTimeTableData] = useState(null);
    const [examTimeTable, setexamTimeTable] = useState(null);

    const [forwardsublistT, setforwardsublistT] = useState("none")
    const [subjectCategList, setSubjectCategList] = useState([]);
    const [testData,setTestData] = useState({});
    const [selected_test,setselected_test] = useState({});

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
            dt.timetable_data.map(time => {
                time.status = dt.status;
            });
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
                // const pTimeTable = timeTable.filter((ele) => ele.status === 'published');
                // let editable = true;
                // if (pTimeTable.length) {
                //     editable = false;
                // }
                let subjectDetails = {
                    timeTable: timeTable,
                    // editable: editable,
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
            console.log(subjectCategList)


            let data = res.data.data.examTimeTable;
            if (Array.isArray(data) && data.length) {
                let data1 = res.data.data.examTimeTable[0].timetable_data;
                let data2 = res.data.data.examTimeTable;
                console.log("data1",data1);
                console.log("data2",data2);
                setexamTimeTable(data2);


                if (Array.isArray(data1) && data1.length) {
                    // console.log(data1)
                    setTimeTableData(data1);
                    setexamTimeTable(data2);

                }
                else {
                    setTimeTableData(null);
                    // setexamTimeTable(null);
                }
            }
            else {
                setEmptyTimeTable('TimeTable is not avilabel ')
                // setexamTimeTable(null);
            }

        }


    }

    useEffect((e) => {
        fetchClassTestList()
    }, [])
    const clickTest = (e, testid) => {
        e.preventDefault();
        setTestData(testid)
        setTestID(testid.id)
        fetchTestSublistWithTime(testid)
        setselected_test(testid);
        setSubPageUI(true)
    }
    const sublistBacktick = () => {
        setSubPageUI(false)
    }
    const double_sublistBacktick = () => {
        // setSubPageUI(true);
        setSubPageUI(false);
        fetchTestSublistWithTime(selected_test)
        setSubPageUI(true);

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
                                <Link to='/timetable'>
                                    <ArrowBackIosIcon fontSize="small" className={classes.backarrowbutton}  ></ArrowBackIosIcon>
                                </Link>
                            </div>
                            <div style={{ float: 'right', display: forwardsublistT }} onClick={forwardtestListbacktick}><ArrowForwardIosIcon fontSize="small" ></ArrowForwardIosIcon></div>
                            <Typography className={classes.headingtest}>{props.classDetail}&nbsp;-&nbsp;Timetable</Typography>

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
                        testData={testData}
                        classDetail={props.classDetail}
                        // ClassID={ClassID}
                        sublistBacktick={sublistBacktick}
                        TimeTableData={TimeTableData}
                        double_sublistBacktick={double_sublistBacktick}
                        examTimeTable={examTimeTable}
                        forwardsublistT={forwardsublistT}
                        subjectCategList={subjectCategList} />
                </Container>
            }

        </Fragment >
    )
}
export default ClassTestList;
