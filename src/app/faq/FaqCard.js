import React from 'react';

import { Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CreateTwoToneIcon from '@material-ui/icons/CreateTwoTone';
import DeleteIcon from '@material-ui/icons/DeleteOutline';

import FaqService from './FaqService';
import { useHistory } from 'react-router-dom';
import EditIcon from '../../assets/images/Edit.svg';

const useStyles = makeStyles((theme) => ({
  faqCard: {
    boxShadow: 'none',
    borderRadius: '10px',
  },
  faqHeader: {
    [theme.breakpoints.down('sm')]: {
      padding: '8px 16px 8px 16px !important',
      '& span': {
        fontSize: '16px',
      },
    },
  },
  cardContentStyle: {
    padding: '0px 16px 0px 16px !important',
    overflow: 'auto',
    [theme.breakpoints.down('sm')]: {
      padding: '0px 16px 0px 16px !important',
    },
  },
  card: {
    width: '100%',
    margin: 'auto',
    marginTop: '20px',
    borderRadius: 0,
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
    overflow: 'auto',
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
  deleteIcon: {
    transform: 'translateY(-3px)',
  },
  editBtn: {
    marginLeft: 'auto',
    cursor: 'pointer',
  },
  cardHeader: {
    padding: '20px 20px 10px',
  },
  labelText: {
    fontSize: '18px',
    fontStyle: 'normal',
    color: '#8E8E93',
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
    padding: '20px 20px 12px !important',
  },
  highlightedText: {
    fontWeight: 500,
    fontSize: '18px',
  },
  textAlignRight: {
    textAlign: 'right',
  },
  imgGrid: {
    position: 'relative',
  },
  imgDiv: {
    bottom: 0,
    right: 0,
    position: 'absolute',
    margin: '16px 0',
  },
}));

const FaqCard = (props) => {
  const classes = useStyles();
  const { id, question, answer, showActions, handleDelete } = props;
  const history = useHistory();

  const deleteFaq = async () => {
    try {
      const token = localStorage.getItem('srmToken');
      const response = await FaqService.deleteFaq(token, id);
      console.log(response);
      if (response.status === 200) {
        // console.log('Successfully Deleted');
        handleDelete(id);
      } else {
        console.log('Error in deleting');
      }
    } catch (error) {
      console.log('Error in deleting: ', error);
    }
  };

  const handleDeleteFaq = () => {
    deleteFaq();
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
          <CardContent className={classes.cardContent}>
            <Grid container>
              <Grid item xs={12}>
                <span>
                  {question ? (
                    <Typography className={classes.highlightedText}>
                      {question}
                    </Typography>
                  ) : (
                    <Typography className={classes.highlightedText}>
                      N/A
                    </Typography>
                  )}
                </span>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={10}>
                <Typography className={classes.labelText}>
                  {answer ? (
                    <div dangerouslySetInnerHTML={{ __html: answer }} />
                  ) : (
                    <Typography style={{ margin: '16px 0' }}>N/A</Typography>
                  )}
                </Typography>
              </Grid>
              <Grid item xs={2} className={classes.imgGrid}>
                {showActions ? (
                  <div
                    className={`${classes.imgDiv} ${classes.textAlignRight}`}
                  >
                    <img
                      src={EditIcon}
                      className={classes.editBtn}
                      onClick={(event) => {
                        history.push(`/faq/edit/${id}`);
                      }}
                    />
                    <IconButton
                      aria-label='settings'
                      onClick={handleDeleteFaq}
                      className={classes.deleteIcon}
                    >
                      <DeleteIcon color='primary' />
                    </IconButton>
                  </div>
                ) : (
                  ''
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </>

    // <Card className={classes.faqCard}>
    //   {showActions ? (
    //     <CardHeader
    //       className={classes.faqHeader}
    //       action={
    //         <>
    //           <IconButton
    //             aria-label='settings'
    //             onClick={(event) => {
    //               history.push(`/faq/edit/${id}`);
    //             }}
    //           >
    //             <CreateTwoToneIcon color='primary' />
    //           </IconButton>
    //           <IconButton aria-label='settings' onClick={handleDeleteFaq}>
    //             <DeleteIcon color='secondary' />
    //           </IconButton>
    //         </>
    //       }
    //       title={question}
    //     />
    //   ) : (
    //     <CardHeader title={question} />
    //   )}
    //   <CardContent className={classes.cardContentStyle}>
    //     <Typography>
    //       <div dangerouslySetInnerHTML={{ __html: answer }} />
    //     </Typography>
    //   </CardContent>
    // </Card>
  );
};

export default FaqCard;
