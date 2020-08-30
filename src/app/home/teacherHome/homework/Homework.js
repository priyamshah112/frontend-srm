import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, Box, Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';

import taskBookIcon from '../../../../assets/images/home/teacher/TaskBook.svg';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import { useHistory } from 'react-router-dom';

const useStyle = makeStyles((theme) => ({
  homeworkDiv: {
    height: '100%',
    display: 'table',
    width: '100%',
  },
  title: {
    textTransform: 'uppercase',
    fontWeight: 800,
    letterSpacing: '1px',
    color: `${theme.palette.common.bastille}`,
  },
  homeworkIcon: {
    transform: 'translateY(5px)',
  },
  homeworkheader: {
    width: '100%',
    display: 'table-row',
    height: '30px',
  },
  homeworks: {
    width: '100%',
    height: '100%',
    display: 'table-row',
  },
  addhomeworkIcon: {
    float: 'right',
    cursor: 'pointer',
    bottom: 0,
  },
  homeworkCard: {
    borderRadius: '10px',
    height: '100%',
  },
  loading: {
    textAlign: 'center',
    justifyContent: 'center',
    margin: 'auto',
  },
  CardContent: {
    padding: '0 0 0 10px !important',
    margin: '10px 0 0 0',
    height: '345px',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: '0.4em',
    },
    '&::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.2)',
      outline: 'none',
      borderRadius: '5px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: `${theme.palette.primary.main}`,
      borderRadius: '5px',
    },
    '& .homeworkContentDiv': {
      marginTop: '10px',
    },
  },
  homeworkContentStyle: {
    cursor: 'pointer',
  },
}));

const Homework = () => {
  const classes = useStyle();
  const history = useHistory();
  const handleCreateNew = (event) => {
    history.push('/homework');
  };
  return (
    <div className={classes.homeworkDiv}>
      <div className={classes.homeworkheader}>
        <Typography className={classes.title}>
          <img
            src={taskBookIcon}
            alt='homework Icon'
            className={classes.homeworkIcon}
          />
          <span className={classes.titleName}>&nbsp;Homework</span>
          <AddCircleRoundedIcon
            color='primary'
            className={classes.addhomeworkIcon}
            onClick={handleCreateNew}
          />
        </Typography>
      </div>
      <div className={classes.homeworks}>
        <Card className={classes.homeworkCard}>
          {/* {openEditor ? (
            <homeworkEditor
              homeworkId={homeworkId}
              content={content}
              status={status}
              closeEditor={closeEditor}
              createNew={createNew}
            />
          ) : (
            <homeworkContent handleEdithomework={handleEdithomework} />
          )} */}
          <p>Homework</p>
        </Card>
      </div>
    </div>
  );
};

export default Homework;
