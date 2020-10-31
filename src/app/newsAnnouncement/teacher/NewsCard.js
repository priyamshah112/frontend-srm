import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import * as moment from 'moment';
import { dateDiff } from '../../../shared/datediff';

import EditIcon from '../../../assets/images/Edit.svg';
import { Box, CardHeader, CardMedia, CardActions } from '@material-ui/core';
// import testImg from "../../assets/images/home/testImg.png";

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
      '&:hover': {
        textDecoration: 'underline',
      },
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
  },
  contentMargin: {
    marginTop: '16px',
  },
  announcementText: {
    fontStyle: 'normal',
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
    color: `${theme.palette.common.lightFont}`,
    textTransform: 'uppercase',
    paddingTop: '10px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '13px',
    },
  },
  cardActionStyle: {
    padding: '8px 16px 8px 16px',
    color: `${theme.palette.common.lightFont}`,
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
  editBtn: {
    marginLeft: 'auto',
    paddingRight: '5px',
    paddingTop: '5px',
    cursor: 'pointer',
  },
  cardTitle: {},
  announcementImg: {
    justifyContent: 'center',
    textAlign: 'center',
    paddingBottom: '10px',
    margin: '0',
    '& img': {
      maxWidth: '100%',
      border: `1px solid ${theme.palette.common.deluge}`,
      borderRadius: '4px',
    },
  },
}));

const NewsCard = (props) => {
  const classes = useStyle();
  const history = useHistory();
  const statusColors = {
    draft: 'red',
    published: '#7B72AF',
    active: 'green',
  };
  const {
    id,
    status,
    title,
    summary,
    media_url,
    created_at,
  } = props.announcement;

  const handleEditAnnouncement = () => {
    history.push(`/create-announcement/${id}`);
  };
  return (
    <>
      <Grid
        container
        direction='row'
        justify='center'
        alignContent='center'
        className={classes.cardContainer}>
        <Card className={classes.card}>
          <CardHeader
            className={classes.NewsHeader}
            action={
              <>
                {props.createdBy ? (
                  <Typography className={classes.statusText} variant='body2'>
                    {status}
                  </Typography>
                ) : (
                  ''
                )}
              </>
            }
            title={
              <span
                onClick={(event) => {
                  history.push(`/news/${id}`);
                }}>
                {title ? (
                  <Typography variant='body1' className={classes.cardTitle}>
                    {title}
                  </Typography>
                ) : (
                  <Typography variant='body1' className={classes.cardTitle}>
                    N/A
                  </Typography>
                )}
              </span>
            }
          />

          {/* {media_url ? <img src={media_url} /> : ""} */}

          <CardContent className={classes.cardContent}>
            {media_url && (
              <Grid
                container
                direction='row'
                className={`${classes.announcementImg} ${classes.contentMargin}`}>
                <img src={media_url} alt='Announcement'></img>
              </Grid>
            )}
            {summary ? (
              <Typography variant='body2'>{summary}</Typography>
            ) : (
              <Typography variant='body2'>N/A</Typography>
            )}
          </CardContent>
          <CardActions className={classes.cardActionStyle}>
            <Grid container>
              <Grid item xs={9}>
                <Typography
                  className={classes.createdDate}
                  variant='body2'>{`Created at: ${moment(created_at).format(
                  'DD MMM YYYY'
                )}`}</Typography>
              </Grid>
              <Grid item xs={3} className={classes.editBtnGrid}>
                <Box className={classes.editBtn}>
                  {status !== 'published' ? (
                    <img
                      src={EditIcon}
                      alt='Edit Icon'
                      onClick={handleEditAnnouncement}
                    />
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

export default NewsCard;
