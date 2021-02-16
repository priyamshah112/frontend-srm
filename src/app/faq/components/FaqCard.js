import React, { useState } from "react";
import {
  makeStyles,
  Grid,
  IconButton,
  Typography,
  Card,
  CardContent,
  Box,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import FaqService from "../FaqService";
import EditIcon from "../../../assets/images/Edit.svg";
import Confirm from "../../common/confirm";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "100%",
    margin: "auto",
    marginTop: "20px",
    borderRadius: 5,
    boxShadow: "none",
  },
  cardContent: {
    padding: "20px 20px 12px !important",
    overflow: "auto",
  },
  deleteIcon: {
    transform: "translateY(-3px)",
  },
  editBtn: {
    width: "19px",
    height: "19px",
    cursor: "pointer",
    transform: "translateY(3px)",
    marginRight: "7px",
  },
  labelText: {
    fontSize: "14px",
    fontStyle: "normal",
    color: theme.palette.common.lightFont,
  },
  question: {
    fontWeight: 500,
    fontSize: "14px",
  },
  rightColumn: {
    position: "relative",
  },
  buttonRoot: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  status: {
    fontFamily: "Avenir Book",
    fontSize: "14px",
    textAlign: "right",
    fontStyle: "normal",
    color: theme.palette.common.lightFont,
    '& span':{
      textTransform: 'capitalize',
    },
  },
  deleteBtn:{
		width: '22px',
		height: '21px',
		paddingLeft: '5px',
		cursor: 'pointer',
    color: '#AEAEB2',
    transform: 'translateY(4px)',
  },
}));

const FaqCard = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { id, status, question, answer, showActions, handleDelete,student } = props;

  const handleDeleteFaq = async (_event) => {
    try {
      const token = localStorage.getItem("srmToken");
      const response = await FaqService.deleteFaq(token, id);
      if (response.status === 200) {
        handleDelete(id);
      } else {
        console.log("Error in deleting");
      }
    } catch (error) {
      console.log("Error in deleting: ", error);
    }
  };

  const handleCloseDialog = (_event) => setIsDialogOpen(false);

  return (
    <Box className={classes.root}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Grid container direction="row">
            <Grid item xs={8} lg={8} md={8} sm={8}>
              <Typography className={classes.question}>
                {question ? question : "N/A"}
              </Typography>
              <Typography
                dangerouslySetInnerHTML={{
                  __html: answer ? answer : "<p>N/A</p>",
                }}
                className={classes.labelText}
              />
            </Grid>
            <Grid
              item
              xs={4}
              lg={4}
              md={4}
              sm={4}
              className={classes.rightColumn}
            >
              {status ? (
                <Typography className={classes.status}>
                  { student ? null : 'Status:'} <span>{status}</span>
                </Typography>
              ) : null}
              {showActions ? (
                <Box className={classes.buttonRoot}>
                  { status !== 'published' ? <img
                    src={EditIcon}
                    className={classes.editBtn}
                    onClick={() => history.push(`/faq/edit/${id}`)}
                  /> : null }
                  <span
                    onClick={() => setIsDialogOpen(true)}
                  >
                    <DeleteOutlineOutlinedIcon
                        fontSize={'inherit'}
                        className={classes.deleteBtn}
										/>
                  </span>
                </Box>
              ) : null}
            </Grid>
          </Grid>
        </CardContent>
        <Confirm 
          open={isDialogOpen} 
          handleClose={handleCloseDialog} 
          onhandleDelete={handleDeleteFaq}
        /> 
      </Card>
    </Box>
  );
};

export default FaqCard;
