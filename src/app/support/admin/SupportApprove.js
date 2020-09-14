import React from 'react';
import { makeStyles } from '@material-ui/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  logoutContainer: {
    minWidth: '200px',
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

const SupportApprove = (props) => {
  const classes = useStyles();
  const { open, handleClose } = props;
  const history = useHistory();

  const handleApproveClose = () => {
    history.replace('/support');
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
          <div className={classes.logoutContainer}>
            <div className={classes.dialogContent}>
              <ExitToAppIcon color='primary' />
            </div>
            <div className={classes.dialogContent}>
              <Typography className={classes.confirmationText}>
                Want to Approve?
              </Typography>
            </div>
          </div>
        </DialogContent>
        <DialogActions classes={{ root: classes.dialogActionsContainer }}>
          <Button
            onClick={handleClose}
            color='primary'
            variant='outlined'
            className={classes.button}
          >
            No
          </Button>
          <Button
            onClick={handleApproveClose}
            color='primary'
            autoFocus
            variant='contained'
            className={classes.button}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SupportApprove;
