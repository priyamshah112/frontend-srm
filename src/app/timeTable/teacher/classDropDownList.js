import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import TimetableService from '../timeTableService';
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Container } from '@material-ui/core';
import ClassTestList from './ClassTestList';







const useStyles = makeStyles((theme) => ({
    textList: {
        position: '',
        marginTop: '30px'
    },
    container: {
        display: "table-cell",
        textAlign: 'center',
        verticalAlign: "middle",

    },
    grid: {
        display: "table",
        height: "100vh",
        width: "100%",
        margin: "auto",

    }
}));

const TeacherTimeTable = () => {
    const classes = useStyles();
    const token = localStorage.getItem("srmToken");
    const [classList, setClassList] = useState(null)
    const [className, setClassName] = useState();
    const [isLoading, setLoading] = useState(true);
    const [classListUi, setClassListUi] = useState(false);
    const [classID, setClassID] = useState();




    const handleChange = (e) => {
        setClassName(e.target.value)
    }
    const fetchClass = async (isMounted) => {
        const response = await TimetableService.getClass(token)

        if (response.status === 200) {
            const data = response.data.data;
            setClassList(data)
            setLoading(false)
        }
    };
    useEffect(() => {
        fetchClass()
    }, [])

    const clickMenuItem = (e, classid) => {
        setClassID(classid.id)
        setClassListUi(true)
    }




    return (
        <Fragment>
            {classListUi === false ?
                <div className={classes.grid} >
                    <div item className={classes.container}>


                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={className}
                            onChange={handleChange}
                            style={{ width: "50%" }}
                            renderValue={(selected) => {
                                if (selected.length === 0) {
                                    return <em>Placeholder</em>;
                                }

                                return selected.join(', ');
                            }}
                        >
                            <MenuItem disabled value="">
                                Class
                            </MenuItem>
                            {classList != null
                                ? Object.keys(classList).map(function (key, index) {
                                    return (

                                        <MenuItem key={index} value={classList[key]} onClick={(e) => clickMenuItem(e, classList[key])}>
                                            {classList[key].class_name}
                                        </MenuItem>
                                    );
                                })
                                : null
                            }
                        </Select>

                        <br />
                        {isLoading ? (
                            <div className={classes.loading}>
                                <CircularProgress color="primary" size={30} />
                            </div>
                        ) : null}
                        <br />
                        <br />
                        <br />
                    </div>
                </div> :
                <Container>
                    < ClassTestList classID={classID} />
                </Container>

            }


        </Fragment>
    )
}
export default TeacherTimeTable;
