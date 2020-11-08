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
import Group from '../../assets/images/chat/group.png';
import moment from 'moment'
import ChatService from "../chat/ChatService";
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import ChatGroupCard from "./ChatGroupCard";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import {
  IconButton,
  Grid,
  Button,
} from "@material-ui/core";
var CryptoJS = require("crypto-js");


const BACKEND_IMAGE_URL = process.env.REACT_APP_BACKEND_IMAGE_URL;

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
  menuItem: {
    paddingLeft: "10px",
    paddingRight: "10px",
    colour: "#1C1C1E",
  },
  borderBottomDiv: {
    width: "90%",
    height: "30px",
    margin: "auto",
    marginTop: "5px",
    borderBottom: "1px solid #D1D1D6",
  },
  borderBottomLastDiv: {
    width: "90%",
    height: "30px",
    margin: "auto",
    marginTop: "5px",
  },
  menuTopItemMargin: {
    marginTop: "5px",
  },
  menuItemRoot: {
    padding: 0,
  },
  menuContainer: {
    backgroundColor: theme.palette.common.darkGray,
    color: "black",
    minWidth: "150px",
    "&.MuiPaper-rounded": {
      boxShadow: "0px 6px 6px #00000029",
    },
    [theme.breakpoints.down("md")]: {
      minWidth: "150px",
    },
    [theme.breakpoints.down("sm")]: {
      minWidth: "150px",
    },
  },
  menuList: {
    width: "100% !important",
    padding: 0,
  },
}));



