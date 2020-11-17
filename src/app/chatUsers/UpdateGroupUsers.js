import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import UserIcon from "../../assets/images/chat/User.svg";

import Chat from "../chat/Chat";
import { Avatar, Badge, Grid, Input, ListItem } from "@material-ui/core";
import { ArrowForward, BluetoothSearching, CloseRounded } from "@material-ui/icons";
import search from '../../assets/images/chat/ic_search.svg'
import plus from '../../assets/images/chat/ic_plus.svg'
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import RenderUsers from "../chat/RenderGroupUser";
import Group from '../../assets/images/chat/group.png';
import GroupDetails from "../chat/GroupName";
import { toast, ToastContainer } from "react-toastify";
import { connect } from "react-redux";
import * as actions from '../../app/auth/store/actions';
import ChatService from "../chat/ChatService";
import closeIcon from '../../assets/images/chat/remove.svg'
import { onMessageListener } from "../../firebaseInit";
import { useHistory } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
const BACKEND_IMAGE_URL = process.env.REACT_APP_BACKEND_IMAGE_URL;

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: theme.palette.primary.main,
    // backgroundColor: theme.palette.grey[400],
    color: theme.palette.grey[200],
    padding: 10,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 3,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      fontSize: 20,
      content: '"\u002B"',
    },
    borderRadius: '50%'
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: "13px",
    marginTop: "15px",
    marginRight: "13px",
  },
  headingContainer: {
    display: "flex",
    alignItems: "center",
    "& div": {
      margin: "3px",
    },
    width: '100%'
  },
  headingText: {
    fontWeight: 900,
    fontSize: "0.875rem",
    fontStyle: "normal",
    color: theme.palette.common.bastille,
    width: '70%',
  },
  conversationContainer: {
    marginTop: "10px",
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    width: '100%',
    padding: 5
  },
  smiley:{
    height: 16,
    width: undefined,
    cursor: 'pointer',
  },
  emojiContainer: {
    height: '100%',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: 8,
    alignItems: 'flex-end',
    alignContent: 'flex-end',
    textAlign: 'right',
    width: '10%'
  },
  inputBorder: {
    width: '90%'
  },
  title:{
    width: '80%'
  },
  // addIcon: {
  //   height: 50,
  //   width: 50,
  //   borderRadius: 25,
  //   backgroundColor: '#7B72AF'
  // },
  addTaskIcon: {
    float: 'right',
    cursor: 'pointer',
    bottom: 0,
   
  },
  newGroup:{
    width: '30%',
    verticalAlign: 'middle',
    justifyContent: 'center',
    textAlign: 'right',
    color: theme.palette.primary.main,
  },
  borderBottom:{
    borderBottom: `1px solid ${theme.palette.grey[400]}`,
    width: '100%',
    minHeight: 50
  },
  closeBtn: {
    backgroundColor: theme.palette.background.default,
    float: 'right',
    position: 'absolute',
    right: 10,
    borderRadius: '50%',
    padding: 2,
    cursor: 'pointer'
  },
  nextBtn:{
    float: 'right',
    position: 'absolute',
    right: 15,
    cursor: 'pointer',
    color: theme.palette.primary.main,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  nextIcon:{
    backgroundColor: theme.palette.primary.main,
    borderRadius: '50%',
    padding: 0,
    fontSize: 10,
    cursor: 'pointer',
    float: 'left',
    width: 25,
    marginTop: -10,
    color: theme.palette.common.white,
    boxShadow: '0px 0px 0px 0px #fff',
    height: 25
  },
  nextText:{
    marginTop: 5,
  },
  groupUser:{
    flexDirection: 'row'
  },
  userContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: 'row',
    overflow: 'auto',
    '-ms-overflow-style': 'none',  /* Internet Explorer 10+ */
    scrollbarWidth: 'none' , /* Firefox */
    '& ::-webkit-scrollbar': {
      display: 'none'
    }
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    width: '100%',
    padding: 5,
    display: 'flex'
  },
  smiley:{
    height: 16,
    width: undefined,
    cursor: 'pointer',
  },
  emojiContainer: {
    height: '100%',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: 8,
    alignItems: 'flex-end',
    alignContent: 'flex-end',
    textAlign: 'right',
    width: '10%'
  },
  inputBorder: {
    width: '90%'
  },
  title:{
    width: '80%'
  },
  // addIcon: {
  //   height: 50,
  //   width: 50,
  //   borderRadius: 25,
  //   backgroundColor: '#7B72AF'
  // },
  addTaskIcon: {
    float: 'right',
    cursor: 'pointer',
    bottom: 0,
   
  },
  newGroup:{
    width: '30%',
    verticalAlign: 'middle',
    justifyContent: 'center',
    textAlign: 'right',
    color: theme.palette.primary.main,
  },
  borderBottom:{
    borderBottom: `1px solid ${theme.palette.grey[400]}`,
    width: '100%',
    minHeight: 50
  },
  closeBtn: {
    backgroundColor: theme.palette.background.default,
    float: 'right',
    position: 'absolute',
    right: 10,
    borderRadius: '50%',
    padding: 2,
    cursor: 'pointer'
  },
  nextBtn:{
    float: 'right',
    position: 'absolute',
    right: 15,
    top: 20,
    cursor: 'pointer',
    color: theme.palette.primary.main,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  nextIcon:{
    backgroundColor: theme.palette.primary.main,
    borderRadius: '50%',
    padding: 0,
    fontSize: 10,
    cursor: 'pointer',
    float: 'left',
    width: 25,
    color: theme.palette.common.white,
    boxShadow: '0px 0px 0px 0px #fff',
    height: 25,
    color: '#fff'
  },
  nextText:{
    marginLeft: 5,
    color: theme.palette.primary.main
  },
  groupIconContainer: {
    height: 35,
    width: 35,
    borderRadius: '50%',
    justifyContent: 'center',
    verticalAlign: 'middle',
    background: theme.palette.primary.main,
    cursor: 'pointer',
  },
  groupIcon:{
    height: 29,
    width: 29,
    top: '20%',
    left: '1.9%',
    position: 'absolute'
  },
  inputBoxContainer: {
    justifyContent: 'center',
    verticalAlign: 'middle',
    marginLeft: 10,
    marginTop: '1%'
  },
  fileInput:{
    opacity: 0,
    position: 'absolute'
  },
}));

