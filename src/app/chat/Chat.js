import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import { Typography } from "@material-ui/core";
import ChatService from "./ChatService";
import groupicon from '../../assets/images/chat/group.png';
import moment from 'moment'

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      content: '""',
    },
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",

    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  listItem: {
    backgroundColor: theme.palette.common.whiteSmoke,
    color: theme.palette.common.blackRussian,
    "&:hover": {
      backgroundColor: theme.palette.common.quartz,
    },
    borderRadius: "10px",
    fontSize: "0.875rem",
    fontWeight: 300,
    marginBottom: "12px",
    cursor: 'pointer'
  },
  roleDetails: {
    position: 'absolute',
    right: 15,
    top: 30,
  },
  date:{
    color: theme.palette.grey[400],
    fontSize: 14,
    marginBottom: 3,
    fontWeight: 200,
    textTransform: 'capitalize'
  },
  avatarBackground:{
    background: theme.palette.primary.main,
  },
  groupIconContainer: {
    height: 35,
    width: 35,
    borderRadius: '50%',
    padding:5,
    justifyContent: 'center',
    verticalAlign: 'middle',
    background: theme.palette.primary.main,
  },
}));

const list = [
  {
    name: 'Akshay Srinivas',
    avatar: "/static/images/avatar/1.jpg",
    message: "Are you attending class today?",
    status: 'Online',
    date: '08 June',
    role: 'Faculty'
  },
  {
    name: 'Isha Roy',
    avatar: "/static/images/avatar/2.jpg",
    message: "Need project details. Share with me?",
    status: '',
    date: '07 June',
    role: 'Student'
  },
  {
    name: 'Cindy Baker',
    avatar: "/static/images/avatar/3.jpg",
    message: "Are you attending class today?",
    status: '',
    date: '07 June',
    role: 'Student'
  }
]

export default function Chat({ filter, selectContact, selectedRole, newGroup }) {
  const classes = useStyles();
  const [Chats, setChats] = useState([])
  const [filteredChat, setFilteredChats] = useState([])

  useEffect(()=>{
    if(filter == ''){
      setFilteredChats([...Chats])
    }
    else{
      let chat = Chats.filter(c=>{
        return c.name.toLowerCase().includes(filter.toLowerCase());
      })
      
      setFilteredChats([...chat])
    }
  }, [filter])

  useEffect(()=>{
    fetchChats()
  }, [])

  useEffect(()=>{
    if(newGroup)
      fetchContacts()
  }, [newGroup])

  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem('srmToken');
      // const selectedRole = props.selectedRole;
      const response = await ChatService.fetchChatUsers(
        {selectedRole},
        token,
      );
      console.log('Scroll response', response);
      if (response.status === 200) {
        console.log('Contacts', response);
        const { data } = response
        setChats(data.users)
        setFilteredChats(data.users)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchChats = async () => {
    try {
      const token = localStorage.getItem('srmToken');
      // const selectedRole = props.selectedRole;
      const response = await ChatService.fetchChats(
        {selectedRole},
        token,
      );
      console.log('Scroll response', response);
      if (response.status === 200) {
        console.log('Chats', response);
        const { data } = response
        setChats(data.chats)
        setFilteredChats(data.chats)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <List className={classes.root}>
      {filteredChat.map(chat=>{
        let name = chat.firstname + ' ' + chat.lastname
        let img = chat.thumbnail
        let avatar = {};
        if(chat!=undefined){
          if(chat.type == "group"){
            name = chat.group.name;
            img = groupicon
            avatar = classes.avatarBackground
          }
        }
        return (
          <ListItem onClick={()=>selectContact(chat)} alignItems="flex-start" className={classes.listItem}>
            <ListItemAvatar>
              <StyledBadge
                overlap="circle"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                variant={chat.status}
              >
                <Avatar alt={name} src={img} className={avatar} />
              </StyledBadge>
            </ListItemAvatar>
            <ListItemText
              style={{ width: '60%' }}
              secondaryTypographyProps={{ style: { width: '60%'} }}
              primary={name}
              secondary={chat.messages[chat.messages.length - 1].message}
            />
            <div className={classes.roleDetails}>
              <Typography className={classes.date}>
                {moment(chat.messages[chat.messages.length - 1].created_at).fromNow()}
              </Typography>
              {chat.type == "single" &&
                <Typography className={classes.date}>
                  {chat.roles[0].name}
                </Typography>
              }
            </div>
          </ListItem>
        )
      })}
    </List>
  );
}

/* import React from "react";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

const SmallAvatar = withStyles((theme) => ({
  root: {
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
  },
}))(Avatar);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function Chat() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <StyledBadge
        overlap="circle"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        variant="dot"
      >
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      </StyledBadge>
      Mani
    </div>
  );
}
 */
