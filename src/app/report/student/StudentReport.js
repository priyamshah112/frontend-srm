import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import ArrowBack from '@material-ui/icons/ArrowBackIos';
import { Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import editIcon from '../../../assets/images/Edit.svg';
import downloadIcon from '../../../assets/images/attendance/download.svg';
import PrintIcon from '../../../assets/images/report/printer.svg';

import ReportService from '../ReportService';
import BackdropLoader from "../../common/ui/backdropLoader/BackdropLoader";
import TextField from '@material-ui/core/TextField';
import StudentGrade from './StudentGrade';

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
        display: "inline-block",
        border: "1px solid lightgrey"
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
    remark: {
        margin: "20px 0px",
        textAlign: "center"
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
        marginRight: '40px',
        cursor: 'pointer'
    },
    printIcon: {
        marginRight: '30px'
    },
    downloadIcon: {
        fontSize: '17px',
        height: '20px',
        width: '20px',
        fill: 'gray',
        cursor: 'pointer'
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
        fill: 'gray',
        cursor: 'pointer'
    },
    colorWhite: {
        color: '#fff'
    },
    remarkInput: {
        fontSize: "1rem",
        fontWeight: 400,
        lineHeight: 1.5,
        border: "1px solid #7B72AF",
        borderRadius: "1px",
        backgroundColor: '#fff'
    },
    fontSize14: {
        fontSize: '14px'
    },
    root: {
        backgroundColor: '#fff',
        boxShadow: 'none'
    },
}));

const StudentDetails = (props) => {
    const classes = useStyles(props);

    const [reportData, setReportData] = useState([]);
    const [attendanceData, setAttendanceData] = useState({});

    const [errMessage, setError] = useState('');
    const [isLoading, setLoading] = useState(true);

    const { token, searchData = searchValue1, testData = testValue1 } = props;
    const goToSearch = () => {
        props.home();
    }

    /* Fetch Report Card */

    useEffect(() => {
        let loading = true;

        if (searchData && searchData.user_classes) {
            async function getReportCard() {
                try {
                    const response = await ReportService.fetchReportCard(token, searchData.id, testData.school_id);

                    if (response.status === 200) {
                        if (loading) {
                            setReportData(response.data.data.data);
                            setLoading(false);
                            console.log(" fetchReportCard response.data.data.data", response.data.data.data);

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

    /* Fetch Student Attendance */

    useEffect(() => {
        let loading = true;

        if (searchData && searchData.id) {
            async function getAttendence() {
                try {
                    const response = await ReportService.studentAttendance(token, searchData.id);

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
                    <Typography>{testData.name}</Typography>
                    <div>
                        <span className={classes.printIcon}>
                            <img
                                src={PrintIcon} className={classes.downloadIcon} />
                        </span>
                        <span>
                            <img
                                src={downloadIcon} className={classes.downloadIcon} />
                        </span>

                    </div>
                </div>
                <div className={classes.studentPhoto}>
                    <div className={classes.photo}>
                        <img
                            src={searchData.thumbnail}
                            className={classes.userIcon}
                        />

                    </div>
                    <div className={classes.photoName}>
                        <Typography className={classes.fontSize14}>{searchData.firstname} {searchData.lastname}</Typography>
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

    const renderRemark = () => {
        return (
            <div className={classes.remark}>
                <div className={classes.remark}>
                    <Typography>General Remark </Typography>
                </div>
                <TextField
                    id="outlined-basic"
                    label=""
                    variant="outlined"
                    classes={{
                        root: classes.root
                    }}
                    fullWidth={true}
                    multiline
                    rows={4}
                    rowsMax={4}
                    size="medium"
                    type="string"
                />

            </div>
        )
    }

    return (
        <div className={classes.container}>
            {renderHeader()}
            {renderAttendace()}
            {renderSkill()}
            {renderRemark()}
            <StudentGrade {...props} />
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
        token: state.auth.token
    };
};

export default connect(mapStateToProps)(StudentDetails);
