import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { useReactToPrint } from "react-to-print";

import ArrowBack from '@material-ui/icons/ArrowBackIos';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import downloadIcon from '../../../assets/images/attendance/download.svg';
import PrintIcon from '../../../assets/images/report/printer.svg';
import Avatar from "@material-ui/core/Avatar";

import ReportService from '../ReportService';
import BackdropLoader from "../../common/ui/backdropLoader/BackdropLoader";

import StudentGrade from './StudentGrade';
import StudentSkills from './StudentSkills';

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
    daysName: {
        color: "#8E8E93",
        fontSize: "12px !important"
    },
    daysNumber: {
        fontSize: "14px !important",
        color: "#1C1C1E",
        borderBottom: "1px solid #cdcdcd",
        maxWidth: "139px"
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
}));

const StudentDetails = (props) => {
    const styleProps = {
        height: window.innerHeight - 70 + 'px'
    };

    const classes = useStyles(styleProps);
    const [attendanceData, setAttendanceData] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [loadImage, setLoadImage] = useState(true);
    const printRef = useRef(null);

    const { token, searchData = searchValue1, testData = testValue1 } = props;

    const goToSearch = () => {
        props.home();
    }

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

    const onError = () => {
        // this.setState({
        //     imageUrl: "img/default.png"
        // })
    }

    const onErrorImg = () => {
        setLoadImage(false)
    }

    const renderHeader = () => {
        return (
            <>
                <div className={classes.navigationBack}>
                    <ArrowBack className={classes.headerIcon} onClick={goToSearch} />
                    <Typography>{testData.name}</Typography>
                    <div>
                        <span className={classes.printIcon} onClick={loadingPrint}>
                            <img src={PrintIcon} className={classes.downloadIcon} />
                        </span>
                        <span>
                            <img
                                src={downloadIcon} className={classes.downloadIcon} />
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



    return (
        <div className={classes.container} ref={printRef}>
            {renderHeader()}
            {renderAttendace()}
            <StudentSkills {...props} />
            <StudentGrade {...props} />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    };
};

export default connect(mapStateToProps)(StudentDetails);


/* Temp */

var searchValue1 = {
    "id": 1392,
    "type": "username",
    "username": "oral09",
    "firstname": "Lelia",
    "lastname": "Sauer",
    "gender": "female",
    "verified_at": null,
    "otp": null,
    "otp_expiry": null,
    "thumbnail": "https://lorempixel.com/640/480/?67589",
    "device_tokens": null,
    "created_at": "2020-10-04T12:05:09.000000Z",
    "updated_at": "2020-10-04T12:05:09.000000Z",
    "roles": [
        {
            "id": 4,
            "name": "student",
            "guard_name": "web",
            "created_at": "2020-10-04T12:03:10.000000Z",
            "updated_at": "2020-10-04T12:03:10.000000Z",
            "pivot": {
                "model_id": 1392,
                "role_id": 4,
                "model_type": "App\\User"
            }
        }
    ],
    "user_classes": {
        "id": 1391,
        "user_id": 1392,
        "school_id": 10,
        "class_id": 91,
        "user_code": null,
        "class_code": null,
        "from_date": "2020-10-04",
        "to_date": "2021-10-04",
        "created_by": 1,
        "updated_by": 1,
        "created_at": "2020-10-04T12:05:09.000000Z",
        "updated_at": null,
        "deleted_at": null,
        "classes_data": {
            "id": 91,
            "code": "SRM-CLASS-5f79b9ff64e961601812991",
            "school_id": 10,
            "class_name": "Class 1",
            "internal_name": "class-1",
            "created_by": 1,
            "updated_by": 1,
            "created_at": "2020-10-04T12:03:11.000000Z",
            "updated_at": "2020-10-04T12:03:11.000000Z",
            "deleted_at": null
        },
        "school_data": {
            "id": 10,
            "name": "Zoila High School",
            "registered_date": "2020-08-21",
            "created_by": 1,
            "updated_by": 1,
            "created_at": "2020-10-04T12:03:11.000000Z",
            "updated_at": "2020-10-04T12:03:11.000000Z",
            "deleted_at": null
        }
    }
}

var testValue1 = {
    "id": 364,
    "code": "SRM-EXMTST-5f79ba86db3851601813126",
    "school_id": 10,
    "class_id": 91,
    "name": "Test 4",
    "image": null,
    "created_by": 1,
    "updated_by": 1,
    "created_at": "2020-10-04 12:05:26",
    "updated_at": "2020-10-04 12:05:26",
    "deleted_at": null
}

