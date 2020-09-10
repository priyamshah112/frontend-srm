import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, Box, Grid, CardContent, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';

const useStyle = makeStyles((theme) => ({
  card: {
    boxShadow: 'none',
    borderBottomLeftRadius: '3px',
    borderBottomRightRadius: '3px',
    minHeight: '100px',
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
    [theme.breakpoints.down('sm')]: {
      textAlign: 'left',
    },
  },
  borderBottom: {
    margin: '0 20px 0 20px',
    borderBottom: '1px solid #707070',
  },
  marginTop30: {
    marginTop: '30px',
  },
  textAreaRoot: {
    width: '100%',
    backgroundColor: '#fff',

    '&::-webkit-scrollbar': {
      width: 0,
    },
  },
  buttonBox: {
    textAlign: 'right',
    marginTop: '30px',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'left',
    },
  },
  commentBtns: {
    width: '100px',
    border: `1px solid ${theme.palette.common.deluge}`,
  },
  cancelBtn: {
    backgroundColor: '#fff',
    marginRight: '10px',
    '&:hover': {
      backgroundColor: '#fff',
    },
  },
}));

const SupportComments = (props) => {
  const classes = useStyle();
  const [comment, setComment] = useState('');

  const handleCancel = (event) => {
    setComment('');
  };

  return (
    <>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Grid container>
            <Grid item sm={9}>
              <Typography className={classes.normalText}>
                Hi Ma’m, We are working on this. We are preparing parking space.
                Also we have safety guard guiding traffic from today onwards.
                Please let us know if this issue is resolved. Your feedback is
                appreciated.
              </Typography>
            </Grid>
            <Grid item sm={3}>
              <Typography
                className={`${classes.labelText} ${classes.textAlignRight}`}
              >
                Manohar Ramarao
              </Typography>
              <Typography
                className={`${classes.labelText} ${classes.textAlignRight}`}
              >
                02 Sep, 2020, 5:45 PM
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <div className={classes.borderBottom}></div>
        <CardContent className={classes.cardContent}>
          <Grid container>
            <Grid item sm={9}>
              <Typography className={classes.normalText}>
                Hi Ma’m, We are working on this. We are preparing parking space.
                Also we have safety guard guiding traffic from today onwards.
                Please let us know if this issue is resolved. Your feedback is
                appreciated.
              </Typography>
            </Grid>
            <Grid item sm={3}>
              <Typography
                className={`${classes.labelText} ${classes.textAlignRight}`}
              >
                Manohar Ramarao
              </Typography>
              <Typography
                className={`${classes.labelText} ${classes.textAlignRight}`}
              >
                02 Sep, 2020, 5:45 PM
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <div className={`${classes.addCommentDiv} ${classes.marginTop30}`}>
        <form>
          <TextField
            id='outlined-multiline-static'
            multiline
            rows={4}
            placeholder='Add comment'
            variant='outlined'
            value={comment}
            onChange={(event) => {
              setComment(event.target.value);
            }}
            classes={{ root: classes.textAreaRoot }}
          />
          <Box className={classes.buttonBox}>
            <Button
              variant='contained'
              className={`${classes.commentBtns} ${classes.cancelBtn}`}
              disableElevation
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              variant='contained'
              color='primary'
              className={classes.commentBtns}
              disableElevation
            >
              Add
            </Button>
          </Box>
        </form>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default SupportComments;
