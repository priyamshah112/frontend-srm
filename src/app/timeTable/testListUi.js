import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import medal from '../../assets/images/Medal.png'
import Grid from '@material-ui/core/Grid';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Typography from '@material-ui/core/Typography';
import EditLogo from '../../assets/images/Edit.svg';






const useStyles = makeStyles((theme) => ({


    root: {
        flexGrow: 1,
        marginTop: '30px'

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
    }
}));

export default function TestListUi(props) {
    const classes = useStyles();


    return (
        <Grid container spacing={3} style={{ marginTop: "20px", paddingLeft: '15px', paddingRight: '15px' }}>
            <Grid item xs={12} style={{ textAlign: 'center' ,paddingTop:"0"}}>
                <div style={{ float: 'left' }}>
                    <ArrowBackIosIcon  fontSize="small" onClick={props.backTick}></ArrowBackIosIcon>
                </div>
                <Typography>Test List</Typography>



            </Grid>
           

            <Grid  item xs={12} lg={6} style={{marginTop:"20px"}}>
                <div style={{ background: "#FFFFFF 0% 0% no-repeat padding-box" }}>
                    <Grid  xs={12}>
                        <Typography display="" align="center" gutterBottom className={classes.paper}>
                        <span style={{}}>Math</span>
                     <span style={{float:'right',marginRight:"10px",marginTop:'2px'}}> <img src={EditLogo} alt="editLogo" /></span> 
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
                            <Typography>10.20 PM</Typography>
                        </Grid>
                        <Grid item xs={4} className={classes.dataList} style={{ borderRight: "0" }}>
                            <Typography>12.20 PM</Typography>
                        </Grid>

                    </Grid>
                </div>
            </Grid>
            <Grid  item xs={12} lg={6} style={{marginTop:"20px"}}>
                <div style={{ background: "#FFFFFF 0% 0% no-repeat padding-box" }}>
                    <Grid  xs={12}>
                        <Typography display="" align="center" gutterBottom className={classes.paper}>
                        <span style={{}}>Math</span>
                     <span style={{float:'right',marginRight:"10px",marginTop:'2px'}}> <img src={EditLogo} alt="editLogo" /></span> 
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
                            <Typography>10.20 PM</Typography>
                        </Grid>
                        <Grid item xs={4} className={classes.dataList} style={{ borderRight: "0" }}>
                            <Typography>12.20 PM</Typography>
                        </Grid>

                    </Grid>
                </div>
            </Grid>




        </Grid>

    );
}
