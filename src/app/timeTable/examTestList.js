import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import medal from '../../assets/images/Medal.png'
import TestListUi from './testListUi';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';





const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: '30px'

    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        height: "80px",
        width: "75px",
        marginTop: "30px",
        border: "1px solid #7b72af"
    },
}));

export default function TestList(props) {

    const [testListUi, setTestListUi] = useState(false);
    const [forwardtick, setForwardtick] = useState('none')
    const classes = useStyles();

    const clickTestList = () => {
        setTestListUi(true)
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
                    <Grid item xs={12} style={{ textAlign: 'center' }}>
                        <div style={{ float: 'left' }}>
                            <ArrowBackIosIcon fontSize="small" onClick={props.backtickTestList}></ArrowBackIosIcon>
                        </div>
                        <div style={{ float: 'right', display: forwardtick }}><ArrowForwardIosIcon fontSize="small" onClick={forwardTick}></ArrowForwardIosIcon></div>
                        <h3 style={{ margin: '0' }}>Test</h3>

                    </Grid>
                    <div className={classes.root}>

                    <Grid container spacing={6}>
                    {props.testNmae.map((key, index) => {

                        return  <Grid item xs={3}>
                         <Paper  className={classes.paper} onClick={clickTestList}>
                            <div>
                                <img src={medal} alt="medalavt" width='60%' height="80%" />
                            </div>
                            <span style={{ color: '#1C1C1E)' }}>{props.testNmae[index]}</span>
                        </Paper>
                        </Grid>
                    })}
                    </Grid>
                    </div>

                </Container> :
                <TestListUi backTick={backTick} />}
        </div>

    );
}
