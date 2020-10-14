import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import TimetableService from '../timeTableService';
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import TestList from '../examTestList';
import { Container } from '@material-ui/core';


// import axios from 'axios';


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
    const [classList, setClasses] = useState(null);
    const [classNmae, setClassName] = useState(null);
    const token = localStorage.getItem("srmToken");
    const [isLoading, setLoading] = useState(true);
    const [testList, setTestList] = useState(false);

    const handleChange = (e) => {
        setClassName(e.target.value)
    }

    const fetchClasses = async (isMounted) => {
        const response = await TimetableService.getClass(token)

        if (response.status === 200) {
            console.log("fetchClasses -> " + response.data)

            if (response.data.status == "success" && isLoading && classList == null) {
                console.log(response.data.data)
                setLoading(false)

                setClasses(response.data.data);
            }
        }
    };
    useEffect(() => {
        let isMounted = true;

        if (classList == null) {
            fetchClasses(isMounted);
        }
        // fetchSubjects(isMounted);

        return () => {
            isMounted = false;
        };
    });

    const handlemenuitem = (e) => {
        e.preventDefault();

        console.log(classNmae)
        setTestList(true)
    }


    return (
        <div style={{ overflowY: 'auto' }}>
            {testList === false ?
                <div className={classes.grid} >
                    <div item className={classes.container}>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={classNmae}
                            onChange={handleChange}
                            name='raju'
                            style={{ width: "50%" }}
                            MenuProps={{
                                anchorOrigin: {
                                    vertical: "bottom",
                                    horizontal: "center",
                                },
                                transformOrigin: {
                                    vertical: "top",
                                    horizontal: "center",
                                },
                                getContentAnchorEl: null,
                            }}
                        >
                            {classList != null
                                ? Object.keys(classList).map(function (key, index) {
                                    return (
                                        <MenuItem key={index} value={classList[key]} onClick={handlemenuitem}>
                                            {classList[key].class_name}
                                        </MenuItem>
                                    );
                                })
                                : null}
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
                <Container >
                    <TestList />

                </Container>

            }
        </div>

    );

}

export default TeacherTimeTable;