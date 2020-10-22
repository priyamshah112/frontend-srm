import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import editIcon from '../../../assets/images/Edit.svg';
import ReportService from '../ReportService';
import TextField from '@material-ui/core/TextField';
import BackdropLoader from "../../common/ui/backdropLoader/BackdropLoader";

import StudentGrade from './StudentGrade';

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
        borderRight: "1px solid lightgrey",
        textAlign: 'center'
    },
    cardHeaderGrade: {
        flexBasis: "30%",
        background: "#7B72AF",
        padding: "5px",
        textAlign: 'center'
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
        padding: "5px",
        textAlign: 'center'
    },
    publish: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "flex-end",
        marginTop: "10px"
    },
    publishCard: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "flex-end",
        margin: "10px 0px 20px 0px"
    },
    cancelBtn: {
        background: "#fff",
        marginRight: "10px"
    },
    iconRemark: {
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
    bgWhite: {
        background: '#fff'
    },
    subjectTitle: {
        margin: "20px 0px",
        textAlign: "center"
    },
    remark: {
        margin: "20px 0px",
        textAlign: "center"
    },
    fillGrade: {
        display: 'flex',
        justifyContent: "space-around",
        margin: '10px 5px',
        padding: '16px',
        borderRadius: "2px"
    },
    fillGradeWrapper: {
        marginBottom: '30px',
    },
    emptyCard: {
        display: 'flex',
        justifyContent: "space-between",
        padding: "0px 10px",
        margin: '0px 17px',
        backgroundColor: '#fff'
    },
    remarkNote: {
        display: 'flex',
        justifyContent: "space-between",
        margin: '17px 14px',
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    emptyMessage: {
        textAlign: 'center',
        padding: '10px 18px',
        borderRadius: "1px"
    }
}));

let setSubjectArray = [];
let remarkText = 'Remark';
let showReport = false;

