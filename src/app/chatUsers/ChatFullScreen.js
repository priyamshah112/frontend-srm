import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import SingleChat from "./SingleChat";
import { useParams } from "react-router-dom";
import ChatService from "../chat/ChatService";
import { connect } from "react-redux";
import * as actions from '../../app/auth/store/actions';
import * as chatactions from '../../app/chatUsers/store/action';

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
  },
}));

function ChatFullScreen(props) {
  const classes = useStyles();
  const [chat, setChat] = useState(null)
  const { id } = useParams();
  useEffect(()=>{
    fetchChat()
    
  }, [])

  useEffect(()=>{
    // console.log(props)
    fetchChat()
  }, [props])



  const fetchChat = async() => {
    try {
      const token = localStorage.getItem('srmToken');
      // const selectedRole = props.selectedRole;
      const response = await ChatService.fetchChat(
        id,
        token,
      );
      // console.log('Scroll response', response);
      if (response.status === 200) {
        // console.log('Chat', response);
        const { data } = response
        setChat(data.chat)
      }
    } catch (error) {
      console.log(error);
    }
  }
  if(chat == null){
    return (<div></div>);
  }
  return (
    <SingleChat props={props} fullScreen={true} chat={chat} />
  );
}
const mapStateToProps = (state) => {
  return {
    userInfo: state.auth.userInfo,
    token: state.auth.token,
    isAuthenticated: state.auth.token !== null,
    selectedRole: state.auth.selectedRole,
    changeRole: state.auth.changeRole,
    notificationCount: state.notification.notificationCount,
    chat: state.Chat.chat
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeRoleStart: () => dispatch(actions.authInitiateRoleSelection()),
    setChatGroup: (group) => dispatch(chatactions.setGroup(group))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatFullScreen);