const list = [
  {
    name: 'Akshay Srinivas',
    avatar: "/static/images/avatar/1.jpg",
    message: "Are you attending class today?",
    status: 'Online'
  },
  {
    name: 'Isha Roy',
    avatar: "/static/images/avatar/2.jpg",
    message: "Need project details. Share with me?",
    status: ''
  },
  {
    name: 'Cindy Baker',
    avatar: "/static/images/avatar/3.jpg",
    message: "Are you attending class today?",
    status: ''
  }
]

const UpdateGroup = (props) => {
  const classes = useStyles();
  const [filter, setFilter] = useState('')
  const [showContact, setShowContact] = useState(false)
  const [selectedUsers, setSelectedUsers] = useState([])
  const [newGroup, selectNewGroup] = useState(true)
  const [chat, setChat] = useState({})
  const [groupInfo, showGroupInfo] = useState(false)
  const [groupName, setGroupName] = useState('')
  const history = useHistory();
  const [groupImage, setGroupImage] = useState(null)
  const [displayImage, setDisplayImage] = useState(null)
  const fileRef = useRef()
 
  useEffect(()=>{
    console.log(props.group)
    let group = props.group;
    if(group == undefined){
      history.push('home')
    }
    else{
      setSelectedUsers(group.members)

      setShowContact(true)
      setGroupName(group.group.name)
    }
  }, [props.group])

  const fileSelectHandler = (event) => {
    // console.log(event.target.files)
    console.log(event.target.files[0])
    let file = event.target.files[0]
    setGroupImage(event.target.files[0])
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);
    reader.onloadend = function (e) {
      setDisplayImage(reader.result)
    };
    console.log(url) // Would see a path?
    event.target.value = null
  }
  const pickFile = () => {
    fileRef.current.click()
  }

  const addContactToGroup = (item) => {
    let users = selectedUsers;
    let index = users.filter(u=>{
      return u.id == item.id
    })
    if(index.length>0){
      return;
    }
    users.push(item)
    setSelectedUsers([...users])
  }

  const removeContactFromGroup = (item) => {
    let users = selectedUsers;
    let index = users.indexOf(item)
    users.splice(index, 1)
    setSelectedUsers([...users])
  }

  const setNewGroup = (value) => {
    selectNewGroup(value)
  }

  const closeGroup = () => {
    showGroupInfo(false)
    setNewGroup(false)
    setSelectedUsers([])
    setFilter('')
    history.push('chat/' + props.group.id)
  }

  if(groupInfo){
    return (
      <GroupDetails close={closeGroup} selectedUsers={selectedUsers} />
    )
  }

  const updateGroup = async() => {
    try {
      const token = localStorage.getItem('srmToken');
      // const selectedRole = props.selectedRole;
      let groupMembers = [];
      selectedUsers.map(m=>{
        groupMembers.push(m.id)
      })
      // console.log(groupMembers)
      let data = new FormData()
      data.append("name", groupName)
      data.append("members", JSON.stringify(groupMembers))
      data.append('chatid', props.group.id)
      data.append('groupid', props.group.group.id)
      data.append('displayImage', groupImage)
      // console.log(data)
      const response = await ChatService.updateGroup(
        data,
        token,
      );
      // console.log('Scroll response', response);
      
      if (response.status === 200) {
        // console.log('Chat', response);
        toast.success("Group Updated");
        history.push('chat/' + props.group.id)
        // const { data } = response
        // setChats(data.users)
        // setFilteredChats(data.users)
      }
    } catch (error) {
      // Error
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
      } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the 
          // browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
      } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
      }
      console.log(error.config);
    }
  }

  if(props.group == undefined){
    return <div></div>
  }
  let groupimg = encodeURI(props.group.group.image)
  return (
    <>
      <div className={classes.root}>
        <ListItem className={classes.inputContainer} alignItems="flex-start">
          <StyledBadge
            overlap="circle"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            onClick={pickFile}
            className={classes.groupIconContainer}
            variant={props.group.group.status = "dot"}
          >
            <Avatar alt={props.group.group.name} src={displayImage!=null? displayImage: groupimg!=null? `${BACKEND_IMAGE_URL}/${groupimg}`: Group} />
          </StyledBadge>
          <input accept="image/x-png,image/gif,image/jpeg" 
            className={classes.fileInput} id='groupImage' type="file" onChange={fileSelectHandler} ref={fileRef} />
          <Grid className={classes.inputBoxContainer}>
              <Input
                  id='groupName'
                  placeholder="Enter Group Name"
                  name='groupName'
                  value={groupName}
                  onChange={(event)=>setGroupName(event.target.value)}
                  className={classes.inputBorder}
                  required={true}
                  disableUnderline={true}
              />
          </Grid>
          <div onClick={updateGroup} className={classes.nextBtn}>
            <Typography>
              <div className={classes.nextIcon}>
                <ArrowForward />
              </div>
              <span className={classes.nextText}>Update</span>
            </Typography>
          </div>
        </ListItem>
        <div className={[classes.headingContainer, classes.groupUser, classes.borderBottom].join(' ')}>
          <div className={classes.userContainer}>
            {selectedUsers.map(user=>(
              <RenderUsers user={user} removeContact={removeContactFromGroup} />
            ))}
          </div>
        </div>
        
        <div className={classes.conversationContainer}>
          <ListItem className={classes.inputContainer} alignItems="flex-start">
            <Input
                id='search'
                placeholder="Search - Name/User ID"
                name='search'
                value={filter}
                onChange={(event)=>setFilter(event.target.value)}
                className={classes.inputBorder}
                required={true}
                autoComplete={false}
                onFocus={()=>setShowContact(true)}
                disableUnderline={true}
              />
            <Typography className={classes.emojiContainer}>
              <img onClick={()=>setShowContact(false)} src={showContact? closeIcon:search} className={classes.smiley} />
            </Typography>
          </ListItem>
          <Chat updateGroup={true} showContact={true} newGroup={true} selectContact={addContactToGroup} filter={filter} />
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.auth.userInfo,
    token: state.auth.token,
    isAuthenticated: state.auth.token !== null,
    selectedRole: state.auth.selectedRole,
    changeRole: state.auth.changeRole,
    notificationCount: state.notification.notificationCount,
    group: state.Chat.group
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeRoleStart: () => dispatch(actions.authInitiateRoleSelection()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateGroup);
