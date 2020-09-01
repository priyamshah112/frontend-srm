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

import AnnouncementService from './AnnouncementService';
import AddIcon from '../../assets/images/Add.svg';
import AnnouncementCard from '../home/studentHome/AnnouncementCard';
import NewsCard from './teacher/NewsCard';

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
    textAlign: 'right',
  },
  cardBoxPadding: {
    padding: '0px 24px 24px 24px',
    [theme.breakpoints.down('sm')]: {
      padding: '16px',
    },
  },
  addNew: {
    color: theme.palette.common.deluge,

    marginTop: '15px',
    marginRight: '15px',
    cursor: 'pointer',
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
  loading: {
    width: '100%',
    textAlign: 'center',
    paddingTop: '8px',
    fontSize: '20px',
  },
}));

const AnnouncementSection = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [selectedFromDate, setFromDate] = useState(null);
  const [selectedToDate, setToDate] = useState(null);
  const selectedRole = props.selectedRole;
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const [announcements, setAnnouncements] = useState([]);

  // const [isAnnouncementLoading, setIsAnnouncementLoading] = useState(true);
  useEffect(() => {
    let isAnnouncementLoading = true;
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('srmToken');
        const selectedRole = props.selectedRole;
        const createdBy = props.createdBy;
        let params = {};
        if (createdBy) {
          params = { selectedRole, currentPage, createdBy };
        } else {
          params = { selectedRole, currentPage };
        }

        const response = await AnnouncementService.fetchAnnouncements(
          params,
          token
        );

        if (response.status === 200) {
          if (
            response.data.data.current_page === response.data.data.last_page
          ) {
            if (isAnnouncementLoading) {
              setAnnouncements([...announcements, ...response.data.data.data]);
              setHasMore(false);
            }
          } else {
            if (isAnnouncementLoading) {
              setAnnouncements([...announcements, ...response.data.data.data]);
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
      isAnnouncementLoading = false;
    };
  }, []);

  const fetchAnnouncementOnScroll = async () => {
    try {
      const token = localStorage.getItem('srmToken');
      const selectedRole = props.selectedRole;
      const createdBy = props.createdBy;
      let params = {};
      if (createdBy) {
        params = { selectedRole, currentPage, createdBy };
      } else {
        params = { selectedRole, currentPage };
      }

      const response = await AnnouncementService.fetchAnnouncements(
        params,
        token
      );

      if (response.status === 200) {
        // console.log(response);
        if (response.data.data.current_page !== response.data.data.last_page) {
          setAnnouncements([...announcements, ...response.data.data.data]);
          setCurrentPage(currentPage + 1);
        } else {
          setAnnouncements([...announcements, ...response.data.data.data]);
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
  const handleCreateAnnouncement = async () => {
    try {
      const token = localStorage.getItem('srmToken');
      const response = await AnnouncementService.createAnnouncement(token);
      // console.log(response);
      history.push(`/create-announcement/${response.data.news_id}`);
      // history.push(`/create-announcement/${65}`);
    } catch (e) {
      console.log(e);
    }
  };

  let content = announcements.map((announcement, index) => {
    return (
      <NewsCard
        key={announcement.id}
        createdBy={props.createdBy}
        announcement={announcement}
      />
    );
  });
  return (
    <div className={classes.sectionContainer}>
      {props.createdBy ? (
        <div className={classes.header}>
          {selectedRole === 'teacher' || selectedRole === 'admin' ? (
            <div className={classes.addNew} onClick={handleCreateAnnouncement}>
              <img src={AddIcon} alt='add' />
              <Typography className='new'>New</Typography>
            </div>
          ) : (
            ''
          )}
        </div>
      ) : (
        ''
      )}
      <Box className={classes.cardBoxPadding}>
        <InfiniteScroll
          dataLength={announcements.length}
          next={fetchAnnouncementOnScroll}
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
          scrollThreshold={0.2}
        >
          {content}
        </InfiniteScroll>
      </Box>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedRole: state.auth.selectedRole,
  };
};

export default connect(mapStateToProps)(AnnouncementSection);
