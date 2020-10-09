import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import editIcon from '../../../assets/images/Edit.svg';
import ReportService from '../ReportService';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import BackdropLoader from "../../common/ui/backdropLoader/BackdropLoader";

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
        boxShadow: 'none',
        width: '170px'
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
        background: '#fff',
        padding: '16px',
        borderRadius: "2px"
    },
    fillGradeWrapper: {
        marginBottom: '30px',
    },
    publish: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "flex-end",
        marginTop: "20px"
    },
    cancelBtn: {
        background: "#fff",
        marginRight: "10px"
    },
    deleteBtn: {
        color: 'red'
    },
    addBtn: {
        color: '#7B72AF'
    }
}));

const StudentGrade = (props) => {
    const classes = useStyles(props);

    const [gradeData, setGradeData] = useState([]);
    const [newGrade, setNewGrade] = useState(false);
    const [editGrade, setEditGrade] = useState(false);
    const [showGrade, setShowGrade] = useState(false);
    const [errMessage, setError] = useState('');
    const [isLoading, setLoading] = useState(false);

    const [state, setState] = useState({
        grade: '',
        percentage_from: '',
        percentage_to: ''
    });

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
                            setShowGrade(true);
                        }
                    }
                } catch (error) {
                    console.log("getGrades Error", error);
                    setError('User does not belong to any school');
                    setShowGrade(false);
                }
            }
            getGrades();
        }
        return () => {
            loading = false;
        };
    }, [editGrade, newGrade]);


    const onChangeGrade = (type, event, obj) => {
        switch (type) {
            case 'grade':
                const grade = { ...obj, "grade": event.target.value };
                updateGradeCall(grade);
                break;

            case 'from':
                const from = { ...obj, "percentage_from": event.target.value };
                updateGradeCall(from);
                break;

            case 'to':
                const to = { ...obj, "percentage_to": event.target.value };
                updateGradeCall(to);
                break;
            default:
                break;
        }
    }


    const updateGradeCall = (data) => {

        let loading = true;

        async function getGrades() {
            try {
                const response = await ReportService.updateGrades(token, data);

                if (response.status === 200) {
                    if (loading) {
                        // setNewGrade(false);
                        // setEditGrade(false);
                    }
                }
            } catch (error) {
                console.log(error);
                // setEditGrade(false);
                setError('');
            }
        }
        getGrades();
        return () => {
            loading = false;
        };
    }

    const deleteGradeCall = (data) => {

        let loading = true;
        setLoading(true);

        async function getGrades() {
            try {
                const response = await ReportService.deleteGrades(token, data);

                if (response.status === 200) {
                    if (loading) {
                        setLoading(false);
                        setEditGrade(false);
                    }
                }
            } catch (error) {
                console.log(error);
                setEditGrade(false);
                setLoading(false);
            }
        }
        getGrades();
        return () => {
            loading = false;
        };
    }

    const createGradeCall = () => {

        setLoading(true);

        const token = localStorage.getItem('srmToken');
        let loading = true;
        const data = {
            "class_id": testData.class_id,
            ...state
        }

        async function getGrades() {
            try {
                const response = await ReportService.createGrades(token, data);

                if (response.status === 200) {
                    if (loading) {
                        setNewGrade(false);
                        setEditGrade(false);
                        setLoading(false);
                    }
                }
            } catch (error) {
                console.log(error);
                setError('');
                setNewGrade(false);
                setEditGrade(false);
                setLoading(false);
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
                                onChange={(event) => { onChangeGrade('grade', event, obj) }}
                                classes={{
                                    root: classes.root
                                }}
                            />
                            <TextField
                                id="outlined-textarea"
                                label="From Percentage"
                                placeholder="90"
                                multiline
                                variant="outlined"
                                defaultValue={obj.percentage_from}
                                onChange={(event) => { onChangeGrade('from', event, obj) }}
                                classes={{
                                    root: classes.root
                                }}
                            />
                            <TextField
                                id="outlined-textarea"
                                label=" To Percentage"
                                placeholder="100"
                                multiline
                                variant="outlined"
                                defaultValue={obj.percentage_to}
                                onChange={(event) => { onChangeGrade('to', event, obj) }}
                                classes={{
                                    root: classes.root
                                }}
                            />
                            <Button
                                variant='contained'
                                disableElevation
                                className={classes.cancelBtn}
                                onClick={() => { deleteGradeCall(obj) }}
                            >
                                <HighlightOffOutlinedIcon
                                    className={classes.deleteBtn}

                                />
                            </Button>
                            <Button
                                variant='contained'
                                disableElevation
                                className={classes.cancelBtn}
                                onClick={() => {
                                    setNewGrade(true)
                                    setEditGrade(false)
                                }}
                            >
                                <AddCircleOutlineOutlinedIcon
                                    className={classes.addBtn}
                                />
                            </Button>
                        </div>
                    )
                })}
                <div className={classes.publish} >
                    <Box>
                        <Button
                            variant='contained'
                            disableElevation
                            className={classes.cancelBtn}
                            onClick={() => setEditGrade(false)}
                        >
                            Cancel
                    </Button>
                        <Button
                            variant='contained'
                            color='primary'
                            disableElevation
                            onClick={() => setEditGrade(false)}
                        >
                            Update
                    </Button>
                    </Box>
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
                {
                    defaultGrades.map((obj, key) => {
                        return (
                            <div className={classes.fillGrade} key={key}>
                                <TextField
                                    id="outlined-textarea"
                                    label="Grade Name"
                                    placeholder={obj.grade}
                                    multiline
                                    variant="outlined"
                                    onChange={(event) => { setState((state) => { return { ...state, "grade": event.target.value } }) }}
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
                                    onChange={(event) => { setState((state) => { return { ...state, "percentage_from": event.target.value } }) }}
                                    classes={{
                                        root: classes.root
                                    }}
                                />
                                <TextField
                                    id="outlined-textarea"
                                    label=" To Percentage"
                                    multiline
                                    variant="outlined"
                                    onChange={(event) => { setState((state) => { return { ...state, "percentage_to": event.target.value } }) }}
                                    placeholder={obj.percentage_to}
                                    classes={{
                                        root: classes.root
                                    }}
                                />
                            </div>
                        )
                    })
                }
                <div className={classes.publish}>
                    <Box>
                        <Button
                            variant='contained'
                            disableElevation
                            className={classes.cancelBtn}
                            onClick={() => setNewGrade(false)}
                        >
                            Cancel
                    </Button>
                        <Button
                            variant='contained'
                            color='primary'
                            disableElevation
                            onClick={() => createGradeCall()}
                        >
                            Add
                    </Button>
                    </Box>
                </div>

            </div>
        )
    }

    const renderGrade = () => {
        return (
            <div>
                {
                    gradeData.length > 0 ?
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
                        </div> : renderEmptyGrade()
                }
            </div>
        )
    }

    const renderEmptyGrade = () => {
        return (
            <div>
                <div className={classes.gridContainer}>
                    <>
                        <Typography className={classes.itemGrade}>
                            Grades values not available.
                        </Typography>
                        <Typography className={classes.itemGrade}>
                            <img
                                src={editIcon}
                                className={classes.editIcon}
                                onClick={() => setNewGrade(true)} />
                        </Typography>
                    </>
                </div>
            </div>
        )
    }

    return (
        <>
            {showGrade && <div className={classes.container}>
                {!editGrade && !newGrade && renderGrade()}
                {editGrade && renderGradeEdit()}
                {newGrade && renderNewGrade()}
                {errMessage}
                <BackdropLoader open={isLoading} />
            </div>
            }
        </>
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
    }
]

/*Temp */
const searchValue1 = {}
const testValue1 = {}




