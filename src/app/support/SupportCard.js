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
    borderRadius: '10px',
    marginTop: '20px',
  },
  cardHeader: {
    padding: '20px 20px 10px',
  },
  labelText: {
    fontSize: '14px',
    fontStyle: 'normal',
    color: `${theme.palette.common.blackRussian}`,
    opacity: 0.5,
  },

  editBtnDiv: {
    marginLeft: 'auto',
    transform: 'translateY(4px)',
  },
  editBtn: {
    width: '19px',
    height: '19px',
    paddingLeft: '10px',
    transform: 'translateY(4px)',
    cursor: 'pointer',
  },
  normalText: {
    fontSize: '14px',
    fontStyle: 'normal',
    color: `${theme.palette.common.blackRussian}`,
    fontWeight: 500,
    opacity: 1,
  },
  cardContent: {
    padding: '0 20px 20px !important',
  },
  textAlignRight: {
    textAlign: 'right',
  },
}));

const SupportCard = (props) => {
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
      <CardHeader
        action={
          <>
            <Typography className={classes.labelText}>
              10 Jun, 02.05PM
              <img
                src={editIcon}
                className={classes.editBtn}
                onClick={handleEdit}
              />
            </Typography>
          </>
        }
        title={
          <>
            <Typography className={classes.normalText}>
              Ticket ID - 9383829182
            </Typography>
          </>
        }
        onClick={handleComment}
        className={classes.cardHeader}
      />
      <CardContent className={classes.cardContent}>
        {/* {props.children} */}
        <Grid container>
          <Grid item xs={11}>
            <Typography className={classes.labelText}>
              Subject - Parking arrangement problem
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography
              className={`${classes.labelText} ${classes.textAlignRight}`}
            >
              Draft
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
    //   </div>
    // </div>
  );
};

export default SupportCard;
