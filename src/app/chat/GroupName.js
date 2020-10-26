import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import UserIcon from "../../assets/images/chat/User.svg";

import Chat from "./Chat";
import { Badge, Grid, Input, ListItem } from "@material-ui/core";
import { ArrowForward, BluetoothSearching, Check, CheckBox, CheckBoxOutlined, CheckBoxRounded, CloseRounded } from "@material-ui/icons";
import search from '../../assets/images/chat/ic_search.svg'
import plus from '../../assets/images/chat/ic_plus.svg'
import RenderUsers from "./RenderGroupUser";
import Group from '../../assets/images/chat/group.png';
import tick from '../../assets/images/chat/tickIcon.svg';
import ChatService from "./ChatService";


const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: "13px",
    marginTop: "15px",
    marginRight: "13px",
    justifyContent: 'center',
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
    width: 20,
    color: theme.palette.common.white,
    boxShadow: '0px 0px 0px 0px #fff',
    height: 20,
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
    padding:5,
    justifyContent: 'center',
    verticalAlign: 'middle',
    background: theme.palette.primary.main,
  },
  groupIcon:{
    height: 29,
    width: 29,
    top: '23%',
    left: '4%',
    position: 'absolute'
  },
  inputBoxContainer: {
    justifyContent: 'center',
    verticalAlign: 'middle',
    marginLeft: 10,
    marginTop: '3%'
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

const GroupDetails = ({selectedUsers, close}) => {
  const classes = useStyles();
  const [members, setSelectedUsers] = useState([])
  const [groupInfo, showGroupInfo] = useState(false)
  const [groupName, setGroupName] = useState('')
  const [loader, setLoader] = useState(false)

  useEffect(()=>{
    setSelectedUsers(selectedUsers)
  }, [selectedUsers])

  const removeContactFromGroup = (item) => {
    let users = selectedUsers;
    let index = users.indexOf(item)
    users.splice(index, 1)
    setSelectedUsers([...users])
  }

  const createGroup = async () => {
    try {
      const token = localStorage.getItem('srmToken');
      // const selectedRole = props.selectedRole;
      let groupMembers = [];
      members.map(m=>{
        groupMembers.push(m.id)
      })
      let data = {
        name: groupName,
        members: groupMembers
      }
      console.log(JSON.stringify(data))
      setLoader(true)
      const response = await ChatService.createGroup(
        data,
        token,
      );
      setLoader(false)
      console.log('Scroll response', response);
      
      if (response.status === 200) {
        console.log('Group', response);
        // const { data } = response
        // setChats(data.users)
        // setFilteredChats(data.users)
        close()
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={classes.root}>
          <ListItem className={classes.inputContainer} alignItems="flex-start">
            <div className={classes.groupIconContainer}>
                <img
                    src={Group}
                    alt='Group'
                    className={classes.groupIcon}
                />
            </div>
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
            <Typography onClick={createGroup} className={[classes.inputBoxContainer]} style={{marginLeft: 0, marginTop: '5%', cursor: 'pointer',
                textAlign: 'right'}}>
                <img src={tick} className={classes.nextIcon} />
                <span className={classes.nextText}>{' '} {!loader?'Done':<i className="fa fa-spin fa-spinner"></i>}</span>
            </Typography>
          </ListItem>
        
        <Grid container className={classes.conversationContainer}>
            {selectedUsers.map(user=>(
                <Grid xs={4}>
                  <RenderUsers user={user} removeContact={removeContactFromGroup} />
                </Grid>
            ))}
        </Grid>
      </div>
    </>
  );
};

export default GroupDetails;
