import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography, Grid, CardContent, CardHeader } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import editIcon from "../../assets/images/Edit.svg";
import { useHistory } from "react-router-dom";
import moment from "moment";

export const ticketStatus = {
  draft: "Draft",
  "in-progress": "In Progress",
  submitted: "Submitted",
  acknowledge: "Acknowledge",
  resolved: "Resolved",
  canceled: "Canceled",
  approved: "Approved",
};

const useStyle = makeStyles((theme) => ({
  card: {
    boxShadow: "none",
    borderRadius: "10px",
    marginTop: "20px",
  },
  cardHeader: {
    padding: "20px 20px 10px",
  },
  labelText: {
    fontSize: "14px",
    fontStyle: "normal",
    color: `${theme.palette.common.blackRussian}`,
    opacity: 0.5,
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
  normalText: {
    fontSize: "14px",
    fontStyle: "normal",
    color: `${theme.palette.common.blackRussian}`,
    fontWeight: 500,
    opacity: 1,
    width: '95%',
    cursor: "pointer",
  },
  cardContent: {
    padding: "0 20px 20px !important",
  },
  textAlignRight: {
    textAlign: "right",
  },
}));

const SupportCard = (props) => {
  const { item } = props;
  const classes = useStyle();
  const history = useHistory();

  const handleEdit = (event) => {
    history.push(`/support/create/${item.id}`);
  };

  const openDetail = (event) => {
    history.push(`/support/${item.id}`);
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        action={
          <>
            {item.status === 'draft' ? <Typography className={classes.labelText}>
              {moment(item.updated_at).format("DD MMM, HH:mm A")}
              <img
                src={editIcon}
                className={classes.editBtn}
                onClick={handleEdit}
              />
            </Typography> : null}
          </>
        }
        title={
          <>
            <Typography onClick={openDetail} className={classes.normalText}>
              Ticket ID - {item.code}
            </Typography>
          </>
        }
        
        className={classes.cardHeader}
      />
      <CardContent className={classes.cardContent}>
        <Grid container>
          <Grid item xs={11}>
            <Typography className={classes.labelText}>
              Subject - {item.subject}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography
              className={`${classes.labelText} ${classes.textAlignRight}`}
            >
              {ticketStatus[item.status]}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SupportCard;
