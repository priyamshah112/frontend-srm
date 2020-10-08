import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import editIcon from '../../../assets/images/Edit.svg';
import ReportService from '../ReportService';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: "2%",
    },
    rootGrid: {
        flexFlow: "1",
        marginTop: "20px"
    },
    cardTitle: {
        display: "flex",
        justifyContent: "space-between",
        padding: "10px"
    },
    cardHeader: {
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "1px solid lightgrey"
    },
    cardHeaderSkill: {
        flexBasis: "70%",
        background: "#7B72AF",
        padding: "5px",
        borderRight: "1px solid lightgrey"
    },
    cardHeaderGrade: {
        flexBasis: "30%",
        background: "#7B72AF",
        padding: "5px"
    },
    cardItem: {
        display: "flex",
        justifyContent: "space-between",
        borderTop: "1px solid lightgrey"
    },
    cardItemSkill: {
        flexBasis: "70%",
        padding: "5px",
        borderRight: "1px solid lightgrey"
    },
    cardItemGrade: {
        flexBasis: "30%",
        padding: "5px"
    },
    publish: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "flex-end",
        marginTop: "10px"
    },
    cancelBtn: {
        background: "#fff",
        marginRight: "10px"
    },
    headerIcon: {
        fontSize: "18px",
        fill: "#1c1c1c",
        height: "18px",
        width: "18px",
        marginRight: '40px',
        cursor: 'pointer'
    },
    editIcon: {
        fontSize: '17px',
        marginTop: '2px',
        fill: 'gray',
        cursor: 'pointer'
    },
    colorWhite: {
        color: '#fff'
    },
}));

const StudentSkills = (props) => {
    const classes = useStyles(props);

    const [reportData, setReportData] = useState([]);
    const [errMessage, setError] = useState('');
    const [isLoading, setLoading] = useState(true);

    const { searchData, testData } = props;

    /* Fetch Report Card */

    useEffect(() => {
        let loading = true;
        const token = localStorage.getItem('srmToken');

        if (searchData && searchData.user_classes) {
            async function getReportCard() {
                const response = await ReportService.fetchReportCard(token, searchData.id, testData.school_id);
                if (response.status === 200) {
                    if (loading) {
                        setReportData(response.data.data);
                        console.log(" fetchReportCard response.data.data.data", response.data.data);
                    }
                } else {
                    setError('Error in fetching report card');
                    setLoading(false);
                }
            }
            getReportCard();
        } else {
            setLoading(false);
        }
        return () => {
            loading = false;
        };
    }, []);


    const renderSkill = () => {
        return (
            <Box className={classes.rootGrid}>
                <Grid container spacing={3}>
                    {[1, 2, 3, 4].map((item, key) => {
                        return (
                            <Grid item xs={6} key={key}>
                                <Paper className={classes.paper} elevation={0}>
                                    <div className={classes.cardTitle}>
                                        <span>&nbsp;</span>
                                        <Typography>
                                            English
                                </Typography>
                                        <span>
                                            <img
                                                src={editIcon} className={classes.editIcon} />
                                        </span>
                                    </div>
                                    <div className={classes.cardHeader}>
                                        <Typography className={classes.cardHeaderSkill}>
                                            <span className={classes.colorWhite}>Skill</span>
                                        </Typography>
                                        <Typography className={classes.cardHeaderGrade}>
                                            <span className={classes.colorWhite}>Grade</span>
                                        </Typography>
                                    </div>
                                    {[1, 2, 3].map((item, key) => {
                                        return (
                                            <span key={key}>
                                                <div className={classes.cardItem}>
                                                    <Typography className={classes.cardItemSkill}>
                                                        Listening Skill
                                            </Typography>
                                                    <Typography className={classes.cardItemGrade}>
                                                        A+
                                            </Typography>
                                                </div>
                                            </span>
                                        )
                                    })
                                    }
                                </Paper>
                            </Grid>
                        )
                    })
                    }
                </Grid>
            </Box>
        )
    }

    return (
        <div className={classes.container}>
            {renderSkill()}
            {/* <div className={classes.publish}>
                <Box>
                    <Button
                        variant='contained'
                        disableElevation
                        className={classes.cancelBtn}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant='contained'
                        color='primary'
                        disableElevation
                    >
                        Publish
                    </Button>
                </Box>
            </div> */}
            {/* <BackdropLoader open={isLoading} /> */}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    };
};

export default connect(mapStateToProps)(StudentSkills);
