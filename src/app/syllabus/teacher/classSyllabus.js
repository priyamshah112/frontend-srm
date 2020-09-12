import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import SyllabusService from '../SyllabusService';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import SubjectSyllabus from './subjectSyllabus';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    container: {
      width: '100%',
      backgroundColor: theme.palette.mainBackground,
      height: '100%',
      marign: '0',
      padding: '0',
      overflowY: 'auto',
    },
    subjectTitle :{
        marginBottom:'20px'
    },
    loading: {
      width: '100%',
      textAlign: 'center',
      paddingTop: '8px',
      fontSize: '20px',
    },
}));

const ClassSyllabus = (props) => {
    const [isLoading, setLoading] = useState(true)
    const [classID, setClass] = useState(2)
    const [subjects, setSubjects] = useState(null)
    const token = localStorage.getItem("srmToken")
    const classes = useStyles();
    

    const handleChange = (event) => {
        setClass(event.target.value)
        setLoading(true)
    };

    const fetchSubjects = async () => {
      const response = await SyllabusService.getSubjects(token);
      //console.log(response)
      if (response.status === 200) {
        if(response.data.success && isLoading){
          const data = response.data.data.data
          setSubjects(data)
          setLoading(false)
        }
      }
    }
    
    
  
    const table = isLoading == false && subjects != null ? 
    Object.keys(subjects).map(function(key) {
     return ([<div style={{background:"#fff"}}>
     <SubjectSyllabus class_id={classID} subject_id={subjects[key].id} token_id={token} subject_name={subjects[key].name}/>
    </div>,<br/>,<br/>])
    })
    : null


    useEffect(() => {
      fetchSubjects()
    }, [isLoading]);

  return (
    <div className={classes.container}>
    <div style={{margin:20}}>
    <InputLabel id="demo-simple-select-label">Class</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={classID}
          onChange={handleChange}
        >
          <MenuItem value={1}>Class 1</MenuItem>
          <MenuItem value={2}>Class 2</MenuItem>
          <MenuItem value={3}>Class 3</MenuItem>
          <MenuItem value={4}>Class 4</MenuItem>
          <MenuItem value={5}>Class 5</MenuItem>
          <MenuItem value={6}>Class 6</MenuItem>
          <MenuItem value={7}>Class 7</MenuItem>
          <MenuItem value={8}>Class 8</MenuItem>
          <MenuItem value={9}>Class 9</MenuItem>
          <MenuItem value={10}>Class 10</MenuItem>
    </Select>    
    <br/>
    {isLoading? <div className={classes.loading}>
                <CircularProgress color='primary' size={30} />
              </div>:null}
    <br/>
    {table}
    <br/><br/>
    </div>    
    </div>
  );
  };
  const mapStateToProps = (state) => {
    return {
      selectedRole: state.auth.selectedRole,
    };
  };
  
  export default connect(mapStateToProps)(ClassSyllabus);