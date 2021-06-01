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
import ReadIcon from "../../../assets/images/notifications/read.svg";
import Confirm from "../../common/confirm";

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
    // marginBottom: "12px",
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
    color: "#AEAEB2",
    fontSize: 14,
    fontFamily: "Avenir Book",
    marginBottom: "12px",
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
    padding: "20px !important",
    overflow: "auto",
    // margin: '10px',
  },
  textAlignRight: {
    fontStyle: "normal",
    textAlign: "right",
    color: "#AEAEB2",
    fontSize: 14,
    fontFamily: "Avenir Roman",
  },
  imgGrid: {
    // position: 'relative',
  },
  imgDiv: {
    display: "flex",
    justifyContent: "flex-end",
    // margin: "-2px 0",
    transform: "translateY(5px)",
    color: "#AEAEB2",
  },
  imgRead: {
    display: "flex",
    justifyContent: "flex-end",
    transform: "translateY(5px)",
    color: "#AEAEB2",
    paddingBottom: "6px",
  },
  circularProgress: {
    display: "flex",
    justifyContent: "center",
    margin: "8px",
  },
  title: {
    fontFamily: "Avenir Heavy",
    fontSize: 14,
    color: "#2C2C2E",
    paddingBottom: "12px",
  },
}));

function MultiStudentCard(props) {
  const classes = useStyle();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const { data, dataLoading } = props;
  const history = useHistory();

  const handleClickDel = (id) => {
    setOpen(true);
    setId(id);
  };

  const handleCloseNO = () => {
    setOpen(false);
  };

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
      <Confirm
        open={open}
        handleClose={handleCloseNO}
        onhandleDelete={handleDelete}
      />

      {!data.length && !dataLoading ? (
        <Typography className={classes.message}>
          No diary record available yet!
        </Typography>
      ) : (
        ""
      )}
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
                      <Typography className={classes.title}>
                        {item.title}
                      </Typography>
                    ) : (
                      <Typography className={classes.title}>N/A</Typography>
                    )}
                  </span>
                </Grid>
                <Grid item xs={4}>
                  <Typography className={`${classes.textAlignRight}`}>
                    {moment(item.created_at).format("DD MMM, hh:mm A")}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid
                  item
                  xs={8}
                  style={{ cursor: "pointer" }}
                  onClick={() => history.push(`/multiple-student/${item.id}`)}
                >
                  <Typography className={classes.labelText}>
                    <Typography
                      className={`${classes.typography}`}
                    ></Typography>
                    Click here to check more details.
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography className={`${classes.textAlignRight}`}>
                    <span className={`${classes.span}`}>{item.status}</span>
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
                          history.push(`/multiple-student/edit/${item.id}`)
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
                    <div className={`${classes.imgRead}`}>
                      <img src={ReadIcon} />
                    </div>
                  )}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
        {dataLoading ? (
          <div className={classes.circularProgress}>
            <CircularProgress color="primary" size={30} />
          </div>
        ) : (
          ""
        )}
      </Grid>
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
    deleteLoading: diaryDeleteLoading,
    selectedRole: state.auth.selectedRole,
    school_id: userClasses.school_id,
  };
};

export default connect(mapStateToProps, {
  getDiaryMultiple,
  diaryDelete,
})(MultiStudentCard);
