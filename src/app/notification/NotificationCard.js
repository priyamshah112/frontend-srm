import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {
  IconButton,
  Typography,
  makeStyles,
  Grid,
  Button,
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";

import ReadIcon from "../../assets/images/notifications/read.svg";
import UnReadIcon from "../../assets/images/notifications/unread.svg";
import DoneIcon from "../../assets/images/notifications/Done.svg";
import WarningIcon from "../../assets/images/notifications/Warning.svg";

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

const NotificationCard = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.cardHeader}
        action={
          <>
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
              >
                <div className={classes.borderBottomDiv}>Archive</div>
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                disableGutters
                classes={{ root: classes.menuItemRoot }}
                className={classes.menuItem}
              >
                <div className={classes.borderBottomDiv}>Delete</div>
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                disableGutters
                classes={{ root: classes.menuItemRoot }}
                className={classes.menuItem}
              >
                <div className={classes.borderBottomDiv}>Mark As Read</div>
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                disableGutters
                classes={{ root: classes.menuItemRoot }}
                className={classes.menuItem}
              >
                <div className={classes.borderBottomLastDiv}>
                  Mark As Unread
                </div>
              </MenuItem>
            </Menu>
          </>
        }
        title={
          <>
            {props.notification.status === "read" ||
            props.notification.status === "archived" ? (
              <Typography
                className={classes.cardTitle}
                style={{ color: theme.palette.common.lightFont }}
              >
                {props.notification.data.title}
              </Typography>
            ) : (
              <Typography className={classes.cardTitle}>
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
            {props.notification.status === "unread" ? (
              <img src={UnReadIcon} alt="unread" />
            ) : props.notification.status === "read" ? (
              <img src={ReadIcon} alt="read" />
            ) : (
              ""
            )}
          </Grid>
        </Grid>
      </CardContent>
      {props.notification.type === "payment" ? (
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

export default NotificationCard;
