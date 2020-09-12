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
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const SubjectSyllabus = (props) => {
    const [table,setTable] = useState("...")
    //setSyllabus(syllabus => ({...syllabus, subjectID:data}))

    const fetchSyllabus = async (classID,subjectID) => {
        const response = await SyllabusService.getSyllabusByParams(props.token_id,classID,subjectID);
        if (response.status === 200) {
          if(response.data.success && response.data.data.data.length > 0){
            const data = response.data.data.data
            
            //const classes = useStyles();
            const tableData = <TableContainer>
    <Table aria-label="spanning table">
      <TableHead>
        <TableRow>
          <TableCell align="center"><Typography variant="subtitle1"><b>Term</b></Typography></TableCell>
          <TableCell align="center" width="100%"><Typography variant="subtitle1"><b>{props.subject_name}</b></Typography></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.keys(data).map((i) => (
          <TableRow key={data[i].id}>
            <TableCell component="th" align="center" scope="row" width="15%">
            <Typography variant="subtitle1"><b>{data[i].chapters.term}</b></Typography>
            </TableCell>
            <TableCell align="left" width="85%">
            <Typography variant="h6" gutterBottom>
                Chapter {data[i].chapters.chapter}
            </Typography>    
            <Typography variant="subtitle1" gutterBottom>
            {data[i].main_content}
            </Typography>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer> 

            setTable(tableData)
           }else{
            setTable(<div>
                <Table aria-label="spanning table">
      <TableHead>
        <TableRow>
          <TableCell align="center"><Typography variant="subtitle1"><b>Term</b></Typography></TableCell>
          <TableCell align="center" width="100%"><Typography variant="subtitle1"><b>{props.subject_name}</b></Typography></TableCell>
        </TableRow>
      </TableHead>
      </Table>
                <br/><Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                style={{paddingBottom:20}}
              ><Button variant="outlined" color="primary" disableElevation alignself="center" style={{width:"70%"}}>
            Add Chapters & Description
          </Button></Grid></div>)
           }
        }
    }
    fetchSyllabus(props.class_id,props.subject_id)
    return(table)
}
export default SubjectSyllabus;