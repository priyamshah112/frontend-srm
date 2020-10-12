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
import CloseIcon from '@material-ui/icons/Close';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { red, green } from '@material-ui/core/colors';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import createTypography from '@material-ui/core/styles/createTypography';

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
uppertext1:{
  marginBottom:'4px',
  color:'#d8d8da',
},
newclass:{
  paddingLeft:'10px',
  paddingRight:'10px'
},
borderLeft:{
  borderLeft:'2px solid #dedede',
  textAlign:'left',
  paddingLeft:'10px'
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
headerText:{marginTop:'10px',
marginLeft:'10px',
marginRight:'10px',
},
createHeader:{
  display: 'flex',
  float: 'right',
  transform:'translateY(12px)'
},
createButtonIcon: {
  paddingRight: '5px',
  transform:'translateY(3px)'
},
createButtonIconCircle: {
  backgroundColor: '#fff',
  borderRadius: '50%',
  display: 'inline-block',
  border: '1px solid red',
},
createTitle:{
  display: 'flex',
  paddingTop: '4px',
  fontSize:'20px'
},
align:{
  textAlign :'justify',
  paddingLeft :'8px'
},
status:{
  display: 'inline-block',
  paddingTop: '8px',
  paddingLeft:'5px',
  fontSize:'20px'
},
Approved:{
  color:'#40BD13',
}
,
Cancelled:{
  color:'#3076A1',
}
,
Rejected:{
  color:'#D92424',
},
loading: {
  width: "100%",
  textAlign: "center",
  paddingTop: "8px",
  fontSize: "20px",
},
emptyView: {
  width: "100%",
  textAlign: "center",
  paddingTop: "100px",
  fontSize: "20px",
},
}));

const StudentHomeLeave = (props) => {
  
  const classes = useStyles();
  const [hasMore, setHasMore] = useState(true);
  const [allLeaves, setLeaves] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    let isLoading = true;
    const fetchLeave = async () => {
      try {
        const token = localStorage.getItem('srmToken');
        const response = await LeaveService.fetchAllLeaves(token);
        setLoading(false);
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
        setLoading(false);
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

  const CancelLeave =async (event) => {
    try {    
      const token = localStorage.getItem('srmToken');
      const response = await LeaveService.putLeave(
        {
          "leavecode":event,
          "leavestatus":"CANCELLED"
      },
          token
        );
        if (response.status === 200) {
          history.replace("/leave");
        }
      } catch (e) {
        console.log(e);
      }
  };
  return (
    <>

<div className={classes.container} id='scrollable'>
        <Container>
        <div className={classes.root}>
        <div className={classes.headerText}>
        <Typography variant='h5' className={classes.status}>
        <svg xmlns="http://www.w3.org/2000/svg"  width="14" height="18" viewBox="0 0 14 18"><defs><style></style></defs><g transform="translate(-10.439 -7)"><path class="a" d="M21.153,7H11V25H25V10.517Zm.186,1.017,2.542,2.324-2.542,0ZM11.646,24.393V7.607h9.046v3.337l3.662.005V24.393Z" transform="translate(-0.561)"/><rect class="a" width="6" transform="translate(13.065 8.878)"/><rect class="a" width="9.197" height="1" transform="translate(13 11.84)"/><rect class="a" width="7" height="1" transform="translate(13.074 13.825)"/><rect class="a" width="9.197" transform="translate(13 16.806)"/><rect class="a" width="7" height="1" transform="translate(13.074 16.802)"/><rect class="a" width="9.197" height="1" transform="translate(13 19.779)"/><rect class="a" width="7" height="1" transform="translate(13.074 21.746)"/></g></svg>
           <span className={classes.status}>
             
             Status</span>
         </Typography>  
    
   <Typography variant='h5' className={classes.createHeader}>
            <AddCircleIcon
              color='primary'
              className={classes.createButtonIcon}
              onClick={(event) => {
                history.push('/leave/create');
              }}
            />
            <span className={classes.createTitle}>New</span>
    </Typography>
        </div>

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
      <Typography >    
      {allLeaves.map((leaves) => (
        <Paper className={classes.paper}>
        <div className={classes.rowflex}>
        
        
        <Grid item xs={10} className={classes.align}>
        <Typography className={classes.leavereason}>
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
        </Typography>
        </Grid>
      
        <Grid item xs={2}>
        
        {leaves.leave_status == 'PENDING'?
        <CloseIcon
        color='action'
        className={classes.createButtonIconCircle}
        style={{ color: red[500] }}
        onClick={(e) => {   CancelLeave(leaves.leave_code)}}
        value={leaves.leave_code}
      />
        :''}
        
            
            {leaves.leave_status == 'PENDING'?<div className={classes.uppertext1}>
            Pending</div>:''}

            {leaves.leave_status == 'REJECTED'?<div className={classes.Rejected}>
            Rejected</div>:''}

            {leaves.leave_status == 'CANCELLED'?<div className={classes.Cancelled}>
            Canceled</div>:''}

            {leaves.leave_status == 'APPROVED'?<div className={classes.Approved}>
            Approved</div>:''}
            
            
        </Grid>
        
      </div>
        </Paper>
        
      ))}
          {!loading && !allLeaves.length ? (
            <div className={classes.emptyView}>
              <Typography>You don't have any leave.</Typography>
            </div>
          ) : null}
      </Typography>
      </InfiniteScroll>
      <br/><br/><br/><br/>
      </Grid>
    </Grid>
  </div>
         </Container>
 </div>         
    </>
  );
};

export default StudentHomeLeave;