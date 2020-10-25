import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { useReactToPrint } from "react-to-print";

import ArrowBack from '@material-ui/icons/ArrowBackIos';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import PrintIcon from '../../../assets/images/report/printer.svg';
import Avatar from "@material-ui/core/Avatar";
import BackdropLoader from "../../common/ui/backdropLoader/BackdropLoader";
import SchoolName from '../../../assets/images/report/School_Name.png';
import Box from '@material-ui/core/Box';

import ReportService from '../ReportService';
import StudentSkills from './StudentSkills';

import './print.css';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: "2%",
        overflowY: "auto",
        height: props => props.height
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
        marginTop: "3%",
        borderRadius: "2px"
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
    studentDaysPrint: {
        width: "100%",
        marginLeft: '100px'
    },
    daysName: {
        color: "#8E8E93",
        fontSize: "12px !important"
    },
    daysNamePrint: {
        color: "#8E8E93",
        fontSize: "12px !important",
        padding: '3%'
    },
    daysNumber: {
        fontSize: "14px !important",
        color: "#1C1C1E",
        borderBottom: "1px solid #cdcdcd",
        maxWidth: "139px"
    },
    daysNumberPrint: {
        fontSize: "14px !important",
        color: "#1C1C1E",
        borderBottom: "1px solid #cdcdcd",
        maxWidth: "200px",
        padding: '3%'
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
        cursor: 'pointer'
    },
    printIcon: {
        marginRight: '5px'
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
        borderRadius: '50%'
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
    printFooter: {
        display: "flex",
        justifyContent: "space-between",
        padding: '0px 22px'
    },
    schoolNameLogo: {
        display: "flex",
        justifyContent: "center",
        padding: '18px 22px'
    },
    printHeader: {
        display: "flex",
        justifyContent: "center",
        padding: '0px 22px'
    },
    reportLogo: {
        height: 60,
        width: undefined,
    },
    schoolLogo: {
        height: 34,
        width: undefined,
    },
    schoolTitle: {
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        padding: '0px 10px',
        fontSize: '22px'
    },
    emptyCard: {
        display: 'flex',
        justifyContent: 'center',
        margin: '11px 0px',
        backgroundColor: '#fff'
    },
    emptyMessage: {
        textAlign: 'center',
        padding: '10px 18px',
        borderRadius: "1px"
    }
}));

