import React from 'react';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import { CardHeader } from '@material-ui/core';
import * as moment from 'moment';

const useStyle = makeStyles((theme) => ({
  card: {
    width: '100%',
    margin: 'auto',
    marginTop: '20px',
    borderRadius: '10px',
    boxShadow: 'none',
    cursor: 'pointer',
  },
  NewsHeader: {
    padding: '8px 16px 8px 16px !important',
    [theme.breakpoints.down('sm')]: {
      padding: '8px 16px 8px 16px !important',
      '& span': {
        fontSize: '16px',
      },
    },
  },
  dueDate: {
    fontStyle: 'normal',
    textTransform: 'uppercase',
    paddingTop: '10px',
    color: '#AEAEB2',
    [theme.breakpoints.down('xs')]: {
      fontSize: '13px',
    },
  },
  cardContent: {
    padding: '0 16px 0 16px',
    overflow: 'auto',
  },
  title: {
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontSize: '14px',
  },
  homeworkSect: {
    borderBottom: `1px solid #E5E5EA`,
    marginTop: '16px',
    paddingBottom: '16px',
  },
  homeworkText: {
    fontStyle: 'normal',
    fontSize: '14px',
  },
}));
const HomeworkCard = (props) => {
  const classes = useStyle();
  const { id, title, due_date, content } = props;
  return (
    <>
      <Grid
        container
        direction='row'
        justify='center'
        alignContent='center'
        className={classes.cardContainer}
      >
        <Card className={classes.card}>
          <CardHeader
            className={classes.NewsHeader}
            action={
              <Typography className={classes.dueDate}>
                {due_date
                  ? `Due: ${moment(due_date).format('DD/MM/YY hh:mm A')}`
                  : 'Due: N/A'}
              </Typography>
            }
            title={<Typography variant='h6'>{title}</Typography>}
          />
          <CardContent className={classes.cardContent}>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default HomeworkCard;
