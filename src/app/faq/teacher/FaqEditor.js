import React, { useState, useEffect } from 'react';
import BackIcon from '../../../assets/images/Back.svg';

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
  TextField,
  Box,
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
  padding: {
   padding:'15px'
  },
  editorCard: {
    marginTop: '20px',
  },
  cardContentRoot:{
    padding:'20px'
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

  backImg: {
    float: 'left',
    transform: 'translate(0px, 7px)',
    cursor: 'pointer',
  },
  themeColor: {
    color: `${theme.palette.common.deluge}`,
    padding: 0,
    margin: 0,
  },
  titleText: {
    textAlign: 'center',
    margin: 'auto',
  },
  inputMargin: {
    marginTop: '20px',
  },
  textAlignLeft: {
    color: 'rgba(0, 0, 0, 0.54)',
  },

  sideMargins: {
    marginLeft: '20px',
    marginRight: '20px',
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
  Cardtitle: {
    textAlign: 'center',
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
      <Container classes={{root:classes.padding}}>
        <Card variant='outlined' className={classes.editorCard}>
          <Box className={`${classes.margin} ${classes.sideMargins}`} pt={4}>
            <div>
              <img
                src={BackIcon}
                alt='Back'
                className={classes.backImg}
                onClick={(event) => {
                  history.replace('/faq');
                }}
              />
              <Typography
                variant='h5'
                className={`${classes.themeColor} ${classes.titleText}`}
              >
                Create FAQ
              </Typography>
            </div>
          </Box>
          <CardContent classes={{root:classes.cardContentRoot}}>
            <div className={classes.inputMargin}>
              <FormControl className={classes.fieldStyle}>
                <TextField
                  id='question'
                  name='question'
                  label='Question'
                  value={question}
                  onChange={(event) => {
                    setQuestion(event.target.value);
                  }}
                  required={true}
                />
              </FormControl>
            </div>
            <div className={classes.inputMargin}>
              <Typography className={classes.textAlignLeft}>Answer</Typography>
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
                {/* <Button
                  color='primary'
                  variant='outlined'
                  disableElevation={true}
                  onClick={(event) => {
                    history.replace('/faq');
                  }}
                >
                  Cancel
                </Button> */}
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
