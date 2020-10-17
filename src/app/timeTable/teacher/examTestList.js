import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import medal from '../../../assets/images/Medal.png'
import TestListUi from './testListUi';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Typography from '@material-ui/core/Typography';
import TimetableService from '../timeTableService';






const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: '30px'

    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        // height: "80px",
        // width: "75px",
        marginTop: "30px",
        border: "1px solid #7b72af",
        marginRight: "0"
    },
}));

export default function TestList(props) {
    const classes = useStyles();
    const [testListUi, setTestListUi] = useState(false);
    const token = localStorage.getItem("srmToken");
    const [isLoading, setLoading] = useState(true);
    const [forwardtick, setForwardtick] = useState('none')
    const [testID, setTestID] = useState();
    const [testSubList, setTestSubList] = useState(null)



    const fetchSubTestList = async (test_id) => {
        const response = await TimetableService.getTestSbjectList(token, props.classId, test_id.id);
        if (response.status === 200) {
            let alllist = response.data.data.examTimeTable[0].timetable_data
            if (typeof alllist != "undefined" && alllist != null && alllist.length != null
                && alllist.length > 0) {
                setTestSubList(response.data.data.examTimeTable[0].timetable_data.map(testsublist => testsublist))
                setTestListUi(true);
            }
            else {
                setTestSubList(["data is not"])
            }




            // setTestSubList(response.data.data.examTimeTable[0].timetable_data.map(testsublist=>testsublist))

            //  console.log(typeof response.data.data.examTimeTable[0].timetable_data.map(testsublist=>testsublist))
        }
        if (response.data.status == "success" && testSubList == null) {

            setLoading(false)
            // setTestlist(response.data.data.data)
            // console.log("raju",response.data.data.data)

        }
    }


    const clickTestList = (e, test_id) => {
        // e.preventDefault()
        fetchSubTestList(test_id)
        setTestID(test_id.id)

    }
    const backTick = () => {
        setTestListUi(false)
        setForwardtick('')

    }
    const forwardTick = () => {
        setTestListUi(true)
    }



    return (

        <div style={{ marginTop: '20px' }}>
            {testListUi === false ?
                <Container>
                    <Grid container spacing={12}>

                        <Grid item xs={12} style={{ textAlign: 'center' }}>
                            <div style={{ float: 'left' }}>
                                <ArrowBackIosIcon fontSize="small" onClick={props.backtickTestList}></ArrowBackIosIcon>
                            </div>
                            <div style={{ float: 'right', display: forwardtick }}><ArrowForwardIosIcon fontSize="small" onClick={forwardTick}></ArrowForwardIosIcon></div>
                            <Typography >Test List</Typography>

                        </Grid>
                    </Grid>
                    <div className={classes.root}>

                        <Grid container spacing={10}>
                            {props.testNmae != null
                                ? Object.keys(props.testNmae).map(function (key, index) {

                                    return (<Grid item xs={6} lg={3} sm={4} style={{ justifyContent: 'space-between' }}>
                                        <Paper className={classes.paper} key={index} onClick={(e) => clickTestList(e, props.testNmae[key])}>
                                            <div>
                                                <img src={medal} alt="medalavt" width='65%' height="50%" />
                                            </div>
                                            <Typography >{props.testNmae[key].name}</Typography>

                                        </Paper>
                                    </Grid>
                                    )
                                }) : null}
                        </Grid>
                    </div>

                </Container> :
                <div>

                    {/* {testSubList.map(function(key,index){
                    return <span key={index}>{testSubList[index].date}</span>
                    })} */}
                    <TestListUi backTick={backTick} testSubList={testSubList} />
                </div>}
        </div>

    );
}

