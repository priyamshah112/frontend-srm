import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import DosaImg from "./images/Dosa.jpg";
import EditIcon from "../../assets/images/Edit.svg";
import BackIcon from "../../assets/images/Back.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "15px 15px 0 15px",
    width: "100%",
    paddingBottom: "10px",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      margin: "15px 15px 0 15px",
    },
  },
  container: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    marginBottom: "75px",
  },
  bachBtn: {
    marginLeft: "0",
    width: "19px",
    height: "19px",
    paddingLeft: "3px",
    transform: "translateY(4px)",
    cursor: "pointer",
    marginBottom: "7px",
  },
  deleteBtn: {
    color: "rgb(175,175,175)",
    marginBottom: "-3px",
  },

  desc: {
    display: "flex",
    flexDirection: "column",
  },
  img: {
    height: "100px",
    width: "20%",
    marginRight: "5px",
  },
  media: {
    display: "flex",
  },
  header: {
    display: "flex",
    paddingBottom: "15px",
    justifyContent: "flex-start",
    float: "right",
  },
  heading: {
    fontFamily: "Avenir medium",
    fontSize: 14,
  },
  heading1: {
    width: "80%",
  },
  heading2: {
    width: "20%",
    display: "flex",
    justifyContent: "flex-end",
    paddingLeft: "20px",
  },
  red: {
    color: "#f44336",
  },
  green: {
    color: "#14ee14",
  },
  circle: {
    padding: "4px",
    borderRadius: "50%",
    height: "0px",
    marginTop: "5px",
    marginRight: "4px",
  },
  circleRed: {
    backgroundColor: "#f44336",
  },
  circleGreen: {
    backgroundColor: "#14ee14",
  },
  message: {
    fontFamily: "Avenir book",
    fontSize: 14,
  },
  cardHeader: {
    display: "flex",
  },
  content: {
    fontSize: 14,
    fontFamily: "Avenir",
  },
  contentCard: {
    display: "flex",
    width: "100%",
    marginBottom: "15px",
  },
  description: {
    width: "80%",
  },
  price: {
    display: "flex",
    justifyContent: "flex-end",
    width: "20%",
  },
  cardAction: {
    position: "absolute",
    left: "3px",
  },
  actionHead: {
    fontFamily: "Avenir medium",
    fontSize: 18,
  },
  actionArea: {
    display: "flex",
    paddingTop: "15px",
    paddingBottom: "15px",
  },
}));

function DishDetails(props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Card className={classes.root}>
        <CardActionArea className={classes.actionArea}>
          <CardActions className={classes.cardAction}>
            <img
              src={BackIcon}
              className={classes.bachBtn}
              onClick={() => props.close(false)}
            />
          </CardActions>
          <div>
            <Typography className={classes.actionHead}>Dish Details</Typography>
          </div>
        </CardActionArea>
        <CardContent
          style={{
            display: "flex",
            flexDirection: "column",
            paddingTop: "5px",
            paddingBottom: "5px",
            // width: "100%",
          }}
        >
          <div className={classes.desc}>
            <div className={classes.header}>
              <div className={classes.heading1}>
                <Typography
                  className={classes.heading}
                  variant="h5"
                  component="h2"
                >
                  {props.heading}
                </Typography>
              </div>
              <div className={classes.heading2}>
                <div
                  className={
                    props.type === "Veg"
                      ? `${classes.circleGreen} ${classes.circle}`
                      : `${classes.circleRed} ${classes.circle}`
                  }
                ></div>
                <Typography
                  className={classes.heading}
                  className={
                    props.type === "Veg"
                      ? `${classes.green} ${classes.heading}`
                      : `${classes.red} ${classes.heading}`
                  }
                  variant="h5"
                  component="h2"
                >
                  {props.type}
                </Typography>
              </div>
            </div>
            <div className={classes.contentCard}>
              <div className={classes.description}>
                <Typography
                  className={classes.content}
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  {props.desc}
                </Typography>
              </div>
              <div className={classes.price}>
                <Typography
                  className={classes.content}
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  Price-{props.price}/-
                </Typography>
              </div>
            </div>
          </div>
          <div className={classes.media}>
            <CardMedia
              className={classes.img}
              component="img"
              alt="Contemplative Reptile"
              height="50"
              width="40"
              image={props.image}
              title="Contemplative Reptile"
            />
            <CardMedia
              className={classes.img}
              component="img"
              alt="Contemplative Reptile"
              height="50"
              width="40"
              image={DosaImg}
              title="Contemplative Reptile"
            />
            <CardMedia
              className={classes.img}
              component="img"
              alt="Contemplative Reptile"
              height="50"
              width="40"
              image={DosaImg}
              title="Contemplative Reptile"
            />
            <CardMedia
              className={classes.img}
              component="img"
              alt="Contemplative Reptile"
              height="50"
              width="40"
              image={DosaImg}
              title="Contemplative Reptile"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default DishDetails;
