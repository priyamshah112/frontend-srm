import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Typography,
  Box,
  Grid,
  CardContent,
  CardActions,
  CardHeader,
} from '@material-ui/core';
import Card from '@material-ui/core/Card';

import userIcon from '../../assets/images/profile/User.svg';
import phoneIcon from '../../assets/images/profile/Phone number.svg';
import emailIcon from '../../assets/images/profile/Email.svg';
import locationIcon from '../../assets/images/profile/location.svg';
import editIcon from '../../assets/images/Edit.svg';
import { useHistory } from 'react-router-dom';

const useStyle = makeStyles((theme) => ({
  card: {
    boxShadow: 'none',
    borderBottomLeftRadius: '3px',
    borderBottomRightRadius: '3px',
    minHeight: '50px',
  },
  labelText: {
    fontSize: '14px',
    fontStyle: 'normal',
    color: `${theme.palette.common.blackRussian}`,
    opacity: 0.5,
  },
  normalText: {
    fontSize: '14px',
    fontStyle: 'normal',
    color: `${theme.palette.common.blackRussian}`,
    opacity: 1,
  },
  cardContent: {
    padding: '20px !important',
  },
  textAlignRight: {
    textAlign: 'right',
  },
  borderBottom: {
    margin: '0 20px 0 20px',
    borderBottom: '1px solid #707070',
  },
}));

const SupportHistory = (props) => {
  const classes = useStyle();
  const history = useHistory();

  const handleEdit = (event) => {
    history.push('/create-support/5');
  };

  const handleComment = (event) => {
    history.push('/support/5');
  };

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Grid container>
          <Grid item sm={8}>
            <Typography className={classes.labelText}>
              Prathyusha Atmakur
            </Typography>
            <Typography className={classes.normalText}>
              Ticket created
            </Typography>
          </Grid>
          <Grid item sm={4}>
            <Typography
              className={`${classes.labelText} ${classes.textAlignRight}`}
            >
              02 Sep, 2020, 2:05PM
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <div className={classes.borderBottom}></div>
      <CardContent className={classes.cardContent}>
        <Grid container>
          <Grid item sm={8}>
            <Typography className={classes.labelText}>
              Manohar Ramarao{' '}
            </Typography>
            <Typography className={classes.normalText}>
              Comment added
            </Typography>
          </Grid>
          <Grid item sm={4}>
            <Typography
              className={`${classes.labelText} ${classes.textAlignRight}`}
            >
              02 Sep, 2020, 3:05PM
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SupportHistory;
