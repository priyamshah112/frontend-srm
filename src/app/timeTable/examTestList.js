import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import medal from '../../assets/images/Medal.png'


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

export default function TestList() {
    const classes = useStyles();

    return (

        <Paper className={classes.paper}>
            <div>
                <img src={medal} alt="medalavt" width='60%' height="80%" />
            </div>
            <span style={{ color: '#1C1C1E)' }}>Test 1</span>
        </Paper>

    );
}
