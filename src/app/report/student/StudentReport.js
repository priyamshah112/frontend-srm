import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import ArrowBack from '@material-ui/icons/ArrowBackIos';
import { Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import editIcon from '../../../assets/images/Edit.svg';
import UserIcon from '../../../assets/images/profile/User.svg';
import downloadIcon from '../../../assets/images/attendance/download.svg';
import PrintIcon from '@material-ui/icons/PrintOutlined';

import ReportService from '../ReportService';
import BackdropLoader from "../../common/ui/backdropLoader/BackdropLoader";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: "2%",
        height: "100%",
        overflowY: "auto",
        height: '600px'
    },
    navigationBack: {
        display: "flex",
        justifyContent: "space-between"
    },
    studentPhoto: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "2%"
    },
    photo: {
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        display: "inline-block"
    },
    photoName: {
        margin: "15px 0px"
    },
    attendanceWrapper1: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#fff",
        width: "100%",
        marginTop: "3%"
    },
    attendanceWrapper2: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#fff",
        width: "100%"
    },
    attendance: {
        margin: "20px 0px"
    },
    attendanceInfo: {
        padding: "2%",
        display: "flex",
        justifyContent: "space-between",
        width: "96%"
    },
    studentDays: {
        width: "100%",
        paddingRight: "10%",
        maxWidth: "200px"
    },
    daysName: {
        color: "#8E8E93",
        fontSize: "12px !important"
    },
    daysNumber: {
        fontSize: "14px !important",
        color: "#1C1C1E",
        borderBottom: "1px solid #cdcdcd"
    },
    rootGrid: {
        flexFlow: "1",
        marginTop: "20px"
    },
    paper: {
        padding: "2",
        textAlign: "center"
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
        borderBottom: "1px solid lightgrey"
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
    remark: {
        margin: "20px 0px",
        textAlign: "center"
    },
    textArea: {
        fontSize: "1rem",
        fontWeight: 400,
        lineHeight: 1.5,
        width: "96%",
        border: "1px solid #7B72AF",
        padding: "10px",
        borderRadius: "5px"
    },
    Size14: {
        fontSize: "14px"
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
        marginRight: '40px'
    },
    printIcon: {
        fontSize: '20px',
        fill: '#8E8E93',
        marginRight: '25px'
    },
    downloadIcon: {
        fontSize: '17px',
        height: '20px',
        width: '20px',
        fill: 'gray'
    },
    userIcon: {
        height: '100%',
        width: '100%',
        borderRadius: '50%',
        border: '1px solid gray'
    },
    editIcon: {
        fontSize: '17px',
        marginTop: '2px',
        fill: 'gray'
    },
    colorWhite: {
        color: '#fff'
    }
}));

