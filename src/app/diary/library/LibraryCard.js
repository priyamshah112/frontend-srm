import React, { useState, useEffect } from "react";
// import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import LinearProgress from "@material-ui/core/LinearProgress";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import * as moment from "moment";
import EditIcon from "../../../assets/images/Edit.svg";
import ReturnIcon from "../../../assets/images/diary/library/Return.svg";
import UTurnIcon from "../../../assets/images/diary/library/Return.svg";
import InfoIcon from "../../../assets/images/diary/library/Info.svg";
import { getLibraryInfo } from "../../redux/actions/attendence.action";
import { studentLibraryInfo } from "../../redux/actions/attendence.action";
import { putReturnLibrary } from "../../redux/actions/attendence.action";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  cardContainer: {
    paddingBottom: "85px",
  },
  span: {
    textTransform: "capitalize",
  },
  typography: {
    margin: "10px 0",
  },
  card: {
    width: "100%",
    marginTop: "20px",
    marginLeft: "20px",
    marginRight: "20px",
    // borderRadius: 0,
    // boxShadow: 'none',
  },
  reminder: {
    width: "100%",
    textAlign: "right",
    cursor: "pointer",
  },
  NewsHeader: {
    padding: "8px 16px 8px 16px !important",
    "& span": {
      cursor: "pointer",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "8px 16px 8px 16px !important",
      "& span": {
        fontSize: "16px",
      },
    },
  },
  cardContent: {
    padding: "0px 16px 0px 16px",
    margin: "10px",
    overflow: "auto",
  },
  contentMargin: {
    marginTop: "16px",
  },
  announcementText: {
    fontStyle: "normal",
  },
  announcementImg: {
    justifyContent: "center",
    textAlign: "center",
    "& img": {
      maxWidth: "100%",
      border: `1px solid ${theme.palette.common.deluge}`,
      borderRadius: "4px",
    },
  },
  statusText: {
    fontStyle: "normal",
    textTransform: "uppercase",
    paddingTop: "10px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "13px",
    },
  },
  cardActionStyle: {
    padding: "8px 16px 8px 16px",
    color: "#6C757D",
  },
  contentCenter: {
    textAlign: "right",
    height: "50%",

    "& img": {
      marginTop: "25px",
      width: "25px",
      cursor: "pointer",

      [theme.breakpoints.down("xs")]: {
        marginTop: "10px",
      },
    },
    [theme.breakpoints.down("xs")]: {
      textAlign: "right",
    },
  },
  createdDate: {
    padding: "5px 0 5px 0",
  },
  editBtnGrid: {
    textAlign: "right",
  },
  deleteIcon: {
    marginLeft: "10px",
  },
  editBtn: {
    marginLeft: "auto",
    cursor: "pointer",
  },
  cardHeader: {
    padding: "20px 20px 10px",
  },
  labelText: {
    fontStyle: "normal",
    color: "#8E8E93",
    fontSize: 14,
  },

  editBtnDiv: {
    marginLeft: "auto",
    transform: "translateY(4px)",
  },
  editBtn: {
    width: "19px",
    height: "19px",
    paddingLeft: "10px",
    transform: "translateY(4px)",
    cursor: "pointer",
  },
  deleteBtn: {
    width: "19px",
    height: "19px",
    paddingLeft: "5px",
    // transform: 'translateY(4px)',
    cursor: "pointer",
  },
  normalText: {
    fontStyle: "normal",
    color: `${theme.palette.common.blackRussian}`,
    fontWeight: 500,
    opacity: 1,
  },
  cardContent: {
    padding: "20px 20px !important",
    margin: "10px",
  },
  textAlignRight: {
    textAlign: "right",
    color: "#AEAEB2",
    fontSize: 14,
  },
  textAlignRight1: {
    textAlign: "left",
    color: "#AEAEB2",
    fontSize: 14,
    paddingLeft: "50px",
  },
  imgGrid: {
    position: "relative",
  },
  imgDiv: {
    display: "flex",
    justifyContent: "flex-end",
    bottom: "0px",
    right: "35px",
    // position: "absolute",
    // margin: "16px 0",
  },
  imgDiv_del: {
    bottom: 0,
    right: 0,
    // position: "absolute",
    margin: "0 0",
    transform: "translateY(5px)",
    cursor: "pointer",
    color: "#AEAEB2",
  },
  returned: {
    color: "rgb(0,255,0)",
  },
  borrowed: {
    color: "blue",
  },
  red: {
    color: "red",
  },
  bookName: {
    fontFamily: "Avenir medium",
    fontSize: 18,
  },
  CircularProgress: {
    margin: "30px",
  },
  message: {
    fontFamily: "Avenir book",
    fontSize: 14,
    margin: "20px",
  },
  Dialog: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "20px",
  },
  returnIcon: {
    color: "#7B72AF",
    display: "flex",
    justifyContent: "center",
  },
  buttonYes: {
    backgroundColor: "#7B72AF",
    minWidth: "130px",
    textTransform: "none",
    color: "white",
    "&:hover": {
      backgroundColor: "#7B72AF",
    },
  },
  buttonNo: {
    border: "1px solid rgba(0,0,0,0.25)",
    minWidth: "130px",
    textTransform: "none",
  },
  DialogTitle: {
    fontFamily: "Avenir medium",
    fontSize: "1rem",
    "& h2": {
      fontFamily: "Avenir medium",
      fontSize: "1rem",
      fontWeight: 500,
      color: "#000000",
    },
  },
}));

