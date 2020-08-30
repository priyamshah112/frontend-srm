import React from 'react';

import { IconButton, makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CreateTwoToneIcon from '@material-ui/icons/CreateTwoTone';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  faqCard: {
    boxShadow: 'none',
    borderRadius: '10px',
  },
  faqHeader: {
    [theme.breakpoints.down('sm')]: {
      padding: '8px 16px 8px 16px !important',
      '& span': {
        fontSize: '16px',
      },
    },
  },
  cardContentStyle: {
    [theme.breakpoints.down('sm')]: {
      padding: '8px 16px 8px 16px !important',
    },
  },
}));

const FaqCard = (props) => {
  const classes = useStyles();
  const { id, question, answer, showActions } = props;

  return (
    <Card className={classes.faqCard}>
      {showActions ? (
        <CardHeader
          className={classes.faqHeader}
          action={
            <>
              <IconButton aria-label='settings'>
                <CreateTwoToneIcon color='primary' />
              </IconButton>
              <IconButton aria-label='settings'>
                <DeleteIcon color='secondary' />
              </IconButton>
            </>
          }
          title={question}
        />
      ) : (
        <CardHeader title={question} />
      )}
      <CardContent className={classes.cardContentStyle}>
        <div dangerouslySetInnerHTML={{ __html: answer }} />
      </CardContent>
    </Card>
  );
};

export default FaqCard;
