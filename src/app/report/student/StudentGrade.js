import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import editIcon from '../../../assets/images/Edit.svg';
import ReportService from '../ReportService';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: "2%",
    },
    title: {
        margin: "20px 0px",
        textAlign: "center"
    },
    editIcon: {
        fontSize: '17px',
        marginTop: '2px',
        fill: 'gray',
        cursor: 'pointer'
    },
    root: {
        backgroundColor: '#fff',
        boxShadow: 'none'
    },
    gridContainer: {
        display: 'flex',
        justifyContent: "space-between",
        margin: '10px 5px',
        backgroundColor: '#fff'
    },
    itemGrade: {
        textAlign: 'center',
        padding: '10px 18px',
        borderRadius: "1px"
    },
    setGrade: {
        display: 'flex',
        justifyContent: 'center',
        margin: '20px'
    },
    fillGrade: {
        display: 'flex',
        justifyContent: "space-between",
        margin: '10px 5px',
    },
    fillGradeWrapper: {
        marginBottom: '30px',
    }
}));

const StudentGrade = (props) => {
    const classes = useStyles(props);

    const [gradeData, setGradeData] = useState([]);
    const [newGrade, setNewGrade] = useState(false);
    const [editGrade, setEditGrade] = useState(false);

    const [errMessage, setError] = useState('');

    const { token, testData = testValue1 } = props;

    useEffect(() => {
        let loading = true;

        if (testData && testData.class_id) {
            async function getGrades() {
                try {
                    const response = await ReportService.getGrades(token, testData.class_id);

                    if (response.status === 200) {
                        if (loading) {
                            setGradeData(response.data.data || []);
                            setNewGrade(false);
                        }
                    }
                } catch (error) {
                    console.log(error);
                    setError('Grade Access Failed');
                    setNewGrade(true);
                }
            }
            getGrades();
        }
        return () => {
            loading = false;
        };
    }, []);



    const updateGrade = () => {

        let loading = true;

        const data = {
            "class_id": 2,
            "grade": "A++",
            "percentage_from": 100,
            "percentage_to": 80
        }

        const gradeId = 1

        async function getGrades() {
            try {
                const response = await ReportService.updateGrades(token, gradeId, data);

                if (response.status === 200) {
                    if (loading) {
                        setNewGrade(false);
                        setEditGrade(false);
                    }
                }
            } catch (error) {
                console.log(error);
                setError('');
                setNewGrade(false);
                setEditGrade(false);
            }
        }
        getGrades();
        return () => {
            loading = false;
        };
    }


    const renderGradeEdit = () => {
        return (
            <div className={classes.fillGradeWrapper}>
                <div className={classes.title}>
                    <Typography>Edit Grades</Typography>
                </div>
                {gradeData.map((obj, key) => {
                    return (
                        <div className={classes.fillGrade} key={key}>
                            <TextField
                                id="outlined-textarea"
                                label="Grade Name"
                                placeholder="A+"
                                multiline
                                variant="outlined"
                                defaultValue={obj.grade}
                                classes={{
                                    root: classes.root
                                }}
                            />
                            <TextField
                                id="outlined-textarea"
                                label="Percentage"
                                placeholder="90"
                                multiline
                                variant="outlined"
                                defaultValue={obj.percentage_to}
                                classes={{
                                    root: classes.root
                                }}
                            />
                            <TextField
                                id="outlined-textarea"
                                label=" Total Percentage"
                                placeholder="100"
                                multiline
                                variant="outlined"
                                defaultValue={obj.percentage_from}
                                classes={{
                                    root: classes.root
                                }}
                            />
                        </div>
                    )
                })}
                <div className={classes.setGrade} >
                    <Button
                        variant='contained'
                        color='primary'
                        disableElevation
                        onClick={() => updateGrade()}
                    >
                        Update
                    </Button>
                </div>
            </div>
        )
    }

    const renderNewGrade = () => {
        return (
            <div className={classes.fillGradeWrapper}>
                <div className={classes.title}>
                    <Typography>Create Grades</Typography>
                </div>
                {defaultGrades.map((obj, key) => {
                    return (
                        <div className={classes.fillGrade} key={key}>
                            <TextField
                                id="outlined-textarea"
                                label="Grade Name"
                                placeholder={obj.grade}
                                multiline
                                variant="outlined"
                                classes={{
                                    root: classes.root
                                }}
                            />
                            <TextField
                                id="outlined-textarea"
                                label="From Percentage"
                                multiline
                                variant="outlined"
                                placeholder={obj.percentage_from}
                                classes={{
                                    root: classes.root
                                }}
                            />
                            <TextField
                                id="outlined-textarea"
                                label=" To Percentage"
                                multiline
                                variant="outlined"
                                placeholder={obj.percentage_to}
                                classes={{
                                    root: classes.root
                                }}
                            />
                        </div>
                    )
                })}
                <div className={classes.setGrade} >
                    <Button
                        variant='contained'
                        color='primary'
                        disableElevation
                    >
                        Add
                    </Button>
                </div>
            </div>
        )
    }

    const renderGrade = () => {
        return (
            <div>
                {
                    gradeData.length > 0 &&
                    <div className={classes.gridContainer}>
                        {
                            gradeData.map((obj, key) => {
                                return (
                                    <>
                                        <Typography className={classes.itemGrade}>
                                            {obj.grade} - {obj.percentage_to}% - {obj.percentage_from}%
                                            </Typography>
                                        {
                                            gradeData.length === key + 1 &&
                                            <Typography className={classes.itemGrade}>
                                                <img
                                                    src={editIcon}
                                                    className={classes.editIcon}
                                                    onClick={() => setEditGrade(true)} />
                                            </Typography>
                                        }
                                    </>
                                )
                            })
                        }
                    </div>
                }
            </div>
        )
    }

    return (
        <div className={classes.container}>
            {!editGrade && !newGrade && renderGrade()}
            {editGrade && renderGradeEdit()}
            {newGrade && renderNewGrade()}
            {errMessage}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
    };
};

export default connect(mapStateToProps)(StudentGrade);

var defaultGrades = [
    {
        "grade": "A+",
        "percentage_from": 90,
        "percentage_to": 100,
    },
    {
        "grade": "A",
        "percentage_from": 75,
        "percentage_to": 89,
    },
    {
        "grade": "B",
        "percentage_from": 56,
        "percentage_to": 74,
    },
    {
        "grade": "C",
        "percentage_from": 35,
        "percentage_to": 55,
    },
    {
        "grade": "D",
        "percentage_from": 0,
        "percentage_to": 35,
    }
]
