import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import ParentSyllabus from './parent/ParentSyllabus';
import ClassSyllabus from './teacher/classSyllabus';

const useStyles = makeStyles((theme) => ({
    container: {
      width: '100%',
      backgroundColor: theme.palette.mainBackground,
      height: '100%',
      marign: '0',
      padding: '0',
      overflowY: 'auto',
    },
}));

const Syllabus = (props) => {
    const classes = useStyles();
    const selectedRole = props.selectedRole;
    return (
      <div className={classes.container}>
        {selectedRole === 'parent' ?  <ParentSyllabus/> : <ClassSyllabus/> }
        
      </div>
    );
  };

  const mapStateToProps = (state) => {
    return {
      selectedRole: state.auth.selectedRole,
    };
  };
  
  export default connect(mapStateToProps)(Syllabus);