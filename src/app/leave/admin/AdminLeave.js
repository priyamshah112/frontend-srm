import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Grid from '@material-ui/core/Grid';
import Moment from 'react-moment';
import LeaveService from "../LeaveService";
import Paper from '@material-ui/core/Paper';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useHistory, useParams } from "react-router-dom";
import {
  CircularProgress,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Typography from "@material-ui/core/Typography";
import { red, green } from '@material-ui/core/colors';
import CheckIcon from '@material-ui/icons/Check';

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    backgroundColor: theme.palette.mainBackground,
    height: '100%',
    marign: '0',
    padding: '0',
    overflow: 'auto',
    // display: "flex",
    // flexDirection: "column",

    '&::-webkit-scrollbar': {
      width: 0,
    },
  },
  tabBar: {
    backgroundColor: theme.palette.mainBackground,
    color: theme.palette.common.deluge,
    boxShadow: 'none',
    // '& .Mui-selected': {
    //   borderBottomWidth: '3px',
    // },
  },

  eventsTab: {
    padding: '6px 0px',
    borderBottom: '1px solid #aeaeb2',

    '& .MuiTab-wrapper': {
      height: '30px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '11px',
    },
  },

  borderRight: {
    '& .MuiTab-wrapper': {
      borderRight: '1px solid  #aeaeb2',
    },
  },
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
    margin:'15px',
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
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  marginLeft: 'auto',
  border: '1px solid',
},
center:{
  paddingLeft:'12px',
},
uppertext:{
  marginBottom:'4px',
},
newclass:{
  
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
  height:'100%',
  overflow: 'auto',
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
  marginLeft :'2px',
},
createButtonIconCircle: {
  backgroundColor: '#fff',
  borderRadius: '50%',
  display: 'inline-block',
  border: '1px solid red',
  width : '16px',
  height:'16px'
},
createButtonIconCircleOk: {
  backgroundColor: '#fff',
  borderRadius: '50%',
  display: 'inline-block',
  border: '1px solid green',
  width : '16px',
  height:'16px',
  marginLeft: '5px',
},
Approved:{
  color:'#40BD13',
}
,
Rejected:{
  color:'#D92424',
}
,
Cancelled:{
  color:'#3076A1',
}
,
leavereason:{
  fontSize: '15px',
}
,
name:{
  transform:'translateY(17px)',
}
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  
  
 const userInfo = JSON.parse(localStorage.getItem("srmUserInfo"));
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={4}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const TeacherLeave = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const tabref = useRef(null);
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
        const response = await LeaveService.fetchAllLeavesQueve(token);
        if (isLoading) {
          // for(let row in response.data.data.data){
          //   let id = response.data.data.data[row].user_id;
          //   var useridres = await LeaveService.fetchAllUserdata(id,token);
          //   response.data.data.data[row]['username'] = useridres.data.data.user_details.username ;
          // }
          setLeaves(response.data.data.data);
          let next_page_url = response.data.data.next_page_url;
          let last_page_url = response.data.data.last_page_url;
          
          if (next_page_url === null) {
            setHasMore(false);
          } else {
            setNextUrl(next_page_url);
            setCurrentPage(currentPage + 1);
          
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
      // console.log(nextUrl)
      const token = localStorage.getItem('srmToken');
      const response = await LeaveService.fetchMoreLeavesQueve(token, nextUrl);
      
      // for(let row in response.data.data.data){
      //   let id = response.data.data.data[row].user_id;
      //   var useridres = await LeaveService.fetchAllUserdata(id,token);
      //   response.data.data.data[row]['username'] = useridres.data.data.user_details.username ;
      // }
      setLeaves([...allLeaves, ...response.data.data.data]);
      // console.log(response.data.data.next_page_url);
      let next_page_url = response.data.data.next_page_url;
      // console.log(next_page_url);
      if (next_page_url === null) {
        setHasMore(false);
      } else {
        // console.log("here")
        setNextUrl(next_page_url);
        setCurrentPage(currentPage + 1);
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  const userInfo = JSON.parse(localStorage.getItem("srmUserInfo"));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleScroll = () => {
    console.log('scrolled');
  };

  const CancelLeave =async (event) => {
    try {    
      const token = localStorage.getItem('srmToken');
      const response = await LeaveService.putLeave(
        {
          "leavecode":event,
          "leavestatus":"REJECTED"
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

  const ApprovedLeave =async (event) => {
    try {    
      const token = localStorage.getItem('srmToken');
      const response = await LeaveService.putLeave(
        {
          "leavecode":event,
          "leavestatus":"APPROVED"
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
    <div className={classes.container} ref={tabref} >
     <div className={classes.container} >

        
        <div className={classes.root} id='scrollable'>


        {/* <Grid container className={classes.newclass}>
        <Grid item xs={12}> */}
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
          scrollThreshold={0.2}
        >
        {allLeaves.map((leaves) => (
        <Paper className={classes.paper}>
        <div className={classes.rowflex}>
        <Grid item xs={5} >
        <div className={classes.rowflex}>
            <Grid item xs={2}>
              <img className={classes.img} src={leaves.users.thumbnail}></img>
              {/* <svg className="MuiSvgIcon-root MuiAvatar-fallback" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg> */}

            </Grid>
            <Grid item xs={6}>
              <div className={classes.name}>{leaves.users.firstname}&nbsp;{leaves.users.lastname}  </div>
              {/* <div>Class - 4A</div> */}
            </Grid>
        </div>
        </Grid>

        <Grid item xs={5} className={classes.borderLeft}>
        <Typography variant='h5' className={classes.leavereason}>
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
        <Typography variant='h5' className={classes.leavereason}>

        {leaves.leave_status == 'PENDING'?
        <CloseIcon
              color='action'
              className={classes.createButtonIconCircle}
              
              style={{ color: red[500] }}
              onClick={(e) => {   CancelLeave(leaves.leave_code)}}
              value={leaves.leave_code}
            />

        :''}


        {leaves.leave_status == 'PENDING'?

            <CheckIcon
              color='action'
              className={classes.createButtonIconCircleOk}
              onClick={(e) => {   ApprovedLeave(leaves.leave_code)}}
              value={leaves.leave_code}
              style={{ color: green[500] }}
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
        </Typography>
        </Grid>

        </div>
        </Paper>
        ))}
        </InfiniteScroll>
        <br/><br/><br/><br/>
        {/* </Grid>
        </Grid> */}
        </div>
        
        </div>  
    </div>
  );
};

export default TeacherLeave;