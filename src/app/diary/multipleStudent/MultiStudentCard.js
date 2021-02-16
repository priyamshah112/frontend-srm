import React, { useState, useEffect } from "react";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import * as moment from "moment";
import EditIcon from "../../../assets/images/Edit.svg";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import { getDiaryMultiple } from "../../redux/actions/attendence.action";
import { diaryDelete } from "../../redux/actions/attendence.action";
import { connect } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress";
import { SnackBarRef } from "../../../SnackBar";

const useStyle = makeStyles((theme) => ({
  message: {
    textAlign: "center",
    fontSize: 14,
    fontFamily: "Avenir Book",
    padding: "20px",
  },
  span: {
    textTransform: "capitalize",
  },
  typography: {
    marginTop: "5px",
    cursor: "pointer",
  },
  card: {
    width: "100%",
    margin: "20px 20px 0 20px",
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
    fontSize: ".8rem",
  },

  editBtnDiv: {
    marginLeft: "auto",
    transform: "translateY(4px)",
  },
  Del_img: {
    cursor: "pointer",
    marginLeft: "10px",
  },
  editBtn: {
    width: "19px",
    height: "19px",
    transform: "translateY(4px)",
    cursor: "pointer",
    marginTop: "-3px",
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
    paddingBottom: "15px !important",
    overflow: "auto",
    // margin: '10px',
  },
  textAlignRight: {
    textAlign: "right",
    color: "#AEAEB2",
    fontSize: "0.85rem",
  },
  textAlignRight1: {
    textAlign: "left",
    color: "#AEAEB2",
    fontSize: "0.85rem",
    paddingLeft: "50px",
  },
  imgGrid: {
    // position: 'relative',
  },
  imgDiv: {
    display: "flex",
    justifyContent: "flex-end",
    margin: "-2px 0",
    transform: "translateY(5px)",
    color: "#AEAEB2",
  },
  circularProgress: {
    display: "flex",
    height: "70%",
    justifyContent: "center",
    alignItems: "center",
  },
}));

function MultiStudentCard(props) {
  const classes = useStyle();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const { data, dataLoading, deleteLoading } = props;
  const history = useHistory();

  const handleClickDel = (id) => {
    setOpen(true);
    setId(id);
  };

  const handleCloseNO = () => {
    setOpen(false);
  };
  const fetchData = () => {
    props.getDiaryMultiple();
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSuccess = () => {
    SnackBarRef.open("", true, "Diary deleted successfully");
    props.getDiaryMultiple();
    setOpen(false);
  };
  const handleFail = (error) => {
    console.log("error", error);
    if (error) {
      SnackBarRef.open("", false, error.message);
    }
  };
  const handleDelete = () => {
    props.diaryDelete(id, handleSuccess, handleFail);
  };

  return (
    <>
      {dataLoading ? (
        <div className={classes.circularProgress}>
          <CircularProgress />
        </div>
      ) : (
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
                <Button onClick={handleDelete} color="primary">
                  YES
                </Button>
              </DialogActions>
            )}
          </Dialog>
          {!data.length ? (
            <Typography className={classes.message}>
              No diary record available yet!
            </Typography>
          ) : (
            <Grid
              container
              direction="row"
              justify="center"
              alignContent="center"
              style={{ marginBottom: "85px" }}
            >
              {data.map((item) => (
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Grid container>
                      <Grid item xs={8}>
                        <span>
                          {item.title ? (
                            <Typography
                              style={{ fontSize: 18 }}
                              variant="body1"
                            >
                              {item.title}
                            </Typography>
                          ) : (
                            <Typography
                              style={{ fontSize: 18 }}
                              variant="body1"
                            >
                              N/A
                            </Typography>
                          )}
                        </span>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography
                          className={`${classes.textAlignRight}`}
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
                        onClick={() =>
                          history.push(`/multiple-student/${item.id}`)
                        }
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
                              onClick={() =>
                                history.push(
                                  `/multiple-student/edit/${item.id}`
                                )
                              }
                            />
                            <div
                              className={classes.Del_img}
                              onClick={() => handleClickDel(item.id)}
                            >
                              <DeleteOutlineOutlinedIcon fontSize={"medium"} />
                            </div>
                          </div>
                        ) : (
                          <div className={`${classes.imgDiv}`}>
                            <DoneAllIcon fontSize={"medium"} />
                          </div>
                        )}
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          )}
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  const {
    getDiaryMultiple = [],
    getDiaryMultipleLoading,
    diaryDeleteLoading,
  } = state.Attendence;
  const userInfo = state.auth.userInfo || {};
  const userClasses = userInfo.user_classes || {};
  return {
    data: getDiaryMultiple,
    dataLoading: getDiaryMultipleLoading,
    deleteLoading: diaryDeleteLoading,
    selectedRole: state.auth.selectedRole,
    school_id: userClasses.school_id,
  };
};

export default connect(mapStateToProps, {
  getDiaryMultiple,
  diaryDelete,
})(MultiStudentCard);
