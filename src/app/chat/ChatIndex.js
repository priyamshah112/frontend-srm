import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import UserIcon from "../../assets/images/chat/User.svg";

import Chat from "./Chat";
import { Badge, Input, ListItem } from "@material-ui/core";
import { BluetoothSearching } from "@material-ui/icons";
import search from '../../assets/images/chat/ic_search.svg'
import plus from '../../assets/images/chat/ic_plus.svg'
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';



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
    color: theme.palette.primary.main
  }
}));

const ChatIndex = (props) => {
  const classes = useStyles();
  const [filter, setFilter] = useState('')
  return (
    <>
      <div className={classes.root}>
        <div className={classes.headingContainer}>
          <div>
            <img src={UserIcon} alt="User" />
          </div>
          <Typography className={classes.headingText}>
            {' '} Chats
            <AddCircleRoundedIcon
              color='primary'
              className={classes.addTaskIcon}
            />
          </Typography>
          <Typography className={[classes.headingText, classes.newGroup].join(' ')}>
            New Group
          </Typography>
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
                disableUnderline={true}
              />
            <Typography className={classes.emojiContainer}>
              <img src={search} className={classes.smiley} />
            </Typography>
          </ListItem>
          <Chat filter={filter} />
        </div>
      </div>
    </>
  );
};

export default ChatIndex;
