import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import * as moment from 'moment';
import { dateDiff } from '../../../shared/datediff';
import EditIcon from '../../../assets/images/Edit Button.svg';
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
  editBtn: {
    marginLeft: 'auto',
    cursor: 'pointer',
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
    main_content,
    submission_date,
  } = props.announcement;
  const handleEditAnnouncement = () => {
    history.push(`/create-homework/${id}`);
  };
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
              <Typography>
                <div dangerouslySetInnerHTML={{ __html: main_content }} />
              </Typography>
            ) : (
              <Typography>N/A</Typography>
            )}
          </CardContent>
          <CardActions className={classes.cardActionStyle}>
            <Grid container>
              <Grid item xs={6}>
                <Typography
                  className={classes.createdDate}
                >{`Submission Date: ${moment(submission_date).format(
                  'DD MMM YY'
                )}`}</Typography>
              </Grid>
              <Grid item xs={6} className={classes.editBtnGrid}>
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
          {/* <CardContent className={classes.cardContent}>
            <Grid container direction="row">
              <Grid item xs={10} className={classes.content}>
                {title ? (
                  <Grid container direction="row">
                    <Typography variant="h6" className={classes.title}>
                      {title}
                    </Typography>
                  </Grid>
                ) : (
                  <Typography variant="h6" className={classes.title}>
                    N/A
                  </Typography>
                )}
                {media_url ? (
                  <Grid
                    container
                    direction="row"
                    className={classes.announcementImg}
                  >
                    <img src={media_url} alt="Announcement"></img>
                  </Grid>
                ) : (
                  ""
                )}
                {summary ? (
                  <Grid container direction="row">
                    <Typography className={classes.announcementText}>
                      {summary}
                    </Typography>
                  </Grid>
                ) : (
                  <Typography className={classes.announcementText}>
                    N/A
                  </Typography>
                )}
                <Typography>{`Created at: ${moment(submission_date).format(
                  "DD MMM YY"
                )}`}</Typography>
              </Grid>
              <Grid item xs={2} className={classes.actions}>
                <Box className={classes.contentCenter}>
                  <Typography
                    style={{
                      color: statusColors[status],
                    }}
                    className={classes.statusText}
                  >
                    {status}
                  </Typography>
                </Box>
                <Box className={classes.contentCenter}>
                  {status !== "published" ? (
                    <img
                      src={EditIcon}
                      alt="Edit Icon"
                      onClick={handleEditAnnouncement}
                    />
                  ) : (
                    ""
                  )}
                </Box>
              </Grid>
            </Grid>
          </CardContent> */}
        </Card>
      </Grid>
    </>
  );
};

export default NewsCard;
