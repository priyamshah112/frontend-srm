import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, Button, Grid, TextField, Card } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import HomeSerivce from '../../HomeSerivce';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const useStyle = makeStyles((theme) => ({
  CardContent: {
    padding: '10px 0 0 0 !important',
    margin: '0',
    height: '100%',
  },

  taskCard: {
    borderRadius: '10px',
    height: '100%',
  },
  menuBar: {
    display: 'flex',
  },
  menuItems: {
    // padding: 'auto',
    textAlign: 'center',
  },
  menuBtn: {
    width: '100px',
  },
  removeBtn: {
    backgroundColor: 'red',
    color: 'white',
    border: '1px solid red',
    '&:hover': {
      backgroundColor: 'white',
      border: ' 1px solid red',
      color: 'red',
    },
  },
  textAreaGrid: {
    width: '100%',
  },
  textArea: {
    width: '90%',
    height: '100%',
    margin: 'auto',
  },
  footer: {
    marginTop: '5px',
    paddingRight: '20px',
    textAlign: 'right',
  },
}));

const Tasks = (props) => {
  const classes = useStyle();
  const { taskId, content, status, closeEditor, createNew, ...others } = props;
  const [taskContent, setContent] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [multilineLabel, setMultilineLabel] = useState('Add a task');

  const handleChangeTask = (event) => {
    setContent(event.target.value);
  };

  const handlePaste = (event) => {
    // console.log(event.target.value);
  };

  async function saveTask() {
    const token = localStorage.getItem('srmToken');
    const response = await HomeSerivce.createTask(token, {
      content: taskContent,
    });
    // console.log('Create Task: ', response);
    closeEditor();
  }

  async function saveEditedTask() {
    const token = localStorage.getItem('srmToken');
    const response = await HomeSerivce.updateTask(token, taskId, {
      content: taskContent,
      status: status,
    });
    // console.log('Update Task: ', response);
    closeEditor();
  }

  async function deleteTask() {
    const token = localStorage.getItem('srmToken');
    const response = await HomeSerivce.deleteTask(token, taskId);
    // console.log('Delete Task: ', response);
    closeEditor();
  }

  const handleSave = (event) => {
    // console.log(taskContent.length);
    if (taskContent.length < 300) {
      if (createNew) {
        saveTask();
      } else {
        saveEditedTask();
      }
    } else {
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleDeleteTask = (event) => {
    deleteTask();
  };

  useEffect(() => {
    if (!createNew) {
      setMultilineLabel('Edit a task');
      setContent(content);
    }
  }, [createNew]);

  return (
    <>
      <Card className={classes.taskCard}>
        <CardContent className={classes.CardContent}>
          <Grid className={classes.menuBar}>
            <Grid item xs={4} className={classes.menuItems}>
              {createNew ? (
                <Button
                  variant='contained'
                  onClick={closeEditor}
                  color='secondary'
                  disableElevation
                  className={classes.menuBtn}
                >
                  Discard
                </Button>
              ) : (
                <Button
                  variant='contained'
                  onClick={handleDeleteTask}
                  color='secondary'
                  disableElevation
                  className={classes.menuBtn}
                >
                  Delete
                </Button>
              )}
            </Grid>
            <Grid item xs={4} className={classes.menuItems}>
              <Typography className={classes.title}>Task Editor</Typography>
            </Grid>
            <Grid item xs={4} className={classes.menuItems}>
              <Button
                variant='contained'
                color='primary'
                onClick={handleSave}
                disableElevation
                className={classes.menuBtn}
              >
                Save
              </Button>
            </Grid>
          </Grid>
          <hr />
          <Grid container className={classes.textAreaGrid}>
            <TextField
              id='outlined-multiline-static'
              label={multilineLabel}
              className={classes.textArea}
              multiline
              rows={13}
              value={taskContent}
              onPaste={handlePaste}
              onChange={handleChangeTask}
              variant='outlined'
            />
          </Grid>
          <div className={classes.footer}>
            <Typography>Character: {taskContent.length}/300</Typography>
          </div>
        </CardContent>
      </Card>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity='error'>
          Maximum 300 characters allowed
        </Alert>
      </Snackbar>
    </>
  );
};

export default Tasks;
