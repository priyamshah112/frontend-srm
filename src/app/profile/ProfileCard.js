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

import userIcon from '../../assets/images/profile/User.svg';
import phoneIcon from '../../assets/images/profile/Phone number.svg';
import emailIcon from '../../assets/images/profile/Email.svg';
import locationIcon from '../../assets/images/profile/location.svg';
import editIcon from '../../assets/images/Edit.svg';

const useStyle = makeStyles((theme) => ({
  profileDiv: {
    marginTop: '32px',
  },
  header: {
    display: 'flex',
  },
  cardHeader: {
    marginLeft: '4px',
  },
  profileTitle: {
    display: 'inline',
    marginLeft: '5px',
    fontWeight: 600,
    textTransform: 'uppercase',
  },
  editBtnDiv: {
    marginLeft: 'auto',
    marginRight: '10px',
    transform: 'translateY(2px)',
  },
  editBtn: {
    width: '19px',
    height: '19px',
    transform: 'translateY(2px)',
    cursor: 'pointer',
  },
  iconStyle: {
    width: '19px',
    height: '19px',
    transform: 'translateY(4px)',
  },
  profile: {
    marginTop: '12px',
  },
  card: {
    boxShadow: 'none',
    borderRadius: '10px',
  },
  cardContent: {
    padding: '20px !important',
  },
}));

const ProfileCard = (props) => {
  const classes = useStyle();
  const title = props.title;
  const titleIcon = {
    Phone: phoneIcon,
    'Contact Details': phoneIcon,
    Email: emailIcon,
    Address: locationIcon,
    Children: userIcon,
    Parents: userIcon,
    'Associated Accounts': userIcon,
  };
  return (
    <div className={classes.profileDiv}>
      <div className={classes.header}>
        <div className={classes.cardHeader}>
          <img src={titleIcon[title]} className={classes.iconStyle} />
          <Typography className={classes.profileTitle}>{title}</Typography>
        </div>
        <div className={classes.editBtnDiv}>
          <img src={editIcon} className={classes.editBtn} />
        </div>
      </div>
      <div className={classes.profile}>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            {props.children}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileCard;
