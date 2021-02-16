import "date-fns";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import AddIcon from "../../assets/images/Filled Add.svg";
import GreenTick from "../../assets/images/diary/GreenTick.svg";
import GrayTick from "../../assets/images/diary/GrayTick.svg";
import MenuItem from "@material-ui/core/MenuItem";
import {
  IconButton,
  Typography,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { individualDiaryPost } from "../redux/actions/attendence.action";
import { individualDiaryPostParent } from "../redux/actions/attendence.action";
import { byTeacherDiary } from "../redux/actions/attendence.action";
import { byParentDiary } from "../redux/actions/attendence.action";
import { forParentDiary } from "../redux/actions/attendence.action";
import { forTeacherDiary } from "../redux/actions/attendence.action";
import { diaryDelete } from "../redux/actions/attendence.action";
import { putAcknowledgement } from "../redux/actions/attendence.action";
import { putAcknowledgementParent } from "../redux/actions/attendence.action";
import BackdropLoader from "../common/ui/backdropLoader/BackdropLoader";
import EditIcon from "../../assets/images/Edit.svg";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import * as moment from "moment";
import { SnackBarRef } from "../../SnackBar";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import LinearProgress from "@material-ui/core/LinearProgress";
import InfoIcon from "../../assets/images/diary/library/Info.svg";
import Popover from "@material-ui/core/Popover";
import ReadIcon from "../../assets/images/notifications/read.svg";
import UnReadIcon from "../../assets/images/notifications/unread.svg";

const useStyles = makeStyles((theme) => ({
  popoverMeassage: {
    display: "flex",
    fontFamily: "Avenir medium",
    fontSize: 20,
  },
  popoverTextName: {
    fontFamily: "Avenir medium",
    fontSize: 18,
  },
  popoverTextDate: {
    fontFamily: "Avenir medium",
    fontSize: 18,
    marginLeft: "30px",
  },
  popover: {
    pointerEvents: "none",
  },
  paper: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  datePicker: {
    width: "25%",
    paddingRight: "10px",
  },
  sectionContainer: {
    height: "100%",
    width: "100%",
    paddingBottom: "30px",
  },

  header: {
    paddingRight: "20px",
    paddingLeft: "20px",
    // paddingTop: "10px",
    // textAlign: "right",
  },
  header2: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    // paddingRight: '15px',
    // paddingLeft: '15px',
    // paddingTop: '10px',
    justifyContent: "space-between",
    textAlign: "left",
  },
  cardBoxPadding: {
    padding: "0px 24px 24px 24px",
    [theme.breakpoints.down("sm")]: {
      padding: "16px",
    },
  },
  addNew: {
    color: theme.palette.common.deluge,

    marginTop: "15px",
    // marginRight: "15px",
    cursor: "pointer",
    "& .new": {
      float: "right",
      fontSize: "14px",
      padding: "5px",
    },
    "& img": {
      margin: "5px",
      height: "20px",
      cursor: "pointer",
    },
  },
  loading: {
    width: "100%",
    textAlign: "center",
    paddingTop: "8px",
    fontSize: "20px",
  },
  fieldStyle: {
    width: "180px",
    marginleft: "15px",
    marginTop: "15px",
    marginRight: "15px",
    fontFamily: "Avenir Book",
    fontSize: " 1rem",
    "& .MuiInput-underline:before": {
      borderBottom: "2px solid #eaeaea",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottom: "2px solid #7B72AF",
      transitionProperty: "border-bottom-color",
      transitionDuration: "500ms",
      transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
  },
  menuList: {
    width: "100% !important",
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
  card: {
    // width: "100%",
    marginTop: "20px",
  },
  cardForTeacher: {
    margin: "20px",
  },
  cardContent: {
    paddingBottom: "15px !important",
    overflow: "auto",
    // margin: '10px',
  },
  textAlignRight: {
    textAlign: "right",
    color: "#AEAEB2",
    fontSize: "0.85rem",
  },
  labelText: {
    fontStyle: "normal",
    color: "#8E8E93",
    fontSize: "14px !important",
    fontFamily: "Avenir medium",
  },
  typography: {
    marginTop: "5px",
    cursor: "pointer",
  },
  span: {
    textTransform: "capitalize",
  },
  imgDiv: {
    display: "flex",
    justifyContent: "flex-end",
    margin: "-2px 0",
    transform: "translateY(5px)",
    color: "#AEAEB2",
  },
  editBtn: {
    width: "19px",
    height: "19px",
    transform: "translateY(4px)",
    cursor: "pointer",
    marginTop: "-3px",
  },
  Del_img: {
    cursor: "pointer",
    marginLeft: "10px",
  },
  circularProgress: {
    position: "absolute",
    left: "46%",
    top: "120px",
  },
  acknowledgement: {
    cursor: "pointer",
  },
  message: {
    textAlign: "center",
    fontSize: 14,
    fontFamily: "Avenir Book",
    padding: "20px",
  },
}));

const TabBarSection = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const student_id = id;
  console.log("student_id", student_id);
  const selectedRole = props.selectedRole;
  const [menuVal, setMenuVal] = useState("general");
  const [open, setOpen] = useState(false);
  const [delId, setDelId] = useState("");
  const [ackLoading, setAckLoading] = useState(false);
  const [studentId, setStudentId] = useState("");
  const [item, setItem] = useState("");
  const token = localStorage.getItem("srmToken");
  const {
    postLoading,
    byTeacherData,
    byTeacherLoading,
    forTeacherData,
    forTeacherLoading,
    deleteLoading,
  } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const byData = byTeacherData || [];
  const forData = forTeacherData || [];
  console.log("byTeacherData", byTeacherData);

  useEffect(() => {
    const myStorage = window.localStorage;
    const srmSelectedChild = myStorage.srmSelected_Child;
    const srmChild = myStorage.srmChild_dict;
    var srmChildArray = new Function("return [" + srmChild + "];")();
    const stuId = srmChildArray[0][srmSelectedChild].userDetails.id;
    setStudentId(stuId);
  }, [studentId]);

  const handlePopoverOpen = (event, i) => {
    setAnchorEl(event.currentTarget);
    setItem(i);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
    setItem("");
  };
  const popOpen = Boolean(anchorEl);

  const handleNew = () => {
    fetchPostData();
  };
  const handleMenuChange = (e) => {
    setMenuVal(e.target.value);
  };
  const handleSuccess = (result) => {
    if (selectedRole === "parent") {
      history.push(`/diary/edit/${result.data.id}`);
    } else {
      history.push(`/diary/${student_id}/edit/${result.data.id}`);
    }
  };
  const fetchPostData = () => {
    if (selectedRole === "parent") {
      props.individualDiaryPostParent(token, handleSuccess);
    }
    props.individualDiaryPost(handleSuccess);
  };
  const fetchData = () => {
    const myStorage = window.localStorage;
    const srmSelectedChild = myStorage.srmSelected_Child;
    const srmChild = myStorage.srmChild_dict;
    var srmChildArray = new Function("return [" + srmChild + "];")();
    const stuId = srmChildArray[0][srmSelectedChild].userDetails.id;
    if (selectedRole === "parent") {
      props.byParentDiary(menuVal, selectedRole, stuId, token);
    } else {
      props.byTeacherDiary(student_id, menuVal, selectedRole);
    }
  };
  useEffect(() => {
    fetchData();
  }, [menuVal]);
  const fetchDataForTeacher = () => {
    const myStorage = window.localStorage;
    const srmSelectedChild = myStorage.srmSelected_Child;
    const srmChild = myStorage.srmChild_dict;
    var srmChildArray = new Function("return [" + srmChild + "];")();
    const stuId = srmChildArray[0][srmSelectedChild].userDetails.id;
    if (selectedRole === "parent") {
      props.forParentDiary(selectedRole, stuId, token);
    } else {
      props.forTeacherDiary(student_id, selectedRole);
    }
  };
  useEffect(() => {
    fetchDataForTeacher();
  }, []);

  const handleDeleteSuccess = () => {
    SnackBarRef.open("", true, "Diary deleted successfully");
    fetchData();
    setOpen(false);
  };
  const handleDeleteFail = (error) => {
    console.log("error", error);
    if (error) {
      SnackBarRef.open("", false, error.message);
    }
  };
  const handleClickDel = () => {
    props.diaryDelete(delId, handleDeleteSuccess, handleDeleteFail);
  };
  const handleOpen = (id) => {
    setOpen(true);
    setDelId(id);
  };
  const handleCloseNO = () => {
    setOpen(false);
  };
  const onSuccess = () => {
    setAckLoading(false);
    if (selectedRole === "parent") {
      props.forParentDiary(selectedRole, studentId);
    } else {
      props.forTeacherDiary(student_id, selectedRole);
    }
  };
  const handleAck = (putId) => {
    setAckLoading(putId);
    if (selectedRole === "parent") {
      props.putAcknowledgementParent(putId, selectedRole, token);
    } else {
      props.putAcknowledgement(putId, selectedRole, onSuccess);
    }
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleCloseNO}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete?"}
        </DialogTitle>
        {deleteLoading ? (
          <LinearProgress />
        ) : (
          <DialogActions>
            <Button onClick={handleCloseNO} color="primary" autoFocus>
              NO
            </Button>
            <Button onClick={handleClickDel} color="primary">
              YES
            </Button>
          </DialogActions>
        )}
      </Dialog>
      {postLoading ? <BackdropLoader open={postLoading} /> : ""}
      <div className={classes.sectionContainer}>
        {props.createdBy ? (
          <div className={classes.header}>
            {selectedRole === "teacher" ||
            selectedRole === "admin" ||
            selectedRole === "parent" ? (
              <div className={classes.header2}>
                <div style={{ zIndex: "1" }}>
                  <FormControl className={classes.fieldStyle}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={menuVal}
                      onChange={handleMenuChange}
                      classes={{
                        paper: classes.menuContainer,
                        list: classes.menuList,
                      }}
                    >
                      <MenuItem value="general">General Diary Entry</MenuItem>
                      {props.selectedRole === "teacher" ||
                      props.selectedRole === "admin" ? (
                        <MenuItem value="teacher">Teacher Observation</MenuItem>
                      ) : (
                        ""
                      )}
                      {props.selectedRole === "teacher" ||
                      props.selectedRole === "admin" ? (
                        <MenuItem value="late">Late Coming</MenuItem>
                      ) : (
                        ""
                      )}
                    </Select>
                  </FormControl>
                </div>
                <div className={classes.addNew} onClick={handleNew}>
                  <img src={AddIcon} alt="add" />
                  <Typography className="new">New</Typography>
                </div>
              </div>
            ) : (
              ""
            )}
            {byTeacherLoading ? (
              <div className={classes.circularProgress}>
                <CircularProgress />
              </div>
            ) : !byData[0] ? (
              <Typography className={classes.message}>
                No diary record available yet!
              </Typography>
            ) : (
              byData.map((item, index) => {
                return (
                  <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                      <Grid container>
                        <Grid item xs={8}>
                          <span>
                            {item.title ? (
                              <div style={{ display: "flex" }}>
                                <Typography variant="body1">
                                  {item.title}
                                </Typography>
                                {item.status === "published" ? (
                                  <div>
                                    <Typography
                                      aria-owns={
                                        popOpen
                                          ? "mouse-over-popover"
                                          : undefined
                                      }
                                      aria-haspopup="true"
                                      onMouseEnter={(e) =>
                                        handlePopoverOpen(e, item)
                                      }
                                      onMouseLeave={handlePopoverClose}
                                    >
                                      <img
                                        src={InfoIcon}
                                        style={{ marginLeft: "10px" }}
                                        className={classes.editBtn}
                                        // onClick={() =>
                                        // handleClick(item.return_status, item.end_date)
                                        // }
                                      />
                                    </Typography>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                            ) : (
                              <Typography variant="body1">N/A</Typography>
                            )}
                          </span>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography
                            className={`${classes.textAlignRight} ${classes.labelText}`}
                            variant="body2"
                          >
                            {moment(item.created_at).format("DD MMM YY")}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid
                          item
                          xs={8}
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            if (
                              props.selectedRole === "parent" ||
                              props.selectedRole === "student"
                            ) {
                              history.push(`/diary/diary-details/${item.id}`);
                            } else {
                              history.push(
                                `/diary/${student_id}/diary-details/${item.id}`
                              );
                            }
                          }}
                        >
                          <Typography
                            className={classes.labelText}
                            variant="body2"
                          >
                            <Typography
                              className={`${classes.typography}`}
                              variant="body2"
                            ></Typography>
                            Click here to check more details.
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography
                            className={`${classes.labelText} ${classes.textAlignRight}`}
                            variant="body2"
                          >
                            <span className={`${classes.span}`}>
                              {item.status}
                            </span>
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid item xs={12} className={classes.imgGrid}>
                          <Typography> </Typography>
                          {item.status !== "published" ? (
                            <div className={`${classes.imgDiv}`}>
                              <img
                                src={EditIcon}
                                className={classes.editBtn}
                                onClick={() => {
                                  if (
                                    props.selectedRole === "teacher" ||
                                    props.selectedRole === "admin"
                                  ) {
                                    history.push(
                                      `/diary/${student_id}/edit/${item.id}`
                                    );
                                  } else {
                                    history.push(`/diary/edit/${item.id}`);
                                  }
                                }}
                              />
                              <div
                                className={classes.Del_img}
                                onClick={() => handleOpen(item.id)}
                              >
                                <DeleteOutlineOutlinedIcon
                                  fontSize={"medium"}
                                />
                              </div>
                            </div>
                          ) : (
                            <div className={`${classes.imgDiv}`}>
                              {item.acknowledgement_accept_by ? (
                                <img
                                  style={{ textAlign: "right" }}
                                  src={GreenTick}
                                />
                              ) : item.updated_by ? (
                                <img
                                  style={{ textAlign: "right" }}
                                  src={ReadIcon}
                                />
                              ) : (
                                <img
                                  style={{ textAlign: "right" }}
                                  src={UnReadIcon}
                                />
                              )}
                            </div>
                          )}
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        ) : forTeacherLoading ? (
          <div className={classes.circularProgress}>
            <CircularProgress />
          </div>
        ) : !forData[0] ? (
          <Typography className={classes.message}>
            No diary record available yet!
          </Typography>
        ) : (
          forData.map((item) => (
            <Card className={classes.cardForTeacher}>
              <CardContent className={classes.cardContent}>
                <Grid container>
                  <Grid item xs={8}>
                    <span>
                      {item.title ? (
                        <Typography variant="body1">{item.title}</Typography>
                      ) : (
                        <Typography variant="body1">N/A</Typography>
                      )}
                    </span>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography
                      className={`${classes.textAlignRight} ${classes.labelText}`}
                      variant="body2"
                    >
                      {/* created_at: */}
                      {moment(item.created_at).format("DD MMM YY")}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid
                    item
                    xs={8}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      if (
                        props.selectedRole === "parent" ||
                        props.selectedRole === "student"
                      ) {
                        history.push(`/diary/diary-details/${item.id}`);
                      } else {
                        history.push(
                          `/diary/${student_id}/diary-details/${item.id}`
                        );
                      }
                    }}
                  >
                    <Typography className={classes.labelText} variant="body2">
                      <Typography
                        className={`${classes.typography}`}
                        variant="body2"
                      ></Typography>
                      Click here to check more details.
                    </Typography>
                  </Grid>
                  <Grid item xs={4} style={{ textAlign: "right" }}>
                    {ackLoading === item.id ? (
                      <CircularProgress size={30} />
                    ) : item.acknowledgement === "1" &&
                      !item.acknowledgement_accept_by ? (
                      <div
                        className={`${classes.imgDiv} ${classes.acknowledgement}`}
                        onClick={() => handleAck(item.id)}
                      >
                        <img src={GrayTick} />
                      </div>
                    ) : item.acknowledgement_accept_by ? (
                      <img src={GreenTick} />
                    ) : (
                      ""
                    )}
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} className={classes.imgGrid}></Grid>
                </Grid>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={popOpen}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        {item.acknowledgement_accept_by === null && item.updated_by === null ? (
          <Typography>No acknowledgement given yet!</Typography>
        ) : (
          <div className={classes.popoverMeassage}>
            <Typography className={classes.popoverTextName}>
              {item.acknowledgement_accept_by
                ? item.acknowledgement_accept_by
                : item.updated_by
                ? item.updated_by.firstname
                : ""}
            </Typography>
            <Typography className={classes.popoverTextDate}>
              Seen at:{" "}
              {item.acknowledgement_accept_by
                ? moment(item.acknowledgement_seen).format("DD MMM, hh:mm A")
                : item.updated_by
                ? moment(item.updated_by.updated_at).format("DD MMM, hh:mm A")
                : ""}
            </Typography>
          </div>
        )}
      </Popover>
    </>
  );
};

const mapStateToProps = (state) => {
  const {
    individualDiaryPostLoading,
    byTeacherDiary,
    byTeacherDiaryLoading,
    forTeacherDiary,
    forTeacherDiaryLoading,
    diaryDeleteLoading,
    putAcknowledgement,
  } = state.Attendence;
  return {
    byTeacherData: byTeacherDiary,
    byTeacherLoading: byTeacherDiaryLoading,
    forTeacherData: forTeacherDiary,
    forTeacherLoading: forTeacherDiaryLoading,
    postLoading: individualDiaryPostLoading,
    deleteLoading: diaryDeleteLoading,
    ackLoading: putAcknowledgement,
    selectedRole: state.auth.selectedRole,
  };
};

export default connect(mapStateToProps, {
  individualDiaryPost,
  byTeacherDiary,
  forTeacherDiary,
  forParentDiary,
  diaryDelete,
  byParentDiary,
  putAcknowledgement,
  putAcknowledgementParent,
  individualDiaryPostParent,
})(TabBarSection);