function LibraryCard(props) {
  const student_id = props.studentId;
  const history = useHistory();
  const classes = useStyle();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [endDate, setEndDate] = useState("");
  const [studentId, setStudentId] = useState("");
  const [openReturn, setOpenReturn] = useState(false);
  const [return_status, setReturnStatus] = useState("");
  const [return_date, setReturnDate] = useState("");
  const { data, dataLoading } = props;
  const library = data.library || [];

  const handleCloseReturn = () => {
    setOpenReturn(false);
  };
  const handleClick = (returnStatus, returnDate) => {
    setOpen(true);
    setReturnStatus(returnStatus);
    setReturnDate(returnDate);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = () => {
    if (props.selectedRole === "teacher" || props.selectedRole === "admin") {
      props.getLibraryInfo(student_id);
    } else {
      props.studentLibraryInfo();
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleOpenReturn = (id, endDate, student_id) => {
    setOpenReturn(true);
    setId(id);
    setEndDate(moment(endDate).format("YYYY-MM-DD"));
    setStudentId(student_id);
  };
  const handleReturnSuccess = () => {
    props.getLibraryInfo(student_id);
    handleCloseReturn();
  };
  const handleReturn = () => {
    const putData = {
      student_id: studentId,
      end_date: endDate,
      return_status: "returned",
    };
    props.putReturnLibrary(id, putData, handleReturnSuccess);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className={classes.Dialog}>
          <DialogTitle className={classes.DialogTitle} id="alert-dialog-title">
            {return_status === "returned"
              ? `Return Date : ${moment(return_date).format("DD MMM hh:mm a")}`
              : ""}
          </DialogTitle>
        </div>
      </Dialog>
      <Dialog
        open={openReturn}
        onClose={handleCloseReturn}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className={classes.Dialog}>
          <div className={classes.returnIcon}>
            <img src={ReturnIcon} width={50} height={50} />
          </div>
          <DialogTitle className={classes.DialogTitle} id="alert-dialog-title">
            {"Do you want to mark this book as returned?"}
          </DialogTitle>
          {props.putReturnLoading ? (
            <LinearProgress />
          ) : (
            <DialogActions
              style={{ justifyContent: "center", display: "flex" }}
            >
              <Button
                className={classes.buttonNo}
                onClick={handleCloseReturn}
                color="primary"
                autoFocus
              >
                NO
              </Button>
              <Button
                className={classes.buttonYes}
                onClick={handleReturn}
                color="primary"
              >
                YES
              </Button>
            </DialogActions>
          )}
        </div>
      </Dialog>
      <Grid
        container
        direction="row"
        justify="center"
        alignContent="center"
        className={classes.cardContainer}
      >
        {dataLoading ? (
          <div className={classes.CircularProgress}>
            <CircularProgress />
          </div>
        ) : library.length ? (
          library.map((item) => (
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Grid container>
                  <Grid item xs={8}>
                    <span style={{ display: "flex" }}>
                      {item.book_name ? (
                        <Typography
                          className={classes.bookName}
                          variant="body1"
                        >
                          {item.book_name}
                        </Typography>
                      ) : (
                        <Typography variant="body1">N/A</Typography>
                      )}
                      {item.return_status === "borrowed" ? (
                        ""
                      ) : (
                        <img
                          src={InfoIcon}
                          className={classes.editBtn}
                          onClick={() =>
                            handleClick(item.return_status, item.end_date)
                          }
                        />
                      )}
                    </span>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography
                      className={`${classes.textAlignRight}`}
                      variant="body2"
                    >
                      Created at: {moment(item.created_at).format("DD MMM YY")}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={8}>
                    <Typography className={classes.labelText} variant="body2">
                      <Typography
                        className={`${classes.typography}`}
                        variant="body2"
                      ></Typography>
                      {moment(item.from_date).format("DD MMM YY")} -{" "}
                      {moment(item.end_date).format("DD MMM YY")}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "flex-end",
                    }}
                  >
                    <Typography
                      className={`${classes.labelText} ${classes.textAlignRight}`}
                      variant="body2"
                    >
                      {item.return_status === "returned" ? (
                        <span className={`${classes.span} ${classes.returned}`}>
                          {item.return_status}
                        </span>
                      ) : (
                        ""
                      )}
                      {item.return_status === "borrowed" ? (
                        <span className={`${classes.span} ${classes.borrowed}`}>
                          {item.return_status}
                        </span>
                      ) : (
                        ""
                      )}
                      {item.return_status === "Overdue by 6 days" ? (
                        <span className={`${classes.span} ${classes.red}`}>
                          {item.return_status}
                        </span>
                      ) : (
                        ""
                      )}
                      {item.return_status === "Late Returned" ? (
                        <span className={`${classes.span} ${classes.red}`}>
                          {item.return_status}
                        </span>
                      ) : (
                        ""
                      )}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container>
                  {props.selectedRole === "teacher" ||
                  props.selectedRole === "admin" ? (
                    <Grid item xs={12} className={classes.imgGrid}>
                      {item.return_status === "borrowed" ? (
                        <div
                          className={`${classes.imgDiv} ${classes.textAlignRight}`}
                        >
                          <img
                            onClick={() => {
                              handleOpenReturn(
                                item.id,
                                item.end_date,
                                item.student_id
                              );
                            }}
                            src={ReturnIcon}
                            className={classes.editBtn}
                          />
                          <img
                            onClick={() =>
                              history.push(
                                `/library/${student_id}/edit/${item.id}`
                              )
                            }
                            src={EditIcon}
                            className={classes.editBtn}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                      {item.return_status === "" ? (
                        <div
                          className={`${classes.imgDiv} ${classes.textAlignRight}`}
                        >
                          <img src={UTurnIcon} className={classes.editBtn} />
                        </div>
                      ) : (
                        ""
                      )}
                      {item.return_status === "Overdue by 6 days" ? (
                        <div
                          className={`${classes.imgDiv} ${classes.textAlignRight}`}
                        >
                          <img src={EditIcon} className={classes.editBtn} />
                        </div>
                      ) : (
                        ""
                      )}
                      {item.status === "Returned" ? (
                        <div
                          className={`${classes.imgDiv} ${classes.textAlignRight}`}
                        >
                          <Typography
                            className={`${classes.textAlignRight}`}
                            variant="body2"
                          >
                            Return Date: {item.end_date}
                          </Typography>
                        </div>
                      ) : (
                        ""
                      )}
                    </Grid>
                  ) : (
                    ""
                  )}
                </Grid>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography className={classes.message}>No record!</Typography>
        )}
      </Grid>
    </>
  );
}

const mapStateToProps = (state) => {
  const {
    getLibraryInfo,
    getLibraryInfoLoading,
    putReturnLibraryLoading,
  } = state.Attendence;
  const userInfo = state.auth.userInfo || {};
  const userClasses = userInfo.user_classes || {};
  return {
    data: getLibraryInfo,
    dataLoading: getLibraryInfoLoading,
    putReturnLoading: putReturnLibraryLoading,
    selectedRole: state.auth.selectedRole,
    school_id: userClasses.school_id,
  };
};

export default connect(mapStateToProps, {
  getLibraryInfo,
  studentLibraryInfo,
  putReturnLibrary,
})(LibraryCard);
