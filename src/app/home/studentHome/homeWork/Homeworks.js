import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import HomeworkCard from './HomeworkCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import { makeStyles } from '@material-ui/styles';
import { CircularProgress, Typography } from '@material-ui/core';
import HomeSerivce from '../../HomeSerivce';

const useStyles = makeStyles((theme) => ({
  loading: {
    width: '100%',
    textAlign: 'center',
    paddingTop: '8px',
    fontSize: '20px',
  },
  emptyView: {
    width: '100%',
    textAlign: 'center',
    paddingTop: '100px',
    fontSize: '20px',
  },
}));

const Homework = (props) => {
  const classes = useStyles();
  const [hasMore, setHasMore] = useState(true);
  const [homework, setHomework] = useState([]);

  const [nextUrl, setNextUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const selectedRole = props.selectedRole;

  useEffect(() => {
    // console.log('Task Content');
    let isHomeworkLoading = true;
    const fetchHomework = async () => {
      try {
        const token = localStorage.getItem('srmToken');
        const response = await HomeSerivce.fetchHomework(
          token,
          props.selectedRole
        );
        if (isHomeworkLoading) {
          console.log(response.data.data.data);
          setHomework(response.data.data.data);
          let next_page_url = response.data.data.next_page_url;
          if (next_page_url === null) {
            setHasMore(false);
          } else {
            setNextUrl(response.data.data.next_page_url);
          }
          setIsLoading(false);

          console.log(response.data);
        }
      } catch (error) {
        console.log('Error: ', error);
      }
    };
    fetchHomework();
    return () => {
      isHomeworkLoading = false;
    };
  }, []);

  const fetchHomeworkOnScroll = () => {
    const fetchMoreHomework = async () => {
      const token = localStorage.getItem('srmToken');
      if (hasMore) {
        const response = await HomeSerivce.fetchMoreHomework(
          token,
          nextUrl,
          props.selectedRole
        );
        console.log('Fetch More', response.data.data.data);
        setHomework([...homework, ...response.data.data.data]);
        let last_page_url = response.data.data.last_page_url;
        if (nextUrl === last_page_url) {
          setHasMore(false);
        } else {
          setHasMore(true);
          setNextUrl(response.data.data.next_page_url);
        }
      }
      // setIsLoading(false);
    };
    fetchMoreHomework();
  };

  return (
    <InfiniteScroll
      dataLength={homework.length}
      next={fetchHomeworkOnScroll}
      hasMore={hasMore}
      loader={
        <>
          <div className={classes.loading}>
            <CircularProgress color='primary' size={30} />
          </div>
          <br />
        </>
      }
      scrollableTarget='scrollable'
      scrollThreshold={0.2}>
      {homework.map((hw, index) => (
        <HomeworkCard
          key={index}
          id={hw.id}
          title={hw.title}
          due_date={hw.submission_date}
          content={hw.main_content}
        />
      ))}
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress color='primary' size={30} />
        </div>
      ) : null}
      {!isLoading && !homework.length ? (
        <div className={classes.emptyView}>
          <Typography>You don't have homework.</Typography>
        </div>
      ) : null}
    </InfiniteScroll>
  );
};
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    selectedRole: state.auth.selectedRole,
  };
};
export default connect(mapStateToProps)(Homework);
