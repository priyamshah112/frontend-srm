import React, { useState } from 'react';
import 'date-fns';
import { makeStyles } from '@material-ui/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
  DateTimePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  dateTimeContainer: {
    minWidth: '200px',

    '& .MuiInput-underline:before': {
      borderBottom: '2px solid #eaeaea',
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: '2px solid #7B72AF',
      transitionProperty: 'border-bottom-color',
      transitionDuration: '500ms',
      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  dialogActionsContainer: {
    '&.MuiDialogActions-root': {
      justifyContent: 'center',
      marginBottom: '10px',
    },
  },
  button: {
    minWidth: '80px',
    textTransform: 'none',
  },
  confirmationText: {
    fontWeight: 500,
    fontSize: '1rem',
    color: '#000000',
  },
  dialogContent: {
    textAlign: 'center',
  },
}));

const PublishLater = (props) => {
  const classes = useStyles();
  const { open, handleClose, handlePublishLater } = props;
  // const [selectedDate, handleDateChange, ...other] = useState(null);
  const [selectedDate, setSelectedDateChange] = useState(null);
  const handleSubmitDate = () => {
    handlePublishLater(selectedDate);
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={'sm'}
        fullWidth={false}
      >
        <DialogContent>
          <div className={classes.dateTimeContainer}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify='space-around'>
                <KeyboardDateTimePicker
                  value={selectedDate}
                  onChange={(dateTime) => {
                    setSelectedDateChange(dateTime);
                  }}
                  label='Publish Date and Time '
                  minDate={new Date()}
                  format='yyyy/MM/dd hh:mm a'
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </div>
        </DialogContent>
        <DialogActions classes={{ root: classes.dialogActionsContainer }}>
          <Button
            color='primary'
            variant='outlined'
            onClick={handleClose}
            className={classes.button}
          >
            Cancel
          </Button>
          <Button
            color='primary'
            autoFocus
            variant='contained'
            className={classes.button}
            onClick={handleSubmitDate}
          >
            Publish
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PublishLater;