export default function SingleChat({ fullScreen = false, closeEmoji, chat, props }) {
  const classes = useStyles();
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const fileRef = useRef()
  const [messages, setMessages] = useState([])
  const [ message, setMessage ] = useState('')
  const[emojiShow, showEmoji] = useState(false)
  const [attachments, setAttachments] = useState([])
  const [showAttachments, setShowAttachments] = useState(true)
  const [filter, setFilter] = useState("All");
  const [anchorEl, setAnchorEl] = useState(null);
  let messagesEnd = createRef()
  let rootClass = [classes.root];
  useEffect(()=>{
    showEmoji(false)
    setShowAttachments(!closeEmoji)
    if(!closeEmoji){
      scrollToBottom()
    }
    
  }, [closeEmoji])
  let timer = null
  useEffect(()=>{
    if(timer != null){
      clearInterval(timer)
    }
    if(chat.messages == undefined){
      setMessages([])
    }
    else{
      setMessages(chat.messages)
      // timer = setInterval(()=>fetchChat(chat), 1000)
    }
  }, [chat])
  const fetchChat = async(chat) => {
    const token = localStorage.getItem('srmToken');
    // const selectedRole = props.selectedRole;
    const response = await ChatService.fetchChat(
      chat.id,
      token,
    );
    if (response.status === 200) {
      // console.log('Chat', response);
      const { data: {chat} } = response
      setMessages(chat.messages)
    }
  }
  const scrollToBottom = () => {
    messagesEnd.current.scrollIntoView({ behavior: "smooth" });
  }
  if(fullScreen){
    rootClass.push(classes.fullScreen);
  }
  const onEmojiClick = (event, emojiObject) => {
    // console.log(emojiObject)
    showEmoji(false)
    let m = message;
    m += emojiObject.emoji;
    setMessage(m)
    setChosenEmoji(emojiObject);
  };
  let date = "";
  const fileSelectHandler = (event) => {
    // console.log(event.target.files)
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
    // console.log(attachments)
    setAttachments([...attachments])
  }
  let name = chat.firstname + ' ' + chat.lastname
  let img = chat.thumbnail
  let avatar = {};
  let subheading = ""
  let cls = {}
  if(chat.type == "group"){
    name = chat.group.name;
    img = Group
    avatar = classes.avatarBackground
    subheading = "Group"
    cls = classes.groupIconContainer
  }
  else if(chat.members!=undefined){
    let rec = chat.members.filter(c=>{
      return c.id != props.userInfo.id
    })[0]
    name = rec.firstname + ' ' + rec.lastname
    subheading = rec.roles[0].name
    img = rec.thumbnail
  }

  const onKeyDown = (event) => {
    // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      submitChat()
    }
  }

  useEffect(()=>{
    if(!closeEmoji){
      scrollToBottom()
    }
  }, [messages])

  const submitChat = async() =>{
    let data = {
      message: getMessage()
    }
    try {
      const token = localStorage.getItem('srmToken');
      // const selectedRole = props.selectedRole;
      if(chat.messages == undefined){
        data.reciever = chat.id
        
        const response = await ChatService.newChat(
          data,
          token
        );
        // console.log('Scroll response', response);
        if (response.status === 200) {
          // console.log('Chat', response);
          const { data } = response
          setMessage('')
          setMessages(data.chat.messages)
        }
        else{
          return;
        }
      }
      else{
        let frmdata = new FormData();
        frmdata.append("message", getMessage());
        attachments.forEach(a=>{
          frmdata.append("attachment[]", a)
        })

        const response = await ChatService.submitChat(
          frmdata,
          token,
          chat.id
        );
        
        // console.log('Scroll response', response);
        if (response.status === 200) {
          // console.log('Chat', response);
          const { data } = response
          setMessage('')
          setAttachments([])
          setMessages(data.chat.messages)
        }
      }
    } catch (error) {
      console.log(error.response);
    }
  }

  const checkValidURLImage = (a) => {

    var b = ["jpeg","jpg","png","gif","raw"]; //format img

    var c = a.split("."); // ["https://i", "imgur", "com/qMUWuXV", "jpg"]

    // console.log(b.includes(c[c.length-1]))
    return b.includes(c[c.length-1])
  }

  const getMessage = () => {
    var msg = CryptoJS.AES.encrypt(message, "chat" + chat.id).toString();
    // console.log(msg)
    return msg;
  }

  const getPlainMessage = (message) => {
    var bytes  = CryptoJS.AES.decrypt(message, "chat" + chat.id);
    var msg = bytes.toString(CryptoJS.enc.Utf8);
    return msg
  }

  const handleFilterChange = async (event) => {
    if (event.target.value !== filter) {
      try {
        
      } catch (e) {
        console.log(e);
      }
    }
  };

  const chatMessage = (message) => {
    if(message.attachment != "null" && message.attachment != null) {
      return <div> {
        JSON.parse(message.attachment).map(at=>{
          if(checkValidURLImage(at)){
            return <a style={{cursor: 'pointer'}} target="_blank" href={BACKEND_IMAGE_URL + "/" + at}>
              <img src={BACKEND_IMAGE_URL + "/" + at} style={{height: 70, width: undefined, alignSelf: 'center'}} alt="" />
            </a>
          }
          else{
            return <a style={{cursor: 'pointer'}} target="_blank" href={BACKEND_IMAGE_URL + "/" + at}>
              <ListItem alignItems="flex-start">
                <Typography className={classes.attachmentText}>{at.split('/')[at.split('/').length - 1]}</Typography>
              </ListItem>
            </a>
          }
        })
      }
        <Typography>
          {getPlainMessage(message.message)}
        </Typography>
      </div>
    }
    else{
      return <Typography>
        {getPlainMessage(message.message)}
      </Typography>
    }
  }
  let content = ""
  if (props.created_by) {
    content = <ChatGroupCard
        key={chat.id}
        chat={chat}
      />
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async (event) => {
    const updatedStatus = event.currentTarget.getAttribute("value");
    setAnchorEl(null);

    try {
      const token = localStorage.getItem("srmToken");
      
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <List className={rootClass.join(' ')}>
      {fullScreen &&
        <>
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
                <Avatar alt={name} className={cls} src={img} />
              </StyledBadge>
            </ListItemAvatar>
            <ListItemText
              primary={name}
              secondary={subheading}
            />
            <div style={{float: 'right', flexDirection: 'flex-end'}}>
              <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
                classes={{ root: classes.iconButtonRoot }}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="long-menu"
                anchorEl={anchorEl}
                classes={{ paper: classes.menuContainer, list: classes.menuList }}
                elevation={0}
                // getContentAnchorEl={null} uncomment this to remove warning

                keepMounted
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={handleClose}
                  classes={{ root: classes.menuItemRoot }}
                  disableGutters
                  className={`${classes.menuItem} ${classes.menuTopItemMargin} `}
                  value={"Add"}
                >
                  <div className={classes.borderBottomDiv}>
                    <Typography variant="body2">Add Member</Typography>
                  </div>
                </MenuItem>
                <MenuItem
                  onClick={handleClose}
                  disableGutters
                  classes={{ root: classes.menuItemRoot }}
                  className={classes.menuItem}
                  value={"Delete"}
                >
                  <div className={classes.borderBottomDiv}>
                    <Typography variant="body2">Delete Member</Typography>
                  </div>
                </MenuItem>
              </Menu>
            </div>
          </ListItem>
         
        </>
      }
      <div className={classes.chatList}>
        {messages.map((message)=>{
          let showDate = moment(message.created_at).fromNow() != date;
          if(showDate ){
            date = moment(message.created_at).fromNow();
          }
          let cls = {}
          let senderName = message.sender.firstname + ' ' + message.sender.lastname
          if(message.sender.id == props.userInfo.id){
            cls = classes.owner
            senderName = "Me"
          }
          return (<>
            { showDate &&
              <div className={classes.date}>
                <span className={classes.dateTextContainer}>
                <span className={classes.dateText}>{ date }</span></span>
              </div>
            }
            
            <ListItem alignItems="flex-start" className={[classes.listItem,
              cls].join(' ')}>
                
              <ListItemText
                classes={{primary: classes.primary}}
                primary={senderName}
                secondary={chatMessage(message)}
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
                onSubmit={submitChat}
                required={true}
                autoComplete={false}
                onKeyDown={onKeyDown}
                disableUnderline={true}
              />
              <Typography className={classes.emojiContainer}>
                <img src={attach} className={classes.smiley} onClick={pickFile} />
                <input multiple accept="image/x-png,image/gif,image/jpeg,application/pdf,application/msword,
  application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
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
