import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import medal from '../../assets/images/Medal.png'
import Grid from '@material-ui/core/Grid';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';





const useStyles = makeStyles((theme) => ({


    root: {
        flexGrow: 1,
        marginTop: '30px'

    },
    paper: {
        // padding: theme.spacing(2),
        textAlign: 'center',
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
    }
}));

export default function TestListUi(props) {
    const classes = useStyles();


    return (
        <Grid container spacing={3} style={{ marginTop: "10px", paddingLeft: '15px', paddingRight: '15px' }}>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
                <div style={{ float: 'left' }}>
                    <ArrowBackIosIcon fontSize="small" onClick={props.backTick}></ArrowBackIosIcon>
                </div>
                <h3 style={{ margin: '0' }}>Test 1</h3>

            </Grid>

            <Grid fixed item xs={6}>
                <div style={{ background: "#FFFFFF 0% 0% no-repeat padding-box" }}>
                    <Paper className={classes.paper}>
                        <div> <span>Math</span></div>
                    </Paper>
                    <Grid container style={{ color: '#FFFFFF' }}>
                        <Grid item xs={4} className={classes.headingList} style={{ borderTopLeftRadius: '5px' }}>Exam Date</Grid>
                        <Grid item xs={4} className={classes.headingList} >Start Time</Grid>
                        <Grid item xs={4} className={classes.headingList} style={{ borderTopRightRadius: '5px', borderRight: '0' }}>End Time</Grid>

                    </Grid>
                    <Grid container>
                        <Grid item xs={4} className={classes.dataList}>15-12-2020</Grid>
                        <Grid item xs={4} className={classes.dataList}>10.20 PM</Grid>
                        <Grid item xs={4} className={classes.dataList} style={{ borderRight: "0" }}>12.20 PM</Grid>

                    </Grid>
                </div>
            </Grid>
            <Grid fixed item xs={6}>
                <div style={{ background: "#FFFFFF 0% 0% no-repeat padding-box" }}>
                    <Paper className={classes.paper}>
                        <div> <span>English</span></div>
                    </Paper>
                    <Grid container style={{ color: '#FFFFFF' }}>
                        <Grid item xs={4} className={classes.headingList} style={{ borderTopLeftRadius: '5px' }}>Exam Date</Grid>
                        <Grid item xs={4} className={classes.headingList} >Start Time</Grid>
                        <Grid item xs={4} className={classes.headingList} style={{ borderTopRightRadius: '5px', borderRight: '0' }}>End Time</Grid>

                    </Grid>
                    <Grid container>
                        <Grid item xs={4} className={classes.dataList}>15-12-2020</Grid>
                        <Grid item xs={4} className={classes.dataList}>10.20 PM</Grid>
                        <Grid item xs={4} className={classes.dataList} style={{ borderRight: "0" }}>12.20 PM</Grid>

                    </Grid>
                </div>
            </Grid>




        </Grid>

    );
}
