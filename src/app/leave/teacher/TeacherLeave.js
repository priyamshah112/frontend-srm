import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Grid from '@material-ui/core/Grid';
import Moment from 'react-moment';
import LeaveService from "../LeaveService";
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useHistory, useParams } from "react-router-dom";
import {
  CircularProgress,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Typography from "@material-ui/core/Typography";
import { red, green } from '@material-ui/core/colors';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleScroll = () => {
    console.log('scrolled');
  };

  return (
    <div className={classes.container} ref={tabref} id='scrollable'>
      <AppBar position='sticky' className={classes.tabBar}>
        <Tabs
          centered
          value={value}
          onChange={handleChange}
          indicatorColor='primary'
          textColor='primary'
          variant='fullWidth'
          className={classes.tabs}
        >
          <Tab
            label='My Leave'
            {...a11yProps(0)}
            className={`${classes.eventsTab} ${classes.borderRight}`}
          />
          <Tab
            label='Student Leave'
            {...a11yProps(1)}
            className={classes.eventsTab}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <>
my leave
       
    </>
      </TabPanel>

      <TabPanel value={value} index={1} className={classes.newclass}>
        <div className={classes.container} id='scrollable'>

        
        <div className={classes.root}>
    
    
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
        <Grid item xs={5} >
        <div className={classes.rowflex}>
            <Grid item xs={2}>
              {/* <img className={classes.img} src="child.png"></img> */}
              <svg class="MuiSvgIcon-root MuiAvatar-fallback" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg>

            </Grid>
            <Grid item xs={6}>
              <div>{userInfo.username}</div>
              {/* <div>Class - 4A</div> */}
            </Grid>
        </div>
        </Grid>
       
        <Grid item xs={5} className={classes.borderLeft}>
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
        <Typography variant='h8' className={classes.createHeader}>
            <CloseIcon
              color='action'
              className={classes.createButtonIcon}
              onClick={(event) => {
                history.push('/leave/create');
              }}
              style={{ color: red[500] }}
            />
            <CheckCircleOutlineIcon
              color='action'
              className={classes.createButtonIcon}
              onClick={(event) => {
                history.push('/leave/create');
              }}
              style={{ color: green[500] }}
            />
    </Typography>
            
        </Grid>
        
      </div>
        </Paper>
      ))}
      </InfiniteScroll>
      </Grid>
    </Grid>
  </div>
         
 </div>  
      </TabPanel>
    </div>
  );
};

export default TeacherLeave;