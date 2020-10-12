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
}));

const StudentSkills = (props) => {
    const classes = useStyles(props);

    const [reportData, setReportData] = useState({});
    const [skillData, setSkillData] = useState({});
    const [editSkill, setEditSkill] = useState(false);
    const [errMessage, setError] = useState('');
    const [isLoading, setLoading] = useState(true);

    const { searchData = searchValue1, testData = testValue1 } = props;
    const token = localStorage.getItem('srmToken');
    // ReportService.deleteSkill(token, 4);
    /* Fetch Report Card */

    useEffect(() => {
        let loading = true;

        if (searchData && searchData.user_classes) {
            async function getReportCard() {
                const response = await ReportService.fetchReportCard(token, searchData.id, testData.id);
                if (response.status === 200) {
                    if (loading) {
                        setReportData(response.data.data);
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

    const setSkill = (obj) => {
        setSkillData(obj);
        setEditSkill(true);
    }

    const addSkillCall = (data) => {

        let loading = true;

        async function addSkill() {
            try {
                const response = await ReportService.createSkill(token, data);

                if (response.status === 200) {
                    if (loading) {
                        setEditSkill(false)
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
                        // setEditSkill(false)
                    }
                }
            } catch (error) {
                console.log(error);
                // setError('');
                // setEditSkill(false)
            }
        }
        addSkill();
        return () => {
            loading = false;
        };
    }

    const onChangeSkills = (event, obj, key) => {
        const skill_list_data = { ...obj.skill_list_data, skill_name: event.target.value };
        obj.skill_list_data = skill_list_data;
        skillData.user_skill[key] = obj;
        const subject = [];
        skillData.user_skill.map((item, key) => {
            const value = {
                'skill_id': item.id,
                'skill_name': item.skill_list_data.skill_name,
                'grade': 'B'
            }
            subject.push(value)
        })

        if (reportData.grades[0]) {
            const updateSkill = {
                "id": reportData.grades[0].id,

                "student_id": searchData.id,
                "test_id": testData.id,
                "remarks": "Remarks",
                "status": "draft",
                "subject": [{
                    "subject_id": skillData.id,
                    "subject_name": skillData.name,
                    "skill": subject
                }]
            }
            updateSkillCall(updateSkill)
        } else {
            const createSkill = {
                "student_id": searchData.id,
                "test_id": testData.id,
                "remarks": "Remarks",
                "status": "draft",
                "subject": [{
                    "subject_id": skillData.id,
                    "subject_name": skillData.name,
                    "skill": subject
                }]
            }
            addSkillCall(createSkill)
        }
    }


    const onChangeGrade = (event, obj, key) => {
       
    }

    const renderEditSkill = () => {
        return (
            <div className={classes.fillGradeWrapper}>
                <div className={classes.remark}>
                    <Typography>Student Skill</Typography>
                </div>
                {
                    skillData.user_skill.map((obj, key) => {
                        console.log("obj.skill_list_data.skill_name", obj.skill_list_data.skill_name);

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
                                    style={{ background: '#fff' }}
                                    onChange={(event) => { onChangeSkills(event, obj, key) }}
                                />
                                <TextField
                                    id="outlined-textarea"
                                    label="Grade"
                                    multiline
                                    variant="outlined"
                                    placeholder={'Grade Name'}
                                    value={'A'}
                                    style={{ marginLeft: '10px', background: '#fff' }}
                                    onChange={(event) => { onChangeGrade(event, obj, key) }}
                                />

                            </div>
                        )
                    })
                }
                <Box>
                    {renderRemark()}
                </Box>
                <div className={classes.publish}>

                    <Box>
                        <Button
                            variant='contained'
                            disableElevation
                            className={classes.cancelBtn}
                            onClick={() => setEditSkill(false)}
                        >
                            Cancel
                    </Button>
                        <Button
                            variant='contained'
                            color='primary'
                            disableElevation
                            onClick={() => addSkillCall()}
                        >
                            Add
                    </Button>
                    </Box>
                </div>

            </div>
        )
    }

    const skillName = (skill) => {
        return (
            skill.user_skill.map((list, key) => {

                if (reportData.grades[0]) {
                    if (reportData.grades[0].report_grade[0]) {
                        reportData.grades[0].report_grade.map((g, i) => {
                            console.log("g.school_id", g);
                            if (list.subject_id == g.subject_id) {
                                list.skill_list_data.grade_name = g.grade
                            }
                        })
                    }
                };

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
        )
    }

    const renderSkill = () => {
        return (
            <Box className={classes.rootGrid}>
                {
                    Object.entries(reportData.subjectDetails).map(([name, value], i) => {

                        return (
                            <div key={i}>
                                < div className={classes.subjectTitle}>
                                    <Typography>{name}</Typography>
                                </div>
                                <Grid container spacing={3}>
                                    {value.map((item, key) => {
                                        return (
                                                <Grid item xs={6} key={key}>
                                                    <Paper className={classes.paper} elevation={0}>
                                                        <div className={classes.cardTitle}>
                                                            <span>&nbsp;</span>
                                                            <Typography>
                                                                {item.name}
                                                            </Typography>
                                                            <span onClick={() => setSkill(item)}>
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
                                                        {
                                                            skillName(item)
                                                        }
                                                    </Paper>
                                                </Grid>
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
                    fullWidth={true}
                    multiline
                    rows={4}
                    rowsMax={4}
                    size="medium"
                    type="string"
                    style={{ background: '#fff' }}
                />
            </div>
        )
    }

    return (
        <div className={classes.container}>
            {editSkill && renderEditSkill()}
            {!editSkill && reportData.subjectDetails && renderSkill()}

        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    };
};

export default connect(mapStateToProps)(StudentSkills);

/* Temp */

var searchValue1 = {
    "id": 1240,
    "type": "username",
    "username": "georgianna.rowe",
    "firstname": "Catalina",
    "lastname": "Wiza",
    "gender": "female",
    "verified_at": null,
    "otp": null,
    "otp_expiry": null,
    "thumbnail": "https://lorempixel.com/640/480/?19048",
    "device_tokens": null,
    "created_at": "2020-10-04T12:04:57.000000Z",
    "updated_at": "2020-10-04T12:04:57.000000Z",
    "roles": [
        {
            "id": 4,
            "name": "student",
            "guard_name": "web",
            "created_at": "2020-10-04T12:03:10.000000Z",
            "updated_at": "2020-10-04T12:03:10.000000Z",
            "pivot": {
                "model_id": 1240,
                "role_id": 4,
                "model_type": "App\\User"
            }
        }
    ],
    "user_classes": {
        "id": 1239,
        "user_id": 1240,
        "school_id": 9,
        "class_id": 82,
        "user_code": null,
        "class_code": null,
        "from_date": "2020-10-04",
        "to_date": "2021-10-04",
        "created_by": 1,
        "updated_by": 1,
        "created_at": "2020-10-04T12:04:57.000000Z",
        "updated_at": null,
        "deleted_at": null,
        "classes_data": {
            "id": 82,
            "code": "SRM-CLASS-5f79b9ff62d501601812991",
            "school_id": 9,
            "class_name": "Class 2",
            "internal_name": "class-2",
            "created_by": 1,
            "updated_by": 1,
            "created_at": "2020-10-04T12:03:11.000000Z",
            "updated_at": "2020-10-04T12:03:11.000000Z",
            "deleted_at": null
        },
        "school_data": {
            "id": 9,
            "name": "Chanel High School",
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
    "id": 328,
    "code": "SRM-EXMTST-5f79ba86d3d311601813126",
    "school_id": 9,
    "class_id": 82,
    "name": "Test 4",
    "image": null,
    "created_by": 1,
    "updated_by": 1,
    "created_at": "2020-10-04 12:05:26",
    "updated_at": "2020-10-04 12:05:26",
    "deleted_at": null
}




