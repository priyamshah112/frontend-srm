import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {
  Container,
  FormControl,
  Input,
  InputLabel,
  InputAdornment,
  Grid,
  CardHeader,
} from '@material-ui/core';

import RichTextEditor from '../../../shared/richTextEditor';

import FaqService from '../FaqService';
import { connect } from 'react-redux';
import { useParams, useLocation, useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 0,
    overflow: 'auto',
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
  const [isEditPage, setIsEditPage] = useState(false);
  const params = useParams();
  const history = useHistory();
  const location = useLocation();

  const fetchFaq = async (id) => {
    try {
      const token = localStorage.getItem('srmToken');
      const response = await FaqService.fetchFaq(token, id);
      console.log(response);
      if (response.status === 200) {
        console.log('success');
        setQuestion(response.data.data.question);
        setAnswer(response.data.data.answer);
      } else {
        console.log('Failed to post faq');
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  useEffect(() => {
    let isLoading = true;
    if (location.pathname === `/faq/edit/${params.id}`) {
      setIsEditPage(true);
      console.log('here', params.id);
      if (isLoading) {
        fetchFaq(params.id);
      }
    }
    return () => {
      isLoading = false;
    };
  }, [params.id]);

  const handlePublish = () => {
    const publishFaq = async () => {
      try {
        const token = localStorage.getItem('srmToken');
        const response = await FaqService.postFaq(token, {
          question: question,
          answer: answer,
        });
        console.log(response);
        if (response.status === 200) {
          console.log('success');
        } else {
          console.log('Failed to post faq');
        }
      } catch (error) {
        console.log('Error: ', error);
      }
      history.push('/faq');
    };

    const updateFaq = async (id) => {
      try {
        const token = localStorage.getItem('srmToken');
        const response = await FaqService.updateFaq(token, id, {
          question: question,
          answer: answer,
        });
        if (response.status === 200) {
          console.log('success', response);
        } else {
          console.log('Failed to post faq');
        }
      } catch (error) {
        console.log('Error: ', error);
      }
      history.push('/faq');
    };

    if (isEditPage) {
      updateFaq(params.id);
    } else {
      publishFaq();
    }
  };

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
              <Typography variant='h6'>Answer</Typography>
              <RichTextEditor
                handleDescription={handleDescription}
                value={answer}
                token={props.token}
              />
            </div>
          </CardContent>
          <CardActions className={classes.cardAction}>
            <Grid container direction='row'>
              <Grid item xs={6} className={classes.alignLeft}>
                <Button
                  color='secondary'
                  variant='contained'
                  disableElevation={true}
                  onClick={(event) => {
                    history.push('/faq');
                  }}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={6} className={classes.alignRight}>
                <Button
                  color='primary'
                  variant='contained'
                  disableElevation={true}
                  onClick={handlePublish}
                >
                  Publish
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Container>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedRole: state.auth.selectedRole,
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(FaqEditor);
