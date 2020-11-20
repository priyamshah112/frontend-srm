import 'date-fns';
import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import InfiniteScroll from 'react-infinite-scroll-component';

import HomeworkService from './HomeworkService';
import AddIcon from '../../assets/images/Filled Add.svg';
import HomeworkCard from './teacher/HomeworkCard';

const useStyles = makeStyles((theme) => ({
  datePicker: {
    width: '25%',
    paddingRight: '10px',
  },
  sectionContainer: {
    height: '100%',
    width: '100%',
  },

  header: {
    paddingRight: '15px',
    paddingLeft: '15px',
    paddingTop: '10px',
    display: 'inline block',
  },
  cardBoxPadding: {
    padding: '24px',
    [theme.breakpoints.down('sm')]: {
      padding: '16px',
    },
  },
  style:{
    fonTize: "1rem",
        fontFamily: "Avenir Medium",
        fontWeight: "400",
        color: '#1C1C1E',
  },
  addNew: {
    color: theme.palette.common.deluge,
    float: 'right',
    marginTop: '15px',
    marginRight: '15px',
    cursor: 'pointer',
    '& .new': {
      float: 'right',
      fontSize: '14px',
      padding: '5px',
      fontWeight: 500,
    },
    '& img': {
      margin: '5px',
      height: '20px',
      cursor: 'pointer',
    },
  },
  InfiniteScroll: {
    overflow: 'revert !important',
    '& .infinite-scroll-component': {
      overflow: 'revert !important',
    },
  },
  loading: {
    width: '100%',
    textAlign: 'center',
    paddingTop: '8px',
    fontSize: '20px',
  },
}));

const HomeworkSection = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [selectedFromDate, setFromDate] = useState(null);
  const [selectedToDate, setToDate] = useState(null);
  const selectedRole = props.selectedRole;
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [noHomeworkMsg, setNoHomeworkMsg] = useState(false);

  const [homeworks, setHomeworks] = useState([]);

  useEffect(() => {
    let isHomeworkLoading = true;
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('srmToken');
        const selectedRole = props.selectedRole;
        const response = await HomeworkService.fetchHomework(
          { selectedRole, currentPage },
          token
        );
        if (response.status === 200) {
          if (
            response.data.data.current_page === response.data.data.last_page
          ) {
            if (isHomeworkLoading) {
              setHomeworks([...homeworks, ...response.data.data.data]);
              if (response.data.data.data.length === 0) {
                setNoHomeworkMsg(true);
              }
              setHasMore(false);
            }
          } else {
            if (isHomeworkLoading) {
              setHomeworks([...homeworks, ...response.data.data.data]);
              setCurrentPage(currentPage + 1);
            }
          }
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();

    return () => {
      isHomeworkLoading = false;
    };
  }, []);

  const fetchHomeworkOnScroll = async () => {
    try {
      const token = localStorage.getItem('srmToken');
      const selectedRole = props.selectedRole;
      const response = await HomeworkService.fetchHomework(
        { selectedRole, currentPage },
        token
      );
      // console.log('Scroll response', response);
      if (response.status === 200) {
        // console.log('On Scroll', response);
        if (response.data.data.current_page !== response.data.data.last_page) {
          setHomeworks([...homeworks, ...response.data.data.data]);
          setCurrentPage(currentPage + 1);
        } else {
          setHomeworks([...homeworks, ...response.data.data.data]);
          setHasMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFromDateChange = (date) => {
    setFromDate(date);
  };
  const handleToDateChange = (date) => {
    setToDate(date);
  };

  const handleCreateHomework = async () => {
    try {
      const token = localStorage.getItem('srmToken');
      const response = await HomeworkService.createHomework(token);
      // console.log(response);
      history.push(`/create-homework/${response.data.homework_id}`);
    } catch (e) {
      console.log(e);
    }
  };

  let content = homeworks.map((homework, index) => {
    return (
      <HomeworkCard
        key={homework.id}
        homework={homework}
        handleChangeLoader={props.handleChangeLoader}
      />
    );
  });

  return (
    <div className={classes.sectionContainer}>
      <div className={classes.header}>
        <div className={classes.filterForm}>
          {selectedRole === 'teacher' || selectedRole === 'admin' ? (
            <div className={classes.addNew} onClick={handleCreateHomework}>
              <img src={AddIcon} alt='add' />
              <Typography className='new'>New</Typography>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      <br />
      <Box className={classes.cardBoxPadding}>
        <InfiniteScroll
          className={classes.InfiniteScroll}
          dataLength={homeworks.length}
          next={fetchHomeworkOnScroll}
          hasMore={hasMore}
          loader={
            <>
              <div className={classes.loading}>
                {/* <Typography>Loading...</Typography> */}
                <CircularProgress color='primary' size={30} />
              </div>
              <br />
            </>
          }
          scrollableTarget='scrollable'
          scrollThreshold={0.2}>
          {content}
        </InfiniteScroll>
        {noHomeworkMsg ? (
          <Typography
            variant='body1'
            color='primary'
            className={classes.style}
            style={{ textAlign: 'center' }}>
            Click on new button to create homework
          </Typography>
        ) : (
          ''
        )}
        <br />
        <br />
        <br />
      </Box>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedRole: state.auth.selectedRole,
  };
};

export default connect(mapStateToProps)(HomeworkSection);
