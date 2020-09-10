import React, { useState, useRef , useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Icon from '@material-ui/core/Icon';
import LeaveService from "../LeaveService";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useHistory, useParams } from "react-router-dom";
import {
  CircularProgress,
} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Moment from 'react-moment';
import AddCircleIcon from '@material-ui/icons/AddCircle';
const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    backgroundColor: theme.palette.mainBackground,
    height: '100%',
    marign: '0',
    padding: '0',
    overflow: 'auto',

    '&::-webkit-scrollbar': {
      width: 0,
    },
  },
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow:'none',
    marginTop:'10px',
    padding:'10px',
  },
  left: {
    paddingRight: '12px',
    borderRight: '1px solid #cacacc',
},
rowflex: {
  display: 'flex',
  flexWrap: 'wrap',
},
img:{
  margin:' 0px 14px 0px 4px',
  borderRadius: '100%',
},
center:{
  paddingLeft:'12px',
},
uppertext:{
  marginBottom:'4px',
},
newclass:{
  paddingLeft:'10px',
  paddingRight:'10px'
},
borderLeft:{
  borderLeft:'2px solid #dedede'
},
create:{
  float: 'right',
  paddingRight: '21px',
  paddingTop: '8px'
},
root: {
  '& > span': {
    margin: theme.spacing(2),
  },
},
loading: {
  textAlign: 'center',
  justifyContent: 'center',
  margin: 'auto',
},
createHeader:{
  display: 'flex',
  float: 'right',
},
createButtonIcon: {
  paddingRight: '5px',
},
createTitle:{
  display: 'flex',
  paddingTop: '4px',
},
align:{
  textAlign :'justify',
  paddingLeft :'8px'
},
status:{
  display: 'inline-block',
  paddingTop: '8px',
}
}));

const StudentHomeLeave = (props) => {
  
  const classes = useStyles();
  const [hasMore, setHasMore] = useState(true);
  const [allLeaves, setLeaves] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    let isLoading = true;
    const fetchLeave = async () => {
      try {
        const token = localStorage.getItem('srmToken');
        const response = await LeaveService.fetchAllLeaves(token);
        if (isLoading) {
          setLeaves(response.data.data.data);
          let next_page_url = response.data.data.next_page_url;
          let last_page_url = response.data.data.last_page_url;
          if (next_page_url === null) {
            setHasMore(false);
          } else {
            setNextUrl(next_page_url);
            setCurrentPage(currentPage + 1);
            setHasMore(true);
          }
        }
      } catch (error) {
        console.log('Error: ', error);
      }
    };
    fetchLeave();
    return () => {
      isLoading = false;
    };
  }, []);

  const fetchMoreLeave = async () => {
    try {
      const token = localStorage.getItem('srmToken');
      const response = await LeaveService.fetchMoreLeave(token, nextUrl);
      setLeaves([...allLeaves, ...response.data.data.data]);
      let next_page_url = response.data.data.next_page_url;
      if (next_page_url === null) {
        setHasMore(false);
      } else {
        setNextUrl(next_page_url);
        setCurrentPage(currentPage + 1);

        setHasMore(true);
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  const userInfo = JSON.parse(localStorage.getItem("srmUserInfo"));
  const routeChange = ()=> {
    history.replace("/leave/create");
    
  }
  return (
    <>

<div className={classes.container} id='scrollable'>
        <Container>
        <div className={classes.root}>
        <Typography variant='h5' className={classes.status}>
           <span className={classes.status}>Status</span>
         </Typography>  
    
   <Typography variant='h8' className={classes.createHeader}>
            <AddCircleIcon
              color='primary'
              className={classes.createButtonIcon}
              onClick={(event) => {
                history.push('/leave/create');
              }}
            />
            <span className={classes.createTitle}>New</span>
    </Typography>

    <Grid container className={classes.newclass}>
      <Grid item xs={12}>
      <InfiniteScroll
          dataLength={allLeaves.length}
          next={fetchMoreLeave}
          hasMore={hasMore}
          loader={
            <>
              <br />
              <div className={classes.loading}>
                <CircularProgress />
              </div>
              <br />
            </>
          }
          scrollableTarget='scrollable'
          scrollThreshold={0.5}
        >
      {allLeaves.map((leaves) => (
        <Paper className={classes.paper}>
        <div className={classes.rowflex}>
        
       
        <Grid item xs={10} className={classes.align}>
            <div className={classes.uppertext}>
            <Moment format="DD">
            {leaves.start_date}
            </Moment>
            - 
            <Moment format="D MMM YYYY">
            {leaves.end_date}
            </Moment>
            </div>
      <div>Reason - {leaves.reason}</div>
        </Grid>
        <Grid item xs={2}>
            <div className={classes.uppertext}>{leaves.leave_status}</div>
            
        </Grid>
        
      </div>
        </Paper>
      ))}
      </InfiniteScroll>
      </Grid>
    </Grid>
  </div>
         </Container>
 </div>         
    </>
  );
};

export default StudentHomeLeave;