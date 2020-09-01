import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, Box, Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import InfiniteScroll from 'react-infinite-scroll-component';

import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import CancelIcon from '@material-ui/icons/Cancel';
import TaskBookIcon from '../../../../assets/images/home/teacher/TaskBook.svg';
import TaskEditor from './TaskEditor';
import TaskContent from './TaskContent';
import HomeSerivce from '../../HomeSerivce';

const useStyle = makeStyles((theme) => ({
  taskDiv: {
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
  taskIcon: {
    transform: 'translateY(5px)',
  },
  taskheader: {
    width: '100%',
    display: 'table-row',
    height: '30px',
  },
  tasks: {
    width: '100%',
    height: '100%',
    display: 'table-row',
  },
  addTaskIcon: {
    float: 'right',
    cursor: 'pointer',
    bottom: 0,
  },
  taskCard: {
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
    '& .taskContentDiv': {
      marginTop: '10px',
    },
  },
  taskContentStyle: {
    cursor: 'pointer',
  },
}));
const Tasks = (props) => {
  const classes = useStyle();
  const [hasMore, setHasMore] = useState(true);
  const [openEditor, setOpenEditor] = useState(false);
  const [createNew, setCreateNew] = useState(false);
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('pending');
  const [taskId, setTaskId] = useState(null);

  const handleCreateNew = (event) => {
    setContent('');
    setTaskId(null);
    setStatus('pending');
    setCreateNew(true);
    setOpenEditor(true);
  };

  const handleEditTask = (id, taskContent, status) => {
    setTaskId(id);
    setContent(taskContent);
    setStatus(status);
    setCreateNew(false);
    setOpenEditor(true);
  };

  const closeEditor = () => {
    setOpenEditor(false);
  };

  return (
    <div className={classes.taskDiv}>
      <div className={classes.taskheader}>
        <Typography className={classes.title}>
          <img
            src={TaskBookIcon}
            alt='Task Icon'
            className={classes.taskIcon}
          />
          <span className={classes.titleName}>&nbsp;Tasks</span>
          {openEditor ? (
            <CancelIcon
              color='primary'
              className={classes.addTaskIcon}
              onClick={(event) => {
                setOpenEditor(false);
              }}
            />
          ) : (
            <AddCircleRoundedIcon
              color='primary'
              className={classes.addTaskIcon}
              onClick={handleCreateNew}
            />
          )}
        </Typography>
      </div>
      <div className={classes.tasks}>
        <Card className={classes.taskCard}>
          {openEditor ? (
            <TaskEditor
              taskId={taskId}
              content={content}
              status={status}
              closeEditor={closeEditor}
              createNew={createNew}
            />
          ) : (
            <TaskContent handleEditTask={handleEditTask} />
          )}
        </Card>
      </div>
    </div>
  );
};

export default Tasks;
