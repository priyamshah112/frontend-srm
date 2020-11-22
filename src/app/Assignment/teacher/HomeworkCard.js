import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import * as moment from "moment";
import EditIcon from "../../../assets/images/Edit.svg";
import HomeworkService from "../HomeworkService";

const useStyle = makeStyles((theme) => ({
  span: {
    textTransform: "capitalize",
  },
  typography: {
    margin: "16px 0",
  },
  card: {
    width: "100%",
    margin: "auto",
    marginTop: "20px",
    borderRadius: 0,
    boxShadow: "none",
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
    fontStyle: "normal",
    color: `${theme.palette.common.blackRussian}`,
    fontWeight: 500,
    opacity: 1,
  },
  cardContent: {
    padding: "20px 20px 12px !important",
  },
  textAlignRight: {
    textAlign: "right",
    color: "#AEAEB2",
    fontSize: "0.85rem",
  },
  imgGrid: {
    position: "relative",
  },
  imgDiv: {
    bottom: 0,
    right: 0,
    position: "absolute",
    margin: "16px 0",
  },
}));

const HomeworkCard = (props) => {
  const classes = useStyle();
  const history = useHistory();
  const statusColors = {
    draft: "red",
    published: "#7B72AF",
    active: "green",
  };
  const {
    id,
    status,
    title,
    main_content,
    submission_date,
    created_at,
  } = props.homework;

  const handleEditHomework = () => {
    props.handleChangeLoader();
    history.push(`/create-homework/${id}`);
  };

  async function deleteHw(id) {
    const token = localStorage.getItem("srmToken");
    try {
      const response = await HomeworkService.deleteHomework(token, id);
      console.log(response);
      if (response.status === 200) {
        console.log("Successfully Deleted");
        props.deleteHomework(id);
      } else {
        console.log("Failed to delete");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Grid
        container
        direction="row"
        justify="center"
        alignContent="center"
        className={classes.cardContainer}
      >
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Grid container>
              <Grid item xs={8}>
                <span>
                  {title ? (
                    <Typography variant="body1">{title}</Typography>
                  ) : (
                    <Typography variant="body1">N/A</Typography>
                  )}
                </span>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  className={`${classes.textAlignRight}`}
                  variant="body2"
                >
                  Created at: {moment(created_at).format("DD MMM YY")}
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <Typography
                  className={`${classes.labelText} ${classes.textAlignRight}`}
                  variant="body2"
                >
                  Status : <span className={`${classes.span}`}>{status}</span>
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={11}>
                <Typography className={classes.labelText} variant="body2">
                  {main_content ? (
                    <div dangerouslySetInnerHTML={{ __html: main_content }} />
                  ) : (
                    <Typography
                      className={`${classes.typography}`}
                      variant="body2"
                    >
                      N/A
                    </Typography>
                  )}
                </Typography>
              </Grid>
              <Grid item xs={1} className={classes.imgGrid}>
                {status !== "published" ? (
                  <div
                    className={`${classes.imgDiv} ${classes.textAlignRight}`}
                  >
                    <img
                      src={EditIcon}
                      className={classes.editBtn}
                      onClick={handleEditHomework}
                    />
                  </div>
                ) : (
                  ""
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default HomeworkCard;
