import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import FaqRichTextEditor from './FaqRichTextEditor';
import {
  Container,
  FormControl,
  Input,
  InputLabel,
  InputAdornment,
  Grid,
  CardHeader,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 0,
    overflowY: 'auto',
  },
  editorCard: {
    marginTop: '20px',
  },
  fieldStyle: {
    width: '100%',
    margin: 'auto',
    '& .MuiInput-underline:before': {
      borderBottom: '2px solid #eaeaea',
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: '2px solid #7B72AF',
      transitionProperty: 'border-bottom-color',
      transitionDuration: '500ms',
      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  inputMargin: {
    marginTop: '20px',
  },
  adornmentColor: {
    color: `${theme.palette.common.adornment}`,
  },
  cardAction: {
    padding: '16px',
  },
  alignLeft: {
    textAlign: 'left',
  },
  alignRight: {
    textAlign: 'right',
  },
}));

const FaqEditor = (props) => {
  const classes = useStyles();
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleDescription = (data) => {
    setAnswer(data);
  };

  return (
    <div className={classes.container}>
      <Container>
        <Card variant='outlined' className={classes.editorCard}>
          <CardHeader title='FAQ Editor' />
          <CardContent>
            <div className={classes.inputMargin}>
              <FormControl className={classes.fieldStyle}>
                <Input
                  id='question'
                  name='question'
                  value={question}
                  onChange={(event) => {
                    setQuestion(event.target.value);
                  }}
                  required={true}
                  startAdornment={
                    <InputAdornment position='start'>
                      <Typography className={classes.adornmentColor}>
                        Question
                      </Typography>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <div className={classes.inputMargin}>
              <FaqRichTextEditor handleDescription={handleDescription} />
            </div>
          </CardContent>
          <CardActions className={classes.cardAction}>
            <Grid container direction='row'>
              <Grid item xs={6} className={classes.alignLeft}>
                <Button
                  color='secondary'
                  variant='contained'
                  disableElevation={true}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={6} className={classes.alignRight}>
                <Button
                  color='primary'
                  variant='contained'
                  disableElevation={true}
                >
                  Publish
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Container>
    </div>
  );
};

export default FaqEditor;