const StudentDetails = (props) => {
    const styleProps = {
        height: window.innerHeight - 70 + 'px'
    };

    const classes = useStyles(styleProps);
    const [attendanceData, setAttendanceData] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [loadImage, setLoadImage] = useState(true);
    const [isPublish, setIsPublished] = useState(true);
    const printRef = useRef(null);

    const { token, searchData, testData } = props;

    const goToSearch = () => {
        props.home();
    }

    useEffect(() => {
        let loading = true;
        setLoading(true);
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


    const handlePrint = useReactToPrint({
        content: () => printRef.current
    });

    const loadingPrint = () => {
        setLoading(true);
        setTimeout(() => {
            handlePrint()
            setLoading(false)
        }, 2000)
    };

    const onErrorImg = () => {
        setLoadImage(false)
    }

    const renderHeader = () => {
        return (
            <Box display="blobk" displayPrint="none">
                <div className={`${classes.navigationBack}`}>
                    <ArrowBack className={classes.headerIcon} onClick={goToSearch} />
                    <Typography>{testData.name}</Typography>
                    <div>
                        <span className={classes.printIcon} onClick={loadingPrint}>
                            {isPublish && <img src={PrintIcon} className={classes.downloadIcon} />}
                        </span>

                    </div>
                </div>
                <div className={classes.studentPhoto}>
                    <div className={classes.photo}>
                        {loadImage ? <img
                            src={searchData.thumbnail}
                            className={classes.userIcon}
                            onError={onErrorImg}
                        /> :
                            <Avatar src="/broken-image.jpg" className={classes.userIcon} />
                        }
                    </div>
                    <div className={classes.photoName}>
                        <Typography className={classes.fontSize14}>{searchData.firstname} {searchData.lastname}</Typography>
                    </div>
                </div>
            </Box>
        )
    }

    const renderAttendace = () => {
        const { present = 0, absent = 0, totalDays = 0, teacherDetails, teacherName = "None" } = attendanceData;

        if (teacherDetails && teacherDetails.length) {
            teacherName = teacherDetails[0]
        }

        return (
            <Box display="block" displayPrint="none">
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
            </Box>
        )
    }


    const PrintAttendance = () => {
        const { present = 0, absent = 0, totalDays = 0, teacherDetails, teacherName = "None" } = attendanceData;

        if (teacherDetails && teacherDetails.length) {
            teacherName = teacherDetails[0]
        }

        return (
            <Box display="none" displayPrint="block">
                <div className={classes.attendanceWrapper1}>
                    <div className={classes.attendanceInfo}>
                        <div className={classes.studentDaysPrint}>
                            <Typography className={classes.daysNamePrint}>STUDENT NAME</Typography>
                            <Typography className={classes.daysNumberPrint}>{searchData.firstname} {searchData.lastname}</Typography>
                        </div>
                        <div className={classes.studentDaysPrint}>
                            <Typography className={classes.daysNamePrint}>TOTAL DAYS</Typography>
                            <Typography className={classes.daysNumberPrint}>{totalDays}</Typography>
                        </div>
                    </div>
                    <div className={classes.attendanceInfo}>
                        <div className={classes.studentDaysPrint}>
                            <Typography className={classes.daysNamePrint}>TEACHER</Typography>
                            <Typography className={classes.daysNumberPrint}>{teacherName}</Typography>
                        </div>
                        <div className={classes.studentDaysPrint}>
                            <Typography className={classes.daysNamePrint}>DAYS ATTENDTED</Typography>
                            <Typography className={classes.daysNumberPrint}>{present}</Typography>
                        </div>
                    </div>
                    <div className={classes.attendanceInfo}>
                        <div className={classes.studentDaysPrint}>
                            <Typography className={classes.daysNamePrint}>GRADE</Typography>
                            <Typography className={classes.daysNumberPrint}>None</Typography>
                        </div>
                        <div className={classes.studentDaysPrint}>
                            <Typography className={classes.daysNamePrint}>DAYS ABSENT</Typography>
                            <Typography className={classes.daysNumberPrint}>{absent}</Typography>
                        </div>
                    </div>
                </div>
            </Box>
        )
    }


    const PrintHeader = () => {
        return (
            <Box display="none" displayPrint="block">
                <div className={classes.printHeader}>
                    <img
                        src={SchoolName}
                        alt='Report Card'
                        className={classes.reportLogo}
                    />
                </div>
            </Box>
        )
    }

    const PrintFooter = () => {
        return (
            <Box display="none" displayPrint="block">
                <div className={classes.printFooter}>
                    <Typography>
                        Parent Signature
                    </Typography>
                    <Typography>
                        Principal Signature
                </Typography>
                </div>
            </Box>
        )
    }

    const PrintSchoolLogo = () => {

        let logo = ''
        let name = ''

        if (props.userInfo && props.userInfo.user_classes) {
            if (props.userInfo.user_classes.school_data) {
                logo = props.userInfo.user_classes.school_data.logo
                name = props.userInfo.user_classes.school_data.name
            }
        }

        return (
            <Box display="none" displayPrint="block">
                <div className={classes.schoolNameLogo}>
                    <img
                        src={logo}
                        alt='School Logo'
                        className={classes.schoolLogo}
                    />
                    <Typography className={classes.schoolTitle}>
                        {name}
                    </Typography>
                </div>
            </Box>
        )
    }

    const onCardPublish = (flag = 'true') => {
        setIsPublished(flag);
    }

    const editAccess = () => {
        if (props.selectedRole == 'student' || props.selectedRole == 'parent') {
            return false;
        } else {
            return true;
        }
    }

    const EmptyReport = () => {
        return (
            <div className={classes.emptyCard}>
                <Typography className={classes.emptyMessage}>
                    <span>Report card not available.</span>
                </Typography>
            </div>
        )
    }

    return (
        <div className={`${classes.container}  print-container`} ref={printRef}>
            <PrintHeader />
            <PrintSchoolLogo />
            <PrintAttendance />
            {renderHeader()}
            {renderAttendace()}
            {
                (isPublish || editAccess()) ?
                    <StudentSkills {...props} onCardPublish={onCardPublish} /> :
                    <EmptyReport />
            }
            <PrintFooter />
            <Box display="block" displayPrint="none">
                <BackdropLoader open={isLoading} />
            </Box>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        userInfo: state.auth.userInfo,
        selectedRole: state.auth.selectedRole,
    };
};

export default connect(mapStateToProps)(StudentDetails);