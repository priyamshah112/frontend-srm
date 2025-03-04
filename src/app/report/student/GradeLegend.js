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
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: "0px 10px",
        marginBottom: '20px'
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
        margin: '10px 0px',
        backgroundColor: '#fff',
        flexBasis: '95%',
        justifyContent: 'center'
    },
    gridContainer2: {
        display: 'flex',
        margin: '5px 5px',
        backgroundColor: '#fff',
        borderRadius: "2px",
        justifyContent: 'space-between'
    },
    emptyGrade: {
        display: 'flex',
        justifyContent: "space-between",
        margin: '20px 0px',
        backgroundColor: '#fff'
    },
    emptyGradeMessage: {
        display: 'flex',
        justifyContent: "space-between",
        margin: '8px',
        backgroundColor: '#fff'
    },
    itemGrade: {
        textAlign: 'center',
        padding: '5px',
        borderRadius: "1px"
    },
    itemPercent: {
        textAlign: 'center',
        padding: '6px',
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
    deleteBtnWrapper: {
        marginLeft: '10px',
        background: '#fff'
    },
    deleteBtn: {
        color: 'red'
    },
    addBtn: {
        color: '#7B72AF'
    },
    gradeEdit: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        padding: '0px 5px',
        flexBasis: '5%',
        marginBottom: '5px'
    }
}));

const GradeLegend = (props) => {
    const classes = useStyles(props);

    const [gradeData, setGradeData] = useState([]);
    const [newGrade, setNewGrade] = useState(false);
    const [editGrade, setEditGrade] = useState(false);
    const [errMessage, setError] = useState('');
    const [getError, setGetError] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const [state, setState] = useState({
        grade: '',
        percentage_from: '',
        percentage_to: ''
    });

    const { token, testData, searchData } = props;



    useEffect(() => {
        let loading = true;
        props.onGradeEdit(editGrade || newGrade);

        if (testData && testData.class_id) {
            async function getGrades() {
                try {
                    const response = await ReportService.getGrades(token, testData.class_id);

                    if (response.status === 200) {
                        if (loading) {
                            setGradeData(response.data.data || []);
                            setGetError(null);
                            setLoading(false);
                        }
                    }
                } catch (error) {
                    console.log("getGrades Error", error);
                    setGetError('')
                    setLoading(false);
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
                    }
                }
            } catch (error) {
                console.log(error);
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
        setEditGrade(false);

        async function getGrades() {
            try {
                const response = await ReportService.deleteGrades(token, data);

                if (response.status === 200) {
                    if (loading) {
                        setLoading(false);
                    }
                }
            } catch (error) {
                console.log(error);
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
                                className={classes.deleteBtnWrapper}
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
                            Save
                    </Button>
                    </Box>
                </div>
            </div>
        )
    }

    const setGradeValue = (event, type) => {
        state[type] = event.target.value
        setState(state);
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
                                    onChange={(event) => setGradeValue(event, 'grade')}
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
                                    onChange={(event) => setGradeValue(event, 'percentage_from')}
                                    classes={{
                                        root: classes.root
                                    }}
                                />
                                <TextField
                                    id="outlined-textarea"
                                    label=" To Percentage"
                                    multiline
                                    variant="outlined"
                                    onChange={(event) => setGradeValue(event, 'percentage_to')}
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
            <div className={classes.gridContainer2}>
                {
                    gradeData.length > 0 ?
                        <Grid container className={classes.gridContainer}>
                            {gradeData.map((obj, key) => {
                                return (
                                    <React.Fragment key={key}>
                                        <Typography className={classes.itemPercent}>
                                            <span style={{ fontSize: '14px' }}>{obj.grade} - {obj.percentage_to}% - {obj.percentage_from}%</span>
                                        </Typography>
                                    </React.Fragment>
                                )
                            })
                            }
                        </Grid> : renderEmptyGrade()
                }
                <div className={`${classes.gradeEdit} noprint`}>
                    {searchData.user_classes && editAccess() &&
                        <img
                            src={editIcon}
                            className={classes.editIcon}
                            onClick={() => {
                                gradeData.length > 0 ? setEditGrade(true) : setNewGrade(true);
                            }} />

                    }
                </div>
            </div>
        )
    }

    const editAccess = () => {
        if (props.selectedRole == 'student' || props.selectedRole == 'parent') {
            return false;
        } else {

            return !props.isPublish;
        }
    }
    const renderEmptyGrade = () => {
        return (
            <div>

                {!isLoading && <div className={classes.emptyGradeMessage}>
                    <Typography className={classes.itemGrade}>
                        <span>Grades not available. {getError}</span>
                    </Typography>
                </div>}
            </div>
        )
    }

    return (
        <div>
            <div className={classes.container}>
                {editGrade && renderGradeEdit()}
                {newGrade && renderNewGrade()}
                {!editGrade && !newGrade && renderGrade()}
            </div>
            {/* <BackdropLoader open={isLoading} /> */}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        selectedRole: state.auth.selectedRole
    };
};

export default connect(mapStateToProps)(GradeLegend);

var defaultGrades = [
    {
        "grade": "A+",
        "percentage_from": 90,
        "percentage_to": 100,
    }
]