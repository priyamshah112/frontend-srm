import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import Notsubscribred from "./not_sub";
import Subscribred from "./subscribed";
import { Redirect, Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    backgroundColor: theme.palette.mainBackground,
    height: "100%",
    marign: "0",
    padding: "0",
    overflowY: "auto",
  },
}));

const Transport = (props) => {
  const classes = useStyles();
  const [issubscribred, setissubscribred] = useState(false);
  console.log(props.selectedRole);
  const event_issubscribred=(state)=>{
    setissubscribred(state);
  };

  return (
    <div className={classes.container}>
      {props.selectedRole === "teacher" || props.selectedRole === "parent" ? 
      (
        issubscribred ? (
          <Subscribred handle={event_issubscribred}/>
            ) : (
            <Notsubscribred handle={event_issubscribred} />

            )
      )
      :
      (
        <Redirect to='/home' />
      )
      }
            {}
        
        <div>
            <div/>
        </div>
    </div>

  );
};

const mapStateToProps = (state) => {
  return {
    selectedRole: state.auth.selectedRole,
  };
};

export default connect(mapStateToProps)(Transport);
