import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import UserIcon from "../../assets/images/chat/User.svg";

import Chat from "./Chat";
import { Badge, Input, ListItem } from "@material-ui/core";
import { BluetoothSearching } from "@material-ui/icons";
import search from '../../assets/images/chat/ic_search.svg'
import plus from '../../assets/images/chat/ic_plus.svg'
import CloseRounded from '@material-ui/icons/CloseRounded';

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

