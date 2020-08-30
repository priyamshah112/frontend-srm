import React, { useState } from 'react';

import Container from '@material-ui/core/Container';

import { makeStyles, Grid, Typography } from '@material-ui/core';

import FaqCard from '../FaqCard';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 0,
    overflowY: 'auto',
  },
  createHeader: {
    marginTop: '20px',
  },
  createTitle: {
    fontSize: '20px',
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

const StudentFaq = (props) => {
  const classes = useStyles();
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
  ]);

  return (
    <>
      <div className={classes.container}>
        <Container>
          <Typography variant='h6' className={classes.createHeader}>
            <span className={classes.createTitle}>FAQS</span>
          </Typography>
          {allFaqs.map((faq) => (
            <Grid key={faq.id} className={classes.cardGridStyle}>
              <FaqCard
                id={faq.id}
                question={faq.question}
                answer={faq.answer}
                showActions={false}
              />
            </Grid>
          ))}
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

export default StudentFaq;
