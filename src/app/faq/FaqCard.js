import React from 'react';

import { IconButton, makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CreateTwoToneIcon from '@material-ui/icons/CreateTwoTone';
import DeleteIcon from '@material-ui/icons/Delete';

import FaqService from './FaqService';
import { useHistory } from 'react-router-dom';

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
    padding: '0px 16px 0px 16px !important',
    overflow: 'auto',
    [theme.breakpoints.down('sm')]: {
      padding: '0px 16px 0px 16px !important',
    },
  },
}));

const FaqCard = (props) => {
  const classes = useStyles();
  const { id, question, answer, showActions, handleDelete } = props;
  const history = useHistory();

  const deleteFaq = async () => {
    try {
      const token = localStorage.getItem('srmToken');
      const response = await FaqService.deleteFaq(token, id);
      console.log(response);
      if (response.status === 200) {
        // console.log('Successfully Deleted');
        handleDelete(id);
      } else {
        console.log('Error in deleting');
      }
    } catch (error) {
      console.log('Error in deleting: ', error);
    }
  };

  const handleDeleteFaq = () => {
    deleteFaq();
  };

  return (
    <Card className={classes.faqCard}>
      {showActions ? (
        <CardHeader
          className={classes.faqHeader}
          action={
            <>
              <IconButton
                aria-label='settings'
                onClick={(event) => {
                  history.push(`/faq/edit/${id}`);
                }}
              >
                <CreateTwoToneIcon color='primary' />
              </IconButton>
              <IconButton aria-label='settings' onClick={handleDeleteFaq}>
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
