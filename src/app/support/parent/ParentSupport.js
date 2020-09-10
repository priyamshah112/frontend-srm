import React from 'react';
import { makeStyles } from '@material-ui/styles';
import SupportCard from '../SupportCard';
import AddIcon from '../../../assets/images/Add.svg';
import { Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
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
    margin: '0 auto',
  },

  header: {
    paddingLeft: '15px',
    paddingTop: '10px',
    textAlign: 'right',
  },
  addNew: {
    color: theme.palette.common.deluge,
    marginTop: '15px',
    '& .new': {
      float: 'right',
      fontSize: '14px',
      padding: '5px',
    },
    '& img': {
      margin: '5px',
      height: '20px',
      cursor: 'pointer',
    },
  },

  addNewDiv: {
    cursor: 'pointer',
    width: 'fit-content',
    marginLeft: 'auto',
  },
  loading: {
    width: '100%',
    textAlign: 'center',
    paddingTop: '8px',
    fontSize: '20px',
  },
}));

const ParentSupport = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const handleCreateNew = (event) => {
    history.push('/create-support/5');
  };

  return (
    <>
      <div className={classes.supportContainer}>
        <div className={classes.header}>
          <div className={classes.addNew}>
            <div onClick={handleCreateNew} className={classes.addNewDiv}>
              <img src={AddIcon} alt='add' />
              <Typography className='new'>New</Typography>
            </div>
          </div>
        </div>
        <SupportCard />
      </div>
    </>
  );
};

export default ParentSupport;