const StudentSkills = (props) => {
    const classes = useStyles(props);

    const [reportData, setReportData] = useState({});
    const [skillData, setSkillData] = useState({});
    const [editSkill, setEditSkill] = useState(false);
    const [errMessage, setError] = useState('');
    const [isLoading, setLoading] = useState(true);
    const [allSubject, setAllSubject] = useState(true);
    const [updateStatus, setUpdateStatus] = useState(false);
    const [editRemark, setEditRemark] = useState(false);
    const [isPublish, setIsPublished] = useState(false);
    const [refObj, setRefObj] = useState({});

    const { searchData = searchValue1, testData = testValue1 } = props;
    const token = localStorage.getItem('srmToken');


    const reportVisibility = (data) => {

        if (data.grades[0]) {
            remarkText = data.grades[0].remarks;
            if (data.grades[0].status == 'published') {
                setIsPublished(true);
            }
            if (props.selectedRole == 'student' || props.selectedRole == 'parent') {
                if (data.grades[0].status == 'published') {
                    showReport = true;
                    setIsPublished(true);
                }
            } else {
                showReport = true;
            }
        } else if (props.selectedRole == 'student' || props.selectedRole == 'parent') {
            showReport = false;
        } else {
            showReport = true;
        }
    }

    const editAccess = () => {
        if (props.selectedRole == 'student' || props.selectedRole == 'parent') {
            return false;
        } else {
            return true;
        }
    }


    useEffect(() => {
        let loading = true;
        setLoading(true);
        if (searchData.id && testData.id) {
            async function getReportCard() {
                const response = await ReportService.fetchReportCard(token, searchData.id, testData.id);
                if (response.status === 200) {
                    if (loading) {
                        setReportData(response.data.data);
                        reportVisibility(response.data.data);
                        setLoading(false);

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

    }, [updateStatus]);

    const setSkill = (obj) => {
        setSkillData(obj);
        setEditOption('skill');
    }

    const cancelUpdate = () => {
        setEditSkill(false);
        setEditRemark(false);
        setUpdateStatus((pre) => !pre);
    }

    const addSkillCall = (data) => {

        let loading = true;

        async function addSkill() {
            try {
                const response = await ReportService.createSkill(token, data);

                if (response.status === 200) {
                    if (loading) {
                        setEditSkill(false)
                        setUpdateStatus((pre) => !pre);
                    }
                }
            } catch (error) {
                console.log(error);
                setEditSkill(false)
                setError('');
            }
        }
        addSkill();
        return () => {
            loading = false;
        };
    }

    const updateSkillCall = (data) => {
        let loading = true;
        async function addSkill() {
            try {
                const response = await ReportService.updateSkill(token, data);

                if (response.status === 200) {
                    if (loading) {
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        addSkill();
        return () => {
            loading = false;
        };
    }

    const onChangeSkills = (input, obj, key, name) => {

        const skill = [];
        const subject = [];
        let saveStatus = 'draft';


        if (name === 'skill' || name === 'grade') {

            const { value } = input.target;

            if (name === 'skill') {
                obj.skill_list_data = { ...obj.skill_list_data, skill_name: value };
            } else {
                obj.skill_list_data = { ...obj.skill_list_data, grade_name: value };
            }

            skillData.user_skill[key] = obj;
        }

        if (skillData.user_skill) {
            skillData.user_skill.map((item) => {
                const makeSkill = {
                    'skill_id': item.id,
                    'skill_name': item.skill_list_data.skill_name || '',
                    'grade': item.skill_list_data.grade_name || ''
                }
                skill.push(makeSkill)
            });
        }


        subject.push(
            {
                "subject_id": skillData.id,
                "subject_name": skillData.name,
                "skill": skill
            },
        )
        if (name === 'remark') {
            remarkText = input.target.value;
        }

        if (name === 'publish') {
            saveStatus = 'published';
        }
        const restSubject = allSubject.filter((sub) => {
            return (sub.subject_name != skillData.name && sub.subject_id)
        });

        const totalSubject = [...restSubject, ...subject];
        const test = {
            "student_id": searchData.id,
            "test_id": testData.id,
            "remarks": remarkText || '',
            "status": saveStatus
        }

        if (reportData.grades[0]) {
            updateSkillCall({
                "id": reportData.grades[0].id,
                "subject": totalSubject,
                ...test
            })
        } else {
            addSkillCall({
                "subject": subject,
                ...test
            })
        }
    }

    const renderEditSkill = () => {
        return (
            <div className={classes.fillGradeWrapper}>
                <div className={classes.remark}>
                    <Typography>Student Skill</Typography>
                </div>
                {
                    skillData.user_skill.map((obj, key) => {
                        return (
                            <div className={classes.fillGrade} key={key}>
                                <TextField
                                    id="outlined-textarea"
                                    label="Skill"
                                    placeholder={'Skill Name'}
                                    defaultValue={obj.skill_list_data.skill_name}
                                    multiline
                                    variant="outlined"
                                    fullWidth={true}
                                    className={classes.bgWhite}
                                    onChange={(event) => { onChangeSkills(event, obj, key, 'skill') }}
                                />
                                <TextField
                                    id="outlined-textarea"
                                    label="Grade"
                                    multiline
                                    variant="outlined"
                                    placeholder={'Grade Name'}
                                    defaultValue={obj.skill_list_data.grade_name || ''}
                                    className={classes.bgWhite}
                                    style={{ marginLeft: '10px' }}
                                    onChange={(event) => { onChangeSkills(event, obj, key, 'grade') }}
                                />
                            </div>
                        )
                    })
                }
                <Box>
                </Box>
                <div className={classes.publish}>
                    <Box>
                        <Button
                            variant='contained'
                            color='primary'
                            disableElevation
                            onClick={() => { cancelUpdate() }}
                        >
                            Update
                    </Button>
                    </Box>
                </div>
            </div>
        )
    }

    const publishCard = () => {
        return (
            <div className={`${classes.publishCard} noprint`}>
                {
                    !isLoading && !editSkill && !editRemark &&
                    <Box>
                        <Button
                            variant='contained'
                            color='primary'
                            disableElevation
                            onClick={(event) => {
                                onChangeSkills(event, {}, 0, 'publish');
                                cancelUpdate();
                            }}
                        >
                            Publish Now
                    </Button>
                    </Box>
                }
            </div>
        )
    }

    const skillName = (skill) => {
        const skillArr = [];
        return (
            <>
                {
                    skill.user_skill.map((list, key) => {

                        if (reportData.grades[0]) {
                            if (reportData.grades[0].report_grade[0]) {
                                reportData.grades[0].report_grade.map((g, i) => {
                                    if (list.id == g.skill_id) {
                                        list.skill_list_data = { ...list.skill_list_data, grade_name: g.grade, skill_name: g.skill_name };
                                    }
                                })
                            }
                        };

                        if (list.skill_list_data.grade_name) {
                            const value = {
                                'skill_id': list.id,
                                'skill_name': list.skill_list_data.skill_name || '',
                                'grade': list.skill_list_data.grade_name || '',
                                "subject_id": list.subject_id
                            }
                            skillArr.push(value)
                        }
                        return (
                            <span key={key}>
                                <div className={classes.cardItem}>
                                    <Typography className={classes.cardItemSkill}>
                                        {
                                            list.skill_list_data &&
                                            <>
                                                {list.skill_list_data.skill_name}
                                            </>
                                        }
                                    </Typography>
                                    <Typography className={classes.cardItemGrade}>
                                        {list.skill_list_data.grade_name || '-'}
                                    </Typography>
                                </div>
                            </span>
                        )
                    }
                    )
                }
                {
                    <span style={{ display: 'none' }}>
                        {setSubjectArray.push(
                            {
                                "subject_id": skillArr[0] ? skillArr[0].subject_id : null,
                                "subject_name": skill.name,
                                "skill": skillArr
                            }
                        )}
                    </span>
                }
            </>
        )
    }


    const obj = {}
    const popupRef = (element, i) => {
        if (element) {
            obj[i] = element.clientHeight;
        }
    }


    const renderSkill = () => {
        setTimeout(() => { setRefObj(obj) }, 1000)
        return (
            <Box className={classes.rootGrid}>
                {
                    showReport && Object.entries(reportData.subjectDetails).map(([name, value], i) => {
                        return (
                            <div key={i}>
                                {refObj[i] > 0 && <div className={classes.subjectTitle}>
                                    <Typography>{name}</Typography>
                                </div>
                                }
                                <Grid container spacing={3} ref={(e) => popupRef(e, i)}>
                                    {value.map((item, key) => {
                                        let isCardPublished = false;
                                        if (reportData) {
                                            if (reportData.grades[0]) {
                                                reportData.grades[0].report_grade.map((subName) => {
                                                    if (subName.subject_id == item.id) {
                                                        isCardPublished = true
                                                    }
                                                })
                                            }
                                        }
                                        return (
                                            <>
                                                {(isCardPublished || editAccess()) && <Grid item xs={6} key={key}>
                                                    <Paper className={classes.paper} elevation={0}>
                                                        <div className={classes.cardTitle}>
                                                            <span>&nbsp;</span>
                                                            <Typography>
                                                                {item.name}
                                                            </Typography>
                                                            <span >
                                                                {searchData.user_classes &&
                                                                    <img
                                                                        src={editIcon} className={classes.editIcon} onClick={() => setSkill(item)}
                                                                    />
                                                                }
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
                                                        {
                                                            skillName(item)
                                                        }
                                                    </Paper>
                                                </Grid>}
                                            </>
                                        )
                                    })
                                    }
                                </Grid>
                            </div>
                        )
                    })
                }
            </Box >
        )
    }

    const renderEmptyReport = () => {
        return (
            <>
                {!isLoading && <div className={classes.emptyCard}>
                    <Typography className={classes.emptyMessage}>
                        <span>Report card not available.</span>
                    </Typography>
                </div>
                }
            </>
        )
    }

    const setEditOption = (option) => {
        setAllSubject(setSubjectArray);
        if (option == 'remark') {
            setEditRemark(true);
            setEditSkill(false);
        } else if (option == 'skill') {
            setEditSkill(true);
            setEditRemark(false);
        }
    }


    const remarkNote = () => {
        return (
            <>
                {!isLoading && <div className={classes.remarkNote}>
                    <Typography className={classes.emptyMessage}>
                        <span style={{ color: 'gray' }}> Remark : &nbsp;</span>
                        <span>{remarkText}</span>
                    </Typography>
                    <span className={`${classes.iconRemark} noprint`}>
                        {searchData.user_classes &&
                            <img
                                src={editIcon} className={classes.editIcon} onClick={() => setEditOption('remark')}
                            />
                        }
                    </span>
                </div>
                }
            </>
        )
    }

    const inputRemark = () => {
        return (
            <div className={classes.remark}>
                <div className={classes.remark}>
                    <Typography>General Remark </Typography>
                </div>
                <TextField
                    id="outlined-basic"
                    label=""
                    variant="outlined"
                    fullWidth={true}
                    multiline
                    rows={6}
                    rowsMax={6}
                    size="medium"
                    type="string"
                    defaultValue={remarkText}
                    placeholder={'Remark'}
                    className={classes.bgWhite}
                    onChange={(event) => { onChangeSkills(event, {}, 0, 'remark'); }}
                />
                <div className={classes.publish}>
                    <Box>
                        <Button
                            variant='contained'
                            color='primary'
                            disableElevation
                            onClick={() => { cancelUpdate() }}
                        >
                            Update
                    </Button>
                    </Box>
                </div>
            </div>
        )
    }
    setSubjectArray = [];
    return (
        <>
            <div className={classes.container}>
                {editSkill && renderEditSkill()}
                {!editSkill && reportData.subjectDetails && renderSkill()}
            </div>
            {!showReport && renderEmptyReport()}
            {showReport && !editRemark && remarkNote()}
            {showReport && editRemark && inputRemark()}
            {!isLoading && <StudentGrade {...props} />}
            {!isPublish && publishCard()}
            <BackdropLoader open={isLoading} />
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        selectedRole: state.auth.selectedRole,
    };
};

export default connect(mapStateToProps)(StudentSkills);

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