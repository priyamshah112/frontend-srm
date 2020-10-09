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
        background: '#fff',
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

    /* Fetch Report Card */

    useEffect(() => {
        let loading = true;

        if (searchData && searchData.user_classes) {
            async function getReportCard() {
                const response = await ReportService.fetchReportCard(token, searchData.id, testData.school_id);
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
        setSkillData(obj)
        setEditSkill(true)
    }

    const addSkillCall = (data) => {

        let loading = true;

        async function addSkill() {
            try {
                const response = await ReportService.updateSkill(token, skillsDefault);

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
                                    value={obj.skill_list_data.skill_name}
                                    placeholder={obj.skill_list_data.skill_name}
                                    multiline
                                    variant="outlined"
                                    fullWidth={true}
                                    onChange={(event) => { }}
                                />
                                <TextField
                                    id="outlined-textarea"
                                    label="Grade"
                                    multiline
                                    variant="outlined"
                                    placeholder={'A'}
                                    value={'A'}
                                    style={{ marginLeft: '10px' }}
                                    onChange={(event) => { }}
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
                return (
                    <span>
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
                                A+
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
                            <>
                                < div className={classes.subjectTitle}>
                                    <Typography>{name}</Typography>
                                </div>
                                <Grid container spacing={3}>
                                    {value.map((item, key) => {
                                        return (
                                            <>

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
                                            </>
                                        )
                                    })
                                    }
                                </Grid>
                            </>
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

/*Temp */
const skillsDefault = {
    "id": 1,
    "student_id": 1,
    "test_id": 1,
    "remarks": "Remarks",
    "status": "draft",
    "subject": [

        {
            'skill_id': 1,
            'skill_name': '',
            'grade': ''
        },
        {
            'skill_id': 2,
            'skill_name': '',
            'grade': ''
        },
        {
            'skill_id': 3,
            'skill_name': '',
            'grade': ''
        },
        {
            'skill_id': 4,
            'skill_name': '',
            'grade': ''
        }
    ]
}

const searchValue1 = {}
const testValue1 = {}



