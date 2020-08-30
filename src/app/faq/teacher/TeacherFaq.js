import React, { useState } from 'react';
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
  },
  createTitle: {
    fontSize: '20px',
  },
  loading: {
    textAlign: 'center',
    justifyContent: 'center',
    margin: 'auto',
  },
  createButtonIcon: {
    // margin: 'auto',
    padding: '0 0 0 10px',
    transform: 'translateY(5px)',
    cursor: 'pointer',
  },
  cardGridStyle: {
    marginTop: '20px',
  },
}));

const TeacherFaq = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [hasMore, setHasMore] = useState(true);
  const [allFaqs, setFaq] = useState([
    {
      id: 1,
      question: 'What are features of this system?',
      answer: '<p>This system provides .....</p>',
    },
    {
      id: 2,
      question: 'How we can Login?',
      answer: '<p>Using your credentials provided by he school<p>',
    },
    {
      id: 3,
      question: 'How we can see the announcements ',
      answer:
        '<ul><li>On the left sidebar you will see the news and announcement section you can login from that</li></ul>',
    },
    {
      id: 4,
      question: 'How we can see the announcements ',
      answer:
        '<ul><li>On the left sidebar you will see the news and announcement section you can login from that</li></ul>',
    },
    {
      id: 5,
      question: 'How we can see the announcements ',
      answer:
        '<ul><li>On the left sidebar you will see the news and announcement section you can login from that</li></ul>',
    },
    {
      id: 6,
      question: 'How we can see the announcements ',
      answer:
        '<ul><li>On the left sidebar you will see the news and announcement section you can login from that</li></ul>',
    },
  ]);

  const fetchMoreFaqs = () => {
    console.log('Fetch More Task');
  };
  return (
    <>
      <div className={classes.container} id='scrollable'>
        <Container>
          <Typography variant='h6' className={classes.createHeader}>
            <span className={classes.createTitle}>Create FAQ</span>
            <AddCircleIcon
              color='primary'
              className={classes.createButtonIcon}
              onClick={(event) => {
                history.push('/faq/create');
              }}
            />
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
                />
              </Grid>
            ))}
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
