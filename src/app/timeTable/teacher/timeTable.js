import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import TimetableService from '../timeTableService';
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import TestList from './examTestList';
import { Container } from '@material-ui/core';
<<<<<<< HEAD:src/app/timeTable/teacher/timeTable.js
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
=======
import ClassTestList from './ClassTestList';



>>>>>>> 5ff0e99869b7118e93743297b55ee54a952e2f0b:src/app/timeTable/teacher/classDropDownList.js




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
    
    const [classNmae, setClassName] = useState("");
    const token = localStorage.getItem("srmToken");
    const [isLoading, setLoading] = useState(true);
<<<<<<< HEAD:src/app/timeTable/teacher/timeTable.js
    const [testList, setTestList] = useState(false);
    const [testlist, setTestlist] = useState(null);
    const [classId, setClassId] = useState(null);
=======
    const [classListUi, setClassListUi] = useState(false);
    const [classID, setClassID] = useState();



>>>>>>> 5ff0e99869b7118e93743297b55ee54a952e2f0b:src/app/timeTable/teacher/classDropDownList.js

    const handleChange = (e) => {
        setClassName(e.target.value)
    }

    const fetchClasses = async (isMounted) => {
        const response = await TimetableService.getClass(token)

        if (response.status === 200) {
            // console.log("fetchClasses -> " + response.data.data)

            if (response.data.status == "success" && isLoading && classList == null) {
                // console.log(response.data.data)
                setLoading(false)

                setClasses(response.data.data);
            }
        }
    };
<<<<<<< HEAD:src/app/timeTable/teacher/timeTable.js

    const fetchTestList = async (classId) => {
        const response = await TimetableService.getTestList(token, classId);
        if (response.status === 200) {
            // console.log("fetchClasses -> ", response.data.data.data)
            setTestlist(response.data.data)
            console.log(setTestlist(response.data.data.data.map(list => list.name)));
            setTestList(true);
            // console.log("raju", response.data.data.data)
            setTestlist(response.data.data.data.map(list => list))
        }
        if (response.data.status == "success" && isLoading && testlist == null) {
            setLoading(false)
            // setTestlist(response.data.data.data)
            // console.log("raju",response.data.data.data)

        }
=======
    useEffect(() => {
        fetchClass()
    }, [])

    const clickMenuItem = (e, classid) => {
        setClassID(classid.id)
        setClassListUi(true)
>>>>>>> 5ff0e99869b7118e93743297b55ee54a952e2f0b:src/app/timeTable/teacher/classDropDownList.js
    }

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

    const handlemenuitem = async (e, classes) => {
        e.preventDefault();
        fetchTestList(classes.id);
        setClassId(classes.id);
    }
    const backtickTestList = () => {
        setTestList(false)

    }
    //  const testlistrender=()=>{
    //     testlist.map((key,index)=>{
    //             return      <div key={index} >
    //                 <TestList backtickTestList={backtickTestList} name={testlist[key]} />
    //             </div>

    //     })
    //  }

    return (

        <div>
            {testList === false ?
                <div className={classes.grid} >
                    <div item className={classes.container}>


                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={classNmae}
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

<<<<<<< HEAD:src/app/timeTable/teacher/timeTable.js
                                        <MenuItem key={index} value={classList[key]} onClick={(e) => handlemenuitem(e, classList[key])}>
=======
                                        <MenuItem key={index} value={classList[key]} onClick={(e) => clickMenuItem(e, classList[key])}>
>>>>>>> 5ff0e99869b7118e93743297b55ee54a952e2f0b:src/app/timeTable/teacher/classDropDownList.js
                                            {classList[key].class_name}
                                        </MenuItem>
                                    );
                                })
<<<<<<< HEAD:src/app/timeTable/teacher/timeTable.js
                                : null}
=======
                                : null
                            }
>>>>>>> 5ff0e99869b7118e93743297b55ee54a952e2f0b:src/app/timeTable/teacher/classDropDownList.js
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
                        {/* "raju" */}
                    <TestList backtickTestList={backtickTestList} classId={classId} testNmae={testlist} />

                </Container>



            }
        </div>

    );

}

export default TeacherTimeTable;