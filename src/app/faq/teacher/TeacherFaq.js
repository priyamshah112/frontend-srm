import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import {
  makeStyles,
  Grid,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import FaqCard from '../FaqCard';
import FaqService from '../FaqService';
import InfiniteScroll from 'react-infinite-scroll-component';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 0,
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  createHeader: {
    marginTop: '20px',
    textAlign: 'right',
    fontWeight: 500,
  },
  createTitle: {
    fontSize: '16px',
    padding: '0 10px 0 5px',
  },
  loading: {
    textAlign: 'center',
    justifyContent: 'center',
    margin: 'auto',
  },
  createButtonIcon: {
    // margin: 'auto',
    height: '20px',
    transform: 'translateY(5px)',
    cursor: 'pointer',
  },
  cardGridStyle: {
    marginTop: '10px',
  },
  emptyView: {
    width: "100%",
    textAlign: "center",
    paddingTop: "100px",
    fontSize: "20px",
  },
}));

const TeacherFaq = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [hasMore, setHasMore] = useState(true);
  const [allFaqs, setFaq] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchFaqAfterDelete = async () => {
    try {
      const token = localStorage.getItem('srmToken');
      const response = await FaqService.fetchAllFaqs(token);
      setFaq(response.data.data.data);
      
      let next_page_url = response.data.data.next_page_url;
      let last_page_url = response.data.data.last_page_url;
      if (next_page_url === null) {
        setHasMore(false);
      } else {
        setNextUrl(next_page_url);
        setCurrentPage(currentPage + 1);
        setHasMore(true);
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  useEffect(() => {
    let isLoading = true;
    const fetchFaq = async () => {
      try {
        const token = localStorage.getItem('srmToken');
        const response = await FaqService.fetchAllFaqs(token);
        setLoading(false)
        if (isLoading) {
          setFaq(response.data.data.data);
          let next_page_url = response.data.data.next_page_url;
          let last_page_url = response.data.data.last_page_url;
          console.log(response);
          if (next_page_url === null) {
            setHasMore(false);
          } else {
            setNextUrl(next_page_url);
            setCurrentPage(currentPage + 1);
            setHasMore(true);
          }
        }
      } catch (error) {
        console.log('Error: ', error);
        setLoading(false)
      }
    };
    fetchFaq();
    return () => {
      isLoading = false;
    };
  }, []);

  const handleDelete = (id) => {
    fetchFaqAfterDelete();
  };

  const fetchMoreFaqs = async () => {
    try {
      const token = localStorage.getItem('srmToken');
      const response = await FaqService.fetchMoreFaqs(token, nextUrl);
      setFaq([...allFaqs, ...response.data.data.data]);
      let next_page_url = response.data.data.next_page_url;
      if (next_page_url === null) {
        setHasMore(false);
      } else {
        setNextUrl(next_page_url);
        setCurrentPage(currentPage + 1);

        setHasMore(true);
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  };
  return (
    <>
      <div className={classes.container} id='scrollable'>
        <Container>
          <Typography className={classes.createHeader} color='primary'>
            <AddCircleIcon
              color='primary'
              className={classes.createButtonIcon}
              onClick={(event) => {
                history.push('/faq/create');
              }}
            />
            <span
              className={classes.createTitle}
              onClick={(event) => {
                history.push('/faq/create');
              }}
            >
              New
            </span>
          </Typography>
          <InfiniteScroll
            dataLength={allFaqs.length}
            next={fetchMoreFaqs}
            hasMore={hasMore}
            loader={
              <>
                <br />
                <div className={classes.loading}>
                  <CircularProgress />
                </div>
                <br />
              </>
            }
            scrollableTarget='scrollable'
            scrollThreshold={0.5}
          >
            {allFaqs.map((faq) => (
              <Grid key={faq.id} className={classes.cardGridStyle}>
                <FaqCard
                  id={faq.id}
                  question={faq.question}
                  answer={faq.answer}
                  showActions={true}
                  handleDelete={handleDelete}
                />
              </Grid>
            ))}
            {!loading && !allFaqs.length ? (
            <div className={classes.emptyView}>
              <Typography>Don't have any FAQ.</Typography>
            </div>
          ) : null}
          </InfiniteScroll>
        </Container>
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </>
  );
};

export default TeacherFaq;
