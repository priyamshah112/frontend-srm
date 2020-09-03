import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Typography,
  Box,
  Grid,
  CardContent,
  CardActions,
} from '@material-ui/core';
import Card from '@material-ui/core/Card';

import taskBookIcon from '../../assets/images/home/teacher/TaskBook.svg';
import userIcon from '../../assets/images/profile/User.svg';
import phoneIcon from '../../assets/images/profile/Phone number.svg';
import emailIcon from '../../assets/images/profile/Email.svg';
import locationIcon from '../../assets/images/profile/location.svg';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import * as moment from 'moment';
import { useHistory } from 'react-router-dom';
import { closestIndexTo } from 'date-fns/fp';
import editIcon from '../../assets/images/Edit Button.svg';

const useStyle = makeStyles((theme) => ({
  header: {
    display: 'flex',
  },
  profileTitle: {
    display: 'inline',
    marginLeft: '10px',
    fontWeight: 600,
    fontSize: '19px',
  },
  editBtn: {
    marginLeft: 'auto',
    height: '22px',
    transform: 'translateY(2px)',
  },
  iconStyle: {
    transform: 'translateY(3px)',
  },
}));

const ProfileCard = (props) => {
  const classes = useStyle();
  return (
    <>
      <div className={classes.header}>
        <div className={classes.cardHeader}>
          <img src={taskBookIcon} className={classes.iconStyle} />
          <Typography className={classes.profileTitle}>
            {props.title}
          </Typography>
        </div>
        <div className={classes.editBtn}>
          <img src={editIcon} className={classes.editBtn} />
        </div>
      </div>
      <div className={classes.homeworks}>
        <Card>
          <CardContent>{props.children}</CardContent>
        </Card>
      </div>
    </>
  );
};

export default ProfileCard;
