import React, { createRef, useEffect, useRef, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import tick from '../../assets/images/chat/tick.svg'
import doubleTick from '../../assets/images/chat/double-tick.svg'
import { Input, TextField, Typography } from "@material-ui/core";
import smile from '../../assets/images/chat/smile.svg'
import attach from '../../assets/images/chat/attach.svg'
import closeIcon from '../../assets/images/chat/remove.svg'
import Picker from 'emoji-picker-react';

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
    width: "95%",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 0,
    backgroundColor: '#F4F4F4',
    height: '86%'
  },
  fullScreen: {
    padding: 10,
    borderRadius: 10,
  },
  inline: {
    display: "inline",
  },
  listItem: {
    backgroundColor: '#E7E7ED',
    color: theme.palette.common.blackRussian,
    "&:hover": {
      backgroundColor: theme.palette.common.quartz,
    },
    borderRadius: "10px",
    fontSize: "0.875rem",
    fontWeight: 300,
    marginBottom: "12px",
    flexDirection: 'row',
  },
  owner:{
    background: theme.palette.common.white,
  },
  primary: {
    fontSize: 10,
  },
  tick:{
    width: 10,
    height: undefined
  },
  time: {
    fontSize: 12, 
    color: theme.palette.grey[600]
  },
  date:{
    textAlign: 'center',
    marginBottom: 15,
    marginTop: 5
  },
  dateTextContainer: {
    background: 'rgb(142,142,147, 0.2)',
    padding: 5,
    borderRadius: 5
  },
  dateText:{
    fontSize: 12,
    color: '#1C1C1E'
  },
  bottomContainer:{
    position: 'absolute',
    bottom: 30,
    width: '100%'
  },
  fullBottomContainer:{
    bottom: 10,
  },
  inputContainer:{
    background: theme.palette.common.white,
    borderRadius: 10,
    flexDirection: 'row',
    width: '100%',
  },
  fullScreenInput:{
    width: '97%'
  },
  emojiContainer: {
    height: '100%',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: 8
  },
  smiley:{
    height: 16,
    width: undefined,
    cursor: 'pointer'
  },
  inputBorder: {
    marginLeft: 10,
    border: 'none',
    flex: 1
  },
  emojiPicker:{
    position: 'absolute',
    bottom: 80
  },
  fileInput:{
    opacity: 0,
    position: 'absolute'
  },
  attachmentContainer:{
    backgroundColor: '#E7E7ED',
    color: theme.palette.common.blackRussian,
    borderRadius: 10,
    marginTop: 5,
    flexDirection: 'row',
    marginBottom: 5,
  },
  attachmentFullScreen:{
    width: '97%',
  },
  attachmentText:{
    color: theme.palette.grey[600],
    fontSize: 12,
    width: '90%'
  },
  right:{ 
    justifyContent: 'flex-end', 
    textAlign: 'right', 
    position: 'absolute', 
    right: 15, 
    bottom: 8
  },
  close:{
    width: 16,
    height: 10,
    cursor: 'pointer'
  },
  chatList: {
    maxHeight: '80%',
    overflow: 'auto',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  }
}));

const list = [{
    sender: "Akshay Srinivas",
    message: "Are you attending class today?",
    status: true,
    date: "27 Sept 2020",
    time: "09:30AM"
  },
  {
    sender: "Isha Roy",
    message: "Need project details. Share with me?",
    status: true,
    date: "28 Sept 2020",
    time: "09:32AM"
  },
  {
    sender: 'Akshay Srinivas',
    message: "Are you attending class today?",
    status: false,
    date: "28 Sept 2020",
    time: '09:34AM'
  },
  {
    sender: "Akshay Srinivas",
    message: "Are you attending class today?",
    status: true,
    date: "27 Sept 2020",
    time: "09:30AM"
  },
  {
    sender: "Isha Roy",
    message: "Need project details. Share with me?",
    status: true,
    date: "28 Sept 2020",
    time: "09:32AM"
  },
  {
    sender: 'Akshay Srinivas',
    message: "Are you attending class today?",
    status: false,
    date: "28 Sept 2020",
    time: '09:34AM'
  },
]

