import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';

import close from '../../../assets/images/home/Close.svg';

const useStyles = makeStyles((theme) => ({
  closeButton: {
    float: 'right',
    padding: '10px',
    cursor: 'pointer',
  },
  title: {
    paddinLeft: '10px',
    paddingTop: '10px',
  },
  dialogHeader: {
    padding: '10px',
    borderBottom: '1px solid #E5E5EA',
  },
  checkForm: {
    padding: '10px',
  },
  checkbox: {
    float: 'right',
  },
  label: {
    paddinLeft: '10px',
    paddingTop: '10px',
  },
}));

const Reminder = (props) => {
  const classes = useStyles();
  const { open, onClose, days } = props;

  const [checkboxes, setCheckBoxes] = useState({
    oneDayBefore: false,
    twoDayBefore: false,
    threeDayBefore: days === 3 ? false : undefined,
  });

  const handleReminderClose = () => {
    onClose({ ...checkboxes });
  };

  const handleCheck = (event) => {
    setCheckBoxes({ ...checkboxes, [event.target.name]: event.target.checked });
  };
  return (
    <Dialog
      onClose={handleReminderClose}
      aria-labelledby='simple-dialog-title'
      open={open}
      className={classes.dialog}
      fullWidth={true}
      maxWidth={'xs'}
    >
      <div className={classes.dialogHeader}>
        <img
          src={close}
          alt='close'
          className={classes.closeButton}
          onClick={handleReminderClose}
        />
        <Typography className='title' variant='h6'>
          Remind me
        </Typography>
      </div>
      <div className={classes.checkForm}>
        <Checkbox
          className={classes.checkbox}
          checked={checkboxes.oneDayBefore}
          onChange={handleCheck}
          color='primary'
          name='oneDayBefore'
        />
        <Typography className={classes.label}>1 day before</Typography>

        <br />
        <Checkbox
          className={classes.checkbox}
          checked={checkboxes.twoDayBefore}
          onChange={handleCheck}
          color='primary'
          name='twoDayBefore'
        />

        <Typography className={classes.label}>2 day before</Typography>
        <br />

        {checkboxes.threeDayBefore !== undefined ? (
          <>
            <Checkbox
              className={classes.checkbox}
              checked={checkboxes.threeDayBefore}
              onChange={handleCheck}
              color='primary'
              name='threeDayBefore'
            />
            <Typography className={classes.label}>3 day before</Typography>
          </>
        ) : (
          ''
        )}
      </div>
    </Dialog>
  );
};

export default Reminder;
