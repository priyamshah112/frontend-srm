import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import AdminSupport from './admin/AdminSupport';
import ParentSupport from './parent/ParentSupport';

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
}));
const Support = (props) => {
  const classes = useStyles();
  const selectedRole = props.selectedRole;
  return (
    <div className={classes.container}>
      <ParentSupport />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedRole: state.auth.selectedRole,
  };
};

export default connect(mapStateToProps)(Support);
