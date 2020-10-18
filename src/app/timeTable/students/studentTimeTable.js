

import React, { Fragment, useEffect, useState } from "react";
import TimetableService from '../timeTableService';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import medal from '../../../assets/images/Medal.png'
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TestSubjectPage from './testSubjectPage';




const useStyles = makeStyles((theme) => ({
    card: {
        width: '30%',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        maxHeight: "128px",
        maxWidth: "138px",
        marginTop: "20px",
        border: "1px solid #7b72af",
        marginRight: "0",
        marginBottom: '20px',
        opacity: 1

    },

    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        padding: '20px'
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
    const [TimeTableData, setTimeTableData] = useState(null);
    const [subjectDetail, setSubjectDeatil] = useState();
    const [examTimeTable, setExamTimeTable] = useState(null);
    const [subCatgarray, setSubCatgarray] = useState(null);
    const [backTick, setBackTick] = useState(false)

    const fetchClassTestList = async () => {
        const res = await TimetableService.getStudentTestList(token, props.classID)
        if (res.status === 200) {
            const data = res.data.data.data;
            SetClassTestList(data);
        }
    }
    useEffect(() => {
        fetchClassTestList()
    }, [])


    const clickTest = (e, testid) => {
        setTestID(testid)
        setSubPageUI(true)
    }

    const sublistBacktick = (e) => {
        e.preventDefault()
        setSubPageUI(false)
    }

    return (
        <Fragment>
            {subPageUI === false ?
                <div>
                    <Grid container spacing={12} style={{ marginTop: '30px', marginBottom: '15px', display: 'inline' }}>
                        <Typography style={{ textAlign: 'center', marginTop: 'inherit', paddingRight: '20px' }}>Test List</Typography>
                    </Grid>

                    <div className={classes.root}>

                        <Grid container spacing={5}>

                            {ClassTestList != null ?
                                Object.keys(ClassTestList).map((key, index) => {
                                    return (
                                        <Grid item xs={6} lg={3} sm={4} style={{ justifyContent: 'space-between' }}>
                                            <Paper className={classes.paper} key={index} onClick={(e) => clickTest(e, ClassTestList[key])}>
                                                <div>
                                                    <img src={medal} alt="medalavt" width='59px' height="78px" />
                                                </div>
                                                <Typography style={{ color: '#1C1C1E', font: 'normal normal medium 18px/25px Avenir', letterSpacing: "0px" }}>{ClassTestList[key].name}</Typography>
                                            </Paper>

                                        </Grid>


                                    )
                                }) : null}
                        </Grid>
                    </div>


                </div>
                :
                <Container style={{ marginBottom: "100px" }}>
                    <TestSubjectPage
                        sublistBacktick={sublistBacktick}
                        TimeTableData={TimeTableData}
                        subjectDetail={subjectDetail}
                        examTimeTable={examTimeTable}
                        subCatgarray={subCatgarray}
                        testID={testID}
                        setSubPageUI={setSubPageUI}

                        sublistBacktick={sublistBacktick}
                    />
                </Container>
            }

        </Fragment >
    )
}
export default StudentTimeTable;