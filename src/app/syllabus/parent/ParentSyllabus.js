import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import SyllabusService from '../SyllabusService';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    container: {
      width: '100%',
      backgroundColor: theme.palette.mainBackground,
      height: '100%',
      marign: '0',
      padding: '0',
      overflowY: 'auto',
    }
}));

const ParentSyllabus = (props) => {
    const [syllabus, setSyllabus] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [subject, setSubject] = useState(1); //Choose Subject ID
    const [subjects, setSubjects] = useState(1); //subjects ARRAY
    const [classList, setClasses] = useState(null);
    const [classID, setClass] = useState(1);
    const token = localStorage.getItem("srmToken")

    const handleChange = (event) => {
        setSubject(event.target.value)
        setLoading(true)
    };

    const fetchClassSyllabus = async (subject_id, class_id) => {
      console.log(class_id);
      console.log(subject_id);
        const response = await SyllabusService.getSyllabusByParams(token,class_id,subject_id);
        console.log(response);
        if (response.status === 200) {
          if(response.data.success && isLoading){
            console.log("Subject ID - "+response.data.data)
            if(response.data.data.length == 0){
              setSyllabus(null)
            }else{
              setSyllabus(response.data.data)
            }
            setLoading(false)
           }
    }
    }
    const fetchClasses = async () => {
      const response = await SyllabusService.fetchClasses(token);
      if (response.status === 200) {
        console.log("fetchClasses -> "+ response.data)
  
        if (response.data.status == "success") {
          console.log(response.data.data)
          setClasses(response.data.data);
        }
      }
    };

    const fetchSubjects = async () => {
      const response = await SyllabusService.getSubjects(token);
      if (response.status === 200) {
        if (response.data.success && isLoading) {
          console.log(response.data.data.data);
          const data = response.data.data.data;
  
          setSubjects(data);
        }
      }
    };

    const handleClassChange = (event) => {
      setClass(event.target.value);
      setLoading(true);
      fetchClassSyllabus(subject,event.target.value);
    };
    useEffect(() => {
        if (classList == null) {
          fetchClasses();
          fetchSubjects();
        }
      fetchClassSyllabus(subject,classID)
    }, [classList]);

    const classes = useStyles();
    const table = isLoading == false ? <TableContainer component={Paper}>
    <Table className={classes.table} aria-label="spanning table">
      <TableHead>
        <TableRow>
          <TableCell align="center" width="15%"><Typography variant="subtitle1"><b>Term</b></Typography></TableCell>
          <TableCell align="center" width="85%"><Typography variant="subtitle1"><b>Details</b></Typography></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {syllabus != null ? syllabus.chapters.map((chapter,index) => (
          <TableRow key={index}>
            <TableCell component="th" align="center" scope="row" width="15%">
            <Typography variant="subtitle1"><b>{index}</b></Typography>
            </TableCell>
            <TableCell align="left" width="85%">
            <Typography variant="h6" gutterBottom>
                Chapter {chapter}
            </Typography>    
            <Typography variant="subtitle1" gutterBottom>
            Real Numbers <br/> Rational Numbers
            </Typography>
            </TableCell>
          </TableRow>
        )) : null}
      </TableBody>
    </Table>
  </TableContainer> : null
  return (
    <div className={classes.container}>
    <div style={{margin:20}}>
    <InputLabel id="demo-simple-select-label">Subject</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={subject}
          onChange={handleChange}
          style={{marginRight:20}}
        >
          {subjects != null
            ? Object.keys(subjects).map(function (key, index) {
                return (
                  <MenuItem key={index} value={subjects[key].id}>
                    {subjects[key].name}
                  </MenuItem>
                );
              })
            : null}
    </Select>   
    <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={classID}
          onChange={handleClassChange}
        >
          {classList != null
            ? Object.keys(classList).map(function (key, index) {
                return (
                  <MenuItem key={index} value={classList[key].id}>
                    {classList[key].class_name}
                  </MenuItem>
                );
              })
            : null}
    </Select>    
    <br/><br/>
    {table}
    </div>    
    </div>
  );
  };
  const mapStateToProps = (state) => {
    return {
      selectedRole: state.auth.selectedRole,
    };
  };
  
  export default connect(mapStateToProps)(ParentSyllabus);