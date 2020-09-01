import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import * as moment from 'moment';
import { dateDiff } from '../../../shared/datediff';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '../../../assets/images/Edit Button.svg';
import {
  Box,
  CardHeader,
  CardMedia,
  CardActions,
  IconButton,
} from '@material-ui/core';
// import testImg from "../../assets/images/home/testImg.png";
import HomeworkService from '../HomeworkService';

const useStyle = makeStyles((theme) => ({
  card: {
    width: '100%',
    margin: 'auto',
    marginTop: '20px',
    borderRadius: '10px',
    boxShadow: 'none',
  },
  reminder: {
    width: '100%',
    textAlign: 'right',
    cursor: 'pointer',
  },
  NewsHeader: {
    padding: '8px 16px 8px 16px !important',
    '& span': {
      cursor: 'pointer',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '8px 16px 8px 16px !important',
      '& span': {
        fontSize: '16px',
      },
    },
  },
  cardContent: {
    padding: '0px 16px 0px 16px',
    overflow: 'auto',
  },
  contentMargin: {
    marginTop: '16px',
  },
  announcementText: {
    fontStyle: 'normal',
    fontSize: '14px',
  },
  announcementImg: {
    justifyContent: 'center',
    textAlign: 'center',
    '& img': {
      maxWidth: '100%',
      border: `1px solid ${theme.palette.common.deluge}`,
      borderRadius: '4px',
    },
  },
  statusText: {
    fontStyle: 'normal',
    textTransform: 'uppercase',
    paddingTop: '10px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '13px',
    },
  },
  cardActionStyle: {
    padding: '8px 16px 8px 16px',
    color: '#6C757D',
  },
  contentCenter: {
    textAlign: 'right',
    height: '50%',

    '& img': {
      marginTop: '25px',
      width: '25px',
      cursor: 'pointer',

      [theme.breakpoints.down('xs')]: {
        marginTop: '10px',
      },
    },
    [theme.breakpoints.down('xs')]: {
      textAlign: 'right',
    },
  },
  createdDate: {
    padding: '5px 0 5px 0',
  },
  editBtnGrid: {
    textAlign: 'right',
  },
  deleteIcon: {
    marginLeft: '10px',
  },
  editBtn: {
    marginLeft: 'auto',
    cursor: 'pointer',
  },
}));

const HomeworkCard = (props) => {
  const classes = useStyle();
  const history = useHistory();
  const statusColors = {
    draft: 'red',
    published: '#7B72AF',
    active: 'green',
  };
  const { id, status, title, main_content, submission_date } = props.homework;

  const handleEditHomework = () => {
    history.push(`/create-homework/${id}`);
  };

  async function deleteHw(id) {
    const token = localStorage.getItem('srmToken');
    try {
      const response = await HomeworkService.deleteHomework(token, id);
      console.log(response);
      if (response.status === 200) {
        console.log('Successfully Deleted');
        props.deleteHomework(id);
      } else {
        console.log('Failed to delete');
      }
    } catch (error) {
      console.log(error);
    }
  }

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
              <>
                <Typography
                  style={{
                    color: statusColors[status],
                  }}
                  className={classes.statusText}
                >
                  {status}
                </Typography>
              </>
            }
            title={
              <span>
                {title ? (
                  <Typography variant='h6'>{title}</Typography>
                ) : (
                  <Typography variant='h6'>N/A</Typography>
                )}
              </span>
            }
          />

          <CardContent className={classes.cardContent}>
            {main_content ? (
              <div dangerouslySetInnerHTML={{ __html: main_content }} />
            ) : (
              <Typography>N/A</Typography>
            )}
          </CardContent>
          <CardActions className={classes.cardActionStyle}>
            <Grid container>
              <Grid item xs={9}>
                <Typography className={classes.createdDate}>
                  {submission_date
                    ? `Due: ${moment(submission_date).format(
                        'DD/MM/YY hh:mm A'
                      )}`
                    : 'Due: N/A'}
                </Typography>
              </Grid>
              <Grid item xs={3} className={classes.editBtnGrid}>
                <Box className={classes.editBtn}>
                  {status !== 'published' ? (
                    <>
                      <img
                        src={EditIcon}
                        alt='Edit Icon'
                        onClick={handleEditHomework}
                      />
                    </>
                  ) : (
                    ''
                  )}
                </Box>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};

export default HomeworkCard;
