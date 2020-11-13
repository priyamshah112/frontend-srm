import React, { useState, useEffect } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";
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

import * as actions from "./store/action";
import NotificationService from "./NotificationService";

import ReadIcon from "../../assets/images/notifications/read.svg";
import UnReadIcon from "../../assets/images/notifications/unread.svg";
import DoneIcon from "../../assets/images/notifications/Done.svg";
import WarningIcon from "../../assets/images/notifications/Warning.svg";
import BackIcon from "../../assets/images/Back.svg";

const useStyles = makeStyles((theme) => ({
  detailsContainer: {
    overflow: "auto",
    height: "100%",
    padding: "0",
    margin: "0",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  card: {
    boxShadow: "none",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    borderRadius: "10px",
    margin: "20px",
  },
  mainHeader: {
    width: "100%",
    paddingTop: "15px",
  },
  mainHeadertext: {
    width: "100%",
    textAlign: "center",
  },
  backImg: {
    paddingLeft: "15px",
    paddingTop: "5px",
    cursor: "pointer",
  },
  cardHeader: {
    padding: "10px 20px 0 20px",
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
    paddingBottom:"16px",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  cardActions: {
    padding: "0 20px 20px 20px",
  },
  cardContent: {
    padding: "0px 20px 20px 20px",
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
    paddingBottom: "6px"
  },
  descriptionContent: {
    color: `${theme.palette.common.lightFont}`,
  },
  readClass: {
    textAlign: "right",
  },
  payBtn: {
    width: "113px",
    height: "36px",
  },
}));

const Details = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const { id } = useParams();
  const query = new URLSearchParams(useLocation().search);

  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const [status, setStatus] = useState("read");
  const [isLoading, setIsLoading] = useState(true);
  const [details, setDetails] = useState({});

  async function getNewsDetails(newsId) {
    try {
      const token = localStorage.getItem("srmToken");

      const response = await NotificationService.fetchNotificationDetails(
        id,
        token
      );
      console.log(response);
      if (response.status === 200) {
        setDetails(response.data.data);
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    getNewsDetails(id);
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async (event) => {
    const updatedStatus = event.currentTarget.getAttribute("value");
    setAnchorEl(null);

    try {
      const token = localStorage.getItem("srmToken");
      const response = await NotificationService.updateStatus(
        id,
        updatedStatus,
        token
      );
      if (response.status === 200) {
        console.log("priyam")
        console.log(status)
        if (updatedStatus === "read" && status !== "read") {
          if (props.notificationCount !== 0) {
            props.subNotificationCount();
          }
          setStatus("read");
        } else if (updatedStatus === "unread" && status !== "unread") {
          props.addNotificationCount();
          setStatus("unread");
        }else if (updatedStatus === "deleted" && status !== "deleted") {
          if (props.notificationCount !== 0) {
            props.subNotificationCount();
          }
          props.handleRemoveNotifcation(props.notification.id);
          setStatus("deleted");          
      }  
      else if (updatedStatus === "archive" && status !== "archive") {
        if (props.notificationCount !== 0) {
          props.subNotificationCount();
        }
        props.handleRemoveNotifcation(props.notification.id);
        setStatus("archive");        
        }          
      else {
        console.log()
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className={classes.detailsContainer}>
      {!isLoading ? (
        <Card className={classes.card}>
          <div className={classes.mainHeader}>
            <Grid container>
              <Grid item xs={1}>
                <img
                  src={BackIcon}
                  alt="Back"
                  className={classes.backImg}
                  onClick={() => {
                    history.push("/notifications");
                  }}
                />
              </Grid>
              <Grid item xs={10}>
                <div className={classes.mainHeadertext}>
                  <Typography variant="h6">Notification Details</Typography>
                </div>
              </Grid>
              <Grid item xs={1}></Grid>
            </Grid>
          </div>
          <CardHeader
            className={classes.cardHeader}
            action={
              <>
                {!query.get("cby") ? (
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
                      classes={{
                        paper: classes.menuContainer,
                        list: classes.menuList,
                      }}
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
                        value={"archive"}
                      >
                        <div className={classes.borderBottomDiv}>Archive</div>
                      </MenuItem>
                      <MenuItem
                        onClick={handleClose}
                        disableGutters
                        classes={{ root: classes.menuItemRoot }}
                        className={classes.menuItem}
                        value={"deleted"}
                      >
                        <div className={classes.borderBottomDiv}>Delete</div>
                      </MenuItem>
                      <MenuItem
                        onClick={handleClose}
                        disableGutters
                        classes={{ root: classes.menuItemRoot }}
                        className={classes.menuItem}
                        value={"read"}
                      >
                        <div className={classes.borderBottomDiv}>
                          Mark As Read
                        </div>
                      </MenuItem>
                      <MenuItem
                        onClick={handleClose}
                        disableGutters
                        classes={{ root: classes.menuItemRoot }}
                        className={classes.menuItem}
                        value={"unread"}
                      >
                        <div className={classes.borderBottomLastDiv}>
                          Mark As Unread
                        </div>
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  ""
                )}
              </>
            }
            title={
              <>
                {!query.get("cby") ? (
                  <Typography className={classes.cardTitle}>
                    {details.notification_lists.data.title}
                  </Typography>
                ) : details.notification_lists.data.title ? (
                  <Typography className={classes.cardTitle}>
                    {details.notification_lists.data.title}
                  </Typography>
                ) : (
                  <Typography className={classes.cardTitle}>{"N/A"}</Typography>
                )}
              </>
            }
          />
          <CardContent classes={{ root: classes.cardContent }}>
            <Grid container direction="row">
              <Grid item xs={11}>
                {!query.get("cby") ? (
                  <Typography className={classes.contentStyle}>
                    {details.notification_lists.data.summary}
                  </Typography>
                ) : details.notification_lists.data.summary ? (
                  <Typography className={classes.contentStyle}>
                    {details.notification_lists.data.summary}
                  </Typography>
                ) : (
                  <Typography className={classes.cardTitle}>{"N/A"}</Typography>
                )}
              </Grid>
              {!query.get("cby") ? (
                <Grid item xs={1} className={classes.readClass}>
                  {status === "unread" ? (
                    <img src={UnReadIcon} alt="unread" />
                  ) : status === "read" ? (
                    <img src={ReadIcon} alt="read" />
                  ) : (
                    ""
                  )}
                </Grid>
              ) : (
                ""
              )}
            </Grid>
            {/* <hr style={{ marginBottom: "0px", color: "#8E8E93" }} /> */}
            <Grid container direction="row">
              {details.notification_lists.data.main_content ? (
                <div
                  className={`${classes.descriptionContent} ${classes.announcementText}`}
                  dangerouslySetInnerHTML={{
                    __html: details.notification_lists.data.main_content,
                  }}
                />
              ) : (
                <Typography className={classes.title}>
                  {"No description provided"}
                </Typography>
              )}
            </Grid>
          </CardContent>
        </Card>
      ) : (
        ""
      )}
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Details);
