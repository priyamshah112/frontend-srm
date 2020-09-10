import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Typography,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { useHistory } from 'react-router-dom';
import BackIcon from '../../assets/images/Back.svg';
import { connect } from 'react-redux';

import SupportApprove from './admin/SupportApprove';

const useStyle = makeStyles((theme) => ({
  container: {
    width: '100%',
    backgroundColor: theme.palette.mainBackground,
    height: '100%',
    marign: '0',
    padding: '0',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: 0,
    },
  },
  supportContainer: {
    width: '95%',
    height: '100%',
    margin: '0 auto',
  },
  card: {
    marginTop: '20px',
    boxShadow: 'none',
    borderRadius: '10px',
  },
  Header: {
    textAlign: 'center',
  },
  labelText: {
    fontSize: '14px',
    fontStyle: 'normal',
    color: `${theme.palette.common.blackRussian}`,
    opacity: 0.5,
  },
  backImg: {
    float: 'left',
    cursor: 'pointer',
    transform: 'translateY(5px)',
  },
  marginT30: {
    marginTop: '30px',
  },
  mainSection: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
  },
  contentSection: {
    width: `calc(100% - 150px)`,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  subContentSection: {
    width: '150px',
    marginLeft: 'auto',
    textAlign: 'right',
    [theme.breakpoints.down('xs')]: {
      margin: 0,
      textAlign: 'left',
    },
  },
  highlightedText: {
    fontSize: '14px',
    fontStyle: 'normal',
    color: `${theme.palette.common.blackRussian}`,
    fontWeight: 500,
    opacity: 1,
  },
  normalText: {
    fontSize: '14px',
    fontStyle: 'normal',
    color: `${theme.palette.common.blackRussian}`,
    opacity: 1,
  },
  cardContent: {
    padding: '30px 20px 34px !important',
  },
  textAlignRight: {
    textAlign: 'right',
  },
  selectDiv: {
    width: '100%',
  },
  formControl: {
    width: '100%',
  },
  detailsSection: {
    marginTop: '20px',
  },
}));

const SupportDetails = (props) => {
  const classes = useStyle();
  const history = useHistory();
  const selectedRole = props.selectedRole;

  const [status, setStatus] = useState('');
  const [open, setOpen] = useState(false);
  const [openApproveDialog, setOpenApproveDialog] = useState(false);

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleCloseApproveDialog = () => {
    setOpenApproveDialog(false);
  };

  useEffect(() => {
    if (status === 'Approved') {
      setOpenApproveDialog(true);
    }
  }, [status]);

  return (
    <>
      <div className={classes.detailsCard}>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <div className={classes.Header}>
              <div className={classes.backBtnDiv}>
                <img
                  src={BackIcon}
                  alt='Back'
                  className={classes.backImg}
                  onClick={() => {
                    history.push('/support');
                  }}
                />
              </div>
              <div className={classes.ticketNumber}>
                <Typography variant='h5'>9383829182</Typography>
              </div>
            </div>

            <div className={`${classes.mainSection} ${classes.marginT30}`}>
              <div className={classes.contentSection}>
                <Typography className={classes.highlightedText}>
                  Problem with parking
                </Typography>
              </div>
              <div className={classes.subContentSection}>
                <Typography className={classes.labelText}>
                  02 Jun, 2020, 02.05PM
                </Typography>
              </div>
            </div>

            <div className={classes.mainSection} style={{ display: 'flex' }}>
              {selectedRole === 'admin' || selectedRole === 'teacher' ? (
                ''
              ) : (
                <div className={classes.contentSection}>
                  <Typography className={classes.normalText}>
                    Status - Submitted
                  </Typography>
                </div>
              )}
              <div
                className={classes.subContentSection}
                style={{ width: 'max-content', marginLeft: 'auto' }}
              >
                <Typography className={classes.labelText}>Others</Typography>
              </div>
            </div>
            {selectedRole === 'admin' || selectedRole === 'teacher' ? (
              <div className={classes.selectDiv}>
                <FormControl className={classes.formControl}>
                  <InputLabel id='demo-controlled-open-select-label'>
                    Status
                  </InputLabel>
                  <Select
                    labelId='demo-controlled-open-select-label'
                    id='demo-controlled-open-select'
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={status}
                    onChange={handleChange}
                  >
                    <MenuItem value={'Submitted'}>Submitted</MenuItem>
                    <MenuItem value={'Acknowledged'}>Acknowledged</MenuItem>
                    <MenuItem value={'InProgress'}>InProgress</MenuItem>
                    <MenuItem value={'Resolved'}>Resolved</MenuItem>
                    <MenuItem value={'Canceled'}>Canceled</MenuItem>
                    <MenuItem value={'Approved'}>Approved</MenuItem>
                  </Select>
                </FormControl>
              </div>
            ) : (
              ''
            )}

            <div className={classes.detailsSection}>
              <Typography className={classes.normalText}>
                Hi Sir/Madam, There is no space to park vehicle when we come to
                pick up kids. There is nobody even guiding traffic when kids are
                out in the street after school. It would be very helpful if we
                can have somebody guide traffic. Also, it would be very helpful
                if we can have some space to park vehicles so that vehicles
                could be parked there and it will help to pickup kids safely
                Thanks, Manohar
              </Typography>
            </div>
          </CardContent>
        </Card>
      </div>
      {openApproveDialog ? (
        <SupportApprove
          open={openApproveDialog}
          handleClose={handleCloseApproveDialog}
        />
      ) : (
        ''
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedRole: state.auth.selectedRole,
  };
};

export default connect(mapStateToProps)(SupportDetails);