export default function SingleChat({ fullScreen = false, closeEmoji }) {
  const classes = useStyles();
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const fileRef = useRef()
  const [messages, setMessages] = useState(list)
  const [ message, setMessage ] = useState('')
  const[emojiShow, showEmoji] = useState(false)
  const [attachments, setAttachments] = useState([])
  const [showAttachments, setShowAttachments] = useState(true)
  let messagesEnd = createRef()
  let rootClass = [classes.root];
  useEffect(()=>{
    showEmoji(false)
    setShowAttachments(!closeEmoji)
    if(!closeEmoji){
      scrollToBottom()
    }
    
  }, [closeEmoji])
  const scrollToBottom = () => {
    messagesEnd.current.scrollIntoView({ behavior: "smooth" });
  }
  if(fullScreen){
    rootClass.push(classes.fullScreen);
  }
  const onEmojiClick = (event, emojiObject) => {
    console.log(emojiObject)
    showEmoji(false)
    let m = message;
    m += emojiObject.emoji;
    setMessage(m)
    setChosenEmoji(emojiObject);
  };
  let date = "";
  const fileSelectHandler = (event) => {
    console.log(event.target.files)
    attachments.push(...event.target.files)
    event.target.value = null
    setAttachments([...attachments])
  }
  const pickFile = () => {
    fileRef.current.click()
  }
  const removeAttachment = (item) => {
    let index = attachments.indexOf(item)
    attachments.splice(index, 1)
    console.log(attachments)
    setAttachments([...attachments])
  }
  return (
    <List className={rootClass.join(' ')}>
      {fullScreen &&
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <StyledBadge
              overlap="circle"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              variant="dot"
            >
              <Avatar alt="Akshay Srinivas" src="/static/images/avatar/1.jpg" />
            </StyledBadge>
          </ListItemAvatar>
          <ListItemText
            primary="Kartik P."
            secondary={"Parent"}
          />
        </ListItem>
      }
      <div className={classes.chatList}>
        {messages.map((message)=>{
          let showDate = message.date != date;
          if(showDate ){
            date = message.date;
          }
          return (<>
            { showDate &&
              <div className={classes.date}>
                <span className={classes.dateTextContainer}><span className={classes.dateText}>{ message.date }</span></span>
              </div>
            }
            <ListItem alignItems="flex-start" className={[classes.listItem, 
              message.sender == "Akshay Srinivas"? classes.owner: {}].join(' ')}>
              <ListItemText
                classes={{primary: classes.primary}}
                primary={message.sender}
                secondary={message.message}
              />
              <div className={classes.right}>
                <Typography className={classes.time}>{message.time}</Typography>
                <img src={message.status? doubleTick: tick} className={classes.tick} />
              </div>
            </ListItem>
          </>)
        })}
        <div style={{ float:"left", clear: "both" }}
             ref={messagesEnd}>
        </div>
      </div>
      {showAttachments &&
        <div className={[classes.bottomContainer, fullScreen? classes.fullBottomContainer:{}].join(' ')}>
          {attachments.map(attachment =>{
            return(
              <ListItem className={[classes.attachmentContainer, fullScreen? classes.attachmentFullScreen: {}].join(' ')} alignItems="flex-start">
                <Typography className={classes.attachmentText}>{attachment.name}</Typography>
                <div className={classes.right}>
                  <img src={closeIcon} onClick={()=>removeAttachment(attachment)} className={classes.close} />
                </div>
              </ListItem>
            )
          })}
          <ListItem className={[classes.inputContainer, fullScreen? classes.fullScreenInput: {}].join(' ')} alignItems="flex-start">
            <Typography className={classes.emojiContainer}>
              <img src={smile} className={classes.smiley} onClick={()=>showEmoji(!emojiShow)} />
            </Typography>
            <Input
                id='message'
                placeholder="Type here"
                name='message'
                value={message}
                onChange={(event)=>setMessage(event.target.value)}
                className={classes.inputBorder}
                required={true}
                disableUnderline={true}
              />
              <Typography className={classes.emojiContainer}>
                <img src={attach} className={classes.smiley} onClick={pickFile} />
                <input multiple accept="image/x-png,image/gif,image/jpeg" 
                  className={classes.fileInput} id='attachment' type="file" onChange={fileSelectHandler} ref={fileRef} />
              </Typography>
          </ListItem>
        </div>
      }
      { emojiShow &&
        <div className={classes.emojiPicker}>
          <Picker onEmojiClick={onEmojiClick}  />
        </div>
      }
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
