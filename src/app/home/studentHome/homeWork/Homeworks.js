import React, { useState, useEffect } from 'react';
import HomeworkCard from './HomeworkCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import { makeStyles } from '@material-ui/styles';
import { CircularProgress } from '@material-ui/core';
import HomeSerivce from '../../HomeSerivce';

const useStyles = makeStyles((theme) => ({
  loading: {
    width: '100%',
    textAlign: 'center',
    paddingTop: '8px',
    fontSize: '20px',
  },
}));

const Homework = (props) => {
  const classes = useStyles();
  const [hasMore, setHasMore] = useState(true);
  const [homework, setHomework] = useState([]);

  const [nextUrl, setNextUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // console.log('Task Content');
    let isAnnouncementLoading = true;
    const fetchHomework = async () => {
      try {
        const token = localStorage.getItem('srmToken');
        const response = await HomeSerivce.fetchHomework(token);
        if (isAnnouncementLoading) {
          setHomework(response.data.data.data);
          let next_page_url = response.data.data.next_page_url;
          if (next_page_url === null) {
            setHasMore(false);
          } else {
            setHasMore(true);
          }
          setIsLoading(false);

          setNextUrl(response.data.data.next_page_url);
          console.log(response.data);
        }
      } catch (error) {
        console.log('Error: ', error);
      }
    };
    fetchHomework();
    return () => {
      isAnnouncementLoading = false;
    };
  }, []);

  const fetchHomeworkOnScroll = () => {
    console.log('Fetch More HW');
    const fetchMoreHomework = async () => {
      const token = localStorage.getItem('srmToken');
      const response = await HomeSerivce.fetchMoreHomework(token, nextUrl);
      setHomework([...homework, ...response.data.data.data]);
      // setIsLoading(false);
      let next_page_url = response.data.data.next_page_url;
      if (next_page_url === null) {
        setHasMore(false);
      }
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
            {/* <Typography>Loading...</Typography> */}
            <CircularProgress color='primary' size={30} />
          </div>
          <br />
        </>
      }
      scrollableTarget='scrollable'
      scrollThreshold={0.2}
    >
      {homework.map((hw) => (
        <HomeworkCard
          key={hw.id}
          id={hw.id}
          title={hw.title}
          due_date={hw.submission_date}
          content={hw.main_content}
        />
      ))}
    </InfiniteScroll>
  );
};

export default Homework;
