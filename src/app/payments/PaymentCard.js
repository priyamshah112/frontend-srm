import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import {
  IconButton,
  Typography,
  makeStyles,
  Grid,
  Button,
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";

import * as actions from "./store/action";
import NotificationService from "./NotificationService";

import GreenTick from "../../assets/images/greenTick.svg";

const useStyles = makeStyles((theme) => ({
  card: {
    boxShadow: "none",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    borderRadius: "10px",
    marginTop: "20px",
  },
  cardHeader: {
    padding: "15px 20px 0 20px",
  },
  iconButtonRoot: {
    padding: "8px",
  },
  titleIconSpan: {
    marginRight: "8px",
  },
  titleIcon: {
    transform: "translateY(3px)",
  },
  cardTitle: {
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 500,
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  cardActions: {
    padding: "0 20px 20px 20px",
  },
  cardContent: {
    padding: "5px 20px 20px 20px",
    "&:last-child": {
      paddingBottom: "20px",
    },
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
  contentStyle: {
    color: `${theme.palette.common.lightFont}`,
    fontSize: "14px",
    fontStyle: "normal",
  },
  readClass: {
    textAlign: "right",
  },
  payBtn: {
    width: "113px",
    height: "36px",
  },
}));

const PaymentCard = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const [status, setStatus] = useState(props.notification.status);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async (event) => {
    const updatedStatus = event.currentTarget.getAttribute("value");
    setAnchorEl(null);

    try {
      const token = localStorage.getItem("srmToken");
      const response = await NotificationService.updateStatus(
        props.notification.notify_status_id,
        updatedStatus,
        token
      );
      console.log(response);
      if (response.status === 200) {
        if (updatedStatus === "read") {
          if (props.notificationCount !== 0) {
            props.subNotificationCount();
          }
          setStatus("read");
        } else if (updatedStatus === "unread") {
          props.addNotificationCount();
          setStatus("unread");
        } else {
          props.subNotificationCount();
          props.handleRemoveNotifcation(props.notification.id);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const hanldeDetails = async () => {
    try {
      if (props.notification.status === "unread") {
        const token = localStorage.getItem("srmToken");
        const response = await NotificationService.updateStatus(
          props.notification.notify_status_id,
          "read",
          token
        );
      }
      history.push(`/notifications/${props.notification.id}`);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.cardHeader}
        action={
          <>
            <img src={GreenTick} alt="done" />
          </>
        }
        title={
          <>
            {status === "read" || status === "archived" ? (
              <Typography
                className={classes.cardTitle}
                style={{ color: theme.palette.common.lightFont }}
                onClick={hanldeDetails}
              >
                {props.notification.data.title}
              </Typography>
            ) : (
              <Typography className={classes.cardTitle} onClick={hanldeDetails}>
                {props.notification.data.title}
              </Typography>
            )}
          </>
        }
      />
      <CardContent classes={{ root: classes.cardContent }}>
        <Grid container>
          <Grid item xs={11}>
            <Typography className={classes.contentStyle}>
              {props.notification.data.summary}
            </Typography>
          </Grid>
          <Grid item xs={1} className={classes.readClass}>
            {status === "unread" ? (
              <img src={UnReadIcon} alt="unread" />
            ) : status === "read" ? (
              <img src={ReadIcon} alt="read" />
            ) : (
              ""
            )}
          </Grid>
        </Grid>
      </CardContent>
      {props.notification.type === "payment" &&
      props.selectedRole === "parent" ? (
        <CardActions classes={{ root: classes.cardActions }}>
          <Button
            variant="contained"
            color="primary"
            className={classes.payBtn}
            disableElevation
          >
            Pay
          </Button>
        </CardActions>
      ) : (
        ""
      )}
    </Card>
  );
};
const mapStateToProps = (state) => {
  return {
    selectedRole: state.auth.selectedRole,
    token: state.auth.token,
    notificationCount: state.notification.notificationCount,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addNotificationCount: () => dispatch(actions.addNotificationCount()),
    subNotificationCount: () => dispatch(actions.subNotificationCount()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentCard);