const StudentDetails = (props) => {
    const classes = useStyles(props);
    const [isLoading, setLoading] = useState(true);
    const [reportData, setReportData] = useState([]);
    const [attendanceData, setAttendanceData] = useState({});
    const [errMessage, setError] = useState('');

    const goToSearch = () => {
        props.home();
    }

    useEffect(() => {
        let loading = true;

        if (props.searchData && props.searchData.user_classes) {
            async function getReportCard() {
                try {
                    const response = await ReportService.fetchReportCard(props.token, props.searchData.id, props.testData.school_id);

                    if (response.status === 200) {
                        if (loading) {
                            console.log("response", response)
                            setReportData(response.data.data.data);
                            setLoading(false);
                        }
                    }
                } catch (error) {
                    console.log(error);
                    setError('Error in student test');
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

    useEffect(() => {
        let loading = true;

        if (props.searchData && props.searchData.id) {
            async function getAttendence() {
                try {
                    const response = await ReportService.studentAttendance(props.token, props.searchData.id);

                    if (response.status === 200) {
                        if (loading) {
                            setAttendanceData(response.data.data || []);
                            setLoading(false);
                        }
                    }
                } catch (error) {
                    console.log(error);
                    setLoading(false);
                }
            }
            getAttendence();
        } else {
            setLoading(false);
        }
        return () => {
            loading = false;
        };
    }, []);

    const renderHeader = () => {
        return (
            <>
                <div className={classes.navigationBack}>
                    <ArrowBack className={classes.headerIcon} onClick={goToSearch} />
                    <Typography>{props.testData.name}</Typography>
                    <div>
                        <PrintIcon className={classes.printIcon} />
                        <img
                            src={downloadIcon} className={classes.downloadIcon} />
                    </div>
                </div>
                <div className={classes.studentPhoto}>
                    <div className={classes.photo}>
                        <img
                            src={UserIcon}
                            className={classes.userIcon}
                        />

                    </div>
                    <div className={classes.photoName}>
                        <Typography>{props.searchData.firstname}</Typography>
                    </div>
                </div>
            </>
        )
    }

    const renderAttendace = () => {
        const { present = 0, absent = 0, totalDays = 0, teacherDetails, teacherName = "None" } = attendanceData;

        if (teacherDetails && teacherDetails.length) {
            teacherName = teacherDetails[0]
        }

        return (
            <>
                <div className={classes.attendanceWrapper1}>
                    <div className={classes.attendance}>
                        <Typography>Attendance</Typography>
                    </div>
                    <div className={classes.attendanceInfo}>
                        <div className={classes.studentDays}>
                            <Typography className={classes.daysName}>TOTAL DAYS</Typography>
                            <Typography className={classes.daysNumber}>{totalDays}</Typography>
                        </div>
                        <div className={classes.studentDays}>
                            <Typography className={classes.daysName}>DAYS ATTENDTED</Typography>
                            <Typography className={classes.daysNumber}>{present}</Typography>
                        </div>
                        <div className={classes.studentDays}>
                            <Typography className={classes.daysName}>DAYS ABSENT</Typography>
                            <Typography className={classes.daysNumber}>{absent}</Typography>
                        </div>
                    </div>
                </div>
                <div className={classes.attendanceWrapper2}>
                    <div className={classes.attendanceInfo}>
                        <div className={classes.studentDays}>
                            <Typography className={classes.daysName}>TEACHER</Typography>
                            <Typography className={classes.daysNumber}>{teacherName}</Typography>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    const renderSkill = () => {
        return (
            <Box className={classes.rootGrid}>
                <Grid container spacing={3}>
                    {[1, 2, 3, 4].map((item, key) => {
                        return (
                            <Grid item xs={6} key={key}>
                                <Paper className={classes.paper}>
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
                                    {[1, 2, 3].map((item) => {
                                        return (
                                            <span>
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

    const renderRemark = () => {
        return (
            <div>
                <div className={classes.remark}>
                    <Typography>General Remark</Typography>
                </div>
                <TextareaAutosize
                    rows={5}
                    className={classes.textArea}
                    aria-label="maximum height"
                    placeholder="Maximum 4 rows"
                    defaultValue={dummyTest}
                />
            </div>
        )
    }

    const renderGrade = () => {
        return (
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper>
                        <Grid container spacing={3} style={{ margin: '10px 5px' }}>
                            <Grid item xs={2.5}>
                                <Typography className={classes.Size14}>A+ - 90%-100%</Typography>
                            </Grid>
                            <Grid item xs={2.5}>
                                <Typography className={classes.Size14} >A- 75%-89%</Typography>
                            </Grid>
                            <Grid item xs={2.5}>
                                <Typography className={classes.Size14}>B - 56%-74%</Typography>
                            </Grid>
                            <Grid item xs={2.5}>
                                <Typography className={classes.Size14}>C - 35%-55%</Typography>
                            </Grid>
                            <Grid item xs={2.5}>
                                <Typography className={classes.Size14}>D - Below 35%</Typography>
                            </Grid>
                            <Grid item xs={2.5}>
                                <img
                                    src={editIcon} className={classes.editIcon} />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>

        )
    }

    return (
        <div className={classes.container}>
            {renderHeader()}
            {renderAttendace()}
            {renderSkill()}
            {renderRemark()}
            {renderGrade()}
            <div className={classes.publish}>
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
            </div>
            <BackdropLoader open={isLoading} />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        userInfo: state.auth.userInfo
    };
};

export default connect(mapStateToProps)(StudentDetails);

const dummyTest = "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled"