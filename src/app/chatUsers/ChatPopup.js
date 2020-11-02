import React, { useState } from 'react'
import { makeStyles, withStyles } from '@material-ui/styles';
import Chat from '../chat/Chat';
import SingleChat from './SingleChat';
import { Avatar, Grid, Typography } from '@material-ui/core';
import ExternalLink from '../../assets/images/chat/external-link.png';
import Group from '../../assets/images/chat/group.png';
import Minimize from '../../assets/images/chat/minimize.svg';
import Dots from '../../assets/images/chat/dots-menu.svg';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    container: {
      width: '100%',
      backgroundColor: theme.palette.mainBackground,
      height: '100%',
      marign: '0',
      padding: '0',
      display: 'flex',
      flexDirection: 'column',
    },
    title: {
        display: 'block',
        [theme.breakpoints.up('sm')]: {
          display: 'block',
        },
        fontWeight: 500,
        fontStyle: 'normal',
        fontSize: '1rem',
        color: theme.palette.common.white,
        backgroundColor: theme.palette.common.deluge,
        paddingLeft: 20,
        paddingRight: 5,
        paddingTop: 10,
        height: 40,
        paddingBottom: 10,
        cursor: 'pointer',
        flexGrow: 1,
    },
    content: {
      flexGrow: '1',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '0',
      padding: '0 20px 20px 20px',
    },
    panel: {
      flexGrow: '1',
      overflow: 'hidden',
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      position: 'absolute',
      bottom: 0,
      minHeight: 60,
      right: 0,
      zIndex: 9999999999,
      elevation: 5,
      borderRadius: 10,
      boxShadow: '0px 0px 1px 1px #ccc',
      background: '#F4F4F4'
    },
    inactivePanel: {
        width: 340,
        height: 35,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
    },
    activePanel: {
        width: 340,
        height: 500
    },
    marginTop: {
      marginTop: '20px',
    },
    topPanelRow: {
      marginTop: '20px',
    },
    panelCol: {
      width: '100%',
    },
    taskCol: {
      height: '400px',
    },
    homeworkCol: {
      height: '130px',
      [theme.breakpoints.down('xs')]: {
        height: 'inherit',
      },
    },
    externalIcon: {
        height: 25,
        width: undefined,
    },
    avatar:{
      borderRadius: 25,
    },
    col:{
        flexDirection: 'column'
    },
    titleText:{
        color: theme.palette.common.white,
    },
    menuIcon:{
      width: 20,
      height: undefined
    },
    minimize:{
      width: 15,
      marginLeft: 10,
      height: 8,
      marginTop: 8,
    },
    heading:{
      fontSize: 16,
    },
    subHeading:{
      fontSize: 14
    },
    content:{
      marginTop: 100
    }
}))
const ChatPopup = ({ selectedChat, props }) => {
    const [minimize, setMinimize] = useState(true)
    const classes = useStyles();
    const history = useHistory();
    const chatHeader = () => {
      let name = selectedChat.firstname + ' ' + selectedChat.lastname
      let img = selectedChat.thumbnail
      let avatar = {};
      let subheading = ""
      if(selectedChat.type == "group"){
        name = selectedChat.group.name;
        img = Group
        avatar = classes.avatarBackground
        subheading = "Group"
      }
      else if(selectedChat.members!=undefined){
          let rec = selectedChat.members.filter(c=>{
            return c.id != props.userInfo.id
          })[0]
          name = rec.firstname + ' ' + rec.lastname
          subheading = rec.roles[0].name
          img = rec.thumbnail
      }
        return (
          <Typography className={classes.title} onClick={()=>setMinimize(!minimize)}>
            <Grid spacing={0} container>
                <Grid item xs={2} style={{ paddingTop: 5, maxWidth: '12%' }}>
                  <img
                      src={ExternalLink}
                      alt='Open Chat Full Screen'
                      className={[classes.externalIcon, classes.borderRadius].join(' ')}
                      onClick={()=>history.push("/chat/"+selectedChat.id)}
                  />
                </Grid>
                <Grid item xs={2} style={{ paddingTop: 5, maxWidth: '12%' }}>
                  <img
                      src={img}
                      alt={name}
                      className={[classes.externalIcon, classes.borderRadius].join(' ')}
                  />
                </Grid>
                <Grid item xs={7} style={{ width: '59%', maxWidth: '59%', flexBasis: '59%' }}>
                  <span className={classes.heading}>{name}</span><br />
                  <span className={classes.subHeading}>{subheading}</span>
                </Grid>
                <Grid item xs={2} style={{ paddingTop: 5, flexDirection: 'row', justifyContent: 'flex-end' }}>
                  <img
                      src={Dots}
                      alt='Menu'
                      className={classes.menuIcon}
                  />
                  <img
                      src={Minimize}
                      alt='Minimize'
                      className={classes.minimize}
                  />
                </Grid>
            </Grid>
          </Typography>
        )
    }
    return(
        <div className={[classes.panel, minimize?classes.inactivePanel: classes.activePanel].join(' ')}>
            {chatHeader()}
            <SingleChat props={props} closeEmoji={minimize} chat={selectedChat} />
        </div>
    )
}

export default ChatPopup;