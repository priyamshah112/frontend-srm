import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Typography,
  Box,
  Grid,
  CardContent,
  Button,
  CircularProgress,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import moment from "moment";
import { postComment } from "../redux/actions/support.action";
import { connect } from "react-redux";

const useStyle = makeStyles((theme) => ({
  card: {
    boxShadow: "none",
    borderBottomLeftRadius: "3px",
    borderBottomRightRadius: "3px",
    minHeight: "100px",
  },
  labelText: {
    fontSize: "14px",
    fontStyle: "normal",
    color: `${theme.palette.common.blackRussian}`,
    opacity: 0.5,
  },
  normalText: {
    fontSize: "14px",
    fontStyle: "normal",
    color: `${theme.palette.common.blackRussian}`,
    opacity: 1,
  },
  cardContent: {
    padding: "20px !important",
  },
  textAlignRight: {
    textAlign: "right",
    [theme.breakpoints.down("sm")]: {
      textAlign: "left",
    },
  },
  borderBottom: {
    margin: "0 20px 0 20px",
    borderBottom: "1px solid #707070",
  },
  marginTop30: {
    marginTop: "30px",
  },
  textAreaRoot: {
    width: "100%",
    backgroundColor: "#fff",

    "&::-webkit-scrollbar": {
      width: 0,
    },
  },
  buttonBox: {
    textAlign: "right",
    marginTop: "30px",
    [theme.breakpoints.down("sm")]: {
      textAlign: "left",
    },
  },
  commentBtns: {
    width: "100px",
    height: "45px",
    border: `1px solid ${theme.palette.common.deluge}`,
  },
  cancelBtn: {
    backgroundColor: "#fff",
    marginRight: "10px",
    "&:hover": {
      backgroundColor: "#fff",
    },
  },
  emptyMsg: {
    padding: "15px",
  },
}));

const SupportComments = (props) => {
  const classes = useStyle();
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const { data = [] } = props;

  useEffect(() => {
    setError("");
  }, [comment]);

  const handleCancel = (event) => {
    setComment("");
  };

  const onComment = () => {
    const data = {
      description: comment,
      support_id: props.id,
    };
    props.postComment(data, onSuccess, onFail);
  };

  const onSuccess = (d = {}) => {
    const {userInfo={}} = props;
    const cData = {
      ...d.data,
      user_data: userInfo,
    }
    props.onComment(cData);
    setComment("");
  };

  const onFail = (err = {}) => {
    setError(err.message);
  };

  const disabled = !comment.trim() || props.loading;

  const commentData = [...data].reverse();

  return (
    <>
      <Card className={classes.card}>
        {!data.length && (
          <Typography className={classes.emptyMsg}>
            This ticket has no comments yet.
          </Typography>
        )}
        {commentData.map((item, index) => {
          const { user_data = {} } = item;
          return (
            <>
              <CardContent className={classes.cardContent}>
                <Grid container>
                  <Grid item sm={9}>
                    <Typography className={classes.normalText}>
                      {item.description}
                    </Typography>
                  </Grid>
                  <Grid item sm={3}>
                    <Typography
                      className={`${classes.labelText} ${classes.textAlignRight}`}
                    >
                      {`${user_data.firstname} ${user_data.lastname}`}
                    </Typography>
                    <Typography
                      className={`${classes.labelText} ${classes.textAlignRight}`}
                    >
                      {moment(item.updated_at).format("DD MMM, HH:mm A")}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
              {index + 1 !== data.length ? (
                <div className={classes.borderBottom}></div>
              ) : null}
            </>
          );
        })}
      </Card>
      <div className={`${classes.addCommentDiv} ${classes.marginTop30}`}>
        <form>
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={4}
            placeholder="Add comment"
            variant="outlined"
            value={comment}
            onChange={(event) => {
              setComment(event.target.value);
            }}
            classes={{ root: classes.textAreaRoot }}
          />
          {error && <Typography color="secondary">{error}</Typography>}
          <Box className={classes.buttonBox}>
            <Button
              variant="contained"
              className={`${classes.commentBtns} ${classes.cancelBtn}`}
              disableElevation
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              disabled={disabled}
              variant="contained"
              color="primary"
              className={classes.commentBtns}
              onClick={onComment}
              disableElevation
            >
              {props.loading ? <CircularProgress size={25} /> : "Add"}
            </Button>
          </Box>
        </form>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

const mapStateToProps = ({ Supports, auth }) => {
  const { postCommentLoading } = Supports;
  return {
    loading: postCommentLoading,
    userInfo: auth.userInfo || {},
  };
};

export default connect(mapStateToProps, { postComment })(SupportComments);
